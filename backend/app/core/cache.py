import json 
from typing import Dict, Any, List, Optional 
from app.schemas.design import DesignResponse

# 메모리 캐시 저장소 (간단한 딕셔너리)
_in_memory_cache: Dict[str, Dict[str, Any]] = {}

#캐시 만료 시간 (초) - 예시로 5분 설정
CACHE_TTL = 300

# 요청 데이터를 기반으로 고유한 캐시 키 생성 함수
# 요청 데이터가 동일하면 동일한 키가 나와야 함
def generate_cache_key(prompt: str, keywords: Optional[List[str]]) -> str:
    key_data = {
        "prompt": prompt,
        "keywords": sorted(keywords) if keywords else None 
    }
    import hashlib
    json_string = json.dumps(key_data, sort_keys=True)
    return hashlib.sha256(json_string.encode('utf-8')).hexdigest()

# 캐시에서 데이터 가져오기
def get_from_cache(key: str) -> Optional[DesignResponse]:

    # 저장된 시간과 CACHE_TTL 비교
    if key in _in_memory_cache:
        print(f"Cache HIT for key: {key[:10]}...")
        #저장된 딕셔너리를 Response 모델로 변환하여 반환
        return DesignResponse(** _in_memory_cache[key])
    print(f"Cache MISS for key:{key[:10]}...")
    return None

# 캐시에 데이터 저장하기
def set_to_cache(key: str, data: DesignResponse):
    # 저장 시각과 함께 저장하는 로직 추가 필요
    _in_memory_cache[key] = data.model_dump()
    print(f"Cache SET for key:{key[:10]}...")