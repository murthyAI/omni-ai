import crypto from "crypto";

type VerificationBody = {
  razorpay_order_id?: string;
  razorpay_payment_id?: string;
  razorpay_signature?: string;
  plan?: string;
};

export async function POST(request: Request) {
  try {
    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    if (!keySecret) {
      return Response.json(
        {
          error:
            "Razorpay verification credentials are not configured.",
        },
        { status: 500 }
      );
    }

    const body =
      (await request.json()) as VerificationBody;

    const orderId = body.razorpay_order_id?.trim();
    const paymentId =
      body.razorpay_payment_id?.trim();
    const receivedSignature =
      body.razorpay_signature?.trim();
    const plan = body.plan?.trim();

    if (
      !orderId ||
      !paymentId ||
      !receivedSignature ||
      !plan
    ) {
      return Response.json(
        {
          error:
            "Required payment verification details are missing.",
        },
        { status: 400 }
      );
    }

    if (plan !== "pro" && plan !== "pro-plus") {
      return Response.json(
        { error: "Invalid payment plan." },
        { status: 400 }
      );
    }

    const expectedSignature = crypto
      .createHmac("sha256", keySecret)
      .update(`${orderId}|${paymentId}`)
      .digest("hex");

    const expectedBuffer = Buffer.from(
      expectedSignature,
      "utf8"
    );

    const receivedBuffer = Buffer.from(
      receivedSignature,
      "utf8"
    );

    const signaturesMatch =
      expectedBuffer.length === receivedBuffer.length &&
      crypto.timingSafeEqual(
        expectedBuffer,
        receivedBuffer
      );

    if (!signaturesMatch) {
      return Response.json(
        {
          success: false,
          error:
            "Payment signature verification failed.",
        },
        { status: 400 }
      );
    }

    return Response.json({
      success: true,
      message: "Payment verified successfully.",
      paymentId,
      orderId,
      plan,
    });
  } catch (error) {
    console.error(
      "Razorpay verification error:",
      error
    );

    return Response.json(
      {
        success: false,
        error: "Unable to verify the payment.",
      },
      { status: 500 }
    );
  }
}