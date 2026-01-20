import { createContext, useContext, useState, ReactNode } from 'react';
import { useToast } from '@/hooks/use-toast';

export interface FavoriteItem {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  inStock?: boolean;
}

interface FavoritesContextType {
  favorites: FavoriteItem[];
  addToFavorites: (product: FavoriteItem) => void;
  removeFromFavorites: (id: number) => void;
  isFavorite: (id: number) => boolean;
  totalFavorites: number;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);
  const { toast } = useToast();

  const addToFavorites = (product: FavoriteItem) => {
    setFavorites((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev;
      }
      toast({
        title: "Добавлено в избранное",
        description: product.name,
      });
      return [...prev, product];
    });
  };

  const removeFromFavorites = (id: number) => {
    setFavorites((prev) => prev.filter((item) => item.id !== id));
    toast({
      title: "Удалено из избранного",
      variant: "destructive",
    });
  };

  const isFavorite = (id: number) => {
    return favorites.some((item) => item.id === id);
  };

  const totalFavorites = favorites.length;

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        addToFavorites,
        removeFromFavorites,
        isFavorite,
        totalFavorites,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within FavoritesProvider');
  }
  return context;
};
