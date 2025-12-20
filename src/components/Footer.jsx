import React from "react";

const Footer = ({ exitSearch }) => {
  const goHome = () => {
    exitSearch?.();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const goAllMovies = () => {
    exitSearch?.();
    document
      .getElementById("all_movies")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer
      className="relative z-10 bg-neutral-800/10 backdrop-blur-xl border-t border-white/10 mt-20"
      id="about_us"
    >
      <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-3 gap-12">
        <div className="space-y-4">
          <h2 className="text-3xl font-bold text-white tracking-wide">
            cine<span className="text-gradient">Flix</span>
          </h2>

          <p className="text-sm text-white/60 leading-relaxed">
            A modern movie discovery platform built using React and TMDB API.
            Explore trending, popular, and top-rated movies effortlessly.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-white uppercase tracking-widest mb-4">
            Explore
          </h3>

          <ul className="space-y-3 text-sm text-white/60">
            <li
              onClick={goHome}
              className="hover:text-white transition cursor-pointer"
            >
              Home
            </li>
            <li
              onClick={goAllMovies}
              className="hover:text-white transition cursor-pointer"
            >
              Popular Movies
            </li>
            <li className="hover:text-white transition cursor-pointer">
              Top Rated
            </li>
            <li className="hover:text-white transition cursor-pointer">
              Upcoming
            </li>
          </ul>
        </div>

        <div className="space-y-5">
          <h3 className="text-sm font-semibold text-white uppercase tracking-widest">
            Connect
          </h3>

          <div className="flex gap-5">
            <a
              href="https://github.com/notsomohit/cineflix-v1"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/60 hover:text-white transition"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.207 11.385.6.113.793-.258.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.386-1.333-1.756-1.333-1.756-1.09-.745.083-.73.083-.73 1.205.084 1.84 1.236 1.84 1.236 1.07 1.835 2.807 1.305 3.492.998.108-.776.418-1.305.762-1.605-2.665-.305-5.467-1.332-5.467-5.93 0-1.31.469-2.38 1.236-3.22-.124-.303-.536-1.524.117-3.176 0 0 1.008-.322 3.3 1.23a11.5 11.5 0 013.003-.404c1.02.005 2.047.138 3.003.404 2.29-1.552 3.297-1.23 3.297-1.23.655 1.653.243 2.874.12 3.176.77.84 1.235 1.91 1.235 3.22 0 4.61-2.807 5.623-5.48 5.92.43.372.823 1.102.823 2.222v3.293c0 .322.192.694.8.576C20.565 21.796 24 17.297 24 12 24 5.37 18.627 0 12 0z" />
              </svg>
            </a>

            <a
              href="https://www.linkedin.com/feed/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/60 hover:text-white transition"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22.23 0H1.77C.79 0 0 .774 0 1.727v20.545C0 23.227.79 24 1.77 24h20.46c.98 0 1.77-.773 1.77-1.728V1.727C24 .774 23.21 0 22.23 0zM7.12 20.452H3.56V9h3.56v11.452zM5.34 7.433c-1.14 0-2.06-.925-2.06-2.065 0-1.14.92-2.064 2.06-2.064s2.06.924 2.06 2.064c0 1.14-.92 2.065-2.06 2.065zM20.45 20.452h-3.56v-5.569c0-1.328-.03-3.037-1.85-3.037-1.85 0-2.13 1.445-2.13 2.939v5.667h-3.56V9h3.42v1.561h.05c.48-.9 1.65-1.85 3.39-1.85 3.62 0 4.29 2.382 4.29 5.476v6.265z" />
              </svg>
            </a>

            <a
              href="https://x.com/notsomohit_"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/60 hover:text-white transition"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.66l-5.214-6.817-5.968 6.817H1.68l7.73-8.84L1.254 2.25h6.83l4.713 6.231 5.447-6.231z" />
              </svg>
            </a>
          </div>

          <p className="text-xs text-white/40 leading-relaxed">
            This product uses the TMDB API but is not endorsed or certified by TMDB.
          </p>
        </div>
      </div>

      <div className="border-t border-white/10 py-5 text-center text-xs text-white/40">
        © {new Date().getFullYear()} cineFlix · Built by Mohit Singh
      </div>
    </footer>
  );
};

export default Footer;
