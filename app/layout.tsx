import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { cn } from '@/lib/utils';
import { AppProvider } from './AppProvider';
// import { ThemeProvider } from '@/components/themeProvider';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const metadata: Metadata = {
  title: "My Kanban",
  description: "My Kanban is based on the Kanban method, a workflow management technique that helps you visualize and manage your work.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          geistSans.variable,
          geistMono.variable,
          "min-h-screen bg-background font-sans antialiased"
        )}
      >
        <AppProvider>
          {/* <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          > */}
            {children}
          {/* </ThemeProvider> */}
        </AppProvider>
      </body>
    </html>
  );
}
