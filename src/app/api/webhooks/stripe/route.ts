import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { prisma } from "@/lib/db";
import Stripe from "stripe";

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature");

  if (!sig) {
    return NextResponse.json({ error: "No signature" }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("Webhook signature verification failed:", message);
    return NextResponse.json(
      { error: `Webhook Error: ${message}` },
      { status: 400 }
    );
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const donationId = session.metadata?.donationId;
    const projectId = session.metadata?.projectId;

    if (donationId && projectId) {
      try {
        // Update donation status
        const donation = await prisma.donation.update({
          where: { id: donationId },
          data: {
            status: "completed",
            stripePaymentId: session.payment_intent as string,
          },
        });

        // Update project raised amount
        await prisma.project.update({
          where: { id: projectId },
          data: {
            raisedAmount: {
              increment: donation.amount,
            },
          },
        });
      } catch (error) {
        console.error("Error processing webhook:", error);
      }
    }
  }

  return NextResponse.json({ received: true });
}
