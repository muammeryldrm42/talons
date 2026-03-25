'use client';

import { create } from 'zustand';
import { activities, units } from '@/lib/talons-data';
import { getZoneId } from '@/lib/world';

export type Position = { x: number; y: number; z: number };

const defaultUnit = units[0];

const createActivityMap = () =>
  Object.fromEntries(activities.map((activity) => [activity.id, false])) as Record<(typeof activities)[number]['id'], boolean>;

type GameState = {
  activeUnitId: string;
  position: Position;
  heading: number;
  speed: number;
  discoveredZones: string[];
  bridgeCrossed: boolean;
  hasUsedMech: boolean;
  hasUsedVehicle: boolean;
  completed: Record<(typeof activities)[number]['id'], boolean>;
  startTime: number;
  setUnit: (unitId: string) => void;
  setMotion: (payload: { position: Position; heading: number; speed: number }) => void;
  registerZone: (position: Position) => void;
  markBridgeCrossed: () => void;
  setVelocityBadge: (active: boolean) => void;
  resetRun: () => void;
};

export const useGameStore = create<GameState>((set) => ({
  activeUnitId: defaultUnit.id,
  position: { x: 18, y: 2, z: -38 },
  heading: Math.PI,
  speed: 0,
  discoveredZones: ['talons-hangar'],
  bridgeCrossed: false,
  hasUsedMech: true,
  hasUsedVehicle: false,
  completed: createActivityMap(),
  startTime: Date.now(),
  setUnit: (unitId) =>
    set((state) => {
      const unit = units.find((entry) => entry.id === unitId) ?? defaultUnit;
      const nextHasUsedMech = state.hasUsedMech || unit.mode === 'mech';
      const nextHasUsedVehicle = state.hasUsedVehicle || unit.mode === 'vehicle';
      return {
        activeUnitId: unitId,
        hasUsedMech: nextHasUsedMech,
        hasUsedVehicle: nextHasUsedVehicle,
        completed: {
          ...state.completed,
          'unit-swap': nextHasUsedMech && nextHasUsedVehicle,
        },
      };
    }),
  setMotion: ({ position, heading, speed }) => set({ position, heading, speed }),
  registerZone: (position) =>
    set((state) => {
      const zoneId = getZoneId(position.x, position.z);
      const discoveredZones = state.discoveredZones.includes(zoneId)
        ? state.discoveredZones
        : [...state.discoveredZones, zoneId];
      return {
        discoveredZones,
        completed: {
          ...state.completed,
          'zone-run': ['neo-district', 'steel-yard', 'redline-outskirts', 'talons-hangar'].every((zone) =>
            discoveredZones.includes(zone),
          ),
        },
      };
    }),
  markBridgeCrossed: () =>
    set((state) => ({
      bridgeCrossed: true,
      completed: {
        ...state.completed,
        bridge: true,
      },
    })),
  setVelocityBadge: (active) =>
    set((state) => ({
      completed: {
        ...state.completed,
        velocity: state.completed.velocity || active,
      },
    })),
  resetRun: () =>
    set({
      activeUnitId: defaultUnit.id,
      position: { x: 18, y: 2, z: -38 },
      heading: Math.PI,
      speed: 0,
      discoveredZones: ['talons-hangar'],
      bridgeCrossed: false,
      hasUsedMech: true,
      hasUsedVehicle: false,
      completed: createActivityMap(),
      startTime: Date.now(),
    }),
}));
