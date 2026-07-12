const CLOUDFLARE_MODEL =
  "@cf/black-forest-labs/flux-1-schnell";

type CloudflareImageResponse = {
  success?: boolean;
  result?: {
    image?: string;
  };
  errors?: Array<{
    code?: number;
    message?: string;
  }>;
  messages?: Array<{
    code?: number;
    message?: string;
  }>;
};

export async function POST(request: Request) {
  try {
    const accountId = process.env.CLOUDFLARE_ACCOUNT_ID;
    const apiToken = process.env.CLOUDFLARE_API_TOKEN;

    if (!accountId || !apiToken) {
      return Response.json(
        {
          error:
            "Cloudflare configuration is missing. Check the environment variables.",
        },
        { status: 500 }
      );
    }

    const body = await request.json();
    const prompt =
      typeof body.prompt === "string"
        ? body.prompt.trim()
        : "";

    if (!prompt) {
      return Response.json(
        {
          error: "Please enter an image prompt.",
        },
        { status: 400 }
      );
    }

    if (prompt.length > 2048) {
      return Response.json(
        {
          error:
            "The prompt is too long. Please keep it below 2048 characters.",
        },
        { status: 400 }
      );
    }

    const endpoint =
      `https://api.cloudflare.com/client/v4/accounts/` +
      `${accountId}/ai/run/${CLOUDFLARE_MODEL}`;

    const cloudflareResponse = await fetch(endpoint, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt,
        steps: 4,
        seed: Math.floor(Math.random() * 2147483647),
      }),
      cache: "no-store",
    });

    const data =
      (await cloudflareResponse.json()) as CloudflareImageResponse;

    if (!cloudflareResponse.ok || data.success === false) {
      console.error("Cloudflare image API error:", data);

      const cloudflareMessage =
        data.errors?.[0]?.message ||
        data.messages?.[0]?.message ||
        "Cloudflare could not generate the image.";

      return Response.json(
        {
          error: cloudflareMessage,
        },
        {
          status: cloudflareResponse.status || 500,
        }
      );
    }

    const base64Image = data.result?.image;

    if (!base64Image) {
      console.error(
        "Cloudflare response did not contain image data:",
        data
      );

      return Response.json(
        {
          error:
            "The AI completed the request but returned no image.",
        },
        { status: 500 }
      );
    }

    return Response.json({
      image: `data:image/jpeg;base64,${base64Image}`,
      model: CLOUDFLARE_MODEL,
    });
  } catch (error) {
    console.error("Image generation route error:", error);

    return Response.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Image generation failed. Please try again.",
      },
      { status: 500 }
    );
  }
}