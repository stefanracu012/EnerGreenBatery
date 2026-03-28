import type { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";

const BASE = "https://www.energreenbatery.ro";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  /* ── Static pages ── */
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${BASE}/#servicii`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE}/#proiecte`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE}/#despre`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE}/#contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];

  /* ── Dynamic service pages ── */
  const services = await prisma.service.findMany({
    select: { slug: true, updatedAt: true },
  });
  const servicePages: MetadataRoute.Sitemap = services.map((s) => ({
    url: `${BASE}/servicii/${s.slug}`,
    lastModified: s.updatedAt,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  /* ── Dynamic project pages ── */
  const projects = await prisma.project.findMany({
    select: { slug: true, updatedAt: true },
  });
  const projectPages: MetadataRoute.Sitemap = projects.map((p) => ({
    url: `${BASE}/proiecte/${p.slug}`,
    lastModified: p.updatedAt,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticPages, ...servicePages, ...projectPages];
}
