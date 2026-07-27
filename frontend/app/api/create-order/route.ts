import Razorpay from "razorpay";

const PLAN_PRICES = {
  pro: 29900,
  "pro-plus": 59900,
} as const;

type PaidPlan = keyof typeof PLAN_PRICES;

function isPaidPlan(plan: string): plan is PaidPlan {
  return plan === "pro" || plan === "pro-plus";
}

export async function POST(request: Request) {
  try {
    const keyId = process.env.RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    if (!keyId || !keySecret) {
      return Response.json(
        {
          error:
            "Razorpay server credentials are not configured.",
        },
        { status: 500 }
      );
    }

    const body = await request.json();
    const plan =
      typeof body?.plan === "string"
        ? body.plan.trim().toLowerCase()
        : "";

    if (!isPaidPlan(plan)) {
      return Response.json(
        { error: "Please select a valid paid plan." },
        { status: 400 }
      );
    }

    const amount = PLAN_PRICES[plan];

    if (amount < 100) {
      return Response.json(
        { error: "Payment amount must be at least ₹1." },
        { status: 400 }
      );
    }

    const razorpay = new Razorpay({
      key_id: keyId,
      key_secret: keySecret,
    });

    const receipt = `omni_${plan}_${Date.now()}`.slice(
      0,
      40
    );

    const order = await razorpay.orders.create({
      amount,
      currency: "INR",
      receipt,
      notes: {
        product: "OMNI AI",
        plan,
      },
    });

    return Response.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      plan,
    });
  } catch (error: unknown) {
    console.error("Razorpay create-order error:", error);

    const possibleError = error as {
      statusCode?: number;
      error?: {
        description?: string;
      };
    };

    const status =
      possibleError?.statusCode === 401 ? 401 : 500;

    return Response.json(
      {
        error:
          possibleError?.error?.description ||
          "Unable to create the payment order.",
      },
      { status }
    );
  }
}