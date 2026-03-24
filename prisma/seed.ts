import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  // ── Admin user ──────────────────────────────────────────────
  const email = 'energreenbatery@gmail.com'
  const password = 'energreen26'
  const hash = await bcrypt.hash(password, 12)

  await prisma.adminUser.upsert({
    where: { email },
    update: { password: hash },
    create: { email, password: hash },
  })
  console.log(`✅ Admin: ${email}`)

  // ── Servicii ────────────────────────────────────────────────

  const servicesData = [
    {
      slug: 'rezidential',
      title: 'Rezidențial',
      description: 'Sisteme fotovoltaice complete pentru locuințe, dimensionate pe consumul real al familiei tale.',
      icon: '🏠',
      image: 'https://images.unsplash.com/photo-1558449028-b53a39d100fc?w=3200&q=90&auto=format&fit=crop',
      packages: [
        {
          name: 'Casa Mică',
          kw: 3,
          price: 3365,
          popular: false,
          description: '3 kW — consum redus',
          features: [
            '6 panouri monocristaline 550W',
            'Invertor on-grid 3 kW WiFi',
            'Contor bidirectional smart meter',
            'Structură montaj aluminiu acoperiș țiglă',
            'Cablaje DC + AC complete',
            'Protecții DC (siguranțe + descărcător)',
            'Protecții AC (întrerupător + diferențial)',
            'Conectori MC4 (8 perechi)',
            'Priză de pământ kit complet',
            'Manoperă instalare completă',
          ],
        },
        {
          name: 'Standard',
          kw: 5,
          price: 4970,
          popular: true,
          description: '5 kW — consum mediu',
          features: [
            '10 panouri monocristaline 550W',
            'Invertor on-grid 5 kW WiFi',
            'Contor bidirectional smart meter',
            'Structură montaj aluminiu acoperiș țiglă',
            'Cablaje DC + AC complete',
            'Protecții DC (siguranțe + descărcător)',
            'Protecții AC (întrerupător + diferențial)',
            'Conectori MC4 (12 perechi)',
            'Priză de pământ kit complet',
            'Sistem monitorizare smart dongle WiFi',
            'Manoperă instalare completă',
          ],
        },
        {
          name: 'Comfort',
          kw: 7,
          price: 6098,
          popular: false,
          description: '7 kW — familie mare',
          features: [
            '13 panouri monocristaline 550W',
            'Invertor on-grid 7 kW WiFi',
            'Contor bidirectional smart meter',
            'Structură montaj aluminiu acoperiș țiglă',
            'Cablaje DC + AC complete',
            'Protecții DC (siguranțe + descărcător)',
            'Protecții AC (întrerupător + diferențial)',
            'Conectori MC4 (15 perechi)',
            'Priză de pământ kit complet',
            'Sistem monitorizare smart dongle WiFi',
            'Manoperă instalare completă',
          ],
        },
        {
          name: 'Premium',
          kw: 10,
          price: 9693,
          popular: false,
          description: '10 kW — independență energetică',
          features: [
            '18 panouri monocristaline 550W',
            'Invertor hibrid 10 kW compatibil baterie',
            'Baterie LiFePO4 5.12 kWh',
            'Contor bidirectional smart meter',
            'Structură montaj aluminiu acoperiș țiglă',
            'Cablaje DC + AC + baterie complete',
            'Protecții DC (siguranțe + descărcător)',
            'Protecții AC (întrerupător + diferențial)',
            'Conectori MC4 (20 perechi)',
            'Priză de pământ kit complet',
            'Sistem monitorizare smart dongle WiFi',
            'Manoperă instalare completă',
          ],
        },
      ],
    },
    {
      slug: 'comercial',
      title: 'Comercial',
      description: 'Soluții pentru magazine, birouri și spații comerciale. Reducem costurile operaționale ale afacerii tale.',
      icon: '🏢',
      image: 'https://images.unsplash.com/photo-1545208942-e1c9c916524b?w=3200&q=90&auto=format&fit=crop',
      packages: [
        {
          name: 'Business Start',
          kw: 15,
          price: 11376,
          popular: false,
          description: '15 kW — magazin / birou mic',
          features: [
            '28 panouri monocristaline 550W',
            'Invertor on-grid trifazat 15 kW',
            'Contor bidirectional smart meter trifazat',
            'Structură montaj aluminiu acoperiș tablă/terasă',
            'Cablaje DC + AC complete',
            'Protecții DC (2 seturi siguranțe + descărcătoare)',
            'Protecții AC (întrerupătoare + diferențial)',
            'Tablou AC/DC complet echipat',
            'Conectori MC4 (30 perechi)',
            'Priză de pământ kit industrial',
            'Sistem monitorizare portal web + app',
            'Manoperă instalare completă',
          ],
        },
        {
          name: 'Business Plus',
          kw: 20,
          price: 14307,
          popular: false,
          description: '20 kW — birou / showroom',
          features: [
            '36 panouri monocristaline 550W',
            'Invertor on-grid trifazat 20 kW',
            'Contor bidirectional smart meter trifazat',
            'Structură montaj aluminiu acoperiș tablă/terasă',
            'Cablaje DC + AC complete',
            'Protecții DC (2 seturi siguranțe + descărcătoare)',
            'Protecții AC (întrerupătoare + diferențial)',
            'Tablou AC/DC complet echipat',
            'Conectori MC4 (40 perechi)',
            'Priză de pământ kit industrial',
            'Sistem monitorizare portal web + app',
            'Manoperă instalare completă',
          ],
        },
        {
          name: 'Business Pro',
          kw: 30,
          price: 21140,
          popular: true,
          description: '30 kW — clădire comercială',
          features: [
            '55 panouri monocristaline 550W',
            'Invertor on-grid trifazat 30 kW',
            'Contor bidirectional smart meter trifazat',
            'Structură montaj aluminiu acoperiș terasă/tablă',
            'Cablaje DC + AC complete',
            'Protecții DC (3 seturi siguranțe + descărcătoare)',
            'Protecții AC (întrerupătoare + diferențial)',
            'Tablou AC/DC complet echipat',
            'Conectori MC4 (60 perechi)',
            'Priză de pământ kit industrial',
            'Sistem monitorizare portal web + app',
            'Manoperă instalare completă',
          ],
        },
        {
          name: 'Business Max',
          kw: 50,
          price: 33128,
          popular: false,
          description: '50 kW — centru comercial',
          features: [
            '91 panouri monocristaline 550W',
            'Invertor on-grid trifazat 50 kW',
            'Contor bidirectional smart meter trifazat',
            'Structură montaj aluminiu terasă industrială',
            'Cablaje DC + AC complete',
            'Protecții DC (5 seturi siguranțe + descărcătoare)',
            'Protecții AC (întrerupătoare + diferențial)',
            'Tablou AC/DC complet echipat',
            'Conectori MC4 (100 perechi)',
            'Priză de pământ kit industrial',
            'Sistem monitorizare SCADA + portal web',
            'Manoperă instalare completă',
          ],
        },
      ],
    },
    {
      slug: 'industrial',
      title: 'Industrial',
      description: 'Proiecte de mari dimensiuni pentru hale, fabrici și parcuri fotovoltaice. Eficiență maximă.',
      icon: '🏭',
      image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=3200&q=90&auto=format&fit=crop',
      packages: [
        {
          name: 'Industrial Start',
          kw: 100,
          price: 63030,
          popular: false,
          description: '100 kW — hală / depozit',
          features: [
            '182 panouri monocristaline 550W',
            '2x Invertor on-grid trifazat 50 kW',
            'Contor bidirectional smart meter industrial',
            'Structură montaj oțel galvanizat acoperiș industrial',
            'Cablaje DC + AC complete',
            'Protecții DC (10 seturi siguranțe + descărcătoare)',
            'Protecții AC (2 seturi întrerupătoare + diferențial)',
            '2x Tablou AC/DC industrial complet echipat',
            'Conectori MC4 (200 perechi)',
            '2x Priză de pământ kit industrial',
            'Sistem monitorizare SCADA + datalogger',
            'Manoperă instalare completă',
          ],
        },
        {
          name: 'Industrial Pro',
          kw: 250,
          price: 150475,
          popular: true,
          description: '250 kW — fabrică / parc solar',
          features: [
            '455 panouri monocristaline 550W',
            '5x Invertor on-grid trifazat 50 kW',
            '2x Contor bidirectional smart meter industrial',
            'Structură montaj oțel galvanizat sol/acoperiș',
            'Cablaje DC + AC complete',
            'Protecții DC (25 seturi siguranțe + descărcătoare)',
            'Protecții AC celulă medie tensiune',
            '5x Tablou AC/DC industrial complet echipat',
            'Conectori MC4 (500 perechi)',
            '4x Priză de pământ kit industrial',
            'Sistem monitorizare SCADA + datalogger + alerte',
            'Manoperă instalare completă',
          ],
        },
        {
          name: 'Industrial Max',
          kw: 500,
          price: 296750,
          popular: false,
          description: '500 kW — parc fotovoltaic',
          features: [
            '910 panouri monocristaline 550W',
            '5x Invertor on-grid trifazat 100 kW',
            '3x Contor bidirectional smart meter industrial',
            'Structură montaj oțel galvanizat sol',
            'Cablaje DC + AC complete',
            'Protecții DC (50 seturi siguranțe + descărcătoare)',
            'Protecții AC (2 celule medie tensiune)',
            '10x Tablou AC/DC industrial complet echipat',
            'Transformator stație MT/JT 630 kVA',
            'Conectori MC4 (1000 perechi)',
            '6x Priză de pământ kit industrial',
            'Sistem monitorizare SCADA + datalogger + alerte',
            'Manoperă instalare completă',
          ],
        },
      ],
    },
  ]

  for (const svc of servicesData) {
    const { packages, ...serviceData } = svc
    const existing = await prisma.service.findUnique({ where: { slug: svc.slug } })

    if (existing) {
      await prisma.package.deleteMany({ where: { serviceId: existing.id } })
      await prisma.service.update({
        where: { id: existing.id },
        data: { ...serviceData, packages: { create: packages } },
      })
      console.log(`✅ Serviciu actualizat: ${svc.title} (${packages.length} pachete)`)
    } else {
      await prisma.service.create({
        data: { ...serviceData, packages: { create: packages } },
      })
      console.log(`✅ Serviciu creat: ${svc.title} (${packages.length} pachete)`)
    }
  }

  // ── Proiecte ────────────────────────────────────────────────

  const projectsData = [
    {
      slug: 'casa-familie-suceava',
      title: 'Casă de familie, Suceava',
      description: 'Sistem fotovoltaic on-grid de 5 kW pentru o casă de familie din Suceava. 10 panouri de 550W pe acoperiș orientat sud, cu invertor on-grid și monitorizare WiFi. Reducerea facturii cu peste 70%.',
      location: 'Suceava, România',
      year: 2024,
      images: ['https://images.unsplash.com/photo-1558449028-b53a39d100fc?w=1600&q=90&auto=format&fit=crop'],
      gridSize: 'tall',
      featured: true,
    },
    {
      slug: 'depozit-comercial-botosani',
      title: 'Depozit comercial, Botoșani',
      description: 'Instalație fotovoltaică de 20 kW pentru un depozit comercial. Sistemul acoperă peste 80% din consumul energetic al clădirii, cu ROI estimat la 4 ani.',
      location: 'Botoșani, România',
      year: 2024,
      images: ['https://images.unsplash.com/photo-1521618755572-156ae0cdd74d?w=1600&q=90&auto=format&fit=crop'],
      gridSize: 'wide',
      featured: true,
    },
    {
      slug: 'parc-fotovoltaic-iasi',
      title: 'Parc fotovoltaic, Iași',
      description: 'Parc fotovoltaic de 100 kW instalat pe teren pentru o companie industrială. Proiect complex cu structură sol, sistem SCADA și monitorizare remotă.',
      location: 'Iași, România',
      year: 2023,
      images: ['https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1600&q=90&auto=format&fit=crop'],
      gridSize: 'large',
      featured: true,
    },
    {
      slug: 'vila-moderna-campulung',
      title: 'Vilă modernă, Câmpulung',
      description: 'Sistem hibrid cu stocare de 8 kW pentru o vilă modernă. Independență energetică parțială cu backup pe baterie LiFePO4 10 kWh.',
      location: 'Câmpulung Moldovenesc, România',
      year: 2024,
      images: ['https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=1600&q=90&auto=format&fit=crop'],
      gridSize: 'normal',
      featured: false,
    },
    {
      slug: 'magazin-retail-falticeni',
      title: 'Magazin retail, Fălticeni',
      description: 'Instalație de 15 kW pe acoperișul unui magazin retail. Sistemul acoperă consumul din orele de vârf, reducând semnificativ costurile operaționale.',
      location: 'Fălticeni, România',
      year: 2023,
      images: ['https://images.unsplash.com/photo-1548337138-e87d889cc369?w=1600&q=90&auto=format&fit=crop'],
      gridSize: 'normal',
      featured: false,
    },
    {
      slug: 'casa-pasiva-radauti',
      title: 'Casă pasivă, Rădăuți',
      description: 'Sistem fotovoltaic complet de 10 kW cu stocare pe baterie LiFePO4 5 kWh pentru o casă pasivă nouă. Proiectat pentru consum net-zero.',
      location: 'Rădăuți, România',
      year: 2025,
      images: ['https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=1600&q=90&auto=format&fit=crop'],
      gridSize: 'tall',
      featured: true,
    },
  ]

  for (const proj of projectsData) {
    const existing = await prisma.project.findUnique({ where: { slug: proj.slug } })
    if (existing) {
      await prisma.project.update({ where: { id: existing.id }, data: proj })
      console.log(`✅ Proiect actualizat: ${proj.title}`)
    } else {
      await prisma.project.create({ data: proj })
      console.log(`✅ Proiect creat: ${proj.title}`)
    }
  }

  console.log('\n🎉 Seed complet!')
}

main()
  .catch((e) => {
    console.error('❌ Seed error:', e)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())
