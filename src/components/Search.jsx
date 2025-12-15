import React from "react";
import { Search } from "lucide-react";

const SearchBar = ({searchTerm,setSearchTerm}) => {
  return (
    <div className="w-full flex justify-center mt-6 px-4">
      <div className="flex w-full max-w-2xl md:max-w-3xl lg:max-w-4xl backdrop-blur-md bg-white/5 border border-white/10 rounded-xl overflow-hidden shadow-lg ">
        <input type="text" placeholder="Search what you love..."className="flex-1 bg-transparent px-5 py-3 text-white placeholder-white/50 outline-none text-sm md:text-base"
        value={searchTerm} 
        onChange={(e)=>setSearchTerm(e.target.value)}/>

        <div className=" h-full flex items-center pr-2">
          
          <Search />
        </div>         
      </div>
    </div>
  );
};

export default SearchBar;
