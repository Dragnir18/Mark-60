import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { MapPin, CreditCard, Truck } from 'lucide-react';
import { useCartStore } from '../stores/cartStore';
import { useAuthStore } from '../stores/authStore';
import { supabase } from '../lib/supabase';
import { formatPrice } from '../utils/format';
import toast from 'react-hot-toast';

const addressSchema = z.object({
  street: z.string().min(1, 'L\'adresse est requise'),
  city: z.string().min(1, 'La ville est requise'),
  postalCode: z.string().min(1, 'Le code postal est requis'),
  country: z.string().min(1, 'Le pays est requis'),
  isDefault: z.boolean().optional(),
});

type AddressFormData = z.infer<typeof addressSchema>;

const Checkout: React.FC = () => {
  const navigate = useNavigate();
  const { items, total, clearCart } = useCartStore();
  const { user } = useAuthStore();
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [selectedAddressId, setSelectedAddressId] = useState<string>('');
  const [isAddingAddress, setIsAddingAddress] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddressFormData>({
    resolver: zodResolver(addressSchema),
  });

  React.useEffect(() => {
    if (!user) {
      navigate('/auth/signin');
      return;
    }

    const fetchAddresses = async () => {
      const { data, error } = await supabase
        .from('addresses')
        .select('*')
        .eq('user_id', user.id)
        .order('is_default', { ascending: false });

      if (error) {
        toast.error('Erreur lors du chargement des adresses');
        return;
      }

      setAddresses(data || []);
      if (data && data.length > 0) {
        const defaultAddress = data.find(addr => addr.is_default);
        setSelectedAddressId(defaultAddress?.id || data[0].id);
      }
    };

    fetchAddresses();
  }, [user, navigate]);

  const onAddressSubmit = async (data: AddressFormData) => {
    try {
      const { data: newAddress, error } = await supabase
        .from('addresses')
        .insert([
          {
            user_id: user?.id,
            street: data.street,
            city: data.city,
            postal_code: data.postalCode,
            country: data.country,
            is_default: data.isDefault,
          },
        ])
        .select()
        .single();

      if (error) throw error;

      setAddresses([...addresses, newAddress]);
      setSelectedAddressId(newAddress.id);
      setIsAddingAddress(false);
      toast.success('Adresse ajoutée avec succès');
    } catch (error) {
      toast.error('Erreur lors de l\'ajout de l\'adresse');
    }
  };

  const handleCreateOrder = async () => {
    try {
      if (!selectedAddressId) {
        toast.error('Veuillez sélectionner une adresse de livraison');
        return;
      }

      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert([
          {
            user_id: user?.id,
            shipping_address_id: selectedAddressId,
            total_price: total,
            status: 'en_attente',
          },
        ])
        .select()
        .single();

      if (orderError) throw orderError;

      const orderItems = items.map(item => ({
        order_id: order.id,
        product_id: item.productId,
        quantity: item.quantity,
        price_at_time: item.price,
      }));

      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItems);

      if (itemsError) throw itemsError;

      clearCart();
      toast.success('Commande créée avec succès');
      navigate('/orders');
    } catch (error) {
      toast.error('Erreur lors de la création de la commande');
    }
  };

  if (items.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="min-h-screen bg-slate-50 pt-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-8">Finaliser la commande</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            {/* Section Adresse de livraison */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  Adresse de livraison
                </h2>
                <button
                  onClick={() => setIsAddingAddress(!isAddingAddress)}
                  className="text-sm text-electric-blue hover:text-blue-600"
                >
                  {isAddingAddress ? 'Annuler' : 'Ajouter une adresse'}
                </button>
              </div>

              {isAddingAddress ? (
                <form onSubmit={handleSubmit(onAddressSubmit)} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Rue
                    </label>
                    <input
                      type="text"
                      {...register('street')}
                      className="w-full rounded-md border-slate-300"
                    />
                    {errors.street && (
                      <p className="mt-1 text-sm text-red-600">{errors.street.message}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">
                        Ville
                      </label>
                      <input
                        type="text"
                        {...register('city')}
                        className="w-full rounded-md border-slate-300"
                      />
                      {errors.city && (
                        <p className="mt-1 text-sm text-red-600">{errors.city.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">
                        Code postal
                      </label>
                      <input
                        type="text"
                        {...register('postalCode')}
                        className="w-full rounded-md border-slate-300"
                      />
                      {errors.postalCode && (
                        <p className="mt-1 text-sm text-red-600">{errors.postalCode.message}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Pays
                    </label>
                    <input
                      type="text"
                      {...register('country')}
                      className="w-full rounded-md border-slate-300"
                    />
                    {errors.country && (
                      <p className="mt-1 text-sm text-red-600">{errors.country.message}</p>
                    )}
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      {...register('isDefault')}
                      className="rounded border-slate-300 text-electric-blue focus:ring-electric-blue"
                    />
                    <label className="ml-2 text-sm text-slate-700">
                      Définir comme adresse par défaut
                    </label>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-electric-blue text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
                  >
                    Ajouter l'adresse
                  </button>
                </form>
              ) : (
                <div className="space-y-4">
                  {addresses.map((address) => (
                    <div
                      key={address.id}
                      className={`border rounded-md p-4 cursor-pointer ${
                        selectedAddressId === address.id
                          ? 'border-electric-blue bg-blue-50'
                          : 'border-slate-200 hover:border-electric-blue'
                      }`}
                      onClick={() => setSelectedAddressId(address.id)}
                    >
                      <div className="flex items-start">
                        <input
                          type="radio"
                          checked={selectedAddressId === address.id}
                          onChange={() => setSelectedAddressId(address.id)}
                          className="mt-1 text-electric-blue focus:ring-electric-blue"
                        />
                        <div className="ml-3">
                          <p className="text-slate-900">{address.street}</p>
                          <p className="text-slate-600">
                            {address.city}, {address.postal_code}
                          </p>
                          <p className="text-slate-600">{address.country}</p>
                          {address.is_default && (
                            <span className="inline-block mt-1 text-xs text-electric-blue bg-blue-50 px-2 py-1 rounded">
                              Adresse par défaut
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Section Mode de livraison */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h2 className="text-lg font-semibold text-slate-900 flex items-center gap-2 mb-4">
                <Truck className="w-5 h-5" />
                Mode de livraison
              </h2>

              <div className="space-y-4">
                <div className="border border-electric-blue rounded-md p-4 bg-blue-50">
                  <div className="flex items-start">
                    <input
                      type="radio"
                      checked={true}
                      readOnly
                      className="mt-1 text-electric-blue focus:ring-electric-blue"
                    />
                    <div className="ml-3">
                      <p className="text-slate-900 font-medium">Livraison standard gratuite</p>
                      <p className="text-slate-600">3-5 jours ouvrés</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Section Paiement */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-slate-900 flex items-center gap-2 mb-4">
                <CreditCard className="w-5 h-5" />
                Paiement
              </h2>

              <div className="space-y-4">
                <div className="border border-electric-blue rounded-md p-4 bg-blue-50">
                  <div className="flex items-start">
                    <input
                      type="radio"
                      checked={true}
                      readOnly
                      className="mt-1 text-electric-blue focus:ring-electric-blue"
                    />
                    <div className="ml-3">
                      <p className="text-slate-900 font-medium">Paiement à la livraison</p>
                      <p className="text-slate-600">Payez en espèces à la réception</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Résumé de la commande */}
          <div>
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
              <h2 className="text-lg font-semibold text-slate-900 mb-4">
                Résumé de la commande
              </h2>

              <div className="space-y-4">
                {items.map(item => {
                  const product = products.find(p => p.id === item.productId)!;
                  return (
                    <div key={item.id} className="flex items-center gap-4">
                      <div className="w-16 h-16 flex-shrink-0">
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="w-full h-full object-cover rounded-md"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-sm font-medium text-slate-900">
                          {product.name}
                        </h3>
                        <p className="text-sm text-slate-500">
                          Quantité: {item.quantity}
                        </p>
                      </div>
                      <p className="font-medium text-slate-900">
                        {formatPrice(item.price * item.quantity)}
                      </p>
                    </div>
                  );
                })}

                <div className="pt-4 border-t border-slate-200">
                  <div className="flex justify-between text-sm text-slate-600 mb-2">
                    <span>Sous-total</span>
                    <span>{formatPrice(total)}</span>
                  </div>
                  <div className="flex justify-between text-sm text-slate-600 mb-4">
                    <span>Livraison</span>
                    <span>Gratuite</span>
                  </div>
                  <div className="flex justify-between text-lg font-semibold text-slate-900">
                    <span>Total</span>
                    <span>{formatPrice(total)}</span>
                  </div>
                  <p className="text-sm text-slate-500 mt-1">
                    Taxes incluses
                  </p>
                </div>

                <button
                  onClick={handleCreateOrder}
                  disabled={!selectedAddressId}
                  className="w-full bg-electric-blue text-white py-3 px-4 rounded-md hover:bg-blue-600 transition-colors disabled:bg-slate-300 disabled:cursor-not-allowed"
                >
                  Confirmer la commande
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;