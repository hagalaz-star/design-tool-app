import type { Metadata } from "next";
import "./globals.scss";

export const metadata: Metadata = {
  title: "UI 컴포넌트 제너레이터",
  description: "웹 UI 컴포넌트를 쉽게 생성하고 커스터마이징할 수 있는 도구",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <header className="site-header">
          <div className="container">
            <h1 className="site-title">UI 컴포넌트 제너레이터</h1>
          </div>
        </header>
        <main className="site-main">{children}</main>
        <footer className="site-footer">
          <div className="container">
            <p>© 2025 UI 컴포넌트 제너레이터</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
