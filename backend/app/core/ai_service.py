import os
import time
import google.generativeai as genai
from app.schemas.design import DesignRequest, DesignResponse

GEMINI_API_KEY = os.getenv("Gemini_API")
genai.configure(api_key = GEMINI_API_KEY)


async def get_trend_design_from_ai(request: DesignRequest) -> DesignResponse:

    # ai 모델 설정
    model = genai.GenerativeModel('gemini-1.5-pro')    
    
    component_type = request.prompt

    
    # 프롬프트 구성
    prompt = f"""최신 트렌드 {component_type} 디자인에 대해 설명해주세요.
    """
    if request.keywords:
        prompt += f"키워드 ({', '.join(request.keywords)})\n\n"
    
    prompt += f"""

    다음 구조로 응답해주세요:

    1. 제목: 최신 {component_type} 디자인 트렌드 (현재 연도 기준)

    2. 소개: 현재 디자인 트렌드의 전반적인 방향성과 중요성에 대해 간략히 설명해주세요.

    3. 주요 트렌드: 3-4개의 핵심 트렌드를 다음 형식으로 설명해주세요:
    - 트렌드 이름
    - 특징: 해당 트렌드의 시각적, 기능적 특징
    - 적용 방법: 실제 구현 시 고려할 사항과 기술적 접근 방법
    - 사용 사례: 어떤 상황이나 프로젝트에 적합한지

    4. 결론: 이러한 트렌드를 적용할 때의 조언과 주의점을 제시해주세요.

    응답은 마크다운 형식으로 작성해주시고, 각 섹션을 명확하게 구분해주세요. 전문적이면서도 이해하기 쉬운 톤으로 작성해주세요.
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





