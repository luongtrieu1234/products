import { useMemo } from "react";
import { useInfiniteProducts, useSearchProducts, useInfiniteScroll } from "../hooks";
import { ProductCard, ProductSkeleton } from "./";
import { UI_CONSTANTS } from "../constants";

type ProductListProps = {
  search: string;
};

function ProductList({ search }: ProductListProps) {
  const {
    data: infiniteData,
    fetchNextPage,
    hasNextPage,
    isLoading: isLoadingProducts,
    error: infiniteError,
  } = useInfiniteProducts();

  const { 
    data: searchData, 
    isLoading: isLoadingSearch,
    error: searchError,
  } = useSearchProducts(search);

  const isSearchMode = !!search;
  const isLoading = isSearchMode ? isLoadingSearch : isLoadingProducts;
  const error = isSearchMode ? searchError : infiniteError;

  const { ref } = useInfiniteScroll({
    hasNextPage: hasNextPage ?? false,
    isLoading,
    isSearchMode,
    fetchNextPage,
  });

  const products = useMemo(() => {
    return isSearchMode
      ? searchData?.products ?? []
      : infiniteData?.pages.flatMap((page) => page.products) ?? [];
  }, [isSearchMode, searchData, infiniteData]);

  const renderContent = () => {
    if (error) {
      return (
        <div className="col-span-full text-center text-red-600">
          <p>Error loading products. Please try again.</p>
        </div>
      );
    }

    if (isLoading && products.length === 0) {
      return <ProductSkeleton count={8} />;
    }

    if (products.length === 0 && !isLoading) {
      return (
        <div className="col-span-full text-center text-gray-600">
          {UI_CONSTANTS.NO_PRODUCTS_TEXT}
        </div>
      );
    }

    return products.map((product) => (
      <ProductCard key={product.id} product={product} />
    ));
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
      {renderContent()}
      {!isSearchMode && !isLoading && products.length > 0 && (
        <div ref={ref} className="h-10 col-span-full" />
      )}
      {!isSearchMode && isLoading && products.length > 0 && (
        <ProductSkeleton count={4} />
      )}
    </div>
  );
}

export default ProductList;
