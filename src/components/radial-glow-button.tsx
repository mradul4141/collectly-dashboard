"use client";

import React from "react";
import { cn } from "@/lib/utils";

export interface RadialGlowButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
}

export function RadialGlowButton({
  children = "Get Started",
  className,
  ...props
}: RadialGlowButtonProps) {
  return (
    <div className="relative inline-block">
      <style>{`
        @property --rg-pos-x { syntax: '<percentage>'; initial-value: 45%; inherits: false; }
        @property --rg-pos-y { syntax: '<percentage>'; initial-value: 130%; inherits: false; }
        @property --rg-spread-x { syntax: '<percentage>'; initial-value: 140%; inherits: false; }
        @property --rg-spread-y { syntax: '<percentage>'; initial-value: 170%; inherits: false; }
        @property --rg-color-1 { syntax: '<color>'; initial-value: #180902; inherits: false; }
        @property --rg-color-2 { syntax: '<color>'; initial-value: #7c2d12; inherits: false; }
        @property --rg-color-3 { syntax: '<color>'; initial-value: #ea580c; inherits: false; }
        @property --rg-color-4 { syntax: '<color>'; initial-value: #fbbf24; inherits: false; }
        @property --rg-color-5 { syntax: '<color>'; initial-value: #070707; inherits: false; }
        @property --rg-border-angle { syntax: '<angle>'; initial-value: 180deg; inherits: true; }
        @property --rg-border-color-1 { syntax: '<color>'; initial-value: rgba(251, 146, 60, 0.85); inherits: true; }
        @property --rg-border-color-2 { syntax: '<color>'; initial-value: rgba(234, 88, 12, 0.25); inherits: true; }
        @property --rg-stop-1 { syntax: '<percentage>'; initial-value: 30%; inherits: false; }
        @property --rg-stop-2 { syntax: '<percentage>'; initial-value: 58%; inherits: false; }
        @property --rg-stop-3 { syntax: '<percentage>'; initial-value: 76%; inherits: false; }
        @property --rg-stop-4 { syntax: '<percentage>'; initial-value: 92%; inherits: false; }
        @property --rg-stop-5 { syntax: '<percentage>'; initial-value: 100%; inherits: false; }

        .rg-button {
          --transition: 0.25s;
          --spark: 1.8s;
          --speed: 1.2s;
          --cut: 1px;
          --bg: radial-gradient(
            var(--rg-spread-x) var(--rg-spread-y) at var(--rg-pos-x) var(--rg-pos-y),
            var(--rg-color-1) var(--rg-stop-1),
            var(--rg-color-2) var(--rg-stop-2),
            var(--rg-color-3) var(--rg-stop-3),
            var(--rg-color-4) var(--rg-stop-4),
            var(--rg-color-5) var(--rg-stop-5)
          );
          
          position: relative;
          min-width: 160px;
          min-height: 51px;
          padding: 16px 24px;
          border: none;
          border-radius: 9999px;
          font-family: inherit;
          font-size: 15px;
          font-weight: 600;
          line-height: 19px;
          color: rgba(255, 255, 255, 0.98);
          background: var(--bg);
          cursor: pointer;
          text-shadow: 0 1px 3px rgba(0, 0, 0, 0.9);
          overflow: hidden;
          -webkit-font-smoothing: antialiased;
          -webkit-tap-highlight-color: transparent;
          box-shadow: 0 10px 30px -10px rgba(234, 88, 12, 0.35);
          transition: 
            box-shadow .3s,
            --rg-pos-x .75s, --rg-pos-y .75s,
            --rg-spread-x .75s, --rg-spread-y .75s,
            --rg-color-1 .75s, --rg-color-2 .75s, --rg-color-3 .75s, --rg-color-4 .75s, --rg-color-5 .75s,
            --rg-border-angle .75s, --rg-border-color-1 .75s, --rg-border-color-2 .75s,
            --rg-stop-1 .75s, --rg-stop-2 .75s, --rg-stop-3 .75s, --rg-stop-4 .75s, --rg-stop-5 .75s;
        }

        .rg-button::before {
          content: '';
          position: absolute;
          inset: 0;
          padding: 1px;
          border-radius: inherit;
          background-image: linear-gradient(var(--rg-border-angle), var(--rg-border-color-1), var(--rg-border-color-2));
          mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          mask-composite: exclude;
          pointer-events: none;
        }

        .rg-button:hover {
          --rg-pos-x: 50%;
          --rg-pos-y: 110%;
          --rg-spread-x: 120%;
          --rg-spread-y: 130%;
          --rg-color-1: #250901;
          --rg-color-2: #ea580c;
          --rg-color-3: #f97316;
          --rg-color-4: #fed7aa;
          --rg-color-5: #0a0a0a;
          --rg-stop-1: 0%;
          --rg-stop-2: 25%;
          --rg-stop-3: 50%;
          --rg-stop-4: 85%;
          --rg-stop-5: 140%;
          --rg-border-angle: 190deg;
          --rg-border-color-1: rgba(254, 215, 170, 0.95);
          --rg-border-color-2: rgba(234, 88, 12, 0.4);
          --button-line-opacity: 1;
          box-shadow: 0 15px 40px -8px rgba(249, 115, 22, 0.55);
        }

        .rg-label {
          position: relative;
          z-index: 1;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }

        .rg-bg {
          position: absolute;
          inset: var(--cut);
          background: var(--bg);
          border-radius: inherit;
          transition: background var(--transition), opacity var(--transition);
        }

        .rg-shine {
          position: absolute;
          inset: 0;
          container-type: size;
          border-radius: inherit;
          mix-blend-mode: soft-light;
          opacity: var(--button-line-opacity, 0);
          transition: opacity 0.3s;
          overflow: visible;
        }

        .rg-shine span {
          position: absolute;
          inset: 0;
          height: 100cqh;
          aspect-ratio: 1;
          animation: rg-slide var(--speed) ease-in-out infinite alternate;
          overflow: visible;
        }

        .rg-shine span::before {
          content: "";
          position: absolute;
          inset: -100%;
          background: conic-gradient(
            from calc(270deg - (90deg * 0.5)),
            transparent 0,
            #fff 90deg,
            transparent 90deg
          );
          animation: rg-spin calc(var(--speed) * 2) infinite linear;
        }

        @keyframes rg-spin {
          0% { rotate: 0deg; }
          15%, 35% { rotate: 90deg; }
          65%, 85% { rotate: 270deg; }
          100% { rotate: 360deg; }
        }

        @keyframes rg-slide {
          to { transform: translate(calc(100cqw - 100%), 0); }
        }
      `}</style>
      
      <button className={cn("rg-button", className)} type="button" {...props}>
        <span className="rg-shine">
          <span></span>
        </span>
        <span className="rg-bg"></span>
        <span className="rg-label">{children}</span>
      </button>
    </div>
  );
}

export default RadialGlowButton;
