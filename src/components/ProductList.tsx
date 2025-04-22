import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { fetchProducts, searchProducts } from "../apis/productApi";
import ProductCard from "./ProductCard";

type ProductListProps = {
  search: string;
};

function ProductList({ search }: ProductListProps) {
  const {
    data: infiniteData,
    fetchNextPage,
    hasNextPage,
    isLoading: isLoadingProducts,
  } = useInfiniteQuery({
    queryKey: ["products"],
    queryFn: ({ pageParam = 0 }) => fetchProducts(pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage) =>
      lastPage.skip + lastPage.products.length < lastPage.total
        ? lastPage.skip + lastPage.products.length
        : undefined,
  });

  const { data: searchData, isLoading: isLoadingSearch } = useQuery({
    queryKey: ["search", search],
    queryFn: () => searchProducts(search),
    enabled: !!search,
  });

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage && !search) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage, search]);

  const products = search
    ? searchData?.products ?? []
    : infiniteData?.pages.flatMap((page) => page.products) ?? [];

  const isLoading = search ? isLoadingSearch : isLoadingProducts;

  const renderContent = () => {
    if (isLoading) {
      return <div className="col-span-full text-center">Loading...</div>;
    }

    if (products.length === 0) {
      return (
        <div className="col-span-full text-center">No products found!</div>
      );
    }

    return products.map((product) => (
      <ProductCard key={product.id} product={product} />
    ));
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
      {renderContent()}
      {!search && !isLoading && products.length > 0 && (
        <div ref={ref} className="h-10 col-span-full" />
      )}
    </div>
  );
}

export default ProductList;
