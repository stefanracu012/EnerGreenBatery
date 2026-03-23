"use client";

import { useState, useRef, useEffect } from "react";
import { PHONE, PHONE_DISPLAY, EMAIL, MAPS_URL } from "@/lib/contact";

export default function TopBar() {
  const [phoneOpen, setPhoneOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setPhoneOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="bg-gray-900 text-gray-300 text-xs relative z-[60]">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 flex items-center justify-between h-9">
        {/* Left — Phone with dropdown */}
        <div className="flex items-center gap-4 sm:gap-6">
          <div ref={dropdownRef} className="relative">
            <button
              onClick={() => setPhoneOpen(!phoneOpen)}
              className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer"
            >
              {/* Phone icon */}
              <svg
                className="w-3.5 h-3.5"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
                />
              </svg>
              <span className="hidden sm:inline">{PHONE_DISPLAY}</span>
              <svg
                className={`w-3 h-3 transition-transform duration-200 ${phoneOpen ? "rotate-180" : ""}`}
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2.5}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m19.5 8.25-7.5 7.5-7.5-7.5"
                />
              </svg>
            </button>

            {/* Dropdown */}
            {phoneOpen && (
              <div className="absolute top-full left-0 mt-1.5 bg-white rounded-lg shadow-xl border border-gray-100 py-1 min-w-[200px] z-[70] animate-in fade-in slide-in-from-top-1">
                <a
                  href={`tel:${PHONE}`}
                  className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <svg
                    className="w-4 h-4 text-primary"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
                    />
                  </svg>
                  Sună acum
                </a>
                <a
                  href={`https://wa.me/${PHONE.replace("+", "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <svg
                    className="w-4 h-4 text-green-500"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
                  </svg>
                  WhatsApp
                </a>
                <a
                  href={`viber://chat?number=${PHONE.replace("+", "%2B")}`}
                  className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <svg
                    className="w-4 h-4 text-purple-500"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M11.398.002C9.473.028 5.331.344 3.014 2.467 1.294 4.177.533 6.753.456 9.929c-.08 3.19-.186 9.163 5.597 10.825v2.482s-.04.98.61 1.186c.79.25 1.254-.508 2.01-1.327.413-.449.98-1.108 1.418-1.616 3.9.334 6.9-.416 7.238-.526.784-.256 5.22-.826 5.943-6.736.751-6.127-.356-10.006-2.347-11.766C18.903.583 14.478-.048 11.398.002zm.654 1.74c2.664-.023 6.421.39 8.328 2.048 1.653 1.478 2.523 4.846 1.894 10.08-.58 4.749-4.003 5.173-4.674 5.397-.264.088-2.738.702-5.926.535 0 0-2.346 2.83-3.08 3.576-.114.118-.25.166-.34.144-.128-.032-.162-.184-.16-.406.004-.158.012-3.41.012-3.41C2.93 18.253 3.19 13.242 3.26 10.022c.065-2.651.669-4.735 2.084-6.14C7.38 1.96 9.384 1.74 12.052 1.74zM12.2 4.32a.274.274 0 0 0-.272.272.274.274 0 0 0 .272.272c2.728.012 5.058 1.88 5.334 5.408a.274.274 0 0 0 .272.272.274.274 0 0 0 .272-.272c-.274-3.8-2.876-5.94-5.878-5.952zm-.136 2.086a.274.274 0 0 0-.272.272.274.274 0 0 0 .272.272c1.376.002 2.992.898 3.114 3.266a.274.274 0 0 0 .272.272.274.274 0 0 0 .272-.272c-.136-2.726-2.066-3.81-3.658-3.81zm2.59 4.904c-.364-.004-.754.12-1.022.312l-.01.006c-.322.242-.558.498-.614.816-.06.336.072.672.332.982l.004.006c.518.618 1.188 1.152 1.938 1.536.414.21.838.372 1.264.484.154.042.316.06.484.06.348 0 .65-.102.906-.312.204-.168.388-.406.444-.666.028-.142-.004-.276-.088-.372-.24-.276-.548-.456-.876-.636l-.078-.042-.254-.142c-.256-.146-.456-.146-.648.022l-.3.3c-.164.16-.34.134-.34.134l-.01-.004c-1.294-.474-2.058-1.62-2.116-1.724-.004-.01-.098-.178.062-.34l.008-.01c.08-.092.168-.184.254-.276.18-.19.234-.44.118-.668-.362-.69-.67-1.126-.964-1.442a.554.554 0 0 0-.398-.21.26.26 0 0 0-.094.014zm-2.618.294a.274.274 0 0 0-.272.272.274.274 0 0 0 .272.272c.69.004 1.672.46 1.726 1.864a.274.274 0 0 0 .272.272.274.274 0 0 0 .272-.272c-.064-1.758-1.34-2.394-2.27-2.408z" />
                  </svg>
                  Viber
                </a>
              </div>
            )}
          </div>

          {/* Email */}
          <a
            href={`mailto:${EMAIL}`}
            className="hidden sm:flex items-center gap-1.5 hover:text-white transition-colors"
          >
            <svg
              className="w-3.5 h-3.5"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
              />
            </svg>
            <span>{EMAIL}</span>
          </a>
        </div>

        {/* Right — Location */}
        <a
          href={MAPS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 hover:text-white transition-colors"
        >
          <svg
            className="w-3.5 h-3.5"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
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
          <span className="hidden md:inline">
            Sat Reuseni, Com. Udești, Suceava
          </span>
          <span className="md:hidden">Locație</span>
        </a>
      </div>
    </div>
  );
}
