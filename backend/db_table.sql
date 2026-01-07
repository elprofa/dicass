-- Structure de la base de données pour l’application

-- Table: users
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100) UNIQUE,
  phone VARCHAR(20),
  address VARCHAR(255),
  avatar VARCHAR(255)
);

-- Table: addresses
CREATE TABLE IF NOT EXISTS addresses (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  label VARCHAR(100),
  address_line1 VARCHAR(255),
  address_line2 VARCHAR(255),
  city VARCHAR(100),
  zip_code VARCHAR(20),
  type VARCHAR(20),
  isDefault BOOLEAN DEFAULT 0
);

-- Table: cart
CREATE TABLE IF NOT EXISTS cart (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Table: cart_items
CREATE TABLE IF NOT EXISTS cart_items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  cart_id INT,
  product_id INT,
  quantity INT DEFAULT 1
);

-- Table: produits
CREATE TABLE IF NOT EXISTS produits (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  price DECIMAL(10,2),
  image VARCHAR(255),
  meta VARCHAR(255),
  promotion DECIMAL(5,2) DEFAULT 0,
  store_id INT,
  category_id INT,
  lot_id INT
);

-- Table: lots
CREATE TABLE IF NOT EXISTS lots (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  images VARCHAR(255)
);

-- Table: categories
CREATE TABLE IF NOT EXISTS categories (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100)
);

-- Table: store
CREATE TABLE IF NOT EXISTS store (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  image VARCHAR(255)
);

-- Table: orders
CREATE TABLE IF NOT EXISTS orders (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  order_number VARCHAR(20),
  status VARCHAR(20),
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Table: order_items
CREATE TABLE IF NOT EXISTS order_items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  order_id INT,
  product_id INT,
  quantity INT,
  price DECIMAL(10,2)
);

-- Table: offers
CREATE TABLE IF NOT EXISTS offers (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(100),
  description TEXT,
  image VARCHAR(255),
  badge VARCHAR(50),
  discount DECIMAL(5,2)
);

-- Table: notifications
CREATE TABLE IF NOT EXISTS notifications (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  message TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  is_read BOOLEAN DEFAULT 0
);

-- Table: coupons
CREATE TABLE IF NOT EXISTS coupons (
  id INT AUTO_INCREMENT PRIMARY KEY,
  code VARCHAR(20),
  discount DECIMAL(5,2),
  user_id INT
);

-- Table: payments
CREATE TABLE IF NOT EXISTS payments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  order_id INT,
  method VARCHAR(50),
  amount DECIMAL(10,2),
  status VARCHAR(20),
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Table: payment_methods
CREATE TABLE IF NOT EXISTS payment_methods (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  type VARCHAR(50),
  details VARCHAR(255)
);

-- Table: wallets
CREATE TABLE IF NOT EXISTS wallets (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  balance DECIMAL(10,2) DEFAULT 0
);

-- Table: wallet_transactions
CREATE TABLE IF NOT EXISTS wallet_transactions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  wallet_id INT,
  amount DECIMAL(10,2),
  type VARCHAR(20),
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
