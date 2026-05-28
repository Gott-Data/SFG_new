import { PrismaClient } from "./src/generated/prisma/client.js";
import { PrismaNeon } from "@prisma/adapter-neon";
import { projectsData } from "./src/lib/projects-data.js";
import "dotenv/config";

const adapter = new PrismaNeon({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Seeding database...");

  await prisma.expense.deleteMany();
  await prisma.donation.deleteMany();
  await prisma.donor.deleteMany();
  await prisma.project.deleteMany();

  for (const project of projectsData) {
    const created = await prisma.project.create({ data: project });
    console.log("Created project:", created.title);

    if (project.raisedAmount > 0) {
      const expenses = [
        { amount: Math.round(project.raisedAmount * 0.3), description: "Program staff and coordination", category: "personnel", date: new Date("2025-11-15"), projectId: created.id },
        { amount: Math.round(project.raisedAmount * 0.2), description: "Equipment and supplies", category: "supplies", date: new Date("2025-12-01"), projectId: created.id },
        { amount: Math.round(project.raisedAmount * 0.1), description: "Venue and logistics", category: "operations", date: new Date("2026-01-10"), projectId: created.id },
        { amount: Math.round(project.raisedAmount * 0.05), description: "Travel and transportation", category: "travel", date: new Date("2026-02-15"), projectId: created.id },
      ];

      for (const expense of expenses) {
        await prisma.expense.create({ data: expense });
      }
    }

    const sampleDonors = [
      { name: "Sarah Johnson", email: "sarah@example.com" },
      { name: "Michael Chen", email: "michael@example.com" },
      { name: "Emily Rodriguez", email: "emily@example.com" },
    ];

    for (const donorData of sampleDonors) {
      let donor = await prisma.donor.findUnique({ where: { email: donorData.email } });
      if (!donor) {
        donor = await prisma.donor.create({ data: donorData });
      }

      await prisma.donation.create({
        data: {
          amount: Math.round(Math.random() * 20000 + 5000),
          status: "completed",
          projectId: created.id,
          donorId: donor.id,
          message: Math.random() > 0.5 ? "Keep up the amazing work!" : null,
          anonymous: Math.random() > 0.8,
        },
      });
    }
  }

  console.log("Seeding complete!");
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
