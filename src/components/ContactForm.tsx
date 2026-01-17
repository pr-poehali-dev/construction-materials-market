import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import Icon from "@/components/ui/icon";
import { useToast } from "@/hooks/use-toast";

const ContactForm = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !phone || !message) {
      toast({
        title: "Ошибка",
        description: "Пожалуйста, заполните все поля",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        "https://functions.poehali.dev/64df4287-8bc0-48ad-a504-3386f11a3046",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            phone,
            message,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        toast({
          title: "Сообщение отправлено! ✅",
          description: "Мы свяжемся с вами в ближайшее время",
        });
        setName("");
        setPhone("");
        setMessage("");
      } else {
        throw new Error(data.error || "Failed to send");
      }
    } catch (error) {
      console.error("Error sending message:", error);
      toast({
        title: "Ошибка отправки",
        description: "Попробуйте позже или свяжитесь с нами по телефону",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="p-6 bg-white shadow-lg">
      <div className="flex items-center gap-3 mb-4">
        <Icon name="MessageCircle" size={28} className="text-orange-500" />
        <h3 className="text-2xl font-bold">Напишите нам</h3>
      </div>
      <p className="text-gray-600 mb-6">
        Есть вопросы? Мы ответим в течение нескольких минут!
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Ваше имя</label>
          <Input
            type="text"
            placeholder="Иван Иванов"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={loading}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Номер телефона
          </label>
          <Input
            type="tel"
            placeholder="+7 (999) 123-45-67"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            disabled={loading}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Сообщение</label>
          <Textarea
            placeholder="Напишите ваш вопрос или комментарий..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            disabled={loading}
            rows={4}
          />
        </div>

        <Button
          type="submit"
          className="w-full bg-orange-500 hover:bg-orange-600"
          disabled={loading}
        >
          {loading ? (
            <>
              <Icon name="Loader2" size={18} className="mr-2 animate-spin" />
              Отправка...
            </>
          ) : (
            <>
              <Icon name="Send" size={18} className="mr-2" />
              Отправить сообщение
            </>
          )}
        </Button>
      </form>
    </Card>
  );
};

export default ContactForm;