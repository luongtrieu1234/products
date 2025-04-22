import { Product } from "../types/product";

function ProductCard({ product }: { product: Product }) {
  return (
    <div className="border p-4 rounded shadow">
      <img
        src={product.thumbnail}
        alt={product.title}
        className="w-full h-40 object-cover mb-2"
      />
      <h2 className="font-semibold">{product.title}</h2>
      <p>${product.price}</p>
    </div>
  );
}

export default ProductCard;
