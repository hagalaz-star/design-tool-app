"""
캐시 관련 설정을 관리하는 모듈입니다.
"""

# 캐시 기본 설정
CACHE_TTL = 3600  # 1시간 - 디자인 트렌드는 자주 변경되지 않으므로 1시간으로 설정
MAX_CACHE_SIZE = 1000  # 최대 캐시 항목 수 - 메모리 사용량을 제한하기 위한 설정

# 캐시 로깅 설정
ENABLE_CACHE_LOGGING = True  # 캐시 동작 로깅 활성화 여부
LOG_CACHE_HITS = True  # 캐시 히트 로깅 여부
LOG_CACHE_MISSES = True  # 캐시 미스 로깅 여부

# 캐시 정리 설정
CLEANUP_INTERVAL = 300  # 캐시 정리 주기 (초)
ENABLE_AUTO_CLEANUP = True  # 자동 캐시 정리 활성화 여부 