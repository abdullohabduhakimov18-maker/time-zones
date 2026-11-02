import React, { useState } from 'react';
import { StateData, US_STATES } from '../data/usStatesData';
import { FormattedTime } from '../hooks/useTimezones';
import { USMapContainer } from './USMapContainer';
import { Search, Type } from 'lucide-react';

interface Section2StateNamesProps {
  selectedState: StateData | null;
  onSelectState: (state: StateData) => void;
  hoveredState: StateData | null;
  onHoverState: (state: StateData | null) => void;
  formatStateTime: (state: StateData) => FormattedTime;
  is24Hour: boolean;
}

export const Section2StateNames: React.FC<Section2StateNamesProps> = ({
  selectedState,
  onSelectState,
  hoveredState,
  onHoverState,
  formatStateTime,
  is24Hour
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredStates = US_STATES.filter(s =>
    s.name.toLowerCase().includes(searchQuery.toLowerCase().trim())
  );

  return (
    <section id="section-2" className="space-y-6">
      {/* Section Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-[#02a2f0] uppercase tracking-wider mb-1">
            <span>SECTION 2</span>
            <span>·</span>
            <span>GEOGRAPHIC REFERENCE</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
            US Map with Full State Names
          </h2>
          <p className="mt-1 text-sm text-slate-600 max-w-2xl text-balance">
            Every state name is clearly labeled on its geographic territory, with dedicated offset callout lines for compact Atlantic Seaboard states to ensure complete legibility.
          </p>
        </div>

        {/* Search State by Name */}
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search state name (e.g. Ohio)..."
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
        mode="names"
        selectedState={selectedState}
        onSelectState={onSelectState}
        hoveredState={hoveredState}
        onHoverState={onHoverState}
        formatStateTime={formatStateTime}
        searchQuery={searchQuery}
        is24Hour={is24Hour}
      />

      {/* Quick State Browser & Insights */}
      <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
            <Type className="w-3.5 h-3.5 text-[#02a2f0]" />
            Quick Alphabetical State Directory ({filteredStates.length} states)
          </h3>
          <span className="text-[11px] text-slate-400">Click to locate on map</span>
        </div>

        {/* Scrollable State Buttons */}
        <div className="flex flex-wrap gap-1.5 max-h-36 overflow-y-auto pr-1">
          {filteredStates.map(state => {
            const isSelected = selectedState?.id === state.id;
            return (
              <button
                key={state.id}
                onClick={() => onSelectState(state)}
                onMouseEnter={() => onHoverState(state)}
                onMouseLeave={() => onHoverState(null)}
                className={`px-3 py-1.5 text-xs rounded-lg transition-colors font-medium ${
                  isSelected
                    ? 'bg-[#02a2f0] text-white font-semibold shadow-xs'
                    : 'bg-[#f8fafc] border border-slate-200/80 text-slate-700 hover:bg-white hover:border-[#02a2f0] hover:text-[#02a2f0]'
                }`}
              >
                {state.name}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
