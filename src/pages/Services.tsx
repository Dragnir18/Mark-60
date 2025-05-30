import React, { useState } from 'react';
import { services } from '../data/services';
import { Shield, Server, Cloud, Search, Filter, ChevronRight } from 'lucide-react';
import { Service } from '../types';

interface CategoryFilter {
  name: string;
  icon: React.ElementType;
}

const categories: CategoryFilter[] = [
  { name: 'Tous', icon: Filter },
  { name: 'Cybersecurity', icon: Shield },
  { name: 'Technical Services', icon: Server },
  { name: 'Cloud Solutions', icon: Cloud },
];

const Services: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('Tous');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredServices = services.filter((service) => {
    const matchesCategory = selectedCategory === 'Tous' || service.category === selectedCategory;
    const matchesSearch = service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         service.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50 pt-24">
      {/* Hero Section */}
      <div className="bg-gray-900 text-white py-16 mb-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Services Professionnels NSTNT
            </h1>
            <p className="text-xl text-gray-300">
              Des solutions sur mesure pour répondre à vos besoins en technologie, 
              sécurité et maintenance informatique
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Filtres et Recherche */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Rechercher un service..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-electric-blue focus:border-transparent"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
              {categories.map((category) => {
                const Icon = category.icon;
                return (
                  <button
                    key={category.name}
                    onClick={() => setSelectedCategory(category.name)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
                      selectedCategory === category.name
                        ? 'bg-electric-blue text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {category.name}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Liste des Services */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="aspect-video relative overflow-hidden">
                <img
                  src={service.image}
                  alt={service.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <span className="absolute bottom-4 left-4 bg-electric-blue text-white text-sm px-3 py-1 rounded-full">
                  {service.category}
                </span>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {service.name}
                </h3>
                <p className="text-gray-600 mb-4">
                  {service.description}
                </p>
                
                <div className="space-y-3 mb-6">
                  {service.features.slice(0, 3).map((feature, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm text-gray-600">
                      <div className="w-1.5 h-1.5 bg-electric-blue rounded-full" />
                      {feature}
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-lg font-semibold text-gray-900">
                    {service.price}
                  </span>
                  <button className="flex items-center gap-2 text-electric-blue hover:text-blue-700 font-medium">
                    En savoir plus
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Section Avantages */}
        <div className="bg-white rounded-xl shadow-sm p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
            Pourquoi choisir nos services ?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-electric-blue" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Expertise Certifiée
              </h3>
              <p className="text-gray-600">
                Une équipe de professionnels certifiés avec des années d'expérience
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Server className="w-8 h-8 text-electric-blue" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Support 24/7
              </h3>
              <p className="text-gray-600">
                Une assistance technique disponible à tout moment pour vous accompagner
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Cloud className="w-8 h-8 text-electric-blue" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Solutions Sur Mesure
              </h3>
              <p className="text-gray-600">
                Des services adaptés à vos besoins spécifiques et à votre budget
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;