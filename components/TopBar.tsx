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
                    viewBox="0 0 48 48"
                    fill="currentColor"
                  >
                    <path d="M38.4 7.3C35.1 4.2 28.8 1.6 24.2 1.5h-.1C19.5 1.6 13.2 4.2 9.9 7.3 6.1 10.9 4.5 15.4 4.3 21c-.2 5.6-.4 16.1 9.8 19.5v4.5s-.1 1.8 1.1 2.2c1.4.4 2.3-.9 3.6-2.4.8-.8 1.8-2 2.6-2.9 7.1.6 12.6-.8 13.2-1 1.4-.5 9.6-1.5 10.9-12.4 1.4-11.2-.6-18.3-7.1-21.2zM36 27.2c-.9 8.6-7.2 9-8.4 9.3-.5.2-5.2 1.3-11 .9 0 0-4.4 5.3-5.7 6.6-.2.2-.5.3-.6.3-.2 0-.3-.3-.3-.7 0-.5 0-6.3 0-6.3C3.5 34.6 5.8 27.2 6 22.1c.1-4.5 1.5-8.1 4.5-11C13.4 8.3 19 6 22.9 5.9h.5c3.9.1 9.5 2.4 12.4 5.2 3 2.9 4.4 6.5 4.5 11-.1.1-.8 3.8-4.3 5.1zM25.1 12.3c-.2 0-.5.2-.5.5s.2.5.5.5c1.2 0 2.3.2 3.3.5 1 .4 2 1 2.7 1.7.8.7 1.4 1.6 1.8 2.7.4 1 .6 2.1.6 3.3 0 .3.2.5.5.5s.5-.2.5-.5c0-1.3-.2-2.6-.7-3.7-.5-1.1-1.2-2.2-2.1-3-.9-.9-1.9-1.5-3.1-1.9-1.1-.4-2.3-.6-3.5-.6zm.1 3.1c-.3 0-.5.2-.5.5s.2.5.5.5c.7 0 1.4.1 2 .4.6.3 1.1.8 1.4 1.3.3.6.5 1.3.5 2 0 .3.2.5.5.5s.5-.2.5-.5c0-1-.2-1.8-.6-2.6-.5-.8-1.1-1.4-1.8-1.7-.7-.3-1.5-.4-2.5-.4zm-3.6 4.3c-.1 0-.2 0-.2.1-.4.2-.7.5-1.1.7-.3.4-.5.7-.5 1.1v.1c.1.8.5 1.6 1.3 2.4l0 0c1.1 1.2 2.3 2.2 3.7 3 .5.3 1 .5 1.5.7.8.3 1.4.4 1.9.2.4-.2.8-.6 1.1-1 .1-.2.2-.5.1-.7-.1-.2-.4-.4-.7-.6l-1.7-1c-.3-.2-.7-.1-.9.1l-.6.5s-.2.2-.5.2l0 0c-2.3-.7-3.7-3.1-3.7-3.1s-.1-.3.1-.5l.5-.6c.2-.2.3-.6.2-.9-.5-.8-1-1.6-1.5-2.3-.2-.2-.4-.4-.6-.4h-.2zm7.5.2c-.3 0-.5.2-.5.5s.2.5.5.5c.4 0 .8.1 1.1.3.3.2.6.6.7 1 .2.4.3 1 .3 1.6 0 .3.2.5.5.5s.5-.2.5-.5c0-.7-.1-1.4-.3-1.9-.2-.6-.6-1-1-1.3-.5-.3-1-.5-1.6-.5z" />
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
