import React from 'react';
import { Scale, Layers, Thermometer, ShieldAlert, Check } from 'lucide-react';

export const LogisticsTipsGuide: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="border-b border-slate-200 pb-3">
        <h3 className="text-xl font-extrabold text-slate-900 tracking-tight">
          Essential Logistics &amp; Dispatcher Knowledge Rules
        </h3>
        <p className="text-xs text-slate-500 mt-1">
          Master the core federal regulations, weight distribution formulas, and loading standards taught at LogistMate.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Rule 1: Federal Bridge Gross Weight Formula */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-blue-50 text-[#02a2f0]">
              <Scale className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-extrabold text-sm text-slate-900">
                1. Federal Bridge Law &amp; 80,000 lbs Limit
              </h4>
              <span className="text-[11px] text-slate-400">Axle Weight Distribution</span>
            </div>
          </div>

          <p className="text-xs text-slate-600 leading-relaxed">
            In the United States, the federal maximum Gross Vehicle Weight (GVW) without an overweight permit is strictly <strong>80,000 lbs (36,287 kg)</strong>.
          </p>

          <div className="grid grid-cols-3 gap-2 text-center text-xs">
            <div className="p-2.5 rounded-xl bg-[#f8fafc] border border-slate-200">
              <span className="text-[10px] text-slate-400 font-semibold block uppercase">Steer Axle</span>
              <strong className="text-slate-900 text-sm">12,000 lbs</strong>
              <span className="text-[9px] text-slate-500 block mt-0.5">Single front axle</span>
            </div>
            <div className="p-2.5 rounded-xl bg-[#f8fafc] border border-slate-200">
              <span className="text-[10px] text-slate-400 font-semibold block uppercase">Drive Tandem</span>
              <strong className="text-slate-900 text-sm">34,000 lbs</strong>
              <span className="text-[9px] text-slate-500 block mt-0.5">Tractor rear duals</span>
            </div>
            <div className="p-2.5 rounded-xl bg-[#f8fafc] border border-slate-200">
              <span className="text-[10px] text-slate-400 font-semibold block uppercase">Trailer Tandem</span>
              <strong className="text-slate-900 text-sm">34,000 lbs</strong>
              <span className="text-[9px] text-slate-500 block mt-0.5">Trailer dual axles</span>
            </div>
          </div>

          <div className="text-[11px] text-slate-500 bg-amber-50 p-2.5 rounded-xl border border-amber-200/80 leading-relaxed">
            <strong className="text-amber-800">Pro Tip:</strong> Even if total weight is 78,000 lbs, if trailer tandems weigh 35,000 lbs, the driver will receive a heavy DOT fine at the weigh station. The tandem slider must be adjusted to redistribute weight forward.
          </div>
        </div>

        {/* Rule 2: Pallet Loading Architecture (Straight vs Pinwheel) */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-purple-50 text-purple-600">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-extrabold text-sm text-slate-900">
                2. 53' Trailer Pallet Loading (Straight vs Pinwheel)
              </h4>
              <span className="text-[11px] text-slate-400">Optimizing Cubic Utilization</span>
            </div>
          </div>

          <p className="text-xs text-slate-600 leading-relaxed">
            Standard GMA pallets measure <strong>48" × 40" (120 × 100 cm)</strong>. Depending on cargo overhang and weight, shippers use two primary patterns:
          </p>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="p-3 rounded-xl bg-[#f8fafc] border border-slate-200 space-y-1">
              <div className="font-bold text-slate-900">Straight / Turned Loading</div>
              <p className="text-[11px] text-slate-500">
                Two pallets loaded side-by-side across the 102" width (48" + 48" = 96"). Fits <strong>26 pallets</strong> in 13 rows.
              </p>
            </div>
            <div className="p-3 rounded-xl bg-[#f8fafc] border border-slate-200 space-y-1">
              <div className="font-bold text-slate-900">Pinwheel Loading</div>
              <p className="text-[11px] text-slate-500">
                One pallet turned lengthwise (40"), one turned widthwise (48") alternating. Fits up to <strong>28–30 pallets</strong>!
              </p>
            </div>
          </div>

          <div className="text-[11px] text-slate-500 bg-blue-50 p-2.5 rounded-xl border border-blue-200/80 leading-relaxed">
            <strong className="text-blue-900">Key Takeaway:</strong> Pinwheeling allows fitting 4 additional pallets of lightweight freight, drastically increasing shipper freight efficiency.
          </div>
        </div>

        {/* Rule 3: Reefer Pulping & Temperature Protocol */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-cyan-50 text-cyan-600">
              <Thermometer className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-extrabold text-sm text-slate-900">
                3. Reefer Pulping &amp; Pre-Cooling Procedures
              </h4>
              <span className="text-[11px] text-slate-400">Preventing Total Load Claims</span>
            </div>
          </div>

          <p className="text-xs text-slate-600 leading-relaxed">
            A reefer unit is engineered to <strong>maintain</strong> freight temperature, NOT cool down warm product.
          </p>

          <div className="space-y-1.5 text-xs text-slate-600">
            <div className="flex items-start gap-2">
              <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              <span><strong>Pre-Cool Trailer:</strong> Run unit for 1–2 hours until box reaches setpoint before docking.</span>
            </div>
            <div className="flex items-start gap-2">
              <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              <span><strong>Pulping:</strong> Insert calibrated probe thermometer into the center of product cartons and note readings on the BOL.</span>
            </div>
            <div className="flex items-start gap-2">
              <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              <span><strong>Continuous Mode:</strong> Ice cream and fresh meat must NEVER be run in Cycle-Sentry / Start-Stop mode.</span>
            </div>
          </div>
        </div>

        {/* Rule 4: Flatbed Cargo Securement & WLL */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-amber-50 text-amber-600">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-extrabold text-sm text-slate-900">
                4. Flatbed Securement &amp; Working Load Limit (WLL)
              </h4>
              <span className="text-[11px] text-slate-400">FMCSA Cargo Securement Standards</span>
            </div>
          </div>

          <p className="text-xs text-slate-600 leading-relaxed">
            Federal Motor Carrier Safety Administration (FMCSA) mandates that total tie-down Working Load Limit (WLL) must equal at least <strong>50% of the total cargo weight</strong>.
          </p>

          <div className="space-y-1.5 text-xs text-slate-600">
            <div className="flex items-start gap-2">
              <span className="font-bold text-slate-800">4" Winch Strap:</span>
              <span>Rated at 5,400 lbs WLL each. Hauling 40,000 lbs requires at least 4 straps minimum (20,000 lbs aggregate WLL).</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="font-bold text-slate-800">3/8" Grade 70 Chain:</span>
              <span>Rated at 6,600 lbs WLL each. Mandatory for heavy steel coils, tracked equipment, and logs.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
