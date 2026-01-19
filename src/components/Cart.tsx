import { useState } from 'react';
import { useCart } from '@/contexts/CartContext';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

const Cart = () => {
  const { items, removeFromCart, updateQuantity, clearCart, totalItems, totalPrice } = useCart();
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    comment: '',
    deliveryType: 'standard',
    deliveryDate: '',
    deliveryTime: '',
    productRequest: '',
  });

  const deliveryCost = formData.deliveryType === 'pickup' ? 0 : 
                       formData.deliveryType === 'express' ? 2100 : 1800;
  const isFreeDelivery = totalPrice >= 75000;
  const finalDeliveryCost = isFreeDelivery ? 0 : deliveryCost;
  const finalTotal = totalPrice + finalDeliveryCost;

  const hasStockIssues = items.some(item => item.stock && item.quantity > item.stock);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (hasStockIssues) {
      toast({
        title: "Невозможно оформить заказ",
        description: "Проверьте количество товаров в корзине - превышено наличие на складе",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('https://functions.poehali.dev/c586c98b-e013-4b6b-8063-e0103c9781b4', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customer: formData,
          items: items,
          total: totalPrice,
          deliveryCost: finalDeliveryCost,
          finalTotal: finalTotal,
        }),
      });

      if (!response.ok) throw new Error('Ошибка отправки');

      toast({
        title: "Заказ отправлен! 🎉",
        description: "Мы свяжемся с вами в ближайшее время",
      });

      clearCart();
      setFormData({ name: '', phone: '', address: '', comment: '', deliveryType: 'standard', deliveryDate: '', deliveryTime: '', productRequest: '' });
      setIsOpen(false);
    } catch (error) {
      toast({
        title: "Ошибка отправки заказа",
        description: "Попробуйте ещё раз или позвоните нам",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <Icon name="ShoppingCart" size={20} />
          {totalItems > 0 && (
            <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs">
              {totalItems}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <Icon name="ShoppingCart" size={24} />
            Корзина
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-center">
            <Icon name="ShoppingBag" size={64} className="text-muted-foreground mb-4" />
            <p className="text-muted-foreground">Корзина пуста</p>
          </div>
        ) : (
          <div className="space-y-6 mt-6">
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4 border rounded-lg p-3">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded"
                  />
                  <div className="flex-1">
                    <h4 className="font-semibold text-sm mb-1">{item.name}</h4>
                    {item.stock && (
                      <div className="flex items-center gap-1.5 mb-2">
                        {item.stock <= 3 ? (
                          <>
                            <Icon name="AlertTriangle" size={12} className="text-orange-500" />
                            <p className="text-xs text-orange-600 font-medium">
                              Осталось мало: {item.stock} шт.
                            </p>
                          </>
                        ) : item.stock <= 10 ? (
                          <>
                            <Icon name="Package" size={12} className="text-yellow-600" />
                            <p className="text-xs text-yellow-700">
                              В наличии: {item.stock} шт.
                            </p>
                          </>
                        ) : (
                          <p className="text-xs text-muted-foreground">
                            В наличии: {item.stock} шт.
                          </p>
                        )}
                      </div>
                    )}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-7 w-7"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          <Icon name="Minus" size={14} />
                        </Button>
                        <Input
                          type="number"
                          min="1"
                          max={item.stock}
                          value={item.quantity}
                          onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 1)}
                          className="w-16 h-7 text-center"
                        />
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-7 w-7"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          disabled={item.stock ? item.quantity >= item.stock : false}
                        >
                          <Icon name="Plus" size={14} />
                        </Button>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7"
                        onClick={() => removeFromCart(item.id)}
                      >
                        <Icon name="Trash2" size={14} className="text-destructive" />
                      </Button>
                    </div>
                    <p className="font-bold mt-2">{item.price * item.quantity}₽</p>
                  </div>
                </div>
              ))}
            </div>

            <Separator />

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Товары:</span>
                <span className="font-semibold">{totalPrice}₽</span>
              </div>
              {formData.deliveryType !== 'pickup' && (
                <div className="flex justify-between text-sm">
                  <span>Доставка:</span>
                  <span className="font-semibold">
                    {isFreeDelivery ? (
                      <span className="text-green-600">Бесплатно</span>
                    ) : (
                      <>{finalDeliveryCost}₽</>
                    )}
                  </span>
                </div>
              )}
              {isFreeDelivery && formData.deliveryType !== 'pickup' && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-2">
                  <p className="text-xs text-green-700 flex items-center gap-1">
                    <Icon name="CheckCircle" size={14} />
                    Бесплатная доставка при заказе от 75.000₽
                  </p>
                </div>
              )}
              <Separator />
              <div className="flex justify-between text-lg font-bold">
                <span>Итого:</span>
                <span>{finalTotal}₽</span>
              </div>
            </div>

            <Separator />

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">Имя *</Label>
                <Input
                  id="name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Иван Иванов"
                />
              </div>

              <div>
                <Label htmlFor="phone">Телефон *</Label>
                <Input
                  id="phone"
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+7 (999) 123-45-67"
                />
              </div>

              <div>
                <Label>Способ получения *</Label>
                <RadioGroup
                  value={formData.deliveryType}
                  onValueChange={(value) => setFormData({ ...formData, deliveryType: value })}
                  className="space-y-3 mt-2"
                >
                  <div className="flex items-center space-x-2 border rounded-lg p-3 hover:bg-muted/50 cursor-pointer">
                    <RadioGroupItem value="standard" id="standard" />
                    <Label htmlFor="standard" className="flex items-center gap-2 cursor-pointer flex-1">
                      <Icon name="Truck" size={18} />
                      <div className="flex-1">
                        <div className="font-semibold">Стандартная доставка</div>
                        <div className="text-xs text-muted-foreground">В пределах города</div>
                      </div>
                      <div className="text-sm font-semibold text-right">1800₽</div>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 border rounded-lg p-3 hover:bg-muted/50 cursor-pointer">
                    <RadioGroupItem value="express" id="express" />
                    <Label htmlFor="express" className="flex items-center gap-2 cursor-pointer flex-1">
                      <Icon name="Zap" size={18} />
                      <div className="flex-1">
                        <div className="font-semibold">Экспресс-доставка</div>
                        <div className="text-xs text-muted-foreground">Быстрая обработка и отправка</div>
                      </div>
                      <div className="text-sm font-semibold text-right">2100₽</div>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 border rounded-lg p-3 hover:bg-muted/50 cursor-pointer">
                    <RadioGroupItem value="pickup" id="pickup" />
                    <Label htmlFor="pickup" className="flex items-center gap-2 cursor-pointer flex-1">
                      <Icon name="MapPin" size={18} />
                      <div className="flex-1">
                        <div className="font-semibold">Самовывоз</div>
                        <div className="text-xs text-muted-foreground">Со складов в Симферополе и Керчи</div>
                      </div>
                      <div className="text-sm font-semibold text-green-600 text-right">Бесплатно</div>
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              {formData.deliveryType !== 'pickup' && (
                <>
                  <div>
                    <Label htmlFor="address">Адрес доставки *</Label>
                    <Input
                      id="address"
                      required
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      placeholder="г. Симферополь, ул. Примерная, д. 1"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="deliveryDate">Дата доставки *</Label>
                      <Input
                        id="deliveryDate"
                        type="date"
                        required
                        value={formData.deliveryDate}
                        onChange={(e) => setFormData({ ...formData, deliveryDate: e.target.value })}
                        min={new Date().toISOString().split('T')[0]}
                      />
                    </div>
                    <div>
                      <Label htmlFor="deliveryTime">Время *</Label>
                      <Select
                        value={formData.deliveryTime}
                        onValueChange={(value) => setFormData({ ...formData, deliveryTime: value })}
                      >
                        <SelectTrigger id="deliveryTime">
                          <SelectValue placeholder="Выберите" />
                        </SelectTrigger>
                        <SelectContent>
                          {formData.deliveryType === 'express' ? (
                            <>
                              <SelectItem value="8-9">8:00 - 9:00</SelectItem>
                              <SelectItem value="9-10">9:00 - 10:00</SelectItem>
                              <SelectItem value="10-11">10:00 - 11:00</SelectItem>
                              <SelectItem value="11-12">11:00 - 12:00</SelectItem>
                              <SelectItem value="12-13">12:00 - 13:00</SelectItem>
                              <SelectItem value="13-14">13:00 - 14:00</SelectItem>
                              <SelectItem value="14-15">14:00 - 15:00</SelectItem>
                              <SelectItem value="15-16">15:00 - 16:00</SelectItem>
                              <SelectItem value="16-17">16:00 - 17:00</SelectItem>
                              <SelectItem value="17-18">17:00 - 18:00</SelectItem>
                              <SelectItem value="18-19">18:00 - 19:00</SelectItem>
                            </>
                          ) : (
                            <>
                              <SelectItem value="8-11">8:00 - 11:00</SelectItem>
                              <SelectItem value="11-13">11:00 - 13:00</SelectItem>
                              <SelectItem value="13-15">13:00 - 15:00</SelectItem>
                              <SelectItem value="15-17">15:00 - 17:00</SelectItem>
                              <SelectItem value="17-19">17:00 - 19:00</SelectItem>
                            </>
                          )}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                    <div className="flex items-start gap-2">
                      <Icon name="Phone" size={16} className="text-blue-600 mt-0.5" />
                      <p className="text-xs text-blue-800">
                        После оформления мы свяжемся с вами для подтверждения заказа и уточнения деталей доставки.
                      </p>
                    </div>
                  </div>
                </>
              )}

              {formData.deliveryType === 'pickup' && (
                <div className="bg-muted/50 border rounded-lg p-4">
                  <div className="flex items-start gap-2">
                    <Icon name="MapPin" size={18} className="text-primary mt-0.5" />
                    <div className="text-sm">
                      <div className="font-semibold mb-1">Адреса для самовывоза:</div>
                      <div className="text-muted-foreground space-y-1">
                        <div>📍 г. Симферополь, ул. Элеваторная 4</div>
                        <div>📍 г. Керчь, ул Мирошника 57</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div>
                <Label htmlFor="productRequest">Нужен товар, которого нет в каталоге?</Label>
                <Textarea
                  id="productRequest"
                  value={formData.productRequest}
                  onChange={(e) => setFormData({ ...formData, productRequest: e.target.value })}
                  placeholder="Опишите желаемый товар, мы постараемся найти его для вас"
                  rows={2}
                />
              </div>

              <div>
                <Label htmlFor="comment">Комментарий к заказу</Label>
                <Textarea
                  id="comment"
                  value={formData.comment}
                  onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                  placeholder="Укажите пожелания к заказу"
                  rows={2}
                />
              </div>

              {hasStockIssues && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                  <div className="flex items-start gap-2">
                    <Icon name="AlertCircle" size={16} className="text-red-600 mt-0.5" />
                    <p className="text-xs text-red-800">
                      Некоторые товары превышают доступное количество на складе. Уменьшите количество для оформления заказа.
                    </p>
                  </div>
                </div>
              )}

              <Button type="submit" className="w-full" size="lg" disabled={isSubmitting || hasStockIssues}>
                {isSubmitting ? (
                  <>
                    <Icon name="Loader2" size={20} className="mr-2 animate-spin" />
                    Отправка...
                  </>
                ) : (
                  <>
                    <Icon name="Send" size={20} className="mr-2" />
                    Оформить заказ
                  </>
                )}
              </Button>
            </form>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default Cart;