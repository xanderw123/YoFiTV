import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'YoFi TV - Always On',
  description: 'Your Content. Your Audience. Your Money.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-black text-white">{children}</body>
    </html>
  )
}
