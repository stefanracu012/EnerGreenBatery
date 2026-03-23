import ScrollReveal from "./ScrollReveal";

const steps = [
  {
    number: "01",
    title: "Consultanță gratuită",
    description:
      "Analizăm consumul tău energetic, evaluăm locația și îți prezentăm opțiunile disponibile. Fără costuri, fără obligații.",
  },
  {
    number: "02",
    title: "Proiectare tehnică",
    description:
      "Realizăm proiectul tehnic complet, dimensionăm sistemul optim și pregătim documentația necesară autorizărilor.",
  },
  {
    number: "03",
    title: "Instalare profesională",
    description:
      "Echipa noastră montează sistemul în cel mai scurt timp, respectând toate standardele de calitate și siguranță.",
  },
  {
    number: "04",
    title: "Activare și monitorizare",
    description:
      "Punem în funcțiune sistemul, configurăm monitorizarea și rămânem alături de tine pe termen lung.",
  },
];

export default function Process() {
  return (
    <section className="py-16 lg:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center max-w-2xl mx-auto">
            <p className="text-sm font-semibold text-primary tracking-widest uppercase mb-4">
              Proces
            </p>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
              Cum funcționează
            </h2>
            <p className="mt-4 text-gray-600 leading-relaxed">
              De la prima discuție până la energia verde pe acoperișul tău,
              procesul este simplu și transparent.
            </p>
          </div>
        </ScrollReveal>

        <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {steps.map((step, i) => (
            <ScrollReveal key={step.number} delay={i * 150}>
              <div className="relative">
                <div className="text-7xl font-bold text-gray-100 leading-none select-none">
                  {step.number}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mt-4">
                  {step.title}
                </h3>
                <p className="mt-2 text-gray-600 text-sm leading-relaxed">
                  {step.description}
                </p>
                {/* Connector line for desktop */}
                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-10 left-[calc(100%+8px)] w-[calc(100%-16px)] h-px bg-gradient-to-r from-gray-200 to-transparent" />
                )}
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
