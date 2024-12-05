import type { Metadata } from "next";
import "@/assets/css/globals.css";
import { Noto_Sans_KR } from "next/font/google";

const notoSansKR = Noto_Sans_KR({
  weight: ["100", "300", "400", "500", "700", "900"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "메뉴 편집",
  description: "메뉴 편집 페이지",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={notoSansKR.className}
      >
        {children}
      </body>
    </html>
  );
}
