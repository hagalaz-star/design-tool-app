import axios from "axios";
import styles from "./AiDesign.module.scss";
import React, { useEffect, useState } from "react";
import { ComponentType } from "../../types/index";
import useComponentStore from "@/store/useComponentStore";
import hljs from "highlight.js";
import "highlight.js/styles/github.css";

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

  const { codeFormat } = useComponentStore();

  useEffect(() => {
    if (designVariant.length > 0) {
      document.querySelectorAll(".codePreview code").forEach((block) => {
        hljs.highlightElement(block as HTMLElement);
      });
    }
  }, [designVariant]);

  const recommendedDesign = async () => {
    setLoading(true);
    setError("");
    setDesignVariant([]);

    // API 요청을 통해 여러 디자인 변형 생성 요청
    try {
      let promptText = "";

      if (codeFormat === "react-tailwind") {
        promptText = `Create 4 different design styles for a ${componentType} component using Tailwind CSS:
      1. Minimalist
      2. Neumorphic
      3. Glassmorphic
      4. Material Design
      5. Skeuomorphic
      6. Brutalist
    
      For each style, provide:
      - Style name (e.g., "Minimalist Button")
      - A brief description of the style
      - Complete React component code using inline Tailwind classes

      IMPORTANT: 
        - Each design must use ONLY inline Tailwind CSS classes
        - DO NOT use external CSS/SCSS files or imports
        - Return ONLY a valid JSON object with NO markdown formatting
     
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
      } else {
        // SCSS 형식일 경우
        promptText = `Create 4 different design styles for a ${componentType} component using React with SCSS:
      1. Minimalist
      2. Neumorphic
      3. Glassmorphic
      4. Material Design
      5. Skeuomorphic
      6. Brutalist
      
      For each style, provide:
      - Style name (e.g., "Minimalist Button")
      - A brief description of the style
      - Complete code including BOTH the React component AND the SCSS styles in a single code block
      
      IMPORTANT:
      - For each design, include BOTH the React component AND the complete SCSS code in the same code block
      - The SCSS should be written DIRECTLY after the React component, not as a separate import
      - Format like this:
      
      // React component
      const ComponentName = () => {
        return (...);
      };
      
      // SCSS styles directly below
      .class-name {
        property: value;
        &:hover { ... }
      }
      
      - Return ONLY a valid JSON object with NO markdown formatting
      
      The JSON must follow this exact structure:
      {
        "variants": [
          {
            "designName": "Style Name",
            "code": "// Combined React component and SCSS styles in one block",
            "description": "Brief description of the style"
          },
          ...
        ]
      }`;
      }

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
      <p>
        현재 선택된 포맷:
        {codeFormat === "react-tailwind" ? " Tailwind CSS" : " SCSS"}
      </p>
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
