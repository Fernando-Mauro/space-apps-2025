"use client"

import { useState } from "react"
import Image from "next/image"
import { X } from "lucide-react"

interface GalleryImage {
    id: number
    src: string
    alt: string
    title: string
    date: string
    camera: string
}

const galleryImages: GalleryImage[] = [
    {
        id: 1,
        src: "/gallery/mars-1.jpg",
        alt: "Perseverance rover selfie on Mars",
        title: "Rover Selfie",
        date: "Sol 387",
        camera: "WATSON",
    },
    {
        id: 2,
        src: "/gallery/mars-2.jpg",
        alt: "Mars surface terrain",
        title: "Jezero Crater",
        date: "Sol 412",
        camera: "Mastcam-Z",
    },
    {
        id: 3,
        src: "/gallery/mars-3.jpg",
        alt: "Rock sample collection site",
        title: "Sample Collection",
        date: "Sol 523",
        camera: "Front Hazard Avoidance Camera",
    },
    {
        id: 4,
        src: "/gallery/mars-4.jpg",
        alt: "Martian landscape panorama",
        title: "Delta Panorama",
        date: "Sol 634",
        camera: "Mastcam-Z",
    },
    {
        id: 5,
        src: "/gallery/mars-5.jpg",
        alt: "Close-up of Martian rocks",
        title: "Rock Analysis",
        date: "Sol 289",
        camera: "SHERLOC WATSON",
    },
    {
        id: 6,
        src: "/gallery/mars-6.jpg",
        alt: "Ingenuity helicopter on Mars",
        title: "Ingenuity Flight",
        date: "Sol 456",
        camera: "Mastcam-Z",
    },
    {
        id: 7,
        src: "/gallery/mars-7.jpg",
        alt: "Mars sunset",
        title: "Martian Sunset",
        date: "Sol 715",
        camera: "Navigation Camera",
    },
    {
        id: 8,
        src: "/gallery/mars-8.jpg",
        alt: "Wheel tracks on Mars",
        title: "Rover Tracks",
        date: "Sol 198",
        camera: "Rear Hazard Avoidance Camera",
    },
    {
        id: 9,
        src: "/gallery/mars-9.jpg",
        alt: "Ancient river delta",
        title: "Ancient Delta",
        date: "Sol 801",
        camera: "Mastcam-Z",
    },
]

export function Gallery() {
    const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null)

    return (
        <section className="bg-black py-24 px-4">
            <div className="max-w-7xl mx-auto">
                {/* Section Header */}
                <div className="mb-16 text-center">
                    <p className="text-sm tracking-[0.2em] text-gray-400 mb-4">IMAGE GALLERY</p>
                    <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">Exploring Mars</h2>
                    <p className="text-gray-400 text-lg max-w-3xl mx-auto">
                        A collection of stunning images captured by NASA's Perseverance rover, showcasing the Martian landscape and
                        scientific discoveries.
                    </p>
                </div>

                {/* Gallery Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {galleryImages.map((image) => (
                        <button
                            key={image.id}
                            onClick={() => setSelectedImage(image)}
                            className="group relative aspect-square overflow-hidden bg-gray-900 rounded-lg cursor-pointer"
                        >
                            <Image
                                src={image.src || "/placeholder.svg"}
                                alt={image.alt}
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-110"
                            />

                            {/* Overlay on hover */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                                <h3 className="text-white font-bold text-xl mb-2">{image.title}</h3>
                                <div className="flex items-center justify-between text-sm text-gray-300">
                                    <span>{image.date}</span>
                                    <span>{image.camera}</span>
                                </div>
                            </div>
                        </button>
                    ))}
                </div>
            </div>

            {/* Lightbox Modal */}
            {selectedImage && (
                <div
                    className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
                    onClick={() => setSelectedImage(null)}
                >
                    <button
                        onClick={() => setSelectedImage(null)}
                        className="absolute top-6 right-6 text-white hover:text-red-500 transition-colors"
                        aria-label="Close"
                    >
                        <X size={32} />
                    </button>

                    <div className="max-w-6xl w-full" onClick={(e) => e.stopPropagation()}>
                        <div className="relative aspect-video mb-6">
                            <Image
                                src={selectedImage.src || "/placeholder.svg"}
                                alt={selectedImage.alt}
                                fill
                                className="object-contain"
                            />
                        </div>

                        <div className="text-center text-white">
                            <h3 className="text-3xl font-bold mb-3">{selectedImage.title}</h3>
                            <div className="flex items-center justify-center gap-8 text-gray-400">
                                <span className="flex items-center gap-2">
                                    <span className="text-sm">Sol:</span>
                                    <span className="font-semibold">{selectedImage.date}</span>
                                </span>
                                <span className="flex items-center gap-2">
                                    <span className="text-sm">Camera:</span>
                                    <span className="font-semibold">{selectedImage.camera}</span>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </section>
    )
}
