import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative w-full min-h-screen flex items-center">
      {/* Background Image */}
      <Image
        src="https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1920&q=80"
        alt="Panouri solare"
        fill
        className="object-cover"
        priority
        quality={85}
      />

      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/30" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-32 w-full">
        <div className="max-w-2xl">
          <div className="inline-block px-4 py-1.5 bg-primary/20 border border-primary/30 rounded-full mb-8">
            <span className="text-sm font-medium text-primary-light tracking-wide">
              Energie curată, viitor sigur
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-[1.08] tracking-tight">
            Energia solară
            <br />
            <span className="text-primary-light">începe aici</span>
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-white/80 leading-relaxed max-w-xl">
            Soluții fotovoltaice complete pentru casa și afacerea ta. Investiție
            inteligentă, energie curată, independență reală.
          </p>

          <div className="mt-10">
            <a
              href="#contact"
              className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-white bg-primary rounded-xl hover:bg-primary-dark transition-all duration-200 shadow-lg shadow-primary/25"
            >
              Solicită consultanță
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
