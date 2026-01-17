import { useParams, useNavigate } from "react-router-dom";
import { getProductById, products, Product } from "@/data/products";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import Icon from "@/components/ui/icon";
import { useCart } from "@/contexts/CartContext";
import { useViewHistory } from "@/contexts/ViewHistoryContext";
import { useState, useEffect } from "react";

const ProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { viewHistory, addToHistory } = useViewHistory();
  const [quantity, setQuantity] = useState(1);
  const [recommendations, setRecommendations] = useState<Product[]>([]);
  const [loadingRecommendations, setLoadingRecommendations] = useState(true);

  const product = getProductById(Number(id));

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold mb-4">Товар не найден</h1>
        <Button onClick={() => navigate("/catalog")}>
          Вернуться в каталог
        </Button>
      </div>
    );
  }

  useEffect(() => {
    if (!product) return;

    addToHistory(product);

    const fetchRecommendations = async () => {
      setLoadingRecommendations(true);
      try {
        const response = await fetch(
          "https://functions.poehali.dev/5df99392-fb30-48dc-9816-f3caa52663d4",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              productName: product.name,
              category: product.category,
              products: products,
            }),
          }
        );

        const data = await response.json();
        setRecommendations(data.recommendations || []);
      } catch (error) {
        console.error("Error fetching recommendations:", error);
        const similar = products.filter(
          (p) => p.category === product.category && p.id !== product.id
        );
        setRecommendations(similar.slice(0, 4));
      } finally {
        setLoadingRecommendations(false);
      }
    };

    fetchRecommendations();
  }, [product, addToHistory]);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pt-24 pb-12">
      <div className="container mx-auto px-4">
        <Button
          variant="ghost"
          className="mb-6"
          onClick={() => navigate("/catalog")}
        >
          <Icon name="ArrowLeft" size={20} className="mr-2" />
          Назад в каталог
        </Button>

        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <Card className="overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-[500px] object-cover"
              />
            </Card>
          </div>

          <div>
            <div className="flex items-start gap-3 mb-4">
              <h1 className="text-3xl font-bold flex-1">{product.name}</h1>
              {product.badge && (
                <Badge className="bg-orange-500 text-white">
                  {product.badge}
                </Badge>
              )}
            </div>

            <div className="flex items-center gap-2 mb-4">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Icon
                    key={i}
                    name="Star"
                    size={20}
                    className={
                      i < Math.floor(product.rating)
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300"
                    }
                  />
                ))}
              </div>
              <span className="text-sm text-gray-600">
                {product.rating} ({product.reviews} отзывов)
              </span>
            </div>

            <div className="mb-6">
              <div className="flex items-baseline gap-3">
                <span className="text-4xl font-bold text-orange-500">
                  {product.price} ₽
                </span>
                {product.oldPrice && (
                  <span className="text-xl text-gray-400 line-through">
                    {product.oldPrice} ₽
                  </span>
                )}
              </div>
              {product.oldPrice && (
                <span className="text-sm text-green-600 font-medium">
                  Экономия {product.oldPrice - product.price} ₽
                </span>
              )}
            </div>

            <Card className="p-4 mb-6">
              <div className="flex items-center gap-3">
                <Icon
                  name={product.inStock ? "CheckCircle" : "XCircle"}
                  size={24}
                  className={product.inStock ? "text-green-500" : "text-red-500"}
                />
                <div className="flex-1">
                  <p
                    className={`font-semibold ${
                      product.inStock ? "text-green-700" : "text-red-700"
                    }`}
                  >
                    {product.inStock ? "В наличии" : "Нет в наличии"}
                  </p>
                  {product.inStock && product.warehouseStock && (
                    <p className="text-sm text-gray-600">
                      На складе: {product.warehouseStock} шт.
                    </p>
                  )}
                </div>
              </div>
            </Card>

            <div className="flex gap-3 mb-8">
              <div className="flex items-center border rounded-lg">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={!product.inStock}
                >
                  <Icon name="Minus" size={16} />
                </Button>
                <span className="px-4 font-semibold">{quantity}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setQuantity(quantity + 1)}
                  disabled={!product.inStock}
                >
                  <Icon name="Plus" size={16} />
                </Button>
              </div>
              <Button
                className="flex-1 bg-orange-500 hover:bg-orange-600"
                size="lg"
                onClick={handleAddToCart}
                disabled={!product.inStock}
              >
                <Icon name="ShoppingCart" size={20} className="mr-2" />
                Добавить в корзину
              </Button>
            </div>

            <Card className="p-6 mb-6">
              <h2 className="text-xl font-bold mb-3">Описание</h2>
              <p className="text-gray-700 leading-relaxed">
                {product.description}
              </p>
            </Card>

            {product.specs && product.specs.length > 0 && (
              <Card className="p-6">
                <h2 className="text-xl font-bold mb-4">Характеристики</h2>
                <div className="space-y-3">
                  {product.specs.map((spec, index) => (
                    <div
                      key={index}
                      className="flex justify-between py-2 border-b last:border-b-0"
                    >
                      <span className="text-gray-600">{spec.label}</span>
                      <span className="font-semibold">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </Card>
            )}
          </div>
        </div>

        {/* Раздел с рекомендациями */}
        {recommendations.length > 0 && (
          <div className="mt-12">
            <div className="flex items-center gap-3 mb-6">
              <Icon name="Sparkles" size={28} className="text-orange-500" />
              <h2 className="text-2xl font-bold">
                С этим товаром обычно покупают
              </h2>
            </div>

            {loadingRecommendations ? (
              <div className="text-center py-8">
                <Icon
                  name="Loader2"
                  size={40}
                  className="animate-spin text-orange-500 mx-auto"
                />
                <p className="text-gray-600 mt-4">Подбираем товары...</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {recommendations.map((rec) => (
                  <Card
                    key={rec.id}
                    className="group overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer"
                    onClick={() => navigate(`/product/${rec.id}`)}
                  >
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={rec.image}
                        alt={rec.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      {rec.badge && (
                        <Badge className="absolute top-3 right-3 bg-orange-500 text-white">
                          {rec.badge}
                        </Badge>
                      )}
                    </div>
                    <div className="p-4">
                      <div className="text-xs text-muted-foreground mb-1">
                        {rec.category}
                      </div>
                      <h3 className="font-bold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                        {rec.name}
                      </h3>
                      <div className="flex items-center gap-2 mb-3">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Icon
                              key={i}
                              name="Star"
                              size={14}
                              className={
                                i < Math.floor(rec.rating)
                                  ? "fill-yellow-400 text-yellow-400"
                                  : "text-gray-300"
                              }
                            />
                          ))}
                        </div>
                        <span className="text-xs text-gray-600">
                          {rec.rating}
                        </span>
                      </div>
                      <div className="flex items-baseline gap-2 mb-3">
                        <span className="text-xl font-bold text-orange-500">
                          {rec.price} ₽
                        </span>
                        {rec.oldPrice && (
                          <span className="text-sm text-gray-400 line-through">
                            {rec.oldPrice} ₽
                          </span>
                        )}
                      </div>
                      <Button
                        className="w-full"
                        size="sm"
                        disabled={!rec.inStock}
                        onClick={(e) => {
                          e.stopPropagation();
                          addToCart(rec);
                        }}
                      >
                        <Icon name="ShoppingCart" size={16} className="mr-2" />
                        В корзину
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}

        {/* История просмотров */}
        {viewHistory.length > 1 && (
          <div className="mt-12">
            <div className="flex items-center gap-3 mb-6">
              <Icon name="History" size={28} className="text-orange-500" />
              <h2 className="text-2xl font-bold">Вы недавно смотрели</h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {viewHistory
                .filter((item) => item.id !== product.id)
                .slice(0, 4)
                .map((item) => (
                  <Card
                    key={item.id}
                    className="group overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer"
                    onClick={() => navigate(`/product/${item.id}`)}
                  >
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      {item.badge && (
                        <Badge className="absolute top-3 right-3 bg-orange-500 text-white">
                          {item.badge}
                        </Badge>
                      )}
                    </div>
                    <div className="p-4">
                      <div className="text-xs text-muted-foreground mb-1">
                        {item.category}
                      </div>
                      <h3 className="font-bold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                        {item.name}
                      </h3>
                      <div className="flex items-center gap-2 mb-3">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Icon
                              key={i}
                              name="Star"
                              size={14}
                              className={
                                i < Math.floor(item.rating)
                                  ? "fill-yellow-400 text-yellow-400"
                                  : "text-gray-300"
                              }
                            />
                          ))}
                        </div>
                        <span className="text-xs text-gray-600">
                          {item.rating}
                        </span>
                      </div>
                      <div className="flex items-baseline gap-2 mb-3">
                        <span className="text-xl font-bold text-orange-500">
                          {item.price} ₽
                        </span>
                        {item.oldPrice && (
                          <span className="text-sm text-gray-400 line-through">
                            {item.oldPrice} ₽
                          </span>
                        )}
                      </div>
                      <Button
                        className="w-full"
                        size="sm"
                        disabled={!item.inStock}
                        onClick={(e) => {
                          e.stopPropagation();
                          addToCart(item);
                        }}
                      >
                        <Icon name="ShoppingCart" size={16} className="mr-2" />
                        В корзину
                      </Button>
                    </div>
                  </Card>
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductPage;