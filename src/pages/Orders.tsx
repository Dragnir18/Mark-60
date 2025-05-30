import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Package, Clock, CheckCircle, Truck, MapPin } from 'lucide-react';
import { useAuthStore } from '../stores/authStore';
import { supabase } from '../lib/supabase';
import { Order } from '../types';
import { formatPrice } from '../utils/format';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import toast from 'react-hot-toast';

const statusMap = {
  en_attente: {
    label: 'En attente',
    icon: Clock,
    color: 'text-yellow-500',
    bg: 'bg-yellow-50',
  },
  confirmée: {
    label: 'Confirmée',
    icon: CheckCircle,
    color: 'text-green-500',
    bg: 'bg-green-50',
  },
  en_préparation: {
    label: 'En préparation',
    icon: Package,
    color: 'text-blue-500',
    bg: 'bg-blue-50',
  },
  expédiée: {
    label: 'Expédiée',
    icon: Truck,
    color: 'text-purple-500',
    bg: 'bg-purple-50',
  },
  livrée: {
    label: 'Livrée',
    icon: CheckCircle,
    color: 'text-green-500',
    bg: 'bg-green-50',
  },
};

const Orders: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate('/auth/signin');
      return;
    }

    const fetchOrders = async () => {
      try {
        const { data, error } = await supabase
          .from('orders')
          .select(`
            *,
            shipping_address:addresses(*),
            items:order_items(
              *,
              product:products(*)
            )
          `)
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });

        if (error) throw error;
        setOrders(data || []);
      } catch (error) {
        console.error('Error fetching orders:', error);
        toast.error('Erreur lors du chargement des commandes');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 pt-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-electric-blue mx-auto"></div>
            <p className="mt-4 text-slate-600">Chargement des commandes...</p>
          </div>
        </div>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="min-h-screen bg-slate-50 pt-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-12">
            <Package className="w-16 h-16 text-slate-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-slate-900 mb-2">
              Aucune commande
            </h2>
            <p className="text-slate-600 mb-8">
              Vous n'avez pas encore passé de commande
            </p>
            <button
              onClick={() => navigate('/products')}
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-electric-blue hover:bg-blue-600"
            >
              Découvrir nos produits
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pt-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-8">Mes commandes</h1>

        <div className="space-y-6">
          {orders.map((order) => {
            const status = statusMap[order.status];
            const StatusIcon = status.icon;

            return (
              <div key={order.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-sm text-slate-500">
                        Commande #{order.id.slice(0, 8)}
                      </p>
                      <p className="text-sm text-slate-500">
                        Passée le {format(new Date(order.created_at), 'dd MMMM yyyy', { locale: fr })}
                      </p>
                    </div>
                    <div className={`flex items-center px-3 py-1 rounded-full ${status.bg}`}>
                      <StatusIcon className={`w-4 h-4 ${status.color} mr-2`} />
                      <span className={`text-sm font-medium ${status.color}`}>
                        {status.label}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {order.items.map((item) => (
                      <div key={item.id} className="flex items-center gap-4">
                        <div className="w-16 h-16 flex-shrink-0">
                          <img
                            src={item.product.images[0]}
                            alt={item.product.name}
                            className="w-full h-full object-cover rounded-md"
                          />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-sm font-medium text-slate-900">
                            {item.product.name}
                          </h3>
                          <p className="text-sm text-slate-500">
                            Quantité: {item.quantity}
                          </p>
                        </div>
                        <p className="font-medium text-slate-900">
                          {formatPrice(item.price_at_time * item.quantity)}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 pt-6 border-t border-slate-200">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-2">
                        <MapPin className="w-5 h-5 text-slate-400 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium text-slate-900">
                            Adresse de livraison
                          </p>
                          <p className="text-sm text-slate-600">
                            {order.shipping_address.street}
                          </p>
                          <p className="text-sm text-slate-600">
                            {order.shipping_address.city}, {order.shipping_address.postal_code}
                          </p>
                          <p className="text-sm text-slate-600">
                            {order.shipping_address.country}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-slate-500">Total</p>
                        <p className="text-lg font-semibold text-slate-900">
                          {formatPrice(order.total_price)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Orders;