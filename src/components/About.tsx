import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

const About = () => {
  const advantages = [
    {
      icon: 'Shield',
      title: 'Гарантия качества',
      description: 'Все товары сертифицированы и соответствуют ГОСТам'
    },
    {
      icon: 'Truck',
      title: 'Быстрая доставка',
      description: 'Доставим материалы в день заказа по городу'
    },
    {
      icon: 'Headphones',
      title: 'Консультации',
      description: 'Профессиональная помощь в подборе материалов'
    },
    {
      icon: 'Percent',
      title: 'Выгодные цены',
      description: 'Работаем напрямую с производителями'
    },
  ];

  return (
    <section id="about" className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 className="text-4xl font-bold text-foreground mb-6">О компании СтройМаркет</h2>
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              Мы работаем на рынке строительных материалов уже более 15 лет. За это время мы 
              построили крепкие отношения с ведущими производителями и заслужили доверие 
              тысяч клиентов.
            </p>
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              Наша миссия — обеспечить каждого строителя качественными материалами по 
              справедливым ценам. Мы постоянно расширяем ассортимент и улучшаем сервис, 
              чтобы вам было удобно работать с нами.
            </p>
            <div className="flex items-center gap-4">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map(i => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary border-2 border-white"
                  />
                ))}
              </div>
              <div>
                <div className="text-sm font-semibold text-foreground">Команда из 20+ специалистов</div>
                <div className="text-xs text-muted-foreground">готовы помочь вам 24/7</div>
              </div>
            </div>
          </div>

          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80"
              alt="О компании"
              className="rounded-2xl shadow-2xl w-full h-[400px] object-cover"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {advantages.map((item, index) => (
            <Card
              key={index}
              className="p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="bg-primary/10 text-primary w-14 h-14 rounded-xl flex items-center justify-center mb-4">
                <Icon name={item.icon as any} size={28} />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">{item.title}</h3>
              <p className="text-muted-foreground">{item.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;