CREATE TABLE IF NOT EXISTS products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255),
  cost INTEGER,
  price INTEGER,
  stock INTEGER
);

INSERT INTO products (name, cost, price, stock) VALUES 
('無線藍牙耳機 Pro', 850, 1880, 8),
('304不鏽鋼保溫杯', 320, 699, 156);
