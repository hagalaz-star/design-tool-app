import styles from "./TrendDesign.module.scss";
import axios, { AxiosError } from "axios";
import { ComponentType } from "../../types";
import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface TrendDesignResponse {
  generated_text: string;
  cached: boolean;
}

interface TrendDesignRequest {
  prompt: string;
  keywords?: string[];
}

interface TrendDesignProps {
  componentType: ComponentType;
  onSelectDesign: (code: string) => void;
}

// API 요청 함수를 분리
const fetchTrendDesignAPI = async (
  request: TrendDesignRequest
): Promise<TrendDesignResponse> => {
  const response = await axios.post<TrendDesignResponse>(
    `${process.env.NEXT_PUBLIC_API_URL}/api/design/trend`,
    request,
    {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      timeout: 30000, // 30초 타임아웃
    }
  );
  return response.data;
};

function TrendDesign({ componentType, onSelectDesign }: TrendDesignProps) {
  const [trendResult, setTrendResult] = useState<TrendDesignResponse | null>(
    null
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (trendResult) {
      console.log("트렌드 결과:", trendResult);
    }
  }, [trendResult]);

  const fetchTrendDesign = async () => {
    setLoading(true);
    setError(null);

    try {
      const request = {
        prompt: `최신 트렌드 ${componentType} 디자인 - 마크다운 형식으로 코드 예제와 함께 제공해주세요`,
        keywords: [
          "react",
          "design",
          componentType,
          "markdown",
          "code example",
        ],
      };

      const result = await fetchTrendDesignAPI(request);
      setTrendResult(result);
    } catch (error) {
      const axiosError = error as AxiosError;
      console.error("트렌드 디자인 가져오기 실패:", axiosError);

      if (axiosError.response) {
        // 서버에서 응답이 왔지만 에러인 경우
        setError(
          `서버 오류: ${axiosError.response.status} - ${axiosError.response.data}`
        );
      } else if (axiosError.request) {
        // 요청은 보냈지만 응답이 없는 경우
        setError("서버에 연결할 수 없습니다. 네트워크 연결을 확인해주세요.");
      } else if (axiosError.code === "ECONNABORTED") {
        // 타임아웃 발생
        setError("요청 시간이 초과되었습니다. 다시 시도해주세요.");
      } else {
        // 기타 에러
        setError("트렌드 디자인을 가져오는중 오류가 발생했습니다");
      }
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
            <div className={styles.markdownContent}>
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {trendResult?.generated_text}
              </ReactMarkdown>
            </div>

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
