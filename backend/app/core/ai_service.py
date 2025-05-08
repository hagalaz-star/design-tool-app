import os
import re 
import google.generativeai as genai
from app.schemas.design import DesignResponse
from dotenv import load_dotenv

load_dotenv('.env.local') 

GEMINI_API_KEY = os.getenv("Gemini_API")
UNSPLASH_API_KEY = os.getenv("Unsplash_API")

genai.configure(api_key = GEMINI_API_KEY)

def extract_code_from_text(text):
    """ai 응답에서 코드 블록을 추출하는 함수"""
    # 코드 블록 패턴 (``` 로 감싸진 부분)
    code_pattern = re.compile(r'```(?:\w+)?\s*([\s\S]*?)\s*```')

    # 코드 블록 찾기
    match = code_pattern.search(text)
    if match:
        return match.group(1).strip()
    
    # 코드 블록이 없는 경우 기본 응답
    return "// ai가 코드 블록을 생성하지 않았습니다."


async def get_trend_design_code(component_type, code_format):
    """ 트렌드에 맞는 디자인 코드를 가져오는 함수"""    
    
    # 프롬프트 구성
    prompt = f"""최신 트렌드 {component_type} 디자인에 대해 간결하게 설명해주세요.

    코드 형식: {code_format}
    

    다음 구조로 응답해주세요:

    # [트렌드 제목]

    ## 핵심 설명
    [이 트렌드의 핵심을 한 문장으로]

    ## 시각 요소
    - [특징 1]
    - [특징 2] 
    - [특징 3]

    ## 적용 팁
    [이 트렌드를 적용하는 방법]

    ## 샘플 코드
    ```
    [코드 예제]
    ```

    응답은 마크다운 형식으로 작성하고, 각 부분은 명확히 구분되도록 해주세요.
    """

    try:
        # api 호출
        model = genai.GenerativeModel('gemini-2.0-flash-lite')   
        response = await model.generate_content_async(prompt)
        generated_text = response.text


        return DesignResponse(
            generated_text=generated_text,
            sample_code = extract_code_from_text(generated_text),
            cached = False
        )
    except Exception as e :
        print(f"디자인 코드 생성 중 오류 발생: {e}")

        # 오류 발생시 기본 응답
        return DesignResponse(
            generated_text= f"AI 디자인 제안을 가져오는데 실패했습니다: {str(e)}",
            sample_code="// 오류로 인해 코드를 생성할 수 없습니다",
            cached = False
        )





