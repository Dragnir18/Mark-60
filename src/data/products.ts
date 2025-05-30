import { Product } from '../types';

export const products: Product[] = [
  {
    id: '1',
    name: 'Unité de traitement quantique',
    category: 'Matériel',
    subCategory: 'Processeurs',
    price: 850000, // 850 000 FCFA
    description: 'Unité de traitement de nouvelle génération avec technologie de refroidissement avancée et capacités d\'overclocking.',
    features: [
      'Processeur 12 cœurs',
      'Fréquence de base 4.8GHz',
      'Design thermique avancé',
      'Compatible avec tous les systèmes NSTNT'
    ],
    images: [
      'https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    ],
    stock: 15
  },
  {
    id: '2',
    name: 'Passerelle de sécurité NanoSphere',
    category: 'Cybersécurité',
    subCategory: 'Protection réseau',
    price: 590000, // 590 000 FCFA
    description: 'Passerelle de sécurité de niveau entreprise avec surveillance des menaces en temps réel et prévention avancée des intrusions.',
    features: [
      'Détection des menaces en temps réel',
      'Mises à jour automatiques de sécurité',
      'Analyse du trafic réseau',
      'Règles de sécurité personnalisables'
    ],
    images: [
      'https://images.pexels.com/photos/325229/pexels-photo-325229.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    ],
    stock: 8
  },
  {
    id: '3',
    name: 'Écran CrystalVision 4K',
    category: 'Matériel',
    subCategory: 'Écrans',
    price: 450000, // 450 000 FCFA
    description: 'Moniteur ultra haute définition avec support HDR et bordures minimales pour une expérience visuelle immersive.',
    features: [
      'Écran 32 pouces',
      'Résolution 4K UHD',
      'Temps de réponse 1ms',
      'Support HDR10'
    ],
    images: [
      'https://images.pexels.com/photos/1714208/pexels-photo-1714208.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    ],
    stock: 12
  },
  {
    id: '4',
    name: 'PC Gaming TitanForce',
    category: 'Matériel',
    subCategory: 'Ordinateurs',
    price: 1650000, // 1 650 000 FCFA
    description: 'Station de jeu professionnelle avec des composants haut de gamme pour des performances maximales dans les jeux les plus exigeants.',
    features: [
      'NVIDIA RTX 4080 GPU',
      '32GB RAM DDR5',
      'SSD NVMe 2TB',
      'Système de refroidissement liquide'
    ],
    images: [
      'https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    ],
    stock: 5
  },
  {
    id: '5',
    name: 'Système de sauvegarde DataVault',
    category: 'Matériel',
    subCategory: 'Stockage',
    price: 230000, // 230 000 FCFA
    description: 'Solution de sauvegarde fiable avec redondance et chiffrement pour un stockage sécurisé des informations critiques.',
    features: [
      'Capacité de stockage 8TB',
      'Configuration RAID',
      'Chiffrement AES-256',
      'Planification automatique des sauvegardes'
    ],
    images: [
      'https://images.pexels.com/photos/117729/pexels-photo-117729.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    ],
    stock: 20
  },
  {
    id: '6',
    name: 'Clavier mécanique QuietStorm',
    category: 'Périphériques',
    subCategory: 'Claviers',
    price: 85000, // 85 000 FCFA
    description: 'Clavier mécanique haut de gamme avec éclairage RGB personnalisable et switches silencieux pour un usage professionnel.',
    features: [
      'Switches mécaniques silencieux',
      'Éclairage RGB personnalisable',
      'Construction en aluminium',
      'Touches macro programmables'
    ],
    images: [
      'https://images.pexels.com/photos/3829227/pexels-photo-3829227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    ],
    stock: 25
  }
];

export const categories: Category[] = [
  {
    id: '1',
    name: 'Matériel',
    slug: 'materiel',
    subCategories: [
      { id: '1-1', name: 'Processeurs', slug: 'processeurs' },
      { id: '1-2', name: 'Écrans', slug: 'ecrans' },
      { id: '1-3', name: 'Ordinateurs', slug: 'ordinateurs' },
      { id: '1-4', name: 'Stockage', slug: 'stockage' }
    ]
  },
  {
    id: '2',
    name: 'Cybersécurité',
    slug: 'cybersecurite',
    subCategories: [
      { id: '2-1', name: 'Protection réseau', slug: 'protection-reseau' },
      { id: '2-2', name: 'Antivirus', slug: 'antivirus' },
      { id: '2-3', name: 'Pare-feu', slug: 'pare-feu' }
    ]
  },
  {
    id: '3',
    name: 'Périphériques',
    slug: 'peripheriques',
    subCategories: [
      { id: '3-1', name: 'Claviers', slug: 'claviers' },
      { id: '3-2', name: 'Souris', slug: 'souris' },
      { id: '3-3', name: 'Casques', slug: 'casques' }
    ]
  }
];