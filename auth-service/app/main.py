# Cambio menor para probar pipeline después de corrección
# Error
from fastapi import FastAPI, HTTPException, APIRouter
from fastapi.middleware.cors import CORSMiddleware
from models import UserRegister, UserLogin
from auth import hash_password, verify_password, save_user, get_user, create_token

router = APIRouter()

@router.post("/register")
def register(user: UserRegister):
    try:
        print(f"[DEBUG] Datos recibidos: {user}")
        if get_user(user.username):
            print("[DEBUG] Usuario ya existe")
            raise HTTPException(status_code=400, detail="User already exists")
        save_user(user.username, user.password)
        print("[DEBUG] Usuario registrado")
        return {"message": "User registered"}
    except Exception as e:
        print(f"[ERROR] Registro falló: {e}")
        raise HTTPException(status_code=500, detail="Internal error")

@router.post("/login")
def login(user: UserLogin):
    try:
        print(f"[DEBUG] Intento de login: {user.username}")
        stored_pw = get_user(user.username)
        if not stored_pw:
            print("[DEBUG] Usuario no encontrado")
        if not stored_pw or not verify_password(user.password, stored_pw):
            raise HTTPException(status_code=401, detail="Invalid credentials")
        token = create_token({"sub": user.username})
        print(f"[DEBUG] Login exitoso para: {user.username}")
        return {"access_token": token}
    except Exception as e:
        print(f"[ERROR] Login falló: {e}")
        raise HTTPException(status_code=500, detail="Internal error")

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

app.include_router(router, prefix="/api/auth")
