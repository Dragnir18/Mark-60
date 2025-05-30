import React from 'react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Star, ThumbsUp, Flag } from 'lucide-react';
import { Review } from '../types';

interface ReviewListProps {
  reviews: Review[];
}

const ReviewList: React.FC<ReviewListProps> = ({ reviews }) => {
  return (
    <div className="space-y-6">
      {reviews.map((review) => (
        <div key={review.id} className="bg-white rounded-lg p-6 shadow-sm">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center">
                <span className="text-slate-600 font-medium">
                  {review.user.firstName.charAt(0)}
                  {review.user.lastName.charAt(0)}
                </span>
              </div>
              <div>
                <p className="font-medium text-slate-900">
                  {review.user.firstName} {review.user.lastName}
                </p>
                <p className="text-sm text-slate-500">
                  {format(new Date(review.createdAt), 'dd MMMM yyyy', { locale: fr })}
                </p>
              </div>
            </div>
            <div className="flex items-center">
              {[...Array(5)].map((_, index) => (
                <Star
                  key={index}
                  className={`w-4 h-4 ${
                    index < review.rating
                      ? 'text-yellow-400 fill-current'
                      : 'text-slate-300'
                  }`}
                />
              ))}
            </div>
          </div>

          <p className="mt-4 text-slate-600">{review.comment}</p>

          <div className="mt-4 flex items-center gap-4">
            <button className="flex items-center gap-1 text-sm text-slate-500 hover:text-electric-blue transition-colors">
              <ThumbsUp className="w-4 h-4" />
              Utile (0)
            </button>
            <button className="flex items-center gap-1 text-sm text-slate-500 hover:text-red-500 transition-colors">
              <Flag className="w-4 h-4" />
              Signaler
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ReviewList;