import React from "react";
import styles from "./Button.module.scss";
import { ButtonOptions } from "@/types/index";

interface ButtonOptionsProps {
  options: ButtonOptions;
  onOptionChange: (name: string, value: any) => void;
}

function ButtonOptionsPanel({ options, onOptionChange }: ButtonOptionsProps) {
  const renderOptions = () => {
    return (
      <div className={styles.optionsPanel}>
        <div className={styles.optionItem}>
          <label>배경색</label>
          <input
            type="color"
            value={options.backgroundColor}
            onChange={(e) => onOptionChange("backgroundColor", e.target.value)}
          />
        </div>

        <div className={styles.optionItem}>
          <label>텍스트 색깔</label>
          <input
            type="color"
            value={options.color}
            onChange={(e) => onOptionChange("color", e.target.value)}
          />
        </div>

        <div className={styles.optionItem}>
          <label>텍스트</label>
          <input
            type="text"
            value={options.text}
            onChange={(e) => onOptionChange("text", e.target.value)}
          />
        </div>

        <div className={styles.optionItem}>
          <label>크기</label>
          <select
            value={options.size}
            onChange={(e) => onOptionChange("size", e.target.value)}
          >
            <option value="small">작게</option>
            <option value="medium">중간</option>
            <option value="large">크게</option>
          </select>
        </div>

        <div className={styles.optionItem}>
          <label>테두리 반경</label>
          <input
            type="number"
            value={options.borderRadius ? parseInt(options.borderRadius) : ""}
            onChange={(e) =>
              onOptionChange(
                "borderRadius",
                e.target.value ? `${e.target.value}px` : ""
              )
            }
          />
        </div>

        <div className={styles.optionItem}>
          <label>호버 효과</label>
          <select
            value={options.hoverEffect}
            onChange={(e) => onOptionChange("hoverEffect", e.target.value)}
          >
            <option value="scale">확대</option>
            <option value="lift">들기</option>
            <option value="glow">발광</option>
          </select>
        </div>

        <div className={styles.optionItem}>
          <label>클릭 효과</label>
          <select
            value={options.clickEffect}
            onChange={(e) => onOptionChange("clickEffect", e.target.value)}
          >
            <option value="press">누르기</option>
            <option value="ripple">물결</option>
            <option value="none">없음</option>
          </select>
        </div>

        <div className={styles.optionItem}>
          <label>비활성화</label>
          <input
            type="checkbox"
            checked={options.disabled}
            onChange={(e) => onOptionChange("disabled", e.target.checked)}
          />
        </div>
      </div>
    );
  };

  return (
    <div className={styles.OptionsPanel}>
      <h3>버튼 옵션 설정</h3>
      {renderOptions()}
    </div>
  );
}

export default ButtonOptionsPanel;
