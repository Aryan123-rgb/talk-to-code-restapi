import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./provider";


export const metadata: Metadata = {
  title: "Talk to Code",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
