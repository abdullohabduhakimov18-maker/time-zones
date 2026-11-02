import React from 'react';
import { Globe, Type, Hash, Star, Clock, LayoutGrid, Rows } from 'lucide-react';

export interface SectionMeta {
  id: number;
  title: string;
  shortLabel: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
}

export const SECTIONS: SectionMeta[] = [
  {
    id: 1,
    title: 'Time Zone Colored Map',
    shortLabel: '1. Time Zones',
    icon: Globe,
    description: 'Map colored according to official US time zones with daylight saving & split-state rules'
  },
  {
    id: 2,
    title: 'Full State Names Map',
    shortLabel: '2. State Names',
    icon: Type,
    description: 'All 50 state names clearly displayed on each jurisdiction with clear leader lines'
  },
  {
    id: 3,
    title: 'State Abbreviations Map',
    shortLabel: '3. Postal Codes',
    icon: Hash,
    description: 'Two-letter USPS postal codes displayed on every state'
  },
  {
    id: 4,
    title: 'State Capitals Map',
    shortLabel: '4. State Capitals',
    icon: Star,
    description: 'Geographic capital city locations marked with pins and city names'
  },
  {
    id: 5,
    title: 'Live Current Time & Master Table',
    shortLabel: '5. Live Clocks & Table',
    icon: Clock,
    description: 'Live ticking local clocks for each state with comprehensive sortable data table'
  }
];

interface SectionNavProps {
  activeSection: number;
  onSelectSection: (id: number) => void;
  viewMode: 'tabs' | 'all';
  onToggleViewMode: (mode: 'tabs' | 'all') => void;
  is24Hour?: boolean;
  onToggleTimeFormat?: () => void;
  utcTimeStr?: string;
}

export const SectionNav: React.FC<SectionNavProps> = ({
  activeSection,
  onSelectSection,
  viewMode,
  onToggleViewMode,
  is24Hour = false,
  onToggleTimeFormat,
  utcTimeStr
}) => {
  return (
    <div className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-slate-200 py-3 px-4 sm:px-6 lg:px-8 shadow-xs">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Interactive segmented controls for the 5 sections */}
        <div className="flex items-center gap-1.5 p-1 bg-[#f8fafc] border border-slate-200 rounded-xl overflow-x-auto max-w-full">
          {SECTIONS.map((sec) => {
            const Icon = sec.icon;
            const isActive = activeSection === sec.id && viewMode === 'tabs';

            return (
              <button
                key={sec.id}
                onClick={() => {
                  onSelectSection(sec.id);
                  if (viewMode === 'all') onToggleViewMode('tabs');
                }}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-white text-[#02a2f0] shadow-xs border border-slate-200/80'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#02a2f0]' : 'text-slate-400'}`} />
                <span>{sec.shortLabel}</span>
              </button>
            );
          })}
        </div>

        {/* Right side controls: Live UTC + 12h/24h toggle + View Mode */}
        <div className="flex flex-wrap items-center gap-2.5 shrink-0 text-xs">
          {utcTimeStr && (
            <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[#f8fafc] border border-slate-200 text-xs text-slate-600 font-mono tabular-nums">
              <Clock className="w-3 h-3 text-[#02a2f0]" />
              <span>UTC: {utcTimeStr}</span>
            </div>
          )}

          {onToggleTimeFormat && (
            <button
              onClick={onToggleTimeFormat}
              className="px-2.5 py-1.5 text-xs font-semibold rounded-lg border border-slate-200 bg-white text-slate-700 hover:border-[#02a2f0] hover:text-[#02a2f0] transition-colors whitespace-nowrap shadow-2xs"
              title="Toggle 12h AM/PM vs 24h format"
            >
              {is24Hour ? '24h' : '12h AM/PM'}
            </button>
          )}

          <div className="inline-flex p-1 bg-[#f8fafc] border border-slate-200 rounded-lg">
            <button
              onClick={() => onToggleViewMode('tabs')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-md font-semibold text-xs transition-colors ${
                viewMode === 'tabs'
                  ? 'bg-white text-slate-900 shadow-2xs border border-slate-200/70'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <LayoutGrid className="w-3 h-3 text-[#02a2f0]" />
              <span>Tab View</span>
            </button>
            <button
              onClick={() => onToggleViewMode('all')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-md font-semibold text-xs transition-colors ${
                viewMode === 'all'
                  ? 'bg-white text-slate-900 shadow-2xs border border-slate-200/70'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Rows className="w-3 h-3 text-[#02a2f0]" />
              <span>All 5</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
