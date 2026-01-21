'use client'

import dynamic from 'next/dynamic'
import InfiniteText from "./component/InfiniteText"

// Dynamic import with no SSR
const IdCard = dynamic(() => import('./component/IdCard'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center w-full h-full">
      <div className="text-white">Loading 3D badge...</div>
    </div>
  )
})

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-black font-sans bg-noise overflow-x-hidden">
      {/* 3D Badge Section */}
      <div className="w-full h-screen relative">
        <IdCard />
      </div>

      {/* Carousel at the bottom */}
      <footer className="absolute bottom-30 w-full z-10 pointer-events-none">
        <InfiniteText />
      </footer>
    </div>
  )
}