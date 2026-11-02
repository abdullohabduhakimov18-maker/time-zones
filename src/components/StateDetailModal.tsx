import React from 'react';
import { StateData, TIME_ZONE_DEFINITIONS } from '../data/usStatesData';
import { FormattedTime } from '../hooks/useTimezones';
import { X, MapPin, Globe, Users, Maximize2, AlertCircle, Copy, Check } from 'lucide-react';

interface StateDetailModalProps {
  state: StateData | null;
  onClose: () => void;
  formatStateTime: (state: StateData) => FormattedTime;
  is24Hour: boolean;
}

export const StateDetailModal: React.FC<StateDetailModalProps> = ({
  state,
  onClose,
  formatStateTime,
}) => {
  const [copied, setCopied] = React.useState(false);

  if (!state) return null;

  const tzDef = TIME_ZONE_DEFINITIONS[state.timeZone];
  const timeInfo = formatStateTime(state);

  const handleCopy = () => {
    const text = `${state.name} (${state.abbr}) - Capital: ${state.capital} | Time Zone: ${state.timeZone} (${timeInfo.tzAbbr}) | Current Time: ${timeInfo.timeWithSeconds}`;
    navigator.clipboard?.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs transition-opacity animate-in fade-in duration-150">
      <div
        className="relative w-full max-w-lg bg-white rounded-2xl border border-slate-200 shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar with LogistMate Gradient & Timezone Accent */}
        <div
          className="px-6 py-5 border-b border-slate-200 text-white relative bg-gradient-to-r from-[#14516e] to-[#02a2f0]"
        >
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-2xl font-extrabold tracking-tight">{state.name}</h2>
                <span className="px-2 py-0.5 rounded-md bg-white/20 text-xs font-mono font-bold tracking-wider">
                  {state.abbr}
                </span>
              </div>
              <p className="text-white/85 text-xs mt-0.5 italic">"{state.nickname}"</p>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-black/20 hover:bg-black/30 text-white transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Live Clock Banner inside Header */}
          <div className="mt-4 flex items-baseline justify-between bg-black/20 rounded-xl px-4 py-2.5 backdrop-blur-xs border border-white/10">
            <div>
              <span className="text-[11px] text-white/80 uppercase tracking-wider font-semibold block">
                Local Current Time ({timeInfo.tzAbbr})
              </span>
              <span className="text-2xl font-mono font-extrabold tracking-tight tabular-nums">
                {timeInfo.timeWithSeconds}
              </span>
            </div>
            <div className="text-right">
              <span className="text-xs font-medium text-white/95 block">{timeInfo.formattedDate}</span>
              <span className="text-[11px] text-white/80 font-mono">
                {tzDef.utcStandard} {state.observesDst ? '(DST: ' + tzDef.utcDaylight + ')' : '(No DST)'}
              </span>
            </div>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-5 text-sm bg-white">
          {/* Key Attributes Grid */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3.5 rounded-xl bg-[#f8fafc] border border-slate-200">
              <span className="text-xs text-slate-500 flex items-center gap-1.5 font-medium mb-1">
                <MapPin className="w-3.5 h-3.5 text-red-500" /> State Capital
              </span>
              <span className="text-base font-bold text-slate-900">
                {state.capital}
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-[#f8fafc] border border-slate-200">
              <span className="text-xs text-slate-500 flex items-center gap-1.5 font-medium mb-1">
                <Globe className="w-3.5 h-3.5 text-[#02a2f0]" /> Primary Time Zone
              </span>
              <span className="text-base font-bold text-slate-900">
                {state.timeZone} Time
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-[#f8fafc] border border-slate-200">
              <span className="text-xs text-slate-500 flex items-center gap-1.5 font-medium mb-1">
                <Users className="w-3.5 h-3.5 text-emerald-600" /> Population
              </span>
              <span className="text-base font-bold text-slate-900 tabular-nums">
                {state.population.toLocaleString()}
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-[#f8fafc] border border-slate-200">
              <span className="text-xs text-slate-500 flex items-center gap-1.5 font-medium mb-1">
                <Maximize2 className="w-3.5 h-3.5 text-[#f59e0b]" /> Land Area
              </span>
              <span className="text-base font-bold text-slate-900 tabular-nums">
                {state.areaSqMi.toLocaleString()} sq mi
              </span>
            </div>
          </div>

          {/* Time Zone Nuances & Split Notes */}
          <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-100">
            <h4 className="text-xs font-bold text-blue-900 flex items-center gap-1.5 mb-1.5">
              <AlertCircle className="w-4 h-4 text-[#02a2f0]" />
              Time Zone &amp; Daylight Saving Note
            </h4>
            <p className="text-xs text-slate-700 leading-relaxed">
              {state.splitNote}
            </p>
          </div>

          {/* Additional Jurisdictional Details */}
          <div className="text-xs text-slate-500 flex items-center justify-between border-t border-slate-200 pt-3">
            <span>Statehood: <strong className="text-slate-800">{state.establishedYear}</strong></span>
            <span>FIPS: <strong className="font-mono text-slate-800">{state.fips}</strong></span>
            <span>IANA: <strong className="font-mono text-slate-800">{state.iana}</strong></span>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 bg-[#f8fafc] border-t border-slate-200 flex items-center justify-between">
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg border border-slate-200 bg-white hover:border-[#02a2f0] hover:text-[#02a2f0] text-xs font-semibold text-slate-700 transition-colors shadow-2xs"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied' : 'Copy State Info'}</span>
          </button>

          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-[#14516e] hover:bg-[#0e3b52] text-white text-xs font-semibold transition-colors shadow-2xs"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
