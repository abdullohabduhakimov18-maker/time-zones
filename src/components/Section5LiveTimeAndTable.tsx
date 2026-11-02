import React, { useState, useMemo, useRef } from 'react';
import { StateData, US_STATES, TIME_ZONE_DEFINITIONS, TimeZoneCategory } from '../data/usStatesData';
import { FormattedTime } from '../hooks/useTimezones';
import { USMapContainer } from './USMapContainer';
import {
  Search,
  Clock,
  ArrowUpDown,
  Download,
  Filter,
  MapPin,
  Sun,
  Moon,
  Sunrise,
  Check,
  Copy
} from 'lucide-react';

interface Section5LiveTimeAndTableProps {
  selectedState: StateData | null;
  onSelectState: (state: StateData) => void;
  hoveredState: StateData | null;
  onHoverState: (state: StateData | null) => void;
  formatStateTime: (state: StateData) => FormattedTime;
  is24Hour: boolean;
  onToggleTimeFormat: () => void;
}

type SortField = 'name' | 'abbr' | 'capital' | 'time' | 'timeZone';
type SortDirection = 'asc' | 'desc';

export const Section5LiveTimeAndTable: React.FC<Section5LiveTimeAndTableProps> = ({
  selectedState,
  onSelectState,
  hoveredState,
  onHoverState,
  formatStateTime,
  is24Hour,
  onToggleTimeFormat
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterTimeZone, setFilterTimeZone] = useState<TimeZoneCategory | 'All'>('All');
  const [sortField, setSortField] = useState<SortField>('name');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
  const [csvCopied, setCsvCopied] = useState(false);

  const tableRef = useRef<HTMLDivElement>(null);

  // Handle column sort toggle
  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(prev => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  // Process states with time and sorting
  const processedStates = useMemo(() => {
    let result = US_STATES.map(s => {
      const formatted = formatStateTime(s);
      return {
        ...s,
        currentTime: formatted.timeWithSeconds,
        timeSortKey: `${formatted.hour24}:${formatted.minute}:${formatted.second}`,
        timeObj: formatted
      };
    });

    // Time zone filter
    if (filterTimeZone !== 'All') {
      result = result.filter(s => s.timeZone === filterTimeZone);
    }

    // Search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        s =>
          s.name.toLowerCase().includes(q) ||
          s.abbr.toLowerCase().includes(q) ||
          s.capital.toLowerCase().includes(q) ||
          s.timeZone.toLowerCase().includes(q) ||
          s.currentTime.toLowerCase().includes(q)
      );
    }

    // Sort
    result.sort((a, b) => {
      let comp = 0;
      if (sortField === 'name') {
        comp = a.name.localeCompare(b.name);
      } else if (sortField === 'abbr') {
        comp = a.abbr.localeCompare(b.abbr);
      } else if (sortField === 'capital') {
        comp = a.capital.localeCompare(b.capital);
      } else if (sortField === 'timeZone') {
        comp = a.timeZone.localeCompare(b.timeZone);
      } else if (sortField === 'time') {
        comp = a.timeSortKey.localeCompare(b.timeSortKey);
      }
      return sortDirection === 'asc' ? comp : -comp;
    });

    return result;
  }, [searchQuery, filterTimeZone, sortField, sortDirection, formatStateTime]);

  // Export Table as CSV
  const exportToCSV = () => {
    const headers = ['State Name', 'Abbreviation', 'Capital', 'Current Time', 'Time Zone', 'UTC Offset', 'DST Observed'];
    const rows = processedStates.map(s => [
      `"${s.name}"`,
      `"${s.abbr}"`,
      `"${s.capital}"`,
      `"${s.currentTime}"`,
      `"${s.timeZone}"`,
      `"${TIME_ZONE_DEFINITIONS[s.timeZone].utcStandard}"`,
      s.observesDst ? 'Yes' : 'No'
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `us_states_timezones_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Copy data to clipboard
  const copyTableData = () => {
    const text = processedStates
      .map(s => `${s.name} (${s.abbr}) - Capital: ${s.capital} | Time: ${s.currentTime} | Zone: ${s.timeZone}`)
      .join('\n');
    navigator.clipboard?.writeText(text);
    setCsvCopied(true);
    setTimeout(() => setCsvCopied(false), 2000);
  };

  const selectedStateTime = selectedState ? formatStateTime(selectedState) : null;

  return (
    <section id="section-5" className="space-y-6">
      {/* Section Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-[#02a2f0] uppercase tracking-wider mb-1">
            <span>SECTION 5</span>
            <span>·</span>
            <span>LIVE TIME &amp; MASTER TABLE</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
            Current Time Map &amp; Master State Directory
          </h2>
          <p className="mt-1 text-sm text-slate-600 max-w-2xl text-balance">
            Real-time interactive map showing live ticking local clocks across each state, coupled with a searchable, sortable table linking State Name, Abbreviation, Capital, Current Time, and Time Zone.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={onToggleTimeFormat}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold border border-slate-200 bg-white text-slate-700 hover:border-[#02a2f0] hover:text-[#02a2f0] transition-colors shadow-2xs"
          >
            <Clock className="w-3.5 h-3.5 text-[#02a2f0]" />
            <span>Format: {is24Hour ? '24-Hour' : '12-Hour'}</span>
          </button>

          <button
            onClick={exportToCSV}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold border border-slate-200 bg-white text-slate-700 hover:border-emerald-500 hover:text-emerald-600 transition-colors shadow-2xs"
            title="Download CSV file of all state times"
          >
            <Download className="w-3.5 h-3.5 text-emerald-600" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Selected State Live Spotlight Card (if a state is active) */}
      {selectedState && selectedStateTime && (
        <div className="p-5 rounded-2xl bg-gradient-to-r from-[#14516e] to-[#02a2f0] text-white shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-white/15 rounded-xl backdrop-blur-xs flex items-center justify-center">
              {selectedStateTime.dayPeriod === 'night' ? (
                <Moon className="w-7 h-7 text-white" />
              ) : selectedStateTime.dayPeriod === 'twilight' ? (
                <Sunrise className="w-7 h-7 text-amber-200" />
              ) : (
                <Sun className="w-7 h-7 text-amber-300" />
              )}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-extrabold">{selectedState.name}</h3>
                <span className="px-2 py-0.5 rounded bg-white/20 font-mono text-xs font-bold">
                  {selectedState.abbr}
                </span>
                <span className="text-xs text-white/90 font-medium">
                  Capital: <strong>{selectedState.capital}</strong>
                </span>
              </div>
              <p className="text-xs text-white/80 mt-0.5">
                {selectedState.timeZone} Time ({selectedStateTime.tzAbbr}) · {selectedState.observesDst ? 'Observes DST' : 'Year-Round Standard Time'}
              </p>
            </div>
          </div>

          <div className="flex items-baseline gap-3 bg-white/15 px-4 py-2 rounded-xl backdrop-blur-xs self-stretch md:self-auto justify-between md:justify-end">
            <span className="text-xs text-white/80 uppercase tracking-wider font-semibold">
              Live Time:
            </span>
            <span className="text-2xl sm:text-3xl font-mono font-extrabold tabular-nums tracking-tight">
              {selectedStateTime.timeWithSeconds}
            </span>
          </div>
        </div>
      )}

      {/* Interactive Map */}
      <USMapContainer
        mode="livetime"
        selectedState={selectedState}
        onSelectState={onSelectState}
        hoveredState={hoveredState}
        onHoverState={onHoverState}
        formatStateTime={formatStateTime}
        activeTimeZoneFilter={filterTimeZone}
        searchQuery={searchQuery}
        is24Hour={is24Hour}
      />

      {/* Master Data Table Section */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden" ref={tableRef}>
        {/* Table Filter & Search Controls */}
        <div className="p-4 sm:p-5 border-b border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 bg-[#f8fafc]">
          <div className="flex flex-wrap items-center gap-2.5 w-full sm:w-auto">
            {/* Search Input */}
            <div className="relative flex-1 sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search name, abbr, capital..."
                className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 bg-white text-slate-800 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-[#02a2f0]/20 focus:border-[#02a2f0] shadow-2xs"
              />
            </div>

            {/* Time Zone Dropdown Filter */}
            <select
              value={filterTimeZone}
              onChange={(e) => setFilterTimeZone(e.target.value as TimeZoneCategory | 'All')}
              className="px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white text-slate-800 font-medium focus:outline-hidden focus:ring-2 focus:ring-[#02a2f0]/20 focus:border-[#02a2f0] shadow-2xs"
            >
              <option value="All">All Time Zones (6)</option>
              <option value="Eastern">Eastern Time</option>
              <option value="Central">Central Time</option>
              <option value="Mountain">Mountain Time</option>
              <option value="Pacific">Pacific Time</option>
              <option value="Alaska">Alaska Time</option>
              <option value="Hawaii-Aleutian">Hawaii-Aleutian Time</option>
            </select>
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto justify-between sm:justify-end text-xs text-slate-500">
            <span>Showing <strong className="text-slate-800">{processedStates.length}</strong> of 51</span>
            <button
              onClick={copyTableData}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:border-[#02a2f0] hover:text-[#02a2f0] text-slate-700 font-semibold transition-colors shadow-2xs"
            >
              {csvCopied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{csvCopied ? 'Copied' : 'Copy All'}</span>
            </button>
          </div>
        </div>

        {/* The Master Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#f8fafc] border-b border-slate-200 text-slate-600 uppercase tracking-wider font-bold">
              <tr>
                <th
                  onClick={() => handleSort('name')}
                  className="px-4 py-3.5 cursor-pointer hover:text-[#02a2f0] select-none whitespace-nowrap"
                >
                  <div className="flex items-center gap-1.5">
                    <span>State Name</span>
                    <ArrowUpDown className="w-3 h-3 text-slate-400" />
                  </div>
                </th>
                <th
                  onClick={() => handleSort('abbr')}
                  className="px-4 py-3.5 cursor-pointer hover:text-[#02a2f0] select-none whitespace-nowrap"
                >
                  <div className="flex items-center gap-1.5">
                    <span>Abbreviation</span>
                    <ArrowUpDown className="w-3 h-3 text-slate-400" />
                  </div>
                </th>
                <th
                  onClick={() => handleSort('capital')}
                  className="px-4 py-3.5 cursor-pointer hover:text-[#02a2f0] select-none whitespace-nowrap"
                >
                  <div className="flex items-center gap-1.5">
                    <span>Capital</span>
                    <ArrowUpDown className="w-3 h-3 text-slate-400" />
                  </div>
                </th>
                <th
                  onClick={() => handleSort('time')}
                  className="px-4 py-3.5 cursor-pointer hover:text-[#02a2f0] select-none whitespace-nowrap"
                >
                  <div className="flex items-center gap-1.5 text-[#02a2f0] font-extrabold">
                    <span>Current Time</span>
                    <ArrowUpDown className="w-3 h-3 text-[#02a2f0]" />
                  </div>
                </th>
                <th
                  onClick={() => handleSort('timeZone')}
                  className="px-4 py-3.5 cursor-pointer hover:text-[#02a2f0] select-none whitespace-nowrap"
                >
                  <div className="flex items-center gap-1.5">
                    <span>Time Zone</span>
                    <ArrowUpDown className="w-3 h-3 text-slate-400" />
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {processedStates.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-4 py-8 text-center text-slate-500">
                    No states found matching "{searchQuery}".
                  </td>
                </tr>
              ) : (
                processedStates.map(state => {
                  const isSelected = selectedState?.id === state.id;
                  const isHovered = hoveredState?.id === state.id;
                  const tzDef = TIME_ZONE_DEFINITIONS[state.timeZone];

                  return (
                    <tr
                      key={state.id}
                      onClick={() => onSelectState(state)}
                      onMouseEnter={() => onHoverState(state)}
                      onMouseLeave={() => onHoverState(null)}
                      className={`cursor-pointer transition-colors ${
                        isSelected
                          ? 'bg-blue-50 text-blue-900 font-semibold'
                          : isHovered
                          ? 'bg-[#f8fafc] text-slate-900'
                          : 'hover:bg-[#f8fafc]/70 text-slate-700'
                      }`}
                    >
                      {/* 1. State Name */}
                      <td className="px-4 py-3.5 whitespace-nowrap font-bold text-slate-900">
                        <div className="flex items-center gap-2.5">
                          <span
                            className="w-2.5 h-2.5 rounded-full shrink-0 shadow-2xs"
                            style={{ backgroundColor: tzDef.colorLight }}
                          />
                          <span>{state.name}</span>
                        </div>
                      </td>

                      {/* 2. Abbreviation */}
                      <td className="px-4 py-3.5 whitespace-nowrap font-mono font-bold text-slate-800">
                        {state.abbr}
                      </td>

                      {/* 3. Capital */}
                      <td className="px-4 py-3.5 whitespace-nowrap">
                        <div className="flex items-center gap-1.5 text-slate-700">
                          <MapPin className="w-3.5 h-3.5 text-red-500 shrink-0" />
                          <span>{state.capital}</span>
                        </div>
                      </td>

                      {/* 4. Current Time (Live Ticking) */}
                      <td className="px-4 py-3.5 whitespace-nowrap font-mono font-bold tabular-nums">
                        <div className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-[#02a2f0] animate-pulse" />
                          <span className="text-[#02a2f0] font-extrabold text-[13px]">
                            {state.currentTime}
                          </span>
                        </div>
                      </td>

                      {/* 5. Time Zone */}
                      <td className="px-4 py-3.5 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-slate-800">
                            {state.timeZone}
                          </span>
                          <span className="text-[11px] text-slate-400 font-mono font-medium">
                            ({state.timeObj.tzAbbr})
                          </span>
                          {!state.observesDst && (
                            <span className="text-[10px] text-[#f59e0b] font-semibold bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200">
                              No DST
                            </span>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Table Footer */}
        <div className="px-4 py-3 bg-[#f8fafc] border-t border-slate-200 text-[11px] text-slate-500 flex items-center justify-between">
          <span>
            Clocks compute live from device system time synced with IANA Olson timezone databases.
          </span>
          <span className="hidden sm:inline">
            Click any row to pin and view detailed state intelligence.
          </span>
        </div>
      </div>
    </section>
  );
};
