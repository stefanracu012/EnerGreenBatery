"use client";

import {
  SigenergiLogo,
  SolisLogo,
  SolarEdgeLogo,
  HuaweiLogo,
  TrinaSolarLogo,
  ViessmannLogo,
} from "./PartnerLogos";

const partners = [
  { id: "sigenergi", Logo: SigenergiLogo, label: "Sigenergi" },
  { id: "solis", Logo: SolisLogo, label: "Solis" },
  { id: "solaredge", Logo: SolarEdgeLogo, label: "SolarEdge" },
  { id: "huawei", Logo: HuaweiLogo, label: "Huawei" },
  { id: "trina", Logo: TrinaSolarLogo, label: "Trina Solar" },
  { id: "viessmann", Logo: ViessmannLogo, label: "Viessmann" },
];

export default function Partners() {
  /* Duplicate the list for seamless infinite scroll */
  const all = [...partners, ...partners];

  return (
    <section className="bg-white border-b border-gray-100 py-10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 mb-6">
        <p className="text-center text-xs font-semibold tracking-widest uppercase text-gray-400">
          Parteneri & branduri reprezentate
        </p>
      </div>

      {/* Scrolling ticker */}
      <div className="relative flex">
        <div className="flex animate-marquee gap-16 items-center whitespace-nowrap">
          {all.map(({ id, Logo, label }, i) => (
            <div
              key={`${id}-${i}`}
              className="flex items-center justify-center h-10 min-w-[140px] text-gray-400 hover:text-primary transition-colors duration-300"
              title={label}
            >
              <Logo className="h-8 w-auto max-w-[140px]" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
