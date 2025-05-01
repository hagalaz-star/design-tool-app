import styles from "./TrendDesign.module.scss";
import axios from "axios";
import { ComponentType } from "../../types";
import React, { useState } from "react";

interface TrendDesignResponse {
  generated_text: string;
  image_url: string;
  cached: boolean;
}

interface TrendDesignProps {
  componentType: ComponentType;
  onSelectDesign: (code: string) => void;
}

function TrendDesign({ componentType, onSelectDesign }: TrendDesignProps) {
  const [trendResult, setTrendResult] = useState<TrendDesignResponse | null>(
    null
  );
  const [loading, setLoading] = useState(false); // 로딩
  const [error, setError] = useState("");

  const fetchTrendDesign = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await axios.post("/api/design/trend", {
        prompt: `최신 트렌드 ${componentType} 디자인`,
        keywords: [componentType, "최신", "트렌드"],
      });

      setTrendResult(response.data);
    } catch (error) {
      console.error("트렌드 디자인 가져오기 실패:", error);
      setError("트렌드 디자인을 가져오는중 오류가 발생했습니다");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.TrendDesignContainer}>
      <h3 className={styles.trendDesignTitle}> 트렌드 스타일 추천</h3>

      <br />

      <button
        onClick={fetchTrendDesign}
        disabled={loading}
        className={styles.trendButton}
      >
        트렌드 스타일 추천 받기
      </button>

      {loading && (
        <p className={styles.loadingMessage}>트렌드 스타일 가져오는중..</p>
      )}
      {error && <p className={styles.errorMessage}>{error}</p>}

      {trendResult && (
        <div className={styles.resultContainer}>
          <div className={styles.resultHeader}>
            {trendResult?.cached && (
              <span className={styles.cachedBadge}>캐시됨</span>
            )}
            <h4>트렌드 스타일 추천</h4>
          </div>

          <div className={styles.resultContent}>
            <p>{trendResult?.generated_text}</p>

            {trendResult.image_url && (
              <div className={styles.imageContainer}>
                <img src={trendResult.image_url} alt="트렌드 스타일 이미지" />
              </div>
            )}

            <button
              className={styles.applyButton}
              onClick={() => onSelectDesign(trendResult.generated_text)}
            >
              이 스타일 적용하기
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default TrendDesign;
