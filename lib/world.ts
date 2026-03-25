import { zones } from '@/lib/talons-data';

export type Vec3Tuple = [number, number, number];

export const WORLD_LIMIT = 62;

export const clampWorld = (value: number) => Math.max(-WORLD_LIMIT, Math.min(WORLD_LIMIT, value));

export function getGroundHeight(x: number, z: number) {
  if (x > 14 && x < 36 && z > -53 && z < -28) {
    return 2;
  }

  if (x > -5 && x < 18 && z > 2 && z < 14) {
    return 3.4;
  }

  if (x > -18 && x < -5 && z > 8 && z < 22) {
    return Math.max(0, (z - 8) * 0.24);
  }

  if (x > 18 && x < 34 && z > 6 && z < 22) {
    return Math.max(0, (22 - z) * 0.24);
  }

  if (x > 25 && x < 42 && z > 28 && z < 38) {
    return 0.8;
  }

  return 0;
}

export function getZoneId(x: number, z: number) {
  return zones.find((zone) => x >= zone.xMin && x <= zone.xMax && z >= zone.zMin && z <= zone.zMax)?.id ?? 'wild-sector';
}

export function getZoneName(zoneId: string) {
  return zones.find((zone) => zone.id === zoneId)?.name ?? 'Wild Sector';
}

export function formatSpeed(speed: number) {
  return Math.round(Math.abs(speed) * 11.8);
}
