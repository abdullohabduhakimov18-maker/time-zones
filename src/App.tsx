import React, { useState, useEffect } from 'react';
import { StateData } from './data/usStatesData';
import { useLiveClock } from './hooks/useTimezones';
import { SectionNav } from './components/SectionNav';
import { Section1TimeZones } from './components/Section1TimeZones';
import { Section2StateNames } from './components/Section2StateNames';
import { Section3Abbreviations } from './components/Section3Abbreviations';
import { Section4Capitals } from './components/Section4Capitals';
import { Section5LiveTimeAndTable } from './components/Section5LiveTimeAndTable';
import { StateDetailModal } from './components/StateDetailModal';
import { Compass, ArrowUp } from 'lucide-react';

export default function App() {
  const [activeSection, setActiveSection] = useState<number>(1);
  const [viewMode, setViewMode] = useState<'tabs' | 'all'>('tabs');
  const [selectedState, setSelectedState] = useState<StateData | null>(null);
  const [hoveredState, setHoveredState] = useState<StateData | null>(null);
  const [is24Hour, setIs24Hour] = useState<boolean>(false);

  // Enforce pure white theme always
  useEffect(() => {
    document.documentElement.classList.remove('dark');
  }, []);

  const handleToggleTimeFormat = () => {
    setIs24Hour(prev => !prev);
  };

  // Real-time ticking clock hook
  const { now, formatStateTime, getTimeZoneLiveTime } = useLiveClock(is24Hour);

  // Formatted UTC string
  const utcTimeStr = now.toLocaleTimeString('en-US', {
    timeZone: 'UTC',
    hour: 'numeric',
    minute: '2-digit',
    second: '2-digit',
    hour12: !is24Hour
  });

  const handleSelectSection = (sectionId: number) => {
    setActiveSection(sectionId);
    if (viewMode === 'all') {
      const el = document.getElementById(`section-${sectionId}`);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div id="top" className="min-h-screen bg-white text-slate-800 flex flex-col selection:bg-[#02a2f0] selection:text-white">
      {/* Interactive Section Switcher (Header fully removed per request) */}
      <SectionNav
        activeSection={activeSection}
        onSelectSection={handleSelectSection}
        viewMode={viewMode}
        onToggleViewMode={setViewMode}
        is24Hour={is24Hour}
        onToggleTimeFormat={handleToggleTimeFormat}
        utcTimeStr={utcTimeStr}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12 bg-white">
        {/* Render either focused tab or all 5 sections */}
        {viewMode === 'tabs' ? (
          <div>
            {activeSection === 1 && (
              <Section1TimeZones
                selectedState={selectedState}
                onSelectState={setSelectedState}
                hoveredState={hoveredState}
                onHoverState={setHoveredState}
                formatStateTime={formatStateTime}
                getTimeZoneLiveTime={getTimeZoneLiveTime}
                is24Hour={is24Hour}
              />
            )}
            {activeSection === 2 && (
              <Section2StateNames
                selectedState={selectedState}
                onSelectState={setSelectedState}
                hoveredState={hoveredState}
                onHoverState={setHoveredState}
                formatStateTime={formatStateTime}
                is24Hour={is24Hour}
              />
            )}
            {activeSection === 3 && (
              <Section3Abbreviations
                selectedState={selectedState}
                onSelectState={setSelectedState}
                hoveredState={hoveredState}
                onHoverState={setHoveredState}
                formatStateTime={formatStateTime}
                is24Hour={is24Hour}
              />
            )}
            {activeSection === 4 && (
              <Section4Capitals
                selectedState={selectedState}
                onSelectState={setSelectedState}
                hoveredState={hoveredState}
                onHoverState={setHoveredState}
                formatStateTime={formatStateTime}
                is24Hour={is24Hour}
              />
            )}
            {activeSection === 5 && (
              <Section5LiveTimeAndTable
                selectedState={selectedState}
                onSelectState={setSelectedState}
                hoveredState={hoveredState}
                onHoverState={setHoveredState}
                formatStateTime={formatStateTime}
                is24Hour={is24Hour}
                onToggleTimeFormat={handleToggleTimeFormat}
              />
            )}
          </div>
        ) : (
          /* Continuous Scroll: All 5 Sections In Sequence */
          <div className="space-y-16">
            <Section1TimeZones
              selectedState={selectedState}
              onSelectState={setSelectedState}
              hoveredState={hoveredState}
              onHoverState={setHoveredState}
              formatStateTime={formatStateTime}
              getTimeZoneLiveTime={getTimeZoneLiveTime}
              is24Hour={is24Hour}
            />

            <hr className="border-slate-200" />

            <Section2StateNames
              selectedState={selectedState}
              onSelectState={setSelectedState}
              hoveredState={hoveredState}
              onHoverState={setHoveredState}
              formatStateTime={formatStateTime}
              is24Hour={is24Hour}
            />

            <hr className="border-slate-200" />

            <Section3Abbreviations
              selectedState={selectedState}
              onSelectState={setSelectedState}
              hoveredState={hoveredState}
              onHoverState={setHoveredState}
              formatStateTime={formatStateTime}
              is24Hour={is24Hour}
            />

            <hr className="border-slate-200" />

            <Section4Capitals
              selectedState={selectedState}
              onSelectState={setSelectedState}
              hoveredState={hoveredState}
              onHoverState={setHoveredState}
              formatStateTime={formatStateTime}
              is24Hour={is24Hour}
            />

            <hr className="border-slate-200" />

            <Section5LiveTimeAndTable
              selectedState={selectedState}
              onSelectState={setSelectedState}
              hoveredState={hoveredState}
              onHoverState={setHoveredState}
              formatStateTime={formatStateTime}
              is24Hour={is24Hour}
              onToggleTimeFormat={handleToggleTimeFormat}
            />
          </div>
        )}
      </main>

      {/* State Detail Inspection Modal */}
      <StateDetailModal
        state={selectedState}
        onClose={() => setSelectedState(null)}
        formatStateTime={formatStateTime}
        is24Hour={is24Hour}
      />

      {/* Footer in clean LogistMate style */}
      <footer className="mt-auto border-t border-slate-200 bg-[#f8fafc] py-6 px-4 sm:px-6 lg:px-8 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-md bg-[#14516e] flex items-center justify-center text-white">
              <Compass className="w-3 h-3" />
            </div>
            <span className="font-bold text-slate-700">
              US Time Zones &amp; Jurisdictions Explorer
            </span>
          </div>

          <div className="flex items-center gap-6">
            <span className="tabular-nums font-medium">50 States + DC</span>
            <span>·</span>
            <span className="font-medium">6 Official US Time Zones</span>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1 font-semibold text-[#02a2f0] hover:text-[#0091d9] transition-colors ml-2"
              title="Back to top"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span>Top</span>
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
