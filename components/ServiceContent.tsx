"use client";

import { useState } from "react";
import type { ServiceCategory } from "@/lib/data";
import { fmt } from "@/lib/format";

interface ServiceContentProps {
  service: ServiceCategory;
  index: number;
  isEven: boolean;
}

export default function ServiceContent({
  service,
  index,
  isEven,
}: ServiceContentProps) {
  const defaultIdx = service.packages.findIndex((p) => p.popular);
  const [activeIdx, setActiveIdx] = useState(defaultIdx >= 0 ? defaultIdx : 0);
  const pkg = service.packages[activeIdx];

  return (
    <div
      className={`px-6 lg:px-12 py-10 lg:py-12 ${isEven ? "" : "lg:order-1"}`}
    >
      {/* Label */}
      <span className="inline-block text-xs font-semibold text-primary tracking-widest uppercase mb-3">
        0{index + 1} / Serviciu
      </span>
      <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 leading-tight">
        {service.title}
      </h3>
      <p className="mt-3 text-gray-500 leading-relaxed text-sm lg:text-base">
        {service.fullDescription}
      </p>

      {/* Package selector tabs */}
      <div className="mt-5 flex flex-wrap gap-2">
        {service.packages.map((p, i) => {
          const isActive = i === activeIdx;
          return (
            <button
              key={p.id}
              onClick={() => setActiveIdx(i)}
              className={`relative cursor-pointer rounded-lg px-4 py-2.5 text-center transition-all duration-200 ${
                isActive
                  ? "bg-primary text-white shadow-md shadow-primary/20 scale-[1.02]"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              <div className="text-lg font-bold tabular-nums leading-none">
                {p.capacity}
                <span className="text-xs font-semibold ml-0.5">kW</span>
              </div>
              <div
                className={`text-xs mt-1 tabular-nums ${
                  isActive ? "text-white/80" : "text-gray-400"
                }`}
              >
                {fmt(p.totalPrice)} €
              </div>
              {p.popular && (
                <span
                  className={`absolute -top-2 -right-2 text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                    isActive ? "bg-white text-primary" : "bg-primary text-white"
                  }`}
                >
                  Popular
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Package info bar */}
      <div className="mt-4 flex flex-wrap items-center gap-5 text-sm text-gray-500">
        <span className="font-medium text-gray-900">{pkg.name}</span>
        <span className="hidden sm:inline text-gray-300">|</span>
        <span>~{fmt(pkg.production)} kWh/an</span>
        <span className="hidden sm:inline text-gray-300">|</span>
        <span>~{pkg.areaNeeded} m² acoperiș</span>
      </div>

      {/* Product table */}
      <div className="mt-4 rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="text-left py-2 px-4 font-semibold text-gray-500 uppercase tracking-wider text-[11px]">
                  Produs
                </th>
                <th className="text-left py-2 px-3 font-semibold text-gray-500 uppercase tracking-wider text-[11px] hidden sm:table-cell">
                  Specificații
                </th>
                <th className="text-center py-2 px-3 font-semibold text-gray-500 uppercase tracking-wider text-[11px]">
                  Cant.
                </th>
                <th className="text-right py-2 px-3 font-semibold text-gray-500 uppercase tracking-wider text-[11px] hidden sm:table-cell">
                  Preț unit.
                </th>
                <th className="text-right py-2 px-4 font-semibold text-gray-500 uppercase tracking-wider text-[11px]">
                  Total
                </th>
              </tr>
            </thead>
            <tbody>
              {pkg.products.map((product, pi) => (
                <tr
                  key={`${product.name}-${pi}`}
                  className="border-b border-gray-50 hover:bg-gray-50/80 transition-colors"
                >
                  <td className="py-2 px-4 font-medium text-gray-900">
                    {product.name}
                  </td>
                  <td className="py-2 px-3 text-gray-500 hidden sm:table-cell">
                    {product.spec}
                  </td>
                  <td className="py-2 px-3 text-center text-gray-700 tabular-nums">
                    {product.quantity} {product.unit}
                  </td>
                  <td className="py-2 px-3 text-right text-gray-700 tabular-nums hidden sm:table-cell">
                    {fmt(product.unitPrice)} €
                  </td>
                  <td className="py-2 px-4 text-right font-semibold text-gray-900 tabular-nums">
                    {fmt(product.totalPrice)} €
                  </td>
                </tr>
              ))}
              {/* Installation row */}
              <tr className="border-b border-gray-100 hover:bg-gray-50/80 transition-colors">
                <td className="py-2 px-4 font-medium text-gray-900">
                  Manoperă instalare
                </td>
                <td className="py-2 px-3 text-gray-500 hidden sm:table-cell">
                  Instalare completă
                </td>
                <td className="py-2 px-3 text-center text-gray-700">—</td>
                <td className="py-2 px-3 text-right text-gray-700 hidden sm:table-cell">
                  —
                </td>
                <td className="py-2 px-4 text-right font-semibold text-gray-900 tabular-nums">
                  {fmt(pkg.installationPrice)} €
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Totals footer */}
        <div className="px-4 py-3 bg-gray-50 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-5">
            <div>
              <div className="text-[10px] text-gray-400 uppercase tracking-wider">
                Total pachet
              </div>
              <div className="text-xl font-bold text-gray-900 tabular-nums">
                {fmt(pkg.totalPrice)} €
              </div>
            </div>
            <div className="h-7 w-px bg-gray-200" />
            <div>
              <div className="text-[10px] text-gray-400 uppercase tracking-wider">
                Preț / m²
              </div>
              <div className="text-lg font-bold text-primary tabular-nums">
                {fmt(pkg.pricePerM2)} €/m²
              </div>
            </div>
          </div>
          <button
            type="button"
            onClick={() => {
              window.location.hash = `contact?serviciu=${encodeURIComponent(service.title)}&pachet=${encodeURIComponent(pkg.name)}`;
              document
                .getElementById("contact")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
            className="cursor-pointer inline-flex items-center justify-center px-6 py-3 bg-primary text-white rounded-xl font-semibold hover:bg-primary-dark transition-colors text-sm"
          >
            Solicită ofertă
          </button>
        </div>
      </div>
    </div>
  );
}
