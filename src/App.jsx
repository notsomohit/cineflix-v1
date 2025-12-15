import React from "react";
import SearchBar from "./components/Search";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <main className="relative h-screen w-screen overflow-hidden">
      <Navbar/>

      <div className="absolute inset-0 bg-[url('/mesmerizing-colorful-skies-illustration.jpg')] bg-cover bg-center"/>

      <div className=" absolute containerl inset-0 opacity-20 "/>
      <div className="absolute inset-0 bg-linear-to-b from-transparent via-black/40 to-black" />
      
      <div className="relative z-10 flex flex-col justify-center items-center h-full px-5">
        <img src="../public/cinnflix.png" className="w-130 hover:scale-110 transition-transform duration-300"/>
        <header className="text-center mb-6">
          <h1 className="text-6xl md:text-7xl font-bold text-white">
            find <span className="text-gradient">Movies</span> you'll enjoy
          </h1>
        </header>

        <SearchBar className="m-4"/>
      </div>
    </main>
  );
};

export default App;
