export default function Footer() {
  return (
    <footer className="relative bg-gradient-to-r from-black via-[#0a1a2f] to-black text-white py-6">
      {/* Glow effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900 via-black to-blue-900 opacity-30 blur-2xl"></div>

      <div className="relative container mx-auto text-center">
        <p className="text-sm font-light text-gray-300">
          © {new Date().getFullYear()} MERN Blog. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
