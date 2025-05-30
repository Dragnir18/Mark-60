/*
  # Schéma initial de la base de données NSTNT

  1. Tables
    - profiles: Profils utilisateurs avec rôles
    - products: Catalogue de produits
    - categories: Catégories de produits
    - reviews: Avis clients sur les produits
    - orders: Commandes clients
    - order_items: Détails des commandes
    - addresses: Adresses de livraison
    - services: Services techniques proposés
    - technical_requests: Demandes d'intervention technique
    
  2. Sécurité
    - RLS activé sur toutes les tables
    - Politiques d'accès selon les rôles
*/

-- Création de l'enum pour les rôles utilisateurs
CREATE TYPE user_role AS ENUM ('client', 'admin', 'technicien', 'manager');

-- Table des profils utilisateurs
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id),
  email text UNIQUE NOT NULL,
  first_name text NOT NULL,
  last_name text NOT NULL,
  role user_role NOT NULL DEFAULT 'client',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Table des catégories
CREATE TABLE IF NOT EXISTS categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  parent_id uuid REFERENCES categories(id),
  created_at timestamptz DEFAULT now()
);

-- Table des produits
CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  description text NOT NULL,
  technical_details text,
  price decimal(10,2) NOT NULL,
  category_id uuid REFERENCES categories(id) NOT NULL,
  stock int NOT NULL DEFAULT 0,
  images text[] NOT NULL DEFAULT '{}',
  features text[] NOT NULL DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Table des avis
CREATE TABLE IF NOT EXISTS reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id uuid REFERENCES products(id) NOT NULL,
  user_id uuid REFERENCES profiles(id) NOT NULL,
  rating int NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment text,
  created_at timestamptz DEFAULT now(),
  UNIQUE(product_id, user_id)
);

-- Table des adresses
CREATE TABLE IF NOT EXISTS addresses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) NOT NULL,
  street text NOT NULL,
  city text NOT NULL,
  postal_code text NOT NULL,
  country text NOT NULL,
  is_default boolean NOT NULL DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Table des commandes
CREATE TABLE IF NOT EXISTS orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) NOT NULL,
  status text NOT NULL DEFAULT 'en_attente',
  total_price decimal(10,2) NOT NULL,
  shipping_address_id uuid REFERENCES addresses(id) NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Table des articles de commande
CREATE TABLE IF NOT EXISTS order_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id uuid REFERENCES orders(id) NOT NULL,
  product_id uuid REFERENCES products(id) NOT NULL,
  quantity int NOT NULL CHECK (quantity > 0),
  price_at_time decimal(10,2) NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Table des services
CREATE TABLE IF NOT EXISTS services (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text NOT NULL,
  category text NOT NULL,
  features text[] NOT NULL DEFAULT '{}',
  base_price decimal(10,2),
  image text,
  created_at timestamptz DEFAULT now()
);

-- Table des demandes techniques
CREATE TABLE IF NOT EXISTS technical_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) NOT NULL,
  service_id uuid REFERENCES services(id) NOT NULL,
  description text NOT NULL,
  status text NOT NULL DEFAULT 'en_attente',
  technician_id uuid REFERENCES profiles(id),
  appointment_date timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Activation de la RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE addresses ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE technical_requests ENABLE ROW LEVEL SECURITY;

-- Politiques de sécurité pour les profils
CREATE POLICY "Les utilisateurs peuvent voir leur propre profil"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Les admins peuvent tout voir"
  ON profiles FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Politiques pour les produits
CREATE POLICY "Tout le monde peut voir les produits"
  ON products FOR SELECT
  TO PUBLIC
  USING (true);

-- Politiques pour les commandes
CREATE POLICY "Les utilisateurs peuvent voir leurs propres commandes"
  ON orders FOR SELECT
  USING (auth.uid() = user_id);

-- Politiques pour les adresses
CREATE POLICY "Les utilisateurs peuvent gérer leurs propres adresses"
  ON addresses FOR ALL
  USING (auth.uid() = user_id);

-- Politiques pour les avis
CREATE POLICY "Tout le monde peut voir les avis"
  ON reviews FOR SELECT
  TO PUBLIC
  USING (true);

CREATE POLICY "Les utilisateurs peuvent créer leurs propres avis"
  ON reviews FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Politiques pour les services
CREATE POLICY "Tout le monde peut voir les services"
  ON services FOR SELECT
  TO PUBLIC
  USING (true);

-- Politiques pour les demandes techniques
CREATE POLICY "Les utilisateurs peuvent voir leurs propres demandes"
  ON technical_requests FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Les techniciens peuvent voir les demandes qui leur sont assignées"
  ON technical_requests FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND (role = 'technicien' OR role = 'admin' OR role = 'manager')
    )
  );