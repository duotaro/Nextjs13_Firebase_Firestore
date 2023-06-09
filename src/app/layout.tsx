import 'bootstrap/dist/css/bootstrap.min.css';
import './globals.css'
import { Inter } from 'next/font/google'
import { FirebaseContextProvider } from '@/context/firebase.context'
import Link from 'next/link';
const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body className={inter.className}>
        <FirebaseContextProvider>{children}</FirebaseContextProvider>
      </body>
    </html>
  )
}
