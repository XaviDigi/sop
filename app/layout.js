import { Geist, Geist_Mono, Outfit, Figtree } from "next/font/google";
import "./globals.css";
import Provider from "./provider";
import ConvexClientProvider from "./ConvexClientProvider";
import { Toaster } from "@/components/ui/sonner";
import ChatBoxWrapper from "./_components/ChatBoxWrapper";

export const metadata = {
  title: "SOP Manager | AI-powered Standard Operating Procedures",
  description: "Manage your Standard Operating Procedures with clarity, speed, and security using our AI-powered platform.",
};

const outfit = Figtree({ subsets: ['latin'] })

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body
        className={`${outfit.className} bg-background text-foreground`}
      >
        <ConvexClientProvider>
          <Provider>
            {children}
            <ChatBoxWrapper />
            <Toaster />
          </Provider>
        </ConvexClientProvider>
      </body>
    </html>
  );
}
