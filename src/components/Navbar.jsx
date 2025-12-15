import React from "react";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 w-full z-11 backdrop-blur-md bg-black/35 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        
        {/* Logo */}
        <span className="font-logo text-3xl tracking-tight text-white">
          cine<span className="text-gradient">Flix</span>
        </span>

        {/* Links */}
        <div className="font-inter hidden md:flex items-center gap-8 text-sm text-white/80">
          <a href="#" className="hover:text-white transition">Home</a>
          <a href="#" className="hover:text-white transition">Trending</a>
          <a href="#" className="hover:text-white transition">About</a>
        </div>

        <button className="px-4 py-2 rounded-b-md bg-white/10 hover:bg-white/20 transition text-sm text-white">
          Sign In
        </button>

      </div>
    </nav>
  );
};

export default Navbar;
