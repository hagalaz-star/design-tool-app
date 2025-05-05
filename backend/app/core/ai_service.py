import os
import time
import httpx
import google.generativeai as genai
from app.schemas.design import DesignRequest, DesignResponse

GEMINI_API_KEY = os.getenv("Gemini_API")
UNSPLASH_API_KEY = os.getenv("Unsplash_API")

genai.configure(api_key = GEMINI_API_KEY)


async def get_trend_design_image(keywords, component_type):
    """트렌트에 맞는 이미지 URL 가져오는 함수"""
    try:
        search_term = f"{component_type} design trend {' '.join(keywords) if keywords else ''}"
        url = f"https: //api.unsplash.com/search/photos?query={search_term}&per_page=1"
        headers = {"Authorization": f"Client-ID {UNSPLASH_API_KEY}"}

        # httpx를 사용한 비동기 HTTP 요청
        async with httpx.AsyncClient() as client:
            response = await client.get(url, headers = headers)
            response.raise_for_status() # 오류 상태 코드 확인
            data = response.json()

            if data.get("results") and len(data["results"]) > 0:
                return data["results"][0]["urls"]["regular"]
    except Exception as e :
        print(f"이미지 가져오기 오류: {e}")

    # 오류 발생 시 기본 이미지 반환
    return  f"https://via.placeholder.com/400x300?text={component_type}+Design"



async def get_trend_design_from_ai(request: DesignRequest) -> DesignResponse:

    # ai 모델 설정
    model = genai.GenerativeModel('gemini-1.5-pro')    
    
    component_type = request.prompt

    
    # 프롬프트 구성
    prompt = f"""최신 트렌드 {component_type} 디자인에 대해 간결하게 설명해주세요.
    
    키워드: ({', '.join(request.keywords)})\n\n"
    

    다음 구조로 응답해주세요:

    1. 제목: 짧고 매력적인 트렌드 제목 (15자 이내)
    2. 핵심 설명: 이 트렌드의 핵심을 한 문장으로 (30자 이내)
    3. 시각 요소: 이 트렌드의 주요 시각적 특징을 3가지 (각 10자 이내 키워드)
    4. 적용 팁: 이 트렌드를 적용하는 간단한 방법 (30자 이내)
    응답은 간결하고 직관적으로 작성해주세요. 각 항목은 짧고 핵심적인 내용만 포함해야 합니다.
    """

    try:
        # api 호출
        response = await model.generate_content_async(prompt)
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





