"""
캐시 관리 모듈입니다.
메모리 기반의 LRU 캐시를 구현하여 디자인 응답을 캐싱합니다.
"""

import json 
import time
from typing import Dict, Any, Optional, Tuple
from collections import OrderedDict
from app.schemas.design import DesignResponse
from app.core.config import MAX_CACHE_SIZE, ENABLE_AUTO_CLEANUP, CLEANUP_INTERVAL
from app.core.cache_utils import generate_cache_key, is_cache_expired, log_cache_event

# 메모리 캐시 저장소 (OrderedDict 사용하여 LRU 구현)
# OrderedDict는 항목의 삽입 순서를 기억하여 가장 오래된 항목을 쉽게 제거할 수 있음
_in_memory_cache: OrderedDict[str, Dict[str, Any]] = OrderedDict()

# 캐시 설정
CACHE_TTL = 3600  # 1시간 - 디자인 트렌드는 자주 변경되지 않으므로 1시간으로 설정

def generate_cache_key(component_type: str, code_format: str) -> str:
    """
    컴포넌트 타입과 코드 포맷을 기반으로 캐시 키를 생성합니다.
    
    Args:
        component_type (str): 컴포넌트의 타입 (예: 'button', 'card' 등)
        code_format (str): 코드 포맷 (예: 'html', 'css' 등)
    
    Returns:
        str: 생성된 캐시 키 (SHA-256 해시)
    """
    key_data = {
        "component_type": component_type,
        "code_format": code_format
    }
    import hashlib
    json_string = json.dumps(key_data, sort_keys=True)
    return hashlib.sha256(json_string.encode('utf-8')).hexdigest()

def _is_cache_expired(timestamp: float) -> bool:
    """
    캐시 항목이 만료되었는지 확인합니다.
    
    Args:
        timestamp (float): 캐시 항목이 저장된 시간
    
    Returns:
        bool: 만료 여부 (True: 만료됨, False: 유효함)
    """
    return time.time() - timestamp > CACHE_TTL

def _cleanup_expired_cache():
    """
    만료된 캐시 항목을 제거합니다.
    캐시 크기를 관리하고 메모리를 효율적으로 사용하기 위해 주기적으로 호출되어야 함
    """
    expired_keys = [
        key for key, value in _in_memory_cache.items()
        if is_cache_expired(value.get('timestamp', 0))
    ]
    for key in expired_keys:
        del _in_memory_cache[key]
        log_cache_event('EXPIRED', key)

def get_from_cache(key: str) -> Optional[DesignResponse]:
    """
    캐시에서 디자인 응답을 가져옵니다.
    
    Args:
        key (str): 캐시 키
    
    Returns:
        Optional[DesignResponse]: 캐시된 디자인 응답 또는 None (캐시 미스/만료 시)
    """
    try:
        if key in _in_memory_cache:
            cache_data = _in_memory_cache[key]
            
            # 만료 체크 - 캐시된 데이터가 CACHE_TTL 시간을 초과했는지 확인
            if is_cache_expired(cache_data.get('timestamp', 0)):
                del _in_memory_cache[key]
                log_cache_event('EXPIRED', key)
                return None
                
            log_cache_event('HIT', key)
            # LRU 구현을 위해 캐시된 데이터를 최근 사용된 것으로 표시
            _in_memory_cache.move_to_end(key)
            return DesignResponse(**cache_data['data'])
            
        log_cache_event('MISS', key)
        return None
    except Exception as e:
        log_cache_event('ERROR', key, f"캐시 조회 중 오류 발생: {str(e)}")
        return None

def set_to_cache(key: str, data: DesignResponse):
    """
    디자인 응답을 캐시에 저장합니다.
    
    Args:
        key (str): 캐시 키
        data (DesignResponse): 저장할 디자인 응답 데이터
    """
    try:
        # 캐시 크기 제한 체크 - MAX_CACHE_SIZE를 초과하면 가장 오래된 항목 제거
        if len(_in_memory_cache) >= MAX_CACHE_SIZE:
            # 가장 오래된 항목 제거 (LRU 정책)
            _in_memory_cache.popitem(last=False)
            
        # 만료된 캐시 정리 - 메모리 관리를 위해 주기적으로 실행
        if ENABLE_AUTO_CLEANUP:
            _cleanup_expired_cache()
        
        # 새로운 데이터 저장 - 타임스탬프와 함께 저장하여 만료 시간 추적
        _in_memory_cache[key] = {
            'data': data.model_dump(),
            'timestamp': time.time()
        }
        log_cache_event('SET', key)
    except Exception as e:
        log_cache_event('ERROR', key, f"캐시 저장 중 오류 발생: {str(e)}")