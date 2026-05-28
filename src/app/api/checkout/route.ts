import { NextRequest, NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { prisma } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const { amount, projectId, name, email, message, anonymous } =
      await req.json();

    if (!amount || amount < 1 || !projectId || !name || !email) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Find or create donor
    let donor = await prisma.donor.findUnique({ where: { email } });
    if (!donor) {
      donor = await prisma.donor.create({
        data: { email, name },
      });
    }

    // Get project
    const project = await prisma.project.findUnique({
      where: { id: projectId },
    });
    if (!project) {
      return NextResponse.json(
        { error: "Project not found" },
        { status: 404 }
      );
    }

    // Create donation record
    const donation = await prisma.donation.create({
      data: {
        amount: amount * 100, // convert to cents
        projectId,
        donorId: donor.id,
        message: message || null,
        anonymous: anonymous || false,
        status: "pending",
      },
    });

    // Create Stripe checkout session
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const session = await getStripe().checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: `Donation to ${project.title}`,
              description: `Supporting ${project.title} - Statloba For Good`,
            },
            unit_amount: amount * 100,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${baseUrl}/donate/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/donate/cancel`,
      customer_email: email,
      metadata: {
        donationId: donation.id,
        projectId: project.id,
        donorId: donor.id,
      },
    });

    // Update donation with session ID
    await prisma.donation.update({
      where: { id: donation.id },
      data: { stripeSessionId: session.id },
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Checkout error:", error);
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 }
    );
  }
}
