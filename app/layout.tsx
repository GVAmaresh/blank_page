import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import SideNav from "./SideNav";
import { PageProvider } from "./PageProvider";
import { AiFillAliwangwang } from "react-icons/ai";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900"
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900"
});

export const metadata: Metadata = {
  title: "Empty Page",
  description: "Created by G V Amaresh"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
          <head>
          <link rel="manifest" href="manifest.json" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <PageProvider>
          <SideNav>{children}</SideNav>
        </PageProvider>
      </body>
    </html>
  );
}
