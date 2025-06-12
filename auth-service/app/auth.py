# Cambio de prueba para activar GitHub Actions

import boto3

# Inicializar el cliente de DynamoDB
dynamodb = boto3.resource('dynamodb', region_name='us-east-1')
table = dynamodb.Table('user')

# Guardar usuario con contraseña simple
def save_user(username, password):
    table.put_item(Item={'username': username, 'password': password})

# Obtener contraseña del usuario
def get_user(username):
    response = table.get_item(Key={'username': username})
    return response.get('Item', {}).get('password')

# Crear token ficticio
def create_token(payload):
    return f"token_for_{payload['sub']}"

# Verificar contraseña directamente (sin hashing)
def verify_password(plain_password, stored_password):
    return plain_password == stored_password

# Esta función es requerida por main.py aunque no aplica hashing
def hash_password(password):
    return password
