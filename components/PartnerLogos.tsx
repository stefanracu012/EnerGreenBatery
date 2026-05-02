/* ── Partner logos — text only, clean monochrome ── */

type LogoProps = { className?: string };

export const SigenergiLogo = ({ className = "" }: LogoProps) => (
  <span className={`font-black tracking-widest uppercase ${className}`} aria-label="Sigenergi">
    Sigenergi
  </span>
);

export const SolisLogo = ({ className = "" }: LogoProps) => (
  <span className={`font-black tracking-widest uppercase ${className}`} aria-label="Solis">
    Solis
  </span>
);

export const SolarEdgeLogo = ({ className = "" }: LogoProps) => (
  <span className={`font-black tracking-widest uppercase ${className}`} aria-label="SolarEdge">
    SolarEdge
  </span>
);

export const HuaweiLogo = ({ className = "" }: LogoProps) => (
  <span className={`font-black tracking-widest uppercase ${className}`} aria-label="Huawei">
    Huawei
  </span>
);

export const TrinaSolarLogo = ({ className = "" }: LogoProps) => (
  <span className={`font-black tracking-widest uppercase ${className}`} aria-label="Trina Solar">
    Trina Solar
  </span>
);

export const ViessmannLogo = ({ className = "" }: LogoProps) => (
  <span className={`font-black tracking-widest uppercase ${className}`} aria-label="Viessmann">
    Viessmann
  </span>
);
