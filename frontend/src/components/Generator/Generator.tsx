"use client";

import styles from "./Generator.module.scss";
import React, { useEffect, useMemo } from "react";

import ButtonCode from "../Button/ButtonCodeGenerator";
import ButtonOptionsPanel from "../Button/ButtonOptions";
import ButtonPreview from "../Button/ButtonPreview";

import CardCode from "../Card/CardCodeGenerator";
import CardOptionsPanel from "../Card/CardOptions";
import CardPreview from "../Card/CardPreview";

import NavbarCode from "../Navbar/NavbarCodeGenerator";
import NavbarOptionsPanel from "../Navbar/NavbarOptions";
import NavbarPreview from "../Navbar/NavbarPreview";

import AIOptimizer from "../AIOptimizer/AIOptimizer";
import AiDesign from "../AIDesign/AiDesign";

import {
  generateButtonCode,
  generateCardCode,
  generateNavbarCode,
} from "../../utils/codeGenerators/CodeGeneratorUtils";

import {
  ComponentType,
  ComponentOptionsTypeMap,
  ButtonOptions,
  CardOptions,
  NavbarOptions,
} from "@/types/index";

// Zustand 스토어
import useComponentStore from "@/store/useComponentStore";
import TrendDesign from "../TrendDesign/TrendDesign";

const Generator = () => {
  const {
    selectedComponent,
    buttonOptions,
    cardOptions,
    navbarOptions,
    setSelectedComponent,
    setButtonOptions,
    setCardOptions,
    setNavbarOptions,
    codeFormat,
    customCode,
    setCodeFormat,
    setCustomCode,
  } = useComponentStore();

  // 현재 선택된 컴포넌트의 옵션
  const currentOptions = useMemo(() => {
    switch (selectedComponent) {
      case "button":
        return buttonOptions;
      case "card":
        return cardOptions;
      case "navbar":
        return navbarOptions;
      default:
        return buttonOptions;
    }
  }, [selectedComponent, buttonOptions, cardOptions, navbarOptions]);



  // 옵션 변경 핸들러
  const handleOptionChange = (
    name: string,
    value: string | boolean | number
  ) => {
    switch (selectedComponent) {
      case "button":
        setButtonOptions({
          ...buttonOptions,
          [name]: value,
        } as ButtonOptions);
        break;
      case "card":
        setCardOptions({
          ...cardOptions,
          [name]: value,
        } as CardOptions);
        break;
      case "navbar":
        setNavbarOptions({
          ...navbarOptions,
          [name]: value,
        } as NavbarOptions);
        break;
    }
  };
  // 컴포넌트 타입 변경 핸들러
  const handleComponentTypeChange = (type: ComponentType) => {
    setSelectedComponent(type);
  };

  // 코드 포맷 변경 핸들러
  const handleFormatChange = (format: "react-tailwind" | "react-scss") => {
    setCodeFormat(format);
  };

  // 최적화된 코드 적용 핸들러
  const handleCodeUpdate = (code: string) => {
    setCustomCode(code);
  };

  // 컴포넌트 변경 시 커스텀 코드 초기화
  useEffect(() => {
    setCustomCode(null);
  }, [selectedComponent, setCustomCode]);

  // 현재 코드 문자열 생성
  const currentCodeString = useMemo(() => {
    switch (selectedComponent) {
      case "button":
        return generateButtonCode(buttonOptions, codeFormat);
      case "card":
        return generateCardCode(cardOptions, codeFormat);
      case "navbar":
        return generateNavbarCode(navbarOptions, codeFormat);
      default:
        return "// 지원되지 않는 컴포넌트입니다";
    }
  }, [
    selectedComponent,
    buttonOptions,
    cardOptions,
    navbarOptions,
    codeFormat,
  ]);

  return (
    <div className={styles.generatorContainer}>
      <div className={styles.componentSelector}>
        <h2>컴포넌트 선택</h2>
        <div className={styles.typeButtons}>
          <button
            className={`${styles.typeButton} ${
              selectedComponent === "button" ? styles.active : ""
            }`}
            onClick={() => handleComponentTypeChange("button")}
          >
            버튼
          </button>
          <button
            className={`${styles.typeButton} ${
              selectedComponent === "card" ? styles.active : ""
            }`}
            onClick={() => handleComponentTypeChange("card")}
          >
            카드
          </button>
          <button
            className={`${styles.typeButton} ${
              selectedComponent === "navbar" ? styles.active : ""
            }`}
            onClick={() => handleComponentTypeChange("navbar")}
          >
            네비게이션 바
          </button>
        </div>

        <div className={styles.workArea}>
          {selectedComponent === "button" && (
            <ButtonOptionsPanel
              options={buttonOptions}
              onOptionChange={(name, value) => handleOptionChange(name, value)}
            />
          )}

          {selectedComponent === "card" && (
            <CardOptionsPanel
              options={cardOptions}
              onOptionChange={(name, value) => handleOptionChange(name, value)}
            />
          )}
          {selectedComponent === "navbar" && (
            <NavbarOptionsPanel
              options={navbarOptions}
              onOptionChange={(name, value) => handleOptionChange(name, value)}
            />
          )}
        </div>

        <div className={styles.previewSection}>
          <h3>미리보기</h3>
          <div className={styles.previewContainer}>
            {selectedComponent === "button" && (
              <ButtonPreview options={buttonOptions} />
            )}
            {selectedComponent === "card" && (
              <CardPreview options={cardOptions} />
            )}
            {selectedComponent === "navbar" && (
              <NavbarPreview options={navbarOptions} />
            )}
          </div>
        </div>

        <div className={styles.codeSection}>
          <h3>코드</h3>
          {selectedComponent === "button" && (
            <ButtonCode
              options={buttonOptions}
              codeFormat={codeFormat}
              onFormatChange={handleFormatChange}
              customCode={customCode}
            />
          )}
          {selectedComponent === "card" && (
            <CardCode
              options={cardOptions}
              codeFormat={codeFormat}
              onFormatChange={handleFormatChange}
              customCode={customCode}
            />
          )}
          {selectedComponent === "navbar" && (
            <NavbarCode
              options={navbarOptions}
              codeFormat={codeFormat}
              onFormatChange={handleFormatChange}
              customCode={customCode}
            />
          )}
        </div>

        <div className={styles.aiSection}>
          <h3 className={styles.aiSectionTitle}>AI 기능</h3>

          <TrendDesign
            componentType={selectedComponent}
            onSelectDesign={handleCodeUpdate}
          />

          <AIOptimizer
            currentCode={currentCodeString}
            componentType={selectedComponent}
            options={currentOptions}
            codeFormat={codeFormat}
            onApplyOptimized={handleCodeUpdate}
          />

          <AiDesign
            componentType={selectedComponent}
            onSelectDesign={handleCodeUpdate}
          />
        </div>
      </div>
    </div>
  );
};

export default Generator;
