import React from 'react';
import { TruckTypeData, TRUCK_TYPES, TruckTypeId } from '../data/truckTypesData';
import {
  Weight,
  Maximize2,
  Box,
  Layers,
  Thermometer,
  DollarSign,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  ArrowRight,
  PackageCheck
} from 'lucide-react';

interface TruckSpecsPanelProps {
  activeTruck: TruckTypeData;
  onSelectTruck: (id: TruckTypeId) => void;
  isMetric: boolean;
  onToggleUnit: () => void;
}

export const TruckSpecsPanel: React.FC<TruckSpecsPanelProps> = ({
  activeTruck,
  onSelectTruck,
  isMetric,
  onToggleUnit
}) => {
  return (
    <div className="space-y-6">
      {/* 1. Horizontal Truck Type Switcher Cards */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Select Commercial Truck / Trailer Category (6 Types)
          </span>
          <button
            onClick={onToggleUnit}
            className="text-xs font-semibold px-2.5 py-1 rounded-lg border border-slate-200 bg-[#f8fafc] text-slate-700 hover:border-[#02a2f0] hover:text-[#02a2f0] transition-colors shadow-2xs"
          >
            Unit: {isMetric ? 'Metric (Kg / M)' : 'Imperial (Lbs / Ft)'}
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
          {TRUCK_TYPES.map((truck) => {
            const isSelected = activeTruck.id === truck.id;

            return (
              <button
                key={truck.id}
                onClick={() => onSelectTruck(truck.id)}
                className={`p-3 rounded-2xl border text-left transition-all relative overflow-hidden group bg-white ${
                  isSelected
                    ? 'border-[#02a2f0] ring-2 ring-[#02a2f0]/20 shadow-sm'
                    : 'border-slate-200 hover:border-slate-300 hover:shadow-2xs'
                }`}
              >
                {/* Accent Top Bar */}
                <div
                  className="h-1.5 w-full rounded-full mb-2.5 transition-colors"
                  style={{ backgroundColor: isSelected ? truck.color : '#e2e8f0' }}
                />

                <span className="text-xs font-bold text-slate-900 block truncate group-hover:text-[#02a2f0] transition-colors">
                  {truck.name.split(' ')[1] || truck.name.split(' ')[0]}
                </span>
                <span className="text-[10px] text-slate-500 block truncate mt-0.5">
                  {truck.category}
                </span>

                <div className="mt-2 text-[10px] font-mono font-semibold text-slate-600 tabular-nums">
                  {isMetric
                    ? `${(truck.maxCargoWeightKg / 1000).toFixed(1)}t cargo`
                    : `${(truck.maxCargoWeightLbs / 1000).toFixed(0)}k lbs`}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Selected Truck Overview Hero Banner */}
      <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-extrabold tracking-tight text-slate-900">
                {activeTruck.name}
              </h2>
              <span
                className="px-2.5 py-0.5 rounded-full text-xs font-bold text-white shadow-2xs"
                style={{ backgroundColor: activeTruck.color }}
              >
                {activeTruck.badge}
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium mt-1">
              Category: <strong className="text-slate-700">{activeTruck.category}</strong> · Rate Index: <strong className="text-[#02a2f0]">{activeTruck.ratePerMileIndex}</strong>
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 font-medium">CDL:</span>
            <span className="px-2.5 py-1 rounded-lg bg-[#f8fafc] border border-slate-200 text-xs font-bold text-slate-800">
              {activeTruck.cdlRequirement}
            </span>
          </div>
        </div>

        <p className="text-sm text-slate-600 leading-relaxed">
          {activeTruck.fullDescription}
        </p>

        {/* Key Operational Metrics Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 pt-2">
          {/* 1. Max Payload Weight */}
          <div className="p-3.5 rounded-xl bg-[#f8fafc] border border-slate-200">
            <span className="text-[11px] text-slate-500 font-medium flex items-center gap-1 mb-1">
              <Weight className="w-3.5 h-3.5 text-[#02a2f0]" /> Max Payload
            </span>
            <div className="text-base font-extrabold text-slate-900 tabular-nums">
              {isMetric
                ? `${activeTruck.maxCargoWeightKg.toLocaleString()} kg`
                : `${activeTruck.maxCargoWeightLbs.toLocaleString()} lbs`}
            </div>
            <span className="text-[10px] text-slate-400">Legal highway cargo</span>
          </div>

          {/* 2. Dimensions */}
          <div className="p-3.5 rounded-xl bg-[#f8fafc] border border-slate-200">
            <span className="text-[11px] text-slate-500 font-medium flex items-center gap-1 mb-1">
              <Maximize2 className="w-3.5 h-3.5 text-[#14516e]" /> Dimensions
            </span>
            <div className="text-xs font-extrabold text-slate-900 truncate">
              {activeTruck.length.split('(')[0]}
            </div>
            <span className="text-[10px] text-slate-400 truncate block">
              H: {activeTruck.height.split('/')[0]}
            </span>
          </div>

          {/* 3. Cubic Capacity */}
          <div className="p-3.5 rounded-xl bg-[#f8fafc] border border-slate-200">
            <span className="text-[11px] text-slate-500 font-medium flex items-center gap-1 mb-1">
              <Box className="w-3.5 h-3.5 text-amber-500" /> Cargo Volume
            </span>
            <div className="text-base font-extrabold text-slate-900 tabular-nums">
              {isMetric
                ? `${activeTruck.maxVolumeCuM} m³`
                : `${activeTruck.maxVolumeCuFt.toLocaleString()} cu ft`}
            </div>
            <span className="text-[10px] text-slate-400">Enclosed capacity</span>
          </div>

          {/* 4. Pallet Capacity */}
          <div className="p-3.5 rounded-xl bg-[#f8fafc] border border-slate-200">
            <span className="text-[11px] text-slate-500 font-medium flex items-center gap-1 mb-1">
              <Layers className="w-3.5 h-3.5 text-purple-500" /> Pallet Fit
            </span>
            <div className="text-xs font-extrabold text-slate-900 truncate">
              {activeTruck.palletCapacity.split('(')[0]}
            </div>
            <span className="text-[10px] text-slate-400">48"×40" standard pallets</span>
          </div>

          {/* 5. Temperature Regulation */}
          <div className="p-3.5 rounded-xl bg-[#f8fafc] border border-slate-200">
            <span className="text-[11px] text-slate-500 font-medium flex items-center gap-1 mb-1">
              <Thermometer className="w-3.5 h-3.5 text-cyan-500" /> Temp Control
            </span>
            <div className="text-xs font-extrabold text-slate-900 truncate">
              {activeTruck.temperatureControl.split('(')[0]}
            </div>
            <span className="text-[10px] text-slate-400">Climate regulation</span>
          </div>

          {/* 6. Market Rate Factor */}
          <div className="p-3.5 rounded-xl bg-[#f8fafc] border border-slate-200">
            <span className="text-[11px] text-slate-500 font-medium flex items-center gap-1 mb-1">
              <DollarSign className="w-3.5 h-3.5 text-emerald-600" /> Rate Factor
            </span>
            <div className="text-base font-extrabold text-emerald-600">
              {activeTruck.ratePerMileIndex.split(' ')[0]}
            </div>
            <span className="text-[10px] text-slate-400">Avg. Gross Revenue</span>
          </div>
        </div>
      </div>

      {/* 3. Operational Advantages (Pros) vs Challenges (Cons) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Pros */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            Key Operational Advantages
          </h3>
          <ul className="space-y-2 text-xs text-slate-600">
            {activeTruck.pros.map((pro, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-emerald-500 font-bold">✓</span>
                <span>{pro}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Cons */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-500" />
            Operational Challenges &amp; Limitations
          </h3>
          <ul className="space-y-2 text-xs text-slate-600">
            {activeTruck.cons.map((con, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-amber-500 font-bold">⚠</span>
                <span>{con}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* 4. Typical Commodities & Cargo Freight List */}
      <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
          <PackageCheck className="w-3.5 h-3.5 text-[#02a2f0]" />
          Common Freight Commodities Hauled
        </h3>
        <div className="flex flex-wrap gap-2">
          {activeTruck.typicalCommodities.map((item, idx) => (
            <span
              key={idx}
              className="px-3 py-1.5 rounded-xl bg-[#f8fafc] border border-slate-200 text-xs font-medium text-slate-700 shadow-2xs"
            >
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* 5. Dispatcher & Broker Practical Pro Tips */}
      <div className="p-5 rounded-2xl bg-blue-50/70 border border-blue-200 space-y-3">
        <h3 className="text-sm font-bold text-blue-900 flex items-center gap-2">
          <Lightbulb className="w-4 h-4 text-[#02a2f0]" />
          LogistMate Dispatcher Pro Tips
        </h3>
        <div className="space-y-2">
          {activeTruck.dispatcherTips.map((tip, idx) => (
            <div key={idx} className="p-3 rounded-xl bg-white/90 border border-blue-100 text-xs text-slate-700 leading-relaxed flex items-start gap-2">
              <span className="font-bold text-[#02a2f0] shrink-0">#{idx + 1}</span>
              <span>{tip}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 6. Mechanical Components Breakdown for 3D Inspection */}
      <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-[#14516e]" />
          Key Structural &amp; Mechanical Components
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {activeTruck.components.map((comp) => (
            <div
              key={comp.id}
              className="p-3.5 rounded-xl bg-[#f8fafc] border border-slate-200 space-y-1.5"
            >
              <h4 className="font-bold text-xs text-slate-900 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#02a2f0]" />
                {comp.name}
              </h4>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                {comp.description}
              </p>
              <div className="pt-1 text-[10px] text-slate-500 border-t border-slate-200/80">
                <strong className="text-slate-700">Logistics Function:</strong> {comp.logisticsImportance}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
