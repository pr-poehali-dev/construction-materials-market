import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

const Categories = () => {
  const categories = [
    {
      id: 1,
      name: 'Кирпич и блоки',
      icon: 'Square',
      itemCount: 245,
      color: 'bg-orange-500',
      image: 'https://images.unsplash.com/photo-1583207458417-6b5e149d8daf?auto=format&fit=crop&w=400&q=80'
    },
    {
      id: 2,
      name: 'Цемент и смеси',
      icon: 'Package',
      itemCount: 189,
      color: 'bg-blue-500',
      image: 'https://images.unsplash.com/photo-1607400201515-c2c41c07d307?auto=format&fit=crop&w=400&q=80'
    },
    {
      id: 3,
      name: 'Пиломатериалы',
      icon: 'TreePine',
      itemCount: 312,
      color: 'bg-amber-600',
      image: 'https://images.unsplash.com/photo-1551127481-43279ba57b60?auto=format&fit=crop&w=400&q=80'
    },
    {
      id: 4,
      name: 'Металлопрокат',
      icon: 'Drill',
      itemCount: 156,
      color: 'bg-slate-600',
      image: 'https://images.unsplash.com/photo-1565114887173-de0e2182f7e8?auto=format&fit=crop&w=400&q=80'
    },
    {
      id: 5,
      name: 'Кровля',
      icon: 'Home',
      itemCount: 278,
      color: 'bg-red-600',
      image: 'https://images.unsplash.com/photo-1601648764658-cf37e8c89b70?auto=format&fit=crop&w=400&q=80'
    },
    {
      id: 6,
      name: 'Изоляция',
      icon: 'Layers',
      itemCount: 198,
      color: 'bg-teal-500',
      image: 'https://images.unsplash.com/photo-1581094651181-35942459ef62?auto=format&fit=crop&w=400&q=80'
    },
    {
      id: 7,
      name: 'Инструменты',
      icon: 'Wrench',
      itemCount: 534,
      color: 'bg-yellow-500',
      image: 'https://images.unsplash.com/photo-1581094271901-8022df4466f9?auto=format&fit=crop&w=400&q=80'
    },
    {
      id: 8,
      name: 'Отделка',
      icon: 'Paintbrush',
      itemCount: 421,
      color: 'bg-purple-500',
      image: 'https://images.unsplash.com/photo-1562259949-e8e7689d7828?auto=format&fit=crop&w=400&q=80'
    },
  ];

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4">Популярные категории</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Выберите категорию и найдите всё необходимое для вашего проекта
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <Card
              key={category.id}
              className="group cursor-pointer overflow-hidden border-2 border-transparent hover:border-primary transition-all duration-300 hover:shadow-xl hover-scale"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className={`absolute top-4 right-4 ${category.color} p-3 rounded-lg text-white`}>
                  <Icon name={category.icon as any} size={24} />
                </div>
              </div>

              <div className="p-5">
                <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {category.name}
                </h3>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">{category.itemCount} товаров</span>
                  <Icon name="ArrowRight" size={18} className="text-primary group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
