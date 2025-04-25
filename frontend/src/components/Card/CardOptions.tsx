import React from "react";
import { CardOptions } from "@/types";
import styles from "./Card.module.scss";

interface CardOptionsProps {
  options: CardOptions;
  onOptionChange: (name: string, value: any) => void;
}
function CardOptionsPanel({ options, onOptionChange }: CardOptionsProps) {
  const renderOptions = () => {
    return (
      <div className={styles.OptionsPanel}>
        <div className={styles.optionItem}>
          <label>배경색</label>
          <input
            type="color"
            value={options.backgroundColor}
            onChange={(e) => onOptionChange("backgroundColor", e.target.value)}
          />
        </div>

        <div className={styles.optionItem}>
          <label>텍스트 색상</label>
          <input
            type="color"
            value={options.color}
            onChange={(e) => onOptionChange("color", e.target.value)}
          />
        </div>

        <div className={styles.optionItem}>
          <label>테두리 반경</label>
          <input
            type="number"
            value={parseInt(options.borderRadius) || ""}
            onChange={(e) =>
              onOptionChange("borderRadius", `${e.target.value}px`)
            }
          />
        </div>

        <div className={styles.optionItem}>
          <label>그림자</label>
          <select
            value={options.shadow}
            onChange={(e) => onOptionChange("shadow", e.target.value)}
          >
            <option value="small">작게</option>
            <option value="medium">중간</option>
            <option value="large">크게</option>
          </select>
        </div>

        <div className={styles.optionItem}>
          <label>내부 여백</label>
          <input
            type="number"
            value={parseInt(options.padding) || ""}
            onChange={(e) => onOptionChange("padding", `${e.target.value}px`)}
          />
        </div>

        <div className={styles.optionItem}>
          <label>레이아웃</label>
          <select
            value={options.layout}
            onChange={(e) => onOptionChange("layout", e.target.value)}
          >
            <option value="vertical">세로</option>
            <option value="horizontal">가로</option>
          </select>
        </div>

        <div className={styles.optionItem}>
          <label>이미지 위치</label>
          <select
            value={options.imagePosition}
            onChange={(e) => onOptionChange("imagePosition", e.target.value)}
          >
            <option value="top">상단</option>
            <option value="left">좌측</option>
            <option value="right">우측</option>
          </select>
        </div>

        <div className={styles.optionItem}>
          <label>내용 정렬</label>
          <select
            value={options.contentAlignment}
            onChange={(e) => onOptionChange("contentAlignment", e.target.value)}
          >
            <option value="left">좌측</option>
            <option value="center">중앙</option>
            <option value="right">우측</option>
          </select>
        </div>

        <div className={styles.optionItem}>
          <label>제목</label>
          <input
            type="text"
            value={options.title}
            onChange={(e) => onOptionChange("title", e.target.value)}
          />
        </div>

        <div className={styles.optionItem}>
          <label>설명</label>
          <textarea
            value={options.description}
            onChange={(e) => onOptionChange("description", e.target.value)}
          />
        </div>

        <div className={styles.optionItem}>
          <label>이미지 URL</label>
          <input
            type="text"
            value={options.imageUrl}
            onChange={(e) => onOptionChange("imageUrl", e.target.value)}
          />
        </div>
      </div>
    );
  };

  return (
    <div className={styles.OptionsPanel}>
      <h3>카드 옵션 설정</h3>
      {renderOptions()}
    </div>
  );
}

export default CardOptionsPanel;
