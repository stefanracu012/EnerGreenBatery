import Script from "next/script";

/* ── Organization / LocalBusiness JSON-LD for SEO ── */
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://www.energreenbatery.ro/#organization",
  name: "EnerGreenBatery",
  alternateName: "Energreenbatery S.R.L.",
  description:
    "Soluții fotovoltaice complete pentru case și afaceri în Suceava și toată România. Panouri solare, invertoare, baterii de stocare, instalare profesională și mentenanță.",
  url: "https://www.energreenbatery.ro",
  logo: "https://www.energreenbatery.ro/Logo_energreen.png",
  image: "https://www.energreenbatery.ro/icon-512.png",
  telephone: "+40748613245",
  email: "energreenbatery@gmail.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Str. Principală Nr. 162, Reuseni",
    addressLocality: "Udești",
    addressRegion: "Suceava",
    postalCode: "727535",
    addressCountry: "RO",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 47.579796,
    longitude: 26.3607287,
  },
  areaServed: [
    { "@type": "Country", name: "România" },
    { "@type": "AdministrativeArea", name: "Suceava" },
  ],
  serviceType: [
    "Instalare panouri solare",
    "Sisteme fotovoltaice",
    "Mentenanță panouri solare",
    "Baterii de stocare energie",
    "Invertoare solare",
  ],
  priceRange: "$$",
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:00",
      closes: "18:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Saturday",
      opens: "09:00",
      closes: "14:00",
    },
  ],
  sameAs: ["https://www.google.com/maps/place/EnergreenbateryS.R.L."],
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "EnerGreenBatery",
  url: "https://www.energreenbatery.ro",
  description:
    "Soluții fotovoltaice complete pentru case și afaceri. Panouri solare, instalare profesională și mentenanță.",
  publisher: {
    "@id": "https://www.energreenbatery.ro/#organization",
  },
  potentialAction: {
    "@type": "SearchAction",
    target: "https://www.energreenbatery.ro/?q={search_term_string}",
    "query-input": "required name=search_term_string",
  },
};

export function OrganizationJsonLd() {
  return (
    <>
      <Script
        id="organization-jsonld"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
      />
      <Script
        id="website-jsonld"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteSchema),
        }}
      />
    </>
  );
}

export function ServiceJsonLd({
  name,
  description,
  image,
  url,
}: {
  name: string;
  description: string;
  image?: string;
  url: string;
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    url,
    image: image || "https://www.energreenbatery.ro/icon-512.png",
    provider: {
      "@id": "https://www.energreenbatery.ro/#organization",
    },
    areaServed: {
      "@type": "Country",
      name: "România",
    },
    serviceType: name,
  };

  return (
    <Script
      id={`service-jsonld-${name}`}
      type="application/ld+json"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function ProjectJsonLd({
  name,
  description,
  images,
  url,
  location,
}: {
  name: string;
  description: string;
  images: string[];
  url: string;
  location?: string;
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name,
    description,
    url,
    image: images[0] || "https://www.energreenbatery.ro/icon-512.png",
    creator: {
      "@id": "https://www.energreenbatery.ro/#organization",
    },
    ...(location && { locationCreated: { "@type": "Place", name: location } }),
  };

  return (
    <Script
      id={`project-jsonld-${name}`}
      type="application/ld+json"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
