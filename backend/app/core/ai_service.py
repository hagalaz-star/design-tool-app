import os
import time
import google.generativeai as genai
from app.schemas.design import DesignRequest, DesignResponse

GEMINI_API_KEY = os.getenv("Gemini_API")
genai.configure(api_key = GEMINI_API_KEY)


async def get_trend_design_from_ai(request: DesignRequest) -> DesignResponse:

    # ai 모델 설정
    model = genai.GenerativeModel('gemimi-1.5-pro')
    
    # 프롬프트 구성
    promt = f"최신 트렌드 {request.prompt} 디자인에 대해 설명해주세요."

    if request.keywords:
        promt += f"키워드 ({', '.join(request.keywords)})를 반영했습니다. \n"
    
    prompt += "디자인 트렌드에 대한 설명과 적용 방법을 제시해주세요."

    try:
        # api 호출
        response = await model.generate_content_async(promt)
        generated_text = response.text
    

        image_url = "https://via.placeholder.com/400x300?text=Design+Trend"

        return DesignResponse(
            generated_text=generated_text,
            image_url =  image_url,
            cached = False
        )
    except Exception as e :
        print(f"gemini api 호출 중 오류 발생: {e}")

        # 오류 발생시 기본 응답
        return DesignResponse(
            generated_text= f"AI 디자인 제안을 가져오는데 실패했습니다: {str(e)}",
            image_url="https://via.placeholder.com/400x300?text=Error",
            cached=False
        )





