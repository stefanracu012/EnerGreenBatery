import Image from "next/image";
import Link from "next/link";
import ScrollReveal from "./ScrollReveal";
import ServiceContent from "./ServiceContent";
import { prisma } from "@/lib/prisma";

/* ── Helper: derive display values from DB package ── */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function enrichPackage(pkg: any) {
  const products = pkg.products ?? [];
  const productsTotal = products.reduce((s: number, p: { totalPrice: number }) => s + p.totalPrice, 0);
  const installationPrice = pkg.installationPrice ?? 0;
  const totalPrice = productsTotal + installationPrice;
  const production = Math.round(pkg.kw * 1200);
  const areaNeeded = Math.round(pkg.kw * 5.2);
  const pricePerM2 = areaNeeded > 0 ? Math.round(totalPrice / areaNeeded) : 0;
  return {
    id: pkg.id as string,
    name: pkg.name as string,
    subtitle: (pkg.description ?? "") as string,
    capacity: pkg.kw as number,
    production,
    areaNeeded,
    pricePerM2,
    products,
    installationPrice,
    totalPrice,
    popular: pkg.popular as boolean,
  };
}

export default async function Services() {
  const dbServices = await prisma.service.findMany({
    include: { packages: true },
    orderBy: { createdAt: "asc" },
  });

  const services = dbServices.map((s) => ({
    slug: s.slug,
    title: s.title,
    fullDescription: s.description,
    image: s.image ?? "",
    packages: s.packages.map(enrichPackage),
  }));

  return (
    <section id="servicii">
      {/* Header */}
      <div className="pt-16 pb-10 lg:pt-20 lg:pb-12 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center max-w-2xl mx-auto">
              <p className="text-sm font-semibold text-primary tracking-widest uppercase mb-4">
                Servicii
              </p>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
                Soluții pentru fiecare nevoie
              </h2>
              <p className="mt-4 text-gray-600 leading-relaxed">
                De la case individuale la proiecte industriale, oferim sisteme
                fotovoltaice adaptate cerințelor tale specifice.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </div>

      {/* Service blocks */}
      {services.map((service, i) => {
        const isEven = i % 2 === 0;
        return (
          <div
            key={service.slug}
            className={`grid lg:grid-cols-2 ${isEven ? "bg-white" : "bg-gray-50"}`}
          >
            {/* Image side — full half, sticky on desktop */}
            <ScrollReveal delay={0} className={isEven ? "" : "lg:order-2"}>
              <Link
                href={`/servicii/${service.slug}`}
                className="block group relative h-[40vh] lg:h-full lg:sticky lg:top-0 w-full overflow-hidden"
              >
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  quality={90}
                  priority={i === 0}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              </Link>
            </ScrollReveal>

            {/* Content side with interactive package table */}
            <ServiceContent service={service} index={i} isEven={isEven} />
          </div>
        );
      })}
    </section>
  );
}
