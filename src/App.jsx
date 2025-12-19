import React, {useEffect, useState } from "react";
import SearchBar from "./components/Search.jsx";
import Navbar from "./components/Navbar.jsx";
import Spinner from "./components/spinner.jsx";
const App = () => {

  const [searchTerm,setSearchTerm] = useState("");
  const [errorMessage,setErrorMessage] = useState("");
  const [movieList,setMovieList] = useState([]);
  const [isLoading,setIsLoading] = useState(false);

  const API_BASE_URL = "https://api.themoviedb.org/3";
  const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

  const API_OPTIONS = {
    method: 'GET',
    headers: {
      accept: 'application/json',
    }
  }

  const fetch_movies =async () =>{

    setIsLoading(true);
    setErrorMessage("");
    try {
      const endpoint = `${API_BASE_URL}/discover/movie?sort_by=popularity.desc&api_key=${API_KEY}`;
      const response = await fetch(endpoint,API_OPTIONS);
      if(!response.ok){
        throw new Error("failed to fetch movies");
      }
      const data = await response.json();
      
      if(data.response === 'false'){
        setErrorMessage(data.Error || 'failed to fetch movies');
        setMovieList([]);
        return;
      }
      setMovieList(data.results || []);
    } catch (error) {
      console.log(`error fetching movies :${error}`)
      setErrorMessage("error fetching movies,please try again later");
    } finally{
      setIsLoading(false);
    }
  }
  useEffect(()=>{

    fetch_movies();
  
  },[]);

  return (
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

          <SearchBar 
            className="mt-4" 
            searchTerm={searchTerm} setSearchTerm={setSearchTerm}
          />
        </div>
    </section>

    <section className="all_movies relative z-10 p-6 bg-[linear-gradient(to_bottom,black,rgba(39,3,56,0.6),rgba(163,7,40,0.7),black)]">
      <h1 className=" p-6 text-4xl font-semibold text-white">
        All Movies
      </h1>

      {isLoading ? (
        <Spinner />
      ) : errorMessage ? (
        <p className="text-red-500">{errorMessage}</p>
      ) : (
        <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 p-1">
          
          {movieList.map((movie) => (
        
          <li key={movie.id} className="bg-white/5 rounded-xl overflow-hidden m-2 shadow-lg shadow-black/60 hover:scale-105 transition-transform duration-300">
            
            {movie.poster_path ? (
              <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} className="w-full h-75 object-cover"/>
            ) : (
              <div className="w-full h-75 bg-gray-800 flex items-center justify-center text-white/60">
                No Image
              </div>
            )}

            <div className="p-3.5">
              <p className="text-sm font-medium text-white truncate">
                {movie.title}
              </p>
            </div>
        </li>
      ))}
    </ul>
  )}
</section>

    </main>
  );
};

export default App;
