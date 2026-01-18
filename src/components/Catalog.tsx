import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Icon from "@/components/ui/icon";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/contexts/CartContext";
import { products } from "@/data/products";

const Catalog = () => {
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const [priceRange, setPriceRange] = useState([0, 50000]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    "Газобетон",
    "Цемент и смеси",
    "Пиломатериалы",
    "Электроинструмент",
    "Инструмент",
    "Канализация",
    "Фильтрация",
    "Кровля",
    "Изоляция",
    "Насосное оборудование",
    "Теплый пол",
    "Лакокрасочные материалы",
    "Асбестцементные трубы",
    "Утеплители",
    "Электрика",
  ];

       

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category],
    );
  };

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategories.length === 0 ||
      selectedCategories.includes(product.category);
    const matchesPrice =
      product.price >= priceRange[0] && product.price <= priceRange[1];
    return matchesSearch && matchesCategory && matchesPrice;
  });

  return (
    <section id="catalog" className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Каталог товаров
          </h2>
          <p className="text-lg text-muted-foreground">
            Более 5000 товаров со склада и под заказ
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          <aside className="lg:col-span-1">
            <Card className="p-6 sticky top-24">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                Фильтры:
              </h3>

              <div className="space-y-6">
                <div>
                  <label className="text-sm font-semibold mb-3 block">
                    Поиск
                  </label>
                  <div className="relative">
                    <Icon
                      name="Search"
                      size={18}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                    />
                    <Input
                      placeholder="Найти товар..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-semibold mb-3 block">
                    Цена: {priceRange[0]}₽ - {priceRange[1]}₽
                  </label>
                  <Slider
                    value={priceRange}
                    onValueChange={setPriceRange}
                    max={50000}
                    step={100}
                    className="mb-2"
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold mb-3 block">
                    Категории
                  </label>
                  <div className="space-y-3">
                    {categories.map((category) => (
                      <div key={category} className="flex items-center gap-2">
                        <Checkbox
                          id={category}
                          checked={selectedCategories.includes(category)}
                          onCheckedChange={() => toggleCategory(category)}
                        />
                        <label
                          htmlFor={category}
                          className="text-sm cursor-pointer hover:text-primary transition-colors"
                        >
                          {category}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => {
                    setSelectedCategories([]);
                    setPriceRange([0, 50000]);
                    setSearchQuery("");
                  }}
                >
                  <Icon name="X" size={16} className="mr-2" />
                  Сбросить фильтры
                </Button>
              </div>
            </Card>
          </aside>

          <div className="lg:col-span-3">
            <div className="flex items-center justify-between mb-6">
              <p className="text-muted-foreground">
                Найдено товаров:{" "}
                <span className="font-semibold text-foreground">
                  {filteredProducts.length}
                </span>
              </p>
              <Select defaultValue="popular">
                <SelectTrigger className="w-[200px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="popular">По популярности</SelectItem>
                  <SelectItem value="price-asc">
                    Цена: по возрастанию
                  </SelectItem>
                  <SelectItem value="price-desc">Цена: по убыванию</SelectItem>
                  <SelectItem value="rating">По рейтингу</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredProducts.map((product, index) => (
                <Card
                  key={product.id}
                  className="group overflow-hidden hover:shadow-xl transition-all duration-300 animate-fade-in"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div 
                    className="relative h-64 overflow-hidden cursor-pointer"
                    onClick={() => navigate(`/product/${product.id}`)}
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    {product.badge && (
                      <Badge className="absolute top-3 left-3 bg-primary text-white">
                        {product.badge}
                      </Badge>
                    )}
                    {!product.inStock && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <span className="text-white font-semibold bg-destructive px-4 py-2 rounded-lg">
                          Нет в наличии
                        </span>
                      </div>
                    )}
                    <Button
                      size="icon"
                      variant="secondary"
                      className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Icon name="Heart" size={18} />
                    </Button>
                  </div>

                  <div className="p-5">
                    <div className="text-xs text-muted-foreground mb-2">
                      {product.category}
                    </div>
                    <h3 
                      className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors cursor-pointer"
                      onClick={() => navigate(`/product/${product.id}`)}
                    >
                      {product.name}
                    </h3>

                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex items-center gap-1">
                        <Icon
                          name="Star"
                          size={14}
                          className="fill-yellow-400 text-yellow-400"
                        />
                        <span className="text-sm font-semibold">
                          {product.rating}
                        </span>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        ({product.reviews} отзывов)
                      </span>
                    </div>

                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <div className="text-2xl font-bold text-primary">
                          {product.price}₽
                        </div>
                        {product.oldPrice && (
                          <div className="text-sm text-muted-foreground line-through">
                            {product.oldPrice}₽
                          </div>
                        )}
                      </div>
                      {product.oldPrice && (
                        <Badge variant="destructive">
                          -
                          {Math.round(
                            (1 - product.price / product.oldPrice) * 100,
                          )}
                          %
                        </Badge>
                      )}
                    </div>

                    <Button 
                      className="w-full" 
                      disabled={!product.inStock}
                      onClick={() => addToCart({
                        id: product.id,
                        name: product.name,
                        price: product.price,
                        image: product.image,
                      })}
                    >
                      <Icon name="ShoppingCart" size={18} className="mr-2" />
                      В корзину
                    </Button>
                  </div>
                </Card>
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-16">
                <Icon
                  name="PackageX"
                  size={64}
                  className="mx-auto text-muted-foreground mb-4"
                />
                <h3 className="text-xl font-bold text-foreground mb-2">
                  Товары не найдены
                </h3>
                <p className="text-muted-foreground">
                  Попробуйте изменить параметры фильтрации
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Catalog;