import { ArrowRight } from "lucide-react"
import Link from "next/link"

interface VideoItemProps {
    label: string
    title: string
    description: string
    linkText: string
    linkHref: string
    videoId: string
}

function VideoItem({ label, title, description, linkText, linkHref, videoId }: VideoItemProps) {
    return (
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="space-y-6">
                <p className="text-xs tracking-[0.2em] text-gray-400 uppercase">{label}</p>
                <h2 className="text-4xl lg:text-5xl font-bold text-white leading-tight">{title}</h2>
                <p className="text-gray-300 leading-relaxed">{description}</p>
                <Link
                    href={linkHref}
                    className="inline-flex items-center gap-2 text-white font-semibold hover:gap-3 transition-all group"
                >
                    {linkText}
                    <span className="w-6 h-6 rounded-full bg-red-600 flex items-center justify-center group-hover:bg-red-700 transition-colors">
                        <ArrowRight className="w-3 h-3" />
                    </span>
                </Link>
            </div>

            <div className="aspect-video w-full">
                <iframe
                    width="100%"
                    height="100%"
                    src={`https://www.youtube.com/embed/${videoId}`}
                    title={title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="rounded-lg"
                />
            </div>
        </div>
    )
}

export function VideoSection() {
    return (
        <section className="bg-black py-20 lg:py-32">
            <div className="container mx-auto px-4 lg:px-8 max-w-7xl space-y-24 lg:space-y-32">
                <VideoItem
                    label="REPLAY"
                    title="NASA Shares Details of Perseverance Rover Finding"
                    description="Experts discuss the analysis of a rock sampled by NASA's Perseverance Mars rover last year, and the science findings published Wednesday, Sept. 10, in the journal Nature. The sample, called 'Sapphire Canyon,' was collected in July 2024 from a set of rocky outcrops on the edges of Neretva Vallis, a river valley carved by water rushing into Jezero Crater long ago."
                    linkText="Replay the Sept. 10 news conference"
                    linkHref="#"
                    videoId="dQw4w9WgXcQ"
                />

                <VideoItem
                    label="FEATURED VIDEO"
                    title="Mars Rock Samples: The Stories They Could Tell"
                    description="NASA's Mars Perseverance rover is building a unique rock collection, which also includes samples of Mars atmosphere and loose surface material. These samples record the history of the Jezero Crater landing site, and may even preserve signs of ancient life. Learn more about these precious samples, which Mars Sample Return could deliver to Earth for detailed study in the future."
                    linkText="Learn More"
                    linkHref="#"
                    videoId="dQw4w9WgXcQ"
                />
            </div>
        </section>
    )
}
