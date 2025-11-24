CREATE TABLE IF NOT EXISTS products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  cost DECIMAL(10,2),
  price DECIMAL(10,2),
  stock INTEGER
);

CREATE TABLE IF NOT EXISTS orders (
  id SERIAL PRIMARY KEY,
  order_number VARCHAR(50),
  date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  total DECIMAL(10,2),
  items JSONB
);

INSERT INTO products (name, cost, price, stock) VALUES
('無線藍牙耳機 Pro', 850.00, 1880.00, 8),
('304不鏽鋼保溫杯', 320.00, 699.00, 156);
