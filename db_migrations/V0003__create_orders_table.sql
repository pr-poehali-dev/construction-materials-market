-- Создание таблицы заказов
CREATE TABLE IF NOT EXISTS orders (
    id SERIAL PRIMARY KEY,
    order_number VARCHAR(50) NOT NULL UNIQUE,
    customer_name VARCHAR(255) NOT NULL,
    customer_phone VARCHAR(50) NOT NULL,
    customer_email VARCHAR(255),
    delivery_address TEXT,
    delivery_method VARCHAR(100) DEFAULT 'Самовывоз',
    payment_method VARCHAR(100) DEFAULT 'Наличные',
    status VARCHAR(50) DEFAULT 'Новый',
    total_amount DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
    comment TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Создание таблицы позиций заказа
CREATE TABLE IF NOT EXISTS order_items (
    id SERIAL PRIMARY KEY,
    order_id INTEGER NOT NULL REFERENCES orders(id),
    product_id INTEGER NOT NULL REFERENCES products(id),
    product_name VARCHAR(500) NOT NULL,
    quantity INTEGER NOT NULL DEFAULT 1,
    unit_price DECIMAL(10, 2) NOT NULL,
    total_price DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Индексы для оптимизации
CREATE INDEX idx_orders_number ON orders(order_number);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_created ON orders(created_at);
CREATE INDEX idx_order_items_order ON order_items(order_id);
CREATE INDEX idx_order_items_product ON order_items(product_id);

-- Вставка тестовых заказов
INSERT INTO orders (order_number, customer_name, customer_phone, customer_email, delivery_address, delivery_method, payment_method, status, total_amount, comment) VALUES
('ORD-2024-001', 'Иванов Сергей Петрович', '+7 (916) 555-01-23', 'ivanov@mail.ru', 'г. Москва, ул. Строителей, д. 15, кв. 42', 'Доставка курьером', 'Картой онлайн', 'В обработке', 15750.50, 'Доставить после 18:00'),
('ORD-2024-002', 'Петрова Анна Викторовна', '+7 (925) 444-56-78', 'petrova@gmail.com', NULL, 'Самовывоз', 'Наличные', 'Готов к выдаче', 8945.00, NULL),
('ORD-2024-003', 'ООО "СтройМонтаж"', '+7 (495) 123-45-67', 'info@stroymontazh.ru', 'Московская обл., г. Королёв, Промзона-3, стр. 8', 'Доставка грузовиком', 'Безналичный расчёт', 'Доставлен', 125600.00, 'Разгрузка манипулятором'),
('ORD-2024-004', 'Смирнов Дмитрий', '+7 (903) 777-88-99', NULL, 'г. Москва, ул. Ленина, д. 88', 'Доставка курьером', 'Наличные', 'Новый', 3250.00, 'Позвонить за час');

-- Вставка позиций для тестовых заказов
INSERT INTO order_items (order_id, product_id, product_name, quantity, unit_price, total_price) VALUES
(1, 1, 'Кирпич керамический М-150', 500, 18.50, 9250.00),
(1, 7, 'Металлочерепица Монтеррей', 12, 485.00, 5820.00),
(1, 11, 'Саморезы по дереву 3.5x45', 5, 125.00, 625.00),
(2, 9, 'Перфоратор Makita HR2470', 1, 8950.00, 8950.00),
(3, 2, 'Газобетонный блок D500', 600, 165.00, 99000.00),
(3, 3, 'Цемент М500 50кг', 50, 385.00, 19250.00),
(3, 4, 'Штукатурка гипсовая Кнауф', 14, 525.00, 7350.00),
(4, 13, 'Краска акриловая белая 14кг', 1, 1850.00, 1850.00),
(4, 14, 'Плитка керамическая 30x60', 2, 675.00, 1350.00);
