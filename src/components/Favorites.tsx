import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import Icon from '@/components/ui/icon';
import { Badge } from '@/components/ui/badge';
import { useFavorites } from '@/contexts/FavoritesContext';
import { useCart } from '@/contexts/CartContext';
import { useNavigate } from 'react-router-dom';

const Favorites = () => {
  const { favorites, removeFromFavorites, totalFavorites } = useFavorites();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const handleAddToCart = (product: any) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
    });
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Icon name="Heart" size={20} />
          {totalFavorites > 0 && (
            <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs">
              {totalFavorites}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <Icon name="Heart" size={24} className="text-primary" />
            Избранное
            {totalFavorites > 0 && (
              <Badge variant="secondary">{totalFavorites}</Badge>
            )}
          </SheetTitle>
        </SheetHeader>

        <div className="mt-8 space-y-4">
          {favorites.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="bg-muted rounded-full p-6 mb-4">
                <Icon name="Heart" size={48} className="text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Избранное пусто</h3>
              <p className="text-sm text-muted-foreground mb-6">
                Добавляйте товары, которые вам нравятся
              </p>
            </div>
          ) : (
            favorites.map((item) => (
              <div
                key={item.id}
                className="flex gap-4 p-4 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded-md cursor-pointer"
                  onClick={() => navigate(`/product/${item.id}`)}
                />
                <div className="flex-1 min-w-0">
                  <h4 
                    className="font-semibold text-sm mb-1 line-clamp-2 cursor-pointer hover:text-primary transition-colors"
                    onClick={() => navigate(`/product/${item.id}`)}
                  >
                    {item.name}
                  </h4>
                  <p className="text-xs text-muted-foreground mb-2">
                    {item.category}
                  </p>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-lg font-bold text-primary">
                      {item.price.toLocaleString()}₽
                    </span>
                    {item.inStock === false && (
                      <Badge variant="destructive" className="text-xs">
                        Нет в наличии
                      </Badge>
                    )}
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => removeFromFavorites(item.id)}
                    className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                  >
                    <Icon name="Trash2" size={16} />
                  </Button>
                  {item.inStock !== false && (
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => handleAddToCart(item)}
                      className="h-8 w-8"
                    >
                      <Icon name="ShoppingCart" size={16} />
                    </Button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default Favorites;
