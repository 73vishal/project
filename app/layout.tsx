import { Inter } from "next/font/google";
import Script from "next/script";
import Header from "./components/Header";
import Providers from "./components/Provider";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
    title: "ImageKit Next.js Integration",
    description: "Demo of ImageKit integration with Next.js",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
    <html lang="en">
    <body className={inter.className}>
        <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        strategy="lazyOnload"
        />
        <Providers>
        <Header />
        <main className="container mx-auto px-4 py-8">{children}</main>
        </Providers>
        </body>
    </html>
);
}