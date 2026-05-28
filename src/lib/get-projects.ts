import { prisma } from "@/lib/db";
import { projectsData, type ProjectData } from "@/lib/projects-data";

function staticToShape(p: ProjectData) {
  return {
    id: p.slug,
    ...p,
    subtitle: p.subtitle ?? null,
    imageUrl: p.imageUrl ?? null,
    partnerName: p.partnerName ?? null,
    partnerSince: p.partnerSince ?? null,
    partnerLogoUrl: p.partnerLogoUrl ?? null,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
}

export async function getAllProjects() {
  try {
    const dbProjects = await prisma.project.findMany({
      where: { status: "active" },
      orderBy: [{ featured: "desc" }, { createdAt: "desc" }],
    });
    if (dbProjects.length > 0) return dbProjects;
  } catch {}
  return projectsData
    .filter((p) => p.status === "active")
    .map(staticToShape);
}

export async function getFeaturedProjects() {
  try {
    const dbProjects = await prisma.project.findMany({
      where: { featured: true, status: "active" },
      take: 4,
      orderBy: { createdAt: "desc" },
    });
    if (dbProjects.length > 0) return dbProjects;
  } catch {}
  return projectsData
    .filter((p) => p.featured && p.status === "active")
    .slice(0, 4)
    .map(staticToShape);
}

export async function getProjectBySlug(slug: string) {
  try {
    const project = await prisma.project.findUnique({
      where: { slug },
      include: {
        donations: {
          where: { status: "completed" },
          orderBy: { createdAt: "desc" },
          take: 10,
          include: { donor: true },
        },
        expenses: {
          orderBy: { date: "desc" },
          take: 10,
        },
      },
    });
    if (project) return project;
  } catch {}

  const staticProject = projectsData.find((p) => p.slug === slug);
  if (!staticProject) return null;

  return {
    ...staticToShape(staticProject),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    donations: [] as any[],
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    expenses: [] as any[],
  };
}
