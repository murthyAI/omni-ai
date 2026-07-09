import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
});

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    if (!prompt) {
      return Response.json(
        { error: "Prompt is required" },
        { status: 400 }
      );
    }

    const response = await ai.models.generateContent({
      model: "gemini-3.1-flash-lite-image",
      contents: prompt,
    });

    const parts = response.candidates?.[0]?.content?.parts || [];

    const imagePart = parts.find((part: any) => part.inlineData);

    if (!imagePart?.inlineData?.data) {
      return Response.json(
        { error: "No image generated. Try another prompt." },
        { status: 500 }
      );
    }

    return Response.json({
      image: `data:${imagePart.inlineData.mimeType};base64,${imagePart.inlineData.data}`,
    });
  } catch (error: any) {
  console.error(error);

  return Response.json({
    error: error.message,
  });
}
}