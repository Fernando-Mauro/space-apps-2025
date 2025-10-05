import { ExternalLink } from "lucide-react"
import Link from "next/link"
import ReactMarkdown from "react-markdown" // 1. Importar la librería
import "@/app/styles.css"
import fs from "fs/promises"
import path from "path"
import 'katex/dist/katex.min.css' 
import remarkMath from "remark-math"
import rehypeKatex from "rehype-katex"

interface Paper {
    title: string
    authors: string
    publication: string
    year: number
    url: string
    abstract: string
}

// 2. Ejemplo de abstract con Markdown
const papers: Paper[] = [
    {
        title: "Autonomous Navigation and Obstacle Avoidance for Mars Rovers Using Deep Reinforcement Learning",
        authors: "Smith, J., Johnson, M., & Williams, R.",
        publication: "Journal of Aerospace Engineering",
        year: 2023,
        url: "https://example.com/paper1",
        abstract:
            "This paper presents a **novel approach** to autonomous navigation using *deep reinforcement learning* algorithms optimized for Martian terrain. Key features include:\n\n- Real-time obstacle detection.\n- Adaptive pathfinding.",
    },
    {
        title: "Spectroscopic Analysis of Martian Rock Samples: Methods and Applications",
        authors: "Chen, L., Rodriguez, A., & Patel, S.",
        publication: "Planetary Science Review",
        year: 2022,
        url: "https://example.com/paper2",
        abstract:
            "Comprehensive review of spectroscopic techniques employed in analyzing Martian geological samples for biosignature detection.",
    },
    {
        title: "Energy-Efficient Path Planning for Planetary Rovers in Uncertain Environments",
        authors: "Anderson, K., & Thompson, D.",
        publication: "IEEE Transactions on Robotics",
        year: 2023,
        url: "https://example.com/paper3",
        abstract:
            "Novel energy optimization algorithms for path planning that account for terrain uncertainty and power constraints.",
    },
    {
        title: "Communication Protocol Optimization for Deep Space Missions",
        authors: "Martinez, E., Lee, H., & Brown, T.",
        publication: "Space Communications Journal",
        year: 2024,
        url: "https://example.com/paper4",
        abstract:
            "Advanced communication protocols designed to maximize data throughput while minimizing power consumption in deep space environments.",
    },
]

export default async function ResearchPapers() {
    // 3. Leer el archivo Markdown desde el servidor
    const markdownPath = path.join(process.cwd(), "public", "paper.md")
    const markdownContent = await fs.readFile(markdownPath, "utf-8")

    return (
        <section className="py-20 bg-zinc-50">
            <div className="container mx-auto px-4 max-w-6xl">
                <div className="mb-12">
                    <h2 className="text-4xl font-bold mb-4">Referenced Research</h2>
                    <p className="text-lg text-zinc-600 mb-8">Key scientific papers consulted in developing this project</p>
                    
                    {/* 4. Renderizar el contenido del archivo MD */}
                    <div className="prose prose-zinc max-w-none bg-white p-6 rounded-lg border border-zinc-200">
                        {/* 2. Añadir los plugins al componente ReactMarkdown */}
                        <ReactMarkdown
                            remarkPlugins={[remarkMath]}
                            rehypePlugins={[rehypeKatex]}
                        >
                            {markdownContent}
                        </ReactMarkdown>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mt-12">
                    {papers.map((paper, index) => (
                        <Link key={index} href={paper.url} target="_blank" rel="noopener noreferrer" className="group">
                            {/* El contenido de las tarjetas no cambia */}
                            <div className="bg-white border border-zinc-200 rounded-lg p-6 h-full transition-all duration-300 hover:shadow-lg hover:border-zinc-300 hover:-translate-y-1">
                                <div className="flex items-start justify-between mb-3">
                                    <span className="text-sm font-mono text-zinc-500">{paper.year}</span>
                                    <ExternalLink className="w-5 h-5 text-zinc-400 group-hover:text-zinc-700 transition-colors" />
                                </div>
                                <h3 className="text-xl font-bold mb-3 group-hover:text-blue-600 transition-colors leading-tight">
                                    {paper.title}
                                </h3>
                                <p className="text-sm text-zinc-600 mb-3">{paper.authors}</p>
                                <p className="text-sm italic text-zinc-500 mb-4">{paper.publication}</p>
                                <p className="text-sm text-zinc-700 leading-relaxed">{paper.abstract}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    )
}