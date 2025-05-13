import React from "react";
import styles from "./Navbar.module.scss";
import { NavbarOptions } from "@/types";
import { CodeGeneratorUtils } from "@/utils/codeGenerators/CodeGeneratorUtils";

interface NavbarType {
  options: NavbarOptions;
  codeFormat: "react-tailwind" | "react-scss";
  onFormatChange: (format: "react-tailwind" | "react-scss") => void;
  customCode: string | null;
}

function NavbarCode({
  options,
  codeFormat,
  onFormatChange,
  customCode,
}: NavbarType) {
  return (
    <CodeGeneratorUtils
      componentType="navbar"
      options={options}
      styles={styles}
      codeFormat={codeFormat}
      onFormatChange={onFormatChange}
      customCode={customCode}
    />
  );
}

export default NavbarCode;
