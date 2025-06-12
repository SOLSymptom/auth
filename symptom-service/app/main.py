from fastapi import FastAPI, APIRouter
from fastapi.middleware.cors import CORSMiddleware
from app.models import PatientRegistration
from app.symptoms import register_patient, get_symptoms_history

router = APIRouter()

@router.post("/register-patient")
def register(patient: PatientRegistration):
    return register_patient(patient)

@router.get("/symptoms/{cedula}")
def history(cedula: str):
    return get_symptoms_history(cedula)

@router.get("/health")
def health_check():
    return {"status": "ok"}

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router, prefix="/api/symptom")
