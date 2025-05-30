import { Service } from '../types';

export const services: Service[] = [
  {
    id: '1',
    name: 'Network Security Audit',
    category: 'Cybersecurity',
    description: 'Comprehensive analysis of your network infrastructure to identify vulnerabilities and recommend security improvements.',
    features: [
      'Full network penetration testing',
      'Vulnerability assessment',
      'Security policy review',
      'Detailed remediation plan'
    ],
    image: 'https://images.pexels.com/photos/2881229/pexels-photo-2881229.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    price: 'Starting at $1,499'
  },
  {
    id: '2',
    name: 'Custom System Integration',
    category: 'Technical Services',
    description: 'Expert integration of hardware and software systems tailored to your business needs and existing infrastructure.',
    features: [
      'Custom hardware configuration',
      'Software deployment',
      'Legacy system integration',
      'Employee training'
    ],
    image: 'https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    price: 'Starting at $2,999'
  },
  {
    id: '3',
    name: 'Managed IT Services',
    category: 'Technical Services',
    description: 'Ongoing IT support and management to keep your systems running smoothly and securely with 24/7 monitoring.',
    features: [
      '24/7 monitoring and support',
      'Regular maintenance and updates',
      'Help desk services',
      'Performance optimization'
    ],
    image: 'https://images.pexels.com/photos/7173026/pexels-photo-7173026.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    price: 'Starting at $999/month'
  },
  {
    id: '4',
    name: 'Data Recovery',
    category: 'Technical Services',
    description: 'Professional data recovery services for lost or corrupted data from any type of storage media with high success rates.',
    features: [
      'Hardware failure recovery',
      'Ransomware data recovery',
      'Corrupted file repair',
      'Emergency service available'
    ],
    image: 'https://images.pexels.com/photos/4960464/pexels-photo-4960464.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    price: 'Starting at $499'
  },
  {
    id: '5',
    name: 'Cybersecurity Training',
    category: 'Cybersecurity',
    description: 'Employee training programs to build security awareness and establish best practices for organizational cybersecurity.',
    features: [
      'Phishing awareness training',
      'Password security practices',
      'Social engineering defense',
      'Security incident response'
    ],
    image: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    price: 'Starting at $799 per session'
  },
  {
    id: '6',
    name: 'Cloud Migration Services',
    category: 'Technical Services',
    description: 'End-to-end migration of your infrastructure to cloud platforms with minimal disruption to business operations.',
    features: [
      'Cloud readiness assessment',
      'Data migration planning',
      'Implementation and testing',
      'Post-migration support'
    ],
    image: 'https://images.pexels.com/photos/1181316/pexels-photo-1181316.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    price: 'Starting at $3,499'
  }
];