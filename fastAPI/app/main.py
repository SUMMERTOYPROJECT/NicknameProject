from app.controller import NickController
from fastapi import FastAPI
from mangum import Mangum

app = FastAPI()
lambda_handler = Mangum(app)
app.include_router(NickController.router)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)


