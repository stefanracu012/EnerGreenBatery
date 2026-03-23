import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { projects } from "@/lib/projects";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};
  return {
    title: `${project.title} — EnerGreenBatery`,
    description: project.description,
  };
}

const categoryColors: Record<string, string> = {
  Rezidențial: "bg-primary",
  Comercial: "bg-amber-500",
  Industrial: "bg-blue-600",
};

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  // Find related projects (same category, exclude current)
  const related = projects
    .filter((p) => p.category === project.category && p.slug !== project.slug)
    .slice(0, 2);
  const otherProjects =
    related.length > 0
      ? related
      : projects.filter((p) => p.slug !== project.slug).slice(0, 2);

  return (
    <div>
      {/* Hero image */}
      <section className="relative h-[60vh] lg:h-[70vh] overflow-hidden">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover"
          sizes="100vw"
          quality={90}
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

        <div className="absolute bottom-0 left-0 right-0 z-10">
          <div className="max-w-5xl mx-auto px-6 lg:px-8 pb-10 lg:pb-14">
            <Link
              href="/#proiecte"
              className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors mb-5"
            >
              <span>&larr;</span> Înapoi la portofoliu
            </Link>
            <div className="flex items-center gap-3 mb-3">
              <span
                className={`text-xs font-semibold text-white px-3 py-1 rounded-full ${categoryColors[project.category]}`}
              >
                {project.category}
              </span>
              <span className="text-white/60 text-sm">{project.capacity}</span>
              <span className="w-1 h-1 rounded-full bg-white/40" />
              <span className="text-white/60 text-sm">{project.year}</span>
            </div>
            <h1 className="text-3xl lg:text-5xl font-bold text-white">
              {project.title}
            </h1>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
            {/* Left: Description + details */}
            <div className="lg:col-span-3">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Despre proiect
              </h2>
              <p className="text-gray-600 leading-relaxed text-base">
                {project.description}
              </p>

              <h3 className="text-lg font-bold text-gray-900 mt-10 mb-4">
                Ce am realizat
              </h3>
              <ul className="space-y-3">
                {project.details.map((detail, i) => (
                  <li key={i} className="flex items-start gap-3 text-gray-600">
                    <svg
                      className="w-5 h-5 text-primary flex-shrink-0 mt-0.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m4.5 12.75 6 6 9-13.5"
                      />
                    </svg>
                    {detail}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <div className="mt-12 flex flex-col sm:flex-row gap-4">
                <Link
                  href="/#contact"
                  className="inline-flex items-center justify-center px-7 py-3.5 bg-primary text-white rounded-xl font-semibold hover:bg-primary-dark transition-colors text-sm"
                >
                  Solicită ofertă similară
                </Link>
                <Link
                  href="/#servicii"
                  className="inline-flex items-center justify-center px-7 py-3.5 border border-gray-200 text-gray-600 rounded-xl font-semibold hover:bg-gray-50 transition-colors text-sm"
                >
                  Vezi serviciile noastre
                </Link>
              </div>
            </div>

            {/* Right: Specs card */}
            <div className="lg:col-span-2">
              <div className="bg-gray-50 rounded-2xl p-6 lg:p-8 sticky top-32">
                <h3 className="text-lg font-bold text-gray-900 mb-5">
                  Specificații tehnice
                </h3>
                <div className="space-y-4">
                  {project.specs.map((spec) => (
                    <div
                      key={spec.label}
                      className="flex items-center justify-between py-2 border-b border-gray-200 last:border-0"
                    >
                      <span className="text-sm text-gray-500">
                        {spec.label}
                      </span>
                      <span className="text-sm font-semibold text-gray-900">
                        {spec.value}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mt-6 p-4 bg-primary/5 rounded-xl">
                  <div className="flex items-center gap-2 mb-1">
                    <svg
                      className="w-4 h-4 text-primary"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                      />
                    </svg>
                    <span className="text-sm font-semibold text-gray-900">
                      Locație
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">{project.location}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related projects */}
      <section className="py-16 lg:py-20 bg-gray-50">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">
            Alte proiecte
          </h2>
          <div className="grid sm:grid-cols-2 gap-5">
            {otherProjects.map((p) => (
              <Link
                key={p.slug}
                href={`/proiecte/${p.slug}`}
                className="group relative aspect-[16/10] rounded-2xl overflow-hidden"
              >
                <Image
                  src={p.image}
                  alt={p.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, 50vw"
                  quality={80}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <span
                    className={`text-[11px] font-semibold text-white px-2.5 py-1 rounded-full ${categoryColors[p.category]}`}
                  >
                    {p.category}
                  </span>
                  <h3 className="text-white font-bold text-lg mt-2">
                    {p.title}
                  </h3>
                  <span className="text-white/70 text-sm">
                    {p.capacity} · {p.year}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
