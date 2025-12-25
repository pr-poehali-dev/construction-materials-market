import Icon from '@/components/ui/icon';
import { Separator } from '@/components/ui/separator';

const Footer = () => {
  const footerLinks = {
    company: [
      { label: 'О компании', href: '#about' },
      { label: 'Вакансии', href: '#' },
      { label: 'Новости', href: '#' },
      { label: 'Партнеры', href: '#' },
    ],
    catalog: [
      { label: 'Кирпич и блоки', href: '#catalog' },
      { label: 'Цемент', href: '#catalog' },
      { label: 'Пиломатериалы', href: '#catalog' },
      { label: 'Инструменты', href: '#catalog' },
    ],
    help: [
      { label: 'Доставка', href: '#delivery' },
      { label: 'Оплата', href: '#delivery' },
      { label: 'Гарантия', href: '#' },
      { label: 'Возврат', href: '#' },
    ],
    contacts: [
      { label: 'Контакты', href: '#contacts' },
      { label: 'Блог', href: '#blog' },
      { label: 'Отзывы', href: '#' },
      { label: 'FAQ', href: '#' },
    ],
  };

  return (
    <footer className="bg-foreground text-background">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-primary text-white p-2 rounded-lg">
                <Icon name="Hammer" size={24} />
              </div>
              <div>
                <h3 className="text-lg font-bold">СтройМаркет</h3>
                <p className="text-xs text-background/70">С 2009 года</p>
              </div>
            </div>
            <p className="text-sm text-background/70 mb-4">
              Надежный поставщик качественных строительных материалов
            </p>
            <div className="flex gap-3">
              {['MessageCircle', 'Phone', 'Mail'].map((icon, i) => (
                <button
                  key={i}
                  className="w-10 h-10 bg-background/10 hover:bg-primary rounded-lg flex items-center justify-center transition-colors"
                >
                  <Icon name={icon as any} size={18} />
                </button>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-4">Компания</h4>
            <ul className="space-y-2">
              {footerLinks.company.map((link, i) => (
                <li key={i}>
                  <a
                    href={link.href}
                    className="text-sm text-background/70 hover:text-primary transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Каталог</h4>
            <ul className="space-y-2">
              {footerLinks.catalog.map((link, i) => (
                <li key={i}>
                  <a
                    href={link.href}
                    className="text-sm text-background/70 hover:text-primary transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Помощь</h4>
            <ul className="space-y-2">
              {footerLinks.help.map((link, i) => (
                <li key={i}>
                  <a
                    href={link.href}
                    className="text-sm text-background/70 hover:text-primary transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Информация</h4>
            <ul className="space-y-2">
              {footerLinks.contacts.map((link, i) => (
                <li key={i}>
                  <a
                    href={link.href}
                    className="text-sm text-background/70 hover:text-primary transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Separator className="bg-background/20 mb-8" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4 text-sm text-background/70">
            <span>© 2024 СтройМаркет</span>
            <a href="#" className="hover:text-primary transition-colors">
              Политика конфиденциальности
            </a>
            <a href="#" className="hover:text-primary transition-colors">
              Условия использования
            </a>
          </div>

          <div className="flex items-center gap-2">
            <Icon name="CreditCard" size={24} className="text-background/70" />
            <Icon name="Smartphone" size={24} className="text-background/70" />
            <Icon name="Wallet" size={24} className="text-background/70" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
