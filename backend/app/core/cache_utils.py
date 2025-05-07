"""
캐시 관련 유틸리티 함수들을 관리하는 모듈입니다.
"""

import json
import hashlib
import time
from typing import Dict, Any, Optional
from app.core.config import CACHE_TTL, ENABLE_CACHE_LOGGING, LOG_CACHE_HITS, LOG_CACHE_MISSES

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
    json_string = json.dumps(key_data, sort_keys=True)
    return hashlib.sha256(json_string.encode('utf-8')).hexdigest()

def is_cache_expired(timestamp: float) -> bool:
    """
    캐시 항목이 만료되었는지 확인합니다.
    
    Args:
        timestamp (float): 캐시 항목이 저장된 시간
    
    Returns:
        bool: 만료 여부 (True: 만료됨, False: 유효함)
    """
    return time.time() - timestamp > CACHE_TTL

def log_cache_event(event_type: str, key: str, message: str = ""):
    """
    캐시 이벤트를 로깅합니다.
    
    Args:
        event_type (str): 이벤트 타입 ('HIT', 'MISS', 'EXPIRED', 'SET' 등)
        key (str): 캐시 키
        message (str): 추가 메시지
    """
    if not ENABLE_CACHE_LOGGING:
        return
        
    if event_type == 'HIT' and not LOG_CACHE_HITS:
        return
    if event_type == 'MISS' and not LOG_CACHE_MISSES:
        return
        
    log_message = f"Cache {event_type} for key: {key[:10]}..."
    if message:
        log_message += f" {message}"
    print(log_message) 