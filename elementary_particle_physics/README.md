# Particle Physics Lab 2027

Interactive educational simulator for elementary particle physics, organized under `modernphysics2027/elementary_particle_physics/`.

## Run

```sh
cd modernphysics2027/elementary_particle_physics
python3 -m http.server 8008
```

Open http://localhost:8008 . Internet access is needed for Three.js 3D library CDN. A 2D fallback runs when WebGL/Three.js is unavailable.

## Stations

1. Fundamental interactions: electromagnetism, strong, weak, and gravity; simplified 3D force-exchange diagrams, qualitative controls, and inverse-square normalized plot where applicable.
2. Elementary particles: 6 quarks, 6 leptons, photon, gluon, W±, Z⁰ and Higgs boson; properties, masses, charge, spin, selection and 3D visuals.
3. Standard Model explorer: searchable/filterable particle cards, family/generation comparison, data exports, and guided assignments.

## Physical caveats

- The Standard Model includes the strong, weak, electromagnetic interactions; gravity is not part of it. The graviton has not been observed.
- 3D rendered spheres and exchange paths are **conceptual icons**, not literal tracks, field solutions, Feynman diagrams, or particle sizes.
- Strong/weak interaction plots are qualitative schematic functions, **not** QCD/electroweak predictions. Inverse-square plots are normalized classical approximations, not predictions at femtometer distances.
- Particle masses are approximate educational reference values and depend on renormalization scheme for quarks. Neutrino absolute masses are omitted because they are not precisely known.
- W± is represented in one card, the eight gluon states are combined in one card, and antiparticles are not all listed separately.

## Files

- `index.html` user interface
- `styles.css` responsive visual design
- `app.js` particle data, educational models, WebGL scenes, graphs, interactions, CSV
- `README.md` this document
