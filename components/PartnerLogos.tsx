/* ── Partner logos as inline SVG — clean monochrome marks ── */

export const SigenergiLogo = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 160 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-label="Sigenergi">
    <rect x="0" y="16" width="6" height="16" rx="2" fill="currentColor"/>
    <rect x="9" y="8" width="6" height="32" rx="2" fill="currentColor"/>
    <rect x="18" y="0" width="6" height="48" rx="2" fill="currentColor"/>
    <text x="32" y="32" fontFamily="Arial, sans-serif" fontSize="20" fontWeight="700" fill="currentColor" letterSpacing="1">SIGENERGI</text>
  </svg>
);

export const SolisLogo = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 100 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-label="Solis">
    <circle cx="20" cy="20" r="12" stroke="currentColor" strokeWidth="3" fill="none"/>
    <line x1="20" y1="2" x2="20" y2="8" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
    <line x1="20" y1="32" x2="20" y2="38" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
    <line x1="2" y1="20" x2="8" y2="20" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
    <line x1="32" y1="20" x2="38" y2="20" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
    <text x="44" y="27" fontFamily="Arial, sans-serif" fontSize="22" fontWeight="700" fill="currentColor">SOLIS</text>
  </svg>
);

export const SolarEdgeLogo = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 170 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-label="SolarEdge">
    <polygon points="0,20 10,4 20,20 10,36" fill="currentColor" opacity="0.9"/>
    <polygon points="12,20 22,4 32,20 22,36" fill="currentColor" opacity="0.6"/>
    <text x="38" y="28" fontFamily="Arial, sans-serif" fontSize="20" fontWeight="700" fill="currentColor" letterSpacing="0.5">SolarEdge</text>
  </svg>
);

export const HuaweiLogo = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 150 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-label="Huawei">
    <path d="M20 4 C20 4 10 14 10 20 C10 26 20 36 20 36 C20 36 30 26 30 20 C30 14 20 4 20 4Z" stroke="currentColor" strokeWidth="2.5" fill="none"/>
    <path d="M4 20 C4 20 14 10 20 10 C26 10 36 20 36 20 C36 20 26 30 20 30 C14 30 4 20 4 20Z" stroke="currentColor" strokeWidth="2.5" fill="none"/>
    <text x="44" y="27" fontFamily="Arial, sans-serif" fontSize="20" fontWeight="700" fill="currentColor" letterSpacing="0.5">HUAWEI</text>
  </svg>
);

export const TrinaSolarLogo = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 175 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-label="Trina Solar">
    <rect x="0" y="8" width="10" height="10" rx="1" fill="currentColor"/>
    <rect x="12" y="8" width="10" height="10" rx="1" fill="currentColor"/>
    <rect x="0" y="20" width="10" height="10" rx="1" fill="currentColor"/>
    <rect x="12" y="20" width="10" height="10" rx="1" fill="currentColor"/>
    <rect x="6" y="2" width="10" height="10" rx="1" fill="currentColor" opacity="0.6"/>
    <text x="30" y="28" fontFamily="Arial, sans-serif" fontSize="18" fontWeight="700" fill="currentColor" letterSpacing="0.5">TRINA SOLAR</text>
  </svg>
);

export const ViessmannLogo = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 185 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-label="Viessmann">
    <path d="M4 8 L14 32 L24 8" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    <text x="30" y="28" fontFamily="Arial, sans-serif" fontSize="18" fontWeight="700" fill="currentColor" letterSpacing="0.5">VIESSMANN</text>
  </svg>
);
