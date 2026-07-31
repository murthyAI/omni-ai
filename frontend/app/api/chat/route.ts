import { GoogleGenAI } from "@google/genai";
import { adminAuth, adminDb } from "@/lib/firebase-admin";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
});

const FREE_DAILY_LIMIT = 20;

class UsageLimitError extends Error {}

export async function POST(req: Request) {
  try {
    // 1. Firebase token check
    const authorizationHeader = req.headers.get("authorization");

    if (!authorizationHeader?.startsWith("Bearer ")) {
      return Response.json(
        { reply: "Please login to continue." },
        { status: 401 }
      );
    }

    const idToken = authorizationHeader.replace("Bearer ", "").trim();

    const decodedToken = await adminAuth.verifyIdToken(idToken);
    const userId = decodedToken.uid;

    // 2. Request data
    const { message, image } = await req.json();

    if (!message && !image) {
      return Response.json(
        { reply: "Please enter a message or upload an image." },
        { status: 400 }
      );
    }

    // 3. User plan and daily usage check
    const userRef = adminDb.collection("users").doc(userId);
    const today = new Date().toISOString().slice(0, 10);

    await adminDb.runTransaction(async (transaction) => {
      const userSnapshot = await transaction.get(userRef);
      const userData = userSnapshot.data();

      const plan = String(userData?.plan || "free").toLowerCase();

      const isPaidUser =
        plan === "pro" ||
        plan === "pro-plus" ||
        plan === "pro+";

      // Paid users have unlimited usage
      if (isPaidUser) {
        return;
      }

      const savedUsageDate = userData?.chatUsageDate;
      const savedUsageCount = Number(userData?.chatUsageCount || 0);

      const currentUsageCount =
        savedUsageDate === today ? savedUsageCount : 0;

      if (currentUsageCount >= FREE_DAILY_LIMIT) {
        throw new UsageLimitError();
      }

      transaction.set(
        userRef,
        {
          chatUsageDate: today,
          chatUsageCount: currentUsageCount + 1,
          updatedAt: new Date(),
        },
        { merge: true }
      );
    });

    // 4. Gemini request
    const contents = image
      ? [
          {
            text:
              message ||
              "Please analyze this image clearly.",
          },
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
    if (error instanceof UsageLimitError) {
      return Response.json(
        {
          reply:
            "You've reached today's free usage limit. Please try again tomorrow or upgrade your plan.",
        },
        { status: 429 }
      );
    }

    console.error("Chat API Error:", error);

    return Response.json(
      {
        reply:
          "Something went wrong while analyzing. Please try again.",
      },
      { status: 500 }
    );
  }
}