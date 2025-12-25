import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

const Delivery = () => {
  const deliveryOptions = [
    {
      title: 'Экспресс-доставка',
      time: 'В день заказа',
      price: 'от 800₽',
      icon: 'Zap',
      features: ['До 19:00 в любую точку города', 'Приоритетная обработка заказа', 'SMS-уведомления']
    },
    {
      title: 'Стандартная доставка',
      time: '1-2 дня',
      price: 'от 500₽',
      icon: 'Truck',
      features: ['Удобное время доставки', 'Помощь при разгрузке', 'Бесплатно от 50 000₽']
    },
    {
      title: 'Самовывоз',
      time: 'В любое время',
      price: 'Бесплатно',
      icon: 'Store',
      features: ['3 пункта выдачи по городу', 'Работаем с 8:00 до 20:00', 'Помощь в загрузке']
    },
  ];

  const zones = [
    { zone: 'В пределах МКАД', price: '500₽', time: 'В день заказа' },
    { zone: 'До 10 км от МКАД', price: '800₽', time: '1 день' },
    { zone: 'До 30 км от МКАД', price: '1200₽', time: '1-2 дня' },
    { zone: 'До 50 км от МКАД', price: '1800₽', time: '2-3 дня' },
  ];

  return (
    <section id="delivery" className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4">Доставка и оплата</h2>
          <p className="text-lg text-muted-foreground">
            Быстрая доставка по городу и области
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {deliveryOptions.map((option, index) => (
            <Card
              key={index}
              className="p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-2 hover:border-primary animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="bg-primary/10 text-primary w-16 h-16 rounded-xl flex items-center justify-center mb-4">
                <Icon name={option.icon as any} size={32} />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">{option.title}</h3>
              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-3xl font-bold text-primary">{option.price}</span>
                <span className="text-muted-foreground">· {option.time}</span>
              </div>
              <ul className="space-y-2">
                {option.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <Icon name="Check" size={16} className="text-primary mt-0.5 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>

        <Tabs defaultValue="zones" className="max-w-4xl mx-auto">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="zones">Зоны доставки</TabsTrigger>
            <TabsTrigger value="payment">Способы оплаты</TabsTrigger>
          </TabsList>

          <TabsContent value="zones" className="mt-6">
            <Card className="p-6">
              <div className="space-y-4">
                {zones.map((zone, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <Icon name="MapPin" size={20} className="text-primary" />
                      <span className="font-semibold text-foreground">{zone.zone}</span>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="text-right">
                        <div className="text-sm text-muted-foreground">Стоимость</div>
                        <div className="font-bold text-primary">{zone.price}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-muted-foreground">Срок</div>
                        <div className="font-semibold text-foreground">{zone.time}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 p-4 bg-primary/10 rounded-lg flex items-start gap-3">
                <Icon name="Info" size={20} className="text-primary mt-0.5" />
                <p className="text-sm text-muted-foreground">
                  Бесплатная доставка при заказе от 50 000₽ в пределах 30 км от МКАД
                </p>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="payment" className="mt-6">
            <Card className="p-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-bold text-foreground flex items-center gap-2">
                    <Icon name="CreditCard" size={20} className="text-primary" />
                    Онлайн-оплата
                  </h4>
                  <ul className="space-y-3">
                    {['Банковские карты (Visa, MasterCard, МИР)', 'Яндекс.Касса', 'Электронные кошельки', 'Оплата по QR-коду'].map((method, i) => (
                      <li key={i} className="flex items-center gap-2 text-muted-foreground">
                        <Icon name="Check" size={16} className="text-primary" />
                        {method}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-4">
                  <h4 className="font-bold text-foreground flex items-center gap-2">
                    <Icon name="Wallet" size={20} className="text-primary" />
                    Другие способы
                  </h4>
                  <ul className="space-y-3">
                    {['Наличными курьеру', 'Наличными в пункте выдачи', 'Безналичный расчет для юр. лиц', 'Оплата по счету'].map((method, i) => (
                      <li key={i} className="flex items-center gap-2 text-muted-foreground">
                        <Icon name="Check" size={16} className="text-primary" />
                        {method}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default Delivery;
