# app/main.py
from src.app.api.nickname.endpoints import nickname
from fastapi import FastAPI
from mangum import Mangum
app = FastAPI()
lambda_handler = Mangum(app)
app.include_router(nickname.router)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
