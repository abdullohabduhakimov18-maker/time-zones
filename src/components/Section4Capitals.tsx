import React, { useState } from 'react';
import { StateData, US_STATES } from '../data/usStatesData';
import { FormattedTime } from '../hooks/useTimezones';
import { USMapContainer } from './USMapContainer';
import { Search, Star, MapPin, Building2, Info } from 'lucide-react';

interface Section4CapitalsProps {
  selectedState: StateData | null;
  onSelectState: (state: StateData) => void;
  hoveredState: StateData | null;
  onHoverState: (state: StateData | null) => void;
  formatStateTime: (state: StateData) => FormattedTime;
  is24Hour: boolean;
}

export const Section4Capitals: React.FC<Section4CapitalsProps> = ({
  selectedState,
  onSelectState,
  hoveredState,
  onHoverState,
  formatStateTime,
  is24Hour
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredStates = US_STATES.filter(
    s =>
      s.capital.toLowerCase().includes(searchQuery.toLowerCase().trim()) ||
      s.name.toLowerCase().includes(searchQuery.toLowerCase().trim())
  );

  return (
    <section id="section-4" className="space-y-6">
      {/* Section Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-[#02a2f0] uppercase tracking-wider mb-1">
            <span>SECTION 4</span>
            <span>·</span>
            <span>CAPITAL CITIES</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
            US Map with State Capitals
          </h2>
          <p className="mt-1 text-sm text-slate-600 max-w-2xl text-balance">
            Every state capital city is placed at its precise geographic coordinates with a distinct capital pin and city label.
          </p>
        </div>

        {/* Search by Capital or State */}
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search capital city (e.g. Austin)..."
            className="w-full pl-9 pr-3 py-2.5 text-xs rounded-xl border border-slate-200 bg-white text-slate-800 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-[#02a2f0]/20 focus:border-[#02a2f0] transition-all shadow-2xs"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Interactive Map */}
      <USMapContainer
        mode="capitals"
        selectedState={selectedState}
        onSelectState={onSelectState}
        hoveredState={hoveredState}
        onHoverState={onHoverState}
        formatStateTime={formatStateTime}
        searchQuery={searchQuery}
        is24Hour={is24Hour}
      />

      {/* Capital Cities Grid Directory */}
      <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
            <Star className="w-3.5 h-3.5 text-[#f59e0b]" />
            State Capitals Directory ({filteredStates.length})
          </h3>
          <span className="text-[11px] text-slate-400">Click to locate on map</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2.5 max-h-56 overflow-y-auto pr-1">
          {filteredStates.map(state => {
            const isSelected = selectedState?.id === state.id;

            return (
              <button
                key={state.id}
                onClick={() => onSelectState(state)}
                onMouseEnter={() => onHoverState(state)}
                onMouseLeave={() => onHoverState(null)}
                className={`p-3 rounded-xl border text-left transition-all flex flex-col justify-between ${
                  isSelected
                    ? 'border-[#02a2f0] bg-blue-50/80 ring-2 ring-[#02a2f0]/20 shadow-xs'
                    : 'border-slate-200 bg-[#f8fafc] hover:bg-white hover:border-[#02a2f0] hover:shadow-2xs'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-slate-900 truncate">
                      {state.capital}
                    </span>
                    <span className="font-mono text-[10px] text-[#02a2f0] font-bold">
                      {state.abbr}
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-500 truncate mt-0.5">
                    {state.name}
                  </div>
                </div>

                <div className="mt-2 text-[10px] text-slate-400 flex items-center gap-1 font-medium">
                  <MapPin className="w-2.5 h-2.5 text-red-500" />
                  <span>{state.timeZone}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Capitals Trivia & Historical Insights */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1">
          <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
            <Building2 className="w-3.5 h-3.5 text-[#02a2f0]" />
            Oldest State Capital
          </span>
          <p className="text-xs text-slate-600 leading-relaxed">
            <strong>Santa Fe, NM</strong> was founded in 1610 as the capital of Nuevo México, making it the oldest state capital in the US.
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1">
          <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
            <Building2 className="w-3.5 h-3.5 text-[#f59e0b]" />
            Highest Elevation Capital
          </span>
          <p className="text-xs text-slate-600 leading-relaxed">
            <strong>Santa Fe, NM</strong> sits at 7,199 ft (2,194 m) above sea level, higher than Denver, CO (5,280 ft).
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1">
          <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
            <Info className="w-3.5 h-3.5 text-emerald-600" />
            Not the Largest City
          </span>
          <p className="text-xs text-slate-600 leading-relaxed">
            Only 17 of 50 state capitals are their state's most populous city (e.g. Albany, NY vs NYC; Sacramento, CA vs LA).
          </p>
        </div>
      </div>
    </section>
  );
};
