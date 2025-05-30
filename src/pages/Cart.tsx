import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Trash2, Plus, Minus } from 'lucide-react';
import { useCartStore } from '../stores/cartStore';
import { useAuthStore } from '../stores/authStore';
import { products } from '../data/products';
import { formatPrice } from '../utils/format';
import toast from 'react-hot-toast';

const Cart: React.FC = () => {
  const navigate = useNavigate();
  const { items, removeItem, updateQuantity, total } = useCartStore();
  const { user } = useAuthStore();

  const cartItems = items.map(item => ({
    ...item,
    product: products.find(p => p.id === item.productId)!
  }));

  const handleCheckout = () => {
    if (!user) {
      toast.error('Veuillez vous connecter pour continuer');
      navigate('/auth/signin');
      return;
    }
    navigate('/checkout');
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-slate-50 pt-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-16">
            <ShoppingCart className="w-16 h-16 text-slate-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-slate-900 mb-2">
              Votre panier est vide
            </h2>
            <p className="text-slate-600 mb-8">
              Découvrez nos produits et commencez vos achats
            </p>
            <Link
              to="/products"
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-electric-blue hover:bg-blue-600"
            >
              Voir les produits
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pt-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-8">Votre panier</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm">
              {cartItems.map(({ product, quantity }) => (
                <div
                  key={product.id}
                  className="flex items-center gap-6 p-6 border-b border-slate-200 last:border-0"
                >
                  <div className="w-24 h-24 flex-shrink-0">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-full object-cover rounded-md"
                    />
                  </div>

                  <div className="flex-1">
                    <Link
                      to={`/product/${product.id}`}
                      className="text-lg font-medium text-slate-900 hover:text-electric-blue"
                    >
                      {product.name}
                    </Link>
                    <p className="text-sm text-slate-500 mb-2">
                      {product.category}
                    </p>
                    <p className="font-medium text-electric-blue">
                      {formatPrice(product.price)}
                    </p>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="flex items-center border border-slate-300 rounded-md">
                      <button
                        onClick={() => updateQuantity(product.id, Math.max(1, quantity - 1))}
                        className="p-2 text-slate-600 hover:text-electric-blue"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-12 text-center py-2">{quantity}</span>
                      <button
                        onClick={() => updateQuantity(product.id, Math.min(product.stock, quantity + 1))}
                        className="p-2 text-slate-600 hover:text-electric-blue"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                    <button
                      onClick={() => removeItem(product.id)}
                      className="p-2 text-slate-400 hover:text-red-500"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-slate-900 mb-4">
                Résumé de la commande
              </h2>

              <div className="space-y-4">
                <div className="flex justify-between text-sm text-slate-600">
                  <span>Sous-total</span>
                  <span>{formatPrice(total)}</span>
                </div>
                <div className="flex justify-between text-sm text-slate-600">
                  <span>Livraison</span>
                  <span>Gratuite</span>
                </div>
                <div className="pt-4 border-t border-slate-200">
                  <div className="flex justify-between text-lg font-semibold text-slate-900">
                    <span>Total</span>
                    <span>{formatPrice(total)}</span>
                  </div>
                  <p className="text-sm text-slate-500 mt-1">
                    Taxes incluses
                  </p>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                className="w-full mt-6 bg-electric-blue text-white py-3 px-4 rounded-md hover:bg-blue-600 transition-colors flex items-center justify-center gap-2"
              >
                Passer la commande
              </button>

              <Link
                to="/products"
                className="block text-center mt-4 text-sm text-electric-blue hover:text-blue-600"
              >
                Continuer les achats
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;