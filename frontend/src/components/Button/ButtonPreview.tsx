import React, { CSSProperties} from "react";
import { ButtonOptions } from "@/types";
import styles from "./Button.module.scss";

interface ButtonPreviewProps {
  options: ButtonOptions;
}

function ButtonPreview({ options }: ButtonPreviewProps) {
  // 기본 스타일 정의
  const buttonStyle: CSSProperties = {
    backgroundColor: options.backgroundColor,
    color: options.color,
    borderRadius: options.borderRadius,
    padding:
      options.size === "small"
        ? "6px 12px"
        : options.size === "medium"
        ? "8px 16px"
        : "10px 20px",
    border: "none",
    cursor: options.disabled ? "not-allowed" : "pointer",
    textAlign: "center",
    textDecoration: "none",
    fontSize:
      options.size === "small"
        ? "14px"
        : options.size === "medium"
        ? "16px"
        : "18px",
    transition: "all 0.3s ease",
    opacity: options.disabled ? 0.6 : 1,
    position: "relative",
    overflow: "hidden",
  };

  // 동적 클래스 생성
  const buttonClasses = [
    styles.button,
    options.hoverEffect ? styles[`hover-${options.hoverEffect}`] : "",
    options.clickEffect ? styles[`click-${options.clickEffect}`] : "",
    options.disabled ? styles.disabled : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      style={buttonStyle}
      className={buttonClasses}
      disabled={options.disabled}
    >
      {options.text || "버튼"}
    </button>
  );
}

export default ButtonPreview;
