import React, { useState, useMemo } from 'react';
import { Search, SlidersHorizontal, X, ChevronDown } from 'lucide-react';
import { products, categories } from '../data/products';
import ProductCard from '../components/ProductCard';
import { ProductFilters } from '../types';
import { formatPrice } from '../utils/format';

const Products: React.FC = () => {
  const [filters, setFilters] = useState<ProductFilters>({
    category: '',
    subCategory: '',
    minPrice: undefined,
    maxPrice: undefined,
    inStock: false,
    search: '',
  });

  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('popular');

  const filteredProducts = useMemo(() => {
    let filtered = products.filter(product => {
      if (filters.search && !product.name.toLowerCase().includes(filters.search.toLowerCase())) {
        return false;
      }
      if (filters.category && product.category !== filters.category) {
        return false;
      }
      if (filters.subCategory && product.subCategory !== filters.subCategory) {
        return false;
      }
      if (filters.minPrice && product.price < filters.minPrice) {
        return false;
      }
      if (filters.maxPrice && product.price > filters.maxPrice) {
        return false;
      }
      if (filters.inStock && product.stock <= 0) {
        return false;
      }
      return true;
    });

    // Tri des produits
    switch (sortBy) {
      case 'price-asc':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        filtered.sort((a, b) => new Date(b.createdAt || '').getTime() - new Date(a.createdAt || '').getTime());
        break;
      default: // 'popular'
        // Par défaut, on garde l'ordre existant qui est supposé être par popularité
        break;
    }

    return filtered;
  }, [filters, sortBy, products]);

  const handleFilterChange = (key: keyof ProductFilters, value: string | number | boolean) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const resetFilters = () => {
    setFilters({
      category: '',
      subCategory: '',
      minPrice: undefined,
      maxPrice: undefined,
      inStock: false,
      search: '',
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Banner */}
      <div className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Produits reconditionnés
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl">
            Des produits de qualité, testés et garantis, à prix réduits. 
            Bon pour votre portefeuille et pour la planète.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Barre de recherche et filtres */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Rechercher un produit..."
                value={filters.search}
                onChange={(e) => handleFilterChange('search', e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>

            <div className="flex gap-4">
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none bg-white border border-gray-200 rounded-lg px-4 py-3 pr-8 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="popular">Les plus populaires</option>
                  <option value="price-asc">Prix croissant</option>
                  <option value="price-desc">Prix décroissant</option>
                  <option value="newest">Nouveautés</option>
                </select>
                <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>

              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 py-3 border border-gray-200 rounded-lg hover:bg-gray-50"
              >
                <SlidersHorizontal className="w-5 h-5" />
                <span className="hidden md:inline">Filtres</span>
              </button>
            </div>
          </div>

          {/* Filtres étendus */}
          {showFilters && (
            <div className="mt-4 pt-4 border-t border-gray-200 grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Catégorie
                </label>
                <select
                  value={filters.category}
                  onChange={(e) => handleFilterChange('category', e.target.value)}
                  className="w-full rounded-lg border border-gray-200 p-2"
                >
                  <option value="">Toutes les catégories</option>
                  {categories.map(category => (
                    <option key={category.id} value={category.name}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              {filters.category && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Sous-catégorie
                  </label>
                  <select
                    value={filters.subCategory}
                    onChange={(e) => handleFilterChange('subCategory', e.target.value)}
                    className="w-full rounded-lg border border-gray-200 p-2"
                  >
                    <option value="">Toutes les sous-catégories</option>
                    {categories
                      .find(cat => cat.name === filters.category)
                      ?.subCategories?.map(subCat => (
                        <option key={subCat.id} value={subCat.name}>
                          {subCat.name}
                        </option>
                      ))}
                  </select>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Prix
                </label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    placeholder="Min"
                    value={filters.minPrice || ''}
                    onChange={(e) => handleFilterChange('minPrice', Number(e.target.value))}
                    className="w-1/2 rounded-lg border border-gray-200 p-2"
                  />
                  <input
                    type="number"
                    placeholder="Max"
                    value={filters.maxPrice || ''}
                    onChange={(e) => handleFilterChange('maxPrice', Number(e.target.value))}
                    className="w-1/2 rounded-lg border border-gray-200 p-2"
                  />
                </div>
              </div>

              <div className="flex items-center">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.inStock}
                    onChange={(e) => handleFilterChange('inStock', e.target.checked)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">En stock uniquement</span>
                </label>
              </div>
            </div>
          )}
        </div>

        {/* Résultats */}
        <div className="mb-6 flex justify-between items-center">
          <p className="text-gray-600">
            {filteredProducts.length} produit{filteredProducts.length > 1 ? 's' : ''} trouvé{filteredProducts.length > 1 ? 's' : ''}
          </p>
          {Object.values(filters).some(value => value !== '' && value !== undefined && value !== false) && (
            <button
              onClick={resetFilters}
              className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1"
            >
              <X className="w-4 h-4" />
              Réinitialiser les filtres
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12 bg-white rounded-lg shadow-sm">
            <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Aucun produit trouvé
            </h3>
            <p className="text-gray-600">
              Essayez de modifier vos filtres ou d'effectuer une nouvelle recherche
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;