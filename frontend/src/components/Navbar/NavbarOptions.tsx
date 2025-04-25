import React from "react";
import styles from "./Navbar.module.scss";
import { NavbarOptions } from "@/types";

interface NavbarOptionsProps {
  options: NavbarOptions;
  onOptionChange: (name: string, value: any) => void;
}

function NavbarOptionsPanel({ options, onOptionChange }: NavbarOptionsProps) {
  const renderOptions = () => {
    return (
      <div className={styles.OptionsPanel}>
        <div className={styles.optionItem}>
          <label>기본 스타일</label>
          <div className={styles.optionGroup}>
            <div className={styles.optionSubItem}>
              <label>배경색</label>
              <input
                type="color"
                value={options.backgroundColor}
                onChange={(e) =>
                  onOptionChange("backgroundColor", e.target.value)
                }
              />
            </div>

            <div className={styles.optionSubItem}>
              <label>높이 (px)</label>
              <input
                type="number"
                value={parseInt(options.height) || ""}
                onChange={(e) =>
                  onOptionChange("height", `${e.target.value}px`)
                }
              />
            </div>
          </div>
        </div>

        <div className={styles.optionItem}>
          <label>로고 설정</label>
          <div className={styles.optionGroup}>
            <div className={styles.optionSubItem}>
              <label>로고 URL</label>
              <input
                type="text"
                value={options.logo}
                onChange={(e) => onOptionChange("logo", e.target.value)}
                placeholder="브랜드명 또는 로고 텍스트"
              />
            </div>
            <div className={styles.optionSubItem}>
              <label>로고 색상</label>
              <input
                type="color"
                value={options.logoColor}
                onChange={(e) => onOptionChange("logoColor", e.target.value)}
              />
            </div>
            <div className={styles.optionSubItem}>
              <label>로고 크기</label>
              <select
                value={options.logoSize}
                onChange={(e) => onOptionChange("logoSize", e.target.value)}
              >
                <option value="small">작게</option>
                <option value="medium">중간</option>
                <option value="large">크게</option>
              </select>
            </div>
          </div>
        </div>

        <div className={styles.optionItem}>
          <label>메뉴 설정</label>
          <div className={styles.optionGroup}>
            <div className={styles.optionSubItem}>
              <label>메뉴 위치</label>
              <select
                value={options.menuPosition}
                onChange={(e) => onOptionChange("menuPosition", e.target.value)}
              >
                <option value="left">좌측</option>
                <option value="center">중앙</option>
                <option value="right">우측</option>
              </select>
            </div>
            <div className={styles.optionSubItem}>
              <label>메뉴 간격</label>
              <input
                type="number"
                min="0"
                max="100"
                value={parseInt(options.menuSpacing) || ""}
                onChange={(e) =>
                  onOptionChange("menuSpacing", `${e.target.value}px`)
                }
              />
            </div>

            <div className={styles.optionSubItem}>
              <label>메뉴 글자 색상</label>
              <input
                type="color"
                value={options.textColor}
                onChange={(e) => onOptionChange("textColor", e.target.value)}
              />
            </div>
            <div className={styles.optionSubItem}>
              <label>글자 크기</label>
              <input
                type="number"
                min="8"
                max="32"
                value={parseInt(options.menuFontSize) || 16}
                onChange={(e) =>
                  onOptionChange("menuFontSize", `${e.target.value}px`)
                }
              />
            </div>
            <div className={styles.optionSubItem}>
              <label>글자 굵기</label>
              <select
                value={options.menuFontWeight}
                onChange={(e) =>
                  onOptionChange("menuFontWeight", e.target.value)
                }
              >
                <option value="normal">보통</option>
                <option value="medium">중간</option>
                <option value="bold">굵게</option>
              </select>
            </div>
          </div>
        </div>

        <div className={styles.optionItem}>
          <label>효과 설정</label>
          <div className={styles.optionGroup}>
            <div className={styles.optionSubItem}>
              <label>상단 고정</label>
              <input
                type="checkbox"
                checked={options.fixed}
                onChange={(e) => onOptionChange("fixed", e.target.checked)}
              />
            </div>

            <div className={styles.optionSubItem}>
              <label>그림자 효과</label>
              <select
                value={options.shadow}
                onChange={(e) => onOptionChange("shadow", e.target.value)}
              >
                <option value="none">없음</option>
                <option value="small">작게</option>
                <option value="medium">중간</option>
                <option value="large">크게</option>
              </select>
            </div>

            <div className={styles.optionSubItem}>
              <label>하단 테두리</label>
              <input
                type="checkbox"
                checked={options.borderBottom}
                onChange={(e) =>
                  onOptionChange("borderBottom", e.target.checked)
                }
              />
            </div>

            {options.borderBottom && (
              <>
                <div className={styles.optionSubItem}>
                  <label>테두리 색상</label>
                  <input
                    type="color"
                    value={options.borderColor}
                    onChange={(e) =>
                      onOptionChange("borderColor", e.target.value)
                    }
                  />
                </div>

                <div className={styles.optionSubItem}>
                  <label>테두리 두께 (px)</label>
                  <input
                    type="number"
                    min="1"
                    max="10"
                    value={parseInt(options.borderWidth) || 1}
                    onChange={(e) =>
                      onOptionChange("borderWidth", `${e.target.value}px`)
                    }
                  />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={styles.OptionsPanel}>
      <h3>네비게이션 바 옵션 설정</h3>
      {renderOptions()}
    </div>
  );
}

export default NavbarOptionsPanel;
