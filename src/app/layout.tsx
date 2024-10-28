import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Dark City RP",
  description: "საუკეთესო SAMP-ის სერვერი მსოფლიოში",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "Dark City RP",
    description: "საუკეთესო SAMP-ის სერვერი მსოფლიოში.",
    url: "https://www.darkcity-rp.online/",
    images: [
      {
        url: "https://cdn.discordapp.com/attachments/1299826277070409870/1300561279467126784/standard_1.gif?ex=67214994&is=671ff814&hm=231e496b8d1a32272fb7978b27192bd3606acec2b325852f36d05a1ef6a66013&",
        width: 800,
        height: 600,
        alt: "Dark City RP Image",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" type="image/png" href="/favicon.png" sizes="32x32" />
        {/* You can also add more links for different sizes or formats if needed */}
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
