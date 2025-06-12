from pydantic import BaseModel, Field, EmailStr
from typing import List
from datetime import datetime

class PatientRegistration(BaseModel):
    cedula: str = Field(..., min_length=5)
    nombres: str
    apellidos: str
    ciudad: str
    edad: int = Field(..., ge=0)
    tipo_sangre: str
    correo: EmailStr
    telefono: str
    sintomas: List[str]
    fecha_registro: datetime = Field(default_factory=datetime.utcnow)

class PatientHistory(BaseModel):
    cedula: str
    historial: List[dict]

class PatientResponse(BaseModel):
    message: str
    paciente: PatientRegistration
