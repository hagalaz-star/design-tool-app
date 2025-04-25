import React from "react";
import styles from "./Card.module.scss";
import { CardOptions } from "@/types/index";
import { CodeDisplay } from "@/utils/CodeDisplay";

interface CardeCodeType {
  options: CardOptions;
  codeFormat: "react-tailwind" | "react-scss";
  onFormatChange: (format: "react-tailwind" | "react-scss") => void;
  customCode: string | null;
}

function CardCode({
  options,
  codeFormat,
  onFormatChange,
  customCode,
}: CardeCodeType) {
  return (
    <CodeDisplay
      componentType="card"
      options={options}
      styles={styles}
      codeFormat={codeFormat}
      onFormatChange={onFormatChange}
      customCode={customCode}
    />
  );
}

export default CardCode;
