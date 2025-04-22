import { useState } from "react";
import SearchInput from "./components/SearchInput";
import ProductList from "./components/ProductList";
import useDebounce from "./hooks/useDebounce";

function App() {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 600);

  const handleSearchChange = (value: string) => {
    setSearch(value);
  };

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
