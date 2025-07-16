import { memo } from "react";

type ProductSkeletonProps = {
  count?: number;
};

function ProductSkeleton({ count = 8 }: ProductSkeletonProps) {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="border p-4 rounded shadow animate-pulse"
          role="status"
          aria-label="Loading product"
        >
          <div className="w-full h-40 bg-gray-300 mb-2 rounded"></div>
          <div className="h-4 bg-gray-300 rounded mb-2"></div>
          <div className="h-4 bg-gray-300 rounded w-1/2"></div>
        </div>
      ))}
    </>
  );
}

export default memo(ProductSkeleton);