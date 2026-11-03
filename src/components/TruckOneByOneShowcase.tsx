import React, { useState } from 'react';
import { TruckTypeData, TRUCK_TYPES, TruckTypeId } from '../data/truckTypesData';
import { Real3DTruckViewer } from './Real3DTruckViewer';
import { TruckImage } from './TruckImage';
import {
  ChevronLeft,
  ChevronRight,
  Camera,
  Layers,
  Sparkles,
  ArrowRight,
  Maximize2,
  Info,
  Check,
  AlertCircle,
  HelpCircle,
  Weight,
  DollarSign
} from 'lucide-react';

interface TruckOneByOneShowcaseProps {
  activeTruck: TruckTypeData;
  onSelectTruck: (id: TruckTypeId) => void;
  isMetric: boolean;
  onToggleUnit: () => void;
}

export const TruckOneByOneShowcase: React.FC<TruckOneByOneShowcaseProps> = ({
  activeTruck,
  onSelectTruck,
  isMetric,
  onToggleUnit
}) => {
  const currentIndex = TRUCK_TYPES.findIndex(t => t.id === activeTruck.id);

  const handlePrev = () => {
    const prevIdx = (currentIndex - 1 + TRUCK_TYPES.length) % TRUCK_TYPES.length;
    onSelectTruck(TRUCK_TYPES[prevIdx].id);
  };

  const handleNext = () => {
    const nextIdx = (currentIndex + 1) % TRUCK_TYPES.length;
    onSelectTruck(TRUCK_TYPES[nextIdx].id);
  };

  return (
    <div className="space-y-6">
      {/* 1. Stepper & One-By-One Navigation Header */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Stepper info */}
          <div className="flex items-center gap-3">
            <span className="w-9 h-9 rounded-xl bg-blue-50 border border-blue-200 text-[#02a2f0] font-mono font-extrabold text-sm flex items-center justify-center shrink-0">
              0{activeTruck.index}
            </span>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Truck Type {activeTruck.index} of {TRUCK_TYPES.length}
                </span>
                <span
                  className="px-2 py-0.5 rounded-md text-[10px] font-bold text-white uppercase tracking-wider"
                  style={{ backgroundColor: activeTruck.color }}
                >
                  {activeTruck.badge.split('(')[0]}
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                {activeTruck.name}
              </h2>
            </div>
          </div>

          {/* Stepper Control Arrows */}
          <div className="flex items-center gap-2 self-end md:self-center">
            <button
              onClick={handlePrev}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-200 bg-white hover:border-[#02a2f0] hover:text-[#02a2f0] text-slate-700 font-bold text-xs transition-colors shadow-2xs"
              title="Previous truck type (Left Arrow)"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous</span>
            </button>

            <button
              onClick={handleNext}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#02a2f0] hover:bg-[#0091d9] text-white font-bold text-xs transition-colors shadow-xs"
              title="Next truck type (Right Arrow)"
            >
              <span>Next Truck</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Clickable Step Strip with Real Vehicle Thumbnails */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 pt-4 border-t border-slate-100 mt-4">
          {TRUCK_TYPES.map((t) => {
            const isSelected = t.id === activeTruck.id;

            return (
              <button
                key={t.id}
                onClick={() => onSelectTruck(t.id)}
                className={`p-2 rounded-xl border text-left transition-all flex items-center gap-2.5 overflow-hidden ${
                  isSelected
                    ? 'border-[#02a2f0] ring-2 ring-[#02a2f0]/20 bg-blue-50/50 shadow-xs'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <div className="w-10 h-7 rounded-lg overflow-hidden bg-slate-100 shrink-0 border border-slate-200">
                  <TruckImage
                    truck={t}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="truncate">
                  <span className="font-bold text-xs text-slate-900 block truncate">
                    {t.name.split(' ')[1] || t.name.split(' ')[0]}
                  </span>
                  <span className="text-[10px] text-slate-400 block truncate font-medium">
                    {t.category.split(' ')[0]}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Primary Showcase Stage: Real 3D Truck with Transparent Background */}
      <Real3DTruckViewer activeTruck={activeTruck} />

      {/* 3. In-Depth Differences Explained Section for THIS Truck */}
      <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-5">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#02a2f0] mb-1">
            <span>DIFFERENCES &amp; LOGISTICS ROLE EXPLAINED</span>
          </div>
          <h3 className="text-xl font-extrabold text-slate-900">
            Why the {activeTruck.name} Exists &amp; How It Differs
          </h3>
        </div>

        {/* Why it exists callout */}
        <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-200 leading-relaxed text-xs text-slate-700">
          <strong className="text-blue-900 block font-bold text-sm mb-1">
            Core Logistics Purpose:
          </strong>
          {activeTruck.whyItExists}
        </div>

        {/* Differences vs other 5 categories */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-1.5">
            <Info className="w-3.5 h-3.5 text-[#02a2f0]" />
            Key Differences vs Other Commercial Truck Types:
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {activeTruck.differencesVsOthers.map((diff, i) => (
              <div
                key={i}
                className="p-3.5 rounded-xl bg-[#f8fafc] border border-slate-200 space-y-1.5"
              >
                <span className="font-extrabold text-xs text-slate-900 block">
                  {diff.targetTruckName}
                </span>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {diff.keyDifference}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Specifications Matrix for THIS Truck */}
        <div className="pt-2 border-t border-slate-100">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
            Technical Blueprint &amp; Legal Constraints:
          </h4>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-[#f8fafc] border border-slate-200">
              <span className="text-[10px] text-slate-400 font-semibold block uppercase">Max Legal Payload</span>
              <strong className="text-sm font-extrabold text-slate-900 tabular-nums">
                {isMetric
                  ? `${activeTruck.maxCargoWeightKg.toLocaleString()} kg`
                  : `${activeTruck.maxCargoWeightLbs.toLocaleString()} lbs`}
              </strong>
            </div>

            <div className="p-3 rounded-xl bg-[#f8fafc] border border-slate-200">
              <span className="text-[10px] text-slate-400 font-semibold block uppercase">Exterior Dimensions</span>
              <strong className="text-xs font-extrabold text-slate-900 truncate block">
                {activeTruck.length.split('(')[0]} × {activeTruck.height.split('Exterior')[0].split('/')[0]}
              </strong>
            </div>

            <div className="p-3 rounded-xl bg-[#f8fafc] border border-slate-200">
              <span className="text-[10px] text-slate-400 font-semibold block uppercase">Pallet Fit (48"×40")</span>
              <strong className="text-xs font-extrabold text-slate-900 truncate block">
                {activeTruck.palletCapacity.split('(')[0]}
              </strong>
            </div>

            <div className="p-3 rounded-xl bg-[#f8fafc] border border-slate-200">
              <span className="text-[10px] text-slate-400 font-semibold block uppercase">Operating Rate Index</span>
              <strong className="text-sm font-extrabold text-emerald-600 tabular-nums">
                {activeTruck.ratePerMileIndex.split(' ')[0]}
              </strong>
            </div>
          </div>
        </div>

        {/* Commodities Hauled */}
        <div className="pt-2 border-t border-slate-100">
          <span className="text-[11px] font-bold text-slate-500 block mb-2">
            Typical Freight Loaded in this Truck:
          </span>
          <div className="flex flex-wrap gap-1.5">
            {activeTruck.typicalCommodities.map((item, i) => (
              <span
                key={i}
                className="px-2.5 py-1 rounded-lg bg-[#f8fafc] border border-slate-200 text-xs font-medium text-slate-700"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
