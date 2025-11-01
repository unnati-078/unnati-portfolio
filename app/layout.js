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
      <body className={`${plusJakarta.className} ${dmSerif.variable} min-h-screen flex items-start justify-center py-6 px-4 md:py-12 md:px-8`}>
        {/* Background gradient overlay */}
        <div className="fixed inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/40 pointer-events-none"></div>

        {/* Main content window */}
        <div className="relative z-10 w-full max-w-6xl bg-black/75 backdrop-blur-xl rounded-3xl shadow-elegant border border-border-light/20 overflow-hidden">
          <div className="p-4 md:p-8 lg:p-12">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
