import Stripe from "stripe";
import { NextResponse } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2024-06-20" as any,
});

export async function POST(req: Request) {
  try {
    const { plan, userEmail } = await req.json();

    let priceId;
    if (plan === "basic") priceId = process.env.STRIPE_BASIC_PRICE_ID;
    else if (plan === "premium") priceId = process.env.STRIPE_PREMIUM_PRICE_ID;
    else if (plan === "family") priceId = process.env.STRIPE_FAMILY_PRICE_ID;
    else return NextResponse.json({ error: "Invalid plan" }, { status: 400 });

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/membership`,
      customer_email: userEmail,
    });

    return NextResponse.json({ url: session.url });
  } catch (err: any) {
    console.error("Stripe checkout error:", err);
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 }
    );
  }
}
