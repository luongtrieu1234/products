import { ChangeEvent } from "react";

type SearchInputProps = {
  onChange: (value: string) => void;
};

function SearchInput({ onChange }: SearchInputProps) {
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <input
      type="text"
      placeholder="Search products..."
      className="w-lg p-2 border border-gray-300"
      onChange={handleInputChange}
    />
  );
}

export default SearchInput;
