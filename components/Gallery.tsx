import Image from "next/image";
import Link from "next/link";
import ScrollReveal from "./ScrollReveal";
import { projects } from "@/lib/projects";

/** Map gridSize to Tailwind classes for the masonry grid */
const sizeClasses: Record<string, string> = {
  tall: "sm:row-span-2",
  wide: "sm:col-span-2",
  large: "sm:col-span-2 sm:row-span-2",
  normal: "",
};

const categoryColors: Record<string, string> = {
  Rezidențial: "bg-primary/90",
  Comercial: "bg-amber-500/90",
  Industrial: "bg-blue-600/90",
};

export default function Gallery() {
  return (
    <section id="proiecte" className="py-16 lg:py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center max-w-2xl mx-auto">
            <p className="text-sm font-semibold text-primary tracking-widest uppercase mb-4">
              Portofoliu
            </p>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
              Proiecte realizate
            </h2>
            <p className="mt-4 text-gray-600 leading-relaxed">
              O parte din proiectele noastre finalizate, de la locuințe
              individuale la instalații comerciale și industriale.
            </p>
          </div>
        </ScrollReveal>

        {/* Masonry-style grid */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 auto-rows-[240px] grid-flow-dense gap-3">
          {projects.map((project, i) => (
            <ScrollReveal
              key={project.slug}
              delay={i * 80}
              className={sizeClasses[project.gridSize] || ""}
            >
              <Link
                href={`/proiecte/${project.slug}`}
                className="group relative block h-full w-full rounded-2xl overflow-hidden"
              >
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  quality={85}
                />

                {/* Default overlay — subtle gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

                {/* Hover overlay — darker */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Category badge — always visible */}
                <div className="absolute top-4 left-4">
                  <span
                    className={`text-[11px] font-semibold text-white px-2.5 py-1 rounded-full ${categoryColors[project.category]}`}
                  >
                    {project.category}
                  </span>
                </div>

                {/* Bottom info — always visible */}
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <h3 className="text-white font-bold text-base lg:text-lg leading-tight">
                    {project.title}
                  </h3>
                  <div className="flex items-center gap-3 mt-1.5">
                    <span className="text-white/70 text-sm">
                      {project.capacity}
                    </span>
                    <span className="w-1 h-1 rounded-full bg-white/40" />
                    <span className="text-white/70 text-sm">
                      {project.year}
                    </span>
                  </div>
                </div>

                {/* Hover arrow */}
                <div className="absolute top-4 right-4 w-9 h-9 bg-white/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                  <svg
                    className="w-4 h-4 text-gray-900"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2.5}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25"
                    />
                  </svg>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
