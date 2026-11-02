import React, { useState, useRef, useMemo } from 'react';
import { StateData, US_STATES, TIME_ZONE_DEFINITIONS, TimeZoneCategory } from '../data/usStatesData';
import { FormattedTime } from '../hooks/useTimezones';
import { ZoomIn, ZoomOut, RotateCcw, Clock, MapPin, Sparkles } from 'lucide-react';

export type MapDisplayMode = 'timezones' | 'names' | 'abbreviations' | 'capitals' | 'livetime';

interface USMapContainerProps {
  mode: MapDisplayMode;
  selectedState: StateData | null;
  onSelectState: (state: StateData) => void;
  hoveredState: StateData | null;
  onHoverState: (state: StateData | null) => void;
  formatStateTime: (state: StateData) => FormattedTime;
  activeTimeZoneFilter?: TimeZoneCategory | 'All';
  searchQuery?: string;
  highlightSplitStates?: boolean;
  is24Hour?: boolean;
}

export const USMapContainer: React.FC<USMapContainerProps> = ({
  mode,
  selectedState,
  onSelectState,
  hoveredState,
  onHoverState,
  formatStateTime,
  activeTimeZoneFilter = 'All',
  searchQuery = '',
  highlightSplitStates = false,
  is24Hour = false
}) => {
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [panOffset, setPanOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const dragStartRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const [mousePos, setMousePos] = useState<{ x: number; y: number } | null>(null);

  // Zoom controls
  const handleZoomIn = () => setZoomLevel(prev => Math.min(prev + 0.35, 3.5));
  const handleZoomOut = () => setZoomLevel(prev => Math.max(prev - 0.35, 0.8));
  const handleResetZoom = () => {
    setZoomLevel(1);
    setPanOffset({ x: 0, y: 0 });
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button === 0 && zoomLevel > 1) {
      setIsDragging(true);
      dragStartRef.current = { x: e.clientX - panOffset.x, y: e.clientY - panOffset.y };
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });

    if (isDragging) {
      setPanOffset({
        x: e.clientX - dragStartRef.current.x,
        y: e.clientY - dragStartRef.current.y
      });
    }
  };

  const handleMouseUp = () => setIsDragging(false);

  // Compute filtered search state IDs
  const matchedStateIds = useMemo(() => {
    if (!searchQuery.trim()) return new Set<string>();
    const q = searchQuery.toLowerCase().trim();
    return new Set(
      US_STATES.filter(
        s =>
          s.name.toLowerCase().includes(q) ||
          s.abbr.toLowerCase().includes(q) ||
          s.capital.toLowerCase().includes(q) ||
          s.timeZone.toLowerCase().includes(q)
      ).map(s => s.id)
    );
  }, [searchQuery]);

  // Determine state fill color based on mode and active filters
  const getStateFill = (state: StateData, isHovered: boolean, isSelected: boolean) => {
    const tzDef = TIME_ZONE_DEFINITIONS[state.timeZone];
    const isFilteredOut = activeTimeZoneFilter !== 'All' && state.timeZone !== activeTimeZoneFilter;
    const isSearchFilteredOut = matchedStateIds.size > 0 && !matchedStateIds.has(state.id);

    if (isFilteredOut || isSearchFilteredOut) {
      return '#f1f5f9'; // subdued soft gray
    }

    if (isSelected) return '#14516e'; // LogistMate signature deep naval teal

    if (mode === 'timezones') {
      if (isHovered) return tzDef.colorDark;
      return tzDef.colorLight;
    }

    if (mode === 'names') {
      if (isHovered) return '#0091d9';
      return tzDef.colorLight;
    }

    if (mode === 'abbreviations') {
      if (isHovered) return tzDef.colorDark;
      return tzDef.colorLight;
    }

    if (mode === 'capitals') {
      if (isHovered) return tzDef.colorDark;
      return tzDef.colorLight;
    }

    // mode === 'livetime'
    if (isHovered) return tzDef.colorDark;
    return tzDef.colorLight;
  };

  const currentHoveredTime = hoveredState ? formatStateTime(hoveredState) : null;

  return (
    <div className="relative w-full bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden select-none">
      {/* Top Map Action Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 bg-[#f8fafc] border-b border-slate-200 text-xs text-slate-600">
        <div className="flex items-center gap-2">
          <span className="font-bold text-slate-800">Interactive US Map</span>
          <span className="text-slate-300">|</span>
          <span className="hidden sm:inline text-slate-500">
            {mode === 'timezones' && 'Color-coded by standard US time zones'}
            {mode === 'names' && 'Displaying full official state names on geography'}
            {mode === 'abbreviations' && 'Displaying two-letter USPS postal codes'}
            {mode === 'capitals' && 'Displaying state capital cities and geographic pins'}
            {mode === 'livetime' && 'Live ticking local clocks for each jurisdiction'}
          </span>
        </div>

        {/* Zoom & Reset Controls */}
        <div className="flex items-center gap-1.5 ml-auto">
          <button
            onClick={handleZoomIn}
            className="p-1.5 rounded-lg border border-slate-200 bg-white hover:border-[#02a2f0] hover:text-[#02a2f0] text-slate-700 transition-colors shadow-2xs"
            title="Zoom In"
            aria-label="Zoom in on map"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={handleZoomOut}
            className="p-1.5 rounded-lg border border-slate-200 bg-white hover:border-[#02a2f0] hover:text-[#02a2f0] text-slate-700 transition-colors shadow-2xs"
            title="Zoom Out"
            aria-label="Zoom out on map"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={handleResetZoom}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white hover:border-[#02a2f0] hover:text-[#02a2f0] text-slate-700 font-semibold transition-colors shadow-2xs"
            title="Reset View"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="text-[11px] hidden sm:inline">Reset</span>
          </button>
        </div>
      </div>

      {/* SVG Canvas Container */}
      <div
        className={`relative w-full aspect-[975/610] max-h-[640px] bg-white overflow-hidden ${
          zoomLevel > 1 ? 'cursor-grab active:cursor-grabbing' : 'cursor-default'
        }`}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={() => {
          handleMouseUp();
          onHoverState(null);
          setMousePos(null);
        }}
      >
        <svg
          viewBox="0 0 975 610"
          className="w-full h-full transition-transform duration-150 ease-out"
          style={{
            transform: `translate(${panOffset.x}px, ${panOffset.y}px) scale(${zoomLevel})`,
            transformOrigin: '50% 50%'
          }}
        >
          <defs>
            {/* Split state diagonal stripes pattern */}
            <pattern id="split-stripe" width="8" height="8" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
              <line x1="0" y1="0" x2="0" y2="8" stroke="rgba(255,255,255,0.5)" strokeWidth="2.5" />
            </pattern>

            {/* Drop shadow filter for labels */}
            <filter id="label-shadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="1" stdDeviation="1.2" floodColor="#000000" floodOpacity="0.4" />
            </filter>
            <filter id="pin-shadow" x="-30%" y="-30%" width="160%" height="160%">
              <feDropShadow dx="0" dy="1" stdDeviation="1.8" floodColor="#000000" floodOpacity="0.4" />
            </filter>
          </defs>

          {/* 1. Base State Polygons */}
          <g id="states-layer">
            {US_STATES.map(state => {
              const isHovered = hoveredState?.id === state.id;
              const isSelected = selectedState?.id === state.id;
              const isSearchMatch = matchedStateIds.has(state.id);
              const isFilteredOut =
                (activeTimeZoneFilter !== 'All' && state.timeZone !== activeTimeZoneFilter) ||
                (matchedStateIds.size > 0 && !isSearchMatch);

              const fillColor = getStateFill(state, isHovered, isSelected);

              return (
                <path
                  key={state.id}
                  id={`state-${state.id}`}
                  d={state.path}
                  fill={fillColor}
                  stroke={
                    isSelected
                      ? '#14516e'
                      : isHovered
                      ? '#02a2f0'
                      : isSearchMatch
                      ? '#f59e0b'
                      : '#ffffff'
                  }
                  strokeWidth={isSelected ? 3 : isHovered ? 2.5 : isSearchMatch ? 2.5 : 1.2}
                  strokeLinejoin="round"
                  className="map-state-path cursor-pointer"
                  style={{
                    opacity: isFilteredOut ? 0.35 : 1,
                    filter: isHovered || isSelected ? 'brightness(1.05)' : undefined
                  }}
                  onMouseEnter={() => onHoverState(state)}
                  onClick={() => onSelectState(state)}
                />
              );
            })}
          </g>

          {/* Multi-timezone striped overlay if enabled */}
          {highlightSplitStates && (
            <g id="split-states-layer" pointerEvents="none">
              {US_STATES.filter(s => s.splitNote.length > 35).map(state => (
                <path
                  key={`split-${state.id}`}
                  d={state.path}
                  fill="url(#split-stripe)"
                  stroke="none"
                  opacity={0.65}
                />
              ))}
            </g>
          )}

          {/* 2. Callout Leader Lines for Tiny Eastern States */}
          <g id="callout-lines-layer" pointerEvents="none">
            {US_STATES.filter(s => s.callout !== null).map(state => {
              const isHovered = hoveredState?.id === state.id;
              const isSelected = selectedState?.id === state.id;
              const call = state.callout!;
              const anchor = mode === 'capitals' ? state.capitalPos : state.centroid;

              return (
                <path
                  key={`leader-${state.id}`}
                  d={`M${anchor[0]},${anchor[1]} L${call.x - 6},${call.y}`}
                  fill="none"
                  stroke={isSelected || isHovered ? '#02a2f0' : '#94a3b8'}
                  strokeWidth={isSelected || isHovered ? 1.8 : 1}
                  strokeDasharray={isSelected || isHovered ? 'none' : '2,2'}
                  opacity={0.85}
                />
              );
            })}
          </g>

          {/* 3. Section-Specific Text & Marker Overlays */}

          {/* SECTION 1: TIME ZONES - Shows Zone Badges & Abbreviations */}
          {mode === 'timezones' && (
            <g id="tz-labels" pointerEvents="none">
              {US_STATES.map(state => {
                const isHovered = hoveredState?.id === state.id;
                const pos = state.callout || { x: state.labelPos[0], y: state.labelPos[1] };
                return (
                  <text
                    key={`tz-label-${state.id}`}
                    x={pos.x}
                    y={pos.y}
                    textAnchor="middle"
                    dominantBaseline="central"
                    fill="#ffffff"
                    filter="url(#label-shadow)"
                    className="font-bold tracking-wide pointer-events-none"
                    style={{
                      fontWeight: isHovered ? 800 : 700,
                      fontSize: state.abbr === 'AK' || state.abbr === 'TX' || state.abbr === 'CA' ? '15px' : '11px'
                    }}
                  >
                    {state.abbr}
                  </text>
                );
              })}
            </g>
          )}

          {/* SECTION 2: FULL STATE NAMES DISPLAYED ON EACH STATE */}
          {mode === 'names' && (
            <g id="names-layer" pointerEvents="none">
              {US_STATES.map(state => {
                const isHovered = hoveredState?.id === state.id;
                const hasCallout = state.callout !== null;
                const pos = hasCallout
                  ? { x: state.callout!.x, y: state.callout!.y }
                  : { x: state.labelPos[0], y: state.labelPos[1] };

                let fontSize = '11px';
                if (['TX', 'AK', 'MT', 'CA'].includes(state.abbr)) fontSize = '14px';
                if (['NM', 'AZ', 'CO', 'WY', 'NV', 'OR', 'WA', 'UT', 'ID'].includes(state.abbr)) fontSize = '12px';
                if (['RI', 'DE', 'DC', 'CT', 'NJ', 'MD', 'MA', 'VT', 'NH'].includes(state.abbr)) fontSize = '10px';

                return (
                  <g key={`name-node-${state.id}`} transform={`translate(${pos.x}, ${pos.y})`}>
                    {hasCallout && (
                      <rect
                        x="-4"
                        y="-8"
                        width={state.name.length * 6.5 + 8}
                        height="16"
                        rx="4"
                        fill="#14516e"
                      />
                    )}
                    <text
                      x={hasCallout ? 0 : 0}
                      y={0}
                      textAnchor={hasCallout ? 'start' : 'middle'}
                      dominantBaseline="central"
                      fill="#ffffff"
                      filter="url(#label-shadow)"
                      className="font-semibold select-none pointer-events-none"
                      style={{
                        fontSize,
                        fontWeight: isHovered ? 800 : 600,
                        letterSpacing: '0.02em'
                      }}
                    >
                      {state.name}
                    </text>
                  </g>
                );
              })}
            </g>
          )}

          {/* SECTION 3: STATE ABBREVIATIONS DISPLAYED ON EACH STATE */}
          {mode === 'abbreviations' && (
            <g id="abbr-layer" pointerEvents="none">
              {US_STATES.map(state => {
                const isHovered = hoveredState?.id === state.id;
                const hasCallout = state.callout !== null;
                const pos = hasCallout
                  ? { x: state.callout!.x, y: state.callout!.y }
                  : { x: state.labelPos[0], y: state.labelPos[1] };

                return (
                  <g key={`abbr-node-${state.id}`} transform={`translate(${pos.x}, ${pos.y})`}>
                    {hasCallout && (
                      <rect
                        x="-14"
                        y="-10"
                        width="28"
                        height="20"
                        rx="5"
                        fill="#14516e"
                        stroke="#ffffff"
                        strokeWidth="1.5"
                      />
                    )}
                    <text
                      x={0}
                      y={hasCallout ? 1 : 0}
                      textAnchor="middle"
                      dominantBaseline="central"
                      fill="#ffffff"
                      filter="url(#label-shadow)"
                      className="font-bold tracking-wider font-mono select-none pointer-events-none"
                      style={{
                        fontSize: hasCallout ? '11px' : '13px',
                        fontWeight: isHovered ? 900 : 700
                      }}
                    >
                      {state.abbr}
                    </text>
                  </g>
                );
              })}
            </g>
          )}

          {/* SECTION 4: STATE CAPITALS DISPLAYED ON EACH STATE */}
          {mode === 'capitals' && (
            <g id="capitals-layer" pointerEvents="none">
              {US_STATES.map(state => {
                const isHovered = hoveredState?.id === state.id;
                const isSelected = selectedState?.id === state.id;
                const [capX, capY] = state.capitalPos;
                const hasCallout = state.callout !== null;

                const textX = hasCallout ? state.callout!.x : capX + 7;
                const textY = hasCallout ? state.callout!.y : capY - 1;
                const textAnchor = hasCallout ? 'start' : 'start';

                return (
                  <g key={`cap-${state.id}`}>
                    {/* Capital Star / Marker Pin */}
                    <g transform={`translate(${capX}, ${capY})`} filter="url(#pin-shadow)">
                      <circle r={isSelected ? 5.5 : isHovered ? 5 : 3.8} fill="#ffffff" stroke="#14516e" strokeWidth="1.5" />
                      <circle r={isSelected ? 3.2 : isHovered ? 2.8 : 2} fill="#ef4444" />
                    </g>

                    {/* Capital Name Text */}
                    {hasCallout ? (
                      <g transform={`translate(${textX}, ${textY})`}>
                        <rect
                          x="-4"
                          y="-8"
                          width={state.capital.length * 6.5 + 8}
                          height="16"
                          rx="4"
                          fill="#14516e"
                        />
                        <text
                          x={0}
                          y={0}
                          textAnchor="start"
                          dominantBaseline="central"
                          fill="#ffffff"
                          className="font-semibold text-[10px] select-none"
                          style={{ fontWeight: isHovered ? 700 : 600 }}
                        >
                          {state.capital}
                        </text>
                      </g>
                    ) : (
                      <text
                        x={textX}
                        y={textY}
                        textAnchor={textAnchor}
                        dominantBaseline="central"
                        fill="#ffffff"
                        filter="url(#label-shadow)"
                        className="font-semibold select-none pointer-events-none"
                        style={{
                          fontSize: isHovered ? '11px' : '9.5px',
                          fontWeight: isHovered ? 800 : 600,
                          textShadow: '0 1px 3px rgba(0,0,0,0.8)'
                        }}
                      >
                        {state.capital}
                      </text>
                    )}
                  </g>
                );
              })}
            </g>
          )}

          {/* SECTION 5: LIVE CURRENT TIME MAP DISPLAY */}
          {mode === 'livetime' && (
            <g id="live-time-layer" pointerEvents="none">
              {US_STATES.map(state => {
                const isHovered = hoveredState?.id === state.id;
                const isSelected = selectedState?.id === state.id;
                const hasCallout = state.callout !== null;
                const pos = hasCallout
                  ? { x: state.callout!.x, y: state.callout!.y }
                  : { x: state.labelPos[0], y: state.labelPos[1] };

                const formatted = formatStateTime(state);

                return (
                  <g key={`time-badge-${state.id}`} transform={`translate(${pos.x}, ${pos.y})`}>
                    <rect
                      x="-26"
                      y="-11"
                      width="52"
                      height="22"
                      rx="6"
                      fill={isSelected ? '#14516e' : isHovered ? '#0f172a' : 'rgba(20, 81, 110, 0.9)'}
                      stroke={isSelected ? '#02a2f0' : isHovered ? '#ffffff' : 'rgba(255,255,255,0.6)'}
                      strokeWidth={isSelected ? 2 : 1}
                      filter="url(#pin-shadow)"
                    />
                    <text
                      x={0}
                      y={-1}
                      textAnchor="middle"
                      dominantBaseline="central"
                      fill="#ffffff"
                      className="font-mono font-semibold text-[9.5px] tabular-nums"
                    >
                      {formatted.timeOnly}
                    </text>
                    {!is24Hour && (
                      <text
                        x={0}
                        y={6}
                        textAnchor="middle"
                        dominantBaseline="central"
                        fill="#cbd5e1"
                        className="text-[6.5px] uppercase tracking-wider font-bold"
                      >
                        {formatted.period}
                      </text>
                    )}
                  </g>
                );
              })}
            </g>
          )}
        </svg>

        {/* Dynamic Floating Hover Tooltip (LogistMate crisp style) */}
        {hoveredState && currentHoveredTime && mousePos && (
          <div
            className="absolute z-30 pointer-events-none transform -translate-x-1/2 -translate-y-full pb-3 transition-opacity duration-100"
            style={{
              left: `${mousePos.x}px`,
              top: `${mousePos.y}px`,
              filter: 'drop-shadow(0 10px 20px rgba(20, 81, 110, 0.15))'
            }}
          >
            <div className="bg-white text-slate-800 rounded-xl p-3 border border-slate-200 text-xs min-w-[220px] space-y-1.5 shadow-xl">
              {/* Header row */}
              <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-1.5">
                <div>
                  <span className="font-bold text-sm text-slate-900">{hoveredState.name}</span>
                  <span className="ml-1.5 px-1.5 py-0.5 rounded bg-[#02a2f0]/10 text-[10px] font-mono text-[#02a2f0] font-bold">
                    {hoveredState.abbr}
                  </span>
                </div>
                <span className="text-[10px] text-slate-500 font-semibold">
                  {hoveredState.timeZone}
                </span>
              </div>

              {/* Capital City */}
              <div className="flex items-center justify-between text-slate-600">
                <span className="flex items-center gap-1 text-slate-500">
                  <MapPin className="w-3 h-3 text-[#ef4444]" /> Capital:
                </span>
                <span className="font-semibold text-slate-800">{hoveredState.capital}</span>
              </div>

              {/* Live Time */}
              <div className="flex items-center justify-between text-slate-600">
                <span className="flex items-center gap-1 text-slate-500">
                  <Clock className="w-3 h-3 text-[#02a2f0]" /> Current Time:
                </span>
                <span className="font-mono font-bold text-[#02a2f0] tabular-nums">
                  {currentHoveredTime.timeWithSeconds}
                </span>
              </div>

              {/* Time Zone details & DST note */}
              <div className="text-[10px] text-slate-500 pt-1 border-t border-slate-100 flex items-center justify-between">
                <span>{hoveredState.observesDst ? 'Observes DST' : 'Standard Time (No DST)'}</span>
                <span className="font-mono text-slate-700 font-semibold">
                  {TIME_ZONE_DEFINITIONS[hoveredState.timeZone].standardAbbr} / {TIME_ZONE_DEFINITIONS[hoveredState.timeZone].utcStandard}
                </span>
              </div>

              {hoveredState.splitNote.length > 35 && (
                <div className="text-[9.5px] text-[#f59e0b] font-medium leading-tight pt-1">
                  * Multi-time zone state (Click to inspect)
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Map Footer Helper Bar */}
      <div className="px-4 py-2.5 bg-[#f8fafc] border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-500">
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-[#02a2f0] animate-pulse" />
          Click any state on the map for detailed logistics and time zone intelligence.
        </span>
        <span className="hidden sm:inline text-slate-400">
          Showing 50 States + District of Columbia
        </span>
      </div>
    </div>
  );
};
