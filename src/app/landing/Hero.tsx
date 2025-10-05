import { ArrowRight } from "lucide-react"
import Link from "next/link"

export function Hero() {
    // This is a hero about mushrooms
    return (
        <div className="relative min-h-screen w-full overflow-hidden bg-black">
            {/* Background Image */}
            <div className="absolute inset-0">
                <img
                    src="/hero-1.jpg"
                    alt="Mushrooms growing on a forest floor"
                    className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
            </div>

            {/* Navigation */}
            <nav className="relative z-10 border-b border-white/10 bg-black/30 backdrop-blur-sm">
                <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
                    <div className="flex items-center gap-8">
                        <Link href="/" className="text-sm font-medium text-white hover:text-white/80">
                            Explore
                        </Link>
                    </div>
                    <div className="flex items-center gap-6 text-sm">
                        <Link href="#" className="text-white hover:text-white/80">
                            Perseverance Home
                        </Link>
                        <Link href="#" className="text-white hover:text-white/80">
                            Science
                        </Link>
                        <Link href="#" className="text-white hover:text-white/80">
                            News and Features
                        </Link>
                        <Link href="#" className="text-white hover:text-white/80">
                            Multimedia
                        </Link>
                        <Link href="#" className="text-white hover:text-white/80">
                            Mars Missions
                        </Link>
                        <Link href="#" className="text-white hover:text-white/80">
                            Mars Home
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Hero Content */}
            <div className="relative z-10 mx-auto max-w-7xl px-6">
                <div className="flex min-h-[calc(100vh-80px)] flex-col justify-between py-16">
                    {/* Main Content */}
                    <div className="max-w-2xl space-y-6">
                        <h1 className="font-bold text-white text-7xl leading-tight tracking-tight">
                            Beisha:
                            <br />
                            Nacidos del
                            <br />
                            Hongo
                        </h1>
                        <p className="max-w-lg text-lg text-white/90 leading-relaxed">
                            NASA&apos;s Mars Perseverance rover seeks signs of ancient life and collects samples of rock and regolith
                            for possible Earth return.
                        </p>
                        <div className="flex items-center gap-2">
                            <div className="h-2 w-2 rounded-full bg-green-500" />
                            <span className="text-xs font-medium uppercase tracking-wider text-white">Active Mission</span>
                        </div>
                    </div>

                    {/* Bottom Cards */}
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                        <Link
                            href="#"
                            className="group flex items-center justify-between border-t border-white/20 py-6 transition-colors hover:border-white/40"
                        >
                            <span className="text-xl font-medium text-white">Where is Perseverance?</span>
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-red-600 transition-transform group-hover:scale-110">
                                <ArrowRight className="h-4 w-4 text-white" />
                            </div>
                        </Link>
                        <Link
                            href="#"
                            className="group flex items-center justify-between border-t border-white/20 py-6 transition-colors hover:border-white/40"
                        >
                            <span className="text-xl font-medium text-white">Mars Rock Samples</span>
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-red-600 transition-transform group-hover:scale-110">
                                <ArrowRight className="h-4 w-4 text-white" />
                            </div>
                        </Link>
                        <Link
                            href="#"
                            className="group flex items-center justify-between border-t border-white/20 py-6 transition-colors hover:border-white/40"
                        >
                            <span className="text-xl font-medium text-white">Science</span>
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-red-600 transition-transform group-hover:scale-110">
                                <ArrowRight className="h-4 w-4 text-white" />
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
