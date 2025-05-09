// src/__tests__/ButtonPreview.test.tsx
import React from "react";
import { render, screen } from "@testing-library/react";
import ButtonPreview from "../components/Button/ButtonPreview";
import "@testing-library/jest-dom";
import { ButtonOptions } from "@/types";

describe("ButtonPreview 컴포넌트", () => {
  const defaultOptions: ButtonOptions = {
    backgroundColor: "#4CAF50",
    color: "#ffffff",
    text: "테스트 버튼",
    size: "medium",
    borderRadius: "4px",
    hoverEffect: "scale",
    clickEffect: "press",
    disabled: false,
  };

  test("버튼이 올바르게 렌더링되는지 확인", () => {
    render(<ButtonPreview options={defaultOptions} />);

    const buttonElement = screen.getByText("테스트 버튼");
    expect(buttonElement).toBeInTheDocument();

    // 스타일 테스트
    expect(buttonElement).toHaveStyle(`
      background-color: ${defaultOptions.backgroundColor};
      color: ${defaultOptions.color};
    `);
  });

  test("disabled 속성이 적용되는지 확인", () => {
    const disabledOptions = {
      ...defaultOptions,
      disabled: true,
    };

    render(<ButtonPreview options={disabledOptions} />);

    const buttonElement = screen.getByText("테스트 버튼");
    expect(buttonElement).toBeDisabled();
    expect(buttonElement).toHaveStyle("opacity: 0.6");
  });

  test("size 속성에 따라 다른 크기로 렌더링되는지 확인", () => {
    // 작은 버튼 테스트
    const smallOptions = {
      ...defaultOptions,
      size: "small" as const,
    };

    const { rerender } = render(<ButtonPreview options={smallOptions} />);
    let buttonElement = screen.getByText("테스트 버튼");
    expect(buttonElement).toHaveStyle("padding: 6px 12px");

    // 중간 버튼 테스트
    rerender(<ButtonPreview options={defaultOptions} />);
    buttonElement = screen.getByText("테스트 버튼");
    expect(buttonElement).toHaveStyle("padding: 8px 16px");

    // 큰 버튼 테스트
    const largeOptions = {
      ...defaultOptions,
      size: "large" as const,
    };

    rerender(<ButtonPreview options={largeOptions} />);
    buttonElement = screen.getByText("테스트 버튼");
    expect(buttonElement).toHaveStyle("padding: 10px 20px");
  });
});
