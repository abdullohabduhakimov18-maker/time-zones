import dryVanImg from '../assets/images/truck_dry_van_semi_1793655121883.jpg';
import reeferImg from '../assets/images/truck_reefer_trailer_1793655123013.jpg';
import flatbedImg from '../assets/images/truck_flatbed_trailer_1793655153681.jpg';
import stepDeckImg from '../assets/images/truck_step_deck_trailer_1793655124387.jpg';
import boxTruckImg from '../assets/images/truck_box_truck_delivery_1793655125295.jpg';
import tankerImg from '../assets/images/truck_liquid_tanker_1793655125274.jpg';

export type TruckTypeId = 'dry-van' | 'reefer' | 'flatbed' | 'step-deck' | 'box-truck' | 'tanker';

export interface TruckComponentDetail {
  id: string;
  name: string;
  description: string;
  logisticsImportance: string;
}

export interface DifferenceComparison {
  targetTruckName: string;
  keyDifference: string;
}

export interface Hotspot2D {
  id: string;
  name: string;
  x: number; // percentage from left, 0 - 100
  y: number; // percentage from top, 0 - 100
  tag: string;
  description: string;
  dotImportance: string;
}

export interface TruckTypeData {
  id: TruckTypeId;
  index: number;
  name: string;
  modelCode: string;
  category: string;
  badge: string;
  realImagePath: string;
  publicImagePath: string;
  webpImagePath?: string;
  thumbImagePath?: string;
  color: string;
  shortDescription: string;
  fullDescription: string;
  whyItExists: string;
  differencesVsOthers: DifferenceComparison[];
  photoHotspots: Hotspot2D[];
  length: string;
  width: string;
  height: string;
  deckHeight: string;
  maxCargoWeightLbs: number;
  maxCargoWeightKg: number;
  maxVolumeCuFt: number;
  maxVolumeCuM: number;
  palletCapacity: string;
  loadingMethod: string;
  temperatureControl: string;
  ratePerMileIndex: string;
  cdlRequirement: string;
  typicalCommodities: string[];
  pros: string[];
  cons: string[];
  dispatcherTips: string[];
  components: TruckComponentDetail[];
}

export const TRUCK_TYPES: TruckTypeData[] = [
  {
    id: 'dry-van',
    index: 1,
    name: '53\' Dry Van Trailer',
    modelCode: 'DV-5300',
    category: 'Enclosed General Freight',
    badge: 'Most Common (70% of US Freight)',
    realImagePath: dryVanImg,
    publicImagePath: '/images/trucks/dry-van.webp',
    webpImagePath: '/images/trucks/dry-van.webp',
    thumbImagePath: '/images/trucks/dry-van-thumb.webp',
    color: '#02a2f0',
    shortDescription: 'The universal workhorse of domestic logistics. Completely enclosed 53-foot trailer protecting non-perishable palletized consumer freight from weather, road debris, and theft.',
    fullDescription: 'Dry vans represent over two-thirds of all commercial trailers on American highways. Measuring 53 feet in length and 102 inches in width, they provide 4,000+ cubic feet of volume. Featuring thin, lightweight composite sidewalls, a translucent or aluminum roof, and wood flooring, they are loaded exclusively through rear double doors at dock-height facilities.',
    whyItExists: 'Designed to maximize interior cubic volume and payload weight for dry, weather-sensitive retail and industrial products while keeping empty trailer tare weight as low as possible (~13,500 lbs).',
    differencesVsOthers: [
      {
        targetTruckName: 'vs. Reefer',
        keyDifference: 'Dry vans lack insulation and refrigeration units. They weigh ~2,500 lbs less than reefers, allowing 2,500 lbs more cargo payload.'
      },
      {
        targetTruckName: 'vs. Flatbed',
        keyDifference: 'Dry vans protect freight in an enclosed weatherproof shell and load via rear docks, while flatbeds have no walls and load from sides or top by crane.'
      },
      {
        targetTruckName: 'vs. Box Truck',
        keyDifference: 'Dry vans are separate 53-foot trailers pulled by Class 8 tractors (45,000 lbs cargo), while box trucks are rigid 26-foot single units (10,000 lbs cargo).'
      }
    ],
    photoHotspots: [
      {
        id: 'dv-cab',
        name: 'Class 8 Aerodynamic Sleeper Cab',
        x: 18,
        y: 52,
        tag: 'Powertrain',
        description: 'Peterbilt aerodynamic highway sleeper cab equipped with a 15-liter diesel engine and 72" rest berth.',
        dotImportance: 'FMCSA: Steer axle weight is restricted to 12,000 lbs; drive tandems limited to 34,000 lbs.'
      },
      {
        id: 'dv-coupling',
        name: 'Sliding Fifth Wheel Coupler & Kingpin',
        x: 37,
        y: 59,
        tag: 'Coupling',
        description: 'Heavy cast-steel pneumatic sliding fifth wheel mechanism securing the trailer kingpin to the tractor.',
        dotImportance: 'Allows driver to slide weight forward or backward across tractor drive and steer axles for scale compliance.'
      },
      {
        id: 'dv-body',
        name: '53-Foot Lightweight Composite Trailer Shell',
        x: 64,
        y: 38,
        tag: 'Enclosed Cargo',
        description: 'High-cube composite sidewall trailer body engineered for maximum interior dry volume (4,045 cu ft).',
        dotImportance: 'Completely weather-sealed to shield non-perishable freight from rain, dust, and road spray.'
      },
      {
        id: 'dv-skirts',
        name: 'SmartWay Aerodynamic Trailer Skirts',
        x: 64,
        y: 58,
        tag: 'Fuel Efficiency',
        description: 'Composite airflow panels preventing high-speed highway wind turbulence under the trailer carriage.',
        dotImportance: 'Reduces diesel fuel consumption by 4% to 7%; mandated by California Air Resources Board (CARB).'
      },
      {
        id: 'dv-tandem',
        name: 'Sliding Tandem Axles (Bridge Law)',
        x: 83,
        y: 60,
        tag: 'Bridge Law',
        description: 'Dual-axle carriage with pneumatic locking pins that slides along a toothed steel rail beneath the floor.',
        dotImportance: 'Federal Bridge Law: Kingpin to center of rear axle cannot exceed 40–41 feet in standard states.'
      },
      {
        id: 'dv-doors',
        name: 'Rear Swing Doors & Security Bolt Seal Latches',
        x: 94,
        y: 46,
        tag: 'Cargo Security',
        description: 'Heavy composite dual swing doors with rubber compression gaskets and serialized bolt seal latches.',
        dotImportance: 'Tamper-evident seals are audited at every warehouse receiver; broken seals trigger entire load rejection.'
      }
    ],
    length: '53\' 0" (16.15 m)',
    width: '102" (2.59 m) Exterior / 98.5" (2.50 m) Interior',
    height: '13\' 6" (4.11 m) Exterior / 110" (2.79 m) Interior',
    deckHeight: '48" – 52" (Standard Loading Dock Height)',
    maxCargoWeightLbs: 45000,
    maxCargoWeightKg: 20412,
    maxVolumeCuFt: 4045,
    maxVolumeCuM: 114.5,
    palletCapacity: '26 Standard (48"×40") Pallets straight, up to 30 pinwheeled',
    loadingMethod: 'Dock-high loading only via rear swing or roll-up doors',
    temperatureControl: 'Ambient (No temperature regulation)',
    ratePerMileIndex: '1.0x (Standard Market Baseline)',
    cdlRequirement: 'Class A CDL (Standard Commercial License)',
    typicalCommodities: [
      'Packaged consumer goods (CPG)',
      'Dry foods, canned goods & grains',
      'Electronics, computers & appliances',
      'Textiles, apparel & footwear',
      'Automotive parts & manufacturing hardware'
    ],
    pros: [
      'Highest freight volume and minimal empty deadhead miles across all US lanes',
      'No specialized driver endorsements needed (fastest driver booking turnaround)',
      'Weatherproof enclosed cargo protection with security seals',
      'Fast dock bump turnaround without manual driver tarping'
    ],
    cons: [
      'Restricted to dock-height loading (cannot load from sides or overhead crane)',
      'Fixed 110" interior door height prevents loading tall oversized freight',
      'Lower profit margins per mile due to immense carrier competition',
      'Strict shipper appointment windows with risk of warehouse detention delays'
    ],
    dispatcherTips: [
      'Always verify tractor + trailer tare weight (~33,000 lbs) so gross stays strictly under 80,000 lbs.',
      'Check if shipper uses pinwheel loading to fit 28–30 pallets instead of standard 26.',
      'Always confirm whether receiver requires Driver Work (lumper fee) or is a Drop & Hook facility.'
    ],
    components: [
      {
        id: 'tractor',
        name: 'Class 8 Aerodynamic Sleeper Tractor',
        description: 'Peterbilt 579 / Freightliner Cascadia cab with aerodynamic fairings, 72" sleeper berth, and DD15 turbo diesel engine.',
        logisticsImportance: 'Hauls long-haul cross-country freight while providing compliant driver hours-of-service rest quarters.'
      },
      {
        id: 'fifth-wheel',
        name: 'Sliding Fifth Wheel Coupler',
        description: 'Cast-steel locking mechanism coupling the trailer kingpin to the tractor chassis.',
        logisticsImportance: 'Adjusts axle weight between the steer axle (12,000 lbs max) and drive tandem (34,000 lbs max).'
      },
      {
        id: 'side-skirts',
        name: 'Aerodynamic Trailer Side Skirts',
        description: 'Lightweight composite panels installed along the lower sides of the trailer between landing gear and rear tandems.',
        logisticsImportance: 'Reduces aerodynamic underbody turbulence at highway speeds, saving 4–7% in diesel fuel costs (SmartWay certified).'
      },
      {
        id: 'tandem-axles',
        name: 'Sliding Tandem Axles',
        description: 'Dual-axle bogie beneath the trailer that slides along a toothed steel rail with pneumatic locking pins.',
        logisticsImportance: 'Essential for complying with Federal Bridge Law. Most states require kingpin-to-rear-axle distance to be 40–41 feet maximum.'
      },
      {
        id: 'rear-doors',
        name: 'Double Swing Doors & Security Cam Locks',
        description: 'Heavy composite rear doors with rubber weather gaskets and serialized high-security bolt seal latches.',
        logisticsImportance: 'High-security seals are inspected here; broken seals indicate potential cargo tampering, theft, or rejection.'
      }
    ]
  },
  {
    id: 'reefer',
    index: 2,
    name: '53\' Refrigerated Trailer (Reefer)',
    modelCode: 'RF-5300',
    category: 'Temperature-Controlled Carrier',
    badge: 'Perishable & High-Value Cargo',
    realImagePath: reeferImg,
    publicImagePath: '/images/trucks/reefer.webp',
    webpImagePath: '/images/trucks/reefer.webp',
    thumbImagePath: '/images/trucks/reefer-thumb.webp',
    color: '#06b6d4',
    shortDescription: 'Insulated 53-foot trailer with an independent front-mounted diesel refrigeration unit maintaining precise climate from -20°F up to +70°F.',
    fullDescription: 'Reefer trailers feature 2 to 3 inches of high-density polyurethane foam insulation throughout the ceiling, sidewalls, and floor. An independent nose-mounted diesel refrigeration unit (Carrier Vector or Thermo King Precedent) pumps conditioned air through ceiling ducts and extruded aluminum T-duct flooring. Transports fresh produce, pharmaceuticals, meat, ice cream, and frozen poultry.',
    whyItExists: 'Essential for maintaining cold chain integrity across perishable foodstuffs, pharmaceuticals, and temperature-sensitive chemicals across extreme outdoor weather.',
    differencesVsOthers: [
      {
        targetTruckName: 'vs. Dry Van',
        keyDifference: 'Reefers have heavy insulated walls and a front diesel refrigeration engine. They weigh ~2,500 lbs more, cutting max cargo weight from 45k to 43.5k lbs.'
      },
      {
        targetTruckName: 'vs. Flatbed',
        keyDifference: 'Reefers provide hermetically sealed, temperature-regulated environments for food, whereas flatbeds are completely open to ambient weather.'
      },
      {
        targetTruckName: 'vs. Tanker',
        keyDifference: 'Reefers haul packaged goods on pallets in cases/boxes, whereas tankers transport bulk fluids without packaging directly in a vessel.'
      }
    ],
    photoHotspots: [
      {
        id: 'rf-cab',
        name: 'Freightliner Cascadia Aerodynamic Cab',
        x: 23,
        y: 55,
        tag: 'Highway Tractor',
        description: 'Modern Class 8 sleeper cab with active emergency braking and automated transmission for fuel efficiency.',
        dotImportance: 'Rated for 80,000 lbs gross combination weight across all axles combined.'
      },
      {
        id: 'rf-cooling',
        name: 'Carrier Vector Multi-Temp Refrigeration Unit',
        x: 60,
        y: 35,
        tag: 'Cooling Plant',
        description: 'Independent nose-mounted 4-cylinder diesel engine driving an electric generator and high-output compressor.',
        dotImportance: 'Maintains critical cargo setpoints from -20°F (deep freeze) to +70°F regardless of 110°F summer heat.'
      },
      {
        id: 'rf-tank',
        name: 'Undermount 50-Gallon Reefer Diesel Fuel Tank',
        x: 59,
        y: 69,
        tag: 'Dedicated Fuel',
        description: 'Dedicated auxiliary diesel tank suspended beneath trailer floor feeding only the refrigeration engine.',
        dotImportance: 'Critical: Running out of diesel en route voids carrier cargo insurance on perishable spoilage claims.'
      },
      {
        id: 'rf-door',
        name: 'Thermal Insulated Side Inspection Door',
        x: 74,
        y: 43,
        tag: 'Cold Chain Access',
        description: 'Heavily gasketed curbside side access door allowing spot pulp temperature checks without dumping cold air.',
        dotImportance: 'Allows receiver to inspect center-pallet probe temperatures without exposing whole trailer to heat.'
      },
      {
        id: 'rf-tandem',
        name: 'Sliding Tandems & T-Duct Air Circulation Floor',
        x: 89,
        y: 68,
        tag: 'Air Distribution',
        description: 'Heavy sliding dual-axle suspension combined with extruded aluminum floor channels providing continuous 360° airflow.',
        dotImportance: 'T-ducts allow chilled air to circulate beneath cargo pallets, preventing warm spots and spoilage.'
      }
    ],
    length: '53\' 0" (16.15 m)',
    width: '102" (2.59 m) Exterior / 97.5" (2.48 m) Interior (due to thick insulation)',
    height: '13\' 6" (4.11 m) Exterior / 106"–108" (2.74 m) Interior',
    deckHeight: '48" – 52" (Dock Height)',
    maxCargoWeightLbs: 43500,
    maxCargoWeightKg: 19731,
    maxVolumeCuFt: 3850,
    maxVolumeCuM: 109.0,
    palletCapacity: '24–26 Standard (48"×40") Pallets (air circulation buffer required)',
    loadingMethod: 'Dock-high loading via rear doors; cargo must not touch air chutes',
    temperatureControl: '-20°F to +70°F (-29°C to +21°C) Continuous or Start/Stop mode',
    ratePerMileIndex: '1.25x – 1.45x (High-Paying Premium)',
    cdlRequirement: 'Class A CDL (Cold-chain monitoring certified)',
    typicalCommodities: [
      'Fresh fruit, berries, leafy greens & produce',
      'Fresh & frozen beef, poultry, pork & seafood',
      'Ice cream & frozen novelty treats (-20°F strict)',
      'Pharmaceuticals, blood plasma, insulin & vaccines',
      'Fine chocolates, floral plants, wine & craft beer'
    ],
    pros: [
      'Substantially higher freight rates per mile than dry vans',
      'Dual capability: Can haul ordinary dry freight as backhauls when cleaned and sanitized',
      'Consistent year-round demand unaffected by recessions (groceries are essential)',
      'Advanced telematics allow real-time satellite temperature and fuel monitoring'
    ],
    cons: [
      'Heavier empty tare weight (cooling unit + 50-gallon fuel tank adds ~2,500 lbs), reducing payload capacity',
      'Significant additional operating costs for diesel fuel running the cooling unit 24/7',
      'Severe liability: Unit failure can spoil cargo resulting in $150,000+ insurance claims',
      'Long loading/unloading delays at grocery distribution centers with expensive lumper fees'
    ],
    dispatcherTips: [
      'Always pulp the freight (verify internal pulp temperature with a calibrated probe) BEFORE signing the Bill of Lading.',
      'Ensure the driver pre-cools the trailer for at least 1–2 hours before docking.',
      'Never run ice cream or fresh meat in Start/Stop (Cycle Sentry) mode; Continuous run is mandatory.'
    ],
    components: [
      {
        id: 'cooling-unit',
        name: 'Thermo King / Carrier Diesel Cooling Unit',
        description: 'Independent 4-cylinder diesel engine driving an electric generator, high-displacement compressor, and condenser fan array.',
        logisticsImportance: 'The critical lifeblood of the cold chain; maintains precise temperature whether outside temperature is 115°F in Arizona or -20°F in Minnesota.'
      },
      {
        id: 'belly-tank',
        name: 'Undermount 50-Gallon Reefer Fuel Tank',
        description: 'Dedicated diesel reservoir suspended under the trailer chassis exclusively feeding the cooling unit.',
        logisticsImportance: 'Running out of fuel on the highway immediately voids insurance claims and causes catastrophic load spoilage.'
      },
      {
        id: 't-duct-floor',
        name: 'Extruded Aluminum T-Duct Flooring',
        description: 'Corrugated aluminum floor channels that allow cold airflow to travel under the bottom of pallets from front to back.',
        logisticsImportance: 'Prevents hot spots by ensuring 360-degree perimeter air circulation around every pallet.'
      },
      {
        id: 'side-door',
        name: 'Optional Curbside Access Door',
        description: 'Heavy insulated side door with stainless steel hardware allowing multi-drop unloading without dumping all cold air.',
        logisticsImportance: 'Essential for LTL multi-stop delivery routes to preserve temperature in the main compartment.'
      }
    ]
  },
  {
    id: 'flatbed',
    index: 3,
    name: '48\' / 53\' Flatbed Trailer',
    modelCode: 'FB-4800',
    category: 'Open Deck Cargo Platform',
    badge: 'Heavy Industrial & Building Materials',
    realImagePath: flatbedImg,
    publicImagePath: '/images/trucks/flatbed.webp',
    webpImagePath: '/images/trucks/flatbed.webp',
    thumbImagePath: '/images/trucks/flatbed-thumb.webp',
    color: '#f59e0b',
    shortDescription: 'Open steel and hardwood platform trailer with no sides, walls, or roof. Built for fast crane or forklift loading of oversized, heavy, and long industrial cargo.',
    fullDescription: 'Flatbeds provide an unrestricted 48-foot or 53-foot flat wooden deck. With no walls, ceiling, or door frames, freight can be lowered onto the deck from above by overhead gantry cranes or loaded from both sides simultaneously by forklifts. Drivers must be physically fit and proficient in tarping and tie-down securement.',
    whyItExists: 'Allows transportation of long structural steel, lumber, machinery, and precast concrete that cannot physically fit through the rear doors of an enclosed van.',
    differencesVsOthers: [
      {
        targetTruckName: 'vs. Dry Van',
        keyDifference: 'Flatbeds have no walls or roof, allowing side forklift and overhead crane loading. They can carry 48,000 lbs (3,000 lbs more than a dry van).'
      },
      {
        targetTruckName: 'vs. Step Deck',
        keyDifference: 'Standard flatbeds have a uniform deck height of 58"–60" from front to back, whereas step decks drop down to 38"–40" for taller freight.'
      },
      {
        targetTruckName: 'vs. Box Truck',
        keyDifference: 'Flatbeds are heavy-duty Class 8 trailers carrying 48,000 lbs of raw industrial goods, while box trucks are urban delivery vans carrying palletized consumer goods.'
      }
    ],
    photoHotspots: [
      {
        id: 'fb-cab',
        name: 'Heavy-Duty Peterbilt Highway Tractor',
        x: 22,
        y: 55,
        tag: 'Tractor',
        description: 'Classic severe-duty Class 8 tractor featuring external air cleaners, chrome exhaust stacks, and heavy steer axle.',
        dotImportance: 'Equipped with heavy engine retarder (Jake Brake) essential for descending steep mountain grades with 48k lb steel loads.'
      },
      {
        id: 'fb-rack',
        name: 'DOT Steel Headache Rack / Bulkhead',
        x: 47,
        y: 34,
        tag: 'Driver Protection',
        description: 'Heavy reinforced steel cab guard mounted behind the tractor chassis with integrated chain racks and binder brackets.',
        dotImportance: 'FMCSA §393.106: Prevents forward cargo shift from penetrating the driver sleeper cab during sudden panic stops.'
      },
      {
        id: 'fb-cargo',
        name: 'Heavy Industrial Steel I-Beam Payload',
        x: 72,
        y: 40,
        tag: 'Raw Freight',
        description: 'Tiered stack of heavy structural steel I-beams loaded directly via overhead yard gantry crane.',
        dotImportance: 'Concentrated weight rating: Flatbeds are rated for up to 50,000 lbs in a 4-foot concentrated deck area.'
      },
      {
        id: 'fb-winches',
        name: '4" Sliding Winches & High-Tensile Straps',
        x: 74,
        y: 54,
        tag: 'Securement',
        description: 'Full-length side rail holding sliding ratcheting winches loaded with 5,400-lb WLL polyester webbing tie-downs.',
        dotImportance: 'FMCSA: Total Working Load Limit (WLL) of all tie-downs must equal at least 50% of the cargo weight.'
      },
      {
        id: 'fb-deck',
        name: '48\' Apitong Hardwood & Aluminum Deck',
        x: 84,
        y: 54,
        tag: 'Open Platform',
        description: 'Ultra-tough tropical Apitong hardwood flooring interleaved with aluminum beams to resist gouging from steel coils.',
        dotImportance: 'Provides nail-down blocking and dunnage anchoring surfaces required for irregular cargo loads.'
      },
      {
        id: 'fb-axles',
        name: 'Spread Axle Air Ride Suspension',
        x: 91,
        y: 63,
        tag: 'Weight Distribution',
        description: '10\' 1" spread between dual trailer axles allowing higher allowable weight per axle under Federal Bridge Formula.',
        dotImportance: 'Spread axle trailers can legally scale 20,000 lbs per axle (40,000 lbs total) instead of standard 34,000 lbs closed tandem.'
      }
    ],
    length: '48\' 0" (14.63 m) or 53\' 0" (16.15 m)',
    width: '102" (2.59 m)',
    height: 'Deck Height: 58"–60" (1.52 m) / Max Legal Cargo Height: 8\' 6" (2.59 m)',
    deckHeight: '58" – 60" (Above ground)',
    maxCargoWeightLbs: 48000,
    maxCargoWeightKg: 21772,
    maxVolumeCuFt: 3450,
    maxVolumeCuM: 97.7,
    palletCapacity: 'Up to 24–26 Pallets (requires tarps & straps for weather protection)',
    loadingMethod: 'Dual-side forklift loading or overhead gantry crane loading',
    temperatureControl: 'Ambient Open Air (Tarps protect from road grime and rain)',
    ratePerMileIndex: '1.20x – 1.35x (Higher pay for manual driver labor)',
    cdlRequirement: 'Class A CDL + Cargo Securement & Tarping Proficiency',
    typicalCommodities: [
      'Structural steel I-beams, steel plates & coils',
      'Dimensional lumber, drywall, plywood & roofing materials',
      'Heavy industrial machinery, tooling & compressors',
      'Precast concrete beams, blocks & bridge segments',
      'Large oilfield piping, wind turbine components & trusses'
    ],
    pros: [
      'Rapid loading & unloading from both sides simultaneously (no dock waiting)',
      'Carries irregular, extra-long, and awkward shapes without clearance restrictions',
      'Higher payload capacity (~48,000 lbs) due to absence of heavy wall and roof structures',
      'Strong, reliable demand from construction, steel, oil, and manufacturing sectors'
    ],
    cons: [
      'Physically demanding: Drivers must climb onto loads and throw 80-lb tarps in wind, snow, and rain',
      'Severe safety liability: Improperly secured cargo can shift or fly off on highways with catastrophic results',
      'Cargo is exposed to road grime, salt, and moisture if tarping is imperfect',
      'Very limited backhaul opportunities for dry boxed consumer goods'
    ],
    dispatcherTips: [
      'Always clarify whether the shipper requires 4-foot, 6-foot, or 8-foot drop tarps.',
      'Steel coils require coil racks, beveled wooden timbers, friction rubber pads, and Transport Grade 70 chains.',
      'Check Working Load Limit (WLL): The aggregate WLL of all tie-downs must equal at least 50% of the cargo weight.'
    ],
    components: [
      {
        id: 'headache-rack',
        name: 'DOT Cab Guard (Headache Rack)',
        description: 'Heavy welded aluminum or steel bulkhead with chain racks mounted directly behind the tractor cab.',
        logisticsImportance: 'Federal safety requirement that protects the truck driver from shifting cargo (such as steel pipes or beams) during sudden emergency braking.'
      },
      {
        id: 'apitong-deck',
        name: 'Apitong Hardwood Decking',
        description: 'Dense tropical hardwood planks capable of supporting extreme point loads from steel coils and crawler tracks.',
        logisticsImportance: 'High friction surface that allows drivers to nail down wooden blocking, wedges, and chocks to lock cargo in place.'
      },
      {
        id: 'winch-track',
        name: 'Sliding Winch Track & 4" Polyester Straps',
        description: 'Heavy steel side rail along both edges equipped with sliding ratchet winches and 5,400-lb WLL straps.',
        logisticsImportance: 'Allows drivers to position tie-down points exactly where cargo requires securement along the full 48-foot length.'
      },
      {
        id: 'spread-axles',
        name: '10\' 1" Spread Tandem Axles',
        description: 'Fixed dual axles spaced 121 inches apart beneath the rear of the trailer.',
        logisticsImportance: 'Allows the trailer axles to carry 20,000 lbs per single axle (40,000 lbs total) in many states, compared to 34,000 lbs for closed tandems.'
      }
    ]
  },
  {
    id: 'step-deck',
    index: 4,
    name: '53\' Step Deck (Drop Deck) Trailer',
    modelCode: 'SD-5300',
    category: 'Drop-Frame Machinery Hauler',
    badge: 'Tall Freight & Equipment Specialist',
    realImagePath: stepDeckImg,
    publicImagePath: '/images/trucks/step-deck.webp',
    webpImagePath: '/images/trucks/step-deck.webp',
    thumbImagePath: '/images/trucks/step-deck-thumb.webp',
    color: '#8b5cf6',
    shortDescription: 'Drop-frame trailer with an upper deck and a dropped lower deck riding only 38"–40" above the ground, allowing tall cargo up to 10\' 6" to clear highway bridges legally.',
    fullDescription: 'Step deck trailers feature a structural gooseneck that drops the main cargo deck down immediately after passing the tractor fifth wheel. While a standard flatbed deck sits 60 inches off the road, a step deck\'s lower well sits only 38 to 42 inches above the asphalt. This 18-to-20-inch height advantage allows tall industrial equipment to travel without expensive over-height permits.',
    whyItExists: 'Eliminates the need for expensive state oversized permits, police escorts, and route surveys for tall machinery between 8\'6" and 10\'6" in height.',
    differencesVsOthers: [
      {
        targetTruckName: 'vs. Flatbed',
        keyDifference: 'Step decks drop down to 38"–40" deck height, carrying freight up to 10\'6" tall legally. Standard flatbeds sit at 60" and cannot carry cargo taller than 8\'6".'
      },
      {
        targetTruckName: 'vs. Dry Van',
        keyDifference: 'Dry vans have a fixed 110" (9\'2") ceiling and rear doors. Step decks are open-air drop platforms capable of handling taller, wider crated machinery.'
      },
      {
        targetTruckName: 'vs. Lowboy (RGN)',
        keyDifference: 'Step decks have fixed goosenecks and ride at ~38", whereas Lowboys detach at the front and drop all the way to 18"–24" for super-heavy 100k+ lb loads.'
      }
    ],
    photoHotspots: [
      {
        id: 'sd-cab',
        name: 'Peterbilt Long-Hood Heavy Hauler',
        x: 24,
        y: 55,
        tag: 'Heavy Haul Tractor',
        description: 'Severe-duty long-wheelbase tractor designed for high torque industrial transport and oversize bridge legal compliance.',
        dotImportance: 'Equipped with dual chrome exhaust stacks and extended air-brake tanks.'
      },
      {
        id: 'sd-upper',
        name: '10\'–11\' Upper Deck Platform',
        x: 49,
        y: 53,
        tag: 'Upper Platform',
        description: 'Upper deck situated over tractor fifth wheel at standard 60" height; holds smaller tooling boxes or generators.',
        dotImportance: 'Max upper deck cargo weight typically limited to 10,000–12,000 lbs to keep tractor drive axles within 34,000 lbs.'
      },
      {
        id: 'sd-drop',
        name: 'Structural Gooseneck Drop Transition',
        x: 54,
        y: 57,
        tag: 'Drop Frame',
        description: 'Heavy fabricated I-beam transition where the frame drops 18–20 inches down from neck to the main well.',
        dotImportance: 'Critical load path stress point inspected for micro-cracks before dispatching heavy machinery loads.'
      },
      {
        id: 'sd-crates',
        name: 'Oversized Industrial Machinery Crate',
        x: 72,
        y: 44,
        tag: 'Tall Freight',
        description: 'Heavy precision CNC equipment enclosed in wooden export crating secured with heavy transport chains and ratchets.',
        dotImportance: '10\'2" crate height clears 13\'6" standard highway overpasses because of the 38" low deck height.'
      },
      {
        id: 'sd-lower',
        name: '42\' Low Well Deck (38" Ground Clearance)',
        x: 72,
        y: 58,
        tag: 'Low Center of Gravity',
        description: 'Main continuous well deck riding only 38 to 42 inches above the asphalt surface.',
        dotImportance: 'Provides 18–20 extra inches of vertical clearance compared to standard flatbeds without needing wide/tall permits.'
      },
      {
        id: 'sd-axles',
        name: 'Rear Heavy Tandem Axles & Beavertail',
        x: 88,
        y: 64,
        tag: 'Suspension',
        description: 'Low-profile 255/70R22.5 tires and air-ride suspension allowing low deck height and ramp loading.',
        dotImportance: 'Smaller wheel diameter enables low floor deck while maintaining full 34,000-lb tandem axle rating.'
      }
    ],
    length: '53\' 0" (Upper Deck: 10\'–11\', Lower Main Well: 42\'–43\')',
    width: '102" (2.59 m)',
    height: 'Deck Height: 38"–42" (Lower) / Max Legal Freight Height: 10\' 0" – 10\' 6"',
    deckHeight: '38" – 42" (Lower Well) / 58"–60" (Upper Neck)',
    maxCargoWeightLbs: 48000,
    maxCargoWeightKg: 21772,
    maxVolumeCuFt: 3700,
    maxVolumeCuM: 104.8,
    palletCapacity: 'Up to 26 Pallets (divided between upper and lower decks)',
    loadingMethod: 'Side forklift, crane, or drive-on with rear pull-out aluminum ramps',
    temperatureControl: 'Ambient Open Air',
    ratePerMileIndex: '1.30x – 1.50x (Specialized High-Paying Rate)',
    cdlRequirement: 'Class A CDL + Open Deck Cargo Securement',
    typicalCommodities: [
      'Excavators, backhoes, tractors & agricultural machinery',
      'Tall crated industrial milling machines & boilers',
      'Pre-fabricated modular structures & generator enclosures',
      'Storage tanks, silos & industrial vessels',
      'Helicopter fuselages, aerospace tooling & military gear'
    ],
    pros: [
      'Hauls freight up to 10\'6" tall legally without expensive state permits or escort cars',
      'Lower center of gravity provides superior stability on windy highway mountain passes',
      'Aluminum loading ramps allow wheeled and tracked machinery to drive straight on',
      'Premium specialized freight rates per mile'
    ],
    cons: [
      'Split deck creates two separate elevation levels, complicating load balancing',
      'Upper deck is short (~10–11 ft), limiting long rigid freight like long pipes',
      'Lower road clearance increases risk of "high-centering" on steep railroad crossings',
      'Tarping irregular tall shapes is challenging and requires strict fall protection safety'
    ],
    dispatcherTips: [
      'Calculate bridge clearance: Maximum legal overall vehicle height is 13\' 6" (14\' in western states). With a 40" deck, max cargo height is 10\' 2".',
      'Always verify if the customer requires pull-out aluminum ramps for drive-on equipment.',
      'Check upper deck weight: Remember the upper deck sits right over the tractor drive axles, so heavy concentrated weight there will overload the drive axles.'
    ],
    components: [
      {
        id: 'gooseneck-drop',
        name: 'Structural Gooseneck Transition',
        description: 'Tapered arched steel beam connecting the elevated front deck down to the dropped main well.',
        logisticsImportance: 'Engineered to withstand enormous torsional forces while dropping deck height by 18–20 inches.'
      },
      {
        id: 'lower-well',
        name: 'Low-Profile Main Cargo Well',
        description: 'Reinforced hardwood well platform riding on low-profile 255/70R22.5 tires to maximize vertical loading space.',
        logisticsImportance: 'Enables tall industrial machinery to pass safely under 14-foot highway overpasses.'
      },
      {
        id: 'ramp-storage',
        name: 'Undermount Aluminum Ramp Compartment',
        description: 'Enclosed chassis storage tray housing interlocking 20,000-lb rated aluminum drive-on ramps.',
        logisticsImportance: 'Allows bulldozers, tractors, and telehandlers to drive straight onto the trailer without a loading dock.'
      }
    ]
  },
  {
    id: 'box-truck',
    index: 5,
    name: '26\' Straight Box Truck',
    modelCode: 'BT-2600',
    category: 'Medium-Duty Straight Truck',
    badge: 'Last-Mile & Urban Delivery Master',
    realImagePath: boxTruckImg,
    publicImagePath: '/images/trucks/box-truck.webp',
    webpImagePath: '/images/trucks/box-truck.webp',
    thumbImagePath: '/images/trucks/box-truck-thumb.webp',
    color: '#10b981',
    shortDescription: 'Rigid single-chassis commercial delivery vehicle with a 26-foot dry freight box and hydraulic rear liftgate. Essential for tight city streets, shopping centers, and residential deliveries.',
    fullDescription: 'Unlike articulated tractor-trailers, straight box trucks have the driver cab and cargo body permanently mounted onto a single rigid steel frame. Equipped with a hydraulic tuck-under liftgate that lowers pallets from truck floor height down to the asphalt, they provide the backbone of urban e-commerce and retail delivery where 53-foot semi-trucks are banned.',
    whyItExists: 'Enables delivery of palletized commercial cargo to residential neighborhoods, strip malls, and city centers where semi-trucks are physically too large or legally banned.',
    differencesVsOthers: [
      {
        targetTruckName: 'vs. 53\' Dry Van',
        keyDifference: 'Box trucks are single rigid units (26 ft, 10k lbs payload) with hydraulic liftgates, while dry vans are 53-foot articulated semi-trailers (45k lbs payload) requiring loading docks.'
      },
      {
        targetTruckName: 'vs. Flatbed',
        keyDifference: 'Box trucks provide an enclosed, weatherproof delivery box for consumer and medical goods, whereas flatbeds carry open raw industrial materials.'
      },
      {
        targetTruckName: 'vs. Reefer',
        keyDifference: 'Standard box trucks carry ambient dry freight (furniture, retail, appliances), although refrigerated straight trucks exist for local food delivery.'
      }
    ],
    photoHotspots: [
      {
        id: 'bx-cab',
        name: 'Class 6 Commercial Delivery Day Cab',
        x: 82,
        y: 55,
        tag: 'Urban Day Cab',
        description: 'Freightliner M2 / International MV commercial medium-duty chassis with wide panoramic windshield and steep wheel cut for tight alley maneuvering.',
        dotImportance: 'Engineered for stop-and-go metro deliveries; tight turning radius outmaneuvers semi tractor-trailers.'
      },
      {
        id: 'bx-body',
        name: '26-Foot FRP Composite Cargo Body',
        x: 48,
        y: 38,
        tag: 'Cargo Box',
        description: 'Fiberglass reinforced plywood (FRP) sidewall cargo body providing 1,700 cu ft capacity and accommodating up to 12 standard pallets.',
        dotImportance: 'Payload capped at 10,000 lbs to keep Gross Vehicle Weight Rating (GVWR) under the 26,000-lb CDL threshold.'
      },
      {
        id: 'bx-door',
        name: 'Overhead Aluminum Roll-Up Rear Door',
        x: 26,
        y: 34,
        tag: 'City Access',
        description: 'Smooth roll-up garage-style overhead door enabling backing directly into tight ground-level delivery bays.',
        dotImportance: 'Requires zero swinging clearance behind the truck, vital for narrow alleys and city storefronts.'
      },
      {
        id: 'bx-liftgate',
        name: 'Hydraulic Tuckunder Power Liftgate',
        x: 20,
        y: 69,
        tag: 'Hydraulic Lift',
        description: 'Heavy steel electro-hydraulic folding lift platform rated for 2,500 to 3,300 lbs of lifting capacity.',
        dotImportance: 'Essential equipment: Lowers loaded pallet jacks from 48" truck bed height down to street asphalt without a loading dock.'
      },
      {
        id: 'bx-wheels',
        name: 'Single Rear Drive Axle Dual Wheels',
        x: 49,
        y: 73,
        tag: 'Drivetrain',
        description: 'Heavy dual commercial drive tires on a single 19,000-lb rated drive axle with hydraulic or air brakes.',
        dotImportance: 'Under FMCSA §383.5: Keeps vehicle under 26,001 lbs GVWR so non-CDL commercial drivers can legally operate it.'
      }
    ],
    length: '26\' 0" Box Length (Overall: ~33\'–35\')',
    width: '102" (2.59 m) Exterior / 96" (2.44 m) Interior',
    height: '12\' 6" – 13\' 0" Exterior / 96"–102" Interior',
    deckHeight: '44" – 48" (Bed Height)',
    maxCargoWeightLbs: 10000,
    maxCargoWeightKg: 4536,
    maxVolumeCuFt: 1700,
    maxVolumeCuM: 48.1,
    palletCapacity: '10–12 Standard (48"×40") Pallets',
    loadingMethod: 'Hydraulic rear tuck-under liftgate, loading dock, or curbside pallet jack',
    temperatureControl: 'Ambient (Refrigerated straight truck models also exist)',
    ratePerMileIndex: '1.40x – 1.80x (High per-mile local delivery rate)',
    cdlRequirement: 'Often Non-CDL (under 26,000 lbs GVWR) or Class B CDL for heavier models',
    typicalCommodities: [
      'Residential furniture & major home appliances',
      'E-commerce & retail store replenishment',
      'Medical supplies, pharmaceuticals & hospital equipment',
      'Convention center displays & trade show booth materials',
      'Office equipment, electronics & local parcel delivery'
    ],
    pros: [
      'Accessible to tight residential streets, cul-de-sacs, and urban centers',
      'Hydraulic liftgate eliminates need for loading docks or forklifts at delivery destination',
      'Non-CDL models (<26,000 lbs GVWR) allow a broader driver recruitment pool',
      'High per-stop delivery fees and strong local courier demand'
    ],
    cons: [
      'Limited payload weight capacity (~8,000–10,000 lbs max before axle overload)',
      'Inefficient for long-distance interstate haulage compared to 53-foot semi trucks',
      'Roll-up rear doors sacrifice 4–6 inches of door clearance height',
      'Frequent stop-and-go city traffic accelerates brake and transmission wear'
    ],
    dispatcherTips: [
      'Always confirm liftgate weight rating (standard liftgates are 2,500–3,300 lbs capacity; heavy machinery can bend the platform).',
      'Verify if delivery requires a pallet jack or two-person inside delivery crew.',
      'Check local city truck route restrictions, low tree canopy hazards, and parkway height bans.'
    ],
    components: [
      {
        id: 'rigid-chassis',
        name: 'Single Unit Medium-Duty Chassis',
        description: 'Freightliner M2 / International MV medium-duty chassis with single rear drive axle and front steer axle.',
        logisticsImportance: 'Tight turning radius allows maneuvering in shopping mall alleys and residential driveways.'
      },
      {
        id: 'liftgate',
        name: 'Tuck-Under Hydraulic Liftgate',
        description: 'Electro-hydraulic steel platform that folds neatly beneath the rear bumper and lowers flat to ground level.',
        logisticsImportance: 'Enables ground-level delivery of 2,500-lb pallets without a loading dock or forklift.'
      },
      {
        id: 'roll-door',
        name: 'Overhead Roll-Up Door',
        description: 'Multi-section articulated door that rolls into the ceiling tracks, avoiding swing door clearance issues.',
        logisticsImportance: 'Allows opening the door even when parked inches away from another vehicle in tight alleys.'
      }
    ]
  },
  {
    id: 'tanker',
    index: 6,
    name: 'Liquid Bulk Tanker Trailer',
    modelCode: 'TK-9200',
    category: 'Liquid / Fluid Bulk Hauler',
    badge: 'Bulk Liquids & Chemical Specialist',
    realImagePath: tankerImg,
    publicImagePath: '/images/trucks/tanker.webp',
    webpImagePath: '/images/trucks/tanker.webp',
    thumbImagePath: '/images/trucks/tanker-thumb.webp',
    color: '#ec4899',
    shortDescription: 'Cylindrical stainless steel or aluminum tank trailer engineered for bulk liquid transport. Equipped with internal baffles to prevent dynamic fluid surge.',
    fullDescription: 'Liquid bulk tankers are precision pressure vessels designed to carry liquid foods (milk, juices, vegetable oils) or fuels and chemicals. The cylindrical shape provides high structural strength and a low aerodynamic profile. Drivers must possess specialized tanker endorsements due to the dangerous dynamic fluid surge during acceleration and braking.',
    whyItExists: 'The only safe and compliant method to move large quantities of bulk fluids (petroleum, milk, chemicals) without bottling or canning into small containers.',
    differencesVsOthers: [
      {
        targetTruckName: 'vs. Dry Van & Reefer',
        keyDifference: 'Tankers carry 0 pallets. They carry fluid bulk cargo pumped through hoses directly into a pressure vessel, whereas vans carry packaged freight.'
      },
      {
        targetTruckName: 'vs. Flatbed',
        keyDifference: 'Tankers carry liquids inside enclosed baffled tanks, whereas flatbeds carry rigid dry cargo strapped to an open platform.'
      },
      {
        targetTruckName: 'vs. Box Truck',
        keyDifference: 'Tankers are heavy-duty long-haul chemical and fuel haulers (45,000 lbs / 9,000 gallons), while box trucks are urban retail parcel delivery vans.'
      }
    ],
    photoHotspots: [
      {
        id: 'tk-cab',
        name: 'Kenworth W900 Severe-Duty Heavy Hauler Cab',
        x: 27,
        y: 55,
        tag: 'Heavy Haul Tractor',
        description: 'Classic long-hood Class 8 highway tractor fitted with Cummins X15 turbo diesel engine and dual high-rise stainless stacks.',
        dotImportance: 'Equipped with heavy air disc brakes and roll stability electronics designed specifically for liquid slosh control.'
      },
      {
        id: 'tk-shell',
        name: 'Mirror-Polished 316 Stainless Steel Shell',
        x: 68,
        y: 42,
        tag: 'Bulk Vessel',
        description: 'Sanitary food-grade 304/316 stainless steel cylindrical vessel insulated to retain thermal temperatures over long transit.',
        dotImportance: 'DOT-407 certified: Holds up to 9,000 gallons of bulk liquids; smooth interior allows complete Clean-In-Place (CIP) sanitation.'
      },
      {
        id: 'tk-domes',
        name: 'Top Sealed Inspection Manholes & Catwalk',
        x: 75,
        y: 34,
        tag: 'Pressure Relief & Fill',
        description: 'Heavy domed fill hatches fitted with two-way pressure/vacuum safety relief vents and slip-resistant top safety walkway.',
        dotImportance: 'Used for top gravity-loading and internal wash bay rotating cleaning heads; hermetic seals prevent liquid leakage during rollover.'
      },
      {
        id: 'tk-discharge',
        name: 'Bottom Emergency Shear Discharge Valve',
        x: 76,
        y: 63,
        tag: 'Unloading Valve',
        description: 'Internal shear-groove foot valve linked to an external 3"–4" stainless manifold with quick cam-lock connection fittings.',
        dotImportance: 'Critical safety feature: If rear collision damages external piping, internal valve snaps shut to prevent catastrophic chemical spill.'
      },
      {
        id: 'tk-tandem',
        name: 'Severe-Duty Tanker Tandem Axle Assembly',
        x: 89,
        y: 68,
        tag: 'Surge Braking',
        description: 'Dual-axle bogie equipped with heavy air disc brakes and automated Roll Stability Support (RSS).',
        dotImportance: 'Counteracts dynamic liquid forward surge momentum during sudden highway deceleration.'
      }
    ],
    length: '42\' – 48\' (12.8 – 14.6 m)',
    width: '96" – 102" (2.44 – 2.59 m)',
    height: '11\' 6" – 12\' 0" (3.5 – 3.66 m)',
    deckHeight: '36" (Center of Gravity / Ground Clearance)',
    maxCargoWeightLbs: 45000,
    maxCargoWeightKg: 20412,
    maxVolumeCuFt: 1100, // ~8,000 - 9,500 gallons
    maxVolumeCuM: 35.0,
    palletCapacity: '0 Pallets (Bulk liquid transport: 8,000–9,500 Gallons)',
    loadingMethod: 'Top manhole dome loading; bottom pump / gravity valve discharge',
    temperatureControl: 'Insulated with steam/in-transit electric heating coils available',
    ratePerMileIndex: '1.40x – 1.70x (Specialized Premium)',
    cdlRequirement: 'Class A CDL + Tanker Endorsement (N) + HazMat (H) if hauling fuels/chemicals',
    typicalCommodities: [
      'Refined petroleum, gasoline, diesel & aviation fuel',
      'Food-grade dairy, liquid chocolate, honey & vegetable oils',
      'Industrial chemicals, solvents, resins & polymers',
      'Water, fertilizer & agricultural liquid slurries',
      'Liquid nitrogen, cryogenic fluids & compressed gasses'
    ],
    pros: [
      'Very high freight rates and specialized carrier margins',
      'Long-term dedicated supply chain contracts with refineries & food processors',
      'Smooth aerodynamic shape provides superior fuel economy when loaded',
      'Fast automated pumping discharge without manual pallet unloading'
    ],
    cons: [
      'Liquid surge: Liquid sloshing forward during braking can push a truck straight into an intersection',
      'Severe deadhead: Tankers almost always return empty because cross-contamination is strictly forbidden',
      'Intensive tank washouts required between loads (Food-grade certified kosher wash)',
      'High risk of catastrophic rollover due to elevated liquid center of gravity'
    ],
    dispatcherTips: [
      'Beware of the "Outage" or "Ullage" rule: Tanks must never be loaded over 95% full (liquid expands with heat), but loading under 75% creates dangerous high-velocity surge waves.',
      'Check certified tank wash requirements: Hauling juice after dairy requires a certified chemical wash with water test certificate.',
      'Always confirm connection fittings: Ensure the driver carries the exact cam-lock or threaded hose fittings required by the receiver pump.'
    ],
    components: [
      {
        id: 'tank-shell',
        name: 'Mirror Stainless Steel Tank Vessel',
        description: 'Seamless welded elliptical tank vessel with mirror-polished interior to prevent bacterial buildup.',
        logisticsImportance: 'Engineered to DOT-406/407 specifications for pressurized or atmospheric liquid transport.'
      },
      {
        id: 'internal-baffles',
        name: 'Internal Anti-Surge Baffles',
        description: 'Curved bulkheads with perforations installed inside the tank dividing it into compartments.',
        logisticsImportance: 'Slows down the dangerous front-to-back momentum of fluid during vehicle deceleration.'
      },
      {
        id: 'catwalk-ladder',
        name: 'Top Catwalk & Inspection Manholes',
        description: 'Grip-strut safety catwalk running along the spine of the tank with heavy-duty sealable dome hatches.',
        logisticsImportance: 'Allows top-loading via loading arms and visual inspection of tank interior cleanliness.'
      },
      {
        id: 'discharge-valves',
        name: 'Bottom Emergency Discharge Manifold',
        description: 'Quick-connect cam-lock hose discharge ports with pneumatic emergency shut-off shear valves.',
        logisticsImportance: 'Immediately cuts off liquid flow in the event of hose rupture or downstream pump failure.'
      }
    ]
  }
];

export interface DispatchQuizQuestion {
  id: string;
  scenario: string;
  weight: string;
  dimensions: string;
  specialCondition: string;
  correctTruckId: TruckTypeId;
  explanation: string;
}

export const DISPATCH_QUIZ_QUESTIONS: DispatchQuizQuestion[] = [
  {
    id: 'q1',
    scenario: 'Shipper needs to move 24 pallets of fresh strawberries from Salinas, CA to Chicago, IL. Fruit must stay at a continuous 34°F pulp temperature with real-time temperature logs provided at delivery.',
    weight: '38,500 lbs (24 pallets)',
    dimensions: 'Standard 48"×40" Pallets',
    specialCondition: 'Perishable cold-chain (34°F continuous)',
    correctTruckId: 'reefer',
    explanation: 'Strawberries are highly perishable and require active refrigeration at 34°F with continuous air circulation. A 53\' Refrigerated Trailer (Reefer) with polyurethane insulation and a diesel cooling unit is mandatory. Loading fresh produce into a standard dry van would lead to total cargo spoilage within 24 hours.'
  },
  {
    id: 'q2',
    scenario: 'A machinery fabricator in Milwaukee needs to ship an industrial milling unit that measures 9 feet 10 inches tall, 8 feet wide, and 24 feet long. The route has multiple 14\' 0" highway overpasses.',
    weight: '36,000 lbs',
    dimensions: '24\' L × 8\' W × 9\' 10" H',
    specialCondition: 'Height clearance under 14\' 0" overpasses',
    correctTruckId: 'step-deck',
    explanation: 'On a standard flatbed (deck height 58"–60"), a 9\'10" tall machine would reach 14\'8"–14\'10" overall height, hitting bridges and requiring expensive state oversize permits. A Step Deck (Drop Deck) trailer drops the deck down to 38"–40", resulting in an overall height of ~13\'2", clearing standard 13\'6"–14\'0" highway bridges without permits.'
  },
  {
    id: 'q3',
    scenario: 'Downtown boutique hotel needs 8 pallets of hotel bedroom furniture and mattresses delivered to a ground-level delivery alley. The hotel has no loading dock and no forklift.',
    weight: '6,200 lbs (8 pallets)',
    dimensions: 'Palletized (Up to 72" tall)',
    specialCondition: 'No dock, no forklift, tight city alley',
    correctTruckId: 'box-truck',
    explanation: 'A 26\' Straight Box Truck equipped with a hydraulic tuck-under liftgate is ideal. A 53-foot semi-truck is legally prohibited or unable to turn into congested downtown alleys, and a standard dry van trailer cannot lower pallets down to street level without a forklift or loading dock.'
  },
  {
    id: 'q4',
    scenario: 'Corn processing facility in Iowa needs to transport 8,200 gallons of high-fructose food-grade corn syrup to a soda bottling plant in Cincinnati.',
    weight: '43,000 lbs (liquid payload)',
    dimensions: '8,200 Gallons Bulk Liquid',
    specialCondition: 'Sanitary Food-Grade (Kosher Wash cert)',
    correctTruckId: 'tanker',
    explanation: 'Moving bulk liquids without pre-packaging requires a sanitary stainless steel Liquid Bulk Tanker Trailer equipped with internal baffles and pump/gravity discharge manifolds. The driver must have a Tanker endorsement (N) and a certified tank washout ticket.'
  },
  {
    id: 'q5',
    scenario: 'Steel mill in Gary, IN needs to transport 44,000 lbs of 48-foot structural steel bridge beams to a rural highway construction site. The site has an overhead crane and no loading dock.',
    weight: '44,000 lbs',
    dimensions: '48\' Length × 36" Width',
    specialCondition: 'Crane overhead loading & unloading',
    correctTruckId: 'flatbed',
    explanation: '48-foot rigid steel beams cannot be maneuvered through the rear doors of an enclosed dry van or loaded by forklifts from behind. A 48\' or 53\' Flatbed trailer allows overhead gantry cranes to lower the steel directly onto the deck from above and strap it down with grade-70 transport chains.'
  },
  {
    id: 'q6',
    scenario: 'Distribution hub in Dallas needs to ship 26 pallets of packaged paper products and dry groceries to an Atlanta warehouse. Both origin and destination are standard loading docks.',
    weight: '34,000 lbs (26 pallets)',
    dimensions: 'Standard 48"×40" Pallets',
    specialCondition: 'Weatherproof dock-to-dock general freight',
    correctTruckId: 'dry-van',
    explanation: 'A standard 53\' Dry Van Trailer is the most cost-effective and efficient equipment for dock-to-dock ambient freight. It offers 4,000+ cu ft of space, low tare weight, zero refrigeration fuel costs, and complete weather and theft protection.'
  }
];
