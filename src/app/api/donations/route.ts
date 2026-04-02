import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(req: NextRequest) {
  const email = req.nextUrl.searchParams.get("email");

  if (!email) {
    return NextResponse.json(
      { error: "Email is required" },
      { status: 400 }
    );
  }

  try {
    const donor = await prisma.donor.findUnique({
      where: { email },
      include: {
        donations: {
          where: { status: "completed" },
          orderBy: { createdAt: "desc" },
          include: {
            project: {
              include: {
                expenses: {
                  orderBy: { date: "desc" },
                },
              },
            },
          },
        },
      },
    });

    if (!donor) {
      return NextResponse.json({ donor: null, donations: [] });
    }

    return NextResponse.json({
      donor: {
        id: donor.id,
        name: donor.name,
        email: donor.email,
        createdAt: donor.createdAt,
      },
      donations: donor.donations,
    });
  } catch (error) {
    console.error("Error fetching donations:", error);
    return NextResponse.json(
      { error: "Failed to fetch donations" },
      { status: 500 }
    );
  }
}
