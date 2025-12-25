-- Создание таблицы категорий стройматериалов
CREATE TABLE IF NOT EXISTS categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    description TEXT,
    icon VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Добавление индекса для быстрого поиска по slug
CREATE INDEX idx_categories_slug ON categories(slug);

-- Вставка начальных категорий
INSERT INTO categories (name, slug, description, icon) VALUES
('Кирпич и блоки', 'brick-blocks', 'Керамический кирпич, газобетонные и пенобетонные блоки', 'Box'),
('Цемент и сухие смеси', 'cement-mixes', 'Цемент различных марок, штукатурки, шпаклевки', 'Package'),
('Пиломатериалы', 'lumber', 'Доски, брус, вагонка, фанера', 'Trees'),
('Кровельные материалы', 'roofing', 'Металлочерепица, профнастил, мягкая кровля', 'Home'),
('Изоляционные материалы', 'insulation', 'Утеплители, гидроизоляция, пароизоляция', 'Shield'),
('Инструменты', 'tools', 'Электроинструмент и ручной инструмент', 'Wrench'),
('Крепёж и метизы', 'fasteners', 'Гвозди, саморезы, болты, анкеры', 'Link'),
('Отделочные материалы', 'finishing', 'Краски, лаки, обои, плитка', 'Paintbrush');
