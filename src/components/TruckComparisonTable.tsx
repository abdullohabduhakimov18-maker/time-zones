import React, { useState } from 'react';
import { TRUCK_TYPES, TruckTypeId } from '../data/truckTypesData';
import { Download, Check, Sparkles, Filter, CheckCircle2 } from 'lucide-react';

interface TruckComparisonTableProps {
  selectedTruckId: TruckTypeId;
  onSelectTruck: (id: TruckTypeId) => void;
  isMetric: boolean;
}

export const TruckComparisonTable: React.FC<TruckComparisonTableProps> = ({
  selectedTruckId,
  onSelectTruck,
  isMetric
}) => {
  const [copied, setCopied] = useState(false);

  // Export comparison table as CSV
  const handleExportCSV = () => {
    const headers = [
      'Truck Type',
      'Category',
      'Max Payload (Lbs)',
      'Max Payload (Kg)',
      'Length',
      'Volume (Cu Ft)',
      'Pallets',
      'Loading Method',
      'Temp Control',
      'Rate Index',
      'CDL Requirement'
    ];

    const rows = TRUCK_TYPES.map(t => [
      `"${t.name}"`,
      `"${t.category}"`,
      t.maxCargoWeightLbs,
      t.maxCargoWeightKg,
      `"${t.length}"`,
      t.maxVolumeCuFt,
      `"${t.palletCapacity}"`,
      `"${t.loadingMethod}"`,
      `"${t.temperatureControl}"`,
      `"${t.ratePerMileIndex}"`,
      `"${t.cdlRequirement}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `logistmate_truck_comparison_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden space-y-4">
      {/* Table Header Controls */}
      <div className="p-5 border-b border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-[#f8fafc]">
        <div>
          <h3 className="text-base font-extrabold text-slate-900">
            Comprehensive Truck Types Comparison Matrix
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Click any column or row header to load and inspect that specific vehicle in the 3D viewer.
          </p>
        </div>

        <button
          onClick={handleExportCSV}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 bg-white hover:border-[#02a2f0] hover:text-[#02a2f0] text-xs font-semibold text-slate-700 transition-colors shadow-2xs"
        >
          <Download className="w-3.5 h-3.5 text-emerald-600" />
          <span>Export Comparison CSV</span>
        </button>
      </div>

      {/* Overflow Table Container */}
      <div className="overflow-x-auto pb-2">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-slate-200 bg-[#f8fafc]/80 text-slate-600 font-bold uppercase tracking-wider">
              <th className="p-3.5 min-w-[170px] sticky left-0 bg-[#f8fafc] z-10 border-r border-slate-200">
                Specification
              </th>
              {TRUCK_TYPES.map(t => {
                const isSelected = selectedTruckId === t.id;
                return (
                  <th
                    key={t.id}
                    onClick={() => onSelectTruck(t.id)}
                    className={`p-3.5 min-w-[190px] cursor-pointer transition-colors text-center border-r border-slate-200 last:border-r-0 ${
                      isSelected
                        ? 'bg-blue-50/90 text-[#02a2f0] border-t-2 border-t-[#02a2f0]'
                        : 'hover:bg-slate-100/60 text-slate-800'
                    }`}
                  >
                    <div className="font-extrabold text-xs">{t.name.split(' ')[1] || t.name}</div>
                    <span className="text-[10px] font-medium text-slate-500 block normal-case mt-0.5">
                      {t.category}
                    </span>
                    {isSelected && (
                      <span className="inline-block mt-1 text-[9px] font-bold px-1.5 py-0.5 rounded bg-[#02a2f0] text-white">
                        Active in 3D
                      </span>
                    )}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-medium">
            {/* 1. Legal Max Cargo Weight */}
            <tr className="hover:bg-[#f8fafc]/50">
              <td className="p-3.5 font-bold text-slate-800 sticky left-0 bg-white z-10 border-r border-slate-200">
                Max Legal Cargo Weight
              </td>
              {TRUCK_TYPES.map(t => (
                <td key={t.id} className="p-3.5 text-center font-mono font-bold text-slate-900 border-r border-slate-200 last:border-r-0 tabular-nums">
                  {isMetric
                    ? `${t.maxCargoWeightKg.toLocaleString()} kg`
                    : `${t.maxCargoWeightLbs.toLocaleString()} lbs`}
                </td>
              ))}
            </tr>

            {/* 2. Dimensions */}
            <tr className="hover:bg-[#f8fafc]/50">
              <td className="p-3.5 font-bold text-slate-800 sticky left-0 bg-white z-10 border-r border-slate-200">
                Trailer / Box Length
              </td>
              {TRUCK_TYPES.map(t => (
                <td key={t.id} className="p-3.5 text-center text-slate-700 border-r border-slate-200 last:border-r-0">
                  {t.length.split('(')[0]}
                </td>
              ))}
            </tr>

            {/* 3. Interior Height */}
            <tr className="hover:bg-[#f8fafc]/50">
              <td className="p-3.5 font-bold text-slate-800 sticky left-0 bg-white z-10 border-r border-slate-200">
                Max Freight Height
              </td>
              {TRUCK_TYPES.map(t => (
                <td key={t.id} className="p-3.5 text-center text-slate-700 border-r border-slate-200 last:border-r-0">
                  {t.height.includes('Interior') ? t.height.split('Interior')[0].split('/')[1] || t.height : t.height}
                </td>
              ))}
            </tr>

            {/* 4. Pallet Capacity */}
            <tr className="hover:bg-[#f8fafc]/50">
              <td className="p-3.5 font-bold text-slate-800 sticky left-0 bg-white z-10 border-r border-slate-200">
                Pallet Capacity (48"×40")
              </td>
              {TRUCK_TYPES.map(t => (
                <td key={t.id} className="p-3.5 text-center font-semibold text-slate-800 border-r border-slate-200 last:border-r-0">
                  {t.palletCapacity.split('(')[0]}
                </td>
              ))}
            </tr>

            {/* 5. Loading Method */}
            <tr className="hover:bg-[#f8fafc]/50">
              <td className="p-3.5 font-bold text-slate-800 sticky left-0 bg-white z-10 border-r border-slate-200">
                Primary Loading Method
              </td>
              {TRUCK_TYPES.map(t => (
                <td key={t.id} className="p-3.5 text-center text-slate-600 border-r border-slate-200 last:border-r-0 text-[11px] leading-tight">
                  {t.loadingMethod}
                </td>
              ))}
            </tr>

            {/* 6. Temperature Control */}
            <tr className="hover:bg-[#f8fafc]/50">
              <td className="p-3.5 font-bold text-slate-800 sticky left-0 bg-white z-10 border-r border-slate-200">
                Temperature Range
              </td>
              {TRUCK_TYPES.map(t => (
                <td key={t.id} className="p-3.5 text-center border-r border-slate-200 last:border-r-0">
                  {t.temperatureControl.includes('-20') ? (
                    <span className="font-bold text-[#02a2f0] bg-blue-50 px-2 py-0.5 rounded-md">
                      -20°F to +70°F
                    </span>
                  ) : (
                    <span className="text-slate-500">Ambient</span>
                  )}
                </td>
              ))}
            </tr>

            {/* 7. Rate Multiplier */}
            <tr className="hover:bg-[#f8fafc]/50">
              <td className="p-3.5 font-bold text-slate-800 sticky left-0 bg-white z-10 border-r border-slate-200">
                Market Rate Factor
              </td>
              {TRUCK_TYPES.map(t => (
                <td key={t.id} className="p-3.5 text-center font-bold text-emerald-600 border-r border-slate-200 last:border-r-0">
                  {t.ratePerMileIndex}
                </td>
              ))}
            </tr>

            {/* 8. CDL & Endorsement */}
            <tr className="hover:bg-[#f8fafc]/50">
              <td className="p-3.5 font-bold text-slate-800 sticky left-0 bg-white z-10 border-r border-slate-200">
                Driver License Required
              </td>
              {TRUCK_TYPES.map(t => (
                <td key={t.id} className="p-3.5 text-center text-slate-700 border-r border-slate-200 last:border-r-0 text-[11px]">
                  {t.cdlRequirement}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
