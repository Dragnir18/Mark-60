import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Star, ShoppingCart, Heart, Share2, ChevronRight, ChevronLeft, Shield, Truck, Package } from 'lucide-react';
import { products } from '../data/products';
import { formatPrice } from '../utils/format';
import { useCartStore } from '../stores/cartStore';
import { supabase } from '../lib/supabase';
import { Review } from '../types';
import ReviewForm from '../components/ReviewForm';
import ReviewList from '../components/ReviewList';
import SimilarProducts from '../components/SimilarProducts';
import toast from 'react-hot-toast';

const ProductDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const addItem = useCartStore((state) => state.addItem);

  const product = products.find((p) => p.id === slug);

  useEffect(() => {
    const fetchReviews = async () => {
      if (!product) return;

      try {
        const { data, error } = await supabase
          .from('reviews')
          .select(`
            *,
            user:profiles(
              id,
              firstName,
              lastName
            )
          `)
          .eq('product_id', product.id)
          .order('created_at', { ascending: false });

        if (error) throw error;
        setReviews(data || []);
      } catch (error) {
        console.error('Error fetching reviews:', error);
        toast.error('Erreur lors du chargement des avis');
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [product]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-slate-600">Produit non trouvé</p>
      </div>
    );
  }

  const handleAddToCart = () => {
    addItem({
      id: crypto.randomUUID(),
      productId: product.id,
      quantity,
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
    <div className="min-h-screen bg-gray-50 pt-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Fil d'Ariane */}
        <nav className="flex items-center space-x-2 text-sm mb-8">
          <a href="/" className="text-gray-500 hover:text-electric-blue">Accueil</a>
          <ChevronRight className="w-4 h-4 text-gray-400" />
          <a href="/products" className="text-gray-500 hover:text-electric-blue">Produits</a>
          <ChevronRight className="w-4 h-4 text-gray-400" />
          <span className="text-gray-900">{product.name}</span>
        </nav>

        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
            {/* Galerie d'images */}
            <div className="space-y-4">
              <div className="relative aspect-square rounded-lg overflow-hidden bg-gray-100">
                <img
                  src={product.images[currentImageIndex]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                {getConditionBadge()}
                {product.images.length > 1 && (
                  <>
                    <button
                      onClick={() => setCurrentImageIndex((prev) => (prev === 0 ? product.images.length - 1 : prev - 1))}
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-2 hover:bg-white transition-colors"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => setCurrentImageIndex((prev) => (prev === product.images.length - 1 ? 0 : prev + 1))}
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-2 hover:bg-white transition-colors"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </>
                )}
              </div>
              {product.images.length > 1 && (
                <div className="grid grid-cols-4 gap-4">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`aspect-square rounded-lg overflow-hidden ${
                        currentImageIndex === index ? 'ring-2 ring-electric-blue' : ''
                      }`}
                    >
                      <img
                        src={image}
                        alt={`${product.name} - Vue ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Informations produit */}
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {product.name}
                </h1>
                <div className="flex items-center gap-4">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, index) => (
                      <Star
                        key={index}
                        className={`w-5 h-5 ${
                          index < 4 ? 'text-yellow-400 fill-current' : 'text-gray-300'
                        }`}
                      />
                    ))}
                    <span className="ml-2 text-sm text-gray-600">4.0 (120 avis)</span>
                  </div>
                  {getConditionBadge()}
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-gray-900">
                    {formatPrice(product.price)}
                  </span>
                  <span className="text-lg text-gray-500 line-through">
                    {formatPrice(product.price * 1.3)}
                  </span>
                  <span className="text-green-600 font-semibold">-30%</span>
                </div>
                <p className="text-sm text-gray-500">
                  Prix du neuf : {formatPrice(product.price * 1.3)}
                </p>
              </div>

              <div className="prose prose-gray">
                <p>{product.description}</p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                  <Shield className="w-6 h-6 text-green-600" />
                  <div>
                    <h3 className="font-medium text-gray-900">Garantie 12 mois</h3>
                    <p className="text-sm text-gray-600">
                      Produit testé et vérifié par nos experts
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                  <Truck className="w-6 h-6 text-electric-blue" />
                  <div>
                    <h3 className="font-medium text-gray-900">Livraison gratuite</h3>
                    <p className="text-sm text-gray-600">
                      Livraison en 2-3 jours ouvrés
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                  <Package className="w-6 h-6 text-purple-600" />
                  <div>
                    <h3 className="font-medium text-gray-900">Retour gratuit</h3>
                    <p className="text-sm text-gray-600">
                      14 jours pour changer d'avis
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="flex items-center border border-gray-300 rounded-lg">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-4 py-2 text-gray-600 hover:text-electric-blue"
                    >
                      -
                    </button>
                    <input
                      type="number"
                      min="1"
                      max={product.stock}
                      value={quantity}
                      onChange={(e) => setQuantity(Number(e.target.value))}
                      className="w-16 text-center border-x border-gray-300 py-2"
                    />
                    <button
                      onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                      className="px-4 py-2 text-gray-600 hover:text-electric-blue"
                    >
                      +
                    </button>
                  </div>
                  <p className={`text-sm ${
                    product.stock > 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {product.stock > 0 
                      ? `${product.stock} unités disponibles`
                      : 'Rupture de stock'
                    }
                  </p>
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={handleAddToCart}
                    disabled={product.stock === 0}
                    className="flex-1 bg-electric-blue text-white py-3 px-6 rounded-lg hover:bg-blue-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    <ShoppingCart className="w-5 h-5" />
                    Ajouter au panier
                  </button>
                  <button className="p-3 border border-gray-300 rounded-lg text-gray-600 hover:text-electric-blue hover:border-electric-blue transition-colors">
                    <Heart className="w-5 h-5" />
                  </button>
                  <button className="p-3 border border-gray-300 rounded-lg text-gray-600 hover:text-electric-blue hover:border-electric-blue transition-colors">
                    <Share2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Caractéristiques */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Caractéristiques
          </h2>
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {product.features.map((feature, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-2 h-2 mt-2 bg-electric-blue rounded-full"></div>
                  <p className="text-gray-600">{feature}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Avis clients */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Avis clients
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              {loading ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-electric-blue mx-auto"></div>
                  <p className="mt-4 text-gray-600">Chargement des avis...</p>
                </div>
              ) : reviews.length > 0 ? (
                <ReviewList reviews={reviews} />
              ) : (
                <div className="bg-white rounded-xl shadow-sm p-6 text-center">
                  <p className="text-gray-600">Aucun avis pour le moment</p>
                </div>
              )}
            </div>
            <div>
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Donnez votre avis
                </h3>
                <ReviewForm productId={product.id} onSuccess={() => {}} />
              </div>
            </div>
          </div>
        </div>

        {/* Produits similaires */}
        <div className="mt-12 mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Produits similaires
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <SimilarProducts currentProduct={product} products={products} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;