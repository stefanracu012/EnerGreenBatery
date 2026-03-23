"use client";

import { useState, useEffect, type FormEvent } from "react";
import {
  PHONE,
  PHONE_DISPLAY,
  EMAIL,
  ADDRESS,
  WHATSAPP_URL,
  MAPS_URL,
} from "@/lib/contact";
import { services } from "@/lib/data";
import { fmt } from "@/lib/format";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    service: "",
    package: "",
    message: "",
  });
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  // Read service + package from URL hash params (e.g. #contact?serviciu=...&pachet=...)
  useEffect(() => {
    function parseHash() {
      const hash = window.location.hash; // e.g. #contact?serviciu=X&pachet=Y
      const qIdx = hash.indexOf("?");
      if (qIdx === -1) return;
      const params = new URLSearchParams(hash.slice(qIdx + 1));
      const serviciu = params.get("serviciu") || "";
      const pachet = params.get("pachet") || "";
      if (serviciu || pachet) {
        setForm((f) => ({
          ...f,
          service: serviciu,
          package: pachet,
        }));
      }
    }
    parseHash();
    window.addEventListener("hashchange", parseHash);
    return () => window.removeEventListener("hashchange", parseHash);
  }, []);

  // Get available packages for selected service
  const selectedService = services.find((s) => s.title === form.service);
  const availablePackages = selectedService?.packages || [];

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setStatus("success");
        setForm({ name: "", phone: "", service: "", package: "", message: "" });
        // Clean the hash params
        if (window.location.hash.includes("?")) {
          window.location.hash = "contact";
        }
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="py-16 lg:py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-sm font-semibold text-primary tracking-widest uppercase mb-4">
            Contact
          </p>
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
            Hai să vorbim
          </h2>
          <p className="mt-4 text-gray-600 leading-relaxed">
            Ai întrebări sau vrei o ofertă personalizată? Scrie-ne sau
            contactează-ne direct.
          </p>
        </div>

        {/* Contact cards + Form */}
        <div className="grid lg:grid-cols-5 gap-8 max-w-6xl mx-auto">
          {/* Left — Contact info cards */}
          <div className="lg:col-span-2 space-y-4">
            {/* Phone card */}
            <a
              href={`tel:${PHONE}`}
              className="group flex items-start gap-4 p-5 bg-white rounded-2xl border border-gray-100 hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300"
            >
              <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                <svg
                  className="w-5 h-5 text-primary"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
                  />
                </svg>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900">Telefon</p>
                <p className="text-sm text-gray-600 mt-0.5">{PHONE_DISPLAY}</p>
              </div>
            </a>

            {/* WhatsApp card */}
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-start gap-4 p-5 bg-white rounded-2xl border border-gray-100 hover:border-green-200 hover:shadow-lg hover:shadow-green-500/5 transition-all duration-300"
            >
              <div className="w-11 h-11 rounded-xl bg-green-50 flex items-center justify-center flex-shrink-0 group-hover:bg-green-100 transition-colors">
                <svg
                  className="w-5 h-5 text-green-600"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900">WhatsApp</p>
                <p className="text-sm text-gray-600 mt-0.5">Scrie-ne oricând</p>
              </div>
            </a>

            {/* Email card */}
            <a
              href={`mailto:${EMAIL}`}
              className="group flex items-start gap-4 p-5 bg-white rounded-2xl border border-gray-100 hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300"
            >
              <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                <svg
                  className="w-5 h-5 text-primary"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                  />
                </svg>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900">Email</p>
                <p className="text-sm text-gray-600 mt-0.5">{EMAIL}</p>
              </div>
            </a>

            {/* Address card */}
            <a
              href={MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-start gap-4 p-5 bg-white rounded-2xl border border-gray-100 hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300"
            >
              <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                <svg
                  className="w-5 h-5 text-primary"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                  />
                </svg>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900">Adresă</p>
                <p className="text-sm text-gray-600 mt-0.5">{ADDRESS}</p>
              </div>
            </a>

            {/* Schedule card */}
            <div className="flex items-start gap-4 p-5 bg-white rounded-2xl border border-gray-100">
              <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                <svg
                  className="w-5 h-5 text-primary"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900">Program</p>
                <p className="text-sm text-gray-600 mt-0.5">
                  Luni – Vineri: 08:00 – 18:00
                </p>
                <p className="text-sm text-gray-600">Sâmbătă: 09:00 – 14:00</p>
              </div>
            </div>
          </div>

          {/* Right — Form */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl border border-gray-100 p-6 lg:p-8">
              <h3 className="text-lg font-bold text-gray-900 mb-6">
                Trimite un mesaj
              </h3>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700 mb-1.5"
                    >
                      Nume complet
                    </label>
                    <input
                      type="text"
                      id="name"
                      required
                      value={form.name}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, name: e.target.value }))
                      }
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors text-sm"
                      placeholder="Ion Popescu"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-gray-700 mb-1.5"
                    >
                      Telefon
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      required
                      value={form.phone}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, phone: e.target.value }))
                      }
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors text-sm"
                      placeholder="0712 345 678"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Serviciu
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {services.map((s) => {
                      const isActive = form.service === s.title;
                      return (
                        <button
                          key={s.slug}
                          type="button"
                          onClick={() =>
                            setForm((f) => ({
                              ...f,
                              service: s.title,
                              package: "",
                            }))
                          }
                          className={`cursor-pointer rounded-xl px-4 py-2.5 text-sm font-medium transition-all duration-200 ${
                            isActive
                              ? "bg-primary text-white shadow-md shadow-primary/20"
                              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                          }`}
                        >
                          {s.title}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Package buttons — shown only when a service is selected */}
                {form.service && availablePackages.length > 0 && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Pachet
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {availablePackages.map((p) => {
                        const isActive = form.package === p.name;
                        return (
                          <button
                            key={p.id}
                            type="button"
                            onClick={() =>
                              setForm((f) => ({ ...f, package: p.name }))
                            }
                            className={`relative cursor-pointer rounded-xl px-4 py-2.5 text-center transition-all duration-200 ${
                              isActive
                                ? "bg-primary text-white shadow-md shadow-primary/20 scale-[1.02]"
                                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                            }`}
                          >
                            <div className="text-base font-bold tabular-nums leading-none">
                              {p.capacity}
                              <span className="text-xs font-semibold ml-0.5">
                                kW
                              </span>
                            </div>
                            <div
                              className={`text-[11px] mt-1 tabular-nums ${
                                isActive ? "text-white/80" : "text-gray-400"
                              }`}
                            >
                              {fmt(p.totalPrice)} €
                            </div>
                            {p.popular && (
                              <span
                                className={`absolute -top-1.5 -right-1.5 text-[9px] font-bold px-1.5 py-0.5 rounded-full ${
                                  isActive
                                    ? "bg-white text-primary"
                                    : "bg-primary text-white"
                                }`}
                              >
                                Popular
                              </span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700 mb-1.5"
                  >
                    Mesaj
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    required
                    value={form.message}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, message: e.target.value }))
                    }
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors resize-none text-sm"
                    placeholder="Descrie-ne pe scurt ce te interesează..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full py-3.5 bg-primary text-white rounded-xl font-semibold hover:bg-primary-dark transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed text-sm"
                >
                  {status === "loading" ? "Se trimite..." : "Trimite mesajul"}
                </button>

                {status === "success" && (
                  <p className="text-primary text-sm text-center font-medium">
                    Mesajul a fost trimis cu succes. Te vom contacta în curând.
                  </p>
                )}
                {status === "error" && (
                  <p className="text-red-500 text-sm text-center">
                    A apărut o eroare. Te rugăm să încerci din nou.
                  </p>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
