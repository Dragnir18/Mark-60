import React from 'react';
import { ShoppingCart, Heart, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Product } from '../types';
import { formatPrice } from '../utils/format';
import { useCartStore } from '../stores/cartStore';
import toast from 'react-hot-toast';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      id: crypto.randomUUID(),
      productId: product.id,
      quantity: 1,
      price: product.price
    });
    toast.success('Produit ajouté au panier');
  };

  const getConditionBadge = () => {
    const condition = Math.random() > 0.5 ? 'Excellent' : 'Très bon';
    const color = condition === 'Excellent' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800';
    return (
      <span className={`${color} text-xs font-semibold px-2.5 py-0.5 rounded-full`}>
        {condition}
      </span>
    );
  };

  return (
    <Link to={`/product/${product.id}`} className="group">
      <div className="bg-white rounded-xl shadow-sm overflow-hidden transition-all duration-300 hover:shadow-lg">
        <div className="relative aspect-square">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-opacity" />
          
          {/* Badge de condition */}
          <div className="absolute top-3 left-3">
            {getConditionBadge()}
          </div>

          {/* Boutons d'action */}
          <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                toast.success('Produit ajouté aux favoris');
              }}
              className="p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors"
            >
              <Heart className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          {/* Prix économisé */}
          <div className="absolute bottom-3 left-3">
            <div className="bg-red-600 text-white text-sm font-semibold px-2 py-1 rounded">
              -30%
            </div>
          </div>
        </div>

        <div className="p-4">
          <div className="mb-2">
            <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
              {product.name}
            </h3>
          </div>

          <div className="flex items-center gap-2 mb-3">
            <div className="flex items-center">
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              <span className="ml-1 text-sm text-gray-600">4.5</span>
            </div>
            <span className="text-sm text-gray-500">(120 avis)</span>
          </div>

          <div className="flex items-end justify-between">
            <div>
              <div className="text-2xl font-bold text-gray-900">
                {formatPrice(product.price)}
              </div>
              <div className="text-sm text-gray-500 line-through">
                {formatPrice(product.price * 1.3)}
              </div>
            </div>

            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className="flex items-center justify-center p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-300"
            >
              <ShoppingCart className="w-5 h-5" />
            </button>
          </div>

          {product.stock === 0 && (
            <p className="mt-2 text-sm text-red-600">
              Rupture de stock
            </p>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;