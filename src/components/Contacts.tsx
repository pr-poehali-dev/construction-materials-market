import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Icon from "@/components/ui/icon";

const Contacts = () => {
  const contactInfo = [
    {
      icon: "Phone",
      title: "Телефон",
      value: "+7 978 799 49 90",
      link: "tel:+74951234567",
    },
    {
      icon: "Mail",
      title: "Email",
      value: "info@stroymarket.ru",
      link: "mailto:info@stroymarket.ru",
    },
    {
      icon: "MapPin",
      title: "Адрес",
      value: "г. Симферополь, ул. Элеваторная, 4",
      link: "#",
    },
    {
      icon: "Clock",
      title: "Режим работы",
      value: "Пн-Пт: 8:00-17:00, Сб: 8:00-13:00",
      link: "#",
    },
  ];

  const socialLinks = [
    { icon: "MessageCircle", name: "Telegram", color: "bg-blue-500" },
    { icon: "Phone", name: "WhatsApp", color: "bg-green-500" },
    { icon: "Send", name: "VK", color: "bg-blue-600" },
  ];

  return (
    <section id="contacts" className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4">Контакты</h2>
          <p className="text-lg text-muted-foreground">
            Свяжитесь с нами любым удобным способом
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <h3 className="text-2xl font-bold text-foreground mb-6">
              Наши контакты
            </h3>

            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              {contactInfo.map((item, index) => (
                <Card
                  key={index}
                  className="p-5 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 animate-fade-in"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="flex items-start gap-3">
                    <div className="bg-primary/10 text-primary w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon name={item.icon as any} size={20} />
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground mb-1">
                        {item.title}
                      </div>
                      <a
                        href={item.link}
                        className="text-sm font-semibold text-foreground hover:text-primary transition-colors"
                      >
                        {item.value}
                      </a>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            <div className="mb-8">
              <h4 className="text-lg font-bold text-foreground mb-4">
                Мы в соцсетях
              </h4>
              <div className="flex gap-3">
                {socialLinks.map((social, index) => (
                  <button
                    key={index}
                    className={`${social.color} text-white w-12 h-12 rounded-xl flex items-center justify-center hover:scale-110 transition-transform`}
                  >
                    <Icon name={social.icon as any} size={20} />
                  </button>
                ))}
              </div>
            </div>

            <Card className="p-6 bg-muted/50">
              <h4 className="text-lg font-bold text-foreground mb-3 flex items-center gap-2">
                <Icon name="MapPin" size={20} className="text-primary" />
                Наши склады
              </h4>
              <div className="space-y-3 text-sm text-muted-foreground">
                <p>📍 г. Симферополь, ул. Элеваторная 4</p>
                <p>📍г. Керчь, ул Мирошника 57</p>
                <p></p>
              </div>
            </Card>
          </div>

          <div>
            <Card className="p-8">
              <h3 className="text-2xl font-bold text-foreground mb-2">
                Напишите нам
              </h3>
              <p className="text-muted-foreground mb-6">
                Задайте вопрос или оставьте заявку — мы ответим в течение часа
              </p>

              <form className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Ваше имя
                    </label>
                    <Input placeholder="Иван Иванов" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Телефон
                    </label>
                    <Input placeholder="+7 (___) ___-__-__" />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Email
                  </label>
                  <Input type="email" placeholder="your@email.com" />
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Сообщение
                  </label>
                  <Textarea
                    placeholder="Расскажите, чем мы можем помочь..."
                    rows={5}
                  />
                </div>

                <Button className="w-full" size="lg">
                  <Icon name="Send" size={18} className="mr-2" />
                  Отправить сообщение
                </Button>

                <p className="text-xs text-muted-foreground text-center">
                  Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности
                </p>
              </form>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contacts;
