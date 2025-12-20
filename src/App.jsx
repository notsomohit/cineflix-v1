import React, {useEffect, useState } from "react";
import SearchBar from "./components/Search.jsx";
import Navbar from "./components/Navbar.jsx";
import Spinner from "./components/spinner.jsx";
import Footer from "./components/Footer.jsx";


const App = () =>{

    const [searchTerm,setSearchTerm] = useState("");
    const [errorMessage,setErrorMessage] = useState("");
    const [movieList,setMovieList] = useState([]);
    const [isLoading,setIsLoading] = useState(false);
    const [expandedMovie, setExpandedMovie] = useState(null);
    const [trendingMovies, setTrendingMovies] = useState([]);
    const [searchResults, setSearchResults] = useState([]);
    const [isSearching, setIsSearching] = useState(false);



    const API_BASE_URL = "https://api.themoviedb.org/3";
    const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

    const API_OPTIONS = {
    method: 'GET',
    headers: {
        accept: 'application/json',
    }
    }

    const fetch_movies = async() => {

        setIsLoading(true);
        setErrorMessage("");
        try {
            const endpoint = `${API_BASE_URL}/discover/movie?sort_by=popularity.desc&api_key=${API_KEY}`;
            const response =  await fetch(endpoint,API_OPTIONS);

            if(!response.ok){
                throw new Error('Failed to fetch movies');
            }

            const data =  await response.json();
            setMovieList(data.results || []);
        } catch (error) {
            console.log(`error fetching movies :${error}`)
            setErrorMessage("error fetching movies,please try again later");
        } finally{
            setIsLoading(false);
        }
    }

    const fetchTrendingMovies = async() => {
        setIsLoading(true);
        setErrorMessage("");
        try {
            const endpoint = `${API_BASE_URL}/trending/movie/week?api_key=${API_KEY}`;
            const response = await fetch(endpoint,API_OPTIONS);
            
            if(!response.ok){
                throw new Error('failed to fetch trending movies');
            }

            const data = await response.json();
            setTrendingMovies(data.results || []);
        } catch (error) {
            setErrorMessage("error fetching trending movies")
        }
    }

    const searchMovies = async () => {
        if (!searchTerm.trim()) return;
        setIsSearching(true);
        setIsLoading(true);
        setErrorMessage("");

        try {
        const endpoint = `${API_BASE_URL}/search/movie?query=${encodeURIComponent(
            searchTerm
        )}&api_key=${API_KEY}`;

        const response = await fetch(endpoint, API_OPTIONS);
        if (!response.ok) throw new Error("Search failed");

        const data = await response.json();

        setSearchResults(data.results || []);

        } catch (error) {
            console.error(error);
            setErrorMessage("Failed to search movies");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(()=>{
        fetch_movies();
        fetchTrendingMovies();
    },[]);

    return(
        <main className="w-screen">

            <section className="relative overflow-hidden">
                <Navbar/>
                <div className="absolute inset-0 bg-[url('/mesmerizing-colorful-skies-illustration.jpg')] bg-cover bg-center"/>

                <div className=" absolute containerl inset-0 opacity-20 overflow-y-hidden "/>
                <div className="absolute inset-0 bg-linear-to-b from-transparent via-black/40 to-black" />
                
                <div className="relative z-10 flex flex-col justify-center items-center h-full px-1 mt-30">
                    
                    <img src="/cinnflix.png" className="w-130 hover:scale-110 transition-transform duration-300"/>
                    <header className="text-center mb-3">
                        <h1 className="text-6xl md:text-7xl font-bold text-white">
                            find <span className="text-gradient">Movies</span> you'll enjoy
                        </h1>
                    </header>

                    <SearchBar className="mt-4" searchTerm={searchTerm} setSearchTerm={setSearchTerm} onSearch={searchMovies}/>
                </div>

            </section>

            {searchResults.length > 0 && isSearching && (
            <section className="relative z-10 p-6 bg-black">
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
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        className="w-full h-72 object-cover"
                        />

                        <div className="p-2">
                        <p className="text-sm font-semibold text-white truncate">
                            {movie.title}
                        </p>
                        <p className="text-xs text-yellow-400">
                            ⭐ {movie.vote_average?.toFixed(1)}
                        </p>
                        </div>
                    </li>
                    ))}
                </ul>
                )}
            </section>
            )}


            <section  className="relative z-10 p-11 bg-[linear-gradient(to_bottom,#000000,rgba(6,10,30,0.6),rgba(6,10,30,0.85),rgba(39,3,56,0.6))]" id="trending">
                  <h2 className="text-2xl font-semibold text-white mb-4">
                        Trending 
                  </h2>

                    <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-2 scroll-smooth">
                        {
                            trendingMovies.map((movie) => (

                                <div key ={movie.id} className=" scroll-smooth min-w-40 sm:min-w-45 md:min-w-50 bg-white/5 rounded-xl overflow-hidden hover:scale-105 transition-transform duration-300 shadow-lg shadow-black/50"  
                                onWheel={(e) => {
                                    e.currentTarget.scrollLeft += e.deltaY*0.8;
                                }}>
                                   
                                    {movie.poster_path ? (
                                    <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} className="w-full h-64 object-cover"/>
                                    ) : (
                                    <div className="w-full h-64 bg-gray-800 flex items-center justify-center text-white/60">
                                        No Image
                                    </div>
                                    )}

                                    <div className="p-2">
                                        <p className="text-sm font-semibold text-white truncate">
                                            {movie.title}
                                        </p>

                                        <p className="text-xs text-yellow-400">
                                            ⭐ {movie.vote_average?.toFixed(1)}
                                        </p>
                                    </div>
                                </div> 
                            ))
                        }
                    </div>

            </section>

            <section className="all_movies relative z-10 p-6 bg-[linear-gradient(to_bottom,rgba(39,3,56,0.6),rgba(39,3,56,0.6),rgba(163,7,40,0.7),black)]" id="all_movies">
                <h1 className=" p-6 text-4xl font-semibold text-white">
                    All Movies
                </h1>

                { isLoading ? (<Spinner/>) : errorMessage?(<p className="text-red-500">{errorMessage}</p>) : (
                    <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 p-1">
                        {
                            movieList.map((movie) => (
                                <li key={movie.id} className="bg-white/5 rounded-xl overflow-hidden m-2 shadow-lg shadow-black/60 hover:scale-105 transition-transform duration-300">
                                        {
                                            movie.poster_path ? (
                                                <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} className="w-full h-75 object-cover"/>
                                            ) : (
                                                <div className="w-full h-75 bg-gray-800 flex items-center justify-center text-white/60">
                                                    No Image
                                                </div>
                                            )
                                        }

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

                                            {movie.overview && movie.overview.length > 90 && (
                                                <button
                                                onClick={() =>
                                                    setExpandedMovie(
                                                    expandedMovie === movie.id ? null : movie.id
                                                    )
                                                }
                                                className="text-xs text-red-400 hover:underline"
                                                >
                                                {expandedMovie === movie.id ? "Read less" : "Read more"}
                                                </button>
                                            )}

                                        </div>

                                </li>
                            ))
                        }
                    </ul>
                )}

            
            </section>

            <Footer/>
        </main>
    )

}

export default App;
