import React, { useEffect } from "react";
import hljs from "highlight.js";
import "highlight.js/styles/github.css";
import {
  ButtonOptions,
  CardOptions,
  NavbarOptions,
  ComponentType,
  ComponentOptionsTypeMap,    
} from "@/types/index";

// 버튼 코드 생성
export function generateButtonCode(
  options: ButtonOptions,
  codeFormat: "react-tailwind" | "react-scss"
): string {
  if (codeFormat === "react-tailwind") {
    // 사이즈별 패딩클래스 결정
    const sizeMap = {
      small: "px-3 py-1 text-sm",
      medium: "px-4 py-2 text-base",
      large: "px-6 py-3 text-lg",
    };

    const sizeClasses = sizeMap[options.size] || sizeMap.medium;

    
    // 테두리 반경 변환
    const getBorderRadiusClass = (radius: number) =>{
      if (radius <= 2) return "rounded-sm";
      if (radius <= 4) return "rounded";
      if (radius <= 8) return "rounded-md";
      if (radius <= 12) return "rounded-lg";
      return "rounded-xl";
    }

    const roundedClass = getBorderRadiusClass(parseInt(options.borderRadius));

    // 호버 효과 클래스
    const getHoverEffectClass = (effect: "scale" | "lift" | "glow") => {
      if (effect === "scale") return "hover:scale-105";
      if (effect === "lift") return "hover:-translate-y-1";
      if (effect === "glow") return "hover:shadow-lg";
      return "";
    }
    const hoverClass = getHoverEffectClass(options.hoverEffect);


    // 클릭 효과 클래스
    const getClickEffectClass = (effect: "press" | "ripple" | "none") => {
      if (effect === "press") return "active:scale-95";
      if (effect === "ripple") return "relative overflow-hidden active:bg-opacity-80";
      return "";
    }
    const activeClass = getClickEffectClass(options.clickEffect);

    // 비활성화 클래스
    const disabledClass = options.disabled ? "opacity-50 cursor-not-allowed": "";

    return `
  <button
     className="bg-[${options.backgroundColor}] text-[${options.color}] ${sizeClasses} ${roundedClass} border-none cursor-pointer transition-all ${hoverClass} ${activeClass} ${disabledClass}"
  ${options.disabled ? "disabled" : ""}
>
  ${options.text || "버튼"}  
</button>`;
  // SCSS 코드 생성
  } else if (codeFormat === "react-scss") {
    // 사이즈별 클래스 매핑
    const sizeMap = {
      small: "buttonSm",
      medium: "buttonMd",
      large: "buttonLg",
    };
    const sizeClass = sizeMap[options.size] || sizeMap.medium;

    //사이즈별 스타일 매핑
    const sizeStyleMap = {
      buttonSm:`padding: 6px 12px; font-size: 0.85rem;`,
      buttonMd:`padding: 8px 16px; font-size: 1rem;`,
      buttonLg:`padding: 10px 20px; font-size: 1.1rem;`,
    };

    // 호버 효과 스타일 생성
    const getHoverStyle = ()=>{
      if (options.hoverEffect === "scale") return "transform: scale(1.05);";
      if (options.hoverEffect === "lift") return "transform: translateY(-3px);";
      if (options.hoverEffect === "glow") return "box-shadow: 0 5px 15px rgba(0,0,0,0.1);";
      return "";
    }

    // 클릭 효과 스타일 생성
    const getClickStyle = () =>{
      if (options.clickEffect === "press") return "transform: scale(0.95);";
      if (options.clickEffect === "ripple") return "position: relative; overflow: hidden;";
      return "";
    }

    return `
 <button className={\`button ${sizeClass}\`} ${options.disabled ? "disabled" : ""}>
  ${options.text || "버튼"}
</button>

.button {
  background-color: ${options.backgroundColor};
  color: ${options.color};
  border-radius: ${options.borderRadius};
  border: none;
  cursor: ${options.disabled ? "not-allowed" : "pointer"};
  transition: all 0.2s ease;
  ${options.disabled ? "opacity: 0.5;" : ""}

  &:hover {
    ${getHoverStyle()}
  }

  &:active {
    ${getClickStyle()}
  }
}

.${sizeClass} {
  ${sizeStyleMap[sizeClass as keyof typeof sizeStyleMap]}
 }`;
}

  return "// 지원되지 않는 포맷입니다.";
}

export function generateCardCode(
  options: CardOptions,
  codeFormat: "react-tailwind" | "react-scss"
): string {
  if (codeFormat === "react-tailwind") {
    // 테두리 반경 변환

    const borderRadiusMap = (radius:number)=>{
      if(radius <= 2) return "rounded-sm"
      if(radius <= 4) return "rounded"
      if(radius <= 8) return "rounded-md"
      if(radius <= 12) return "rounded-lg"
      if(radius <= 16) return "rounded-xl"
      return ""
    }
    const roundedClass = borderRadiusMap(parseInt(options.borderRadius));

    // 그림자 효과 변환

    const shadowMap = (shadow:"small" | "medium" | "large")=> {
      if(shadow === "small") return "shadow-sm"
      if(shadow === "medium") return "shadow"
      if(shadow === "large") return "shadow-lg"
      return ""
    };

    const shadowClass = shadowMap(options.shadow);

    // 패딩 변환
    const paddingMap = (padding:number)=> {
      if(padding <= 4) return "p-1"
      if(padding <= 8) return "p-2"
      if(padding <= 12) return "p-3"
      if(padding <= 16) return "p-4"
      if(padding <= 20) return "p-5"
      return "p-6"
    };

    const paddingClass = paddingMap(parseInt(options.padding));


    // 레이아웃 클래스
    const layoutClass = options.layout === "horizontal" ? "flex" : "block";

    // 이미지 위치 클래스
    const imagePositionMap = (position: "top" | "left" | "right")=> {
      if(options.layout === "horizontal"){
        if(position === "left") return "order-first"
        if(position === "right") return "order-last"
      }
      return ""
    };
    const imagePositionClass = imagePositionMap(options.imagePosition);

    // 콘텐츠 정렬
    const contentAlignmentMap = (alignment:"left" | "center" | "right")=> {
      if(alignment === "center") return "text-center"
      if(alignment === "right") return "text-right"
      return ""
    };
    const contentAlignmentClass = contentAlignmentMap(options.contentAlignment);

    // 이미지 URL 체크
    const hasImage = !!options.imageUrl;

    return `
<div className="bg-[${options.backgroundColor}] text-[${options.color}] ${roundedClass} ${shadowClass} ${paddingClass} overflow-hidden transition-all hover:shadow-xl ${layoutClass}">
  ${hasImage ? `<div className="w-full ${options.layout === "horizontal" ? "w-1/3" : ""} ${imagePositionClass}">
    <img
      src="${options.imageUrl}"
      alt="${options.title || "카드 이미지"}"
      className="w-full h-auto object-cover"
    />
  </div>`
   : ""
  }

  <div className="${hasImage && options.layout === "horizontal" ? "w-2/3 p-4" : "w-full"} ${contentAlignmentClass}">
    <h3 className="text-lg font-semibold mb-2">${options.title || "카드 제목"}</h3>
    <p className="text-sm">
    ${options.description || "카드 설명을 입력하세요."}
    </p>
  </div>`
.trim();
  } else if (codeFormat === "react-scss") {
    return `
 <div className={styles.card}>
  ${options.imageUrl ? `
  <div className={styles.imageContainer}>
    <img src="${options.imageUrl}" alt="${options.title || "카드 이미지"}" className={styles.image} />
  </div>`
      : ""
  }

  <div className={styles.content}>
    <h3 className={styles.title}>${options.title || "카드 제목"}</h3>
    <p className={styles.description}>${options.description || "카드 설명을 입력하세요."}</p>
  </div>
</div>

.card {
    backgroundColor: ${options.backgroundColor};
    color: ${options.color};
    borderRadius: ${options.borderRadius};
    box-shadow: ${options.shadow === "small" ? "0 2px 5px rgba(0,0,0,0.1)" : options.shadow === "medium"? "0 4px 10px rgba(0,0,0,0.1)": "0 8px 15px rgba(0,0,0,0.15)"};
    padding: ${options.padding};
    overflow: hidden;
    transition: all 0.3s ease;
    display: ${options.layout === "horizontal" ? "flex" : "block"};

    &:hover {
    transform: translateY(-5px);  
    box-shadow: 0 12px 20px rgba(0,0,0,0.1);
   }
  }

  .imageContainer {${options.layout === "horizontal"? `width: 40%; ${options.imagePosition === "right" ? "order: 2;" : ""}`: "width: 100%;"}
}

  .image {
  width: 100%;
  height: auto;
  object-fit: cover;
}

.content {${options.layout === "horizontal" ? "width: 60%; padding: 1rem;" : ""}text-align: ${options.contentAlignment};
}

.title {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.description {
  font-size: 0.9rem;
}
  `.trim();
  }
  return "// 지원되지 않는 컴포넌트 또는 포맷입니다.";
}

export function generateNavbarCode(
  options: NavbarOptions,
  codeFormat: "react-tailwind" | "react-scss"
): string {
  if (codeFormat === "react-tailwind") {
    // 높이 값 처리
    const heightMap = (height:number)=> {
      if(height <= 40) return "h-10"
      if(height <= 50) return "h-12"
      if(height <= 60) return "h-14"
      if(height <= 70) return "h-16"
      return "h-20"
    } 
    const heightClass = heightMap(parseInt(options.height));

    // 그림자 클래스 생성
    const shadowMap = (shadow:"small" | "medium" | "large")=> {
      if(shadow === "small") return "shadow-sm"
      if(shadow === "medium") return "shadow"
      if(shadow === "large") return "shadow-lg"
      return ""
    };
    const shadowClass = shadowMap(options.shadow as keyof typeof shadowMap);

    // 포지션 클래스 생성
    const positionClass = options.fixed ? "fixed top-0 left-0 right-0 z-50" : "";

    // 테두리 클래스 생성
    const borderClass = options.borderBottom ? `border-b border-[${options.borderColor}]`: "";

    // 메뉴 위치에 따른 클래스
    const menuPositionClass = options.menuPosition === "center" ? "justify-center": options.menuPosition === "right" ? "justify-end": "justify-start";

    return `

  <nav className="flex items-center justify-between bg-[${options.backgroundColor}] ${heightClass} w-full px-5 ${shadowClass} ${positionClass} ${borderClass}">
    <div className="font-bold text-[${options.logoColor}] ${options.logoSize === "small" ? "text-sm": options.logoSize === "large" ? "text-xl": "text-lg"}">
        ${options.logo || "브랜드명"}
    </div>
    <ul className="flex gap-[${options.menuSpacing}] list-none m-0 p-0 ${menuPositionClass}">
       <li className="cursor-pointer text-[${options.textColor}] text-[${options.menuFontSize}] font-${options.menuFontWeight} hover:underline">메뉴1</li>
       <li className="cursor-pointer text-[${options.textColor}] text-[${options.menuFontSize}] font-${options.menuFontWeight} hover:underline">메뉴2</li>
       <li className="cursor-pointer text-[${options.textColor}] text-[${options.menuFontSize}] font-${options.menuFontWeight} hover:underline">메뉴3</li>
    </ul>
  </nav>
  `.trim();
  } else if (codeFormat === "react-scss") {
    return `
  <nav className = {styles.navbar}>
        <div className ={styles.logo}>
          {${options.logo} ? "로고" : "브랜드명"}
        </div>
        <ul className = {styles.menu}>
          <li className = {styles.menuItem}>메뉴1</li>
          <li className = {styles.menuItem}>메뉴2</li>
          <li className = {styles.menuItem}>메뉴3</li>
        </ul>
</nav>
.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${options.backgroundColor};
  height: ${options.height};
  box-shadow: ${options.shadow === "none" ? "none": options.shadow === "small" ? "0 2px 4px rgba(0,0,0,0.1)"
      : options.shadow === "medium" ? "0 4px 8px rgba(0,0,0,0.15)"
      : "0 8px 16px rgba(0,0,0,0.2)"
  };
  padding: 0 20px;
  width: 100%;
  position: ${options.fixed ? "fixed" : "relative"};
  ${options.fixed ? "top: 0; left: 0; right: 0; z-index: 100;" : ""}
  ${options.borderBottom ? `border-bottom: ${options.borderWidth} solid ${options.borderColor};`: ""}
}

.logo {
  font-weight: bold;
  font-size: ${options.logoSize === "small" ? "0.9rem": options.logoSize === "large" ? "1.5rem": "1.2rem"};
  color: ${options.logoColor};
}

.menu {
  display: flex;
  list-style: none;
  gap: ${options.menuSpacing};
  margin: 0;
  padding: 0;
  justify-content: ${options.menuPosition === "center" ? "center": options.menuPosition === "right" ? "flex-end": "flex-start"};
}

.menuItem {
  cursor: pointer;
  color: ${options.textColor};
  font-size: ${options.menuFontSize};
  font-weight: ${options.menuFontWeight === "normal" ? "normal": options.menuFontWeight === "medium" ? "500": "bold"};
  &:hover {
    text-decoration: underline;
  }
}
`.trim();
}

return "// 지원되지 않는 컴포넌트 또는 포맷입니다.";
}

export function CodeGeneratorUtils({
  codeFormat,
  componentType,
  options,
  styles,
  onFormatChange,
  customCode,
}: {
  codeFormat: "react-tailwind" | "react-scss";
  componentType: ComponentType;
  options: ComponentOptionsTypeMap[ComponentType];
  styles: Record<string, string>;
  onFormatChange?: (format: "react-tailwind" | "react-scss") => void;
  customCode: string | null;
}) {
  // 버튼 클릭 핸들러 수정
  const handleFormatChange = (format: "react-tailwind" | "react-scss") => {
    onFormatChange?.(format);
    console.log(onFormatChange?.(format));
  };

  const generateCode = () => {
    if (customCode) {
      return customCode;
    }
    switch (componentType) {
      case "button":
        return generateButtonCode(options as ButtonOptions, codeFormat);
      case "card":
        return generateCardCode(options as CardOptions, codeFormat);
      case "navbar":
        return generateNavbarCode(options as NavbarOptions, codeFormat);
      default:
        return "// 지원되지 않는 컴포넌트 타입입니다.";
    }
  };

  useEffect(() => {
    document.querySelectorAll("pre code").forEach((block) => {
      hljs.highlightElement(block as HTMLElement);
    });
  }, [options, codeFormat, componentType, customCode]);

  return (
    <div className={styles.CodeDisplay}>
      <div className={styles.formatSelector}>
        <button
          className={`${styles.formatButton || ""} ${
            codeFormat === "react-tailwind" ? styles.active : ""
          }`}
          onClick={() => handleFormatChange("react-tailwind")}
        >
          Tailwind
        </button>
        <button
          className={`${styles.formatButton || ""} ${
            codeFormat === "react-scss" ? styles.active : ""
          }`}
          onClick={() => handleFormatChange("react-scss")}
        >
          Scss
        </button>
      </div>

      <pre
        className={styles.codeBlock}
        key={`${componentType}-${codeFormat}-${JSON.stringify(options)}-${
          customCode ? "custom" : "generated"
        }`}
      >
        <code>{generateCode()}</code>
      </pre>
    </div>
  );
}
