import { ArrowRight } from "lucide-react"
import Link from "next/link"

export function NewsArticle() {
    return (
        <div className="bg-white">
            <div className="mx-auto max-w-7xl px-6 py-16 lg:py-24">
                {/* Latest News Label */}
                <div className="mb-12">
                    <span className="text-xs font-medium uppercase tracking-widest text-gray-600">Summary</span>
                </div>

                {/* Two Column Layout */}
                <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
                    {/* Left Column - Text Content */}
                    <div className="space-y-8">
                        <h1 className="font-bold text-6xl text-black leading-tight tracking-tight lg:text-4xl">
                            Beisha: A Predictive System for Wild Mushroom Foraging in Oaxaca
                        </h1>

                        <p className="text-base text-gray-800 leading-relaxed lg:text-lg">
                            This project introduces a predictive system for wild mushroom foraging in the Sierra Norte of
                            Oaxaca, utilizing a probabilistic model. By processing data on temperature, humidity, NDVI,
                            and precipitation from satellites like GPM, MODIS, and Sentinel, it calculates the
                            probability of mushroom proliferation in specific locations on a weekly basis. This tool is
                            designed to help indigenous communities plan and optimize their harvesting routes, ensuring
                            more efficient and fruitful foraging.
                        </p>

                        {/* <Link
                            href="#"
                            className="group inline-flex items-center gap-3 border-b-2 border-transparent pb-1 font-medium text-black transition-colors hover:border-black"
                        >
                            <span className="text-lg">
                                Read ;NASA Says Mars Rover Discovered Potential Biosignature Last Year;
                            </span>
                            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-red-600 transition-transform group-hover:scale-110">
                                <ArrowRight className="h-4 w-4 text-white" />
                            </div>
                        </Link> */}
                    </div>

                    {/* Right Column - Image */}
                    <div className="space-y-4">
                        <div className="overflow-hidden rounded-sm">
                            <img
                                src="/article-1.jpg"
                                alt="NASA's Perseverance Mars rover alongside the rock nicknamed Cheyava Falls"
                                className="h-full w-full object-cover"
                            />
                        </div>
                        <p className="text-xs text-gray-600 leading-relaxed">
                            NASAs Perseverance Mars rover alongside the rock nicknamed ;Cheyava Falls.; in this July
                            23, 2024, selfie made up of 62 individual images. ;Cheyava Falls,; which has features that may
                            bear on the question of whether the Red Planet was long ago home to microscopic life, is to the left of
                            the rover near the center of the image. The small hole visible in the rock is where Perseverance collected
                            the ;Sapphire Canyon; core sample.
                        </p>
                        <p className="text-xs font-medium text-gray-800">NASA/JPL-Caltech/MSSS</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
