import React from "react";
import styles from "./Button.module.scss";
import { ButtonOptions } from "@/types";
import { CodeGeneratorUtils } from "@/utils/codeGenerators/CodeGeneratorUtils";

interface ButtonCodeType {
  options: ButtonOptions;
  codeFormat: "react-tailwind" | "react-scss";
  onFormatChange: (format: "react-tailwind" | "react-scss") => void;
  customCode: string | null;
}

function ButtonCode({
  options,
  codeFormat,
  onFormatChange,
  customCode,
}: ButtonCodeType) {
  return (
    <CodeGeneratorUtils
      codeFormat={codeFormat}
      componentType="button"
      options={options}
      styles={styles}
      onFormatChange={onFormatChange}
      customCode={customCode}
    />
  );
}

export default ButtonCode;
