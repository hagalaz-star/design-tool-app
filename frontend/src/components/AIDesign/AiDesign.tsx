import axios from "axios";
import styles from "./AiDesign.module.scss";
import React, { useState } from "react";
import { ComponentType } from "../../types/index";

// ai 디자인 종류
interface DesignVariant {
  designName: string;
  code: string;
  description: string;
}

// 기존의 props
interface AiDesignProps {
  componentType: ComponentType;
  onSelectDesign: (code: string) => void;
}

function AiDesign({ componentType, onSelectDesign }: AiDesignProps) {
  const [designVariant, setDesignVariant] = useState<DesignVariant[]>([]); // 디자인 4가지 배열
  const [loading, setLoading] = useState(false); // 로딩
  const [error, setError] = useState("");

  const recommendedDesign = async () => {
    setLoading(true);
    setError("");
    setDesignVariant([]);

    // API 요청을 통해 여러 디자인 변형 생성 요청
    try {
      const promptText = `Create 4 different design styles for a ${componentType} component:
      1. Minimalist
      2. Neumorphic
      3. Glassmorphic
      4. Material Design
      5. Skeuomorphic
      6. Brutalist
    
      For each style, provide:
      - Style name
      - Complete React code using Tailwind CSS
      - A brief description of the style
    
      IMPORTANT: Return ONLY a valid JSON object with NO markdown formatting or code blocks.
      The JSON must follow this exact structure:
      {
        "variants": [
          {
            "designName": "Style name",
            "code": "Complete React code with Tailwind",
            "description": "Brief description"
          },
          ...
        ]
      }`;

      const response = await axios.post("/api/gemini", {
        prompt: promptText,
      });

      // 응답 텍스트 처리 및 JSON 파싱을 단일 try-catch 내에서

      const responseData = response.data;

      if (responseData.json && responseData.json.variants) {
        setDesignVariant(responseData.json.variants);
        console.log(responseData.json.variants);

        if (responseData.json.variants.length === 0) {
          setError("디자인 변형이 없습니다");
        }
        // 디자인 변형이 성공적으로 받아졌을 때는 에러 메시지를 설정하지 않음
      } else {
        setError("API 응답에 디자인 변형이 없습니다");
      }
    } catch (ApiError: any) {
      console.error("API 요청 오류:", ApiError);
      setError(
        ApiError.responseData?.data?.error ||
          "데이터 로드에 실패했습니다 다시 시도해 주세요"
      );
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className={styles.aiDesignContainer}>
      <h3 className={styles.aiDesignTitle}>AI 추천 디자인 코드</h3>
      <br></br>
      <button
        onClick={recommendedDesign}
        disabled={loading}
        className={styles.recommendButton}
      >
        AI 추천 디자인 버튼
      </button>

      {loading && (
        <p className={styles.loadingMessage}>AI가 디자인 추천 하는중...</p>
      )}

      {error && <p className={styles.errorMessage}>{error}</p>}

      {designVariant.length > 0 && (
        <div className={styles.designVariantsGrid}>
          {designVariant.map((variant, index) => (
            <div key={index} className={styles.variantItem}>
              <h4 className={styles.designName}>{variant.designName}</h4>
              <p className={styles.designDescription}>{variant.description}</p>
              <div className={styles.codePreview}>
                <pre>
                  <code>{variant.code.substring(0, 100)}</code>
                </pre>
              </div>
              <button
                className={styles.selectDesign}
                onClick={() => onSelectDesign(variant.code)}
              >
                이 디자인 선택하기
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AiDesign;
