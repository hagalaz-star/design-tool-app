from app.core import cache
from app.core.ai_service import  get_trend_design_code


# 트렌트 디자인 요청을 처리하는 핵심 서비스 함수
async def get_trend_design(request):
    # 요청 데이터를 기반으로 캐시 키 생성
    component_type =request.prompt
    code_format = request.keywords
    
    cache_key = cache.generate_cache_key(component_type, code_format)
    print(f"Generated cache key:{cache_key[:10]}...")

    # 캐시 확인
    cached_result = cache.get_from_cache(cache_key)

    if cached_result:
        print("Returning from cache")

        cached_result.cached = True
        return cached_result
    
    else:
        # 캐시에 결과가 없으면 ai호출 시뮬
        print("Calling AI simulation.")
        ai_response = await get_trend_design_code(component_type, code_format)

        # ai 결과를 캐시에 저장
        cache.set_to_cache(cache_key, ai_response)

        # ai 결과 반환 
        print("Returning from AI simulation")
        return ai_response

