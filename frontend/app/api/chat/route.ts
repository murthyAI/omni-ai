import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
});

export async function POST(req: Request) {
  try {
    const { message, image } = await req.json();

    if (!message && !image) {
      return Response.json(
        { reply: "Please enter a message or upload an image." },
        { status: 400 }
      );
    }

    const contents = image
      ? [
          { text: message || "Please analyze this image clearly." },
          {
            inlineData: {
              mimeType: image.mimeType,
              data: image.data,
            },
          },
        ]
      : message;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents,
    });

    return Response.json({
      reply: response.text || "No response received.",
    });
  } catch (error) {
    console.error("Gemini API Error:", error);

    return Response.json(
      { reply: "Something went wrong while analyzing." },
      { status: 500 }
    );
  }
}