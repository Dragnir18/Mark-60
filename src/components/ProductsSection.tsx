import React, { useState } from 'react';
import { products } from '../data/products';
import ProductCard from './ProductCard';

const ProductsSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const categories = ['All', ...new Set(products.map(product => product.category))];

  const filteredProducts = activeCategory === 'All'
    ? products
    : products.filter(product => product.category === activeCategory);

  return (
    <section className="py-16 bg-slate-50 dark:bg-slate-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
            Featured Products
          </h2>
          <p className="max-w-2xl mx-auto text-slate-600 dark:text-slate-300">
            Discover our cutting-edge hardware and cybersecurity solutions designed to elevate your technology infrastructure.
          </p>
        </div>

        <div className="flex justify-center mb-8 overflow-x-auto scrollbar-hide">
          <div className="flex space-x-2">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${
                  activeCategory === category
                    ? 'bg-electric-blue text-white'
                    : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="px-6 py-3 bg-transparent border-2 border-electric-blue text-electric-blue font-semibold rounded-md hover:bg-electric-blue hover:text-white transition-all duration-300">
            View All Products
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;