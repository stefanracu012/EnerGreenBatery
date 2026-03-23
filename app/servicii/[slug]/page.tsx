import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { services } from "@/lib/data";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) return {};
  return {
    title: `${service.title} — EnerGreenBatery`,
    description: service.shortDescription,
  };
}

export default async function ServicePage({ params }: PageProps) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) notFound();

  return (
    <div>
      {/* Header */}
      <section className="relative h-[60vh] lg:h-[70vh] overflow-hidden">
        <Image
          src={service.image}
          alt={service.title}
          fill
          className="object-cover"
          sizes="100vw"
          quality={90}
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/30" />
        <div className="absolute bottom-0 left-0 right-0 z-10">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 pb-10 lg:pb-14">
            <Link
              href="/#servicii"
              className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors mb-5"
            >
              <span>&larr;</span> Înapoi la servicii
            </Link>
            <h1 className="text-4xl lg:text-5xl font-bold text-white">
              {service.title}
            </h1>
            <p className="mt-4 text-lg text-white/80 max-w-2xl leading-relaxed">
              {service.fullDescription}
            </p>
          </div>
        </div>
      </section>

      {/* Packages */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-sm font-semibold text-primary tracking-widest uppercase mb-4">
              Pachete complete
            </p>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
              Alege pachetul potrivit
            </h2>
            <p className="mt-4 text-gray-600 leading-relaxed">
              Fiecare pachet include toate componentele necesare, cu prețuri
              transparente per produs.
            </p>
          </div>

          <div className="space-y-20">
            {service.packages.map((pkg) => (
              <div
                key={pkg.id}
                className={`rounded-2xl border ${
                  pkg.popular
                    ? "border-primary shadow-lg shadow-primary/10"
                    : "border-gray-200"
                } overflow-hidden`}
              >
                {/* Package header */}
                <div
                  className={`px-8 py-6 ${
                    pkg.popular
                      ? "bg-primary text-white"
                      : "bg-gray-50 text-gray-900"
                  }`}
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-3">
                        <h3 className="text-2xl font-bold">{pkg.name}</h3>
                        {pkg.popular && (
                          <span className="bg-white/20 text-white text-xs font-semibold px-3 py-1 rounded-full">
                            Popular
                          </span>
                        )}
                      </div>
                      <p
                        className={`mt-1 text-sm ${
                          pkg.popular ? "text-white/70" : "text-gray-500"
                        }`}
                      >
                        {pkg.subtitle}
                      </p>
                    </div>
                    <div className="flex items-baseline gap-6">
                      <div className="text-right">
                        <div
                          className={`text-xs uppercase tracking-wider ${
                            pkg.popular ? "text-white/60" : "text-gray-400"
                          }`}
                        >
                          Producție anuală
                        </div>
                        <div className="text-lg font-bold tabular-nums">
                          ~{pkg.production.toLocaleString()} kWh
                        </div>
                      </div>
                      <div className="text-right">
                        <div
                          className={`text-xs uppercase tracking-wider ${
                            pkg.popular ? "text-white/60" : "text-gray-400"
                          }`}
                        >
                          Suprafață necesară
                        </div>
                        <div className="text-lg font-bold tabular-nums">
                          ~{pkg.areaNeeded} m²
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Product table */}
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-100 bg-gray-50/50">
                        <th className="text-left py-3.5 px-8 font-semibold text-gray-500 uppercase tracking-wider text-xs">
                          Produs
                        </th>
                        <th className="text-left py-3.5 px-4 font-semibold text-gray-500 uppercase tracking-wider text-xs">
                          Specificații
                        </th>
                        <th className="text-center py-3.5 px-4 font-semibold text-gray-500 uppercase tracking-wider text-xs">
                          Cant.
                        </th>
                        <th className="text-right py-3.5 px-4 font-semibold text-gray-500 uppercase tracking-wider text-xs">
                          Preț unitar
                        </th>
                        <th className="text-right py-3.5 px-8 font-semibold text-gray-500 uppercase tracking-wider text-xs">
                          Total
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {pkg.products.map((product, i) => (
                        <tr
                          key={`${product.name}-${i}`}
                          className="border-b border-gray-50 hover:bg-gray-50/80 transition-colors"
                        >
                          <td className="py-3.5 px-8 font-medium text-gray-900">
                            {product.name}
                          </td>
                          <td className="py-3.5 px-4 text-gray-500">
                            {product.spec}
                          </td>
                          <td className="py-3.5 px-4 text-center text-gray-700 tabular-nums">
                            {product.quantity} {product.unit}
                          </td>
                          <td className="py-3.5 px-4 text-right text-gray-700 tabular-nums">
                            {product.unitPrice.toLocaleString()} EUR
                          </td>
                          <td className="py-3.5 px-8 text-right font-semibold text-gray-900 tabular-nums">
                            {product.totalPrice.toLocaleString()} EUR
                          </td>
                        </tr>
                      ))}
                      {/* Installation row */}
                      <tr className="border-b border-gray-100 hover:bg-gray-50/80 transition-colors">
                        <td className="py-3.5 px-8 font-medium text-gray-900">
                          Manoperă instalare
                        </td>
                        <td className="py-3.5 px-4 text-gray-500">
                          Instalare completă, punere în funcțiune
                        </td>
                        <td className="py-3.5 px-4 text-center text-gray-700">
                          —
                        </td>
                        <td className="py-3.5 px-4 text-right text-gray-700">
                          —
                        </td>
                        <td className="py-3.5 px-8 text-right font-semibold text-gray-900 tabular-nums">
                          {pkg.installationPrice.toLocaleString()} EUR
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* Package footer / totals */}
                <div className="px-8 py-6 bg-gray-50 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="flex items-center gap-8">
                    <div>
                      <div className="text-xs text-gray-400 uppercase tracking-wider">
                        Preț total pachet
                      </div>
                      <div className="text-3xl font-bold text-gray-900 tabular-nums">
                        {pkg.totalPrice.toLocaleString()} EUR
                      </div>
                    </div>
                    <div className="h-10 w-px bg-gray-200" />
                    <div>
                      <div className="text-xs text-gray-400 uppercase tracking-wider">
                        Preț per m²
                      </div>
                      <div className="text-xl font-bold text-primary tabular-nums">
                        {pkg.pricePerM2.toLocaleString()} EUR/m²
                      </div>
                    </div>
                  </div>
                  <Link
                    href="/#contact"
                    className="inline-flex items-center justify-center px-8 py-3.5 bg-primary text-white rounded-xl font-semibold hover:bg-primary-dark transition-colors text-sm"
                  >
                    Solicită ofertă
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 lg:py-24 bg-gray-50">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">
            Ai nevoie de o soluție personalizată?
          </h2>
          <p className="mt-4 text-gray-600 leading-relaxed">
            Contactează-ne pentru o consultanță gratuită. Analizăm consumul tău
            și proiectăm sistemul optim.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/#servicii"
              className="inline-flex items-center justify-center px-8 py-3.5 bg-primary text-white rounded-xl font-semibold hover:bg-primary-dark transition-colors"
            >
              Vezi serviciile
            </Link>
            <Link
              href="/#contact"
              className="inline-flex items-center justify-center px-8 py-3.5 border border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-100 transition-colors"
            >
              Contactează-ne
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
