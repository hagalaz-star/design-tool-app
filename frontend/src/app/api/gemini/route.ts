import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const api_key = process.env.Gemini_API || "";
const genAi = new GoogleGenerativeAI(api_key);

export async function POST(request: Request) {
  try {
    const { prompt } = await request.json();

    if (!prompt) {
      return NextResponse.json(
        { error: "프롬프트가 필요합니다" },
        { status: 400 }
      );
    }

    const model = genAi.getGenerativeModel({ model: "gemini-2.0-flash-lite" });
    const result = await model.generateContent(prompt);
    const response = result.response;
    const textResponse = await response.text();

    // return NextResponse.json({ text: textResponse });

    // 코드 블록 내부의 JSON 추출 (```json ... ``` 패턴)
    let jsonData = null;

    const jsonCodeBlockMatch = textResponse.match(
      /```(?:json)?\s*([\s\S]*?)\s*```/
    );
    if (jsonCodeBlockMatch && jsonCodeBlockMatch[1]) {
      try {
        jsonData = JSON.parse(jsonCodeBlockMatch[1].trim());
      } catch (e) {
        console.error("JSON 파싱 오류:", e);
      }
    }

    // 코드 블록이 없거나 파싱에 실패한 경우 중괄호로 직접 찾기

    if (!jsonData) {
      try {
        const startIdx = textResponse.indexOf("{");
        const lastIdx = textResponse.lastIndexOf("}") + 1;
        if (startIdx != -1 && lastIdx > startIdx) {
          const jsonCandidate = textResponse.substring(startIdx, lastIdx);
          jsonData = JSON.parse(jsonCandidate);
        }
      } catch (e) {
        console.error("직접 JSON 추출 실패:", e);
      }
    }
    return NextResponse.json({
      text: textResponse,
      json: jsonData,
    });
  } catch (error) {
    console.error("Error generating code:", error);
    return NextResponse.json(
      { error: "코드 생성 중 오류가 발생했습니다" },
      { status: 500 }
    );
  }
}
