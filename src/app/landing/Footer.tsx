import Link from "next/link"
import { Github, Rocket, PlayIcon } from "lucide-react"
import Image from "next/image"

export function SimpleFooter() {
    return (
        <footer className="border-t border-zinc-800 bg-black py-6">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-center gap-6">
                    {/* Project Icon */}
                    <div className="flex items-center gap-2 text-zinc-400">
                        <img src={"logo.svg"} className="w-5 h-5" />
                        <span className="text-sm">Beisha</span>
                    </div>

                    {/* GitHub Link */}
                    <Link
                        href="https://github.com/Fernando-Mauro/space-apps-2025"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-zinc-400 transition-colors hover:text-white"
                    >
                        <Github className="h-5 w-5" />
                        <span className="text-sm">Repository</span>
                    </Link>

                    {/* NASA Icon */}
                    <div className="flex items-center gap-2 text-zinc-400">
                        <div className="relative h-5 w-5">
                            <Image src="/nasa.png" alt="NASA" fill className="object-contain" />
                        </div>
                        <span className="text-sm">NASA</span>
                    </div>
                </div>
            </div>
        </footer>
    )
}