-- Создание таблицы товаров (стройматериалов)
CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,
    category_id INTEGER NOT NULL REFERENCES categories(id),
    name VARCHAR(500) NOT NULL,
    slug VARCHAR(500) NOT NULL UNIQUE,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    old_price DECIMAL(10, 2),
    article VARCHAR(100) UNIQUE,
    unit VARCHAR(50) NOT NULL DEFAULT 'шт',
    stock_quantity INTEGER DEFAULT 0,
    min_order_quantity INTEGER DEFAULT 1,
    manufacturer VARCHAR(255),
    image_url TEXT,
    rating DECIMAL(2, 1) DEFAULT 0.0,
    reviews_count INTEGER DEFAULT 0,
    is_available BOOLEAN DEFAULT TRUE,
    is_featured BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Индексы для оптимизации поиска
CREATE INDEX idx_products_category ON products(category_id);
CREATE INDEX idx_products_slug ON products(slug);
CREATE INDEX idx_products_article ON products(article);
CREATE INDEX idx_products_available ON products(is_available);
CREATE INDEX idx_products_featured ON products(is_featured);

-- Вставка тестовых товаров
INSERT INTO products (category_id, name, slug, description, price, old_price, article, unit, stock_quantity, manufacturer, rating, reviews_count, is_featured) VALUES
(1, 'Кирпич керамический М-150', 'brick-ceramic-m150', 'Полнотелый керамический кирпич марки М-150 для строительства несущих стен', 18.50, 22.00, 'KR-150-001', 'шт', 50000, 'КирпичЗавод', 4.8, 127, TRUE),
(1, 'Газобетонный блок D500', 'gazoblock-d500', 'Газобетонный блок плотностью D500, размер 600x300x200мм', 165.00, NULL, 'GB-500-020', 'шт', 15000, 'АэроСтрой', 4.9, 89, TRUE),
(2, 'Цемент М500 50кг', 'cement-m500-50kg', 'Портландцемент марки М500 Д0 в мешках по 50кг', 385.00, 420.00, 'CM-500-050', 'мешок', 2500, 'ЦементПром', 4.7, 234, TRUE),
(2, 'Штукатурка гипсовая Кнауф', 'knauf-gypsum-plaster', 'Гипсовая штукатурка Rotband для внутренних работ, 30кг', 525.00, NULL, 'KN-ROT-030', 'мешок', 800, 'Knauf', 4.9, 312, TRUE),
(3, 'Доска обрезная 40x150x6000', 'board-40x150x6000', 'Обрезная доска из сосны 1 сорта, естественной влажности', 450.00, 520.00, 'DS-041-150', 'шт', 1200, 'ЛесПром', 4.5, 67, FALSE),
(3, 'Брус 150x150x6000 мм', 'timber-150x150x6000', 'Строительный брус из сосны, сухой строганый', 1250.00, NULL, 'BR-150-600', 'шт', 450, 'СибирьЛес', 4.6, 45, FALSE),
(4, 'Металлочерепица Монтеррей', 'metal-tile-monterrey', 'Металлочерепица профиль Монтеррей, толщина 0.5мм, полиэстер', 485.00, 550.00, 'MT-MON-050', 'м²', 3500, 'МеталлПрофиль', 4.8, 156, TRUE),
(5, 'Утеплитель Роквул 100мм', 'rockwool-insulation-100', 'Минеральная вата Rockwool Лайт Баттс, плотность 37 кг/м³', 890.00, NULL, 'RW-LB-100', 'упак', 650, 'Rockwool', 4.9, 203, FALSE),
(6, 'Перфоратор Makita HR2470', 'makita-hr2470', 'Перфоратор SDS-plus, мощность 780Вт, энергия удара 2.7Дж', 8950.00, 10500.00, 'MK-HR2470', 'шт', 45, 'Makita', 4.9, 178, TRUE),
(6, 'Шуруповерт аккумуляторный Bosch', 'bosch-drill-driver', 'Аккумуляторная дрель-шуруповерт 18В, 2 аккумулятора', 6750.00, NULL, 'BS-GSR-180', 'шт', 32, 'Bosch', 4.8, 142, FALSE),
(7, 'Саморезы по дереву 3.5x45', 'wood-screws-35x45', 'Саморезы оцинкованные с потайной головкой, 1000 шт', 125.00, 145.00, 'SR-WD-3545', 'упак', 2800, 'Крепёж+', 4.6, 89, FALSE),
(7, 'Анкер клиновой 10x100', 'wedge-anchor-10x100', 'Анкерный болт клиновой для бетона М10х100мм, 50шт', 485.00, NULL, 'AN-KL-10100', 'упак', 950, 'MetizPro', 4.7, 67, FALSE),
(8, 'Краска акриловая белая 14кг', 'acrylic-paint-white-14kg', 'Интерьерная акриловая краска супербелая, моющаяся', 1850.00, 2100.00, 'KR-AK-W14', 'ведро', 320, 'Dulux', 4.8, 134, FALSE),
(8, 'Плитка керамическая 30x60', 'ceramic-tile-30x60', 'Керамическая плитка для стен, глянцевая, коллекция Классика', 675.00, NULL, 'PL-KR-3060', 'м²', 850, 'Kerama Marazzi', 4.7, 98, FALSE);
