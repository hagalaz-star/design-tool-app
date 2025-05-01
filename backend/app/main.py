from fastapi import FastAPI
from app.api.endpoints import design
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# 디자인 라우터를 앱에 포함
app.include_router(design.router)

app.add_middleware (
    CORSMiddleware,
    allow_origins = ["http://localhost:3000","http://127.0.0.1:3000"],
    allow_credentials= True,
    allow_methods = ["*"],
    allow_headers = ["*"],
)

# Optional: 루트 경로 설정
@app.get("/")
async def read_root():

    return {"message": "Welcome to the Design Tool API"}