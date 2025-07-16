import { useQuery } from "@tanstack/react-query";
import { searchProducts } from "../apis/productApi";

export const useSearchProducts = (search: string) => {
  return useQuery({
    queryKey: ["search", search],
    queryFn: () => searchProducts(search),
    enabled: !!search,
  });
};