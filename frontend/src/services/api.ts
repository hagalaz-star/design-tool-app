import axios from "axios";
import { ComponentType, ComponentOptionsTypeMap } from "@/types";

// API 요청 타입 정의
type APIResponse<T> = {
  data: T;
  error?: string;
};

// AI 최적화 요청 인터페이스
interface OptimizeCodeRequest {
  code: string;
  componentType: ComponentType;
  options: ComponentOptionsTypeMap[ComponentType];
  codeFormat: "react-tailwind" | "react-scss";
}

// AI 디자인 추천 요청 인터페이스
interface DesignRecommendationRequest {
  componentType: ComponentType;
  codeFormat: "react-tailwind" | "react-scss";
}

// 트렌드 디자인 응답 인터페이스
export interface TrendDesignResponse {
  generated_text: string;
  cached: boolean;
}

// API 서비스 클래스
class ApiService {
  private baseUrl: string;

  constructor() {
    this.baseUrl = "/api";
  }

  // AI 코드 최적화
  async optimizeCode({
    code,
    componentType,
    options,
    codeFormat,
  }: OptimizeCodeRequest): Promise<string> {
    try {
      const prompt = `코드 최적화 요청:
        - 형식: ${
          codeFormat === "react-tailwind" ? "React tailwind" : "react-scss"
        }
        - 컴포넌트: ${componentType}
        - 옵션: ${JSON.stringify(options)}
        
        개선 목표:
        1. 현재 코드의 기본 구조와 형식은 유지하면서 개선
        2. 접근성 속성 추가 (aria-label 등)
        3. 적절한 호버/액티브 상태 효과 개선
        4. 필요한 경우에만 추가 기능 도입
        
        원본 코드:
        \`\`\`
        ${code}
        \`\`\`
        
        중요 지침:
        - 원본 코드 형식을 크게 바꾸지 말고 필요한 개선만 수행하세요.
        - 단일 버튼 요소만 최적화하고, 전체 컴포넌트로 변환하지 마세요.
        - 불필요한 기능이나 상태를 추가하지 마세요.
        - Tailwind 클래스 문법을 정확히 사용하세요.
        - 코드만 반환하고 설명은 포함하지 마세요.`;

      const response = await axios.post<{ text: string }>(
        `${this.baseUrl}/gemini`,
        {
          prompt,
        }
      );

      return response.data.text;
    } catch (error) {
      console.error("코드 최적화 API 오류:", error);
      throw new Error("코드 최적화 중 오류가 발생했습니다");
    }
  }

  // AI 디자인 추천
  async getDesignRecommendations({
    componentType,
    codeFormat,
  }: DesignRecommendationRequest): Promise<any> {
    try {
      let promptText = "";

      if (codeFormat === "react-tailwind") {
        promptText = `Create 4 different design styles for a ${componentType} component using Tailwind CSS:
          1. Minimalist
          2. Neumorphic
          3. Glassmorphic
          4. Material Design
        
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
        promptText = `Create 4 different design styles for a ${componentType} component using React with SCSS:
          1. Minimalist
          2. Neumorphic
          3. Glassmorphic
          4. Material Design
          
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

      const response = await axios.post(`${this.baseUrl}/gemini`, {
        prompt: promptText,
      });

      return response.data;
    } catch (error) {
      console.error("디자인 추천 API 오류:", error);
      throw new Error("디자인 추천을 가져오는 중 오류가 발생했습니다");
    }
  }

  // 트렌드 디자인 가져오기
  async getTrendDesign(
    componentType: ComponentType
  ): Promise<TrendDesignResponse> {
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

      // 실제 API 엔드포인트로 변경 (현재는 예시)
      const response = await axios.post<TrendDesignResponse>(
        `${process.env.NEXT_PUBLIC_API_URL}/api/design/trend`,
        request,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          timeout: 30000,
        }
      );

      return response.data;
    } catch (error) {
      console.error("트렌드 디자인 API 오류:", error);
      throw new Error("트렌드 디자인을 가져오는 중 오류가 발생했습니다");
    }
  }
}

// 싱글톤 인스턴스 생성 및 내보내기
export const apiService = new ApiService();
