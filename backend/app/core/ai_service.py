import time
from app.schemas.design import DesignRequest, DesignResponse


async def simulate_ai_call(request: DesignRequest) -> DesignResponse:
    
    # 프롬프트의 앞 50자만 잘라서 보여주기
    print(f"Simulating AI call for prompt:{request.prompt[0:50]}...")

    await time.sleep(3)

    generated_text = f"'{request.prompt}' 에 대한 트렌트 디자인 결과 입니다. \n"

    if request.keywords:
        generated_text += f"키워드 ({', '.join(request.keywords)})를 반영했습니다. \n"
    
    generated_text += "이것은 AI가 시뮬레이션한 결과입니다."

    image_url = "https://via.placeholder.com/400x300?text=Design+Image"

    return DesignResponse(
        generated_text=generated_text,
        image_url =  image_url,
        cached = False
    )




