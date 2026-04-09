
import type { ReactNode } from 'react';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import TanStackProvider from '@/components/TanStackProvider/TanStackProvider';
import { Roboto } from 'next/font/google';

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
  variable: '--font-roboto',
});


export const metadata = {
  title: 'NoteHub',
  description: 'Manage your notes easily',
  openGraph: {
    title: 'NoteHub',
    description: 'Manage your notes easily',
    url: 'https://your-site.vercel.app',
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
      },
    ],
  },
};


export default function RootLayout({
  children,
  modal,
}: {
  children: ReactNode;
  modal: ReactNode; // ✅ ДОДАЛИ
}) {
  return (
    <html lang="en">
      <body>
        <TanStackProvider>
          <Header />
          {children}
          <Footer />

          {/* 🔥 ВАЖЛИВО */}
          {modal}
        </TanStackProvider>
        <div id="modal-root"></div>
      </body>
    </html>
  );
}
