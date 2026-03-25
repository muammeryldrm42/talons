export type UnitMode = 'mech' | 'vehicle';

export type UnitDefinition = {
  id: string;
  name: string;
  mode: UnitMode;
  className: string;
  color: string;
  accent: string;
  speed: number;
  armor: number;
  agility: number;
  description: string;
};

export const units: UnitDefinition[] = [
  {
    id: 'vanguard',
    name: 'Vanguard',
    mode: 'mech',
    className: 'Siege Mech',
    color: '#69f3ff',
    accent: '#0f7bff',
    speed: 58,
    armor: 94,
    agility: 44,
    description: 'Heavy frontline mech built for boulevard patrol and steel-yard pushes.',
  },
  {
    id: 'pulse',
    name: 'Pulse',
    mode: 'mech',
    className: 'Scout Mech',
    color: '#ffd166',
    accent: '#ff7a00',
    speed: 86,
    armor: 55,
    agility: 91,
    description: 'Fast recon frame made for rooftop lines, quick turns, and stylish city runs.',
  },
  {
    id: 'forge',
    name: 'Forge',
    mode: 'mech',
    className: 'Industrial Mech',
    color: '#ff8f7a',
    accent: '#ff4d6d',
    speed: 49,
    armor: 88,
    agility: 57,
    description: 'Construction-grade bruiser with massive shoulders and unstoppable momentum.',
  },
  {
    id: 'apex-gt',
    name: 'Apex GT',
    mode: 'vehicle',
    className: 'Arc Racer',
    color: '#ff5d6c',
    accent: '#ffb347',
    speed: 96,
    armor: 51,
    agility: 88,
    description: 'Fast road machine tuned for high-speed loops and glowing city straights.',
  },
  {
    id: 'volt-x',
    name: 'Volt X',
    mode: 'vehicle',
    className: 'Street Coupe',
    color: '#ffd84d',
    accent: '#fff4a0',
    speed: 85,
    armor: 42,
    agility: 94,
    description: 'Quick cornering coupe that feels light, sharp, and ready for alley bursts.',
  },
  {
    id: 'nightline',
    name: 'Nightline',
    mode: 'vehicle',
    className: 'Interceptor',
    color: '#8ba1ff',
    accent: '#69f3ff',
    speed: 90,
    armor: 60,
    agility: 79,
    description: 'Dark street interceptor with broad stance, heavy grip, and clean neon trim.',
  },
  {
    id: 'dust-runner',
    name: 'Dust Runner',
    mode: 'vehicle',
    className: 'Off-Road',
    color: '#f6a15a',
    accent: '#ffe0b2',
    speed: 74,
    armor: 68,
    agility: 72,
    description: 'Off-road bruiser made for outskirts jumps, desert bends, and rough cut roads.',
  },
  {
    id: 'iron-hauler',
    name: 'Iron Hauler',
    mode: 'vehicle',
    className: 'Heavy Carrier',
    color: '#7fd4c3',
    accent: '#b1fff0',
    speed: 62,
    armor: 92,
    agility: 40,
    description: 'A huge road beast with towering bodywork and unstoppable convoy energy.',
  },
];

export type ZoneDefinition = {
  id: string;
  name: string;
  description: string;
  xMin: number;
  xMax: number;
  zMin: number;
  zMax: number;
  minimap: { left: string; top: string; width: string; height: string };
  color: string;
};

export const zones: ZoneDefinition[] = [
  {
    id: 'neo-district',
    name: 'Neo District',
    description: 'Main neon city with wide roads, towers, and the cleanest straight lines.',
    xMin: -42,
    xMax: 40,
    zMin: -44,
    zMax: 24,
    minimap: { left: '8%', top: '16%', width: '44%', height: '42%' },
    color: '#69f3ff',
  },
  {
    id: 'steel-yard',
    name: 'Steel Yard',
    description: 'Industrial sector packed with crates, gantries, and brutal mech silhouettes.',
    xMin: -58,
    xMax: -6,
    zMin: 24,
    zMax: 58,
    minimap: { left: '4%', top: '60%', width: '38%', height: '28%' },
    color: '#ff8f7a',
  },
  {
    id: 'redline-outskirts',
    name: 'Redline Outskirts',
    description: 'Highway loop and dusty outer ring for speed tests, jumps, and long drifts.',
    xMin: 10,
    xMax: 60,
    zMin: 18,
    zMax: 58,
    minimap: { left: '58%', top: '54%', width: '34%', height: '30%' },
    color: '#f6a15a',
  },
  {
    id: 'talons-hangar',
    name: 'Talons Hangar',
    description: 'Polished selection hub with launch platform, tuning bays, and display docks.',
    xMin: 12,
    xMax: 42,
    zMin: -60,
    zMax: -22,
    minimap: { left: '58%', top: '8%', width: '24%', height: '24%' },
    color: '#8ba1ff',
  },
];

export const activities = [
  {
    id: 'zone-run',
    title: 'District Sweep',
    description: 'Visit all four map zones in one session.',
  },
  {
    id: 'velocity',
    title: 'Velocity Spike',
    description: 'Hit 180 KPH in any road unit.',
  },
  {
    id: 'bridge',
    title: 'Bridge Breaker',
    description: 'Cross the elevated link between the city and the outer ring.',
  },
  {
    id: 'unit-swap',
    title: 'Full Arsenal',
    description: 'Take control of both a mech and a vehicle.',
  },
] as const;
