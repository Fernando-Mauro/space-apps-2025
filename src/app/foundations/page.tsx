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
    },
    {
        "title": "Age class influence on the yield of edible fungi in a managed Mediterranean forest",
        "authors": "Ágreda, Teresa; Cisneros, Óscar; Águeda, Beatriz; Fernández-Toirán, Luz Marina",
        "publication": "Mycorrhiza",
        "year": 2014,
        "url": "https://doi.org/10.1007/s00572-013-0522-y",
        "abstract": "Se analizó el efecto del año de muestreo y la edad del rodal en la estructura, dinámica y producción de hongos comestibles en un bosque mediterráneo de Pinus pinaster en España. Se registraron 153 especies, 55 comestibles, con una producción promedio de 19.8 kg ha⁻¹, destacando Lactarius deliciosus. La producción fue mayor en rodales de mediana edad (41-60 años) y mostró una fuerte variabilidad interanual."
    },
    {
        "title": "Primary productivity and climate control mushroom yields in Mediterranean pine forests",
        "authors": "Olano, José Miguel; Martínez-Rodrigo, Raquel; Altelarre, José Miguel; Ágreda, Teresa; Fernández-Toirán, Marina; García-Cervigón, Ana I.; Rodríguez-Puerta, Francisco; Águeda, Beatriz",
        "publication": "Agricultural and Forest Meteorology",
        "year": 2020,
        "url": "https://doi.org/10.1016/j.agrformet.2020.108015",
        "abstract": "La productividad de hongos en bosques mediterráneos depende tanto del clima como de la productividad primaria del año anterior, medida mediante NDVI y humedad del suelo."
    },
    {
        "title": "Comparison of Mathematical Models Describing Mushroom (Amanita caesarea) Drying",
        "authors": "Ivanova, Miroslava T.; Katrandzhiev, Nedyalko T.; Dospatliev, Lilko K.; Papazov, Penko K.",
        "publication": "Journal of Chemical Technology and Metallurgy",
        "year": 2019,
        "url": "https://dl.uctm.edu/journal/node/jctm2019.4.18",
        "abstract": "Se compararon once modelos matemáticos para describir el  isotérmico del hongo Amanita caesarea. El modelo de Henderson y Pabis modificado mostró el mejor ajuste con R² > 0.999."
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