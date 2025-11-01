import "./globals.css";
import { Plus_Jakarta_Sans, DM_Serif_Display } from 'next/font/google';

const plusJakarta = Plus_Jakarta_Sans({ 
  subsets: ['latin'], 
  weight: ['200', '300', '400', '500', '600', '700', '800'],
  variable: '--font-plus-jakarta'
});

const dmSerif = DM_Serif_Display({ 
  subsets: ['latin'], 
  weight: '400',
  style: ['normal', 'italic'],
  variable: '--font-dm-serif'
});

export const metadata = {
  title: "Unnati Girase — Portfolio",
  description: "CSE Student | Aspiring Software Developer | Innovator",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${plusJakarta.className} ${dmSerif.variable} min-h-screen flex items-start md:items-center justify-center p-4 md:p-8`}>
        

        {/* Main content window - semi-transparent */}
        <div className="relative z-10 w-full max-w-6xl bg-black/60 backdrop-blur-md rounded-2xl shadow-elegant p-4 md:p-8 border border-border-light">
          {children}
        </div>
      </body>
    </html>
  );
}
