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
          installationPrice: 450,
          features: ['6 panouri monocristaline 550W', 'Invertor on-grid 3 kW WiFi', 'Contor bidirectional smart meter', 'Structură montaj aluminiu acoperiș țiglă', 'Cablaje DC + AC complete', 'Protecții DC + AC', 'Conectori MC4 (8 perechi)', 'Priză de pământ kit complet', 'Manoperă instalare completă'],
          products: [
            { name: 'Panou fotovoltaic', spec: '550W monocristalin', quantity: 6, unit: 'buc', unitPrice: 185, totalPrice: 1110 },
            { name: 'Invertor on-grid', spec: '3 kW, WiFi integrat', quantity: 1, unit: 'buc', unitPrice: 680, totalPrice: 680 },
            { name: 'Contor bidirectional', spec: 'Smart meter trifazat', quantity: 1, unit: 'buc', unitPrice: 220, totalPrice: 220 },
            { name: 'Structură montaj', spec: 'Aluminiu, acoperiș țiglă', quantity: 6, unit: 'set', unitPrice: 45, totalPrice: 270 },
            { name: 'Cablu solar DC', spec: '6mm², dublu izolat', quantity: 30, unit: 'm', unitPrice: 4.5, totalPrice: 135 },
            { name: 'Cablu AC', spec: '3x4mm²', quantity: 15, unit: 'm', unitPrice: 6, totalPrice: 90 },
            { name: 'Protecții DC', spec: 'Siguranțe + descărcător', quantity: 1, unit: 'set', unitPrice: 165, totalPrice: 165 },
            { name: 'Protecții AC', spec: 'Întrerupător + diferențial', quantity: 1, unit: 'set', unitPrice: 120, totalPrice: 120 },
            { name: 'Conectori MC4', spec: 'Pereche', quantity: 8, unit: 'buc', unitPrice: 5, totalPrice: 40 },
            { name: 'Priză de pământ', spec: 'Kit complet', quantity: 1, unit: 'set', unitPrice: 85, totalPrice: 85 },
          ],
        },
        {
          name: 'Standard',
          kw: 5,
          price: 4970,
          popular: true,
          description: '5 kW — consum mediu',
          installationPrice: 600,
          features: ['10 panouri monocristaline 550W', 'Invertor on-grid 5 kW WiFi', 'Contor bidirectional smart meter', 'Structură montaj aluminiu acoperiș țiglă', 'Cablaje DC + AC complete', 'Protecții DC + AC', 'Conectori MC4 (12 perechi)', 'Priză de pământ kit complet', 'Sistem monitorizare smart dongle WiFi', 'Manoperă instalare completă'],
          products: [
            { name: 'Panou fotovoltaic', spec: '550W monocristalin', quantity: 10, unit: 'buc', unitPrice: 185, totalPrice: 1850 },
            { name: 'Invertor on-grid', spec: '5 kW, WiFi integrat', quantity: 1, unit: 'buc', unitPrice: 920, totalPrice: 920 },
            { name: 'Contor bidirectional', spec: 'Smart meter trifazat', quantity: 1, unit: 'buc', unitPrice: 220, totalPrice: 220 },
            { name: 'Structură montaj', spec: 'Aluminiu, acoperiș țiglă', quantity: 10, unit: 'set', unitPrice: 45, totalPrice: 450 },
            { name: 'Cablu solar DC', spec: '6mm², dublu izolat', quantity: 50, unit: 'm', unitPrice: 4.5, totalPrice: 225 },
            { name: 'Cablu AC', spec: '3x6mm²', quantity: 20, unit: 'm', unitPrice: 7.5, totalPrice: 150 },
            { name: 'Protecții DC', spec: 'Siguranțe + descărcător', quantity: 1, unit: 'set', unitPrice: 195, totalPrice: 195 },
            { name: 'Protecții AC', spec: 'Întrerupător + diferențial', quantity: 1, unit: 'set', unitPrice: 140, totalPrice: 140 },
            { name: 'Conectori MC4', spec: 'Pereche', quantity: 12, unit: 'buc', unitPrice: 5, totalPrice: 60 },
            { name: 'Priză de pământ', spec: 'Kit complet', quantity: 1, unit: 'set', unitPrice: 85, totalPrice: 85 },
            { name: 'Sistem monitorizare', spec: 'Smart dongle WiFi', quantity: 1, unit: 'buc', unitPrice: 75, totalPrice: 75 },
          ],
        },
        {
          name: 'Comfort',
          kw: 7,
          price: 6098,
          popular: false,
          description: '7 kW — familie mare',
          installationPrice: 750,
          features: ['13 panouri monocristaline 550W', 'Invertor on-grid 7 kW WiFi', 'Contor bidirectional smart meter', 'Structură montaj aluminiu acoperiș țiglă', 'Cablaje DC + AC complete', 'Protecții DC + AC', 'Conectori MC4 (15 perechi)', 'Priză de pământ kit complet', 'Sistem monitorizare smart dongle WiFi', 'Manoperă instalare completă'],
          products: [
            { name: 'Panou fotovoltaic', spec: '550W monocristalin', quantity: 13, unit: 'buc', unitPrice: 185, totalPrice: 2405 },
            { name: 'Invertor on-grid', spec: '7 kW, WiFi integrat', quantity: 1, unit: 'buc', unitPrice: 1100, totalPrice: 1100 },
            { name: 'Contor bidirectional', spec: 'Smart meter trifazat', quantity: 1, unit: 'buc', unitPrice: 220, totalPrice: 220 },
            { name: 'Structură montaj', spec: 'Aluminiu, acoperiș țiglă', quantity: 13, unit: 'set', unitPrice: 45, totalPrice: 585 },
            { name: 'Cablu solar DC', spec: '6mm², dublu izolat', quantity: 65, unit: 'm', unitPrice: 4.5, totalPrice: 292.5 },
            { name: 'Cablu AC', spec: '3x6mm²', quantity: 20, unit: 'm', unitPrice: 7.5, totalPrice: 150 },
            { name: 'Protecții DC', spec: 'Siguranțe + descărcător', quantity: 1, unit: 'set', unitPrice: 210, totalPrice: 210 },
            { name: 'Protecții AC', spec: 'Întrerupător + diferențial', quantity: 1, unit: 'set', unitPrice: 150, totalPrice: 150 },
            { name: 'Conectori MC4', spec: 'Pereche', quantity: 15, unit: 'buc', unitPrice: 5, totalPrice: 75 },
            { name: 'Priză de pământ', spec: 'Kit complet', quantity: 1, unit: 'set', unitPrice: 85, totalPrice: 85 },
            { name: 'Sistem monitorizare', spec: 'Smart dongle WiFi', quantity: 1, unit: 'buc', unitPrice: 75, totalPrice: 75 },
          ],
        },
        {
          name: 'Premium',
          kw: 10,
          price: 9693,
          popular: false,
          description: '10 kW — independență energetică',
          installationPrice: 950,
          features: ['18 panouri monocristaline 550W', 'Invertor hibrid 10 kW compatibil baterie', 'Baterie LiFePO4 5.12 kWh', 'Contor bidirectional smart meter', 'Structură montaj aluminiu acoperiș țiglă', 'Cablaje DC + AC + baterie complete', 'Protecții DC + AC', 'Conectori MC4 (20 perechi)', 'Priză de pământ kit complet', 'Sistem monitorizare smart dongle WiFi', 'Manoperă instalare completă'],
          products: [
            { name: 'Panou fotovoltaic', spec: '550W monocristalin', quantity: 18, unit: 'buc', unitPrice: 185, totalPrice: 3330 },
            { name: 'Invertor hibrid', spec: '10 kW, compatibil baterie', quantity: 1, unit: 'buc', unitPrice: 1650, totalPrice: 1650 },
            { name: 'Baterie LiFePO4', spec: '5.12 kWh', quantity: 1, unit: 'buc', unitPrice: 1350, totalPrice: 1350 },
            { name: 'Contor bidirectional', spec: 'Smart meter trifazat', quantity: 1, unit: 'buc', unitPrice: 220, totalPrice: 220 },
            { name: 'Structură montaj', spec: 'Aluminiu, acoperiș țiglă', quantity: 18, unit: 'set', unitPrice: 45, totalPrice: 810 },
            { name: 'Cablu solar DC', spec: '6mm², dublu izolat', quantity: 80, unit: 'm', unitPrice: 4.5, totalPrice: 360 },
            { name: 'Cablu AC', spec: '3x10mm²', quantity: 25, unit: 'm', unitPrice: 10, totalPrice: 250 },
            { name: 'Cablu baterie', spec: '25mm², flexibil', quantity: 6, unit: 'm', unitPrice: 18, totalPrice: 108 },
            { name: 'Protecții DC', spec: 'Siguranțe + descărcător', quantity: 1, unit: 'set', unitPrice: 240, totalPrice: 240 },
            { name: 'Protecții AC', spec: 'Întrerupător + diferențial', quantity: 1, unit: 'set', unitPrice: 165, totalPrice: 165 },
            { name: 'Conectori MC4', spec: 'Pereche', quantity: 20, unit: 'buc', unitPrice: 5, totalPrice: 100 },
            { name: 'Priză de pământ', spec: 'Kit complet', quantity: 1, unit: 'set', unitPrice: 85, totalPrice: 85 },
            { name: 'Sistem monitorizare', spec: 'Smart dongle WiFi', quantity: 1, unit: 'buc', unitPrice: 75, totalPrice: 75 },
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
          installationPrice: 1400,
          features: ['28 panouri monocristaline 550W', 'Invertor on-grid trifazat 15 kW', 'Contor bidirectional smart meter trifazat', 'Structură montaj aluminiu acoperiș tablă/terasă', 'Cablaje DC + AC complete', 'Protecții DC + AC', 'Tablou AC/DC complet echipat', 'Conectori MC4 (30 perechi)', 'Priză de pământ kit industrial', 'Sistem monitorizare portal web + app', 'Manoperă instalare completă'],
          products: [
            { name: 'Panou fotovoltaic', spec: '550W monocristalin', quantity: 28, unit: 'buc', unitPrice: 175, totalPrice: 4900 },
            { name: 'Invertor on-grid', spec: '15 kW, trifazat', quantity: 1, unit: 'buc', unitPrice: 1850, totalPrice: 1850 },
            { name: 'Contor bidirectional', spec: 'Smart meter trifazat', quantity: 1, unit: 'buc', unitPrice: 280, totalPrice: 280 },
            { name: 'Structură montaj', spec: 'Aluminiu, acoperiș tablă/terasă', quantity: 28, unit: 'set', unitPrice: 42, totalPrice: 1176 },
            { name: 'Cablu solar DC', spec: '6mm², dublu izolat', quantity: 120, unit: 'm', unitPrice: 4.5, totalPrice: 540 },
            { name: 'Cablu AC', spec: '5x10mm²', quantity: 30, unit: 'm', unitPrice: 15, totalPrice: 450 },
            { name: 'Protecții DC', spec: 'Siguranțe + descărcătoare', quantity: 2, unit: 'set', unitPrice: 195, totalPrice: 390 },
            { name: 'Protecții AC', spec: 'Întrerupătoare + diferențial', quantity: 1, unit: 'set', unitPrice: 250, totalPrice: 250 },
            { name: 'Tablou AC/DC', spec: 'Complet echipat', quantity: 1, unit: 'buc', unitPrice: 320, totalPrice: 320 },
            { name: 'Conectori MC4', spec: 'Pereche', quantity: 30, unit: 'buc', unitPrice: 5, totalPrice: 150 },
            { name: 'Priză de pământ', spec: 'Kit complet industrial', quantity: 1, unit: 'set', unitPrice: 120, totalPrice: 120 },
            { name: 'Sistem monitorizare', spec: 'Portal web + app', quantity: 1, unit: 'buc', unitPrice: 150, totalPrice: 150 },
          ],
        },
        {
          name: 'Business Plus',
          kw: 20,
          price: 14307,
          popular: false,
          description: '20 kW — birou / showroom',
          installationPrice: 1800,
          features: ['36 panouri monocristaline 550W', 'Invertor on-grid trifazat 20 kW', 'Contor bidirectional smart meter trifazat', 'Structură montaj aluminiu acoperiș tablă/terasă', 'Cablaje DC + AC complete', 'Protecții DC + AC', 'Tablou AC/DC complet echipat', 'Conectori MC4 (40 perechi)', 'Priză de pământ kit industrial', 'Sistem monitorizare portal web + app', 'Manoperă instalare completă'],
          products: [
            { name: 'Panou fotovoltaic', spec: '550W monocristalin', quantity: 36, unit: 'buc', unitPrice: 175, totalPrice: 6300 },
            { name: 'Invertor on-grid', spec: '20 kW, trifazat', quantity: 1, unit: 'buc', unitPrice: 2200, totalPrice: 2200 },
            { name: 'Contor bidirectional', spec: 'Smart meter trifazat', quantity: 1, unit: 'buc', unitPrice: 280, totalPrice: 280 },
            { name: 'Structură montaj', spec: 'Aluminiu, acoperiș tablă/terasă', quantity: 36, unit: 'set', unitPrice: 42, totalPrice: 1512 },
            { name: 'Cablu solar DC', spec: '6mm², dublu izolat', quantity: 160, unit: 'm', unitPrice: 4.5, totalPrice: 720 },
            { name: 'Cablu AC', spec: '5x10mm²', quantity: 35, unit: 'm', unitPrice: 15, totalPrice: 525 },
            { name: 'Protecții DC', spec: 'Siguranțe + descărcătoare', quantity: 2, unit: 'set', unitPrice: 195, totalPrice: 390 },
            { name: 'Protecții AC', spec: 'Întrerupătoare + diferențial', quantity: 1, unit: 'set', unitPrice: 290, totalPrice: 290 },
            { name: 'Tablou AC/DC', spec: 'Complet echipat', quantity: 1, unit: 'buc', unitPrice: 380, totalPrice: 380 },
            { name: 'Conectori MC4', spec: 'Pereche', quantity: 40, unit: 'buc', unitPrice: 5, totalPrice: 200 },
            { name: 'Priză de pământ', spec: 'Kit complet industrial', quantity: 1, unit: 'set', unitPrice: 135, totalPrice: 135 },
            { name: 'Sistem monitorizare', spec: 'Portal web + app', quantity: 1, unit: 'buc', unitPrice: 175, totalPrice: 175 },
          ],
        },
        {
          name: 'Business Pro',
          kw: 30,
          price: 21140,
          popular: true,
          description: '30 kW — clădire comercială',
          installationPrice: 2400,
          features: ['55 panouri monocristaline 550W', 'Invertor on-grid trifazat 30 kW', 'Contor bidirectional smart meter trifazat', 'Structură montaj aluminiu acoperiș terasă/tablă', 'Cablaje DC + AC complete', 'Protecții DC + AC', 'Tablou AC/DC complet echipat', 'Conectori MC4 (60 perechi)', 'Priză de pământ kit industrial', 'Sistem monitorizare portal web + app', 'Manoperă instalare completă'],
          products: [
            { name: 'Panou fotovoltaic', spec: '550W monocristalin', quantity: 55, unit: 'buc', unitPrice: 170, totalPrice: 9350 },
            { name: 'Invertor on-grid', spec: '30 kW, trifazat', quantity: 1, unit: 'buc', unitPrice: 2950, totalPrice: 2950 },
            { name: 'Contor bidirectional', spec: 'Smart meter trifazat', quantity: 1, unit: 'buc', unitPrice: 280, totalPrice: 280 },
            { name: 'Structură montaj', spec: 'Aluminiu, acoperiș terasă/tablă', quantity: 55, unit: 'set', unitPrice: 40, totalPrice: 2200 },
            { name: 'Cablu solar DC', spec: '6mm², dublu izolat', quantity: 250, unit: 'm', unitPrice: 4.5, totalPrice: 1125 },
            { name: 'Cablu AC', spec: '5x16mm²', quantity: 40, unit: 'm', unitPrice: 20, totalPrice: 800 },
            { name: 'Protecții DC', spec: 'Siguranțe + descărcătoare', quantity: 3, unit: 'set', unitPrice: 195, totalPrice: 585 },
            { name: 'Protecții AC', spec: 'Întrerupătoare + diferențial', quantity: 1, unit: 'set', unitPrice: 350, totalPrice: 350 },
            { name: 'Tablou AC/DC', spec: 'Complet echipat', quantity: 1, unit: 'buc', unitPrice: 450, totalPrice: 450 },
            { name: 'Conectori MC4', spec: 'Pereche', quantity: 60, unit: 'buc', unitPrice: 5, totalPrice: 300 },
            { name: 'Priză de pământ', spec: 'Kit complet industrial', quantity: 1, unit: 'set', unitPrice: 150, totalPrice: 150 },
            { name: 'Sistem monitorizare', spec: 'Portal web + app', quantity: 1, unit: 'buc', unitPrice: 200, totalPrice: 200 },
          ],
        },
        {
          name: 'Business Max',
          kw: 50,
          price: 33128,
          popular: false,
          description: '50 kW — centru comercial',
          installationPrice: 3800,
          features: ['91 panouri monocristaline 550W', 'Invertor on-grid trifazat 50 kW', 'Contor bidirectional smart meter trifazat', 'Structură montaj aluminiu terasă industrială', 'Cablaje DC + AC complete', 'Protecții DC + AC', 'Tablou AC/DC complet echipat', 'Conectori MC4 (100 perechi)', 'Priză de pământ kit industrial', 'Sistem monitorizare SCADA + portal web', 'Manoperă instalare completă'],
          products: [
            { name: 'Panou fotovoltaic', spec: '550W monocristalin', quantity: 91, unit: 'buc', unitPrice: 165, totalPrice: 15015 },
            { name: 'Invertor on-grid', spec: '50 kW, trifazat', quantity: 1, unit: 'buc', unitPrice: 4200, totalPrice: 4200 },
            { name: 'Contor bidirectional', spec: 'Smart meter trifazat', quantity: 1, unit: 'buc', unitPrice: 320, totalPrice: 320 },
            { name: 'Structură montaj', spec: 'Aluminiu, terasă industrială', quantity: 91, unit: 'set', unitPrice: 38, totalPrice: 3458 },
            { name: 'Cablu solar DC', spec: '6mm², dublu izolat', quantity: 400, unit: 'm', unitPrice: 4.5, totalPrice: 1800 },
            { name: 'Cablu AC', spec: '5x25mm²', quantity: 50, unit: 'm', unitPrice: 28, totalPrice: 1400 },
            { name: 'Protecții DC', spec: 'Siguranțe + descărcătoare', quantity: 5, unit: 'set', unitPrice: 195, totalPrice: 975 },
            { name: 'Protecții AC', spec: 'Întrerupătoare + diferențial', quantity: 1, unit: 'set', unitPrice: 480, totalPrice: 480 },
            { name: 'Tablou AC/DC', spec: 'Complet echipat', quantity: 1, unit: 'buc', unitPrice: 650, totalPrice: 650 },
            { name: 'Conectori MC4', spec: 'Pereche', quantity: 100, unit: 'buc', unitPrice: 5, totalPrice: 500 },
            { name: 'Priză de pământ', spec: 'Kit complet industrial', quantity: 1, unit: 'set', unitPrice: 180, totalPrice: 180 },
            { name: 'Sistem monitorizare', spec: 'SCADA + portal web', quantity: 1, unit: 'buc', unitPrice: 350, totalPrice: 350 },
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
          installationPrice: 6500,
          features: ['182 panouri monocristaline 550W', '2x Invertor on-grid trifazat 50 kW', 'Contor bidirectional smart meter industrial', 'Structură montaj oțel galvanizat acoperiș industrial', 'Cablaje DC + AC complete', 'Protecții DC + AC industriale', '2x Tablou AC/DC industrial complet echipat', 'Conectori MC4 (200 perechi)', '2x Priză de pământ kit industrial', 'Sistem monitorizare SCADA + datalogger', 'Manoperă instalare completă'],
          products: [
            { name: 'Panou fotovoltaic', spec: '550W monocristalin', quantity: 182, unit: 'buc', unitPrice: 155, totalPrice: 28210 },
            { name: 'Invertor on-grid', spec: '50 kW, trifazat', quantity: 2, unit: 'buc', unitPrice: 4200, totalPrice: 8400 },
            { name: 'Contor bidirectional', spec: 'Smart meter industrial', quantity: 1, unit: 'buc', unitPrice: 450, totalPrice: 450 },
            { name: 'Structură montaj', spec: 'Oțel galvanizat, acoperiș industrial', quantity: 182, unit: 'set', unitPrice: 35, totalPrice: 6370 },
            { name: 'Cablu solar DC', spec: '6mm², dublu izolat', quantity: 800, unit: 'm', unitPrice: 4.5, totalPrice: 3600 },
            { name: 'Cablu AC', spec: '5x35mm²', quantity: 80, unit: 'm', unitPrice: 38, totalPrice: 3040 },
            { name: 'Protecții DC', spec: 'Siguranțe + descărcătoare', quantity: 10, unit: 'set', unitPrice: 195, totalPrice: 1950 },
            { name: 'Protecții AC', spec: 'Întrerupătoare + diferențial', quantity: 2, unit: 'set', unitPrice: 480, totalPrice: 960 },
            { name: 'Tablou AC/DC', spec: 'Industrial, complet echipat', quantity: 2, unit: 'buc', unitPrice: 750, totalPrice: 1500 },
            { name: 'Conectori MC4', spec: 'Pereche', quantity: 200, unit: 'buc', unitPrice: 5, totalPrice: 1000 },
            { name: 'Priză de pământ', spec: 'Kit industrial complet', quantity: 2, unit: 'set', unitPrice: 200, totalPrice: 400 },
            { name: 'Sistem monitorizare', spec: 'SCADA + datalogger', quantity: 1, unit: 'buc', unitPrice: 650, totalPrice: 650 },
          ],
        },
        {
          name: 'Industrial Pro',
          kw: 250,
          price: 150475,
          popular: true,
          description: '250 kW — fabrică / parc solar',
          installationPrice: 14000,
          features: ['455 panouri monocristaline 550W', '5x Invertor on-grid trifazat 50 kW', '2x Contor bidirectional smart meter industrial', 'Structură montaj oțel galvanizat sol/acoperiș', 'Cablaje DC + AC complete', 'Protecții DC + AC celulă medie tensiune', '5x Tablou AC/DC industrial complet echipat', 'Conectori MC4 (500 perechi)', '4x Priză de pământ kit industrial', 'Sistem monitorizare SCADA + datalogger + alerte', 'Manoperă instalare completă'],
          products: [
            { name: 'Panou fotovoltaic', spec: '550W monocristalin', quantity: 455, unit: 'buc', unitPrice: 148, totalPrice: 67340 },
            { name: 'Invertor on-grid', spec: '50 kW, trifazat', quantity: 5, unit: 'buc', unitPrice: 4100, totalPrice: 20500 },
            { name: 'Contor bidirectional', spec: 'Smart meter industrial', quantity: 2, unit: 'buc', unitPrice: 450, totalPrice: 900 },
            { name: 'Structură montaj', spec: 'Oțel galvanizat, sol/acoperiș', quantity: 455, unit: 'set', unitPrice: 32, totalPrice: 14560 },
            { name: 'Cablu solar DC', spec: '6mm², dublu izolat', quantity: 2000, unit: 'm', unitPrice: 4.5, totalPrice: 9000 },
            { name: 'Cablu AC', spec: '5x50mm²', quantity: 150, unit: 'm', unitPrice: 52, totalPrice: 7800 },
            { name: 'Protecții DC', spec: 'Siguranțe + descărcătoare', quantity: 25, unit: 'set', unitPrice: 195, totalPrice: 4875 },
            { name: 'Protecții AC', spec: 'Celulă medie tensiune', quantity: 1, unit: 'set', unitPrice: 3500, totalPrice: 3500 },
            { name: 'Tablou AC/DC', spec: 'Industrial, complet echipat', quantity: 5, unit: 'buc', unitPrice: 750, totalPrice: 3750 },
            { name: 'Conectori MC4', spec: 'Pereche', quantity: 500, unit: 'buc', unitPrice: 4.5, totalPrice: 2250 },
            { name: 'Priză de pământ', spec: 'Kit industrial complet', quantity: 4, unit: 'set', unitPrice: 200, totalPrice: 800 },
            { name: 'Sistem monitorizare', spec: 'SCADA + datalogger + alerte', quantity: 1, unit: 'buc', unitPrice: 1200, totalPrice: 1200 },
          ],
        },
        {
          name: 'Industrial Max',
          kw: 500,
          price: 296750,
          popular: false,
          description: '500 kW — parc fotovoltaic',
          installationPrice: 25000,
          features: ['910 panouri monocristaline 550W', '5x Invertor on-grid trifazat 100 kW', '3x Contor bidirectional smart meter industrial', 'Structură montaj oțel galvanizat sol', 'Cablaje DC + AC complete', 'Protecții DC + AC (2 celule medie tensiune)', '10x Tablou AC/DC industrial complet echipat', 'Transformator stație MT/JT 630 kVA', 'Conectori MC4 (1000 perechi)', '6x Priză de pământ kit industrial', 'Sistem monitorizare SCADA + datalogger + alerte', 'Manoperă instalare completă'],
          products: [
            { name: 'Panou fotovoltaic', spec: '550W monocristalin', quantity: 910, unit: 'buc', unitPrice: 140, totalPrice: 127400 },
            { name: 'Invertor on-grid', spec: '100 kW, trifazat', quantity: 5, unit: 'buc', unitPrice: 7200, totalPrice: 36000 },
            { name: 'Contor bidirectional', spec: 'Smart meter industrial', quantity: 3, unit: 'buc', unitPrice: 450, totalPrice: 1350 },
            { name: 'Structură montaj', spec: 'Oțel galvanizat, sol', quantity: 910, unit: 'set', unitPrice: 30, totalPrice: 27300 },
            { name: 'Cablu solar DC', spec: '6mm², dublu izolat', quantity: 4000, unit: 'm', unitPrice: 4.5, totalPrice: 18000 },
            { name: 'Cablu AC', spec: '5x70mm²', quantity: 300, unit: 'm', unitPrice: 65, totalPrice: 19500 },
            { name: 'Protecții DC', spec: 'Siguranțe + descărcătoare', quantity: 50, unit: 'set', unitPrice: 195, totalPrice: 9750 },
            { name: 'Protecții AC', spec: 'Celulă medie tensiune', quantity: 2, unit: 'set', unitPrice: 3500, totalPrice: 7000 },
            { name: 'Tablou AC/DC', spec: 'Industrial, complet echipat', quantity: 10, unit: 'buc', unitPrice: 750, totalPrice: 7500 },
            { name: 'Transformator', spec: 'Stație MT/JT 630 kVA', quantity: 1, unit: 'buc', unitPrice: 12000, totalPrice: 12000 },
            { name: 'Conectori MC4', spec: 'Pereche', quantity: 1000, unit: 'buc', unitPrice: 4, totalPrice: 4000 },
            { name: 'Priză de pământ', spec: 'Kit industrial complet', quantity: 6, unit: 'set', unitPrice: 200, totalPrice: 1200 },
            { name: 'Sistem monitorizare', spec: 'SCADA + datalogger + alerte', quantity: 1, unit: 'buc', unitPrice: 2500, totalPrice: 2500 },
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
