import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../stores/authStore';
import { useTechnicalRequestStore } from '../../stores/technicalRequestStore';
import { Calendar, Clock } from 'lucide-react';

const requestSchema = z.object({
  service_id: z.string().uuid(),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  appointment_date: z.string().optional(),
});

type RequestFormData = z.infer<typeof requestSchema>;

const RequestService: React.FC = () => {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const createRequest = useTechnicalRequestStore((state) => state.createRequest);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<RequestFormData>({
    resolver: zodResolver(requestSchema)
  });

  const onSubmit = async (data: RequestFormData) => {
    if (!user) {
      navigate('/auth/signin');
      return;
    }

    await createRequest({
      ...data,
      user_id: user.id,
      status: 'en_attente'
    });

    navigate('/services/requests');
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Request Technical Service
        </h1>

        <div className="max-w-2xl mx-auto">
          <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-xl shadow-sm p-6">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Service Type
                </label>
                <select
                  {...register('service_id')}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-electric-blue focus:ring-electric-blue"
                >
                  <option value="">Select a service</option>
                  {/* Service options will be populated here */}
                </select>
                {errors.service_id && (
                  <p className="mt-1 text-sm text-red-600">{errors.service_id.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  {...register('description')}
                  rows={4}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-electric-blue focus:ring-electric-blue"
                  placeholder="Please describe your technical issue..."
                />
                {errors.description && (
                  <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Preferred Appointment Date
                </label>
                <div className="relative">
                  <input
                    type="datetime-local"
                    {...register('appointment_date')}
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-electric-blue focus:ring-electric-blue pl-10"
                  />
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                </div>
                {errors.appointment_date && (
                  <p className="mt-1 text-sm text-red-600">{errors.appointment_date.message}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-electric-blue text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Request'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RequestService;