import json
import os
import psycopg2


def handler(event: dict, context) -> dict:
    '''API для получения списка категорий товаров'''
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

    conn = psycopg2.connect(os.environ['DATABASE_URL'])
    cur = conn.cursor()

    cur.execute('''
        SELECT 
            c.id,
            c.name,
            c.slug,
            c.description,
            c.icon,
            COUNT(p.id) as products_count
        FROM categories c
        LEFT JOIN products p ON c.id = p.category_id AND p.is_available = true
        GROUP BY c.id
        ORDER BY c.name
    ''')

    categories = []
    for row in cur.fetchall():
        categories.append({
            'id': row[0],
            'name': row[1],
            'slug': row[2],
            'description': row[3],
            'icon': row[4],
            'products_count': row[5]
        })

    cur.close()
    conn.close()

    return {
        'statusCode': 200,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        'body': json.dumps({'categories': categories}, ensure_ascii=False),
        'isBase64Encoded': False
    }
