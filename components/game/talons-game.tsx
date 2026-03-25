'use client';

import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import { activities, units, zones } from '@/lib/talons-data';
import { formatSpeed, getZoneId, getZoneName } from '@/lib/world';
import { useGameStore } from '@/components/game/store';
import { TalonsScene } from '@/components/game/talons-scene';

function MiniMap() {
  const position = useGameStore((state) => state.position);
  const left = `${((position.x + 62) / 124) * 100}%`;
  const top = `${((position.z + 62) / 124) * 100}%`;

  return (
    <div className="mini-map">
      {zones.map((zone) => (
        <div
          key={zone.id}
          className="map-zone"
          style={{
            ...zone.minimap,
            boxShadow: `inset 0 0 0 1px ${zone.color}20`,
          }}
        />
      ))}
      <div className="map-road" style={{ left: '18%', top: '34%', width: '54%', height: '10px' }} />
      <div className="map-road" style={{ left: '22%', top: '38%', width: '12px', height: '34%' }} />
      <div className="map-road" style={{ left: '56%', top: '22%', width: '12px', height: '50%' }} />
      <div className="map-road" style={{ left: '58%', top: '66%', width: '26%', height: '10px' }} />
      <div className="map-bridge" style={{ left: '46%', top: '33%', width: '18%', height: '10px' }} />
      <div className="map-player" style={{ left, top }} />
    </div>
  );
}

function Bar({ label, value }: { label: string; value: number }) {
  return (
    <div className="bar">
      <div className="bar-row">
        <span>{label}</span>
        <span>{value}</span>
      </div>
      <div className="bar-track">
        <div className="bar-fill" style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}

function Hud() {
  const activeUnitId = useGameStore((state) => state.activeUnitId);
  const position = useGameStore((state) => state.position);
  const speed = useGameStore((state) => state.speed);
  const completed = useGameStore((state) => state.completed);
  const discoveredZones = useGameStore((state) => state.discoveredZones);
  const setUnit = useGameStore((state) => state.setUnit);
  const resetRun = useGameStore((state) => state.resetRun);
  const startedAt = useGameStore((state) => state.startTime);

  const activeUnit = units.find((unit) => unit.id === activeUnitId) ?? units[0];
  const activeZoneId = getZoneId(position.x, position.z);
  const activeZone = zones.find((zone) => zone.id === activeZoneId);
  const uptime = Math.max(0, Math.floor((Date.now() - startedAt) / 1000));

  return (
    <div className="overlay">
      <div className="column">
        <div className="panel pad brand">
          <span className="eyebrow">Web Sandbox Prototype</span>
          <h1 className="title">Talons</h1>
          <div className="subtitle">
            Stylized mech and car playground with a built-in city, heavy yard, speed loop, and hangar showcase.
          </div>
          <div className="zone-pill">
            <span className="dot" style={{ background: activeUnit.color }} />
            <span className="badge">{activeUnit.mode}</span>
            <span className="muted">{activeUnit.className}</span>
          </div>
        </div>

        <div className="panel pad">
          <div className="eyebrow">Pilot metrics</div>
          <div className="stat-grid" style={{ marginTop: 12 }}>
            <div className="stat-card">
              <div className="muted">Zone</div>
              <strong>{getZoneName(activeZoneId)}</strong>
            </div>
            <div className="stat-card">
              <div className="muted">Speed</div>
              <strong>{formatSpeed(speed)} KPH</strong>
            </div>
            <div className="stat-card">
              <div className="muted">Position</div>
              <strong>
                {Math.round(position.x)}, {Math.round(position.z)}
              </strong>
            </div>
            <div className="stat-card">
              <div className="muted">Run time</div>
              <strong>{uptime}s</strong>
            </div>
          </div>
        </div>

        <div className="panel pad">
          <div className="eyebrow">Zone map</div>
          <div style={{ marginTop: 12 }}>
            <MiniMap />
          </div>
          <div className="zone-list" style={{ marginTop: 12 }}>
            {zones.map((zone) => (
              <div key={zone.id} className="zone-row">
                <div>
                  <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                    <span className="dot" style={{ background: zone.color }} />
                    <strong>{zone.name}</strong>
                  </div>
                  <div className="muted">{zone.description}</div>
                </div>
                <span className="badge">{discoveredZones.includes(zone.id) ? 'Online' : 'Hidden'}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="column center">
        <div className="top-chip">
          <span className="eyebrow" style={{ margin: 0 }}>
            {activeUnit.name}
          </span>
          <span className="muted">{activeZone?.description ?? 'Outer fringe of the Talons test sector.'}</span>
        </div>

        <div className="panel pad footer-panel">
          <div className="eyebrow">Live systems</div>
          <div className="footer-grid" style={{ marginTop: 12 }}>
            <div className="footer-card">
              <strong>{activeUnit.name}</strong>
              <div className="muted" style={{ marginTop: 8 }}>
                {activeUnit.description}
              </div>
            </div>
            <div className="footer-card">
              <strong>Control profile</strong>
              <div className="muted" style={{ marginTop: 8 }}>
                {activeUnit.mode === 'mech'
                  ? 'WASD to stride, Shift to sprint, camera follows over the shoulder.'
                  : 'WASD to drive, hold reverse for braking, camera stretches wider at speed.'}
              </div>
            </div>
            <div className="footer-card">
              <strong>Build notes</strong>
              <div className="muted" style={{ marginTop: 8 }}>
                Embedded stylized models, no external art pipeline required, ready for GitHub and Vercel.
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="column">
        <div className="panel pad">
          <div className="eyebrow">Unit bay</div>
          <div className="unit-list" style={{ marginTop: 12 }}>
            {units.map((unit) => (
              <button
                key={unit.id}
                type="button"
                className={`unit-card${unit.id === activeUnitId ? ' active' : ''}`}
                onClick={() => setUnit(unit.id)}
              >
                <div className="unit-meta">
                  <strong>{unit.name}</strong>
                  <span className="badge">{unit.mode}</span>
                </div>
                <div className="muted">{unit.className}</div>
                <div className="unit-bars">
                  <Bar label="Speed" value={unit.speed} />
                  <Bar label="Armor" value={unit.armor} />
                  <Bar label="Agility" value={unit.agility} />
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="panel pad">
          <div className="eyebrow">Activities</div>
          <div className="activity-list" style={{ marginTop: 12 }}>
            {activities.map((activity) => (
              <div key={activity.id} className="activity-row">
                <div>
                  <strong>{activity.title}</strong>
                  <div className="muted">{activity.description}</div>
                </div>
                <span className="badge" style={{ color: completed[activity.id] ? 'var(--success)' : 'var(--accent)' }}>
                  {completed[activity.id] ? 'Done' : 'Open'}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="panel pad">
          <div className="eyebrow">Controls</div>
          <div className="help-list" style={{ marginTop: 12 }}>
            <div className="help-row">
              <div className="help-key">W A S D</div>
              <div className="muted">Move or drive the active unit around the Talons district.</div>
            </div>
            <div className="help-row">
              <div className="help-key">Shift</div>
              <div className="muted">Sprint with mechs or add extra throttle authority to cars.</div>
            </div>
            <div className="help-row">
              <div className="help-key">1 - 8</div>
              <div className="muted">Hot-swap directly between all embedded units without leaving the map.</div>
            </div>
            <div className="help-row">
              <div className="help-key">R</div>
              <div className="muted">Reset the session back to the Talons Hangar launch platform.</div>
            </div>
          </div>
          <button type="button" className="unit-card" style={{ marginTop: 14 }} onClick={resetRun}>
            <div className="unit-meta">
              <strong>Reset run</strong>
              <span className="badge">R</span>
            </div>
            <div className="muted">Jump back to the hangar, clear badges, and restart the sandbox loop.</div>
          </button>
        </div>
      </div>
    </div>
  );
}

export default function TalonsGame() {
  return (
    <main className="game-shell">
      <Canvas className="game-canvas" shadows camera={{ position: [12, 10, 18], fov: 48 }} dpr={[1, 1.75]}>
        <color attach="background" args={['#061019']} />
        <fog attach="fog" args={['#061019', 28, 150]} />
        <Suspense fallback={null}>
          <TalonsScene />
        </Suspense>
      </Canvas>
      <Hud />
    </main>
  );
}
