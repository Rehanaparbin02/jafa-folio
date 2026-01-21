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
    <div className="flex min-h-screen flex-col bg-zinc-50 font-sans bg-noise overflow-x-hidden">
      {/* 3D Badge Section */}
      <div className="w-full h-screen">
        <IdCard />
      </div>

      {/* Carousel at the bottom */}
      <footer className="w-full mt-[2rem] mb-[1rem]">
        <InfiniteText />
      </footer>
    </div>
  )
}