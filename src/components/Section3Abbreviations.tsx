import React, { useState } from 'react';
import { StateData, US_STATES } from '../data/usStatesData';
import { FormattedTime } from '../hooks/useTimezones';
import { USMapContainer } from './USMapContainer';
import { Search, Hash, Copy, Check } from 'lucide-react';

interface Section3AbbreviationsProps {
  selectedState: StateData | null;
  onSelectState: (state: StateData) => void;
  hoveredState: StateData | null;
  onHoverState: (state: StateData | null) => void;
  formatStateTime: (state: StateData) => FormattedTime;
  is24Hour: boolean;
}

export const Section3Abbreviations: React.FC<Section3AbbreviationsProps> = ({
  selectedState,
  onSelectState,
  hoveredState,
  onHoverState,
  formatStateTime,
  is24Hour
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedAbbr, setCopiedAbbr] = useState<string | null>(null);

  const filteredStates = US_STATES.filter(
    s =>
      s.abbr.toLowerCase().includes(searchQuery.toLowerCase().trim()) ||
      s.name.toLowerCase().includes(searchQuery.toLowerCase().trim())
  );

  const handleCopyAbbr = (abbr: string, e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard?.writeText(abbr);
    setCopiedAbbr(abbr);
    setTimeout(() => setCopiedAbbr(null), 1500);
  };

  return (
    <section id="section-3" className="space-y-6">
      {/* Section Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-[#02a2f0] uppercase tracking-wider mb-1">
            <span>SECTION 3</span>
            <span>·</span>
            <span>POSTAL STANDARDS</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
            US Map with State Abbreviations
          </h2>
          <p className="mt-1 text-sm text-slate-600 max-w-2xl text-balance">
            Two-letter USPS standard postal abbreviations displayed prominently across all 50 states and the District of Columbia.
          </p>
        </div>

        {/* Search by Abbreviation or Name */}
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search postal code (e.g. TX, NY)..."
            className="w-full pl-9 pr-3 py-2.5 text-xs rounded-xl border border-slate-200 bg-white text-slate-800 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-[#02a2f0]/20 focus:border-[#02a2f0] transition-all shadow-2xs uppercase"
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
        mode="abbreviations"
        selectedState={selectedState}
        onSelectState={onSelectState}
        hoveredState={hoveredState}
        onHoverState={onHoverState}
        formatStateTime={formatStateTime}
        searchQuery={searchQuery}
        is24Hour={is24Hour}
      />

      {/* Postal Code Grid Directory */}
      <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
            <Hash className="w-3.5 h-3.5 text-[#02a2f0]" />
            USPS Two-Letter Postal Directory ({filteredStates.length})
          </h3>
          <span className="text-[11px] text-slate-400">Click to locate or copy</span>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-2.5 max-h-48 overflow-y-auto pr-1">
          {filteredStates.map(state => {
            const isSelected = selectedState?.id === state.id;
            const isCopied = copiedAbbr === state.abbr;

            return (
              <div
                key={state.id}
                onClick={() => onSelectState(state)}
                onMouseEnter={() => onHoverState(state)}
                onMouseLeave={() => onHoverState(null)}
                className={`p-2.5 rounded-xl border text-center cursor-pointer transition-all flex flex-col items-center justify-center ${
                  isSelected
                    ? 'border-[#02a2f0] bg-blue-50/80 text-blue-900 ring-2 ring-[#02a2f0]/20 shadow-xs'
                    : 'border-slate-200 bg-[#f8fafc] hover:bg-white hover:border-[#02a2f0] hover:shadow-2xs'
                }`}
              >
                <span className="font-mono font-bold text-sm text-slate-900">
                  {state.abbr}
                </span>
                <span className="text-[10px] text-slate-500 truncate max-w-full font-medium">
                  {state.name}
                </span>
                <button
                  onClick={(e) => handleCopyAbbr(state.abbr, e)}
                  className="mt-1 text-[9px] text-slate-400 hover:text-[#02a2f0] flex items-center gap-0.5"
                  title="Copy postal code"
                >
                  {isCopied ? <Check className="w-2.5 h-2.5 text-emerald-500" /> : <Copy className="w-2.5 h-2.5" />}
                  <span>{isCopied ? 'Done' : 'Copy'}</span>
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
