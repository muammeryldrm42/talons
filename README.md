# Talons

Stylized 3D mech and car sandbox for the browser.

## What is included
- Full-screen 3D experience built with Next.js and React Three Fiber
- Embedded procedural stylized models for 3 mechs and 5 vehicles
- Four playable map sectors: Neo District, Steel Yard, Redline Outskirts, Talons Hangar
- Third-person movement and driving
- Live HUD with minimap, unit selector, activity tracker, and zone discovery
- Hotkeys for instant unit switching
- No external art pipeline required for the base version

## Controls
- `W A S D` — move / drive
- `Shift` — sprint or push extra throttle
- `1` to `8` — switch between units
- `R` — reset session

## Stack
- Next.js
- React 19
- Three.js
- @react-three/fiber
- @react-three/drei
- Zustand

## Run locally
```bash
npm install
npm run dev
```

## Production build
```bash
npm run build
npm run start
```

## Deploy to Vercel
1. Push this folder to a GitHub repository.
2. Import the repo into Vercel.
3. Keep the default Next.js framework settings.
4. Deploy.

No environment variables are required for the base version.

## Notes
This base version intentionally uses embedded stylized geometry instead of branded or ripped external models, so it is easier to ship and extend safely.
