import datetime
from sqlalchemy import Integer, String, func , Text, DateTime
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column

# 모든모델이 상속 받을 베이스 클래스 정의 
class Base(DeclarativeBase):
    
    pass


class DesignResult(Base):

    __tablename__ = "design_reaults"

    # 기본키 (Primary key) - 각 로우를 고유하게 식별하는 컬럼
    id: Mapped[int] = mapped_column(Integer, primary_key = True, index = True)

    # 요청 식별키 (캐싱에도 사용될 고유 키)
    # 요청의 prompt와 keywords 등을 조합하여 생성된 해시값 등을 저장
    request_key: Mapped[str] = mapped_column(String, unique=True, index=True)

    # 원본 요청 정보 (어떤 요청에 대한 결과인지 알 수 있도록 저장)
    # Text 타입을 사용하여 긴 Prompt도 저장 가능
    request_prompt: Mapped[str] = mapped_column(Text)

    # DB를 콤마 등으로 구분하여 저장(키워드)
    request_keywords_str: Mapped[str] = mapped_column(String, nullable= True , default= None)

    # AI 생성 결과 데이터
    generated_text: Mapped[str] = mapped_column(Text) 

    # 관련 이미지 url (ai가 제공하거나 백엔드가 찾아서 저장)
    image_url: Mapped[str] = mapped_column(String, nullable=True, default= None)

    # 레코드 생성 시각 (데이터가 DB에 저장된 시간)
    created_at: Mapped[datetime.datetime] = mapped_column(DateTime, server_default=func.now(), index=True)

    # Optional: 이 모델 객체를 print() 했을 때 보기 좋은 형태
    def __repr__(self) -> str:
        return f"<DesignResult(id={self.id}, request_key = '{self.request_key[:20]}...', created_at='{self.created_at}')>"