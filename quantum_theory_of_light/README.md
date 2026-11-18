# Photon Lab 2027 — Quantum Theory of Light

A Thai-language, browser-based, real-time interactive 3D teaching simulator for **five experiments** in quantum theory of light.

## Launch

1. Open a terminal in `modernphysics2027/quantum_theory_of_light`.
2. Run `python3 -m http.server 8001` (or another local web server).
3. Open <http://localhost:8001> in an up-to-date browser. Internet access is required to load Three.js and web fonts from CDNs.
4. Select experiments using the left navigation, adjust instrument controls, and observe the 3D scene and computed graphs. Drag to orbit and scroll to zoom.

## Experiments

| Experiment | Inputs | Outputs / models |
| --- | --- | --- |
| Blackbody radiation and Planck hypothesis | T (1,000–12,000 K), wavelength | Planck spectral radiance Bλ, Wien peak, Stefan–Boltzmann radiant exitance, E = hc/λ |
| Photoelectric effect | wavelength, relative intensity, target metal, countervoltage | Work function, threshold, stopping voltage, Kmax, qualitative collector current |
| X-ray production and spectrum | accelerating voltage, tube current, Cu/Mo/W target | Duane–Hunt cutoff, characteristic Kα/Kβ line locations, illustrative continuum |
| Compton scattering | incident photon energy, angle | wavelength shift, scattered photon energy, electron kinetic energy |
| Pair production and annihilation | photon energy, process mode | pair-creation threshold, upper bound excess energy, 511-keV back-to-back annihilation photons |

## Notes on physics fidelity

- Calculation constants are SI-based, and the interactive graph datasets are computed from the equations rather than prerecorded lookup tables.
- Blackbody curve is spectral radiance **per unit wavelength**, normalized only **for drawing the graph**; numerical radiance in the instrument panel is in SI.
- Photoelectric current is deliberately an *idealized qualitative display*, not a calibrated photoelectric cell or detailed current-versus-voltage response. No electrons are emitted at or below the work-function threshold.
- X-ray bremsstrahlung curve is **qualitative**. Characteristic line energies and K-edges are approximate. K-series lines are displayed only if accelerating energy exceeds the target K-edge; the graph is not a detector response model.
- Compton analysis assumes a free, initially stationary electron.
- Pair creation is portrayed near a nucleus, which must absorb recoil momentum. 2m_e c² is the heavy-nucleus limiting threshold; excess energy is an upper bound on total produced kinetic energy when recoil is nonzero. Annihilation assumes electron and positron initially at rest in the center-of-mass frame.
- 3D geometry, particle size, number, velocities, radii, color, and directions are visually stylized rather than literal or scale-accurate. It is **not** a particle-transport Monte Carlo or photorealistic commercial instrument emulator.
- The **Pause** button pauses scene animation, not numerical recomputation from controls.
- Export button saves the current graph as CSV. Experiment log is in-memory and clears on reload or when switching modules.

## Project structure

```
modernphysics2027/
└── quantum_theory_of_light/
    ├── index.html
    ├── styles.css
    ├── app.js
    └── README.md
```

## Proposed extensions

For future versions: local Three.js bundling for offline use, calibrated photoelectric I–V model, vacuum X-ray tube with selectable anode k-edge, detector response, conservation-of-momentum vector overlays, virtual worksheets, rubric, question bank, and persistent experiment records.
