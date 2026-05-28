import { PrismaClient } from "./src/generated/prisma/client.js";
import { PrismaNeon } from "@prisma/adapter-neon";
import "dotenv/config";

const adapter = new PrismaNeon({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

const projectsData = [
  {
    slug: "youth-sports-portland",
    title: "Youth Sports Academy",
    subtitle: "Portland, Oregon",
    description: "Providing free after-school sports programs for underserved youth in Portland. We combine athletic training with mentorship, digital literacy workshops, and health education to build confident, capable young leaders. Our program serves over 200 youth annually across 5 community centers.",
    category: "direct",
    country: "United States",
    goalAmount: 7500000,
    raisedAmount: 4230000,
    status: "active",
    featured: true,
  },
  {
    slug: "womens-health-fair",
    title: "Women's Health & Wellness Fair",
    subtitle: "Annual Community Event",
    description: "Free annual health fair providing medical screenings, wellness workshops, mental health resources, and fitness demonstrations for women in underserved communities. Last year we served 500+ women with free health screenings and connected 150 to ongoing care.",
    category: "direct",
    country: "United States",
    goalAmount: 3500000,
    raisedAmount: 2100000,
    status: "active",
    featured: true,
  },
  {
    slug: "digital-literacy-syria",
    title: "Digital Futures Syria",
    subtitle: "Partner: Tech Bridge Foundation",
    description: "Equipping displaced youth in northern Syria with digital skills through mobile learning labs. The program teaches coding basics, digital literacy, and online safety to young people who have been cut off from traditional education pathways due to conflict.",
    category: "partner",
    country: "Syria",
    partnerName: "Tech Bridge Foundation",
    goalAmount: 5000000,
    raisedAmount: 1850000,
    status: "active",
    featured: true,
  },
  {
    slug: "sport-for-peace-colombia",
    title: "Sport for Peace Colombia",
    subtitle: "Partner: Fundacion Paz y Deporte",
    description: "Using football as a tool for reconciliation in post-conflict Colombian communities. The program brings together youth from different backgrounds through structured sports leagues, conflict resolution training, and community building events.",
    category: "partner",
    country: "Colombia",
    partnerName: "Fundacion Paz y Deporte",
    goalAmount: 4000000,
    raisedAmount: 2750000,
    status: "active",
    featured: false,
  },
  {
    slug: "data-skills-bootcamp",
    title: "Data & AI Skills Bootcamp",
    subtitle: "Closing the Digital Divide",
    description: "An intensive 12-week bootcamp providing hands-on data science and AI training to underrepresented individuals. Participants learn Python, data analysis, and machine learning fundamentals, with job placement support upon completion.",
    category: "direct",
    country: "United States",
    goalAmount: 6000000,
    raisedAmount: 3400000,
    status: "active",
    featured: false,
  },
  {
    slug: "community-sports-kenya",
    title: "Running for Opportunity Kenya",
    subtitle: "Partner: Nairobi Youth Athletics",
    description: "Supporting talented young athletes in Nairobi's informal settlements with training facilities, coaching, education scholarships, and nutrition programs. Athletics becomes the bridge to education and opportunity for talented youth.",
    category: "partner",
    country: "Kenya",
    partnerName: "Nairobi Youth Athletics",
    goalAmount: 3000000,
    raisedAmount: 980000,
    status: "active",
    featured: false,
  },
];

async function main() {
  console.log("Seeding database...");

  await prisma.expense.deleteMany();
  await prisma.donation.deleteMany();
  await prisma.donor.deleteMany();
  await prisma.project.deleteMany();

  for (const project of projectsData) {
    const created = await prisma.project.create({ data: project });
    console.log("Created project:", created.title);

    const expenses = [
      { amount: Math.round(project.raisedAmount * 0.3), description: "Program staff and coordination", category: "personnel", date: new Date("2025-11-15"), projectId: created.id },
      { amount: Math.round(project.raisedAmount * 0.2), description: "Equipment and supplies", category: "supplies", date: new Date("2025-12-01"), projectId: created.id },
      { amount: Math.round(project.raisedAmount * 0.1), description: "Venue and logistics", category: "operations", date: new Date("2026-01-10"), projectId: created.id },
      { amount: Math.round(project.raisedAmount * 0.05), description: "Travel and transportation", category: "travel", date: new Date("2026-02-15"), projectId: created.id },
    ];

    for (const expense of expenses) {
      await prisma.expense.create({ data: expense });
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
