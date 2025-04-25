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
} from "../../utils/CodeDisplay";

import {
  ComponentType,
  ComponentOptionsTypeMap,
  ButtonOptions,
  CardOptions,
  NavbarOptions,
} from "@/types/index";

import useComponentStore from "@/store/useComponentStore";

const componentConfig = {
  button: {
    Component: ButtonOptionsPanel,
    Preview: ButtonPreview,
    CodeGenerator: ButtonCode,
  },
  card: {
    Component: CardOptionsPanel,
    Preview: CardPreview,
    CodeGenerator: CardCode,
  },
  navbar: {
    Component: NavbarOptionsPanel,
    Preview: NavbarPreview,
    CodeGenerator: NavbarCode,
  },
};

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

  const handleOptionChange = (
    componentType: "button" | "card" | "navbar",
    name: string,
    value: string | boolean | number
  ) => {
    switch (componentType) {
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
  const handleComponentTypeChange = (type: "button" | "card" | "navbar") => {
    setSelectedComponent(type);
  };

  const handleFormatChange = (format: "react-tailwind" | "react-scss") => {
    setCodeFormat(format);
  };

  const handleOptimizedCode = (code: string) => {
    setCustomCode(code);
  };

  const onSelectDesign = (code: string) => {
    setCustomCode(code);
  };

  useEffect(() => {
    setCustomCode(null);
  }, [selectedComponent]);

  const CurrentComponent = useMemo(() => {
    type CurrentType = typeof selectedComponent;
    type SelectCurrnet = ComponentOptionsTypeMap[CurrentType];
    const config = componentConfig[selectedComponent];

    return {
      Options: config.Component as React.ComponentType<{
        options: SelectCurrnet;
        onOptionChange: (name: string, value: any) => void;
      }>,
      Preview: config.Preview as React.ComponentType<{
        options: SelectCurrnet;
      }>,
      Code: config.CodeGenerator as React.ComponentType<{
        options: SelectCurrnet;
        codeFormat: "react-tailwind" | "react-scss";
        onFormatChange: (format: "react-tailwind" | "react-scss") => void;
        customCode: string | null;
      }>,
    };
  }, [selectedComponent]);

  function generatedCurrentCode(
    componentType: ComponentType,
    options: ComponentOptionsTypeMap[ComponentType],
    codeFormat: "react-tailwind" | "react-scss"
  ): string {
    switch (componentType) {
      case "button":
        return generateButtonCode(options as ButtonOptions, codeFormat);

      case "card":
        return generateCardCode(options as CardOptions, codeFormat);

      case "navbar":
        return generateNavbarCode(options as NavbarOptions, codeFormat);

      default:
        return "// 지원 되지않는 컴포넌트입니다";
    }
  }

  const currentCodeString = useMemo(() => {
    return generatedCurrentCode(
      selectedComponent,
      selectedComponent === "button"
        ? buttonOptions
        : selectedComponent === "card"
        ? cardOptions
        : navbarOptions,
      codeFormat
    );
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
              onOptionChange={(name, value) =>
                handleOptionChange("button", name, value)
              }
            />
          )}
          {selectedComponent === "card" && (
            <CardOptionsPanel
              options={cardOptions}
              onOptionChange={(name, value) =>
                handleOptionChange("card", name, value)
              }
            />
          )}
          {selectedComponent === "navbar" && (
            <NavbarOptionsPanel
              options={navbarOptions}
              onOptionChange={(name, value) =>
                handleOptionChange("navbar", name, value)
              }
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

        <div>
          <AIOptimizer
            currentCode={currentCodeString}
            componentType={selectedComponent}
            options={
              selectedComponent === "button"
                ? buttonOptions
                : selectedComponent === "card"
                ? cardOptions
                : navbarOptions
            }
            codeFormat={codeFormat}
            onApplyOptimized={handleOptimizedCode}
          />
        </div>

        <div>
          <AiDesign
            componentType={selectedComponent}
            onSelectDesign={onSelectDesign}
          />
        </div>
      </div>
    </div>
  );
};

export default Generator;
