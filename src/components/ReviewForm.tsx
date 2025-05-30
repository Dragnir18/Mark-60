import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Star } from 'lucide-react';
import { useAuthStore } from '../stores/authStore';
import { supabase } from '../lib/supabase';
import toast from 'react-hot-toast';

const reviewSchema = z.object({
  rating: z.number().min(1).max(5),
  comment: z.string().min(10, 'Le commentaire doit contenir au moins 10 caractères'),
});

type ReviewFormData = z.infer<typeof reviewSchema>;

interface ReviewFormProps {
  productId: string;
  onSuccess: () => void;
}

const ReviewForm: React.FC<ReviewFormProps> = ({ productId, onSuccess }) => {
  const user = useAuthStore((state) => state.user);
  const [hoveredRating, setHoveredRating] = React.useState(0);
  
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ReviewFormData>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      rating: 0,
    },
  });

  const rating = watch('rating');

  const onSubmit = async (data: ReviewFormData) => {
    try {
      const { data: review, error } = await supabase
        .from('reviews')
        .insert([
          {
            product_id: productId,
            user_id: user?.id,
            rating: data.rating,
            comment: data.comment,
          },
        ])
        .select()
        .single();

      if (error) throw error;

      toast.success('Avis ajouté avec succès');
      onSuccess();
    } catch (error) {
      toast.error('Erreur lors de l\'ajout de l\'avis');
    }
  };

  if (!user) {
    return (
      <div className="text-center py-6">
        <p className="text-slate-600">
          Connectez-vous pour laisser un avis
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">
          Note
        </label>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((value) => (
            <button
              key={value}
              type="button"
              onClick={() => setValue('rating', value)}
              onMouseEnter={() => setHoveredRating(value)}
              onMouseLeave={() => setHoveredRating(0)}
              className="p-1"
            >
              <Star
                className={`w-6 h-6 ${
                  value <= (hoveredRating || rating)
                    ? 'text-yellow-400 fill-current'
                    : 'text-slate-300'
                }`}
              />
            </button>
          ))}
        </div>
        {errors.rating && (
          <p className="mt-1 text-sm text-red-600">{errors.rating.message}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="comment"
          className="block text-sm font-medium text-slate-700 mb-2"
        >
          Commentaire
        </label>
        <textarea
          {...register('comment')}
          rows={4}
          className="w-full rounded-md border-slate-300 shadow-sm focus:border-electric-blue focus:ring-electric-blue"
        />
        {errors.comment && (
          <p className="mt-1 text-sm text-red-600">{errors.comment.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-electric-blue text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors disabled:bg-slate-300 disabled:cursor-not-allowed"
      >
        {isSubmitting ? 'Envoi en cours...' : 'Publier l\'avis'}
      </button>
    </form>
  );
};

export default ReviewForm;