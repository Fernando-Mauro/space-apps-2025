"use client"

import React, { useState, useRef, useEffect, useMemo, ReactNode } from "react"
import { Search, MapPin, Layers, CheckSquare } from "lucide-react"

// --- Interfaces y Tipos ---
interface LayerProps {
  children: React.ReactNode
  name: string
  checked?: boolean
}

interface CustomLayersControlProps {
  children: React.ReactNode
  className?: string
  // Aquí podrías añadir props como onLocationSelect si quisieras conectar la búsqueda
}

// --- Componentes "Dummy" para definir las capas ---
// No renderizan nada por sí mismos, solo sirven para pasar props.
const BaseLayer: React.FC<LayerProps> = () => null
BaseLayer.displayName = "BaseLayer" // Indispensable para identificarlos

const Overlay: React.FC<LayerProps> = () => null
Overlay.displayName = "Overlay" // Indispensable para identificarlos

// Datos de ejemplo para el autocompletado (conservado del original)
const worldLocations = [
  "Madrid, España", "Barcelona, España", "París, Francia", "Londres, Reino Unido",
  "Nueva York, Estados Unidos", "Tokio, Japón", "México City, México",
]

// --- Componente Principal ---
export function CustomLayersControl({ children, className = "" }: CustomLayersControlProps) {
  const searchRef = useRef<HTMLDivElement>(null)

  // --- Estados para la funcionalidad de búsqueda ---
  const [searchQuery, setSearchQuery] = useState("")
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [filteredLocations, setFilteredLocations] = useState<string[]>([])

  // --- Procesamiento de las capas pasadas como children ---
  const { baseLayers, overlays } = useMemo(() => {
    const baseLayers: React.ReactElement<LayerProps>[] = []
    const overlays: React.ReactElement<LayerProps>[] = []

    React.Children.forEach(children, (child) => {
      if (React.isValidElement<LayerProps>(child)) {
        if (child.type === BaseLayer) {
          baseLayers.push(child)
        } else if (child.type === Overlay) {
          overlays.push(child)
        }
      }
    })

    return {
      baseLayers: baseLayers.map(layer => ({ name: layer.props.name, children: layer.props.children })),
      overlays: overlays.map(layer => ({ name: layer.props.name, children: layer.props.children })),
    }
  }, [children])

  const [selectedBaseLayer, setSelectedBaseLayer] = useState<string>(() => {
    const checkedChild = React.Children.toArray(children).find(
      (child) =>
        React.isValidElement(child) &&
        child.type === BaseLayer &&
        (child as React.ReactElement<LayerProps>).props.checked
    ) as React.ReactElement<LayerProps> | undefined;

    return checkedChild?.props.name ?? (baseLayers.length > 0 ? baseLayers[0].name : "");
  });

  const [activeOverlays, setActiveOverlays] = useState<string[]>(() => {
    const checkedOverlays = React.Children.toArray(children).filter(
      (child) =>
        React.isValidElement(child) &&
        child.type === Overlay &&
        (child as React.ReactElement<LayerProps>).props.checked
    ) as React.ReactElement<LayerProps>[];

    return checkedOverlays.map(overlay => overlay.props.name);
  });

  // --- Efectos para la búsqueda (conservados del original) ---
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

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  // --- Manejadores de eventos ---
  const handleLocationSelect = (location: string) => {
    setSearchQuery(location)
    setShowSuggestions(false)
    // Aquí podrías llamar a onLocationSelect?.(location) si lo necesitas
  }

  const toggleOverlay = (name: string) => {
    setActiveOverlays((prev) =>
      prev.includes(name) ? prev.filter((item) => item !== name) : [...prev, name]
    )
  }

  // --- Renderizado ---
  return (
    <>
      {/* EL PANEL DE CONTROL (UI) */}
      <div
        className={`bg-slate-700/40 backdrop-blur-md rounded-2xl border border-slate-600/50 shadow-xl p-4 left-2 top-2 absolute z-[1000] ${className}`}
      >
        {/* Buscador con autocompletado (conservado) */}
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

        {/* --- Selector de Capas Base (Dinámico) --- */}
        {baseLayers.length > 0 && (
          <div className="space-y-2">
            <h3 className="font-semibold text-slate-300 px-1 text-sm flex items-center gap-2"><Layers size={16} /> Capas Base</h3>
            {baseLayers.map((layer) => (
              <button
                key={layer.name}
                onClick={() => setSelectedBaseLayer(layer.name)}
                className={`w-full text-left px-4 py-3 rounded-xl transition-all ${selectedBaseLayer === layer.name
                    ? "bg-slate-600/60 text-slate-100 border-2 border-slate-500/70 shadow-md"
                    : "bg-slate-800/30 text-slate-300 border border-slate-600/30 hover:bg-slate-700/40"
                  }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${selectedBaseLayer === layer.name ? "border-slate-400 bg-slate-500" : "border-slate-500 bg-transparent"
                    }`}>
                    {selectedBaseLayer === layer.name && <div className="w-2.5 h-2.5 rounded-full bg-slate-200" />}
                  </div>
                  <span className="font-medium">{layer.name}</span>
                </div>
              </button>
            ))}
          </div>
        )}

        {/* --- Selector de Overlays (Dinámico) --- */}
        {overlays.length > 0 && (
          <div className="space-y-2 mt-4">
            <h3 className="font-semibold text-slate-300 px-1 text-sm flex items-center gap-2"><CheckSquare size={16} /> Superposiciones</h3>
            {overlays.map((overlay) => (
              <button
                key={overlay.name}
                onClick={() => toggleOverlay(overlay.name)}
                className={`w-full text-left px-4 py-3 rounded-xl transition-all ${activeOverlays.includes(overlay.name)
                    ? "bg-slate-600/60 text-slate-100 border-2 border-slate-500/70 shadow-md"
                    : "bg-slate-800/30 text-slate-300 border border-slate-600/30 hover:bg-slate-700/40"
                  }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all ${activeOverlays.includes(overlay.name) ? "border-slate-400 bg-slate-500" : "border-slate-500 bg-transparent"
                    }`}>
                    {activeOverlays.includes(overlay.name) && <div className="w-2.5 h-2.5 rounded-sm bg-slate-200" />}
                  </div>
                  <span className="font-medium">{overlay.name}</span>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* RENDERIZADO DE LAS CAPAS EN EL MAPA */}
      {baseLayers.find(layer => layer.name === selectedBaseLayer)?.children}
      {overlays.filter(layer => activeOverlays.includes(layer.name)).map(layer => layer.children)}
    </>
  )
}

// Adjuntamos los componentes "dummy" al componente principal
CustomLayersControl.BaseLayer = BaseLayer
CustomLayersControl.Overlay = Overlay