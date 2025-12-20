import React, { useEffect, useRef, useState } from "react";
import SearchBar from "./components/Search.jsx";
import Navbar from "./components/Navbar.jsx";
import Spinner from "./components/spinner.jsx";
import Footer from "./components/Footer.jsx";
import FeaturePopup from "./components/FeaturePopup.jsx";

const PLACEHOLDER =
  "https://i.pinimg.com/1200x/9d/ce/b0/9dceb005c8765a20d55e2ff31184fa1f.jpg";

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [movieList, setMovieList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [expandedMovie, setExpandedMovie] = useState(null);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [topAnime, setTopAnime] = useState([]);
  const [pageLoading, setPageLoading] = useState(true);

  const resultsRef = useRef(null);

  const API_BASE_URL = "https://api.themoviedb.org/3";
  const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

  const API_OPTIONS = {
    method: "GET",
    headers: { accept: "application/json" },
  };

  const exitSearch = () => {
    setIsSearching(false);
    setSearchResults([]);
  };

  const fetch_movies = async () => {
    setIsLoading(true);
    setErrorMessage("");
    try {
      const res = await fetch(
        `${API_BASE_URL}/discover/movie?sort_by=popularity.desc&api_key=${API_KEY}`,
        API_OPTIONS
      );
      const data = await res.json();
      setMovieList(data.results || []);
    } catch {
      setErrorMessage("error fetching movies,please try again later");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchTrendingMovies = async () => {
    try {
      const res = await fetch(
        `${API_BASE_URL}/trending/movie/week?api_key=${API_KEY}`,
        API_OPTIONS
      );
      const data = await res.json();
      setTrendingMovies(data.results || []);
    } catch {
      setErrorMessage("error fetching trending movies");
    }
  };

  const fetchTopRatedAnime = async () => {
    try {
      const res = await fetch(
        `${API_BASE_URL}/discover/tv?with_genres=16&vote_count.gte=500&sort_by=vote_average.desc&api_key=${API_KEY}`,
        API_OPTIONS
      );
      const data = await res.json();
      setTopAnime(data.results || []);
    } catch {
      setErrorMessage("error fetching anime");
    }
  };

  const searchMovies = async () => {
    if (!searchTerm.trim()) return;

    setIsSearching(true);
    setIsLoading(true);
    setErrorMessage("");

    try {
      const res = await fetch(
        `${API_BASE_URL}/search/movie?query=${encodeURIComponent(
          searchTerm
        )}&api_key=${API_KEY}`,
        API_OPTIONS
      );
      const data = await res.json();

      const sorted = (data.results || []).sort((a, b) => {
        if (b.vote_count !== a.vote_count)
          return b.vote_count - a.vote_count;
        if (b.vote_average !== a.vote_average)
          return b.vote_average - a.vote_average;
        return b.popularity - a.popularity;
      });

      setSearchResults(sorted);
    } catch {
      setErrorMessage("Failed to search movies");
    } finally {
      setIsLoading(false);
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  };

  useEffect(() => {
    const loadAll = async() =>{
      await Promise.all([
        fetch_movies(),
        fetchTrendingMovies(),
        fetchTopRatedAnime(),
        new Promise((resolve) => setTimeout(resolve,2000)),
      ]);
      setPageLoading(false);
    };
    loadAll();
  }, []);

  return (
    <main className="w-screen">
        {pageLoading && (
        <div className="fixed inset-0 z-999 flex items-center justify-center bg-black/70 backdrop-blur-xl">
          <div className="text-center space-y-4 animate-pulse">
            <h1 className="text-3xl md:text-4xl font-semibold text-white tracking-wide">
              Building your experience
            </h1>
            <p className="text-sm text-white/60">
              Fetching the good stuff…
            </p>
          </div>
        </div>
      )}
      <section className="relative overflow-hidden">
        <Navbar
          exitSearch={exitSearch}
          onSignIn={() => setShowPopup(true)}
        />

        <div className="absolute inset-0 bg-[url('/mesmerizing-colorful-skies-illustration.jpg')] bg-cover bg-center" />
        <div className="absolute containerl inset-0 opacity-20 overflow-y-hidden" />
        <div className="absolute inset-0 bg-linear-to-b from-transparent via-black/40 to-black" />

        <div className="relative z-10 flex flex-col justify-center items-center h-full px-1 mt-30">
          <img
            src="/cinnflix.png"
            className="w-130 hover:scale-110 transition-transform duration-300"
          />

          <header className="text-center mb-3">
            <h1 className="text-6xl md:text-7xl font-bold text-white">
              find <span className="text-gradient">Movies</span> you'll enjoy
            </h1>
          </header>

          <SearchBar
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            onSearch={searchMovies}
          />
        </div>
      </section>

      {isSearching && (
        <section ref={resultsRef} className="relative z-10 p-6 bg-black">
          <h2 className="text-[20px] font-semibold text-gray-400 mb-4">
            Search Results for "{searchTerm}"
          </h2>

          {isLoading ? (
            <Spinner />
          ) : (
            <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 p-1">
              {searchResults.map((movie) => (
                <li
                  key={movie.id}
                  className="bg-white/5 rounded-xl overflow-hidden hover:scale-105 transition-transform duration-300"
                >
                  <img
                    src={
                      movie.poster_path
                        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                        : PLACEHOLDER
                    }
                    className="w-full h-75 object-cover"
                  />

                  <div className="p-3.5 space-y-2">
                    <p className="text-sm font-semibold text-white truncate">
                      {movie.title}
                    </p>

                    <p className="text-xs text-yellow-400">
                      ⭐ {movie.vote_average?.toFixed(1)} · {movie.vote_count}
                    </p>

                    <p className="text-xs text-white/70">
                      {expandedMovie === movie.id
                        ? movie.overview
                        : movie.overview?.slice(0, 90) + "..."}
                    </p>

                    {movie.overview?.length > 90 && (
                      <button
                        onClick={() =>
                          setExpandedMovie(
                            expandedMovie === movie.id ? null : movie.id
                          )
                        }
                        className="text-xs text-red-400 hover:underline"
                      >
                        {expandedMovie === movie.id
                          ? "Read less"
                          : "Read more"}
                      </button>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
      )}

      {!isSearching && (
        <>
          <section
            className="relative z-10 p-11 bg-[linear-gradient(to_bottom,#000000,rgba(6,10,30,0.6),rgba(6,10,30,0.85),rgba(39,3,56,0.6))]"
            id="trending"
          >
            <h2 className="text-2xl font-semibold text-white mb-4">
              Trending
            </h2>

            <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-2 scroll-smooth">
              {trendingMovies.map((movie) => (
                <div
                  key={movie.id}
                  className="min-w-40 bg-white/5 rounded-xl overflow-hidden hover:scale-105 transition-transform duration-300 shadow-lg shadow-black/50"
                >
                  <img
                    src={
                      movie.poster_path
                        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                        : PLACEHOLDER
                    }
                    className="w-full h-64 object-cover"
                  />
                </div>
              ))}
            </div>
          </section>

          {/* MOST RATED ANIME */}
          <section
            className="relative z-10 p-11 bg-[linear-gradient(to_bottom,rgba(39,3,56,0.6),rgba(39,3,56,0.6))]"
            id="top_anime"
          >
            <h2 className="text-2xl font-semibold text-white mb-4">
              Most Rated Anime
            </h2>

            <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-2 scroll-smooth">
              {topAnime.map((anime) => (
                <div
                  key={anime.id}
                  className="min-w-40 bg-white/5 rounded-xl overflow-hidden hover:scale-105 transition-transform duration-300 shadow-lg shadow-black/50"
                >
                  <img
                    src={
                      anime.poster_path
                        ? `https://image.tmdb.org/t/p/w500${anime.poster_path}`
                        : PLACEHOLDER
                    }
                    className="w-full h-64 object-cover"
                  />

                  <div className="p-2">
                    <p className="text-sm font-semibold text-white truncate">
                      {anime.name}
                    </p>
                    <p className="text-xs text-yellow-400">
                      ⭐ {anime.vote_average?.toFixed(1)} · {anime.vote_count}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section
            className="all_movies relative z-10 p-6 bg-[linear-gradient(to_bottom,rgba(39,3,56,0.6),rgba(39,3,56,0.6),rgba(163,7,40,0.7),black)]"
            id="all_movies"
          >
            <h1 className="p-6 text-4xl font-semibold text-white">
              All Movies
            </h1>

            <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 p-1">
              {movieList.map((movie) => (
                <li
                  key={movie.id}
                  className="bg-white/5 rounded-xl overflow-hidden m-2 shadow-lg shadow-black/60 hover:scale-105 transition-transform duration-300"
                >
                  <img
                    src={
                      movie.poster_path
                        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                        : PLACEHOLDER
                    }
                    className="w-full h-75 object-cover"
                  />

                  <div className="p-3.5 space-y-2">
                    <p className="text-sm font-semibold text-white truncate">
                      {movie.title}
                    </p>

                    <p className="text-xs text-yellow-400">
                      ⭐ {movie.vote_average?.toFixed(1)} / 10
                    </p>

                    <p className="text-xs text-white/70">
                      {expandedMovie === movie.id
                        ? movie.overview
                        : movie.overview?.slice(0, 90) + "..."}
                    </p>

                    {movie.overview?.length > 90 && (
                      <button
                        onClick={() =>
                          setExpandedMovie(
                            expandedMovie === movie.id ? null : movie.id
                          )
                        }
                        className="text-xs text-red-400 hover:underline"
                      >
                        {expandedMovie === movie.id
                          ? "Read less"
                          : "Read more"}
                      </button>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </section>
        </>
      )}

      <Footer exitSearch={exitSearch} />

      {showPopup && <FeaturePopup onClose={() => setShowPopup(false)} />}
    </main>
  );
};

export default App;
