import React from "react";
import { Search } from "lucide-react";

const SearchBar = ({ searchTerm, setSearchTerm, onSearch }) => {
  return (
    <div className="flex items-center w-full max-w-4xl gap-3 bg-white/10 backdrop-blur-md px-4 py-3 m-2 rounded-xl">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search movies..."
        className="bg-transparent outline-none text-white w-full text-sm sm:text-base"
      />

      <button
        onClick={onSearch}
        className="text-white/70 hover:text-white shrink-0"
      >
        <Search />
      </button>
    </div>
  );
};

export default SearchBar;
