import React from 'react';
import { services } from '../data/services';
import ServiceCard from './ServiceCard';
import { Shield, Server, Cloud } from 'lucide-react';

const ServicesSection: React.FC = () => {
  return (
    <section className="py-16 bg-white dark:bg-slate-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
            Our Professional Services
          </h2>
          <p className="max-w-2xl mx-auto text-slate-600 dark:text-slate-300">
            Expert technical support, managed IT solutions, and cybersecurity services tailored to your business needs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-slate-50 dark:bg-slate-700 p-8 rounded-xl text-center transition-transform hover:-translate-y-1 duration-300">
            <div className="w-16 h-16 bg-blue-50 dark:bg-slate-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-electric-blue" />
            </div>
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">Cybersecurity</h3>
            <p className="text-slate-600 dark:text-slate-300">
              Comprehensive protection for your digital assets with advanced threat detection and prevention.
            </p>
          </div>

          <div className="bg-slate-50 dark:bg-slate-700 p-8 rounded-xl text-center transition-transform hover:-translate-y-1 duration-300">
            <div className="w-16 h-16 bg-blue-50 dark:bg-slate-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Server className="w-8 h-8 text-electric-blue" />
            </div>
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">IT Management</h3>
            <p className="text-slate-600 dark:text-slate-300">
              Proactive management and maintenance of your IT infrastructure to ensure optimal performance.
            </p>
          </div>

          <div className="bg-slate-50 dark:bg-slate-700 p-8 rounded-xl text-center transition-transform hover:-translate-y-1 duration-300">
            <div className="w-16 h-16 bg-blue-50 dark:bg-slate-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Cloud className="w-8 h-8 text-electric-blue" />
            </div>
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">Cloud Solutions</h3>
            <p className="text-slate-600 dark:text-slate-300">
              Seamless migration and management of your applications and data in secure cloud environments.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.slice(0, 3).map(service => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="px-6 py-3 bg-transparent border-2 border-electric-blue text-electric-blue font-semibold rounded-md hover:bg-electric-blue hover:text-white transition-all duration-300">
            View All Services
          </button>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;