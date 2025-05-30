import React, { useEffect } from 'react';
import { useAuthStore } from '../../stores/authStore';
import { useTechnicalRequestStore } from '../../stores/technicalRequestStore';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Clock, Calendar, User, Tool } from 'lucide-react';

const ServiceRequests: React.FC = () => {
  const user = useAuthStore((state) => state.user);
  const { requests, loading, fetchRequests } = useTechnicalRequestStore();

  useEffect(() => {
    if (user) {
      fetchRequests(user.id);
    }
  }, [user]);

  const getStatusBadge = (status: string) => {
    const statusMap = {
      en_attente: { color: 'bg-yellow-100 text-yellow-800', label: 'En attente' },
      assignée: { color: 'bg-blue-100 text-blue-800', label: 'Assignée' },
      en_cours: { color: 'bg-purple-100 text-purple-800', label: 'En cours' },
      terminée: { color: 'bg-green-100 text-green-800', label: 'Terminée' }
    };

    const statusInfo = statusMap[status as keyof typeof statusMap] || statusMap.en_attente;

    return (
      <span className={`${statusInfo.color} text-xs font-semibold px-2.5 py-0.5 rounded-full`}>
        {statusInfo.label}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-24">
        <div className="container mx-auto px-4 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-electric-blue mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading requests...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          My Service Requests
        </h1>

        <div className="space-y-6">
          {requests.map((request) => (
            <div key={request.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-gray-900">
                    {request.service.name}
                  </h2>
                  {getStatusBadge(request.status)}
                </div>

                <p className="text-gray-600 mb-4">{request.description}</p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="w-4 h-4 mr-2" />
                    Created on {format(new Date(request.created_at), 'dd MMMM yyyy', { locale: fr })}
                  </div>

                  {request.appointment_date && (
                    <div className="flex items-center text-sm text-gray-500">
                      <Clock className="w-4 h-4 mr-2" />
                      Appointment: {format(new Date(request.appointment_date), 'dd MMMM yyyy HH:mm', { locale: fr })}
                    </div>
                  )}

                  {request.technician && (
                    <div className="flex items-center text-sm text-gray-500">
                      <Tool className="w-4 h-4 mr-2" />
                      Technician: {request.technician.firstName} {request.technician.lastName}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}

          {requests.length === 0 && (
            <div className="text-center py-12 bg-white rounded-lg shadow-sm">
              <Tool className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                No service requests yet
              </h3>
              <p className="text-gray-600">
                You haven't made any technical service requests yet.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ServiceRequests;