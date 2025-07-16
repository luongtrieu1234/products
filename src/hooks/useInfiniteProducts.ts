import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchProducts } from "../apis/productApi";

export const useInfiniteProducts = () => {
  return useInfiniteQuery({
    queryKey: ["products"],
    queryFn: ({ pageParam = 0 }) => fetchProducts(pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage) =>
      lastPage.skip + lastPage.products.length < lastPage.total
        ? lastPage.skip + lastPage.products.length
        : undefined,
  });
};