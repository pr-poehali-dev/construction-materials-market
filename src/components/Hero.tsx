import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

const Hero = () => {
  return (
    <section id="home" className="pt-24 pb-16 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-6">
              <Icon name="TrendingUp" size={16} />
              <span className="text-sm font-semibold">Скидки до 30% на весь ассортимент</span>
            </div>
            
            <h1 className="text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
              Качественные стройматериалы для вашего проекта
            </h1>
            
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Широкий выбор товаров, профессиональные консультации и быстрая доставка. 
              Всё, что нужно для строительства и ремонта — в одном месте.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="text-lg px-8">
                <Icon name="ShoppingBag" size={20} className="mr-2" />
                Каталог товаров
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8">
                <Icon name="Calculator" size={20} className="mr-2" />
                Калькулятор стоимости
              </Button>
            </div>

            <div className="flex items-center gap-8 mt-12">
              <div>
                <div className="text-3xl font-bold text-primary">15+</div>
                <div className="text-sm text-muted-foreground">лет на рынке</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-secondary">5000+</div>
                <div className="text-sm text-muted-foreground">товаров</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary">10000+</div>
                <div className="text-sm text-muted-foreground">клиентов</div>
              </div>
            </div>
          </div>

          <div className="relative animate-scale-in">
            <div className="absolute -top-4 -right-4 w-72 h-72 bg-primary/20 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-4 -left-4 w-72 h-72 bg-secondary/20 rounded-full blur-3xl"></div>
            
            <img
              src="https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80"
              alt="Строительные материалы"
              className="relative rounded-2xl shadow-2xl w-full h-[500px] object-cover"
            />

            <div className="absolute bottom-8 left-8 right-8 bg-white/95 backdrop-blur-sm rounded-xl p-6 shadow-xl">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Популярно сегодня</div>
                  <div className="text-lg font-bold text-foreground">Пенопласт
</div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-primary">450₽</div>
                  <div className="text-xs text-muted-foreground">за мешок 50кг</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;