from fastapi import APIRouter, HTTPException
from app.schemas.design import DesignRequest, DesignResponse
from app.core import design_service

# /api/design 경로 라우터 생성
router = APIRouter (
    prefix= "/api/design",
    tags=["design"],

    responses= {404: {"description": "Not found"}},
)

@router.post("/trend", response_model= DesignResponse)
async def get_trend_design_endpoint(request: DesignRequest):
    print(f"Received request:{request.model_dump_json()}")


    try: 
        response = await design_service.get_trend_design(request)
        return response
    except Exception as e :
        print(f"An error occured:{e}")
        raise HTTPException(status_code=500, detail="Internal server error")