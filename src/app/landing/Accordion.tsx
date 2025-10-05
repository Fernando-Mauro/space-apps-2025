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
        description: "Predicting the emergence of mushrooms in a specific region",
        icon: "/objetico.svg",
        expandedContent: "Predicting the emergence of mushrooms in a region to streamline the work of mushroom gatherers in the community of Cuajimoloyas, Oaxaca, Mexico.",
    },
    {
        title: "Science",
        description: "Probabilistic linear regression model with information obtained from satellites.",
        icon: "/resources.svg",
        expandedContent: "Combination of two prediction models, using precipitation, humidity, temperature, and NDVI data.",
    },
    {
        title: "Resources",
        description: "Datalist from GPN, MODIS LST, Sentinel, and Odis satellites.",
        icon: "/recursosw.svg",
        expandedContent: `“Primary productivity and climate control mushroom yields in Mediterranean pine forests.”
https://www.sciencedirect.com/science/article/abs/pii/S0168192320301179
NASA resources
https://www.spaceappschallenge.org/2025/challenges/bloomwatch-an-earth-observation-application-for-global-flowering-phenology/?tab=resources1`
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
                        <div key={item.title} className="border-t border-gray-200 first:border-t-0 px-4">
                            <button
                                onClick={() => toggleItem(index)}
                                className="group flex w-full items-center gap-6 py-8 text-left transition-colors hover:bg-gray-50"
                            >
                                {item.icon && (
                                    <div className="flex-shrink-0">
                                        <div className="h-12 w-12 overflow-hidden ">
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
