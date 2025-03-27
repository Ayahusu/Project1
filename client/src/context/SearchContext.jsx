import { createContext, useContext, useState } from "react";

// Create the SearchContext
const SearchContext = createContext();

// Provider component to wrap around the app
export const SearchProvider = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <SearchContext.Provider value={{ searchQuery, setSearchQuery }}>
      {children}
    </SearchContext.Provider>
  );
};

// Custom hook for easier access to search state
export const useSearch = () => useContext(SearchContext);
