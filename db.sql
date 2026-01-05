-- Script MySQL pour les tables catégories et produits

CREATE TABLE categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    image VARCHAR(255)
);

CREATE TABLE produits (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    description TEXT,
    image VARCHAR(255),
    price DECIMAL(10,2) NOT NULL,
    category_id INT,
    FOREIGN KEY (category_id) REFERENCES categories(id)
);

-- Exemples d'insertion
INSERT INTO categories (title, image) VALUES
  ('Vegetables', 'placeholder.svg'),
  ('Fruits', 'placeholder.svg'),
  ('Meat', 'placeholder.svg');

INSERT INTO produits (title, description, image, price, category_id) VALUES
  ('Red Apples', 'Fresh red apples', '1.jpg', 3.50, 2),
  ('Fresh Broccoli', 'Green broccoli', '2.jpg', 2.99, 1);
