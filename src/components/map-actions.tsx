"use client"

import { useState } from "react"
import { Info, Share2, Plus, Minus, X, Copy, Check } from "lucide-react"

interface MapActionsProps {
  currentPosition?: { lat: number; lng: number }
  currentMapStyle?: string
  onZoomIn?: () => void
  onZoomOut?: () => void
}

export default function MapActions({
  currentPosition = { lat: 40.7128, lng: -74.006 },
  currentMapStyle = "satellite",
  onZoomIn,
  onZoomOut,
}: MapActionsProps) {
  const [showInfo, setShowInfo] = useState(false)
  const [showShare, setShowShare] = useState(false)
  const [copied, setCopied] = useState(false)

  const shareUrl = `${typeof window !== "undefined" ? window.location.origin : ""}/map?lat=${currentPosition.lat}&lng=${currentPosition.lng}&style=${currentMapStyle}`

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Error al copiar:", err)
    }
  }

  return (
    <div className="relative">
      {/* Main buttons container */}
      <div className="flex flex-col gap-2">
        {/* Info Button */}
        <button
          onClick={() => {
            setShowInfo(!showInfo)
            setShowShare(false)
          }}
          className="w-12 h-12 rounded-full bg-slate-700/40 backdrop-blur-md border border-slate-600/50 flex items-center justify-center text-slate-200 hover:bg-slate-600/50 transition-all duration-200 shadow-lg hover:shadow-xl"
          aria-label="Información"
        >
          <Info className="w-5 h-5" />
        </button>

        {/* Share Button */}
        <button
          onClick={() => {
            setShowShare(!showShare)
            setShowInfo(false)
            setCopied(false)
          }}
          className="w-12 h-12 rounded-full bg-slate-700/40 backdrop-blur-md border border-slate-600/50 flex items-center justify-center text-slate-200 hover:bg-slate-600/50 transition-all duration-200 shadow-lg hover:shadow-xl"
          aria-label="Compartir"
        >
          <Share2 className="w-5 h-5" />
        </button>

        {/* Zoom Controls */}
        <div className="flex flex-col bg-slate-700/40 backdrop-blur-md border border-slate-600/50 rounded-full overflow-hidden shadow-lg">
          <button
            onClick={onZoomIn}
            className="w-12 h-12 flex items-center justify-center text-slate-200 hover:bg-slate-600/50 transition-all duration-200 border-b border-slate-600/50"
            aria-label="Aumentar zoom"
          >
            <Plus className="w-5 h-5" />
          </button>
          <button
            onClick={onZoomOut}
            className="w-12 h-12 flex items-center justify-center text-slate-200 hover:bg-slate-600/50 transition-all duration-200"
            aria-label="Reducir zoom"
          >
            <Minus className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Info Panel */}
      {showInfo && (
        <div className="absolute left-16 top-0 w-80 bg-slate-700/40 backdrop-blur-md border border-slate-600/50 rounded-2xl p-6 shadow-2xl animate-in slide-in-from-left duration-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-slate-100">Información</h3>
            <button
              onClick={() => setShowInfo(false)}
              className="text-slate-400 hover:text-slate-200 transition-colors"
              aria-label="Cerrar"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-4 text-sm text-slate-300">
            <div>
              <h4 className="font-semibold text-slate-200 mb-2">Licencias</h4>
              <p className="leading-relaxed">
                Los datos del mapa son proporcionados por OpenStreetMap y sus colaboradores bajo la licencia ODbL.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-slate-200 mb-2">Atribuciones</h4>
              <p className="leading-relaxed">
                © OpenStreetMap contributors
                <br />© Mapbox
                <br />© Satellite imagery providers
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-slate-200 mb-2">Versión</h4>
              <p className="leading-relaxed">Map Viewer v1.0.0</p>
            </div>
          </div>
        </div>
      )}

      {/* Share Panel */}
      {showShare && (
        <div className="absolute left-16 top-14 w-96 bg-slate-700/40 backdrop-blur-md border border-slate-600/50 rounded-2xl p-6 shadow-2xl animate-in slide-in-from-left duration-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-slate-100">Compartir ubicación</h3>
            <button
              onClick={() => setShowShare(false)}
              className="text-slate-400 hover:text-slate-200 transition-colors"
              aria-label="Cerrar"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <p className="text-sm text-slate-300 mb-3">
                Comparte este enlace para mostrar tu ubicación actual y configuración del mapa:
              </p>

              <div className="bg-slate-800/50 rounded-lg p-3 border border-slate-600/30">
                <p className="text-xs text-slate-400 break-all font-mono">{shareUrl}</p>
              </div>
            </div>

            <div className="space-y-2 text-xs text-slate-400">
              <p>
                <span className="font-semibold text-slate-300">Coordenadas:</span> {currentPosition.lat.toFixed(4)},{" "}
                {currentPosition.lng.toFixed(4)}
              </p>
              <p>
                <span className="font-semibold text-slate-300">Estilo de mapa:</span> {currentMapStyle}
              </p>
            </div>

            <button
              onClick={handleCopyLink}
              className="w-full bg-slate-600/50 hover:bg-slate-600/70 text-slate-100 rounded-lg py-3 px-4 flex items-center justify-center gap-2 transition-all duration-200 border border-slate-500/50"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>¡Copiado!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Copiar enlace</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
