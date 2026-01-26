export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  oldPrice?: number;
  rating: number;
  reviews: number;
  inStock: boolean;
  image: string;
  badge?: string;
  description?: string;
  specs?: {
    label: string;
    value: string;
  }[];
  warehouseStock?: number;
}

export const products: Product[] = [
  {
    id: 1,
    name: "Цемент М500",
    category: "Цемент и смеси",
    price: 380,
    oldPrice: 590,
    rating: 4.8,
    reviews: 142,
    inStock: true,
    image:
      "https://cdn.poehali.dev/projects/957da87a-22f2-4490-82de-9f00287df06f/files/4aed0e6d-dd28-4c31-9ba7-a4dd1638b4d0.jpg",
    badge: "Хит продаж",
    description:
      "Высококачественный портландцемент марки М500 для строительных и отделочных работ. Обладает высокой прочностью и морозостойкостью. Идеально подходит для изготовления бетона, растворов, стяжек.",
    specs: [
      { label: "Марка", value: "М500" },
      { label: "Вес", value: "50 кг" },
      { label: "Прочность", value: "500 кг/см²" },
      { label: "Морозостойкость", value: "F100" },
      { label: "Производитель", value: "Россия" },
    ],
    warehouseStock: 240,
  },
  {
    id: 2,
    name: "OSB 6 mm",
    category: "Пиломатериалы",
    inStock: true,
    price: 860,
    rating: 4.7,
    reviews: 56,
    image:
      "https://cdn.poehali.dev/projects/957da87a-22f2-4490-82de-9f00287df06f/files/4b9885f2-9e5e-4be7-bf8c-5a531ae7c059.jpg",
    description:
      "Ориентированно-стружечная плита (OSB) толщиной 6 мм. Используется для обшивки стен, потолков, изготовления мебели и упаковки. Влагостойкая, экологически чистая.",
    specs: [
      { label: "Толщина", value: "6 мм" },
      { label: "Размер", value: "2500x1250 мм" },
      { label: "Класс", value: "OSB-3" },
      { label: "Влагостойкость", value: "Да" },
      { label: "Производитель", value: "Kronospan" },
    ],
    warehouseStock: 85,
  },
  {
    id: 3,
    name: "OSB 9 mm",
    category: "Пиломатериалы",
    price: 950,
    rating: 4.7,
    reviews: 56,
    inStock: true,
    image:
      "https://cdn.poehali.dev/projects/957da87a-22f2-4490-82de-9f00287df06f/files/4b9885f2-9e5e-4be7-bf8c-5a531ae7c059.jpg",
    badge: "Новинка",
    description:
      "Ориентированно-стружечная плита (OSB) толщиной 9 мм. Применяется для конструкционных работ, обшивки каркасных домов, настила полов. Повышенная прочность и влагостойкость.",
    specs: [
      { label: "Толщина", value: "9 мм" },
      { label: "Размер", value: "2500x1250 мм" },
      { label: "Класс", value: "OSB-3" },
      { label: "Влагостойкость", value: "Да" },
      { label: "Производитель", value: "Kronospan" },
    ],
    warehouseStock: 120,
  },
  {
    id: 4,
    name: "Профлист С-21",
    category: "Кровля",
    price: 520,
    oldPrice: 650,
    rating: 4.6,
    reviews: 73,
    inStock: true,
    image:
      "https://cdn.poehali.dev/projects/957da87a-22f2-4490-82de-9f00287df06f/files/7e3e3020-6f73-4337-9bb7-69486016408c.jpg",
    description:
      "Профилированный лист С-21 с полимерным покрытием. Используется для кровли, ограждений, облицовки стен. Долговечный материал с антикоррозийной защитой.",
    specs: [
      { label: "Профиль", value: "С-21" },
      { label: "Толщина металла", value: "0.5 мм" },
      { label: "Ширина", value: "1000 мм" },
      { label: "Покрытие", value: "Полиэстер" },
      { label: "Цвет", value: "RAL 3005 (красный)" },
    ],
    warehouseStock: 340,
  },
  {
    id: 5,
    name: "Минеральная вата Rockwool",
    category: "Изоляция",
    price: 890,
    rating: 4.9,
    reviews: 128,
    inStock: true,
    image:
      "https://cdn.poehali.dev/projects/957da87a-22f2-4490-82de-9f00287df06f/files/2262adeb-4d09-48e9-b163-2d142855e6b1.jpg",
    badge: "Топ выбор",
    description:
      "Минеральная вата ROCKWOOL для тепло- и звукоизоляции. Негорючий материал с отличными теплоизоляционными свойствами. Подходит для утепления стен, кровли, перекрытий.",
    specs: [
      { label: "Плотность", value: "50 кг/м³" },
      { label: "Толщина", value: "50 мм" },
      { label: "Размер", value: "1000x600 мм" },
      { label: "Теплопроводность", value: "0.037 Вт/(м·К)" },
      { label: "Группа горючести", value: "НГ (негорючий)" },
    ],
    warehouseStock: 156,
  },
  {
    id: 6,
    name: "Армат УТЕПЛЯЙка - MULTI - армир. клей для пенопл. и мин. ваты (25 кг)",
    category: "Цемент и смеси",
    price: 450,
    rating: 4.8,
    reviews: 94,
    inStock: false,
    image:
      "https://cdn.poehali.dev/projects/957da87a-22f2-4490-82de-9f00287df06f/files/9fe049a8-380c-4cad-a165-cbc018ff394a.jpg",
    description:
      "Универсальный армирующий клей для крепления и защиты пенополистирола и минеральной ваты. Высокая адгезия, морозостойкость, паропроницаемость.",
    specs: [
      { label: "Назначение", value: "Клей для утеплителя" },
      { label: "Вес", value: "25 кг" },
      { label: "Расход", value: "4-6 кг/м²" },
      { label: "Время высыхания", value: "24 часа" },
      { label: "Температура применения", value: "+5...+30°C" },
    ],
    warehouseStock: 0,
  },
  {
    id: 7,
    name: "Perfecta Штукатурка декоративная 2.5 mm (25 кг)",
    category: "Цемент и смеси",
    price: 1045,
    oldPrice: 1100,
    rating: 4.8,
    reviews: 142,
    inStock: true,
    image:
      "https://cdn.poehali.dev/projects/957da87a-22f2-4490-82de-9f00287df06f/files/75e9aa67-7bc4-4d87-b902-1bc0b37fefeb.jpg",
    badge: "Новинка",
    description:
      "Декоративная штукатурка 'короед' с зерном 2.5 мм. Создает красивую фактурную поверхность. Для внутренних и наружных работ. Паропроницаемая, морозостойкая.",
    specs: [
      { label: "Тип", value: "Короед" },
      { label: "Зерно", value: "2.5 мм" },
      { label: "Вес", value: "25 кг" },
      { label: "Расход", value: "3-4 кг/м²" },
      { label: "Основа", value: "Минеральная" },
    ],
    warehouseStock: 78,
  },
  {
    id: 8,
    name: "Карандаш WADFOW 7шт",
    category: "Инструменты",
    price: 100,
    rating: 4.5,
    reviews: 0,
    inStock: true,
    image:
      "https://cdn.poehali.dev/projects/957da87a-22f2-4490-82de-9f00287df06f/files/4aed0e6d-dd28-4c31-9ba7-a4dd1638b4d0.jpg",
    description:
      "Набор карандашей WADFOW из 7 штук. Качественные карандаши для разметки и чертежных работ.",
    warehouseStock: 153000,
  },
  {
    id: 9,
    name: "Карандаш малярный двухцветный 176 мм",
    category: "Инструменты",
    price: 100,
    rating: 4.5,
    reviews: 0,
    inStock: true,
    image:
      "https://cdn.poehali.dev/projects/957da87a-22f2-4490-82de-9f00287df06f/files/4aed0e6d-dd28-4c31-9ba7-a4dd1638b4d0.jpg",
    description:
      "Двухцветный малярный карандаш длиной 176 мм. Удобен для разметки на различных поверхностях.",
    warehouseStock: 34000,
  },
  {
    id: 10,
    name: "Карандаш столярный",
    category: "Инструменты",
    price: 100,
    rating: 4.5,
    reviews: 0,
    inStock: true,
    image:
      "https://cdn.poehali.dev/projects/957da87a-22f2-4490-82de-9f00287df06f/files/4aed0e6d-dd28-4c31-9ba7-a4dd1638b4d0.jpg",
    description:
      "Столярный карандаш для разметки по дереву. Прочный грифель, удобная форма.",
    warehouseStock: 113000,
  },
];

export const getProductById = (id: number): Product | undefined => {
  return products.find((p) => p.id === id);
};