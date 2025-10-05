"use client"

import Link from "next/link"
import { Rocket } from "lucide-react"

export function FloatingDemoButton() {
  return (
    <Link href="/demo" className="fixed bottom-8 right-8 z-50 group" aria-label="Try Demo">
      <div className="relative">
        {/* Pulsing background ring */}
        <div className="absolute inset-0 bg-red-500 rounded-full animate-ping opacity-75" />

        {/* Main button */}
        <div className="relative flex items-center gap-3 bg-gradient-to-r from-red-600 to-red-500 text-white px-6 py-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 hover:shadow-red-500/50">
          <Rocket className="w-5 h-5 transition-transform duration-300 group-hover:rotate-45" />
          <span className="font-bold text-sm uppercase tracking-wider">Try Our Demo</span>
        </div>

        {/* Glow effect on hover */}
        <div className="absolute inset-0 bg-red-500 rounded-full blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-300 -z-10" />
      </div>
    </Link>
  )
}