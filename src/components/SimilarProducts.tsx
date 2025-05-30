import React from 'react';
import { Product } from '../types';
import ProductCard from './ProductCard';

interface SimilarProductsProps {
  currentProduct: Product;
  products: Product[];
}

const SimilarProducts: React.FC<SimilarProductsProps> = ({ currentProduct, products }) => {
  const similarProducts = products
    .filter(
      (product) =>
        product.id !== currentProduct.id &&
        (product.category === currentProduct.category ||
          product.subCategory === currentProduct.subCategory)
    )
    .slice(0, 4);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {similarProducts.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default SimilarProducts;