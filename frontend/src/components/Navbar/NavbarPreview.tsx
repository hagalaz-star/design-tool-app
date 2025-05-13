import React, { CSSProperties } from "react";
import styles from "./Navbar.module.scss";
import { NavbarOptions } from "@/types";

interface NavbarOptionsProps {
  options: NavbarOptions;
}

function NavbarPreview({ options }: NavbarOptionsProps) {
  // 로고 크기에 따른 fontSize 설정
  const getLogoFontSize = () => {
    switch (options.logoSize) {
      case "small":
        return "1rem";
      case "large":
        return "1.5rem";
      case "medium":
      default:
        return "1.2rem";
    }
  };

  const navbarStyle: CSSProperties = {
    backgroundColor: options.backgroundColor,
    color: options.logoColor,
    height: options.height,
    alignItems: "center",
    display: "flex",
    justifyContent: "space-between",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    padding: "0 20px",
    width: "100%",
    position: options.fixed ? "fixed" : "relative",
    borderBottom: options.borderBottom ? `${options.borderWidth} solid ${options.borderColor}` : "none",
  };

  const logoStyle: CSSProperties = {
    fontWeight: "bold",
    fontSize: getLogoFontSize(),
  };

  const menuStyle: CSSProperties = {
    display: "flex",
    listStyle: "none",
    gap: options.menuSpacing,
    margin: 0,
    padding: 0,
    justifyContent: options.menuPosition === "center" ? "center" : "flex-start",
    flex: 1,
    ...(options.menuPosition === "right" && { justifyContent: "flex-end" }),
  };
  const menuItemStyle: CSSProperties = {
    cursor: "pointer",
    color: options.textColor,
    fontSize: options.menuFontSize,
    fontWeight: options.menuFontWeight === "normal" ?  "normal" : options.menuFontWeight === "medium" ? "500" : "bold",
  };

  return (
    <nav
      style={navbarStyle}
      className={options.transparent ? styles.transparentNavbar : ""}
    >
      <div style={logoStyle}>
        {String(options.logo) ? options.logo : "로고"}
      </div>
      <ul style={menuStyle}>
        <li style={menuItemStyle}>메뉴1</li>
        <li style={menuItemStyle}>메뉴2</li>
        <li style={menuItemStyle}>메뉴3</li>
      </ul>
    </nav>
  );
}

export default NavbarPreview;
