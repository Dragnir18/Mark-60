import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Service } from '../types';

interface ServiceCardProps {
  service: Service;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1 flex flex-col h-full">
      <div className="relative overflow-hidden h-48">
        <img
          src={service.image}
          alt={service.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent opacity-50"></div>
        <div className="absolute bottom-0 left-0 p-4">
          <span className="bg-electric-blue text-white text-xs px-2 py-1 rounded">
            {service.category}
          </span>
        </div>
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
          {service.name}
        </h3>
        <p className="text-slate-600 dark:text-slate-300 text-sm mb-4 flex-grow">
          {service.description}
        </p>
        <div className="flex justify-between items-center mt-auto">
          <p className="text-electric-blue font-semibold">{service.price}</p>
          <Link
            to={`/service/${service.id}`}
            className="text-electric-blue hover:text-teal-500 flex items-center text-sm font-medium transition-colors"
          >
            Learn more <ArrowRight size={16} className="ml-1" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;