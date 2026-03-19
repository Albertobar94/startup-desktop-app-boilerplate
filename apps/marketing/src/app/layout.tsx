import type { Metadata } from "next";
import type { ReactElement, ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Acme App — Build faster",
  description: "The modern desktop application for teams.",
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}): ReactElement {
  return (
    <html lang="en">
      <body className="min-h-screen bg-background font-sans antialiased">
        <main>{children}</main>
      </body>
    </html>
  );
}
