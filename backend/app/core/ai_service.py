import os
import urllib.parse
import httpx
import google.generativeai as genai
from app.schemas.design import DesignRequest, DesignResponse
from dotenv import load_dotenv

load_dotenv('.env.local') 

GEMINI_API_KEY = os.getenv("Gemini_API")
UNSPLASH_API_KEY = os.getenv("Unsplash_API")

genai.configure(api_key = GEMINI_API_KEY)


async def get_trend_design_image(keywords, component_type):
    """트렌트에 맞는 이미지 URL 가져오는 함수"""
    try:
        # 기본 검색어 구성 요소
        query_parts = [component_type]

        # 키워드가 있으면 추가
        if keywords:
            query_parts.extend(keywords) # 키워드를 리스트에 추가
        
        # 필수 디자인 용어 추가 (예: UI, design)
        query_parts.append("UI")
        query_parts.append("design")
        query_parts.append("trend")

        # 간단하게 공백으로 연결
        # 중복을 제거하고 순서를 유지하며 검색어 조합 (Python 3.7+ dict.fromkeys는 순서 유지)
        unique_parts = list(dict.fromkeys(query_parts))
        search_term = ' '.join(unique_parts)

        # url 인코딩 적용
        encoded_search_term = urllib.parse.quote(search_term)

        print(f"Unsplash 검색어: {search_term}")
        print(f"인코딩된 검색어: {encoded_search_term}")

        url = f"https://api.unsplash.com/search/photos?query={search_term}&per_page=1"
        headers = {"Authorization": f"Client-ID {UNSPLASH_API_KEY}"}

        # httpx를 사용한 비동기 HTTP 요청
        async with httpx.AsyncClient() as client:
            response = await client.get(url, headers = headers)
            print(f"Unsplash 응답 상태 코드: {response.status_code}") # 상태 코드확인
            response.raise_for_status() # 오류 상태 코드 확인
            data = response.json()

            if data.get("results") and len(data["results"]) > 0:
                image_url = data["results"][0]["urls"]["regular"]
                print(f"찾은 이미지 URL:{image_url}")
                return image_url
            else:
                print("Unsplash에서 이미지를 찾지 못했습니다.")
    
    except httpx.HTTPStatusError as e:
        print(f"Unsplash API HTTP 오류:{e.response.status_code} - {e.response.text}")
    except Exception as e :
        print(f"이미지 가져오기 오류: {e}")
        print(f"사용된 검색어: {search_term if 'search_term' in locals() else '생성 전 오류'}") # 오류 시 사용된 검색어 확인


    # 오류 발생 시 기본 이미지 반환
    print(f"플레이스홀더 이미지 반환: {component_type}")
    component_text = urllib.parse.quote(component_type)
    return  f"https://via.placeholder.com/400x300?text={component_type}+Design"



async def get_trend_design_from_ai(request: DesignRequest) -> DesignResponse:

    # ai 모델 설정
    model = genai.GenerativeModel('gemini-1.5-pro')    
    
    component_type = request.prompt

    
    # 프롬프트 구성
    prompt = f"""최신 트렌드 {component_type} 디자인에 대해 간결하게 설명해주세요.
    
    키워드: ({', '.join(request.keywords)if request.keywords else component_type})\n\n"
    

    다음 구조로 응답해주세요:

    1. 제목: 짧고 매력적인 트렌드 제목 (15자 이내) \n"
    2. 핵심 설명: 이 트렌드의 핵심을 한 문장으로 (30자 이내) \n"
    3. 시각 요소: 이 트렌드의 주요 시각적 특징을 3가지 (각 10자 이내 키워드) \n"
    4. 적용 팁: 이 트렌드를 적용하는 간단한 방법 (30자 이내) \n"
    응답은 간결하고 직관적으로 작성해줘. 각 항목은 짧고 핵심적인 내용만 포함해야 합니다.
    """

    try:
        # api 호출
        response = await model.generate_content_async(prompt)
        generated_text = response.text

        image_keywords = request.keywords or [] 
        image_url = await get_trend_design_image(image_keywords, component_type)

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





