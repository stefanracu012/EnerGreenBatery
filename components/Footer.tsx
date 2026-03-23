import Image from "next/image";
import { PHONE, PHONE_DISPLAY, EMAIL, ADDRESS } from "@/lib/contact";

const footerLinks = [
  { href: "#despre", label: "Despre noi" },
  { href: "#servicii", label: "Servicii" },
  { href: "#proiecte", label: "Proiecte" },
  { href: "#contact", label: "Contact" },
];

export default function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-400">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5">
              <Image
                src="/Logo_energreen.png"
                alt="EnerGreenBatery"
                width={140}
                height={35}
                className="h-9 w-auto brightness-200"
              />
              <span className="text-lg font-bold text-white tracking-tight">
                EnerGreenBatery
              </span>
            </div>
            <p className="mt-4 text-sm leading-relaxed max-w-xs">
              Soluții fotovoltaice complete pentru un viitor sustenabil. Energie
              curată, instalare profesională, suport continuu.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Navigare
            </h4>
            <ul className="space-y-2.5">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm hover:text-primary transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Contact
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a
                  href={`tel:${PHONE}`}
                  className="hover:text-primary transition-colors duration-200"
                >
                  {PHONE_DISPLAY}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${EMAIL}`}
                  className="hover:text-primary transition-colors duration-200"
                >
                  {EMAIL}
                </a>
              </li>
              <li>{ADDRESS}</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-500">
            &copy; {new Date().getFullYear()} EnerGreenBatery. Toate drepturile
            rezervate.
          </p>
          <p className="text-xs text-gray-500">CUI: RO12345678</p>
        </div>
      </div>
    </footer>
  );
}
