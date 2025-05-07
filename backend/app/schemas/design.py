from pydantic import BaseModel
from typing import List, Optional # 필요한 타입 가져오기

# 사용자의 트렌드 스타일 요청 모델
class DesignRequest(BaseModel):
    """
    프론트엔드에서 백엔드로 보내는 트렌드 스타일 요청 데이터 모델
    """

    prompt: str  #사용자가 입력한 스타일 관련 설명 또는 키워드 
    keywords: Optional[List[str]] = None # 스타일 관련 추가 키워드 (필수 아님)

# 백엔드 api가 프론트엔드로 응답할 결과 모델
class DesignResponse(BaseModel):
    """
    백엔드에서 프론트엔드로 보내는 트렌드 스타일 생성 결과 데이터 모델
    """

    generated_text: str # ai가 생성한 스타일 설명 텍스트
    sample_code: str # ai가 제공하거나 찾아준 관련 이미지 URL
    cached: bool # 이 결과가 캐시에서 가져온 것인지 여부


    