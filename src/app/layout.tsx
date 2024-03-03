import React from "react";

import type { Metadata } from "next";

import { LayoutClient } from "@/app/layoutClient";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <React.StrictMode>
      <LayoutClient>{children}</LayoutClient>
    </React.StrictMode>
  );
}
