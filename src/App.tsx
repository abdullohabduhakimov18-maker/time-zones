import React, { useState, useEffect, useCallback } from 'react';
import { TRUCK_TYPES, TruckTypeId } from './data/truckTypesData';
import { TruckOneByOneShowcase } from './components/TruckOneByOneShowcase';
import { TruckSpecsPanel } from './components/TruckSpecsPanel';
import { TruckComparisonTable } from './components/TruckComparisonTable';
import { TruckQuizChallenge } from './components/TruckQuizChallenge';
import { LogisticsTipsGuide } from './components/LogisticsTipsGuide';
import {
  Layers,
  Table,
  HelpCircle,
  BookOpen,
  ArrowUp,
  Box,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

export default function App() {
  const [activeTruckId, setActiveTruckId] = useState<TruckTypeId>('dry-van');
  const [activeTab, setActiveTab] = useState<'showcase' | 'specs' | 'comparison' | 'quiz' | 'rules'>('showcase');
  const [isMetric, setIsMetric] = useState<boolean>(false);

  // Ensure pure white theme
  useEffect(() => {
    document.documentElement.classList.remove('dark');
  }, []);

  // Pre-decode and cache all 6 truck images into browser memory immediately
  useEffect(() => {
    TRUCK_TYPES.forEach(t => {
      if (t.publicImagePath) {
        const img = new Image();
        img.src = t.publicImagePath;
      }
      if (t.realImagePath && t.realImagePath !== t.publicImagePath) {
        const img2 = new Image();
        img2.src = t.realImagePath;
      }
    });
  }, []);

  const activeTruck = TRUCK_TYPES.find(t => t.id === activeTruckId) || TRUCK_TYPES[0];
  const activeIndex = TRUCK_TYPES.findIndex(t => t.id === activeTruck.id);

  const handleSelectTruck = (id: TruckTypeId) => {
    setActiveTruckId(id);
  };

  const handleNextTruck = useCallback(() => {
    const nextIdx = (activeIndex + 1) % TRUCK_TYPES.length;
    setActiveTruckId(TRUCK_TYPES[nextIdx].id);
  }, [activeIndex]);

  const handlePrevTruck = useCallback(() => {
    const prevIdx = (activeIndex - 1 + TRUCK_TYPES.length) % TRUCK_TYPES.length;
    setActiveTruckId(TRUCK_TYPES[prevIdx].id);
  }, [activeIndex]);

  // Keyboard navigation for stepping through trucks one by one
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeTab === 'showcase') {
        if (e.key === 'ArrowRight') {
          handleNextTruck();
        } else if (e.key === 'ArrowLeft') {
          handlePrevTruck();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeTab, handleNextTruck, handlePrevTruck]);

  const handleSelectTruckForShowcase = (id: TruckTypeId) => {
    setActiveTruckId(id);
    setActiveTab('showcase');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div id="top" className="min-h-screen bg-white text-slate-800 flex flex-col selection:bg-[#02a2f0] selection:text-white">
      {/* Main Content Viewport */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6 bg-white">
        {/* Clean Top Navigation Bar (No header banner, No logo) */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pb-2 border-b border-slate-100">
          {/* Section Navigation Tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-[#f8fafc] border border-slate-200 rounded-xl overflow-x-auto max-w-full">
            <button
              onClick={() => setActiveTab('showcase')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                activeTab === 'showcase'
                  ? 'bg-white text-[#02a2f0] shadow-xs border border-slate-200/80 font-bold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
              }`}
            >
              <Box className="w-3.5 h-3.5 text-[#02a2f0]" />
              <span>Truck Types</span>
            </button>

            <button
              onClick={() => setActiveTab('specs')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                activeTab === 'specs'
                  ? 'bg-white text-[#02a2f0] shadow-xs border border-slate-200/80 font-bold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
              }`}
            >
              <Layers className="w-3.5 h-3.5 text-[#02a2f0]" />
              <span>Specifications</span>
            </button>

            <button
              onClick={() => setActiveTab('comparison')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                activeTab === 'comparison'
                  ? 'bg-white text-[#02a2f0] shadow-xs border border-slate-200/80 font-bold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
              }`}
            >
              <Table className="w-3.5 h-3.5 text-[#02a2f0]" />
              <span>Comparison</span>
            </button>

            <button
              onClick={() => setActiveTab('quiz')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                activeTab === 'quiz'
                  ? 'bg-white text-[#02a2f0] shadow-xs border border-slate-200/80 font-bold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
              }`}
            >
              <HelpCircle className="w-3.5 h-3.5 text-[#02a2f0]" />
              <span>Dispatch Challenge</span>
            </button>

            <button
              onClick={() => setActiveTab('rules')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                activeTab === 'rules'
                  ? 'bg-white text-[#02a2f0] shadow-xs border border-slate-200/80 font-bold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5 text-[#02a2f0]" />
              <span>Logistics Rules</span>
            </button>
          </div>

          {/* Unit Toggle (Imperial / Metric) */}
          <div className="flex items-center justify-end shrink-0">
            <button
              onClick={() => setIsMetric(!isMetric)}
              className="px-3 py-1.5 text-xs font-bold rounded-xl border border-slate-200 bg-[#f8fafc] hover:bg-white hover:border-[#02a2f0] text-slate-700 hover:text-[#02a2f0] transition-colors shadow-2xs"
            >
              {isMetric ? 'Metric (kg/m)' : 'US Imperial (lbs/ft)'}
            </button>
          </div>
        </div>

        {/* TAB 1: Real-Life One-by-One Truck Showcase with Differences */}
        {activeTab === 'showcase' && (
          <div className="space-y-6 animate-in fade-in duration-150">
            {/* The One-by-One Showcase */}
            <TruckOneByOneShowcase
              activeTruck={activeTruck}
              onSelectTruck={handleSelectTruck}
              isMetric={isMetric}
              onToggleUnit={() => setIsMetric(!isMetric)}
            />
          </div>
        )}

        {/* TAB 2: Detailed Specifications */}
        {activeTab === 'specs' && (
          <div className="space-y-6 animate-in fade-in duration-150">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-[#02a2f0] uppercase tracking-wider mb-1">
                <span>VEHICLE BLUEPRINT &amp; CAPACITIES</span>
              </div>
              <h2 className="text-2xl font-extrabold tracking-tight text-slate-900">
                Detailed Vehicle Specifications &amp; Operational Profiles
              </h2>
              <p className="mt-1 text-sm text-slate-600 max-w-3xl">
                Comprehensive data covering max legal weights, cubic volume, door clearance, pallet capacities, and dispatcher best practices.
              </p>
            </div>

            <TruckSpecsPanel
              activeTruck={activeTruck}
              onSelectTruck={handleSelectTruck}
              isMetric={isMetric}
              onToggleUnit={() => setIsMetric(!isMetric)}
            />
          </div>
        )}

        {/* TAB 3: Full Comparison Matrix */}
        {activeTab === 'comparison' && (
          <div className="space-y-6 animate-in fade-in duration-150">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-[#02a2f0] uppercase tracking-wider mb-1">
                <span>SIDE-BY-SIDE MATRIX</span>
              </div>
              <h2 className="text-2xl font-extrabold tracking-tight text-slate-900">
                Truck &amp; Trailer Types Comparison Matrix
              </h2>
              <p className="mt-1 text-sm text-slate-600 max-w-3xl">
                Compare dimensions, legal weight limits, cubic capacity, pallet count, rate multipliers, and CDL endorsements across all 6 vehicle types simultaneously.
              </p>
            </div>

            <TruckComparisonTable
              selectedTruckId={activeTruckId}
              onSelectTruck={handleSelectTruckForShowcase}
              isMetric={isMetric}
            />
          </div>
        )}

        {/* TAB 4: Dispatcher Scenario Challenge / Quiz */}
        {activeTab === 'quiz' && (
          <div className="space-y-6 animate-in fade-in duration-150">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-[#02a2f0] uppercase tracking-wider mb-1">
                <span>PRACTICAL LOGISTICS SIMULATION</span>
              </div>
              <h2 className="text-2xl font-extrabold tracking-tight text-slate-900">
                Freight Dispatcher Load Assignment Challenge
              </h2>
              <p className="mt-1 text-sm text-slate-600 max-w-3xl">
                Test your logistics knowledge by matching real-world freight commodities and operational constraints to the correct truck type.
              </p>
            </div>

            <TruckQuizChallenge
              onSelectTruckFor3D={handleSelectTruckForShowcase}
            />
          </div>
        )}

        {/* TAB 5: Logistics Rules & Regulations Guide */}
        {activeTab === 'rules' && (
          <div className="space-y-6 animate-in fade-in duration-150">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-[#02a2f0] uppercase tracking-wider mb-1">
                <span>REGULATORY STANDARDS</span>
              </div>
              <h2 className="text-2xl font-extrabold tracking-tight text-slate-900">
                Logistics &amp; Dispatcher Knowledge Rules
              </h2>
              <p className="mt-1 text-sm text-slate-600 max-w-3xl">
                Core regulatory requirements covering the Federal Bridge Law, pallet pattern geometry, reefer temperature pulping, and flatbed cargo securement.
              </p>
            </div>

            <LogisticsTipsGuide />
          </div>
        )}
      </main>

      {/* Footer in Clean LogistMate Style */}
      <footer className="mt-auto border-t border-slate-200 bg-[#f8fafc] py-6 px-4 sm:px-6 lg:px-8 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-700">
              Commercial Truck &amp; Trailer Types Educational Guide
            </span>
          </div>

          <div className="flex items-center gap-6">
            <span className="tabular-nums font-medium">6 Truck Categories</span>
            <span>·</span>
            <span className="font-medium">Real Fleet Photography</span>
            <span>·</span>
            <span className="font-medium">FMCSA Standards</span>
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
