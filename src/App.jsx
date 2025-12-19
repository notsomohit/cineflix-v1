import React, {useEffect, useState } from "react";
import SearchBar from "./components/Search.jsx";
import Navbar from "./components/Navbar.jsx";
import spinner from "./components/spinner.jsx";
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
    <main className="relative w-screen overflow-hidden">
      <Navbar/>

      <div className="absolute inset-0 bg-[url('/mesmerizing-colorful-skies-illustration.jpg')] bg-cover bg-center"/>

      <div className=" absolute containerl inset-0 opacity-20 "/>
      <div className="absolute inset-0 bg-linear-to-b from-transparent via-black/40 to-black" />
      
      <div className="relative z-10 flex flex-col justify-center items-center h-full px-5 mt-30">
        <img src="/cinnflix.png" className="w-130 hover:scale-110 transition-transform duration-300"/>
        <header className="text-center mb-6">
          <h1 className="text-6xl md:text-7xl font-bold text-white">
            find <span className="text-gradient">Movies</span> you'll enjoy
          </h1>
        </header>

        <SearchBar 
          className="m-4" 
          searchTerm={searchTerm} setSearchTerm={setSearchTerm}
        />
      </div>
      <section className="all_movies z-11 relative">
          {
            isLoading ?(<p className="text-white"><spinner/></p>) : errorMessage ? (<p className="text-red-500">{errorMessage}</p>)
            : (
              <ul>
                {movieList.map((movie) => (
                 <p key ="movie.id" className="text-white">{movie.title}</p> 
                ))}
              </ul>
            )
          }
        </section>
    </main>
  );
};

export default App;
