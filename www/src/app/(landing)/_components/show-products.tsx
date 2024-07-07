import { ProductCard } from "@/components/layouts/product-card";
import { getAllProducts } from "@/lib/queries/product-queries";

const ShowProduct = async () => {
  const products = await getAllProducts();
  return (
    <div className="w-full flex justify-between items-center gap-6">
      {products.map((product, index: number) => (
        <ProductCard
          key={index}
          title={product.title}
          price={product.price}
          image={product.coverImg}
        />
      ))}
    </div>
  );
};

export default ShowProduct;
