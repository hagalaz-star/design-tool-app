// src/store/componentStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  ComponentType,
  ButtonOptions,
  CardOptions,
  NavbarOptions,
} from "@/types";

// 기본값 정의
const defaultButtonOptions: ButtonOptions = {
  backgroundColor: "#4CAF50",
  color: "#ffffff",
  text: "버튼",
  size: "medium",
  borderRadius: "4px",
  hoverEffect: "scale",
  clickEffect: "press",
  disabled: false,
};

const defaultCardOptions: CardOptions = {
  backgroundColor: "#ffffff",
  color: "#333333",
  borderRadius: "8px",
  shadow: "medium",
  padding: "16px",
  layout: "vertical",
  imagePosition: "top",
  contentAlignment: "left",
  title: "카드 제목",
  description: "카드 설명을 입력하세요.",
  imageUrl: "",
};

const defaultNavbarOptions: NavbarOptions = {
  backgroundColor: "#ffffff",
  textColor: "#333333",
  height: "60px",
  logo: "",
  logoColor: "#333333",
  logoSize: "medium",
  menuItems: ["홈", "소개", "서비스", "연락처"],
  menuPosition: "right",
  menuSpacing: "20px",
  menuFontSize: "16px",
  menuFontWeight: "normal",
  breakpoint: "md",
  mobileMenuIcon: "hamburger",
  mobileMenuColor: "#333333",
  fixed: false,
  shadow: "none",
  transparent: false,
  blur: false,
  borderBottom: false,
  borderColor: "#e0e0e0",
  borderWidth: "1px",
};

// 컴포넌트 상태 타입
interface ComponentState {
  // 현재 선택된 컴포넌트 타입
  selectedComponent: ComponentType;

  // 각 컴포넌트 타입별 옵션
  buttonOptions: ButtonOptions;
  cardOptions: CardOptions;
  navbarOptions: NavbarOptions;

  // 코드 관련 상태
  codeFormat: "react-tailwind" | "react-scss";
  customCode: string | null;

  // UI 상태
  isPreviewZoomed: boolean;

  // 액션
  setSelectedComponent: (component: ComponentType) => void;
  setButtonOptions: (options: Partial<ButtonOptions>) => void;
  setCardOptions: (options: Partial<CardOptions>) => void;
  setNavbarOptions: (options: Partial<NavbarOptions>) => void;
  setCodeFormat: (format: "react-tailwind" | "react-scss") => void;
  setCustomCode: (code: string | null) => void;
  togglePreviewZoom: () => void;
  resetOptions: (componentType?: ComponentType) => void;
}

// 상태 관리 스토어 생성
const useComponentStore = create<ComponentState>()(
  persist(
    (set) => ({
      // 초기 상태
      selectedComponent: "button",
      buttonOptions: defaultButtonOptions,
      cardOptions: defaultCardOptions,
      navbarOptions: defaultNavbarOptions,
      codeFormat: "react-tailwind",
      customCode: null,
      isPreviewZoomed: false,

      // 액션 정의
      setSelectedComponent: (component) =>
        set({ selectedComponent: component, customCode: null }),

      setButtonOptions: (options) =>
        set((state) => ({
          buttonOptions: { ...state.buttonOptions, ...options },
        })),

      setCardOptions: (options) =>
        set((state) => ({
          cardOptions: { ...state.cardOptions, ...options },
        })),

      setNavbarOptions: (options) =>
        set((state) => ({
          navbarOptions: { ...state.navbarOptions, ...options },
        })),

      setCodeFormat: (format) => set({ codeFormat: format }),

      setCustomCode: (code) => set({ customCode: code }),

      togglePreviewZoom: () =>
        set((state) => ({ isPreviewZoomed: !state.isPreviewZoomed })),

      // 옵션 초기화 기능 추가
      resetOptions: (componentType) =>
        set((state) => {
          if (!componentType || componentType === "button") {
            return { buttonOptions: defaultButtonOptions };
          } else if (componentType === "card") {
            return { cardOptions: defaultCardOptions };
          } else if (componentType === "navbar") {
            return { navbarOptions: defaultNavbarOptions };
          }
          return state;
        }),
    }),
    {
      name: "component-store", // localStorage 키 이름
      partialize: (state) => ({
        // 저장할 상태만 선택
        buttonOptions: state.buttonOptions,
        cardOptions: state.cardOptions,
        navbarOptions: state.navbarOptions,
        codeFormat: state.codeFormat,
      }),
    }
  )
);

export default useComponentStore;
