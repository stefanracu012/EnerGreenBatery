import ScrollReveal from "./ScrollReveal";
import { packages } from "@/lib/data";

export default function Packages() {
  return (
    <section id="pachete" className="py-24 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center max-w-2xl mx-auto">
            <p className="text-sm font-semibold text-primary tracking-widest uppercase mb-4">
              Pachete
            </p>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
              Pachete solare complete
            </h2>
            <p className="mt-4 text-gray-600 leading-relaxed">
              Alege pachetul potrivit pentru tine. Toate pachetele includ
              instalare profesională și garanție extinsă.
            </p>
          </div>
        </ScrollReveal>

        <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {packages.map((pkg, i) => (
            <ScrollReveal key={pkg.id} delay={i * 100}>
              <div
                className={`relative rounded-2xl p-8 h-full flex flex-col ${
                  pkg.popular
                    ? "bg-primary text-white shadow-xl shadow-primary/20 ring-2 ring-primary"
                    : "bg-white border border-gray-200 hover:border-primary/30 shadow-sm hover:shadow-md"
                } transition-all duration-300`}
              >
                {pkg.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="bg-secondary text-white text-xs font-semibold px-4 py-1 rounded-full whitespace-nowrap">
                      Popular
                    </span>
                  </div>
                )}

                <div>
                  <h3
                    className={`text-lg font-bold ${
                      pkg.popular ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {pkg.name}
                  </h3>
                  <p
                    className={`text-sm mt-1 ${
                      pkg.popular ? "text-white/70" : "text-gray-500"
                    }`}
                  >
                    {pkg.subtitle}
                  </p>
                </div>

                <div className="mt-6">
                  <div
                    className={`text-4xl font-bold ${
                      pkg.popular ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {pkg.capacity} kW
                  </div>
                  <p
                    className={`text-sm mt-1 ${
                      pkg.popular ? "text-white/70" : "text-gray-500"
                    }`}
                  >
                    ~{pkg.production.toLocaleString()} kWh/an
                  </p>
                </div>

                <ul className="mt-6 space-y-2.5 flex-1">
                  {pkg.components.map((comp) => (
                    <li
                      key={comp}
                      className={`flex items-start gap-2.5 text-sm ${
                        pkg.popular ? "text-white/90" : "text-gray-600"
                      }`}
                    >
                      <span
                        className={`w-1 h-1 rounded-full mt-2 flex-shrink-0 ${
                          pkg.popular ? "bg-white/60" : "bg-primary"
                        }`}
                      />
                      {comp}
                    </li>
                  ))}
                </ul>

                <div
                  className={`mt-8 pt-6 border-t ${
                    pkg.popular ? "border-white/20" : "border-gray-100"
                  }`}
                >
                  <div
                    className={`text-sm ${
                      pkg.popular ? "text-white/70" : "text-gray-500"
                    }`}
                  >
                    Preț de la
                  </div>
                  <div
                    className={`text-2xl font-bold mt-1 ${
                      pkg.popular ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {pkg.price.toLocaleString()} EUR
                  </div>
                  <a
                    href="#contact"
                    className={`mt-4 block text-center py-3 rounded-xl text-sm font-semibold transition-colors duration-200 ${
                      pkg.popular
                        ? "bg-white text-primary hover:bg-white/90"
                        : "bg-primary text-white hover:bg-primary-dark"
                    }`}
                  >
                    Solicită ofertă
                  </a>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
