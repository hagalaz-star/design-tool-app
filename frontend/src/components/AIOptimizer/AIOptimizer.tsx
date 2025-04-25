import React, { useState } from "react";
import { ComponentType, ComponentOptionsTypeMap } from "../../types/index";
import axios from "axios";
import styles from "./AIOptimizer.module.scss";

interface AIOptimizerProps {
  currentCode: string; // 현재 코드
  componentType: ComponentType; // 디자인 유형
  options: ComponentOptionsTypeMap[ComponentType]; // 디자인 유형 상세 정의
  codeFormat: "react-tailwind" | "react-scss"; // 디자인 코드로 나타내는 2종류
  onApplyOptimized: (optimizedCode: string) => void;
}

function AIOptimizer({
  currentCode,
  componentType,
  options,
  codeFormat,
  onApplyOptimized,
}: AIOptimizerProps) {
  const [optimizedCode, setOptimizedCode] = useState(""); // 최적화 코드
  const [loading, setLoading] = useState(false); // 로딩
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    setLoading(true);
    setError("");
    setOptimizedCode("");

    const optimizationPrompt = `코드 최적화 요청:
    - 형식: ${codeFormat === "react-tailwind" ? "React tailwind" : "react-scss"}
    - 컴포넌트: ${componentType}
    - 옵션: ${JSON.stringify(options)}
    
    개선 목표:
    1. 현재 코드의 기본 구조와 형식은 유지하면서 개선
    2. 접근성 속성 추가 (aria-label 등)
    3. 적절한 호버/액티브 상태 효과 개선
    4. 필요한 경우에만 추가 기능 도입
    
    원본 코드:
    \`\`\`
    ${currentCode}
    \`\`\`
    
    중요 지침:
    - 원본 코드 형식을 크게 바꾸지 말고 필요한 개선만 수행하세요.
    - 단일 버튼 요소만 최적화하고, 전체 컴포넌트로 변환하지 마세요.
    - 불필요한 기능이나 상태를 추가하지 마세요.
    - Tailwind 클래스 문법을 정확히 사용하세요.
    - 코드만 반환하고 설명은 포함하지 마세요.`;

    try {
      const response = await axios.post("/api/gemini", {
        prompt: optimizationPrompt,
      });

      const resultText = response.data.text;
      setOptimizedCode(resultText);
    } catch (error: any) {
      setError(error.response?.data?.error || "코드 생성 실패");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.optimizerContainer}>
      <h3 className={styles.optimizerTitle}>AI 코드 최적화</h3>
      <br></br>
      <button
        onClick={handleSubmit}
        disabled={loading}
        className={styles.optimizeButton}
      >
        AI 최적화 버튼
      </button>

      {loading && (
        <p className={styles.loadingMessage}>AI가 코드를 최적화 하는중...</p>
      )}
      {error && <p className={styles.error}>{error}</p>}

      {optimizedCode && (
        <div className={styles.resultContainer}>
          <h4 className={styles.resultTitle}>AI가 최적화한 코드</h4>
          <pre className={styles.codeDisplay}>
            <code>{optimizedCode}</code>
          </pre>
          <button
            onClick={() => onApplyOptimized(optimizedCode)}
            className={styles.applyButton}
          >
            이 코드 적용하기
          </button>
        </div>
      )}
    </div>
  );
}

export default AIOptimizer;
