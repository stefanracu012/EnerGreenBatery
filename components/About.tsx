import Image from "next/image";
import ScrollReveal from "./ScrollReveal";

export default function About() {
  return (
    <section id="despre" className="py-16 lg:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <ScrollReveal>
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=800&q=80"
                alt="Instalare panouri solare"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent" />
            </div>
          </ScrollReveal>

          {/* Text */}
          <ScrollReveal delay={200}>
            <div>
              <p className="text-sm font-semibold text-primary tracking-widest uppercase mb-4">
                Despre noi
              </p>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
                De ce EnerGreenBatery
              </h2>

              <div className="mt-6 space-y-4 text-gray-600 leading-relaxed">
                <p>
                  Suntem o echipă de specialiști în energie solară cu experiență
                  în proiectarea și instalarea sistemelor fotovoltaice pentru
                  sectorul rezidențial, comercial și industrial.
                </p>
                <p>
                  Fiecare proiect este tratat individual, cu atenție la detalii
                  tehnice, eficiență energetică și raport calitate-preț. Lucrăm
                  exclusiv cu componente de top și oferim garanție extinsă
                  pentru toate instalațiile.
                </p>
                <p>
                  Misiunea noastră este simplă: să facem tranziția către energia
                  verde accesibilă, transparentă și fiabilă.
                </p>
              </div>

              {/* Stats */}
              <div className="mt-10 grid grid-cols-3 gap-8">
                <div>
                  <div className="text-3xl font-bold text-primary">8+</div>
                  <div className="mt-1 text-sm text-gray-500">
                    Ani experiență
                  </div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary">500+</div>
                  <div className="mt-1 text-sm text-gray-500">
                    Proiecte finalizate
                  </div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary">3 MW</div>
                  <div className="mt-1 text-sm text-gray-500">
                    Putere instalată
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
