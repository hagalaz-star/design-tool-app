from fastapi import FastAPI
from app.api.endpoints import design

app = FastAPI()

# 디자인 라우터를 앱에 포함
app.include_router(design.router)

# Optional: 루트 경로 설정
@app.get("/")
async def read_root():

    return {"message": "Welcome to the Design Tool API"}