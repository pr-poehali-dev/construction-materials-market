import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

const Blog = () => {
  const articles = [
    {
      id: 1,
      title: 'Как выбрать цемент для фундамента',
      excerpt: 'Разбираемся в марках цемента и их применении. Какой цемент подойдет для вашего проекта?',
      category: 'Советы',
      date: '15 декабря 2024',
      readTime: '5 мин',
      image: 'https://images.unsplash.com/photo-1607400201889-565b1ee75f8e?auto=format&fit=crop&w=800&q=80',
      author: 'Дмитрий Строев'
    },
    {
      id: 2,
      title: 'Топ-5 ошибок при выборе кирпича',
      excerpt: 'Самые распространенные ошибки при покупке кирпича и как их избежать.',
      category: 'Обзоры',
      date: '12 декабря 2024',
      readTime: '7 мин',
      image: 'https://images.unsplash.com/photo-1583207458417-6b5e149d8daf?auto=format&fit=crop&w=800&q=80',
      author: 'Анна Мастерова'
    },
    {
      id: 3,
      title: 'Зимнее строительство: особенности',
      excerpt: 'Что нужно знать о строительстве в холодное время года. Советы профессионалов.',
      category: 'Гайды',
      date: '10 декабря 2024',
      readTime: '10 мин',
      image: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80',
      author: 'Игорь Строителев'
    },
  ];

  return (
    <section id="blog" className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-4xl font-bold text-foreground mb-2">Блог</h2>
            <p className="text-lg text-muted-foreground">
              Полезные статьи о строительстве и материалах
            </p>
          </div>
          <Button variant="outline" className="hidden md:flex">
            Все статьи
            <Icon name="ArrowRight" size={16} className="ml-2" />
          </Button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article, index) => (
            <Card
              key={article.id}
              className="group cursor-pointer overflow-hidden hover:shadow-xl transition-all duration-300 animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="relative h-56 overflow-hidden">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <Badge className="absolute top-4 left-4 bg-white text-foreground">
                  {article.category}
                </Badge>
              </div>

              <div className="p-6">
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                  <div className="flex items-center gap-1">
                    <Icon name="Calendar" size={14} />
                    <span>{article.date}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Icon name="Clock" size={14} />
                    <span>{article.readTime}</span>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors line-clamp-2">
                  {article.title}
                </h3>

                <p className="text-muted-foreground mb-4 line-clamp-2">
                  {article.excerpt}
                </p>

                <div className="flex items-center justify-between pt-4 border-t">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary"></div>
                    <span className="text-sm font-medium text-foreground">{article.author}</span>
                  </div>
                  <Button variant="ghost" size="sm">
                    Читать
                    <Icon name="ArrowRight" size={14} className="ml-1 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="text-center mt-8 md:hidden">
          <Button variant="outline">
            Все статьи
            <Icon name="ArrowRight" size={16} className="ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Blog;
