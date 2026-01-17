import json
import os
from openai import OpenAI

def handler(event: dict, context) -> dict:
    '''Умные рекомендации товаров на основе нейросети OpenAI'''
    
    method = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type'
            },
            'body': ''
        }
    
    if method != 'POST':
        return {
            'statusCode': 405,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Method not allowed'})
        }
    
    body = json.loads(event.get('body', '{}'))
    product_name = body.get('productName', '')
    product_category = body.get('category', '')
    all_products = body.get('products', [])
    
    if not product_name or not all_products:
        return {
            'statusCode': 400,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'productName and products are required'})
        }
    
    api_key = os.environ.get('OPENAI_API_KEY')
    if not api_key:
        # Fallback: возвращаем случайные товары из той же категории
        similar = [p for p in all_products if p.get('category') == product_category and p.get('name') != product_name]
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({
                'recommendations': similar[:4],
                'method': 'category_match'
            })
        }
    
    try:
        client = OpenAI(api_key=api_key)
        
        products_list = "\n".join([f"- {p['name']} ({p['category']}) - {p['price']}₽" for p in all_products])
        
        prompt = f"""Ты эксперт по рекомендациям товаров в интернет-магазине.

Клиент смотрит товар: "{product_name}" (категория: {product_category})

Доступные товары в магазине:
{products_list}

Задача: порекомендуй 3-4 товара, которые покупатели ОБЫЧНО БЕРУТ ВМЕСТЕ с "{product_name}".

Правила:
1. Выбирай товары, которые логично дополняют основной товар
2. Учитывай практическую пользу для покупателя
3. Можно выбирать из любых категорий, если это имеет смысл
4. НЕ рекомендуй сам товар "{product_name}"

Ответь ТОЛЬКО в формате JSON массива с ID товаров:
{{"product_ids": [1, 5, 12]}}"""

        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {"role": "system", "content": "Ты помощник для умных рекомендаций товаров. Отвечай только в формате JSON."},
                {"role": "user", "content": prompt}
            ],
            temperature=0.7,
            max_tokens=150
        )
        
        result_text = response.choices[0].message.content.strip()
        
        # Парсим JSON из ответа
        if '```json' in result_text:
            result_text = result_text.split('```json')[1].split('```')[0].strip()
        elif '```' in result_text:
            result_text = result_text.split('```')[1].split('```')[0].strip()
        
        result = json.loads(result_text)
        recommended_ids = result.get('product_ids', [])
        
        # Находим полные данные товаров
        recommended_products = [p for p in all_products if p.get('id') in recommended_ids]
        
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({
                'recommendations': recommended_products[:4],
                'method': 'ai_powered'
            })
        }
        
    except Exception as e:
        # В случае ошибки возвращаем товары из той же категории
        similar = [p for p in all_products if p.get('category') == product_category and p.get('name') != product_name]
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({
                'recommendations': similar[:4],
                'method': 'fallback',
                'error': str(e)
            })
        }
