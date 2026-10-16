import Link from 'next/link';
import { AstronautIllustration, PlanetIllustration, StarryBlob } from '@/components/illustrations/retro-space';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#DEDEC8] flex flex-col items-center justify-center text-center p-6 text-[#0A0A0A] font-sans relative overflow-hidden">
      {/* Background stars / dots */}
      <div className="absolute inset-0 bg-[radial-gradient(#0a0a0a_1px,transparent_1px)] [background-size:24px_24px] opacity-20 pointer-events-none" />

      {/* Floating Planet & Astronaut */}
      <div className="relative mb-8 flex items-center justify-center">
        <div className="absolute -top-16 -right-16 opacity-30 pointer-events-none">
          <PlanetIllustration className="w-36 h-36" />
        </div>
        <AstronautIllustration className="w-56 h-56 animate-bounce transition-transform duration-1000" />
      </div>

      <div className="relative z-10 max-w-lg">
        <span className="font-label text-xs uppercase tracking-widest px-3 py-1 bg-white border-2 border-[#0A0A0A] rounded-full shadow-[2px_2px_0px_#0A0A0A] font-bold inline-block mb-4">
          TRANSMISSION LOST // ERROR 404
        </span>

        <h1 className="text-5xl sm:text-7xl font-display uppercase tracking-tight text-[#0A0A0A] mb-4">
          LOST IN DEEP SPACE
        </h1>

        <p className="text-sm sm:text-base text-[#0A0A0A]/80 mb-8 font-sans leading-relaxed">
          The orbital coordinates you requested could not be resolved by our tracking stations. The payload may have drifted into deep space.
        </p>

        <div className="flex items-center justify-center gap-4">
          <Link
            href="/"
            className="px-6 py-3 bg-[#0A0A0A] text-white font-label text-xs uppercase tracking-wider font-bold rounded-full border-2 border-[#0A0A0A] shadow-[4px_4px_0px_#0A0A0A] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_#0A0A0A] active:translate-x-0 active:translate-y-0 active:shadow-[2px_2px_0px_#0A0A0A] transition-all"
          >
            RETURN TO ORBITAL BASE
          </Link>
          <Link
            href="/dashboard/capture"
            className="px-6 py-3 bg-white text-[#0A0A0A] font-label text-xs uppercase tracking-wider font-bold rounded-full border-2 border-[#0A0A0A] shadow-[4px_4px_0px_#0A0A0A] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_#0A0A0A] active:translate-x-0 active:translate-y-0 active:shadow-[2px_2px_0px_#0A0A0A] transition-all"
          >
            ENTER WORKSPACE
          </Link>
        </div>
      </div>
    </div>
  );
}
