import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import { ToastProvider } from "@/components/feedback/ToastProvider";

const geistSans = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata = {
  title: {
    default: "BookNook",
    template: "BookNook | %s",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.className} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ToastProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </ToastProvider>
      </body>
    </html>
  );
}
