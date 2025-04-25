import { create } from "zustand";
import { ButtonOptions, CardOptions, NavbarOptions } from "@/types";

interface ComponentState {
  selectedComponent: "button" | "card" | "navbar";
  buttonOptions: ButtonOptions;
  cardOptions: CardOptions;
  navbarOptions: NavbarOptions;
  isPreviewZoomed: boolean;
  codeFormat: "react-tailwind" | "react-scss";
  customCode: string | null;
  setSelectedComponent: (component: "button" | "card" | "navbar") => void;
  setButtonOptions: (options: ButtonOptions) => void;
  setCardOptions: (options: CardOptions) => void;
  setNavbarOptions: (options: NavbarOptions) => void;
  setCodeFormat: (format: "react-tailwind" | "react-scss") => void;
  setCustomCode: (code: string | null) => void;
  togglePreviewZoom: () => void;
}

const useComponentStore = create<ComponentState>((set) => ({
  selectedComponent: "button",
  buttonOptions: {
    backgroundColor: "#4CAF50",
    color: "#ffffff",
    text: "버튼",
    size: "medium",
    borderRadius: "4px",
    hoverEffect: "scale",
    clickEffect: "press",
    disabled: false,
  },
  cardOptions: {
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
  },
  navbarOptions: {
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
  },
  isPreviewZoomed: false,
  codeFormat: "react-tailwind",
  customCode: null,
  setSelectedComponent: (component) => set({ selectedComponent: component }),
  setButtonOptions: (options) => set({ buttonOptions: options }),
  setCardOptions: (options) => set({ cardOptions: options }),
  setNavbarOptions: (options) => set({ navbarOptions: options }),
  setCodeFormat: (format) => set({ codeFormat: format }),
  setCustomCode: (code) => set({ customCode: code }),
  togglePreviewZoom: () =>
    set((state) => ({ isPreviewZoomed: !state.isPreviewZoomed })),
}));

export default useComponentStore;
