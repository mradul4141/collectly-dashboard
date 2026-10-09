import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center text-center p-6 text-white font-sans">
      <h2 className="text-6xl font-bold font-serif mb-4 text-orange-500">404</h2>
      <p className="text-xl mb-8 text-gray-400">Could not find requested resource</p>
      <Link href="/" className="px-6 py-3 bg-white text-black font-bold rounded-full hover:bg-gray-200 transition-colors">
        Return Home
      </Link>
    </div>
  );
}
