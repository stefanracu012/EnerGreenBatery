// ─── Product within a package ───────────────────────────────────────

export interface PackageProduct {
  name: string;
  spec: string;
  quantity: number;
  unit: string;
  unitPrice: number;
  totalPrice: number;
}

// ─── Complete service package ───────────────────────────────────────

export interface ServicePackage {
  id: string;
  name: string;
  subtitle: string;
  capacity: number;
  production: number;
  areaNeeded: number; // m² suprafață acoperiș necesară
  pricePerM2: number;
  products: PackageProduct[];
  installationPrice: number;
  totalPrice: number;
  popular?: boolean;
}

// ─── Service category ───────────────────────────────────────────────

export interface ServiceCategory {
  slug: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  image: string;
  features: string[];
  packages: ServicePackage[];
}

// ─── Helper: compute totals ─────────────────────────────────────────

function buildPackage(
  p: Omit<ServicePackage, "totalPrice" | "pricePerM2">
): ServicePackage {
  const productsTotal = p.products.reduce((s, pr) => s + pr.totalPrice, 0);
  const totalPrice = productsTotal + p.installationPrice;
  const pricePerM2 = Math.round(totalPrice / p.areaNeeded);
  return { ...p, totalPrice, pricePerM2 };
}

// ═══════════════════════════════════════════════════════════════════
//  SERVICES
// ═══════════════════════════════════════════════════════════════════

export const services: ServiceCategory[] = [
  // ── REZIDENȚIAL ───────────────────────────────────────────────────
  {
    slug: "rezidential",
    title: "Rezidențial",
    shortDescription:
      "Sisteme fotovoltaice complete pentru locuințe, dimensionate pe consumul real al familiei tale.",
    fullDescription:
      "Oferim soluții fotovoltaice la cheie pentru case și apartamente. Fiecare sistem este proiectat individual, ținând cont de consumul tău energetic, orientarea acoperișului și bugetul disponibil. Toate componentele sunt de calitate premium, cu garanție extinsă.",
    image:
      "https://images.unsplash.com/photo-1558449028-b53a39d100fc?w=3200&q=90&auto=format&fit=crop",
    features: [
      "Panouri de ultimă generație",
      "Invertor on-grid sau hibrid",
      "Monitorizare în timp real",
      "Garanție extinsă 10+ ani",
    ],
    packages: [
      buildPackage({
        id: "rez-3kw",
        name: "Casa Mică",
        subtitle: "3 kW — consum redus",
        capacity: 3,
        production: 3600,
        areaNeeded: 16,
        installationPrice: 450,
        products: [
          { name: "Panou fotovoltaic", spec: "550W monocristalin", quantity: 6, unit: "buc", unitPrice: 185, totalPrice: 1110 },
          { name: "Invertor on-grid", spec: "3 kW, WiFi integrat", quantity: 1, unit: "buc", unitPrice: 680, totalPrice: 680 },
          { name: "Contor bidirectional", spec: "Smart meter trifazat", quantity: 1, unit: "buc", unitPrice: 220, totalPrice: 220 },
          { name: "Structură montaj", spec: "Aluminiu, acoperiș țiglă", quantity: 6, unit: "set", unitPrice: 45, totalPrice: 270 },
          { name: "Cablu solar DC", spec: "6mm², dublu izolat", quantity: 30, unit: "m", unitPrice: 4.5, totalPrice: 135 },
          { name: "Cablu AC", spec: "3x4mm²", quantity: 15, unit: "m", unitPrice: 6, totalPrice: 90 },
          { name: "Protecții DC", spec: "Siguranțe + descărcător", quantity: 1, unit: "set", unitPrice: 165, totalPrice: 165 },
          { name: "Protecții AC", spec: "Întrerupător + diferențial", quantity: 1, unit: "set", unitPrice: 120, totalPrice: 120 },
          { name: "Conectori MC4", spec: "Pereche", quantity: 8, unit: "buc", unitPrice: 5, totalPrice: 40 },
          { name: "Priză de pământ", spec: "Kit complet", quantity: 1, unit: "set", unitPrice: 85, totalPrice: 85 },
        ],
      }),
      buildPackage({
        id: "rez-5kw",
        name: "Standard",
        subtitle: "5 kW — consum mediu",
        capacity: 5,
        production: 6000,
        areaNeeded: 26,
        installationPrice: 600,
        popular: true,
        products: [
          { name: "Panou fotovoltaic", spec: "550W monocristalin", quantity: 10, unit: "buc", unitPrice: 185, totalPrice: 1850 },
          { name: "Invertor on-grid", spec: "5 kW, WiFi integrat", quantity: 1, unit: "buc", unitPrice: 920, totalPrice: 920 },
          { name: "Contor bidirectional", spec: "Smart meter trifazat", quantity: 1, unit: "buc", unitPrice: 220, totalPrice: 220 },
          { name: "Structură montaj", spec: "Aluminiu, acoperiș țiglă", quantity: 10, unit: "set", unitPrice: 45, totalPrice: 450 },
          { name: "Cablu solar DC", spec: "6mm², dublu izolat", quantity: 50, unit: "m", unitPrice: 4.5, totalPrice: 225 },
          { name: "Cablu AC", spec: "3x6mm²", quantity: 20, unit: "m", unitPrice: 7.5, totalPrice: 150 },
          { name: "Protecții DC", spec: "Siguranțe + descărcător", quantity: 1, unit: "set", unitPrice: 195, totalPrice: 195 },
          { name: "Protecții AC", spec: "Întrerupător + diferențial", quantity: 1, unit: "set", unitPrice: 140, totalPrice: 140 },
          { name: "Conectori MC4", spec: "Pereche", quantity: 12, unit: "buc", unitPrice: 5, totalPrice: 60 },
          { name: "Priză de pământ", spec: "Kit complet", quantity: 1, unit: "set", unitPrice: 85, totalPrice: 85 },
          { name: "Sistem monitorizare", spec: "Smart dongle WiFi", quantity: 1, unit: "buc", unitPrice: 75, totalPrice: 75 },
        ],
      }),
      buildPackage({
        id: "rez-7kw",
        name: "Comfort",
        subtitle: "7 kW — familie mare",
        capacity: 7,
        production: 8400,
        areaNeeded: 37,
        installationPrice: 750,
        products: [
          { name: "Panou fotovoltaic", spec: "550W monocristalin", quantity: 13, unit: "buc", unitPrice: 185, totalPrice: 2405 },
          { name: "Invertor on-grid", spec: "7 kW, WiFi integrat", quantity: 1, unit: "buc", unitPrice: 1100, totalPrice: 1100 },
          { name: "Contor bidirectional", spec: "Smart meter trifazat", quantity: 1, unit: "buc", unitPrice: 220, totalPrice: 220 },
          { name: "Structură montaj", spec: "Aluminiu, acoperiș țiglă", quantity: 13, unit: "set", unitPrice: 45, totalPrice: 585 },
          { name: "Cablu solar DC", spec: "6mm², dublu izolat", quantity: 65, unit: "m", unitPrice: 4.5, totalPrice: 292.5 },
          { name: "Cablu AC", spec: "3x6mm²", quantity: 20, unit: "m", unitPrice: 7.5, totalPrice: 150 },
          { name: "Protecții DC", spec: "Siguranțe + descărcător", quantity: 1, unit: "set", unitPrice: 210, totalPrice: 210 },
          { name: "Protecții AC", spec: "Întrerupător + diferențial", quantity: 1, unit: "set", unitPrice: 150, totalPrice: 150 },
          { name: "Conectori MC4", spec: "Pereche", quantity: 15, unit: "buc", unitPrice: 5, totalPrice: 75 },
          { name: "Priză de pământ", spec: "Kit complet", quantity: 1, unit: "set", unitPrice: 85, totalPrice: 85 },
          { name: "Sistem monitorizare", spec: "Smart dongle WiFi", quantity: 1, unit: "buc", unitPrice: 75, totalPrice: 75 },
        ],
      }),
      buildPackage({
        id: "rez-10kw",
        name: "Premium",
        subtitle: "10 kW — independență energetică",
        capacity: 10,
        production: 12000,
        areaNeeded: 52,
        installationPrice: 950,
        products: [
          { name: "Panou fotovoltaic", spec: "550W monocristalin", quantity: 18, unit: "buc", unitPrice: 185, totalPrice: 3330 },
          { name: "Invertor hibrid", spec: "10 kW, compatibil baterie", quantity: 1, unit: "buc", unitPrice: 1650, totalPrice: 1650 },
          { name: "Baterie LiFePO4", spec: "5.12 kWh", quantity: 1, unit: "buc", unitPrice: 1350, totalPrice: 1350 },
          { name: "Contor bidirectional", spec: "Smart meter trifazat", quantity: 1, unit: "buc", unitPrice: 220, totalPrice: 220 },
          { name: "Structură montaj", spec: "Aluminiu, acoperiș țiglă", quantity: 18, unit: "set", unitPrice: 45, totalPrice: 810 },
          { name: "Cablu solar DC", spec: "6mm², dublu izolat", quantity: 80, unit: "m", unitPrice: 4.5, totalPrice: 360 },
          { name: "Cablu AC", spec: "3x10mm²", quantity: 25, unit: "m", unitPrice: 10, totalPrice: 250 },
          { name: "Cablu baterie", spec: "25mm², flexibil", quantity: 6, unit: "m", unitPrice: 18, totalPrice: 108 },
          { name: "Protecții DC", spec: "Siguranțe + descărcător", quantity: 1, unit: "set", unitPrice: 240, totalPrice: 240 },
          { name: "Protecții AC", spec: "Întrerupător + diferențial", quantity: 1, unit: "set", unitPrice: 165, totalPrice: 165 },
          { name: "Conectori MC4", spec: "Pereche", quantity: 20, unit: "buc", unitPrice: 5, totalPrice: 100 },
          { name: "Priză de pământ", spec: "Kit complet", quantity: 1, unit: "set", unitPrice: 85, totalPrice: 85 },
          { name: "Sistem monitorizare", spec: "Smart dongle WiFi", quantity: 1, unit: "buc", unitPrice: 75, totalPrice: 75 },
        ],
      }),
    ],
  },

  // ── COMERCIAL ─────────────────────────────────────────────────────
  {
    slug: "comercial",
    title: "Comercial",
    shortDescription:
      "Soluții pentru magazine, birouri și spații comerciale. Reducem costurile operaționale ale afacerii tale.",
    fullDescription:
      "Proiectăm și instalăm sisteme fotovoltaice pentru clădiri comerciale, magazine, birouri și spații de depozitare. Dimensionăm fiecare sistem pe consumul real, maximizăm autoconsumate și oferim ROI rapid.",
    image:
      "https://images.unsplash.com/photo-1545208942-e1c9c916524b?w=3200&q=90&auto=format&fit=crop",
    features: [
      "Dimensionare pe consum real",
      "ROI în 4-6 ani",
      "Mentenanță inclusă 2 ani",
      "Integrare smart grid",
    ],
    packages: [
      buildPackage({
        id: "com-15kw",
        name: "Business Start",
        subtitle: "15 kW — magazin / birou mic",
        capacity: 15,
        production: 18000,
        areaNeeded: 80,
        installationPrice: 1400,
        products: [
          { name: "Panou fotovoltaic", spec: "550W monocristalin", quantity: 28, unit: "buc", unitPrice: 175, totalPrice: 4900 },
          { name: "Invertor on-grid", spec: "15 kW, trifazat", quantity: 1, unit: "buc", unitPrice: 1850, totalPrice: 1850 },
          { name: "Contor bidirectional", spec: "Smart meter trifazat", quantity: 1, unit: "buc", unitPrice: 280, totalPrice: 280 },
          { name: "Structură montaj", spec: "Aluminiu, acoperiș tablă/terasă", quantity: 28, unit: "set", unitPrice: 42, totalPrice: 1176 },
          { name: "Cablu solar DC", spec: "6mm², dublu izolat", quantity: 120, unit: "m", unitPrice: 4.5, totalPrice: 540 },
          { name: "Cablu AC", spec: "5x10mm²", quantity: 30, unit: "m", unitPrice: 15, totalPrice: 450 },
          { name: "Protecții DC", spec: "Siguranțe + descărcătoare", quantity: 2, unit: "set", unitPrice: 195, totalPrice: 390 },
          { name: "Protecții AC", spec: "Întrerupătoare + diferențial", quantity: 1, unit: "set", unitPrice: 250, totalPrice: 250 },
          { name: "Tablou AC/DC", spec: "Complet echipat", quantity: 1, unit: "buc", unitPrice: 320, totalPrice: 320 },
          { name: "Conectori MC4", spec: "Pereche", quantity: 30, unit: "buc", unitPrice: 5, totalPrice: 150 },
          { name: "Priză de pământ", spec: "Kit complet industrial", quantity: 1, unit: "set", unitPrice: 120, totalPrice: 120 },
          { name: "Sistem monitorizare", spec: "Portal web + app", quantity: 1, unit: "buc", unitPrice: 150, totalPrice: 150 },
        ],
      }),
      buildPackage({
        id: "com-30kw",
        name: "Business Pro",
        subtitle: "30 kW — clădire comercială",
        capacity: 30,
        production: 36000,
        areaNeeded: 160,
        installationPrice: 2400,
        popular: true,
        products: [
          { name: "Panou fotovoltaic", spec: "550W monocristalin", quantity: 55, unit: "buc", unitPrice: 170, totalPrice: 9350 },
          { name: "Invertor on-grid", spec: "30 kW, trifazat", quantity: 1, unit: "buc", unitPrice: 2950, totalPrice: 2950 },
          { name: "Contor bidirectional", spec: "Smart meter trifazat", quantity: 1, unit: "buc", unitPrice: 280, totalPrice: 280 },
          { name: "Structură montaj", spec: "Aluminiu, acoperiș terasă/tablă", quantity: 55, unit: "set", unitPrice: 40, totalPrice: 2200 },
          { name: "Cablu solar DC", spec: "6mm², dublu izolat", quantity: 250, unit: "m", unitPrice: 4.5, totalPrice: 1125 },
          { name: "Cablu AC", spec: "5x16mm²", quantity: 40, unit: "m", unitPrice: 20, totalPrice: 800 },
          { name: "Protecții DC", spec: "Siguranțe + descărcătoare", quantity: 3, unit: "set", unitPrice: 195, totalPrice: 585 },
          { name: "Protecții AC", spec: "Întrerupătoare + diferențial", quantity: 1, unit: "set", unitPrice: 350, totalPrice: 350 },
          { name: "Tablou AC/DC", spec: "Complet echipat", quantity: 1, unit: "buc", unitPrice: 450, totalPrice: 450 },
          { name: "Conectori MC4", spec: "Pereche", quantity: 60, unit: "buc", unitPrice: 5, totalPrice: 300 },
          { name: "Priză de pământ", spec: "Kit complet industrial", quantity: 1, unit: "set", unitPrice: 150, totalPrice: 150 },
          { name: "Sistem monitorizare", spec: "Portal web + app", quantity: 1, unit: "buc", unitPrice: 200, totalPrice: 200 },
        ],
      }),
      buildPackage({
        id: "com-20kw",
        name: "Business Plus",
        subtitle: "20 kW — birou / showroom",
        capacity: 20,
        production: 24000,
        areaNeeded: 108,
        installationPrice: 1800,
        products: [
          { name: "Panou fotovoltaic", spec: "550W monocristalin", quantity: 36, unit: "buc", unitPrice: 175, totalPrice: 6300 },
          { name: "Invertor on-grid", spec: "20 kW, trifazat", quantity: 1, unit: "buc", unitPrice: 2200, totalPrice: 2200 },
          { name: "Contor bidirectional", spec: "Smart meter trifazat", quantity: 1, unit: "buc", unitPrice: 280, totalPrice: 280 },
          { name: "Structură montaj", spec: "Aluminiu, acoperiș tablă/terasă", quantity: 36, unit: "set", unitPrice: 42, totalPrice: 1512 },
          { name: "Cablu solar DC", spec: "6mm², dublu izolat", quantity: 160, unit: "m", unitPrice: 4.5, totalPrice: 720 },
          { name: "Cablu AC", spec: "5x10mm²", quantity: 35, unit: "m", unitPrice: 15, totalPrice: 525 },
          { name: "Protecții DC", spec: "Siguranțe + descărcătoare", quantity: 2, unit: "set", unitPrice: 195, totalPrice: 390 },
          { name: "Protecții AC", spec: "Întrerupătoare + diferențial", quantity: 1, unit: "set", unitPrice: 290, totalPrice: 290 },
          { name: "Tablou AC/DC", spec: "Complet echipat", quantity: 1, unit: "buc", unitPrice: 380, totalPrice: 380 },
          { name: "Conectori MC4", spec: "Pereche", quantity: 40, unit: "buc", unitPrice: 5, totalPrice: 200 },
          { name: "Priză de pământ", spec: "Kit complet industrial", quantity: 1, unit: "set", unitPrice: 135, totalPrice: 135 },
          { name: "Sistem monitorizare", spec: "Portal web + app", quantity: 1, unit: "buc", unitPrice: 175, totalPrice: 175 },
        ],
      }),
      buildPackage({
        id: "com-50kw",
        name: "Business Max",
        subtitle: "50 kW — centru comercial",
        capacity: 50,
        production: 60000,
        areaNeeded: 270,
        installationPrice: 3800,
        products: [
          { name: "Panou fotovoltaic", spec: "550W monocristalin", quantity: 91, unit: "buc", unitPrice: 165, totalPrice: 15015 },
          { name: "Invertor on-grid", spec: "50 kW, trifazat", quantity: 1, unit: "buc", unitPrice: 4200, totalPrice: 4200 },
          { name: "Contor bidirectional", spec: "Smart meter trifazat", quantity: 1, unit: "buc", unitPrice: 320, totalPrice: 320 },
          { name: "Structură montaj", spec: "Aluminiu, terasă industrială", quantity: 91, unit: "set", unitPrice: 38, totalPrice: 3458 },
          { name: "Cablu solar DC", spec: "6mm², dublu izolat", quantity: 400, unit: "m", unitPrice: 4.5, totalPrice: 1800 },
          { name: "Cablu AC", spec: "5x25mm²", quantity: 50, unit: "m", unitPrice: 28, totalPrice: 1400 },
          { name: "Protecții DC", spec: "Siguranțe + descărcătoare", quantity: 5, unit: "set", unitPrice: 195, totalPrice: 975 },
          { name: "Protecții AC", spec: "Întrerupătoare + diferențial", quantity: 1, unit: "set", unitPrice: 480, totalPrice: 480 },
          { name: "Tablou AC/DC", spec: "Complet echipat", quantity: 1, unit: "buc", unitPrice: 650, totalPrice: 650 },
          { name: "Conectori MC4", spec: "Pereche", quantity: 100, unit: "buc", unitPrice: 5, totalPrice: 500 },
          { name: "Priză de pământ", spec: "Kit complet industrial", quantity: 1, unit: "set", unitPrice: 180, totalPrice: 180 },
          { name: "Sistem monitorizare", spec: "SCADA + portal web", quantity: 1, unit: "buc", unitPrice: 350, totalPrice: 350 },
        ],
      }),
    ],
  },

  // ── INDUSTRIAL ────────────────────────────────────────────────────
  {
    slug: "industrial",
    title: "Industrial",
    shortDescription:
      "Proiecte de mari dimensiuni pentru hale, fabrici și parcuri fotovoltaice. Eficiență maximă.",
    fullDescription:
      "Realizăm proiecte fotovoltaice la scară largă pentru sectorul industrial: hale de producție, depozite logistice, parcuri solare. Proiectare profesională, componente premium și monitorizare avansată SCADA.",
    image:
      "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=3200&q=90&auto=format&fit=crop",
    features: [
      "Proiectare la scară largă",
      "Structuri sol sau acoperiș",
      "Sisteme de stocare energie",
      "Monitorizare avansată SCADA",
    ],
    packages: [
      buildPackage({
        id: "ind-100kw",
        name: "Industrial Start",
        subtitle: "100 kW — hală / depozit",
        capacity: 100,
        production: 120000,
        areaNeeded: 550,
        installationPrice: 6500,
        products: [
          { name: "Panou fotovoltaic", spec: "550W monocristalin", quantity: 182, unit: "buc", unitPrice: 155, totalPrice: 28210 },
          { name: "Invertor on-grid", spec: "50 kW, trifazat", quantity: 2, unit: "buc", unitPrice: 4200, totalPrice: 8400 },
          { name: "Contor bidirectional", spec: "Smart meter industrial", quantity: 1, unit: "buc", unitPrice: 450, totalPrice: 450 },
          { name: "Structură montaj", spec: "Oțel galvanizat, acoperiș industrial", quantity: 182, unit: "set", unitPrice: 35, totalPrice: 6370 },
          { name: "Cablu solar DC", spec: "6mm², dublu izolat", quantity: 800, unit: "m", unitPrice: 4.5, totalPrice: 3600 },
          { name: "Cablu AC", spec: "5x35mm²", quantity: 80, unit: "m", unitPrice: 38, totalPrice: 3040 },
          { name: "Protecții DC", spec: "Siguranțe + descărcătoare", quantity: 10, unit: "set", unitPrice: 195, totalPrice: 1950 },
          { name: "Protecții AC", spec: "Întrerupătoare + diferențial", quantity: 2, unit: "set", unitPrice: 480, totalPrice: 960 },
          { name: "Tablou AC/DC", spec: "Industrial, complet echipat", quantity: 2, unit: "buc", unitPrice: 750, totalPrice: 1500 },
          { name: "Conectori MC4", spec: "Pereche", quantity: 200, unit: "buc", unitPrice: 5, totalPrice: 1000 },
          { name: "Priză de pământ", spec: "Kit industrial complet", quantity: 2, unit: "set", unitPrice: 200, totalPrice: 400 },
          { name: "Sistem monitorizare", spec: "SCADA + datalogger", quantity: 1, unit: "buc", unitPrice: 650, totalPrice: 650 },
        ],
      }),
      buildPackage({
        id: "ind-250kw",
        name: "Industrial Pro",
        subtitle: "250 kW — fabrică / parc solar",
        capacity: 250,
        production: 300000,
        areaNeeded: 1400,
        installationPrice: 14000,
        popular: true,
        products: [
          { name: "Panou fotovoltaic", spec: "550W monocristalin", quantity: 455, unit: "buc", unitPrice: 148, totalPrice: 67340 },
          { name: "Invertor on-grid", spec: "50 kW, trifazat", quantity: 5, unit: "buc", unitPrice: 4100, totalPrice: 20500 },
          { name: "Contor bidirectional", spec: "Smart meter industrial", quantity: 2, unit: "buc", unitPrice: 450, totalPrice: 900 },
          { name: "Structură montaj", spec: "Oțel galvanizat, sol/acoperiș", quantity: 455, unit: "set", unitPrice: 32, totalPrice: 14560 },
          { name: "Cablu solar DC", spec: "6mm², dublu izolat", quantity: 2000, unit: "m", unitPrice: 4.5, totalPrice: 9000 },
          { name: "Cablu AC", spec: "5x50mm²", quantity: 150, unit: "m", unitPrice: 52, totalPrice: 7800 },
          { name: "Protecții DC", spec: "Siguranțe + descărcătoare", quantity: 25, unit: "set", unitPrice: 195, totalPrice: 4875 },
          { name: "Protecții AC", spec: "Celulă medie tensiune", quantity: 1, unit: "set", unitPrice: 3500, totalPrice: 3500 },
          { name: "Tablou AC/DC", spec: "Industrial, complet echipat", quantity: 5, unit: "buc", unitPrice: 750, totalPrice: 3750 },
          { name: "Conectori MC4", spec: "Pereche", quantity: 500, unit: "buc", unitPrice: 4.5, totalPrice: 2250 },
          { name: "Priză de pământ", spec: "Kit industrial complet", quantity: 4, unit: "set", unitPrice: 200, totalPrice: 800 },
          { name: "Sistem monitorizare", spec: "SCADA + datalogger + alerte", quantity: 1, unit: "buc", unitPrice: 1200, totalPrice: 1200 },
        ],
      }),
      buildPackage({
        id: "ind-500kw",
        name: "Industrial Max",
        subtitle: "500 kW — parc fotovoltaic",
        capacity: 500,
        production: 600000,
        areaNeeded: 2800,
        installationPrice: 25000,
        products: [
          { name: "Panou fotovoltaic", spec: "550W monocristalin", quantity: 910, unit: "buc", unitPrice: 140, totalPrice: 127400 },
          { name: "Invertor on-grid", spec: "100 kW, trifazat", quantity: 5, unit: "buc", unitPrice: 7200, totalPrice: 36000 },
          { name: "Contor bidirectional", spec: "Smart meter industrial", quantity: 3, unit: "buc", unitPrice: 450, totalPrice: 1350 },
          { name: "Structură montaj", spec: "Oțel galvanizat, sol", quantity: 910, unit: "set", unitPrice: 30, totalPrice: 27300 },
          { name: "Cablu solar DC", spec: "6mm², dublu izolat", quantity: 4000, unit: "m", unitPrice: 4.5, totalPrice: 18000 },
          { name: "Cablu AC", spec: "5x70mm²", quantity: 300, unit: "m", unitPrice: 65, totalPrice: 19500 },
          { name: "Protecții DC", spec: "Siguranțe + descărcătoare", quantity: 50, unit: "set", unitPrice: 195, totalPrice: 9750 },
          { name: "Protecții AC", spec: "Celulă medie tensiune", quantity: 2, unit: "set", unitPrice: 3500, totalPrice: 7000 },
          { name: "Tablou AC/DC", spec: "Industrial, complet echipat", quantity: 10, unit: "buc", unitPrice: 750, totalPrice: 7500 },
          { name: "Transformator", spec: "Stație MT/JT 630 kVA", quantity: 1, unit: "buc", unitPrice: 12000, totalPrice: 12000 },
          { name: "Conectori MC4", spec: "Pereche", quantity: 1000, unit: "buc", unitPrice: 4, totalPrice: 4000 },
          { name: "Priză de pământ", spec: "Kit industrial complet", quantity: 6, unit: "set", unitPrice: 200, totalPrice: 1200 },
          { name: "Sistem monitorizare", spec: "SCADA + datalogger + alerte", quantity: 1, unit: "buc", unitPrice: 2500, totalPrice: 2500 },
        ],
      }),
    ],
  },
];

// ─── Legacy packages export (for calculator) ───────────────────────

export interface SolarPackage {
  id: string;
  name: string;
  subtitle: string;
  capacity: number;
  panels: number;
  panelWattage: number;
  inverter: string;
  production: number;
  components: string[];
  price: number;
  popular?: boolean;
}

export const packages: SolarPackage[] = [
  {
    id: "basic",
    name: "Basic",
    subtitle: "Casă mică / consum redus",
    capacity: 3,
    panels: 6,
    panelWattage: 550,
    inverter: "3 kW",
    production: 3600,
    components: [
      "6x Panouri fotovoltaice 550W",
      "Invertor on-grid 3 kW",
      "Contor bidirectional",
      "Structură montaj acoperiș",
      "Cablaje și protecții DC/AC",
      "Manoperă instalare completă",
    ],
    price: 3365,
  },
  {
    id: "standard",
    name: "Standard",
    subtitle: "Consum mediu / apartament mare",
    capacity: 5,
    panels: 10,
    panelWattage: 550,
    inverter: "5 kW",
    production: 6000,
    components: [
      "10x Panouri fotovoltaice 550W",
      "Invertor on-grid 5 kW",
      "Contor bidirectional",
      "Structură montaj acoperiș",
      "Cablaje și protecții DC/AC",
      "Sistem de monitorizare smart",
      "Manoperă instalare completă",
    ],
    price: 4970,
    popular: true,
  },
  {
    id: "premium",
    name: "Premium",
    subtitle: "Independență energetică",
    capacity: 10,
    panels: 18,
    panelWattage: 550,
    inverter: "10 kW hibrid",
    production: 12000,
    components: [
      "18x Panouri fotovoltaice 550W",
      "Invertor hibrid 10 kW",
      "Baterie LiFePO4 5 kWh",
      "Contor bidirectional",
      "Structură montaj acoperiș",
      "Cablaje și protecții DC/AC",
      "Sistem de monitorizare smart",
      "Manoperă instalare completă",
    ],
    price: 9693,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    subtitle: "Afaceri și consum ridicat",
    capacity: 15,
    panels: 28,
    panelWattage: 550,
    inverter: "15 kW trifazat",
    production: 18000,
    components: [
      "28x Panouri fotovoltaice 550W",
      "Invertor on-grid 15 kW trifazat",
      "Contor bidirectional",
      "Structură montaj acoperiș/terasă",
      "Cablaje și protecții DC/AC",
      "Tablou AC/DC complet",
      "Sistem de monitorizare avansată",
      "Manoperă instalare completă",
    ],
    price: 11376,
  },
];
