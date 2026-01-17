import json
import os
import urllib.request
import urllib.parse


def handler(event: dict, context) -> dict:
    """Отправка заказа в Telegram бот"""
    method = event.get("httpMethod", "POST")

    if method == "OPTIONS":
        return {
            "statusCode": 200,
            "headers": {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "POST, OPTIONS",
                "Access-Control-Allow-Headers": "Content-Type",
            },
            "body": "",
        }

    if method != "POST":
        return {
            "statusCode": 405,
            "headers": {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
            },
            "body": json.dumps({"error": "Method not allowed"}),
        }

    try:
        data = json.loads(event.get("body", "{}"))
        customer = data.get("customer", {})
        items = data.get("items", [])
        total = data.get("total", 0)

        # Формируем сообщение для Telegram
        message = f"""
🛒 <b>Новый заказ!</b>

👤 <b>Клиент:</b>
Имя: {customer.get('name', 'Не указано')}
Телефон: {customer.get('phone', 'Не указан')}
Адрес: {customer.get('address', 'Не указан')}

📦 <b>Товары:</b>
"""
        for item in items:
            message += f"\n• {item['name']}\n  {item['quantity']} шт. × {item['price']}₽ = {item['quantity'] * item['price']}₽"

        if customer.get("comment"):
            message += f"\n\n💬 <b>Комментарий:</b>\n{customer['comment']}"

        message += f"\n\n💰 <b>Итого: {total}₽</b>"

        # Получаем токен бота и ID чата из переменных окружения
        bot_token = os.environ.get("TELEGRAM_BOT_TOKEN")
        chat_id = os.environ.get("TELEGRAM_CHAT_ID")

        if not bot_token or not chat_id:
            return {
                "statusCode": 500,
                "headers": {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                },
                "body": json.dumps(
                    {
                        "error": "Telegram credentials not configured",
                        "details": "Please add TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID secrets",
                    }
                ),
            }

        # Отправляем сообщение в Telegram
        url = f"https://api.telegram.org/bot{bot_token}/sendMessage"
        payload = {
            "chat_id": chat_id,
            "text": message,
            "parse_mode": "HTML",
        }

        req = urllib.request.Request(
            url,
            data=json.dumps(payload).encode("utf-8"),
            headers={"Content-Type": "application/json"},
        )

        with urllib.request.urlopen(req) as response:
            result = json.loads(response.read().decode("utf-8"))
            if not result.get("ok"):
                raise Exception(f"Telegram API error: {result}")

        return {
            "statusCode": 200,
            "headers": {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
            },
            "body": json.dumps({"success": True, "message": "Order sent to Telegram"}),
        }

    except Exception as e:
        return {
            "statusCode": 500,
            "headers": {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
            },
            "body": json.dumps({"error": str(e)}),
        }
