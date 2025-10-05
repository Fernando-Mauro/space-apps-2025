"use client"

import { useState, useRef, useEffect } from "react"
import { Search, MapPin } from "lucide-react"

type MapStyle = "satellite" | "dark" | "cyclist"

interface MapControlProps {
  onLocationSelect?: (location: string) => void
  onStyleChange?: (style: MapStyle) => void
  className?: string
}

// Datos de ejemplo para el autocompletado
const worldLocations = [
  "Madrid, España",
  "Barcelona, España",
  "París, Francia",
  "Londres, Reino Unido",
  "Nueva York, Estados Unidos",
  "Tokio, Japón",
  "Berlín, Alemania",
  "Roma, Italia",
  "Ámsterdam, Países Bajos",
  "Sídney, Australia",
  "Toronto, Canadá",
  "México City, México",
  "Buenos Aires, Argentina",
  "São Paulo, Brasil",
  "Moscú, Rusia",
]

export function MapControl({ onLocationSelect, onStyleChange, className = "" }: MapControlProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedStyle, setSelectedStyle] = useState<MapStyle>("satellite")
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [filteredLocations, setFilteredLocations] = useState<string[]>([])
  const searchRef = useRef<HTMLDivElement>(null)

  // Filtrar ubicaciones basadas en la búsqueda
  useEffect(() => {
    if (searchQuery.trim()) {
      const filtered = worldLocations.filter((location) => location.toLowerCase().includes(searchQuery.toLowerCase()))
      setFilteredLocations(filtered)
      setShowSuggestions(filtered.length > 0)
    } else {
      setFilteredLocations([])
      setShowSuggestions(false)
    }
  }, [searchQuery])

  // Cerrar sugerencias al hacer click fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleLocationSelect = (location: string) => {
    setSearchQuery(location)
    setShowSuggestions(false)
    onLocationSelect?.(location)
  }

  const handleStyleChange = (style: MapStyle) => {
    setSelectedStyle(style)
    onStyleChange?.(style)
  }

  const mapStyles: { value: MapStyle; label: string }[] = [
    { value: "satellite", label: "Satélite" },
    { value: "dark", label: "Oscuro" },
    { value: "cyclist", label: "Ciclista" },
  ]

  return (
    <div
      className={`bg-slate-700/40 backdrop-blur-md rounded-2xl border border-slate-600/50 shadow-xl p-4 left-2 top-2 absolute z-[1000] ${className}`}
    >
      {/* Buscador con autocompletado */}
      <div ref={searchRef} className="relative mb-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => searchQuery && setShowSuggestions(true)}
            placeholder="Buscar ubicación..."
            className="w-full bg-slate-800/50 text-slate-100 placeholder:text-slate-400 rounded-xl pl-11 pr-4 py-3 border border-slate-600/50 focus:outline-none focus:ring-2 focus:ring-slate-500/50 transition-all"
          />
        </div>

        {/* Lista de sugerencias */}
        {showSuggestions && filteredLocations.length > 0 && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-slate-800/95 backdrop-blur-md rounded-xl border border-slate-600/50 shadow-xl overflow-hidden z-10 max-h-60 overflow-y-auto">
            {filteredLocations.map((location, index) => (
              <button
                key={index}
                onClick={() => handleLocationSelect(location)}
                className="w-full text-left px-4 py-3 text-slate-200 hover:bg-slate-700/50 transition-colors flex items-center gap-2 border-b border-slate-700/50 last:border-b-0"
              >
                <MapPin className="w-4 h-4 text-slate-400" />
                {location}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Selector de estilos de mapa */}
      <div className="space-y-2">
        {mapStyles.map((style) => (
          <button
            key={style.value}
            onClick={() => handleStyleChange(style.value)}
            className={`w-full text-left px-4 py-3 rounded-xl transition-all ${
              selectedStyle === style.value
                ? "bg-slate-600/60 text-slate-100 border-2 border-slate-500/70 shadow-md"
                : "bg-slate-800/30 text-slate-300 border border-slate-600/30 hover:bg-slate-700/40"
            }`}
          >
            <div className="flex items-center gap-3">
              <div
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                  selectedStyle === style.value ? "border-slate-400 bg-slate-500" : "border-slate-500 bg-transparent"
                }`}
              >
                {selectedStyle === style.value && <div className="w-2.5 h-2.5 rounded-full bg-slate-200" />}
              </div>
              <span className="font-medium">{style.label}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
