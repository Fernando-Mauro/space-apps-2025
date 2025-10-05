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
                    label="Smalltown"
                    title="Cuajimoloyas, a small town near the sky"
                    description="A town in Oaxaca that stands out for its majestic and unusual scenery. Come and discover the variety of edible, toxic, and medicinal mushrooms; learn about their cultivation and growth, and purchase handicrafts, preserves, and products made from medicinal plants, among other things."
                    linkText="Youtube Video"
                    linkHref="https://www.youtube.com/watch?v=vMygmTwUA3E"
                    videoId="vMygmTwUA3E"
                />

                <VideoItem
                    label="FEATURED VIDEO"
                    title="Yema de Huevo (Amanita caesarea)"
                    description="It is a basidiomycete fungus of the Agaricales order, which mainly appears between summer and fall, when there is sufficient moisture in the soil. Its flavor is somewhat reminiscent of nuts, and it is recommended to cut off the volva, as it can make the dish slightly bitter. It is advisable to return the volva to the soil, as it contains a large number of spores that ensure that mushrooms of the same species continue to grow. It should not be confused with the “false oronja” or Amanita muscar, another oronja with more reddish tones and white spots, but which is toxic."
                    linkText="Learn More"
                    linkHref="https://youtu.be/QVhbuSO81Ac"
                    videoId="QVhbuSO81Ac"
                />
            </div>
        </section>
    )
}
