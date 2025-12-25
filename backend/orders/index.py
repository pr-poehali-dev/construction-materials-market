import json
import os
import psycopg2
from datetime import datetime


def generate_order_number() -> str:
    '''Генерация уникального номера заказа'''
    now = datetime.now()
    return f"ORD-{now.year}-{now.strftime('%m%d%H%M%S')}"


def handler(event: dict, context) -> dict:
    '''API для создания заказов'''
    method = event.get('httpMethod', 'GET')

    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type'
            },
            'body': '',
            'isBase64Encoded': False
        }

    if method != 'POST':
        return {
            'statusCode': 405,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Method not allowed'}),
            'isBase64Encoded': False
        }

    try:
        body = json.loads(event.get('body', '{}'))
    except json.JSONDecodeError:
        return {
            'statusCode': 400,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Invalid JSON'}),
            'isBase64Encoded': False
        }

    # Валидация обязательных полей
    required_fields = ['customer_name', 'customer_phone', 'items']
    for field in required_fields:
        if field not in body:
            return {
                'statusCode': 400,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'error': f'Missing required field: {field}'}),
                'isBase64Encoded': False
            }

    if not body['items'] or len(body['items']) == 0:
        return {
            'statusCode': 400,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Order must contain at least one item'}),
            'isBase64Encoded': False
        }

    conn = psycopg2.connect(os.environ['DATABASE_URL'])
    cur = conn.cursor()

    try:
        # Генерируем номер заказа
        order_number = generate_order_number()

        # Вычисляем общую сумму заказа
        total_amount = 0
        order_items = []

        for item in body['items']:
            product_id = item.get('product_id')
            quantity = item.get('quantity', 1)

            # Получаем информацию о товаре
            cur.execute('''
                SELECT name, price, stock_quantity, is_available
                FROM products
                WHERE id = %s
            ''', (product_id,))

            product = cur.fetchone()
            if not product:
                conn.rollback()
                return {
                    'statusCode': 404,
                    'headers': {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    'body': json.dumps({'error': f'Product with id {product_id} not found'}),
                    'isBase64Encoded': False
                }

            product_name, price, stock_quantity, is_available = product

            if not is_available:
                conn.rollback()
                return {
                    'statusCode': 400,
                    'headers': {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    'body': json.dumps({'error': f'Product {product_name} is not available'}),
                    'isBase64Encoded': False
                }

            if quantity > stock_quantity:
                conn.rollback()
                return {
                    'statusCode': 400,
                    'headers': {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    'body': json.dumps({'error': f'Not enough stock for {product_name}. Available: {stock_quantity}'}),
                    'isBase64Encoded': False
                }

            item_total = float(price) * quantity
            total_amount += item_total

            order_items.append({
                'product_id': product_id,
                'product_name': product_name,
                'quantity': quantity,
                'unit_price': float(price),
                'total_price': item_total
            })

        # Создаем заказ
        cur.execute('''
            INSERT INTO orders (
                order_number, customer_name, customer_phone, customer_email,
                delivery_address, delivery_method, payment_method, total_amount, comment
            ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)
            RETURNING id
        ''', (
            order_number,
            body['customer_name'],
            body['customer_phone'],
            body.get('customer_email'),
            body.get('delivery_address'),
            body.get('delivery_method', 'Самовывоз'),
            body.get('payment_method', 'Наличные'),
            total_amount,
            body.get('comment')
        ))

        order_id = cur.fetchone()[0]

        # Добавляем позиции заказа
        for item in order_items:
            cur.execute('''
                INSERT INTO order_items (
                    order_id, product_id, product_name, quantity, unit_price, total_price
                ) VALUES (%s, %s, %s, %s, %s, %s)
            ''', (
                order_id,
                item['product_id'],
                item['product_name'],
                item['quantity'],
                item['unit_price'],
                item['total_price']
            ))

            # Уменьшаем остаток товара на складе
            cur.execute('''
                UPDATE products
                SET stock_quantity = stock_quantity - %s
                WHERE id = %s
            ''', (item['quantity'], item['product_id']))

        conn.commit()

        return {
            'statusCode': 201,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({
                'success': True,
                'order_id': order_id,
                'order_number': order_number,
                'total_amount': total_amount,
                'items': order_items
            }, ensure_ascii=False),
            'isBase64Encoded': False
        }

    except Exception as e:
        conn.rollback()
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': str(e)}),
            'isBase64Encoded': False
        }
    finally:
        cur.close()
        conn.close()
