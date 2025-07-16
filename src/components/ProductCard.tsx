import { memo } from "react";
import { Product } from "../types/product";

type ProductCardProps = {
  product: Product;
};

function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="border p-4 rounded shadow hover:shadow-lg transition-shadow duration-200">
      <img
        src={product.thumbnail}
        alt={product.title}
        className="w-full h-40 object-cover mb-2 rounded"
        loading="lazy"
      />
      <h2 className="font-semibold text-sm md:text-base mb-1 overflow-hidden" 
          style={{ 
            display: '-webkit-box', 
            WebkitLineClamp: 2, 
            WebkitBoxOrient: 'vertical' 
          }}>
        {product.title}
      </h2>
      <p className="text-green-600 font-bold text-lg">${product.price}</p>
    </div>
  );
}

export default memo(ProductCard);
