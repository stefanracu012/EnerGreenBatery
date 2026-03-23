export interface Project {
  slug: string;
  title: string;
  category: "Rezidențial" | "Comercial" | "Industrial";
  capacity: string;
  location: string;
  year: number;
  image: string;
  description: string;
  details: string[];
  specs: { label: string; value: string }[];
  /** Masonry grid size: "tall" | "wide" | "large" | "normal" */
  gridSize: "tall" | "wide" | "large" | "normal";
}

export const projects: Project[] = [
  {
    slug: "casa-familie-suceava",
    title: "Casă de familie, Suceava",
    category: "Rezidențial",
    capacity: "5 kW",
    location: "Suceava, România",
    year: 2024,
    image:
      "https://images.unsplash.com/photo-1558449028-b53a39d100fc?w=1600&q=90&auto=format&fit=crop",
    description:
      "Sistem fotovoltaic on-grid pentru o casă de familie din Suceava. Clientul dorea reducerea facturii la energie cu minim 70%. Am instalat 10 panouri de 550W pe acoperiș orientat sud, cu invertor on-grid și monitorizare WiFi.",
    details: [
      "10 panouri monocristaline 550W pe acoperiș țiglă",
      "Invertor on-grid 5 kW cu monitorizare WiFi",
      "Contor bidirectional smart meter",
      "Structură montaj aluminiu optimizată",
      "Termen de execuție: 2 zile",
    ],
    specs: [
      { label: "Putere instalată", value: "5 kW" },
      { label: "Producție anuală", value: "~6.000 kWh" },
      { label: "Panouri", value: "10 × 550W monocristalin" },
      { label: "Invertor", value: "On-grid 5 kW" },
      { label: "Economie anuală est.", value: "~1.500 EUR" },
      { label: "ROI estimat", value: "~3.5 ani" },
    ],
    gridSize: "tall",
  },
  {
    slug: "depozit-comercial-botosani",
    title: "Depozit comercial, Botoșani",
    category: "Comercial",
    capacity: "20 kW",
    location: "Botoșani, România",
    year: 2024,
    image:
      "https://images.unsplash.com/photo-1521618755572-156ae0cdd74d?w=1600&q=90&auto=format&fit=crop",
    description:
      "Instalație fotovoltaică de 20 kW pentru un depozit comercial. Sistemul acoperă peste 80% din consumul energetic al clădirii, cu ROI estimat la 4 ani.",
    details: [
      "36 panouri monocristaline 550W pe acoperiș metalic",
      "Invertor on-grid trifazat 20 kW",
      "Sistem de monitorizare avansată SCADA",
      "Structură montaj pentru acoperiș terasă",
      "Termen de execuție: 5 zile",
    ],
    specs: [
      { label: "Putere instalată", value: "20 kW" },
      { label: "Producție anuală", value: "~24.000 kWh" },
      { label: "Panouri", value: "36 × 550W monocristalin" },
      { label: "Invertor", value: "Trifazat 20 kW" },
      { label: "Economie anuală est.", value: "~4.800 EUR" },
      { label: "ROI estimat", value: "~4 ani" },
    ],
    gridSize: "wide",
  },
  {
    slug: "parc-fotovoltaic-iasi",
    title: "Parc fotovoltaic, Iași",
    category: "Industrial",
    capacity: "100 kW",
    location: "Iași, România",
    year: 2023,
    image:
      "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1600&q=90&auto=format&fit=crop",
    description:
      "Parc fotovoltaic de 100 kW instalat pe teren pentru o companie industrială. Proiect complex cu structură sol, sistem SCADA și monitorizare remotă.",
    details: [
      "182 panouri monocristaline 550W pe structură sol",
      "2 invertoare on-grid trifazate 50 kW",
      "Monitorizare SCADA cu acces remote",
      "Transformator și stație de transformare",
      "Termen de execuție: 3 săptămâni",
    ],
    specs: [
      { label: "Putere instalată", value: "100 kW" },
      { label: "Producție anuală", value: "~120.000 kWh" },
      { label: "Panouri", value: "182 × 550W monocristalin" },
      { label: "Invertoare", value: "2 × 50 kW trifazat" },
      { label: "Economie anuală est.", value: "~24.000 EUR" },
      { label: "ROI estimat", value: "~4.5 ani" },
    ],
    gridSize: "large",
  },
  {
    slug: "vila-moderna-campulung",
    title: "Vilă modernă, Câmpulung",
    category: "Rezidențial",
    capacity: "8 kW",
    location: "Câmpulung Moldovenesc, România",
    year: 2024,
    image:
      "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=1600&q=90&auto=format&fit=crop",
    description:
      "Sistem hibrid cu stocare pentru o vilă modernă. Clientul dorea independență energetică parțială, cu backup pe baterie pentru urgențe.",
    details: [
      "14 panouri monocristaline 550W",
      "Invertor hibrid 8 kW cu management baterie",
      "Baterie LiFePO4 10 kWh",
      "Contor bidirectional + monitorizare smart",
      "Termen de execuție: 3 zile",
    ],
    specs: [
      { label: "Putere instalată", value: "8 kW" },
      { label: "Producție anuală", value: "~9.600 kWh" },
      { label: "Panouri", value: "14 × 550W monocristalin" },
      { label: "Invertor", value: "Hibrid 8 kW" },
      { label: "Stocare", value: "LiFePO4 10 kWh" },
      { label: "ROI estimat", value: "~4 ani" },
    ],
    gridSize: "normal",
  },
  {
    slug: "magazin-retail-falticeni",
    title: "Magazin retail, Fălticeni",
    category: "Comercial",
    capacity: "15 kW",
    location: "Fălticeni, România",
    year: 2023,
    image:
      "https://images.unsplash.com/photo-1548337138-e87d889cc369?w=1600&q=90&auto=format&fit=crop",
    description:
      "Instalație pe acoperișul unui magazin retail. Sistemul acoperă consumul din orele de vârf, reducând semnificativ costurile operaționale.",
    details: [
      "28 panouri monocristaline 550W",
      "Invertor on-grid trifazat 15 kW",
      "Sistem monitorizare cu alertare",
      "Structură montaj acoperiș terasă",
      "Termen de execuție: 4 zile",
    ],
    specs: [
      { label: "Putere instalată", value: "15 kW" },
      { label: "Producție anuală", value: "~18.000 kWh" },
      { label: "Panouri", value: "28 × 550W monocristalin" },
      { label: "Invertor", value: "Trifazat 15 kW" },
      { label: "Economie anuală est.", value: "~3.600 EUR" },
      { label: "ROI estimat", value: "~4.5 ani" },
    ],
    gridSize: "normal",
  },
  {
    slug: "casa-pasiva-radauti",
    title: "Casă pasivă, Rădăuți",
    category: "Rezidențial",
    capacity: "10 kW",
    location: "Rădăuți, România",
    year: 2025,
    image:
      "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=1600&q=90&auto=format&fit=crop",
    description:
      "Sistem fotovoltaic complet cu stocare pe baterie pentru o casă pasivă nouă. Proiectat pentru consum net-zero, cu export surplus în rețea.",
    details: [
      "18 panouri monocristaline 550W",
      "Invertor hibrid 10 kW",
      "Baterie LiFePO4 5 kWh",
      "Contor bidirectional smart meter",
      "Sistem monitorizare complet cu app mobil",
      "Termen de execuție: 3 zile",
    ],
    specs: [
      { label: "Putere instalată", value: "10 kW" },
      { label: "Producție anuală", value: "~12.000 kWh" },
      { label: "Panouri", value: "18 × 550W monocristalin" },
      { label: "Invertor", value: "Hibrid 10 kW" },
      { label: "Stocare", value: "LiFePO4 5 kWh" },
      { label: "ROI estimat", value: "~3.5 ani" },
    ],
    gridSize: "tall",
  },
];
