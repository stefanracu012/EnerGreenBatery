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
                    <path d="M11.4 0C9.473.028 5.333.344 3.02 2.467 1.302 4.187.541 6.749.46 9.927c-.081 3.178-.186 9.142 5.6 10.804l.004.003v2.458s-.037.992.616 1.193c.79.244 1.254-.508 2.01-1.327.414-.449.985-1.108 1.417-1.613 3.907.328 6.91-.422 7.254-.537.793-.265 5.28-.833 6.007-6.797.752-6.157-.364-10.04-2.36-11.786C18.903.572 14.48-.04 11.4 0zm.64 1.74c2.677-.025 6.453.402 8.353 2.064 1.652 1.473 2.53 4.844 1.893 10.09-.582 4.747-4.005 5.177-4.672 5.4-.282.094-2.756.712-5.928.543 0 0-2.348 2.836-3.082 3.583-.115.117-.249.164-.34.144-.126-.027-.16-.164-.159-.361.003-.278.019-3.447.019-3.447C3.026 18.293 2.37 13.22 2.436 10.09c.066-2.625.688-4.75 2.11-6.155C6.554 1.972 9.363 1.762 12.04 1.74zM12.12 4.3c-.133 0-.242.117-.24.26.003.142.115.257.248.257.659 0 1.273.098 1.825.29a4.337 4.337 0 0 1 1.475.92c.422.409.746.898.964 1.455.218.556.327 1.168.327 1.821 0 .142.112.257.25.257.137 0 .248-.115.248-.257 0-.727-.122-1.41-.363-2.03a5.098 5.098 0 0 0-1.09-1.647 4.935 4.935 0 0 0-1.672-1.044c-.621-.218-1.31-.327-2.004-.327h-.057zm.028 1.72c-.137 0-.247.115-.247.255 0 .142.11.258.247.258.414-.008.787.073 1.108.243.322.17.576.417.76.735.184.318.276.698.276 1.129 0 .14.113.256.25.256.138 0 .25-.116.25-.256 0-.535-.115-1.013-.345-1.422a2.598 2.598 0 0 0-.974-.94c-.399-.222-.857-.335-1.325-.258zm.153 1.648c-.08.003-.153.07-.154.157-.003.141.176.196.288.284.152.119.312.286.3.503l.004.054c.033.254.113.378.236.519.123.14.323.165.457.08.127-.082.186-.268.135-.488-.053-.268-.184-.574-.454-.836-.14-.136-.327-.26-.53-.262a.453.453 0 0 0-.079 0h-.1l-.003-.011zm-2.3.312c-.188.012-.382.1-.588.268l-.005.003a2.675 2.675 0 0 0-.396.393c-.158.208-.244.415-.267.62-.002.024-.002.049 0 .073.034.423.27.86.697 1.329l.008.009c.59.644 1.292 1.203 2.038 1.633.258.148.543.28.846.392.442.177.772.198 1.04.093.023-.008.046-.02.067-.032.231-.13.432-.306.576-.52.076-.113.126-.263.064-.39-.063-.13-.226-.238-.39-.335l-.927-.57c-.18-.11-.383-.046-.512.064l-.31.277c-.12.1-.279.088-.279.088l-.006-.002c-1.254-.38-2.048-1.694-2.048-1.694s-.047-.154.057-.277l.282-.305c.114-.125.188-.327.082-.509-.253-.434-.537-.862-.798-1.284-.086-.14-.217-.219-.35-.233zm4.105.09c-.142-.002-.258.11-.26.25-.002.143.11.26.25.262.235.003.44.066.61.189.172.123.306.306.4.544.095.238.142.524.142.854 0 .142.113.256.25.256.138 0 .25-.114.25-.256 0-.4-.062-.76-.184-1.068-.122-.308-.307-.555-.554-.731-.247-.176-.535-.278-.862-.278z" />
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
