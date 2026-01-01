import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import { ThemeProvider } from "next-themes";

const montserrat = Montserrat({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dicap | Your Everyday Dictionary",
  description:
    "Look up words instantly with Dicap. Clean design, fast search, and clear meanings no fluff, just definitions.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${montserrat.className} antialiased flex flex-col min-h-svh`}
      >
        <ThemeProvider
          attribute={"data-theme"}
          defaultTheme="system"
          enableSystem
        >
          <Header />
          <main className="container">{children}</main>
          <p className="container mt-auto py-2.5 border-t border-border  text-sm">
            © {new Date().getFullYear()} Made with keen coding. All rights
            reserved.
          </p>
        </ThemeProvider>
      </body>
    </html>
  );
}
