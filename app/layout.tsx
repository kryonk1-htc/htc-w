import type { Metadata } from "next";
import { Geist, Geist_Mono, Pacifico } from "next/font/google";
import "./globals.css";

const pacifico = Pacifico({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-pacifico',
})

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "家庭厨房 - 让美食规划更简单",
  description: "家庭成员共同管理菜单，规划美食时光",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" suppressHydrationWarning={true}>
      <head>
        <script 
          src="https://readdy.ai/api/public/assistant/widget?projectId=47a6f99e-cd85-46bf-a5a6-283c02d73af4"
          data-mode="hybrid"
          data-voice-show-transcript="true"
          data-theme="light"
          data-size="compact"
          data-accent-color="#F97316"
          data-button-base-color="#EA580C"
          data-button-accent-color="#FFFFFF"
          async
        ></script>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${pacifico.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
