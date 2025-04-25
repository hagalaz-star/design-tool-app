import React, { CSSProperties } from "react";
import { CardOptions } from "@/types";
import styles from "./Card.module.scss";

interface CardPreviewProps {
  options: CardOptions;
}

function CardPreview({ options }: CardPreviewProps) {
  const cardStyle: CSSProperties = {
    backgroundColor: options.backgroundColor,
    color: options.color,
    borderRadius: options.borderRadius,
    boxShadow:
      options.shadow === "small"
        ? "2px 2px 5px rgba(0, 0, 0, 0.1)"
        : options.shadow === "medium"
        ? "5px 5px 10px rgba(0, 0, 0, 0.1)"
        : "8px 8px 15px rgba(0, 0, 0, 0.15)",
    padding: options.padding,
    overflow: "hidden",
    transition: "all 0.3s ease",
    display: "flex",
    flexDirection: options.layout === "vertical" ? "column" : "row",
    maxWidth: "400px",
    width: "100%",
  };

  const imageStyle: CSSProperties = {
    width: options.layout === "vertical" ? "100%" : "40%",
    minWidth: options.layout === "vertical" ? "auto" : "120px",
    height: options.layout === "vertical" ? "200px" : "auto",
    minHeight: "120px",
    backgroundColor: "#f0f0f0",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    order:
      options.imagePosition === "left"
        ? -1
        : options.imagePosition === "right"
        ? 1
        : 0,
  };

  const contentStyle: CSSProperties = {
    padding: "1rem",
    flex: 1,
    display: "flex",
    flexDirection: "column",
    textAlign: options.contentAlignment,
  };

  return (
    <div style={cardStyle} className={styles.card}>
      <div style={imageStyle}>
        {options.imageUrl ? (
          <img
            src={options.imageUrl}
            alt={`Card - ${options.title || "Card Image"}`}
            style={imageStyle}
            onError={(e) => {
              e.currentTarget.src = "https://via.placeholder.com/400x200";
            }}
          />
        ) : (
          <span style={{ color: "#aaa" }}>이미지 영역</span>
        )}
      </div>
      <div style={contentStyle}>
        <h3 style={{ margin: "0 0 0.5rem 0" }}>
          {options.title || "카드 제목"}
        </h3>
        <p style={{ margin: 0, fontSize: "0.9rem" }}>
          {options.description || "카드 설명"}
        </p>
      </div>
    </div>
  );
}

export default CardPreview;
