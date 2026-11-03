import * as THREE from 'three';
import { TruckTypeId } from '../data/truckTypesData';

/**
 * ThreeTruckModelBuilder
 * Generates high-fidelity, photorealistic procedural 3D commercial truck models
 * with authentic PBR materials, true-to-life dimensions, and transparent ground shadows.
 */

// Shared reusable materials with realistic PBR properties
export const createTruckMaterials = (truckColorHex: string = '#02a2f0') => {
  return {
    // Cab Body Paint (Automotive Clearcoat finish)
    cabPaint: new THREE.MeshStandardMaterial({
      color: new THREE.Color(truckColorHex),
      roughness: 0.25,
      metalness: 0.35,
    }),
    // Cab Secondary Accent (Dark navy / black trim)
    cabAccent: new THREE.MeshStandardMaterial({
      color: 0x111827,
      roughness: 0.4,
      metalness: 0.2,
    }),
    // Mirror Chrome (Bumper, exhaust stacks, mirrors, grille, fuel tank bands)
    chrome: new THREE.MeshStandardMaterial({
      color: 0xf8fafc,
      roughness: 0.08,
      metalness: 0.95,
    }),
    // Brushed Aluminum (Fuel tanks, side skirts, trailer frame, steps)
    brushedAluminum: new THREE.MeshStandardMaterial({
      color: 0xd1d5db,
      roughness: 0.3,
      metalness: 0.75,
    }),
    // Windshield & Windows (Deep tinted glass)
    tintedGlass: new THREE.MeshPhysicalMaterial({
      color: 0x111c24,
      roughness: 0.05,
      metalness: 0.1,
      transmission: 0.7,
      transparent: true,
      opacity: 0.85,
    }),
    // Black Rubber (Tire treads, mudflaps, window weather-stripping)
    rubberTire: new THREE.MeshStandardMaterial({
      color: 0x18181b,
      roughness: 0.85,
      metalness: 0.05,
    }),
    // Steel Wheel Rims (Commercial 10-hole alloy disc)
    wheelRim: new THREE.MeshStandardMaterial({
      color: 0xe2e8f0,
      roughness: 0.2,
      metalness: 0.85,
    }),
    // Dark Chassis Steel (Frame rails, axles, differential, landing gear legs)
    chassisSteel: new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      roughness: 0.6,
      metalness: 0.6,
    }),
    // Dry Van / Box Body (High-gloss composite white panels)
    compositeWall: new THREE.MeshStandardMaterial({
      color: 0xfafafa,
      roughness: 0.28,
      metalness: 0.1,
    }),
    // Corrugated Aluminum Roof
    aluminumRoof: new THREE.MeshStandardMaterial({
      color: 0xe5e7eb,
      roughness: 0.4,
      metalness: 0.5,
    }),
    // Apitong Hardwood Cargo Deck (For Flatbed & Step Deck)
    hardwoodDeck: new THREE.MeshStandardMaterial({
      color: 0x8b5a2b,
      roughness: 0.75,
      metalness: 0.05,
    }),
    // Polished Stainless Steel Tank Vessel
    tankerShell: new THREE.MeshStandardMaterial({
      color: 0xf1f5f9,
      roughness: 0.05,
      metalness: 0.95,
    }),
    // Yellow Industrial Machinery (Excavator / Coils payload)
    industrialYellow: new THREE.MeshStandardMaterial({
      color: 0xf59e0b,
      roughness: 0.3,
      metalness: 0.4,
    }),
    // Ratchet Straps (Bright safety orange / yellow nylon webbing)
    tieDownStrap: new THREE.MeshStandardMaterial({
      color: 0xf97316,
      roughness: 0.7,
      metalness: 0.0,
    }),
    // Headlights (Clear glass with bright warm emission)
    headlight: new THREE.MeshStandardMaterial({
      color: 0xffffff,
      emissive: 0xfffbeb,
      emissiveIntensity: 0.6,
      roughness: 0.1,
      metalness: 0.5,
    }),
    // Amber Clearance Cab Roof Markers
    amberMarker: new THREE.MeshStandardMaterial({
      color: 0xf59e0b,
      emissive: 0xf59e0b,
      emissiveIntensity: 0.8,
      roughness: 0.2,
    }),
    // Red Tail & Brake Lights
    brakeLight: new THREE.MeshStandardMaterial({
      color: 0xef4444,
      emissive: 0xdc2626,
      emissiveIntensity: 0.7,
      roughness: 0.2,
    }),
    // DOT Reflective Red & White Conspicuity Tape
    dotTape: new THREE.MeshStandardMaterial({
      color: 0xf43f5e,
      roughness: 0.2,
      metalness: 0.2,
    }),
  };
};

/**
 * Creates a detailed commercial wheel assembly (Tire, Rim, Hub, and Lug nuts)
 */
const createWheel = (
  materials: ReturnType<typeof createTruckMaterials>,
  isDual: boolean = false
): THREE.Group => {
  const wheelGroup = new THREE.Group();

  const tireRadius = 0.52; // ~41" commercial low-pro tire
  const tireWidth = 0.28;

  // Outer Rubber Tire
  const tireGeo = new THREE.CylinderGeometry(tireRadius, tireRadius, tireWidth, 24);
  tireGeo.rotateZ(Math.PI / 2);
  const tire = new THREE.Mesh(tireGeo, materials.rubberTire);
  tire.castShadow = true;
  wheelGroup.add(tire);

  // Wheel Rim (Steel / Alloy)
  const rimGeo = new THREE.CylinderGeometry(0.32, 0.32, tireWidth + 0.01, 20);
  rimGeo.rotateZ(Math.PI / 2);
  const rim = new THREE.Mesh(rimGeo, materials.wheelRim);
  wheelGroup.add(rim);

  // Center Hub & Lug Nut Ring
  const hubGeo = new THREE.CylinderGeometry(0.12, 0.12, tireWidth + 0.04, 16);
  hubGeo.rotateZ(Math.PI / 2);
  const hub = new THREE.Mesh(hubGeo, materials.chassisSteel);
  wheelGroup.add(hub);

  // If dual wheel (drive axle or trailer tandem), add inner wheel
  if (isDual) {
    const innerTire = new THREE.Mesh(tireGeo, materials.rubberTire);
    innerTire.position.x = -0.32;
    innerTire.castShadow = true;
    wheelGroup.add(innerTire);

    const innerRim = new THREE.Mesh(rimGeo, materials.wheelRim);
    innerRim.position.x = -0.32;
    wheelGroup.add(innerRim);
  }

  return wheelGroup;
};

/**
 * Creates a complete Class 8 Aerodynamic Highway Sleeper Cab Tractor
 */
const createClass8Tractor = (
  materials: ReturnType<typeof createTruckMaterials>
): THREE.Group => {
  const tractor = new THREE.Group();
  tractor.name = 'Class8Tractor';

  // 1. Chassis Frame Rails (Double C-Channel High Tensile Steel)
  const chassisGeo = new THREE.BoxGeometry(0.85, 0.22, 6.8);
  const chassis = new THREE.Mesh(chassisGeo, materials.chassisSteel);
  chassis.position.set(0, 0.65, 0);
  chassis.castShadow = true;
  tractor.add(chassis);

  // 2. Engine Hood (Sloping Aerodynamic Long-Nose Hood)
  const hoodGeo = new THREE.BoxGeometry(2.1, 1.25, 2.2);
  const hood = new THREE.Mesh(hoodGeo, materials.cabPaint);
  hood.position.set(0, 1.35, 1.9);
  hood.castShadow = true;
  tractor.add(hood);

  // Sloping Hood Top Fairing
  const hoodSlopeGeo = new THREE.BoxGeometry(1.95, 0.25, 1.8);
  const hoodSlope = new THREE.Mesh(hoodSlopeGeo, materials.cabPaint);
  hoodSlope.position.set(0, 1.95, 1.8);
  hoodSlope.rotation.x = -0.15;
  hoodSlope.castShadow = true;
  tractor.add(hoodSlope);

  // Chrome Front Grille (Vertical Slats)
  const grilleGeo = new THREE.BoxGeometry(1.4, 0.95, 0.1);
  const grille = new THREE.Mesh(grilleGeo, materials.chrome);
  grille.position.set(0, 1.25, 3.02);
  tractor.add(grille);

  // Front Heavy Bumper & Fog Lights
  const bumperGeo = new THREE.BoxGeometry(2.35, 0.42, 0.25);
  const bumper = new THREE.Mesh(bumperGeo, materials.chrome);
  bumper.position.set(0, 0.58, 3.02);
  bumper.castShadow = true;
  tractor.add(bumper);

  // Dual Headlights
  const leftHeadlight = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.18, 0.08), materials.headlight);
  leftHeadlight.position.set(-0.85, 0.72, 3.05);
  tractor.add(leftHeadlight);

  const rightHeadlight = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.18, 0.08), materials.headlight);
  rightHeadlight.position.set(0.85, 0.72, 3.05);
  tractor.add(rightHeadlight);

  // 3. Driver Cab & 72" Raised Roof Sleeper Berth
  const cabGeo = new THREE.BoxGeometry(2.3, 2.2, 2.8);
  const cab = new THREE.Mesh(cabGeo, materials.cabPaint);
  cab.position.set(0, 2.1, -0.4);
  cab.castShadow = true;
  tractor.add(cab);

  // Aerodynamic High-Roof Sleeper Cap
  const roofCapGeo = new THREE.BoxGeometry(2.28, 0.7, 2.4);
  const roofCap = new THREE.Mesh(roofCapGeo, materials.cabPaint);
  roofCap.position.set(0, 3.4, -0.4);
  roofCap.castShadow = true;
  tractor.add(roofCap);

  // Roof Wind Deflector Fairing (Wings to bridge trailer gap)
  const fairingGeo = new THREE.BoxGeometry(2.25, 0.5, 0.6);
  const fairing = new THREE.Mesh(fairingGeo, materials.cabPaint);
  fairing.position.set(0, 3.65, -1.5);
  fairing.rotation.x = -0.25;
  tractor.add(fairing);

  // Amber Cab Roof Clearance Markers (5 DOT lights)
  for (let i = -2; i <= 2; i++) {
    const marker = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.05, 0.12), materials.amberMarker);
    marker.position.set(i * 0.35, 3.25, 0.95);
    tractor.add(marker);
  }

  // Tinted Windshield (Curved multi-pane safety glass)
  const windshieldGeo = new THREE.BoxGeometry(1.95, 0.85, 0.1);
  const windshield = new THREE.Mesh(windshieldGeo, materials.tintedGlass);
  windshield.position.set(0, 2.25, 0.96);
  windshield.rotation.x = -0.22;
  tractor.add(windshield);

  // Chrome Sun Visor
  const visorGeo = new THREE.BoxGeometry(2.05, 0.12, 0.35);
  const visor = new THREE.Mesh(visorGeo, materials.chrome);
  visor.position.set(0, 2.72, 0.9);
  visor.rotation.x = 0.3;
  tractor.add(visor);

  // Side Cab Windows
  const leftWindow = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.65, 0.95), materials.tintedGlass);
  leftWindow.position.set(-1.16, 2.25, 0.35);
  tractor.add(leftWindow);

  const rightWindow = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.65, 0.95), materials.tintedGlass);
  rightWindow.position.set(1.16, 2.25, 0.35);
  tractor.add(rightWindow);

  // Dual Chrome Side Mirrors with Stanchion Arms
  const mirrorGeo = new THREE.BoxGeometry(0.12, 0.45, 0.18);
  const leftMirror = new THREE.Mesh(mirrorGeo, materials.chrome);
  leftMirror.position.set(-1.35, 2.25, 0.65);
  tractor.add(leftMirror);

  const rightMirror = new THREE.Mesh(mirrorGeo, materials.chrome);
  rightMirror.position.set(1.35, 2.25, 0.65);
  tractor.add(rightMirror);

  // Dual Chrome Vertical Exhaust Stacks
  const stackGeo = new THREE.CylinderGeometry(0.08, 0.08, 2.5, 16);
  const leftStack = new THREE.Mesh(stackGeo, materials.chrome);
  leftStack.position.set(-1.15, 2.9, -1.75);
  tractor.add(leftStack);

  const rightStack = new THREE.Mesh(stackGeo, materials.chrome);
  rightStack.position.set(1.15, 2.9, -1.75);
  tractor.add(rightStack);

  // 4. Cylindrical Aluminum Fuel Saddle Tanks (Left & Right)
  const tankGeo = new THREE.CylinderGeometry(0.35, 0.35, 1.8, 16);
  tankGeo.rotateX(Math.PI / 2);

  const leftFuelTank = new THREE.Mesh(tankGeo, materials.brushedAluminum);
  leftFuelTank.position.set(-1.05, 0.65, 0.35);
  leftFuelTank.castShadow = true;
  tractor.add(leftFuelTank);

  const rightFuelTank = new THREE.Mesh(tankGeo, materials.brushedAluminum);
  rightFuelTank.position.set(1.05, 0.65, 0.35);
  rightFuelTank.castShadow = true;
  tractor.add(rightFuelTank);

  // Serrated Aluminum Cab Steps
  const stepGeo = new THREE.BoxGeometry(0.3, 0.08, 1.4);
  const leftSteps = new THREE.Mesh(stepGeo, materials.brushedAluminum);
  leftSteps.position.set(-1.15, 0.42, 0.35);
  tractor.add(leftSteps);

  const rightSteps = new THREE.Mesh(stepGeo, materials.brushedAluminum);
  rightSteps.position.set(1.15, 0.42, 0.35);
  tractor.add(rightSteps);

  // 5. Fifth Wheel Coupler (Sliding Cast Steel Plate)
  const fifthWheelGeo = new THREE.CylinderGeometry(0.48, 0.52, 0.12, 16);
  const fifthWheel = new THREE.Mesh(fifthWheelGeo, materials.chassisSteel);
  fifthWheel.position.set(0, 1.05, -2.1);
  fifthWheel.rotation.x = 0.08;
  tractor.add(fifthWheel);

  // 6. Running Gear & Wheels
  // Steer Axle (Front) - Single Wheels
  const leftFrontWheel = createWheel(materials, false);
  leftFrontWheel.position.set(-1.08, 0.52, 2.15);
  tractor.add(leftFrontWheel);

  const rightFrontWheel = createWheel(materials, false);
  rightFrontWheel.position.set(1.08, 0.52, 2.15);
  rightFrontWheel.rotation.y = Math.PI;
  tractor.add(rightFrontWheel);

  // Drive Tandem Axle 1 (Forward Drive) - Dual Wheels
  const leftDrive1 = createWheel(materials, true);
  leftDrive1.position.set(-1.08, 0.52, -1.45);
  tractor.add(leftDrive1);

  const rightDrive1 = createWheel(materials, true);
  rightDrive1.position.set(1.08, 0.52, -1.45);
  rightDrive1.rotation.y = Math.PI;
  tractor.add(rightDrive1);

  // Drive Tandem Axle 2 (Rear Drive) - Dual Wheels
  const leftDrive2 = createWheel(materials, true);
  leftDrive2.position.set(-1.08, 0.52, -2.75);
  tractor.add(leftDrive2);

  const rightDrive2 = createWheel(materials, true);
  rightDrive2.position.set(1.08, 0.52, -2.75);
  rightDrive2.rotation.y = Math.PI;
  tractor.add(rightDrive2);

  // Drive Quarter Fenders & Rear Mudflaps
  const mudflapGeo = new THREE.BoxGeometry(0.55, 0.65, 0.04);
  const leftMudflap = new THREE.Mesh(mudflapGeo, materials.rubberTire);
  leftMudflap.position.set(-1.05, 0.55, -3.2);
  tractor.add(leftMudflap);

  const rightMudflap = new THREE.Mesh(mudflapGeo, materials.rubberTire);
  rightMudflap.position.set(1.05, 0.55, -3.2);
  tractor.add(rightMudflap);

  return tractor;
};

/**
 * Creates 53-Foot Dry Van Semi-Trailer
 */
const createDryVanTrailer = (
  materials: ReturnType<typeof createTruckMaterials>
): THREE.Group => {
  const trailer = new THREE.Group();
  trailer.name = 'DryVanTrailer';

  const trailerLength = 13.8; // Scaled 53' box
  const trailerWidth = 2.45;
  const trailerHeight = 2.85;

  // Main Enclosed Composite Box
  const boxGeo = new THREE.BoxGeometry(trailerWidth, trailerHeight, trailerLength);
  const box = new THREE.Mesh(boxGeo, materials.compositeWall);
  box.position.set(0, 2.55, -8.2);
  box.castShadow = true;
  box.receiveShadow = true;
  trailer.add(box);

  // Aluminum Roof Cap
  const roofGeo = new THREE.BoxGeometry(trailerWidth + 0.04, 0.08, trailerLength + 0.04);
  const roof = new THREE.Mesh(roofGeo, materials.aluminumRoof);
  roof.position.set(0, 4.0, -8.2);
  trailer.add(roof);

  // Front Radius Corner Caps (Aerodynamic corner posts)
  const cornerGeo = new THREE.CylinderGeometry(0.12, 0.12, trailerHeight, 12);
  const leftCorner = new THREE.Mesh(cornerGeo, materials.brushedAluminum);
  leftCorner.position.set(-1.22, 2.55, -1.3);
  trailer.add(leftCorner);

  const rightCorner = new THREE.Mesh(cornerGeo, materials.brushedAluminum);
  rightCorner.position.set(1.22, 2.55, -1.3);
  trailer.add(rightCorner);

  // Aerodynamic Trailer Side Skirts (SmartWay verified)
  const skirtGeo = new THREE.BoxGeometry(0.06, 0.72, 6.5);
  const leftSkirt = new THREE.Mesh(skirtGeo, materials.compositeWall);
  leftSkirt.position.set(-1.18, 0.75, -7.8);
  leftSkirt.castShadow = true;
  trailer.add(leftSkirt);

  const rightSkirt = new THREE.Mesh(skirtGeo, materials.compositeWall);
  rightSkirt.position.set(1.18, 0.75, -7.8);
  rightSkirt.castShadow = true;
  trailer.add(rightSkirt);

  // Dual Landing Gear Legs & Crank
  const landingLegGeo = new THREE.BoxGeometry(0.18, 1.05, 0.18);
  const leftLandingLeg = new THREE.Mesh(landingLegGeo, materials.chassisSteel);
  leftLandingLeg.position.set(-0.95, 0.7, -4.2);
  trailer.add(leftLandingLeg);

  const rightLandingLeg = new THREE.Mesh(landingLegGeo, materials.chassisSteel);
  rightLandingLeg.position.set(0.95, 0.7, -4.2);
  trailer.add(rightLandingLeg);

  // Landing Gear Crossbrace
  const braceGeo = new THREE.BoxGeometry(1.8, 0.1, 0.1);
  const brace = new THREE.Mesh(braceGeo, materials.chassisSteel);
  brace.position.set(0, 0.85, -4.2);
  trailer.add(brace);

  // Sliding Tandem Axles (Bridge Law legal rear tandem bogie)
  const tandemPositions = [-12.2, -13.5];
  tandemPositions.forEach((pos) => {
    const leftTandem = createWheel(materials, true);
    leftTandem.position.set(-1.08, 0.52, pos);
    trailer.add(leftTandem);

    const rightTandem = createWheel(materials, true);
    rightTandem.position.set(1.08, 0.52, pos);
    rightTandem.rotation.y = Math.PI;
    trailer.add(rightTandem);
  });

  // Rear Heavy Underride Guard (ICC DOT Bumper)
  const dotBumperGeo = new THREE.BoxGeometry(2.35, 0.22, 0.15);
  const dotBumper = new THREE.Mesh(dotBumperGeo, materials.chassisSteel);
  dotBumper.position.set(0, 0.52, -15.1);
  trailer.add(dotBumper);

  // Rear Mudflaps
  const mudflapGeo = new THREE.BoxGeometry(0.55, 0.65, 0.04);
  const leftMudflap = new THREE.Mesh(mudflapGeo, materials.rubberTire);
  leftMudflap.position.set(-1.05, 0.55, -14.2);
  trailer.add(leftMudflap);

  const rightMudflap = new THREE.Mesh(mudflapGeo, materials.rubberTire);
  rightMudflap.position.set(1.05, 0.55, -14.2);
  trailer.add(rightMudflap);

  // Rear Double Swing Doors Framing & Vertical Locking Bars
  const lockBarGeo = new THREE.CylinderGeometry(0.025, 0.025, trailerHeight - 0.2, 8);
  const leftLockBar = new THREE.Mesh(lockBarGeo, materials.chrome);
  leftLockBar.position.set(-0.4, 2.55, -15.12);
  trailer.add(leftLockBar);

  const rightLockBar = new THREE.Mesh(lockBarGeo, materials.chrome);
  rightLockBar.position.set(0.4, 2.55, -15.12);
  trailer.add(rightLockBar);

  // DOT Red/White Reflective Tape Line
  const dotTapeGeo = new THREE.BoxGeometry(trailerWidth + 0.02, 0.06, 0.02);
  const rearTape = new THREE.Mesh(dotTapeGeo, materials.dotTape);
  rearTape.position.set(0, 1.15, -15.12);
  trailer.add(rearTape);

  // Rear Brake Lights
  const leftBrake = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.12, 0.04), materials.brakeLight);
  leftBrake.position.set(-0.95, 0.65, -15.13);
  trailer.add(leftBrake);

  const rightBrake = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.12, 0.04), materials.brakeLight);
  rightBrake.position.set(0.95, 0.65, -15.13);
  trailer.add(rightBrake);

  return trailer;
};

/**
 * Creates 53-Foot Refrigerated (Reefer) Semi-Trailer
 */
const createReeferTrailer = (
  materials: ReturnType<typeof createTruckMaterials>
): THREE.Group => {
  const trailer = new THREE.Group();
  trailer.name = 'ReeferTrailer';

  // Base 53' trailer box
  const baseBox = createDryVanTrailer(materials);
  trailer.add(baseBox);

  // Nose-Mounted Thermo King / Carrier Diesel Refrigeration Unit
  const reeferUnitGroup = new THREE.Group();
  reeferUnitGroup.position.set(0, 2.85, -1.2);

  // Main Cooling Enclosure
  const reeferBoxGeo = new THREE.BoxGeometry(1.65, 1.45, 0.55);
  const reeferBox = new THREE.Mesh(reeferBoxGeo, materials.compositeWall);
  reeferBox.castShadow = true;
  reeferUnitGroup.add(reeferBox);

  // Top Chrome Condenser Exhaust Grill
  const grillGeo = new THREE.BoxGeometry(1.35, 0.35, 0.08);
  const grill = new THREE.Mesh(grillGeo, materials.chrome);
  grill.position.set(0, 0.42, 0.28);
  reeferUnitGroup.add(grill);

  // Digital Temperature Status Display (Green glowing LED screen)
  const displayGeo = new THREE.BoxGeometry(0.35, 0.16, 0.04);
  const displayMat = new THREE.MeshStandardMaterial({
    color: 0x10b981,
    emissive: 0x10b981,
    emissiveIntensity: 0.9,
    roughness: 0.2,
  });
  const display = new THREE.Mesh(displayGeo, displayMat);
  display.position.set(-0.45, -0.25, 0.29);
  reeferUnitGroup.add(display);

  trailer.add(reeferUnitGroup);

  // Undermount 50-Gallon Reefer Diesel Fuel Tank
  const fuelTankGeo = new THREE.CylinderGeometry(0.32, 0.32, 1.4, 16);
  fuelTankGeo.rotateX(Math.PI / 2);
  const fuelTank = new THREE.Mesh(fuelTankGeo, materials.brushedAluminum);
  fuelTank.position.set(-0.65, 0.68, -6.5);
  fuelTank.castShadow = true;
  trailer.add(fuelTank);

  return trailer;
};

/**
 * Creates 48-Foot / 53-Foot Flatbed Platform Trailer with Bulkhead and Payload
 */
const createFlatbedTrailer = (
  materials: ReturnType<typeof createTruckMaterials>
): THREE.Group => {
  const trailer = new THREE.Group();
  trailer.name = 'FlatbedTrailer';

  const deckLength = 13.5;
  const deckWidth = 2.45;

  // Main Heavy I-Beam Steel Chassis Rails
  const beamGeo = new THREE.BoxGeometry(0.9, 0.38, deckLength);
  const beam = new THREE.Mesh(beamGeo, materials.chassisSteel);
  beam.position.set(0, 1.15, -8.0);
  beam.castShadow = true;
  trailer.add(beam);

  // Extruded Aluminum & Apitong Hardwood Platform Deck (Floor height ~60")
  const deckGeo = new THREE.BoxGeometry(deckWidth, 0.16, deckLength);
  const deck = new THREE.Mesh(deckGeo, materials.hardwoodDeck);
  deck.position.set(0, 1.42, -8.0);
  deck.castShadow = true;
  deck.receiveShadow = true;
  trailer.add(deck);

  // Side Rub Rails & Stake Pockets
  const railGeo = new THREE.BoxGeometry(0.08, 0.18, deckLength);
  const leftRail = new THREE.Mesh(railGeo, materials.brushedAluminum);
  leftRail.position.set(-1.24, 1.42, -8.0);
  trailer.add(leftRail);

  const rightRail = new THREE.Mesh(railGeo, materials.brushedAluminum);
  rightRail.position.set(1.24, 1.42, -8.0);
  trailer.add(rightRail);

  // Steel Front Bulkhead / Headache Rack (DOT Cab Guard)
  const bulkheadGeo = new THREE.BoxGeometry(deckWidth, 1.65, 0.12);
  const bulkhead = new THREE.Mesh(bulkheadGeo, materials.chassisSteel);
  bulkhead.position.set(0, 2.25, -1.35);
  bulkhead.castShadow = true;
  trailer.add(bulkhead);

  // Bulkhead Top Guard Bar
  const guardBar = new THREE.Mesh(new THREE.BoxGeometry(deckWidth + 0.1, 0.1, 0.15), materials.chrome);
  guardBar.position.set(0, 3.1, -1.35);
  trailer.add(guardBar);

  // Landing Gear
  const landingLegGeo = new THREE.BoxGeometry(0.18, 0.95, 0.18);
  const leftLanding = new THREE.Mesh(landingLegGeo, materials.chassisSteel);
  leftLanding.position.set(-0.95, 0.65, -4.2);
  trailer.add(leftLanding);

  const rightLanding = new THREE.Mesh(landingLegGeo, materials.chassisSteel);
  rightLanding.position.set(0.95, 0.65, -4.2);
  trailer.add(rightLanding);

  // 10' 1" Split Spread Axles (Allows 40,000 lbs on tandem)
  const spreadPositions = [-11.4, -14.4];
  spreadPositions.forEach((pos) => {
    const leftWheel = createWheel(materials, true);
    leftWheel.position.set(-1.08, 0.52, pos);
    trailer.add(leftWheel);

    const rightWheel = createWheel(materials, true);
    rightWheel.position.set(1.08, 0.52, pos);
    rightWheel.rotation.y = Math.PI;
    trailer.add(rightWheel);
  });

  // Sliding Winches with Ratchet Straps
  for (let z = -3.5; z >= -12.5; z -= 2.2) {
    const winch = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.14, 0.14), materials.chassisSteel);
    winch.position.set(-1.26, 1.25, z);
    trailer.add(winch);

    // Orange strap over deck
    const strapGeo = new THREE.BoxGeometry(deckWidth + 0.05, 0.02, 0.1);
    const strap = new THREE.Mesh(strapGeo, materials.tieDownStrap);
    strap.position.set(0, 2.3, z);
    trailer.add(strap);
  }

  // Realistic Industrial Cargo Payload: Steel Coils / Pipe Bundle on Hardwood Dunnage
  const payloadGroup = new THREE.Group();
  payloadGroup.position.set(0, 2.0, -8.0);

  // Heavy Machinery / Industrial Units securely lashed
  const crateGeo1 = new THREE.BoxGeometry(1.85, 1.15, 3.2);
  const crate1 = new THREE.Mesh(crateGeo1, materials.industrialYellow);
  crate1.position.set(0, 0, 1.8);
  crate1.castShadow = true;
  payloadGroup.add(crate1);

  const crateGeo2 = new THREE.BoxGeometry(1.85, 1.15, 3.2);
  const crate2 = new THREE.Mesh(crateGeo2, materials.industrialYellow);
  crate2.position.set(0, 0, -2.0);
  crate2.castShadow = true;
  payloadGroup.add(crate2);

  trailer.add(payloadGroup);

  // DOT Bumper & Rear Lights
  const dotBumper = new THREE.Mesh(new THREE.BoxGeometry(2.35, 0.22, 0.15), materials.chassisSteel);
  dotBumper.position.set(0, 0.52, -14.8);
  trailer.add(dotBumper);

  return trailer;
};

/**
 * Creates Step Deck (Drop Deck) Trailer with Upper Gooseneck & Low Main Well
 */
const createStepDeckTrailer = (
  materials: ReturnType<typeof createTruckMaterials>
): THREE.Group => {
  const trailer = new THREE.Group();
  trailer.name = 'StepDeckTrailer';

  // 1. Upper Gooseneck Deck (Standard 60" Dock Height, 11' length)
  const upperDeckGeo = new THREE.BoxGeometry(2.45, 0.18, 3.2);
  const upperDeck = new THREE.Mesh(upperDeckGeo, materials.hardwoodDeck);
  upperDeck.position.set(0, 1.48, -2.8);
  upperDeck.castShadow = true;
  trailer.add(upperDeck);

  // Gooseneck Transition Drop Step (20" vertical drop)
  const dropStepGeo = new THREE.BoxGeometry(2.45, 0.52, 0.2);
  const dropStep = new THREE.Mesh(dropStepGeo, materials.chassisSteel);
  dropStep.position.set(0, 1.18, -4.4);
  trailer.add(dropStep);

  // 2. Low-Profile Main Well (Dropped to ~36" ground clearance for tall oversize freight)
  const lowerDeckLength = 10.2;
  const lowerDeckGeo = new THREE.BoxGeometry(2.45, 0.18, lowerDeckLength);
  const lowerDeck = new THREE.Mesh(lowerDeckGeo, materials.hardwoodDeck);
  lowerDeck.position.set(0, 0.94, -9.6);
  lowerDeck.castShadow = true;
  lowerDeck.receiveShadow = true;
  trailer.add(lowerDeck);

  // Chassis Main Spine
  const spineGeo = new THREE.BoxGeometry(0.9, 0.35, 13.2);
  const spine = new THREE.Mesh(spineGeo, materials.chassisSteel);
  spine.position.set(0, 0.72, -8.0);
  spine.castShadow = true;
  trailer.add(spine);

  // Heavy Equipment Payload on Low Deck (Tracked Excavator Cab / Construction Core)
  const machineGeo = new THREE.BoxGeometry(2.1, 2.1, 4.8);
  const machine = new THREE.Mesh(machineGeo, materials.industrialYellow);
  machine.position.set(0, 2.05, -8.8);
  machine.castShadow = true;
  trailer.add(machine);

  // Low-Profile Tandem Axles
  const tandemPositions = [-12.2, -13.5];
  tandemPositions.forEach((pos) => {
    const leftWheel = createWheel(materials, true);
    leftWheel.position.set(-1.08, 0.52, pos);
    trailer.add(leftWheel);

    const rightWheel = createWheel(materials, true);
    rightWheel.position.set(1.08, 0.52, pos);
    rightWheel.rotation.y = Math.PI;
    trailer.add(rightWheel);
  });

  // DOT Bumper
  const dotBumper = new THREE.Mesh(new THREE.BoxGeometry(2.35, 0.22, 0.15), materials.chassisSteel);
  dotBumper.position.set(0, 0.52, -14.8);
  trailer.add(dotBumper);

  return trailer;
};

/**
 * Creates 26-Foot Box Truck (Straight Medium-Duty Delivery Truck, Class 6)
 */
const createBoxTruck = (
  materials: ReturnType<typeof createTruckMaterials>
): THREE.Group => {
  const boxTruck = new THREE.Group();
  boxTruck.name = 'BoxTruck';

  // 1. Medium Duty Straight Cab (Freightliner M2 / International MV style)
  const cabGeo = new THREE.BoxGeometry(2.2, 1.9, 2.2);
  const cab = new THREE.Mesh(cabGeo, materials.cabPaint);
  cab.position.set(0, 1.85, 2.1);
  cab.castShadow = true;
  boxTruck.add(cab);

  // Short Sloping Medium Hood
  const hoodGeo = new THREE.BoxGeometry(1.95, 1.1, 1.6);
  const hood = new THREE.Mesh(hoodGeo, materials.cabPaint);
  hood.position.set(0, 1.35, 3.8);
  hood.castShadow = true;
  boxTruck.add(hood);

  // Front Grille & Heavy Bumper
  const grille = new THREE.Mesh(new THREE.BoxGeometry(1.4, 0.85, 0.08), materials.chrome);
  grille.position.set(0, 1.3, 4.62);
  boxTruck.add(grille);

  const bumper = new THREE.Mesh(new THREE.BoxGeometry(2.3, 0.38, 0.2), materials.chassisSteel);
  bumper.position.set(0, 0.58, 4.62);
  bumper.castShadow = true;
  boxTruck.add(bumper);

  // Windshield
  const windshield = new THREE.Mesh(new THREE.BoxGeometry(1.85, 0.75, 0.08), materials.tintedGlass);
  windshield.position.set(0, 2.05, 3.18);
  windshield.rotation.x = -0.22;
  boxTruck.add(windshield);

  // Single Continuous Frame Rails (Rigid Truck)
  const chassisGeo = new THREE.BoxGeometry(0.85, 0.25, 9.8);
  const chassis = new THREE.Mesh(chassisGeo, materials.chassisSteel);
  chassis.position.set(0, 0.65, -0.6);
  chassis.castShadow = true;
  boxTruck.add(chassis);

  // 2. 26-Foot Dry Cargo Freight Box
  const boxGeo = new THREE.BoxGeometry(2.4, 2.55, 7.4);
  const box = new THREE.Mesh(boxGeo, materials.compositeWall);
  box.position.set(0, 2.3, -2.5);
  box.castShadow = true;
  boxTruck.add(box);

  // Aluminum Roof Cap
  const roof = new THREE.Mesh(new THREE.BoxGeometry(2.44, 0.08, 7.44), materials.aluminumRoof);
  roof.position.set(0, 3.6, -2.5);
  boxTruck.add(roof);

  // 3. Hydraulic Tuckunder Power Liftgate (Folded at Rear)
  const liftgatePlatformGeo = new THREE.BoxGeometry(2.1, 0.08, 1.2);
  const liftgatePlatform = new THREE.Mesh(liftgatePlatformGeo, materials.chassisSteel);
  liftgatePlatform.position.set(0, 0.48, -6.6);
  liftgatePlatform.castShadow = true;
  boxTruck.add(liftgatePlatform);

  // Liftgate Hydraulic Arm Cylinders
  const cylinderGeo = new THREE.CylinderGeometry(0.06, 0.06, 0.65, 12);
  const leftCylinder = new THREE.Mesh(cylinderGeo, materials.chrome);
  leftCylinder.position.set(-0.75, 0.65, -6.3);
  leftCylinder.rotation.x = 0.5;
  boxTruck.add(leftCylinder);

  const rightCylinder = new THREE.Mesh(cylinderGeo, materials.chrome);
  rightCylinder.position.set(0.75, 0.65, -6.3);
  rightCylinder.rotation.x = 0.5;
  boxTruck.add(rightCylinder);

  // Wheels: Front Steer Axle (Single) & Rear Drive Axle (Dual)
  const leftFront = createWheel(materials, false);
  leftFront.position.set(-1.05, 0.52, 3.4);
  boxTruck.add(leftFront);

  const rightFront = createWheel(materials, false);
  rightFront.position.set(1.05, 0.52, 3.4);
  rightFront.rotation.y = Math.PI;
  boxTruck.add(rightFront);

  const leftRear = createWheel(materials, true);
  leftRear.position.set(-1.05, 0.52, -4.2);
  boxTruck.add(leftRear);

  const rightRear = createWheel(materials, true);
  rightRear.position.set(1.05, 0.52, -4.2);
  rightRear.rotation.y = Math.PI;
  boxTruck.add(rightRear);

  return boxTruck;
};

/**
 * Creates Sanitary / Chemical Liquid Tanker Semi-Trailer
 */
const createTankerTrailer = (
  materials: ReturnType<typeof createTruckMaterials>
): THREE.Group => {
  const trailer = new THREE.Group();
  trailer.name = 'TankerTrailer';

  const tankLength = 13.2;

  // 1. Polished Cylindrical / Elliptical Stainless Steel Vessel
  const tankGeo = new THREE.CylinderGeometry(1.15, 1.15, tankLength, 32);
  tankGeo.rotateX(Math.PI / 2);
  const tank = new THREE.Mesh(tankGeo, materials.tankerShell);
  tank.position.set(0, 2.15, -8.0);
  tank.castShadow = true;
  tank.receiveShadow = true;
  trailer.add(tank);

  // Hemispherical Front & Rear Heads (Caps)
  const headGeo = new THREE.SphereGeometry(1.15, 24, 16, 0, Math.PI * 2, 0, Math.PI / 2);

  const frontHead = new THREE.Mesh(headGeo, materials.tankerShell);
  frontHead.position.set(0, 2.15, -1.4);
  trailer.add(frontHead);

  const rearHead = new THREE.Mesh(headGeo, materials.tankerShell);
  rearHead.position.set(0, 2.15, -14.6);
  rearHead.rotation.x = Math.PI;
  trailer.add(rearHead);

  // Top Walkway with Safety Railing
  const walkwayGeo = new THREE.BoxGeometry(0.65, 0.05, 9.5);
  const walkway = new THREE.Mesh(walkwayGeo, materials.brushedAluminum);
  walkway.position.set(0, 3.32, -8.0);
  trailer.add(walkway);

  // Top Inspection Sealed Manhole Hatches (3 Domes)
  const domePositions = [-4.5, -8.0, -11.5];
  domePositions.forEach((pos) => {
    const domeGeo = new THREE.CylinderGeometry(0.35, 0.38, 0.2, 16);
    const dome = new THREE.Mesh(domeGeo, materials.chrome);
    dome.position.set(0, 3.42, pos);
    trailer.add(dome);
  });

  // Rear Access Ladder
  const ladderGeo = new THREE.BoxGeometry(0.35, 2.2, 0.08);
  const ladder = new THREE.Mesh(ladderGeo, materials.brushedAluminum);
  ladder.position.set(0, 2.0, -14.85);
  trailer.add(ladder);

  // Bottom Center Discharge Manifold & 4" Quick-Connect Camlock Pipe
  const pipeGeo = new THREE.CylinderGeometry(0.12, 0.12, 1.2, 16);
  pipeGeo.rotateZ(Math.PI / 2);
  const pipe = new THREE.Mesh(pipeGeo, materials.chrome);
  pipe.position.set(0, 0.85, -8.0);
  trailer.add(pipe);

  // Hose Carrier Tubes Along Lower Sides
  const hoseGeo = new THREE.CylinderGeometry(0.15, 0.15, 8.5, 16);
  hoseGeo.rotateX(Math.PI / 2);
  const leftHose = new THREE.Mesh(hoseGeo, materials.brushedAluminum);
  leftHose.position.set(-1.18, 1.15, -8.0);
  trailer.add(leftHose);

  const rightHose = new THREE.Mesh(hoseGeo, materials.brushedAluminum);
  rightHose.position.set(1.18, 1.15, -8.0);
  trailer.add(rightHose);

  // Landing Gear
  const landingLegGeo = new THREE.BoxGeometry(0.18, 0.95, 0.18);
  const leftLanding = new THREE.Mesh(landingLegGeo, materials.chassisSteel);
  leftLanding.position.set(-0.95, 0.65, -4.2);
  trailer.add(leftLanding);

  const rightLanding = new THREE.Mesh(landingLegGeo, materials.chassisSteel);
  rightLanding.position.set(0.95, 0.65, -4.2);
  trailer.add(rightLanding);

  // Tandem Axles
  const tandemPositions = [-12.2, -13.5];
  tandemPositions.forEach((pos) => {
    const leftWheel = createWheel(materials, true);
    leftWheel.position.set(-1.08, 0.52, pos);
    trailer.add(leftWheel);

    const rightWheel = createWheel(materials, true);
    rightWheel.position.set(1.08, 0.52, pos);
    rightWheel.rotation.y = Math.PI;
    trailer.add(rightWheel);
  });

  // DOT Bumper
  const dotBumper = new THREE.Mesh(new THREE.BoxGeometry(2.35, 0.22, 0.15), materials.chassisSteel);
  dotBumper.position.set(0, 0.52, -14.8);
  trailer.add(dotBumper);

  return trailer;
};

/**
 * Main factory function to construct a complete, self-contained 3D commercial vehicle assembly
 * based on TruckTypeId.
 */
export const build3DTruckModel = (truckId: TruckTypeId, colorHex: string = '#02a2f0'): THREE.Group => {
  const root = new THREE.Group();
  root.name = `CommercialTruck_${truckId}`;

  const materials = createTruckMaterials(colorHex);

  // Box Truck is a rigid single unit; semi-trailers combine Class 8 Tractor + Specialized Trailer
  if (truckId === 'box-truck') {
    const boxTruck = createBoxTruck(materials);
    // Center model at origin
    boxTruck.position.z = 1.0;
    root.add(boxTruck);
  } else {
    // 1. Long-Haul Tractor Unit
    const tractor = createClass8Tractor(materials);
    root.add(tractor);

    // 2. Specialized Trailer
    let trailer: THREE.Group;
    switch (truckId) {
      case 'dry-van':
        trailer = createDryVanTrailer(materials);
        break;
      case 'reefer':
        trailer = createReeferTrailer(materials);
        break;
      case 'flatbed':
        trailer = createFlatbedTrailer(materials);
        break;
      case 'step-deck':
        trailer = createStepDeckTrailer(materials);
        break;
      case 'tanker':
        trailer = createTankerTrailer(materials);
        break;
      default:
        trailer = createDryVanTrailer(materials);
    }
    root.add(trailer);

    // Center the combined 53' semi rig so camera orbits around center of mass
    root.position.z = 6.2;
  }

  return root;
};
