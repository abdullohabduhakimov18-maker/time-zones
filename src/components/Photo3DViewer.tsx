import React, { useState, useRef, useEffect, useCallback } from 'react';
import { TruckTypeData } from '../data/truckTypesData';
import {
  Rotate3d,
  Maximize2,
  Minimize2,
  ZoomIn,
  ZoomOut,
  Play,
  Pause,
  Compass,
  Layers,
  Sparkles,
  Info,
  X,
  Eye,
  Camera,
  Crosshair,
  Sun
} from 'lucide-react';

export interface PhotoHotspot {
  id: string;
  name: string;
  x: number; // percentage 0-100
  y: number; // percentage 0-100
  tag: string;
  description: string;
  dotImportance: string;
}

// Calibrated real-life truck photo hotspot positions
const TRUCK_HOTSPOTS: Record<string, PhotoHotspot[]> = {
  'dry-van': [
    {
      id: 'dv-tractor',
      name: 'Class 8 Aerodynamic Sleeper Tractor',
      x: 18,
      y: 48,
      tag: 'Powertrain',
      description: 'Peterbilt 579 / Freightliner Cascadia cab with roof fairing and 72" sleeper berth.',
      dotImportance: 'Steer axle rated for 12,000 lbs; drives rated for 34,000 lbs under FMCSA.'
    },
    {
      id: 'dv-kingpin',
      name: 'Fifth Wheel & Kingpin Coupling',
      x: 32,
      y: 64,
      tag: 'Connection',
      description: 'Cast-steel sliding 5th wheel mechanism securing the trailer kingpin to the tractor chassis.',
      dotImportance: 'Adjustable slider allows transferring weight between tractor drive tandems and trailer.'
    },
    {
      id: 'dv-skirts',
      name: 'Aerodynamic Trailer Side Skirts',
      x: 54,
      y: 66,
      tag: 'Aero',
      description: 'SmartWay certified composite panels channeling airflow smoothly past the undercarriage.',
      dotImportance: 'Reduces wind drag by 4–7%, saving thousands of gallons in long-haul diesel fuel.'
    },
    {
      id: 'dv-tandems',
      name: 'Sliding Tandem Axle Bogie',
      x: 82,
      y: 70,
      tag: 'Bridge Law',
      description: 'Dual-axle assembly sliding on toothed rails to adjust weight distribution.',
      dotImportance: 'Federal Bridge Law: California and standard states require kingpin-to-rear-axle under 40–41 feet.'
    },
    {
      id: 'dv-doors',
      name: 'Rear Swing Doors & Bolt Seal Latch',
      x: 93,
      y: 40,
      tag: 'Security',
      description: 'Heavy composite rear swing doors with rubber weather seals and locking cam bars.',
      dotImportance: 'Serialized ISO 17712 bolt seals applied here. Broken seal results in immediate cargo rejection.'
    }
  ],
  'reefer': [
    {
      id: 'rf-cooling',
      name: 'Thermo King / Carrier Diesel Reefer Unit',
      x: 31,
      y: 32,
      tag: 'Refrigeration',
      description: 'Front-mounted independent 4-cylinder diesel engine driving an electric generator & scroll compressor.',
      dotImportance: 'Maintains -20°F for frozen goods up to +70°F for fresh produce with satellite telematics.'
    },
    {
      id: 'rf-tractor',
      name: 'Tractor Cab & Aerodynamic Fairings',
      x: 16,
      y: 48,
      tag: 'Sleeper Cab',
      description: 'High-roof Class 8 tractor optimized for non-stop cross-country team driver dispatches.',
      dotImportance: 'Provides uninterrupted power and DOT compliance for sensitive time-critical loads.'
    },
    {
      id: 'rf-fuel-tank',
      name: 'Undermount 50-Gallon Reefer Fuel Tank',
      x: 48,
      y: 68,
      tag: 'Fuel System',
      description: 'Dedicated diesel reservoir suspended under trailer chassis feeding the reefer motor.',
      dotImportance: 'Dispatch critical: Running out of fuel on the road immediately voids carrier insurance.'
    },
    {
      id: 'rf-insulated-body',
      name: 'Foam-Injected 3" Insulated Composite Walls',
      x: 64,
      y: 42,
      tag: 'Thermal Barrier',
      description: 'High-density closed-cell polyurethane insulation lining walls, ceiling, and extruded floor.',
      dotImportance: 'Limits heat gain to less than 0.35 BTU/hr/°F. Adds ~2,500 lbs tare weight vs dry van.'
    },
    {
      id: 'rf-t-duct',
      name: 'Sliding Tandems & T-Duct Floor Channel',
      x: 83,
      y: 68,
      tag: 'Airflow Floor',
      description: 'Extruded aluminum duct flooring enabling 360° chilled airflow underneath cargo pallets.',
      dotImportance: 'Prevents floor thermal bridging and eliminates warm spots in perishable grocery transit.'
    }
  ],
  'flatbed': [
    {
      id: 'fb-headache',
      name: 'DOT Steel Bulkhead / Headache Rack',
      x: 23,
      y: 42,
      tag: 'Cab Protection',
      description: 'Heavy gauge aluminum or steel barrier mounted behind the sleeper cab with chain racks.',
      dotImportance: 'FMCSA §393.106: Prevents forward cargo shift from puncturing the driver cab during panic stops.'
    },
    {
      id: 'fb-deck',
      name: 'Extruded Aluminum & Apitong Hardwood Deck',
      x: 52,
      y: 56,
      tag: 'Cargo Deck',
      description: 'Ultra-strong 48\' or 53\' platform floor supporting concentrated forklift and heavy machinery loads.',
      dotImportance: 'Deck height of 60" allows overhead crane loading or forklift loading from both sides simultaneously.'
    },
    {
      id: 'fb-winches',
      name: 'Sliding Winch Track & 4" Cargo Straps',
      x: 68,
      y: 64,
      tag: 'Tie-Downs',
      description: 'Full-length side rail with sliding ratcheting winches rated for 5,400 lbs Working Load Limit (WLL) each.',
      dotImportance: 'FMCSA rules require minimum aggregate tie-down WLL equal to 50% of cargo weight.'
    },
    {
      id: 'fb-spread',
      name: '10\' 1" Spread Axle Suspension',
      x: 84,
      y: 70,
      tag: 'Weight Rating',
      description: 'Wide-spread tandem suspension configured with axles spaced over 10 feet apart.',
      dotImportance: 'Allows 20,000 lbs per single axle (40,000 lbs total tandem) compared to 34,000 lbs for closed tandems.'
    }
  ],
  'step-deck': [
    {
      id: 'sd-upper-deck',
      name: 'Gooseneck Upper Deck (10\' – 11\')',
      x: 34,
      y: 50,
      tag: 'Upper Platform',
      description: 'Standard 60" deck height section resting over the tractor fifth wheel assembly.',
      dotImportance: 'Used for hauling lighter materials, toolboxes, outrigger beams, and tarp storage.'
    },
    {
      id: 'sd-lower-well',
      name: 'Low-Profile Main Deck (38\' – 42\')',
      x: 59,
      y: 60,
      tag: 'Low Center of Gravity',
      description: 'Main platform dropped to 36"–40" above the highway surface.',
      dotImportance: 'Provides an extra 20–24 inches of vertical clearance, accommodating cargo up to 10\' 2" tall without oversize permits.'
    },
    {
      id: 'sd-drings',
      name: 'Grade 70 Forged Steel D-Rings',
      x: 48,
      y: 62,
      tag: 'Heavy Lashing',
      description: 'Recessed heavy-duty transport chain anchor points rated for 6,600+ lbs WLL.',
      dotImportance: 'Secures tracked excavators, wheeled loaders, and industrial turbines directly to the trailer crossmembers.'
    },
    {
      id: 'sd-axles',
      name: 'Low-Profile Tandem Axle Group',
      x: 82,
      y: 68,
      tag: 'Undercarriage',
      description: 'Heavy-duty suspension with low-profile 255/70R22.5 commercial tires to maintain deck clearance.',
      dotImportance: 'Specially engineered brakes and air suspension to support concentrated wheeled heavy equipment.'
    }
  ],
  'box-truck': [
    {
      id: 'bx-cab',
      name: 'Class 6 Medium Duty Straight Cab',
      x: 24,
      y: 52,
      tag: 'Single Unit',
      description: 'Single continuous chassis (Freightliner M2 / International MV) with tight turning radius.',
      dotImportance: 'Rigid body: No fifth wheel or articulating pivot. Highly maneuverable in tight urban streets.'
    },
    {
      id: 'bx-cargo-box',
      name: '26-Foot Dry Freight Box & E-Track',
      x: 57,
      y: 42,
      tag: 'Cargo Body',
      description: 'FRP (Fiberglass Reinforced Plywood) or sheet aluminum enclosed box with interior logistical tracks.',
      dotImportance: 'Offers up to 1,700 cu ft capacity, holding up to 12 standard 48"×40" pallets.'
    },
    {
      id: 'bx-liftgate',
      name: 'Hydraulic Tuckunder Power Liftgate',
      x: 86,
      y: 72,
      tag: 'Liftgate',
      description: 'Heavy steel fold-out hydraulic platform rated for 2,500 to 3,500 lbs lifting capacity.',
      dotImportance: 'Crucial for ground-level retail, strip mall, and residential deliveries with no loading dock.'
    },
    {
      id: 'bx-side-door',
      name: 'Curbside Access Door',
      x: 66,
      y: 56,
      tag: 'Multi-Drop',
      description: 'Side entry door allowing rapid hand-truck offloading without opening the main rear roll-up door.',
      dotImportance: 'Speeds up inner-city delivery routes by up to 35% on multi-stop parcel and beverage deliveries.'
    }
  ],
  'tanker': [
    {
      id: 'tk-shell',
      name: 'Stainless Steel Cylindrical Tank Vessel',
      x: 55,
      y: 44,
      tag: 'Bulk Vessel',
      description: 'Food-grade 304/316 polished stainless steel or insulated aluminum pressure vessel.',
      dotImportance: 'Seamless sanitary internal finish. Designed to carry 5,000–9,000 gallons of bulk liquid freight.'
    },
    {
      id: 'tk-manholes',
      name: 'Top Sealed Inspection Manholes',
      x: 50,
      y: 28,
      tag: 'Vents & Fill',
      description: 'Hermetically clamped domed hatches fitted with two-way pressure/vacuum relief safety valves.',
      dotImportance: 'Used for top loading, CIP (Clean-in-Place) wash bay nozzle entry, and vapor relief.'
    },
    {
      id: 'tk-baffles',
      name: 'Internal Anti-Surge Baffles / Bulkheads',
      x: 65,
      y: 44,
      tag: 'Surge Control',
      description: 'Internal transverse perforated partitions dividing the vessel into compartments.',
      dotImportance: 'Dampens forward-and-backward liquid momentum during braking, preventing truck jackknifing.'
    },
    {
      id: 'tk-discharge',
      name: 'Bottom Emergency Discharge Valve & 4" Camlock',
      x: 75,
      y: 70,
      tag: 'Unloading',
      description: 'Internal foot valve with shear groove and exterior 3"–4" stainless piping manifold.',
      dotImportance: 'Internal safety shutoff prevents catastrophic chemical spill in the event of an underbody collision.'
    },
    {
      id: 'tk-tractor',
      name: 'Severe-Duty Tractor with Hydraulic Wet Kit',
      x: 20,
      y: 62,
      tag: 'Wet Kit',
      description: 'Tractor PTO (Power Take-Off) driving hydraulic fluid to power offloading product pumps or compressors.',
      dotImportance: 'Allows self-contained product discharge at remote job sites with no external power.'
    }
  ]
};

interface Photo3DViewerProps {
  activeTruck: TruckTypeData;
}

export const Photo3DViewer: React.FC<Photo3DViewerProps> = ({ activeTruck }) => {
  // 3D Angles
  const [rotX, setRotX] = useState<number>(4); // Pitch: -25 to +25 deg
  const [rotY, setRotY] = useState<number>(-12); // Yaw: -35 to +35 deg
  const [zoom, setZoom] = useState<number>(1.0); // 1.0 to 2.2x
  const [panX, setPanX] = useState<number>(0);
  const [panY, setPanY] = useState<number>(0);

  // States
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isTurntableAuto, setIsTurntableAuto] = useState<boolean>(false);
  const [turntableSpeed, setTurntableSpeed] = useState<number>(1);
  const [showHotspots, setShowHotspots] = useState<boolean>(true);
  const [selectedHotspot, setSelectedHotspot] = useState<PhotoHotspot | null>(null);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [activeAnglePreset, setActiveAnglePreset] = useState<string>('hero');
  const [studioLightIntensity, setStudioLightIntensity] = useState<number>(0.85);
  const [interactionMode, setInteractionMode] = useState<'orbit' | 'hover'>('orbit');

  const containerRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number | null>(null);
  const autoAngleRef = useRef<number>(0);

  const hotspots = TRUCK_HOTSPOTS[activeTruck.id] || [];

  // Reset angles when active truck changes
  useEffect(() => {
    setRotX(4);
    setRotY(-12);
    setZoom(1.0);
    setPanX(0);
    setPanY(0);
    setActiveAnglePreset('hero');
    setSelectedHotspot(null);
  }, [activeTruck.id]);

  // Turntable smooth requestAnimationFrame oscillation
  useEffect(() => {
    if (!isTurntableAuto) {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      return;
    }

    let lastTimestamp = performance.now();

    const loop = (time: number) => {
      const delta = (time - lastTimestamp) / 1000;
      lastTimestamp = time;

      autoAngleRef.current += delta * 0.45 * turntableSpeed;
      // Gentle sinusoidal yaw oscillation (-22° to +22°) and subtle pitch (-3° to +7°)
      const currentYaw = Math.sin(autoAngleRef.current) * 20;
      const currentPitch = 4 + Math.cos(autoAngleRef.current * 0.8) * 3;

      setRotY(currentYaw);
      setRotX(currentPitch);

      animationFrameRef.current = requestAnimationFrame(loop);
    };

    animationFrameRef.current = requestAnimationFrame(loop);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isTurntableAuto, turntableSpeed]);

  // Angle preset click handlers
  const setPresetAngle = (preset: 'hero' | 'side' | 'highway' | 'rear' | 'reset') => {
    setIsTurntableAuto(false);
    setActiveAnglePreset(preset);
    setSelectedHotspot(null);

    switch (preset) {
      case 'hero': // 3/4 Perspective
        setRotX(5);
        setRotY(-14);
        setZoom(1.0);
        setPanX(0);
        setPanY(0);
        break;
      case 'highway': // Low Road Elevation View
        setRotX(12);
        setRotY(15);
        setZoom(1.05);
        setPanX(-10);
        setPanY(15);
        break;
      case 'side': // Spec Orthogonal Profile
        setRotX(0);
        setRotY(0);
        setZoom(1.0);
        setPanX(0);
        setPanY(0);
        break;
      case 'rear': // Rear Cargo Alignment
        setRotX(3);
        setRotY(-24);
        setZoom(1.15);
        setPanX(25);
        setPanY(0);
        break;
      case 'reset':
        setRotX(0);
        setRotY(0);
        setZoom(1.0);
        setPanX(0);
        setPanY(0);
        break;
    }
  };

  // Mouse drag Orbit interactions
  const handleMouseDown = (e: React.MouseEvent) => {
    if (interactionMode !== 'orbit') return;
    setIsTurntableAuto(false);
    setIsDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;

    if (interactionMode === 'hover' && !isDragging) {
      const rect = containerRef.current.getBoundingClientRect();
      const normX = ((e.clientX - rect.left) / rect.width) * 2 - 1; // -1 to +1
      const normY = ((e.clientY - rect.top) / rect.height) * 2 - 1; // -1 to +1

      setRotY(normX * 22);
      setRotX(-normY * 12);
      return;
    }

    if (!isDragging) return;

    const deltaX = e.clientX - dragStart.x;
    const deltaY = e.clientY - dragStart.y;

    setRotY(prev => Math.max(-35, Math.min(35, prev + deltaX * 0.28)));
    setRotX(prev => Math.max(-18, Math.min(22, prev - deltaY * 0.22)));
    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Touch handlers for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      setIsTurntableAuto(false);
      setIsDragging(true);
      setDragStart({ x: e.touches[0].clientX, y: e.touches[0].clientY });
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || e.touches.length !== 1) return;
    const deltaX = e.touches[0].clientX - dragStart.x;
    const deltaY = e.touches[0].clientY - dragStart.y;

    setRotY(prev => Math.max(-35, Math.min(35, prev + deltaX * 0.35)));
    setRotX(prev => Math.max(-18, Math.min(22, prev - deltaY * 0.28)));
    setDragStart({ x: e.touches[0].clientX, y: e.touches[0].clientY });
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  // Wheel zoom
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const zoomDelta = e.deltaY > 0 ? -0.1 : 0.1;
    setZoom(prev => Math.max(0.85, Math.min(2.2, prev + zoomDelta)));
  };

  // Hotspot selection & focus
  const handleHotspotClick = (spot: PhotoHotspot, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedHotspot(spot);
    setIsTurntableAuto(false);
  };

  // Calculate dynamic specular light reflection position based on 3D angles
  const lightSheenX = 50 - rotY * 1.5;
  const lightSheenY = 50 + rotX * 2.0;

  // Turntable circular degrees normalized (0 to 360)
  const compassAngle = Math.round(((rotY + 360) % 360));

  return (
    <div
      ref={containerRef}
      className={`relative bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden select-none transition-all duration-300 ${
        isFullscreen ? 'fixed inset-0 z-50 rounded-none border-none p-4' : ''
      }`}
      onWheel={handleWheel}
    >
      {/* 1. Header Toolbar */}
      <div className="px-4 sm:px-6 py-3 border-b border-slate-200 bg-[#f8fafc] flex flex-wrap items-center justify-between gap-3">
        {/* Left: 3D Studio Mode indicator */}
        <div className="flex items-center gap-2.5">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-[#02a2f0]/10 border border-[#02a2f0]/30 text-[#02a2f0] text-xs font-bold tracking-tight">
            <Rotate3d className="w-4 h-4 animate-spin-slow" />
            <span>Interactive 3D Photography Studio</span>
          </span>

          <span className="text-xs text-slate-500 font-medium hidden sm:inline">
            Drag to orbit &amp; tilt real fleet photograph in 3D perspective
          </span>
        </div>

        {/* Right: Quick Studio Controls */}
        <div className="flex items-center gap-2">
          {/* Turntable Auto Spin Button */}
          <button
            onClick={() => setIsTurntableAuto(!isTurntableAuto)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-bold transition-all shadow-2xs ${
              isTurntableAuto
                ? 'bg-[#02a2f0] text-white border-[#02a2f0] ring-2 ring-[#02a2f0]/30'
                : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
            }`}
            title="Auto-rotate 3D Showroom Turntable"
          >
            {isTurntableAuto ? (
              <>
                <Pause className="w-3.5 h-3.5" />
                <span>Pause Spin</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5" />
                <span>Auto 3D Spin</span>
              </>
            )}
          </button>

          {/* Hotspots Toggle */}
          <button
            onClick={() => setShowHotspots(!showHotspots)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-bold transition-all ${
              showHotspots
                ? 'bg-blue-50 text-[#02a2f0] border-blue-200'
                : 'bg-white text-slate-500 border-slate-200 hover:text-slate-700'
            }`}
            title="Toggle 3D spatial vehicle part hotspots"
          >
            <Crosshair className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">3D Pins</span>
            <span className="text-[10px] font-mono px-1 rounded bg-white/80 border border-slate-200">
              {hotspots.length}
            </span>
          </button>

          {/* Interaction Mode: Drag vs Hover Gyro */}
          <button
            onClick={() => setInteractionMode(interactionMode === 'orbit' ? 'hover' : 'orbit')}
            className="hidden md:flex items-center gap-1 px-2.5 py-1.5 rounded-xl border border-slate-200 bg-white hover:border-slate-300 text-slate-600 text-xs font-medium"
            title="Switch between Click-and-Drag Orbit vs Mouse Follow Hover"
          >
            <Compass className="w-3.5 h-3.5 text-[#02a2f0]" />
            <span>{interactionMode === 'orbit' ? 'Drag Mode' : 'Hover Gyro'}</span>
          </button>

          {/* Fullscreen Toggle */}
          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-1.5 rounded-xl border border-slate-200 bg-white hover:border-slate-300 text-slate-600 hover:text-slate-900 transition-colors"
            title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen 3D Studio'}
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* 2. Main 3D Viewport Stage */}
      <div
        className={`relative w-full aspect-[16/9] ${
          isFullscreen ? 'h-[calc(100vh-140px)] aspect-auto' : 'max-h-[580px] min-h-[380px]'
        } bg-gradient-to-b from-[#f8fafc] via-white to-[#f1f5f9] flex items-center justify-center overflow-hidden cursor-grab active:cursor-grabbing`}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{
          perspective: '1300px',
          perspectiveOrigin: '50% 50%'
        }}
      >
        {/* Real-time 3D Studio Floor with Perspective Turntable Ring */}
        <div
          className="absolute inset-x-0 bottom-4 sm:bottom-8 h-40 pointer-events-none flex items-center justify-center opacity-60"
          style={{
            transform: `rotateX(74deg) translateZ(-40px) scale(1.4)`,
            transformStyle: 'preserve-3d'
          }}
        >
          {/* Circular Turntable Platform */}
          <div className="relative w-[540px] h-[540px] rounded-full border-2 border-dashed border-[#02a2f0]/30 bg-radial from-[#02a2f0]/5 to-transparent flex items-center justify-center shadow-lg">
            {/* Turntable Degree Marks */}
            <div className="absolute inset-0 rounded-full border border-slate-300/40" />
            <div className="w-3 h-3 rounded-full bg-[#02a2f0] ring-4 ring-[#02a2f0]/20" />
            {/* Rotating indicator needle */}
            <div
              className="absolute top-1/2 left-1/2 w-48 h-0.5 bg-gradient-to-r from-[#02a2f0] to-transparent origin-left transition-transform duration-75"
              style={{ transform: `rotate(${rotY * 2.2}deg)` }}
            />
          </div>
        </div>

        {/* Dynamic Specular Floor Shadow reacting to vehicle pitch & yaw */}
        <div
          className="absolute bottom-6 sm:bottom-10 pointer-events-none transition-transform duration-100 ease-out"
          style={{
            width: '74%',
            height: '32px',
            background: 'radial-gradient(ellipse at center, rgba(15,23,42,0.28) 0%, rgba(15,23,42,0.08) 55%, transparent 75%)',
            transform: `translateX(${panX - rotY * 1.5}px) translateY(${panY}px) scale(${zoom * (1 + rotX * 0.015)}, ${zoom * 0.9}) skewX(${-rotY * 0.6}deg)`,
            filter: 'blur(7px)'
          }}
        />

        {/* 3D TRANSFORMED PHOTOGRAPHY CONTAINER */}
        <div
          className="relative transition-transform duration-100 ease-out will-change-transform"
          style={{
            transform: `translateX(${panX}px) translateY(${panY}px) scale3d(${zoom}, ${zoom}, ${zoom}) rotateX(${rotX}deg) rotateY(${rotY}deg)`,
            transformStyle: 'preserve-3d',
            maxWidth: '92%',
            maxHeight: '90%'
          }}
        >
          {/* The High-Resolution Real Fleet Photograph */}
          <img
            src={activeTruck.realImagePath}
            alt={activeTruck.name}
            className="w-full h-auto max-h-[500px] object-contain block drop-shadow-xl pointer-events-none rounded-xl"
            referrerPolicy="no-referrer"
          />

          {/* Dynamic 3D Studio Specular Lighting Sheen reacting to rotation */}
          <div
            className="absolute inset-0 rounded-xl pointer-events-none transition-opacity duration-300 mix-blend-overlay"
            style={{
              opacity: studioLightIntensity,
              background: `radial-gradient(ellipse 65% 55% at ${lightSheenX}% ${lightSheenY}%, rgba(255, 255, 255, 0.45) 0%, rgba(255, 255, 255, 0.08) 45%, transparent 80%)`
            }}
          />

          {/* Secondary Rim-light edge reflection */}
          <div
            className="absolute inset-0 rounded-xl pointer-events-none"
            style={{
              boxShadow: `inset ${-rotY * 0.8}px ${rotX * 0.6}px 24px rgba(2, 162, 240, 0.15)`
            }}
          />

          {/* 3D Spatial Floating Hotspots (Elevated in 3D space via translateZ) */}
          {showHotspots &&
            hotspots.map((spot) => {
              const isSelected = selectedHotspot?.id === spot.id;

              return (
                <div
                  key={spot.id}
                  className="absolute cursor-pointer group/pin"
                  style={{
                    left: `${spot.x}%`,
                    top: `${spot.y}%`,
                    // Elevate 38px in true 3D space above the photo plane with counter-rotation for billboard effect!
                    transform: `translate3d(-50%, -50%, 38px) rotateY(${-rotY * 0.5}deg) rotateX(${-rotX * 0.5}deg)`,
                    transformStyle: 'preserve-3d'
                  }}
                  onClick={(e) => handleHotspotClick(spot, e)}
                >
                  {/* Radar ping ring */}
                  <span className="absolute -inset-2 rounded-full bg-[#02a2f0] opacity-40 animate-ping pointer-events-none" />

                  {/* Pin core */}
                  <div
                    className={`relative w-6 h-6 rounded-full flex items-center justify-center font-bold text-[11px] shadow-lg transition-transform duration-200 group-hover/pin:scale-125 ${
                      isSelected
                        ? 'bg-[#02a2f0] text-white ring-4 ring-[#02a2f0]/30 scale-110'
                        : 'bg-white text-slate-800 border-2 border-[#02a2f0] hover:bg-[#02a2f0] hover:text-white'
                    }`}
                  >
                    <Crosshair className="w-3.5 h-3.5" />
                  </div>

                  {/* Compact floating label */}
                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1.5 whitespace-nowrap px-2 py-0.5 rounded-md bg-slate-900/90 text-white text-[10px] font-bold tracking-tight shadow-md pointer-events-none opacity-0 group-hover/pin:opacity-100 transition-opacity">
                    {spot.name.split(' ')[0]} {spot.name.split(' ')[1] || ''}
                  </div>
                </div>
              );
            })}
        </div>

        {/* 3. Real-Time 3D Gyroscope & Spec Badge (Bottom Left) */}
        <div className="absolute bottom-4 left-4 z-20 flex flex-col gap-2 pointer-events-none">
          <div className="bg-white/95 backdrop-blur-md border border-slate-200/90 rounded-xl px-3.5 py-2 shadow-sm text-xs space-y-1">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#02a2f0] animate-pulse" />
              <span className="font-extrabold text-slate-900 tracking-tight">
                {activeTruck.name}
              </span>
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-blue-50 text-[#02a2f0] border border-blue-200">
                {activeTruck.modelCode}
              </span>
            </div>

            {/* Coordinates Readout */}
            <div className="flex items-center gap-3 text-[11px] font-mono text-slate-500">
              <span>
                Yaw: <strong className="text-slate-800">{rotY.toFixed(1)}°</strong>
              </span>
              <span>
                Pitch: <strong className="text-slate-800">{rotX.toFixed(1)}°</strong>
              </span>
              <span>
                Zoom: <strong className="text-slate-800">{zoom.toFixed(1)}x</strong>
              </span>
            </div>
          </div>
        </div>

        {/* 4. Interactive Zoom Slider & Loupe (Bottom Right) */}
        <div className="absolute bottom-4 right-4 z-20 flex items-center gap-1.5 bg-white/95 backdrop-blur-md border border-slate-200 rounded-xl p-1.5 shadow-sm">
          <button
            onClick={() => setZoom(prev => Math.max(0.85, prev - 0.2))}
            className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-600 transition-colors"
            title="Zoom Out"
          >
            <ZoomOut className="w-4 h-4" />
          </button>

          <span className="text-[11px] font-mono font-bold text-slate-700 w-9 text-center">
            {Math.round(zoom * 100)}%
          </span>

          <button
            onClick={() => setZoom(prev => Math.min(2.2, prev + 0.2))}
            className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-600 transition-colors"
            title="Zoom In"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
        </div>

        {/* 5. Selected Hotspot Inspector Modal (Overlay) */}
        {selectedHotspot && (
          <div className="absolute top-4 right-4 z-30 max-w-sm w-full bg-white/95 backdrop-blur-md border border-slate-200 rounded-2xl p-4 shadow-xl animate-in fade-in slide-in-from-right-4 duration-200">
            <div className="flex items-start justify-between gap-2 mb-2">
              <div className="flex items-center gap-1.5">
                <span className="px-2 py-0.5 rounded-md bg-[#02a2f0]/10 text-[#02a2f0] text-[10px] font-extrabold uppercase tracking-wider">
                  {selectedHotspot.tag}
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  ({selectedHotspot.x}%, {selectedHotspot.y}%)
                </span>
              </div>
              <button
                onClick={() => setSelectedHotspot(null)}
                className="p-1 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <h4 className="font-extrabold text-sm text-slate-900 mb-1.5 leading-snug">
              {selectedHotspot.name}
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed mb-2.5">
              {selectedHotspot.description}
            </p>

            <div className="p-2.5 rounded-xl bg-blue-50/70 border border-blue-200 text-[11px] text-slate-700 leading-normal space-y-1">
              <strong className="text-blue-900 block font-bold">
                FMCSA &amp; Dispatcher Rule:
              </strong>
              <span>{selectedHotspot.dotImportance}</span>
            </div>
          </div>
        )}
      </div>

      {/* 3. 3D Camera Angle Preset Bar & Lighting Adjustment */}
      <div className="px-4 sm:px-6 py-3 border-t border-slate-200 bg-white flex flex-wrap items-center justify-between gap-3">
        {/* Angle Presets */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mr-1 hidden sm:inline">
            3D Angle Presets:
          </span>

          <button
            onClick={() => setPresetAngle('hero')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              activeAnglePreset === 'hero' && !isTurntableAuto
                ? 'bg-[#02a2f0] text-white shadow-2xs'
                : 'bg-[#f8fafc] text-slate-600 border border-slate-200 hover:border-slate-300'
            }`}
          >
            🧭 3/4 Perspective
          </button>

          <button
            onClick={() => setPresetAngle('highway')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              activeAnglePreset === 'highway' && !isTurntableAuto
                ? 'bg-[#02a2f0] text-white shadow-2xs'
                : 'bg-[#f8fafc] text-slate-600 border border-slate-200 hover:border-slate-300'
            }`}
          >
            🚛 Highway Low-Angle
          </button>

          <button
            onClick={() => setPresetAngle('side')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              activeAnglePreset === 'side' && !isTurntableAuto
                ? 'bg-[#02a2f0] text-white shadow-2xs'
                : 'bg-[#f8fafc] text-slate-600 border border-slate-200 hover:border-slate-300'
            }`}
          >
            📐 Side Blueprint
          </button>

          <button
            onClick={() => setPresetAngle('rear')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              activeAnglePreset === 'rear' && !isTurntableAuto
                ? 'bg-[#02a2f0] text-white shadow-2xs'
                : 'bg-[#f8fafc] text-slate-600 border border-slate-200 hover:border-slate-300'
            }`}
          >
            📦 Cargo Tandem
          </button>

          <button
            onClick={() => setPresetAngle('reset')}
            className="px-2.5 py-1.5 rounded-xl text-xs font-medium text-slate-500 hover:text-slate-800 border border-slate-200 hover:border-slate-300 bg-white"
            title="Reset viewing angles to 0°"
          >
            Reset
          </button>
        </div>

        {/* Specular Studio Light Slider */}
        <div className="flex items-center gap-2 text-xs text-slate-600">
          <Sun className="w-3.5 h-3.5 text-amber-500" />
          <span className="hidden md:inline font-medium text-[11px]">Studio Lighting:</span>
          <input
            type="range"
            min="0.2"
            max="1.0"
            step="0.05"
            value={studioLightIntensity}
            onChange={(e) => setStudioLightIntensity(parseFloat(e.target.value))}
            className="w-20 accent-[#02a2f0] h-1.5 bg-slate-200 rounded-lg cursor-pointer"
            title="Adjust studio specular reflection intensity"
          />
        </div>
      </div>
    </div>
  );
};
