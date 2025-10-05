"use client"

import { useState } from "react"
import { ArrowRight } from "lucide-react"

interface NavigationItem {
    title: string
    description: string
    icon: string
    expandedContent: string
}

const navigationItems: NavigationItem[] = [
    {
        title: "Objective",
        description:
            "The Perseverance rover will search for signs of ancient microbial life, which will advance NASA's quest to explore the past habitability of Mars.",
        icon: "/mars-icons/objective.jpg",
        expandedContent:
            "Perseverance is designed to better understand the geology of Mars and seek signs of ancient life. The mission will collect and store a set of rock and soil samples that could be returned to Earth in the future. It will also test new technology to benefit future robotic and human exploration of Mars.",
    },
    {
        title: "Science",
        description:
            "The rover's mission has four science objectives: Studying Mars' Habitability, Seeking Signs of Past Microbial Life, Collecting and Caching Samples, and Preparing for Future Human Missions.",
        icon: "/mars-icons/science.jpg",
        expandedContent:
            "The science objectives include: 1) Looking for habitability - identifying past environments capable of supporting microbial life. 2) Seeking biosignatures - looking for signs of possible past microbial life in those habitable environments. 3) Caching samples - collecting core rock and regolith samples and storing them on the Martian surface. 4) Preparing for humans - testing oxygen production from the Martian atmosphere.",
    },
    {
        title: "Raw Images",
        description: "View raw images sent back by Perseverance from its explorations on Mars.",
        icon: "/mars-icons/raw-images.jpg",
        expandedContent:
            "Browse through thousands of raw images captured by Perseverance's advanced camera systems, including Mastcam-Z, SuperCam, PIXL, SHERLOC, and more. These images are uploaded directly from Mars and provide an unfiltered view of the Red Planet's surface, rocks, and atmospheric conditions.",
    },
    {
        title: "Resources",
        description: "Visit the one-stop-shop for all Perseverance media.",
        icon: "/mars-icons/resources.jpg",
        expandedContent:
            "Access a comprehensive collection of Perseverance resources including high-resolution images, videos, 3D models, mission graphics, fact sheets, press kits, and educational materials. Perfect for educators, students, media professionals, and space enthusiasts.",
    },
    {
        title: "Mission Updates",
        description:
            "Read updates provided by self-selected Mars 2020 mission team members who love to share with the public what Perseverance is doing.",
        icon: "/mars-icons/mission-updates.jpg",
        expandedContent:
            "Get behind-the-scenes insights from the engineers, scientists, and mission specialists working on Perseverance. These personal accounts provide unique perspectives on the rover's daily activities, challenges overcome, and exciting discoveries made on the Martian surface.",
    },
    {
        title: "The Mars Report",
        description:
            "Your source for everything on or about the Red Planet, continuing NASA's six decades of unparalleled exploration and discoveries — mission news, science findings, unique Mars imagery, and more.",
        icon: "",
        expandedContent:
            "The Mars Report brings together decades of Mars exploration into one comprehensive resource. Explore the history of Mars missions, compare findings across different rovers and orbiters, and stay updated with the latest discoveries and scientific breakthroughs from the Red Planet.",
    },
]

export function Accordion() {
    const [expandedIndex, setExpandedIndex] = useState<number | null>(null)

    const toggleItem = (index: number) => {
        setExpandedIndex(expandedIndex === index ? null : index)
    }

    return (
        <section className="bg-white py-16 px-4">
            <div className="mx-auto max-w-6xl">
                <div className="space-y-0">
                    {navigationItems.map((item, index) => (
                        <div key={item.title} className="border-t border-gray-200 first:border-t-0">
                            <button
                                onClick={() => toggleItem(index)}
                                className="group flex w-full items-center gap-6 py-8 text-left transition-colors hover:bg-gray-50"
                            >
                                {item.icon && (
                                    <div className="flex-shrink-0">
                                        <div className="h-12 w-12 overflow-hidden rounded-full bg-gray-200">
                                            <img
                                                src={item.icon || "/placeholder.svg"}
                                                alt={item.title}
                                                className="h-full w-full object-cover"
                                            />
                                        </div>
                                    </div>
                                )}
                                <div className="flex-1">
                                    <h3 className="text-2xl font-bold text-black">{item.title}</h3>
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm leading-relaxed text-gray-700">{item.description}</p>
                                </div>
                                <div className="flex-shrink-0">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-600 transition-all group-hover:scale-110">
                                        <ArrowRight
                                            className={`h-5 w-5 text-white transition-transform duration-300 ${expandedIndex === index ? "rotate-90" : ""
                                                }`}
                                        />
                                    </div>
                                </div>
                            </button>

                            <div
                                className={`overflow-hidden transition-all duration-300 ease-in-out ${expandedIndex === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                                    }`}
                            >
                                <div className="pb-8 pl-[72px] pr-[72px]">
                                    <p className="text-base leading-relaxed text-gray-600">{item.expandedContent}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
