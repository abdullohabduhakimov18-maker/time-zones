import React, { useRef, useState, useEffect } from 'react';
import { TruckTypeData } from '../data/truckTypesData';
import { TruckImage } from './TruckImage';
import {
  Camera,
  Maximize2,
  Minimize2,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  ShieldCheck,
  CheckCircle2,
  Layers,
  Info
} from 'lucide-react';

interface Real3DTruckViewerProps {
  activeTruck: TruckTypeData;
}

export const Real3DTruckViewer: React.FC<Real3DTruckViewerProps> = ({ activeTruck }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Clean 2D Viewer State (Zero dots on picture, pure photography)
  const [zoom, setZoom] = useState<number>(1.0); // 1.0 to 2.2
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [panOffset, setPanOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [activeComponentId, setActiveComponentId] = useState<string | null>(null);

  // Pan dragging state when zoomed in
  const isPanningRef = useRef<boolean>(false);
  const startPanPosRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  // Reset view when active truck changes
  useEffect(() => {
    setZoom(1.0);
    setPanOffset({ x: 0, y: 0 });
    if (activeTruck.photoHotspots && activeTruck.photoHotspots.length > 0) {
      setActiveComponentId(activeTruck.photoHotspots[0].id);
    } else {
      setActiveComponentId(null);
    }
  }, [activeTruck.id]);

  // Zoom handlers
  const handleZoomIn = () => {
    setZoom(prev => Math.min(2.2, Number((prev + 0.25).toFixed(2))));
  };

  const handleZoomOut = () => {
    setZoom(prev => {
      const next = Math.max(1.0, Number((prev - 0.25).toFixed(2)));
      if (next === 1.0) {
        setPanOffset({ x: 0, y: 0 });
      }
      return next;
    });
  };

  const handleReset = () => {
    setZoom(1.0);
    setPanOffset({ x: 0, y: 0 });
  };

  // Mouse wheel zoom
  const handleWheel = (e: React.WheelEvent) => {
    if (e.ctrlKey || e.metaKey || isFullscreen) {
      e.preventDefault();
      const delta = e.deltaY > 0 ? -0.15 : 0.15;
      setZoom(prev => {
        const next = Math.max(1.0, Math.min(2.2, Number((prev + delta).toFixed(2))));
        if (next === 1.0) setPanOffset({ x: 0, y: 0 });
        return next;
      });
    }
  };

  // Pan dragging when zoomed in
  const handlePointerDown = (e: React.PointerEvent) => {
    if (zoom > 1.0) {
      isPanningRef.current = true;
      startPanPosRef.current = {
        x: e.clientX - panOffset.x,
        y: e.clientY - panOffset.y
      };
    }
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (isPanningRef.current && zoom > 1.0) {
      const newX = e.clientX - startPanPosRef.current.x;
      const newY = e.clientY - startPanPosRef.current.y;
      const maxPanX = (zoom - 1.0) * 320;
      const maxPanY = (zoom - 1.0) * 160;
      setPanOffset({
        x: Math.max(-maxPanX, Math.min(maxPanX, newX)),
        y: Math.max(-maxPanY, Math.min(maxPanY, newY))
      });
    }
  };

  const handlePointerUp = () => {
    isPanningRef.current = false;
  };

  const components = activeTruck.photoHotspots || [];
  const activeComponent = components.find(c => c.id === activeComponentId) || components[0];

  return (
    <div
      className={`relative bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden select-none transition-all duration-300 ${
        isFullscreen ? 'fixed inset-0 z-50 rounded-none border-none p-4' : ''
      }`}
    >
      {/* 1. Header Toolbar */}
      <div className="px-4 sm:px-6 py-3 border-b border-slate-200 bg-[#f8fafc] flex flex-wrap items-center justify-between gap-3">
        {/* Left: Real Fleet Photography Badge */}
        <div className="flex items-center gap-2.5">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-50 border border-blue-200 text-[#02a2f0] font-extrabold text-xs shadow-2xs">
            <Camera className="w-3.5 h-3.5" />
            <span>Real Fleet Photography</span>
          </div>

          <span className="text-xs text-slate-500 font-medium hidden sm:inline">
            High-Resolution Vehicle Inspection · Clean White Studio
          </span>
        </div>

        {/* Right: Clean Zoom Controls */}
        <div className="flex items-center gap-2">
          {/* Zoom In & Out */}
          <div className="flex items-center bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden">
            <button
              onClick={handleZoomIn}
              className="p-1.5 px-2.5 hover:bg-slate-100 text-slate-700 hover:text-[#02a2f0] transition-colors"
              title="Zoom In (+)"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
            <span className="text-[11px] font-mono font-bold text-slate-600 px-2 border-x border-slate-100 min-w-[48px] text-center">
              {Math.round(zoom * 100)}%
            </span>
            <button
              onClick={handleZoomOut}
              className="p-1.5 px-2.5 hover:bg-slate-100 text-slate-700 hover:text-[#02a2f0] transition-colors"
              title="Zoom Out (-)"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Reset Zoom */}
          {zoom > 1.0 && (
            <button
              onClick={handleReset}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl border border-slate-200 bg-white hover:border-slate-300 text-slate-700 hover:text-slate-900 text-xs font-semibold transition-colors shadow-2xs"
              title="Reset View to 100%"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Reset</span>
            </button>
          )}

          {/* Fullscreen Toggle */}
          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-1.5 rounded-xl border border-slate-200 bg-white hover:border-slate-300 text-slate-700 hover:text-slate-900 transition-colors shadow-2xs"
            title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen Vehicle Showcase'}
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* 2. Primary Vehicle Showcase Stage: Pure clean white background, ZERO dots on the picture */}
      <div
        ref={containerRef}
        className={`relative w-full aspect-[16/9] ${
          isFullscreen ? 'h-[calc(100vh-180px)] aspect-auto' : 'max-h-[540px] min-h-[380px]'
        } bg-white flex items-center justify-center overflow-hidden select-none ${
          zoom > 1.0 ? 'cursor-grab active:cursor-grabbing' : 'cursor-default'
        }`}
        onWheel={handleWheel}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
      >
        {/* Soft natural floor shadow grounded under the vehicle */}
        <div
          className="absolute bottom-8 sm:bottom-10 inset-x-12 sm:inset-x-20 h-8 rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(15,23,42,0.25) 0%, rgba(15,23,42,0.06) 55%, transparent 75%)',
            filter: 'blur(7px)'
          }}
        />

        {/* 2D Zoom & Pan Container */}
        <div
          className="relative max-w-[94%] sm:max-w-[88%] max-h-[92%] w-full flex items-center justify-center transition-transform duration-150 ease-out will-change-transform"
          style={{
            transform: `scale(${zoom}) translate(${panOffset.x / zoom}px, ${panOffset.y / zoom}px)`
          }}
        >
          {/* Pristine Real Fleet Photography - No dots, no overlay markers */}
          <div className="relative w-full flex items-center justify-center">
            <TruckImage
              truck={activeTruck}
              isTransparentBlend={true}
              className="w-full h-auto max-h-[460px] object-contain block drop-shadow-xl select-none"
            />
          </div>
        </div>

        {/* Pan hint when zoomed in */}
        {zoom > 1.0 && (
          <div className="absolute bottom-4 left-4 z-20 bg-slate-900/85 backdrop-blur-sm text-white px-3 py-1.5 rounded-lg text-[11px] font-medium pointer-events-none">
            Drag to pan image ({Math.round(zoom * 100)}% zoom)
          </div>
        )}
      </div>

      {/* 3. Component Details Section (Clean cards below picture, no dots on photo) */}
      {components.length > 0 && (
        <div className="p-4 sm:p-5 border-t border-slate-200 bg-[#f8fafc]">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700 uppercase tracking-wider">
              <Layers className="w-3.5 h-3.5 text-[#02a2f0]" />
              <span>Key Vehicle Components &amp; Hardware:</span>
            </div>
            <span className="text-[11px] text-slate-400 font-medium">
              Click any component to view FMCSA standards
            </span>
          </div>

          {/* Component Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 mb-3">
            {components.map((c) => {
              const isSelected = activeComponent?.id === c.id;
              return (
                <button
                  key={c.id}
                  onClick={() => setActiveComponentId(c.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all border ${
                    isSelected
                      ? 'bg-white text-[#02a2f0] border-[#02a2f0] shadow-xs ring-2 ring-[#02a2f0]/20'
                      : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300 hover:text-slate-900'
                  }`}
                >
                  {c.name}
                </button>
              );
            })}
          </div>

          {/* Active Component Detail Card */}
          {activeComponent && (
            <div className="p-3.5 sm:p-4 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-2">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded-md bg-blue-50 text-[#02a2f0] font-mono font-bold text-[10px] uppercase">
                    {activeComponent.tag}
                  </span>
                  <span className="font-extrabold text-sm text-slate-900">
                    {activeComponent.name}
                  </span>
                </div>
                <div className="flex items-center gap-1 text-[11px] font-semibold text-emerald-600">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Standard Fleet Spec</span>
                </div>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                {activeComponent.description}
              </p>

              <div className="pt-2 border-t border-slate-100 flex items-start gap-2 text-[11px] text-slate-700">
                <ShieldCheck className="w-3.5 h-3.5 text-[#02a2f0] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900 font-bold mr-1">FMCSA / DOT Standard:</strong>
                  <span>{activeComponent.dotImportance}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* 4. Footer Vehicle Specifications Bar */}
      <div className="px-4 sm:px-6 py-2.5 bg-white border-t border-slate-200 flex flex-wrap items-center justify-between text-xs text-slate-500 gap-2">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#10b981]" />
            <span className="font-bold text-slate-800">{activeTruck.name}</span>
          </div>
          <span className="hidden sm:inline text-slate-300">|</span>
          <span className="hidden sm:inline">
            Dimensions: {activeTruck.length} × {activeTruck.width.split(' ')[0]} × {activeTruck.height.split(' ')[0]}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <span className="font-mono font-bold text-[#02a2f0]">
            Max Payload: {activeTruck.maxCargoWeightLbs.toLocaleString()} lbs
          </span>
          <span className="text-slate-300">|</span>
          <span className="font-semibold text-slate-700">
            {activeTruck.cdlRequirement.split('(')[0]}
          </span>
        </div>
      </div>
    </div>
  );
};
