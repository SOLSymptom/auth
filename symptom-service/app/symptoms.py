import boto3
from app.models import PatientRegistration
from datetime import datetime

# DynamoDB config
dynamodb = boto3.resource('dynamodb', region_name='us-east-1')
table = dynamodb.Table('patients')

def register_patient(data: PatientRegistration):
    response = table.get_item(Key={'cedula': data.cedula})
    if 'Item' in response:
        raise ValueError("Paciente ya registrado")

    table.put_item(Item={
        'cedula': data.cedula,
        'nombres': data.nombres,
        'apellidos': data.apellidos,
        'ciudad': data.ciudad,
        'edad': data.edad,
        'tipo_sangre': data.tipo_sangre,
        'sintomas': data.sintomas,
        'fecha_registro': datetime.now().isoformat()
    })

def get_patient_history(cedula: str):
    response = table.get_item(Key={'cedula': cedula})
    item = response.get('Item')
    if not item:
        return None

    return [{
        'fecha': item['fecha_registro'],
        'sintomas': item['sintomas'],
        'ciudad': item['ciudad'],
        'tipo_sangre': item['tipo_sangre'],
        'edad': item['edad']
    }]
