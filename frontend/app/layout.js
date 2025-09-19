import "./globals.css";
import { Poppins, Source_Serif_4 } from "next/font/google";

export const metadata = { title: "mwl's mini fullstack site!" };

const poppins = Poppins({ 
  subsets: ["latin"], 
  weight: ["400","600","700"], 
  variable: "--font-sans" 
});

const serif = Source_Serif_4({
   subsets: ["latin"], 
   weight: ["400","600","700"], 
   variable: "--font-serif" });


export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${poppins.variable} ${serif.variable}`}>
      <body>{children}</body>
    </html>
  );
}
