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
        "title": "RECOLECCIÓN, COMERCIALIZACIÓN Y CONSUMO DE HONGOS SILVESTRES EN LA REGIÓN MIXTECA DE OAXACA, MÉXICO",
        "authors": "López-Hernández, Abimael, Arellano Mont, Lluvia J., Uribe Jiménez, Itzel, & Aparicio Aparicio, Juan Carlos",
        "publication": "Revista Etnobiología",
        "year": 2022,
        "url": "https://doi.org/10.22201/si.24488151e.2022.2.10162",
        "abstract": "Esta investigación constituye una contribución al conocimiento de la etnomicología en la subregión de la Mixteca Alta de Oaxaca."
    }
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