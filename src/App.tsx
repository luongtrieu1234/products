import { useState, useCallback } from "react";
import { SearchInput, ProductList } from "./components";
import { useDebounce } from "./hooks";
import { API_CONSTANTS } from "./constants";

function App() {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, API_CONSTANTS.DEBOUNCE_DELAY);

  const handleSearchChange = useCallback((value: string) => {
    setSearch(value);
  }, []);

  return (
    <div className="p-4 max-w-6xl mx-auto flex flex-col items-center justify-center min-h-screen">
      <div className="w-full text-left">
        <SearchInput onChange={handleSearchChange} />
      </div>
      <div className="w-full flex-grow">
        <ProductList search={debouncedSearch} />
      </div>
    </div>
  );
}

export default App;
