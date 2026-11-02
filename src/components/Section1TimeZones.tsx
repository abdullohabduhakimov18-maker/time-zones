import React, { useState } from 'react';
import { StateData, TIME_ZONE_DEFINITIONS, TimeZoneCategory } from '../data/usStatesData';
import { FormattedTime } from '../hooks/useTimezones';
import { USMapContainer } from './USMapContainer';
import { Filter, Layers, Sun } from 'lucide-react';

interface Section1TimeZonesProps {
  selectedState: StateData | null;
  onSelectState: (state: StateData) => void;
  hoveredState: StateData | null;
  onHoverState: (state: StateData | null) => void;
  formatStateTime: (state: StateData) => FormattedTime;
  getTimeZoneLiveTime: (tz: TimeZoneCategory) => FormattedTime;
  is24Hour: boolean;
}

export const Section1TimeZones: React.FC<Section1TimeZonesProps> = ({
  selectedState,
  onSelectState,
  hoveredState,
  onHoverState,
  formatStateTime,
  getTimeZoneLiveTime,
  is24Hour
}) => {
  const [activeTzFilter, setActiveTzFilter] = useState<TimeZoneCategory | 'All'>('All');
  const [highlightSplitStates, setHighlightSplitStates] = useState<boolean>(false);

  const timeZonesList: TimeZoneCategory[] = [
    'Eastern',
    'Central',
    'Mountain',
    'Pacific',
    'Alaska',
    'Hawaii-Aleutian'
  ];

  return (
    <section id="section-1" className="space-y-6">
      {/* Section Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-[#02a2f0] uppercase tracking-wider mb-1">
            <span>SECTION 1</span>
            <span>·</span>
            <span>US TIME ZONES</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
            Interactive US Time Zone Map
          </h2>
          <p className="mt-1 text-sm text-slate-600 max-w-2xl text-balance">
            Explore the 6 standard time zones across the United States. Hover or click any state to inspect local time, UTC offsets, and daylight saving time rules.
          </p>
        </div>

        {/* Action Toggles */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setHighlightSplitStates(!highlightSplitStates)}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold border transition-colors shadow-2xs ${
              highlightSplitStates
                ? 'bg-amber-50 border-amber-300 text-amber-800 ring-2 ring-amber-400/20'
                : 'bg-white border-slate-200 text-slate-700 hover:border-[#02a2f0] hover:text-[#02a2f0]'
            }`}
          >
            <Layers className="w-3.5 h-3.5 text-[#f59e0b]" />
            <span>Highlight Split States (10)</span>
          </button>
        </div>
      </div>

      {/* Time Zone Selector Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {timeZonesList.map(tzKey => {
          const tz = TIME_ZONE_DEFINITIONS[tzKey];
          const isSelected = activeTzFilter === tzKey;
          const liveTime = getTimeZoneLiveTime(tzKey);

          return (
            <button
              key={tzKey}
              onClick={() => setActiveTzFilter(isSelected ? 'All' : tzKey)}
              className={`p-3.5 rounded-xl border text-left transition-all relative overflow-hidden group bg-white ${
                isSelected
                  ? 'border-[#02a2f0] ring-2 ring-[#02a2f0]/20 shadow-md'
                  : 'border-slate-200 hover:border-slate-300 hover:shadow-xs'
              }`}
            >
              {/* Color Bar */}
              <div
                className="h-1.5 w-full rounded-full mb-2.5"
                style={{ backgroundColor: tz.colorLight }}
              />

              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900 truncate">
                  {tzKey}
                </span>
                <span className="text-[10px] font-mono font-semibold text-slate-400">
                  {tz.standardAbbr}
                </span>
              </div>

              {/* Live Time for this zone */}
              <div className="mt-1 font-mono font-bold text-sm text-slate-800 tabular-nums">
                {liveTime.timeOnly} <span className="text-[10px] font-sans text-slate-400 font-normal">{liveTime.period}</span>
              </div>

              <div className="mt-1.5 flex items-center justify-between text-[11px] text-slate-500">
                <span>{tz.statesCount} {tz.statesCount === 1 ? 'state' : 'states'}</span>
                <span className="font-mono text-[10px] text-slate-400 font-semibold">{tz.utcStandard}</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Filter Bar if filtered */}
      {activeTzFilter !== 'All' && (
        <div className="flex items-center justify-between px-4 py-2.5 bg-blue-50/80 border border-blue-200 rounded-xl text-xs text-blue-900">
          <span className="flex items-center gap-1.5">
            <Filter className="w-3.5 h-3.5 text-[#02a2f0]" />
            Showing states in <strong>{activeTzFilter} Time Zone</strong> ({TIME_ZONE_DEFINITIONS[activeTzFilter].statesCount} jurisdictions)
          </span>
          <button
            onClick={() => setActiveTzFilter('All')}
            className="text-xs font-bold text-[#02a2f0] hover:underline"
          >
            Show All Time Zones
          </button>
        </div>
      )}

      {/* Interactive Map */}
      <USMapContainer
        mode="timezones"
        selectedState={selectedState}
        onSelectState={onSelectState}
        hoveredState={hoveredState}
        onHoverState={onHoverState}
        formatStateTime={formatStateTime}
        activeTimeZoneFilter={activeTzFilter}
        highlightSplitStates={highlightSplitStates}
        is24Hour={is24Hour}
      />

      {/* Multi-Timezone & Daylight Saving Explanation Box */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <Layers className="w-4 h-4 text-[#f59e0b]" />
            States With Multiple Time Zones
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            10 states are officially or informally divided across two time zones:
          </p>
          <ul className="text-xs text-slate-600 space-y-1.5 list-disc list-inside">
            <li><strong>Florida:</strong> Panhandle (west of Apalachicola River) is Central; rest is Eastern.</li>
            <li><strong>Indiana:</strong> Mostly Eastern; 12 counties (NW near Chicago and SW) are Central.</li>
            <li><strong>Kentucky &amp; Tennessee:</strong> Divided between Eastern (east) and Central (west).</li>
            <li><strong>Texas:</strong> Mostly Central; El Paso and Hudspeth counties observe Mountain Time.</li>
            <li><strong>North &amp; South Dakota, Nebraska, Kansas:</strong> Eastern halves Central, western sections Mountain.</li>
            <li><strong>Idaho &amp; Oregon:</strong> Southern/eastern areas Mountain, northern panhandle and western areas Pacific.</li>
          </ul>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <Sun className="w-4 h-4 text-[#f59e0b]" />
            Daylight Saving Time (DST) Exceptions
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Under the Uniform Time Act, states may choose to exempt themselves from Daylight Saving Time:
          </p>
          <div className="space-y-2 text-xs text-slate-600">
            <div className="p-3 rounded-xl bg-[#f8fafc] border border-slate-200">
              <strong className="text-slate-900">Arizona (Mountain Standard Time):</strong>
              <span className="block mt-0.5 text-slate-600">Remains on UTC-7 year-round to avoid extending hot evening daylight hours. However, the <em>Navajo Nation</em> in northeastern Arizona DOES observe DST.</span>
            </div>
            <div className="p-3 rounded-xl bg-[#f8fafc] border border-slate-200">
              <strong className="text-slate-900">Hawaii (Hawaii-Aleutian Standard Time):</strong>
              <span className="block mt-0.5 text-slate-600">Remains on UTC-10 year-round due to its tropical latitude where sunrise and sunset times do not vary significantly between seasons.</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
