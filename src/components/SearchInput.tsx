import { ChangeEvent, memo } from "react";
import { UI_CONSTANTS } from "../constants";

type SearchInputProps = {
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
};

function SearchInput({ 
  onChange, 
  placeholder = UI_CONSTANTS.SEARCH_PLACEHOLDER,
  className = "w-lg p-2 border border-gray-300"
}: SearchInputProps) {
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <input
      type="text"
      placeholder={placeholder}
      className={className}
      onChange={handleInputChange}
      aria-label="Search products"
    />
  );
}

export default memo(SearchInput);
