import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu } from "lucide-react";

export default function Header({
  onNav,
}: {
  onNav: (section: string) => void;
}) {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleNavClick = (section: string) => {
    setMenuOpen(false);
    onNav(section);
  };

  return (
    <header className="flex justify-between items-center px-4 sm:px-6 py-4 bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-20">
      <div
        className="flex items-center gap-3 cursor-pointer"
        onClick={() => onNav("home")}
      >
        <Image
          src="/globe.svg"
          alt="EdVid Logo"
          width={40}
          height={40}
          className="rounded-full"
        />
        <span className="text-2xl font-extrabold tracking-tight text-blue-700">
          EdVid
        </span>
      </div>
      {/* Desktop nav */}
      <nav className="hidden md:flex gap-6 text-gray-700 font-medium">
        <button
          onClick={() => onNav("features")}
          className="hover:text-blue-600 transition"
        >
          Features
        </button>
        <button
          onClick={() => onNav("community")}
          className="hover:text-blue-600 transition"
        >
          Community
        </button>
        <button
          onClick={() => onNav("about")}
          className="hover:text-blue-600 transition"
        >
          About
        </button>
      </nav>
      {/* Mobile hamburger */}
      <div className="md:hidden relative">
        <button
          className="p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          aria-label="Open menu"
          onClick={() => setMenuOpen((v) => !v)}
        >
          <Menu className="w-7 h-7 text-blue-700" />
        </button>
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.18 }}
              className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-30"
            >
              <button
                onClick={() => handleNavClick("features")}
                className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-700"
              >
                Features
              </button>
              <button
                onClick={() => handleNavClick("community")}
                className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-700"
              >
                Community
              </button>
              <button
                onClick={() => handleNavClick("about")}
                className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-700"
              >
                About
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
