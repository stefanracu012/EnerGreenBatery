"use client";

import { useState, useMemo } from "react";
import { packages } from "@/lib/data";

export default function Calculator() {
  const [houseSize, setHouseSize] = useState<number>(120);
  const [consumption, setConsumption] = useState<number>(0);

  const result = useMemo(() => {
    let estimatedKw: number;

    if (consumption > 0) {
      // 1 kW produces approximately 1200 kWh/year in Romania
      estimatedKw = (consumption * 12) / 1200;
    } else {
      // Rough estimate: 1 kW per 20m² of house
      estimatedKw = houseSize / 20;
    }

    // Round to 1 decimal
    estimatedKw = Math.round(estimatedKw * 10) / 10;

    // Minimum 2 kW
    estimatedKw = Math.max(2, estimatedKw);

    // Find suggested package
    let suggestedPkg = packages[packages.length - 1];
    for (const pkg of packages) {
      if (pkg.capacity >= estimatedKw) {
        suggestedPkg = pkg;
        break;
      }
    }

    const annualProduction = Math.round(estimatedKw * 1200);
    const annualSavings = Math.round(annualProduction * 0.25);

    return {
      estimatedKw,
      suggestedPkg,
      annualProduction,
      annualSavings,
    };
  }, [houseSize, consumption]);

  return (
    <section id="calculator" className="py-24 lg:py-32 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-sm font-semibold text-primary tracking-widest uppercase mb-4">
            Calculator
          </p>
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
            Estimează costul instalării
          </h2>
          <p className="mt-4 text-gray-600 leading-relaxed">
            Introdu datele locuinței tale pentru o estimare rapidă a sistemului
            fotovoltaic potrivit.
          </p>
        </div>

        <div className="mt-16 max-w-4xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Input Panel */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <h3 className="text-lg font-bold text-gray-900 mb-8">
                Datele tale
              </h3>

              <div className="space-y-10">
                {/* House Size */}
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <label className="text-sm font-medium text-gray-700">
                      Suprafața locuinței
                    </label>
                    <span className="text-sm font-bold text-primary tabular-nums">
                      {houseSize} m²
                    </span>
                  </div>
                  <input
                    type="range"
                    min={40}
                    max={400}
                    step={10}
                    value={houseSize}
                    onChange={(e) => setHouseSize(Number(e.target.value))}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-gray-400 mt-2">
                    <span>40 m²</span>
                    <span>400 m²</span>
                  </div>
                </div>

                {/* Monthly Consumption */}
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <label className="text-sm font-medium text-gray-700">
                      Consum lunar
                      <span className="text-gray-400 font-normal">
                        {" "}
                        (opțional)
                      </span>
                    </label>
                    <span className="text-sm font-bold text-primary tabular-nums">
                      {consumption > 0 ? `${consumption} kWh` : "—"}
                    </span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={2000}
                    step={50}
                    value={consumption}
                    onChange={(e) => setConsumption(Number(e.target.value))}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-gray-400 mt-2">
                    <span>Nespecificat</span>
                    <span>2000 kWh</span>
                  </div>
                  <p className="text-xs text-gray-400 mt-3">
                    Dacă știi consumul lunar, estimarea va fi mai precisă.
                    Găsești această informație pe factura de energie.
                  </p>
                </div>
              </div>
            </div>

            {/* Result Panel */}
            <div className="bg-primary rounded-2xl p-8 text-white flex flex-col">
              <h3 className="text-lg font-bold mb-8">Estimare</h3>

              <div className="space-y-5 flex-1">
                <div className="flex justify-between items-center pb-5 border-b border-white/15">
                  <span className="text-white/70 text-sm">
                    Putere recomandată
                  </span>
                  <span className="text-2xl font-bold tabular-nums">
                    {result.estimatedKw} kW
                  </span>
                </div>

                <div className="flex justify-between items-center pb-5 border-b border-white/15">
                  <span className="text-white/70 text-sm">
                    Producție anuală est.
                  </span>
                  <span className="text-lg font-semibold tabular-nums">
                    ~{result.annualProduction.toLocaleString()} kWh
                  </span>
                </div>

                <div className="flex justify-between items-center pb-5 border-b border-white/15">
                  <span className="text-white/70 text-sm">
                    Economie anuală est.
                  </span>
                  <span className="text-lg font-semibold tabular-nums">
                    ~{result.annualSavings.toLocaleString()} EUR
                  </span>
                </div>

                <div className="flex justify-between items-center pb-5 border-b border-white/15">
                  <span className="text-white/70 text-sm">
                    Pachet recomandat
                  </span>
                  <span className="text-lg font-semibold">
                    {result.suggestedPkg.name}
                  </span>
                </div>

                <div className="pt-2">
                  <div className="text-white/70 text-sm">Preț estimat</div>
                  <div className="text-4xl font-bold mt-2 tabular-nums">
                    {result.suggestedPkg.price.toLocaleString()} EUR
                  </div>
                  <p className="text-white/50 text-xs mt-3 leading-relaxed">
                    Preț orientativ, include echipamente și instalare. Prețul
                    final depinde de specificul proiectului.
                  </p>
                </div>
              </div>

              <a
                href="#contact"
                className="block text-center py-3.5 bg-white text-primary rounded-xl font-semibold hover:bg-white/90 transition-colors duration-200 mt-8"
              >
                Solicită ofertă detaliată
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
