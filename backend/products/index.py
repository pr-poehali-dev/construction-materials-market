import json
import os
import psycopg2


def handler(event: dict, context) -> dict:
    '''API для получения товаров с фильтрацией и поиском'''
    method = event.get('httpMethod', 'GET')

    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type'
            },
            'body': '',
            'isBase64Encoded': False
        }

    if method != 'GET':
        return {
            'statusCode': 405,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Method not allowed'}),
            'isBase64Encoded': False
        }

    query_params = event.get('queryStringParameters') or {}
    
    category_id = query_params.get('category_id')
    search = query_params.get('search', '').strip()
    is_featured = query_params.get('is_featured')
    limit = int(query_params.get('limit', 50))
    offset = int(query_params.get('offset', 0))

    conn = psycopg2.connect(os.environ['DATABASE_URL'])
    cur = conn.cursor()

    # Формируем SQL запрос с условиями
    where_conditions = ['p.is_available = true']
    
    if category_id:
        where_conditions.append(f"p.category_id = {int(category_id)}")
    
    if search:
        search_escaped = search.replace("'", "''")
        where_conditions.append(f"(p.name ILIKE '%{search_escaped}%' OR p.description ILIKE '%{search_escaped}%' OR p.article ILIKE '%{search_escaped}%')")
    
    if is_featured:
        where_conditions.append('p.is_featured = true')

    where_clause = ' AND '.join(where_conditions)

    # Получаем общее количество товаров
    cur.execute(f'''
        SELECT COUNT(*) 
        FROM products p
        WHERE {where_clause}
    ''')
    total = cur.fetchone()[0]

    # Получаем товары
    cur.execute(f'''
        SELECT 
            p.id,
            p.category_id,
            c.name as category_name,
            p.name,
            p.slug,
            p.description,
            p.price,
            p.old_price,
            p.article,
            p.unit,
            p.stock_quantity,
            p.min_order_quantity,
            p.manufacturer,
            p.image_url,
            p.rating,
            p.reviews_count,
            p.is_featured
        FROM products p
        LEFT JOIN categories c ON p.category_id = c.id
        WHERE {where_clause}
        ORDER BY p.is_featured DESC, p.name
        LIMIT {limit} OFFSET {offset}
    ''')

    products = []
    for row in cur.fetchall():
        products.append({
            'id': row[0],
            'category_id': row[1],
            'category_name': row[2],
            'name': row[3],
            'slug': row[4],
            'description': row[5],
            'price': float(row[6]) if row[6] else 0,
            'old_price': float(row[7]) if row[7] else None,
            'article': row[8],
            'unit': row[9],
            'stock_quantity': row[10],
            'min_order_quantity': row[11],
            'manufacturer': row[12],
            'image_url': row[13],
            'rating': float(row[14]) if row[14] else 0,
            'reviews_count': row[15],
            'is_featured': row[16]
        })

    cur.close()
    conn.close()

    return {
        'statusCode': 200,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        'body': json.dumps({
            'products': products,
            'total': total,
            'limit': limit,
            'offset': offset
        }, ensure_ascii=False),
        'isBase64Encoded': False
    }
