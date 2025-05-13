// 컴포넌트 타입 정의
export type ComponentType = "button" | "card" | "navbar";

// 컴포넌트 옵션 타입 정의
export type ComponentOptionsTypeMap = {
  button: ButtonOptions;
  card: CardOptions;
  navbar: NavbarOptions;
};


// 각 디자인 옵션 타입 정의 
export interface ButtonOptions {
  backgroundColor: string;
  color: string;
  text: string;
  size: "small" | "medium" | "large";
  borderRadius: string;

  hoverEffect: "scale" | "lift" | "glow";
  clickEffect: "press" | "ripple" | "none";
  disabled: boolean;
}

export interface CardOptions {
  backgroundColor: string;
  color: string;
  borderRadius: string;
  shadow: "small" | "medium" | "large";
  padding: string;

  layout: "vertical" | "horizontal";
  imagePosition: "top" | "left" | "right";
  contentAlignment: "left" | "center" | "right";

  title: string;
  description: string;
  imageUrl: string;
}

export interface NavbarOptions {
  // 기본 스타일
  backgroundColor: string;
  textColor: string;
  height: string;

  // 로고
  logo: string;
  logoColor: string;
  logoSize: "small" | "medium" | "large";

  // 메뉴
  menuItems: string[];
  menuPosition: "left" | "center" | "right";
  menuSpacing: string;
  menuFontSize: string;
  menuFontWeight: "normal" | "medium" | "bold";

  // 반응형
  breakpoint: "sm" | "md" | "lg";
  mobileMenuIcon: "hamburger" | "dots" | "none";
  mobileMenuColor: string;

  // 효과
  fixed: boolean;
  shadow: "none" | "small" | "medium" | "large";
  transparent: boolean;
  blur: boolean;

  // 테두리
  borderBottom: boolean;
  borderColor: string;
  borderWidth: string;
}
