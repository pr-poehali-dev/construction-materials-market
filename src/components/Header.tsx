import { useState } from 'react';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';
import Cart from './Cart';
import Favorites from './Favorites';

const Header = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [showSearch, setShowSearch] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const menuItems = [
    { id: 'home', label: 'Главная', icon: 'Home' },
    { id: 'catalog', label: 'Каталог', icon: 'ShoppingBag' },
    { id: 'about', label: 'О компании', icon: 'Info' },
    { id: 'delivery', label: 'Доставка', icon: 'Truck' },
    { id: 'contacts', label: 'Контакты', icon: 'Phone' },
  ];

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSearch = () => {
    if (searchValue.trim()) {
      scrollToSection('catalog');
      setTimeout(() => {
        const catalogSearchInput = document.querySelector('#catalog input[placeholder="Найти товар..."]') as HTMLInputElement;
        if (catalogSearchInput) {
          catalogSearchInput.value = searchValue;
          catalogSearchInput.dispatchEvent(new Event('input', { bubbles: true }));
        }
      }, 500);
      setShowSearch(false);
      setSearchValue('');
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-primary text-primary-foreground p-2 rounded-lg">
              <Icon name="Hammer" size={24} />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">ПроСтрой</h1>
              <p className="text-xs text-muted-foreground">Всё для строительства</p>
            </div>
          </div>

          <nav className="hidden lg:flex items-center gap-6">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary ${
                  activeSection === item.id ? 'text-primary' : 'text-foreground'
                }`}
              >
                <Icon name={item.icon as any} size={16} />
                {item.label}
              </button>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            {showSearch ? (
              <div className="flex items-center gap-2 animate-fade-in">
                <Input
                  type="text"
                  placeholder="Поиск товаров..."
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                  className="w-64"
                  autoFocus
                />
                <Button variant="default" size="icon" onClick={handleSearch}>
                  <Icon name="Search" size={20} />
                </Button>
                <Button variant="ghost" size="icon" onClick={() => {
                  setShowSearch(false);
                  setSearchValue('');
                }}>
                  <Icon name="X" size={20} />
                </Button>
              </div>
            ) : (
              <Button variant="ghost" size="icon" onClick={() => setShowSearch(true)}>
                <Icon name="Search" size={20} />
              </Button>
            )}
            <Favorites />
            <Cart />
          </div>

          <Sheet>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="outline" size="icon">
                <Icon name="Menu" size={24} />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px]">
              <nav className="flex flex-col gap-4 mt-8">
                {menuItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`flex items-center gap-3 p-3 rounded-lg transition-colors hover:bg-muted ${
                      activeSection === item.id ? 'bg-primary/10 text-primary' : 'text-foreground'
                    }`}
                  >
                    <Icon name={item.icon as any} size={20} />
                    <span className="font-medium">{item.label}</span>
                  </button>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;