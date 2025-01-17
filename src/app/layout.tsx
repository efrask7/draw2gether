import type { Metadata } from 'next'
import './globals.css'
import { SocketProvider } from '@/context/SocketContext'
import SocketStatus from '@/components/SocketStatus'

export const metadata: Metadata = {
  title: 'Draw2Gether',
  description: 'Dibuja en linea con otras personas a tiempo real',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className='h-full'>
      <body
        className='bg-gray-950 h-full select-none overflow-hidden'
      >
        <SocketProvider>
          {children}

          <SocketStatus/>
        </SocketProvider>
      </body>

    </html>
  )
}
