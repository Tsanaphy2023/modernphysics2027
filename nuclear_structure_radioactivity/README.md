# Nuclear Structure & Radioactivity Lab 2027

Interactive browser lab in Thai. Part of Modern Physics Virtual Laboratory 2027.

## Run

From this folder:

```sh
python3 -m http.server 8007
```
Open http://localhost:8007. Internet is needed for Three.js CDN; a 2D Canvas fallback is provided if the 3D engine cannot load.

## Stations
1. Nuclear composition, empirical radius R = 1.2 A^(1/3) fm, nuclear mass.
2. Mass defect and binding energy, using representative atomic masses for selected nuclides; empirical Bethe–Weizsäcker liquid-drop curve for graphical trends and manually entered Z/A.
3. Illustrative alpha/beta-minus/beta-plus/gamma nuclear transformations. Selecting a transformation does **not** assert that the chosen isotope physically decays by that mode. The outgoing particle track is qualitative.
4. Exponential radioactive decay: N(t) = N0 exp(-lambda*t), lambda = ln(2)/half-life, activity in counts per selected time unit. Activity must be converted to per second to get Bq.

## Assumptions and limitations
- The 3D nucleons are educational visualization: they are **not** computed many-body nuclear wavefunctions.
- Accurate binding calculations for the presets use atomic neutral-atom masses, hydrogen atomic mass and neutron mass, which account for electron mass consistently within the standard approximation (electron binding-energy contributions neglected).
- Non-preset mass defects are estimates from the semi-empirical mass formula and can be inaccurate for light or exotic nuclides. This is prominently labeled in the interface.
- Decay curves show expectations for a population of nuclei, not the deterministic decay of individuals.
- This is a simulation, not a source of radiation and not a radiation safety instrument.

## Files
index.html, styles.css, app.js, README.md.
