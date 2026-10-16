import React from "react";

interface IllustrationProps {
  className?: string;
}

export function AstronautIllustration({ className = "w-32 h-32" }: IllustrationProps) {
  return (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
      {/* Helmet Bubble */}
      <circle cx="50" cy="36" r="18" fill="#FFFFFF" stroke="#0A0A0A" strokeWidth="2.5" />
      {/* Visor with reflection hatch */}
      <ellipse cx="50" cy="36" rx="12" ry="9" fill="#0A0A0A" />
      <path d="M43 32 L47 30 M45 36 L52 32 M47 40 L55 35" stroke="#FFFFFF" strokeWidth="1.2" strokeLinecap="round" />
      {/* Backpack */}
      <rect x="28" y="44" width="44" height="34" rx="6" fill="#FFFFFF" stroke="#0A0A0A" strokeWidth="2.5" />
      {/* Crosshatch shading on backpack */}
      <path d="M32 48 L40 56 M32 54 L44 66 M32 60 L44 72" stroke="#0A0A0A" strokeWidth="1" strokeLinecap="round" />
      {/* Spacesuit Torso */}
      <path d="M35 48 C35 42, 65 42, 65 48 L68 76 C68 80, 32 80, 32 76 Z" fill="#FFFFFF" stroke="#0A0A0A" strokeWidth="2.5" />
      {/* Chest Control Box */}
      <rect x="42" y="52" width="16" height="12" rx="2" fill="#0A0A0A" />
      <circle cx="46" cy="58" r="1.5" fill="#FFFFFF" />
      <circle cx="51" cy="58" r="1.5" fill="#FFFFFF" />
      <line x1="44" y1="54" x2="56" y2="54" stroke="#FFFFFF" strokeWidth="1" />
      {/* Arms waving */}
      <path d="M34 50 C24 54, 20 62, 18 68 C16 72, 22 74, 24 70 C26 66, 30 60, 34 58" fill="#FFFFFF" stroke="#0A0A0A" strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M66 50 C76 46, 82 38, 86 34 C89 31, 93 35, 90 39 C86 45, 78 54, 66 58" fill="#FFFFFF" stroke="#0A0A0A" strokeWidth="2.5" strokeLinejoin="round" />
      {/* Glove cuff line */}
      <line x1="84" y1="38" x2="88" y2="42" stroke="#0A0A0A" strokeWidth="2" />
      {/* Legs */}
      <path d="M37 78 L34 94 C34 96, 42 98, 44 95 L46 78" fill="#FFFFFF" stroke="#0A0A0A" strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M63 78 L66 94 C66 96, 58 98, 56 95 L54 78" fill="#FFFFFF" stroke="#0A0A0A" strokeWidth="2.5" strokeLinejoin="round" />
      {/* Tether wire winding */}
      <path d="M28 50 C15 45, 8 60, 2 55" stroke="#0A0A0A" strokeWidth="2" strokeDasharray="3 3" />
    </svg>
  );
}

export function UfoIllustration({ className = "w-28 h-28" }: IllustrationProps) {
  return (
    <svg viewBox="0 0 100 80" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
      {/* Tractor Beam */}
      <polygon points="50,42 15,80 85,80" fill="#0A0A0A" opacity="0.08" />
      <line x1="50" y1="42" x2="20" y2="80" stroke="#0A0A0A" strokeWidth="1" strokeDasharray="2 3" />
      <line x1="50" y1="42" x2="80" y2="80" stroke="#0A0A0A" strokeWidth="1" strokeDasharray="2 3" />
      {/* Glass Dome */}
      <path d="M36 28 C36 16, 64 16, 64 28 Z" fill="#FFFFFF" stroke="#0A0A0A" strokeWidth="2.5" />
      <path d="M42 22 L46 18 M46 24 L52 18" stroke="#0A0A0A" strokeWidth="1.2" strokeLinecap="round" />
      {/* Saucer Hull */}
      <ellipse cx="50" cy="34" rx="38" ry="10" fill="#0A0A0A" />
      <ellipse cx="50" cy="32" rx="36" ry="8" fill="#FFFFFF" stroke="#0A0A0A" strokeWidth="2" />
      {/* Hatching on bottom of hull */}
      <ellipse cx="50" cy="36" rx="28" ry="6" fill="#0A0A0A" />
      {/* Dome portholes */}
      <circle cx="32" cy="32" r="2" fill="#0A0A0A" />
      <circle cx="41" cy="33" r="2" fill="#0A0A0A" />
      <circle cx="50" cy="34" r="2.5" fill="#0A0A0A" />
      <circle cx="59" cy="33" r="2" fill="#0A0A0A" />
      <circle cx="68" cy="32" r="2" fill="#0A0A0A" />
    </svg>
  );
}

export function PlanetIllustration({ className = "w-24 h-24" }: IllustrationProps) {
  return (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
      {/* Ring back */}
      <path d="M12 56 C24 38, 76 34, 94 48" stroke="#0A0A0A" strokeWidth="3" strokeLinecap="round" />
      {/* Planet Body */}
      <circle cx="50" cy="50" r="28" fill="#FFFFFF" stroke="#0A0A0A" strokeWidth="2.5" />
      {/* Craters & Engraved Surface Lines */}
      <ellipse cx="42" cy="40" rx="6" ry="4" fill="#0A0A0A" />
      <ellipse cx="60" cy="58" rx="8" ry="5" fill="#0A0A0A" />
      <ellipse cx="36" cy="62" rx="4" ry="3" stroke="#0A0A0A" strokeWidth="1.5" />
      {/* Crosshatch shadow */}
      <path d="M48 64 C60 64, 70 56, 74 46" stroke="#0A0A0A" strokeWidth="2" />
      <path d="M52 68 L60 60 M56 72 L66 62 M62 74 L70 66" stroke="#0A0A0A" strokeWidth="1.2" strokeLinecap="round" />
      {/* Ring front */}
      <path d="M6 52 C20 72, 80 68, 96 46" stroke="#0A0A0A" strokeWidth="3.5" strokeLinecap="round" />
      <path d="M16 57 C28 72, 74 68, 86 51" stroke="#0A0A0A" strokeWidth="1.5" strokeDasharray="3 3" />
    </svg>
  );
}

export function TelescopeIllustration({ className = "w-20 h-20" }: IllustrationProps) {
  return (
    <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
      {/* Tripod Legs */}
      <line x1="40" y1="46" x2="16" y2="76" stroke="#0A0A0A" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="40" y1="46" x2="40" y2="76" stroke="#0A0A0A" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="40" y1="46" x2="64" y2="76" stroke="#0A0A0A" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="28" y1="62" x2="52" y2="62" stroke="#0A0A0A" strokeWidth="1.5" />
      {/* Mount Joint */}
      <circle cx="40" cy="46" r="4" fill="#0A0A0A" />
      {/* Barrel */}
      <path d="M22 56 L64 20 L70 27 L28 63 Z" fill="#FFFFFF" stroke="#0A0A0A" strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M64 20 L72 13 L78 20 L70 27 Z" fill="#0A0A0A" />
      {/* Eyepiece */}
      <rect x="18" y="56" width="6" height="10" rx="1" transform="rotate(-40 18 56)" fill="#0A0A0A" />
      {/* Star sparkle above lens */}
      <path d="M72 8 L74 12 L78 14 L74 16 L72 20 L70 16 L66 14 L70 12 Z" fill="#0A0A0A" />
    </svg>
  );
}

export function StarryBlob({ 
  className = "w-48 h-48",
  children
}: { 
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute inset-0 w-full h-full">
        {/* Organic Cosmic Blob */}
        <path
          d="M48.2,-64.5C62.4,-54.1,73.8,-39.8,78.2,-23.4C82.6,-7,80,11.5,72.6,27.7C65.1,43.9,52.8,57.7,37.8,66.4C22.7,75.1,4.9,78.7,-12.3,76.5C-29.5,74.3,-46.1,66.4,-58.3,53.8C-70.5,41.2,-78.3,23.9,-79.8,6.2C-81.3,-11.5,-76.4,-29.6,-65.4,-42.2C-54.4,-54.8,-37.2,-61.9,-20.8,-67.2C-4.4,-72.5,11.3,-76,27.4,-73.2C34,-72,41.1,-69.5,48.2,-64.5Z"
          transform="translate(100 100)"
          fill="#0A0A0A"
        />
        {/* Star Dots inside the Blob */}
        <circle cx="65" cy="55" r="1.5" fill="#FFFFFF" />
        <circle cx="135" cy="65" r="1.5" fill="#FFFFFF" />
        <circle cx="150" cy="115" r="1" fill="#FFFFFF" />
        <circle cx="85" cy="145" r="1.5" fill="#FFFFFF" />
        <circle cx="55" cy="115" r="1" fill="#FFFFFF" />
        <circle cx="115" cy="155" r="1" fill="#FFFFFF" />
        {/* Small 4-point star asterisk */}
        <path d="M100 45 L101 49 L105 50 L101 51 L100 55 L99 51 L95 50 L99 49 Z" fill="#FFFFFF" />
        <path d="M140 135 L140.5 137.5 L143 138 L140.5 138.5 L140 141 L139.5 138.5 L137 138 L139.5 137.5 Z" fill="#FFFFFF" />
      </svg>
      <div className="relative z-10">{children}</div>
    </div>
  );
}

export function SpiralLogo({ className = "w-8 h-8" }: IllustrationProps) {
  return (
    <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-label="Collectly Spiral Mark">
      <circle cx="20" cy="20" r="18" fill="#0A0A0A" />
      {/* Archimedian Spiral */}
      <path
        d="M20 20 C18 20, 16 18, 16 16 C16 13, 19 11, 22 11 C26 11, 29 14, 29 18 C29 23, 24 27, 19 27 C13 27, 9 22, 9 16 C9 9, 15 4, 22 4 C30 4, 36 11, 36 19"
        stroke="#FFFFFF"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <circle cx="20" cy="20" r="2" fill="#FFFFFF" />
    </svg>
  );
}
