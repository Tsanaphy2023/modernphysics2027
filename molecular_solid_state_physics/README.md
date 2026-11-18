# Molecular & Solid-State Physics Lab 2027

Browser-based, Thai-language realtime interactive educational simulator for Modern Physics Virtual Laboratory 2027.

## Files
- `index.html`: interactive page and 4 stations
- `styles.css`: responsive layout
- `app.js`: physical models, 3D scene, plots, controls, CSV export

## Running
From this directory:
```bash
python3 -m http.server 8006
```
Then open http://localhost:8006 in a recent browser. Three.js is loaded from a CDN and requires internet access. If unavailable, sliders and 2D plots work without 3D.

## Stations
1. **Molecular Bonds & Spectra**: Morse potential U(r)=De(1-exp(-a(r-re)))^2-De; harmonic approximation near minimum, omega=a sqrt(2De/mu). The vibrational spacing is approximated by hbar omega. The app does not calculate a full roto-vibrational spectrum.
2. **Crystal Structure & Energy Bands**: SC/BCC/FCC conventional cubic unit cells; atomic counts 1,2,4. Separate illustrative one-dimensional two-band dispersion with adjustable Eg and hopping t; band diagram is *not* derived from the depicted 3D lattice structure.
3. **Conductors, Insulators, Semiconductors**: metal approximate linear temperature coefficient of resistivity; intrinsic-activated semiconductor and insulator conductivity proportional to exp(-Eg/2kBT). The doping slider is explicitly a qualitative amplitude multiplier, not a quantitative donor/acceptor density treatment.
4. **Superconductivity**: illustrative type-I phenomenological critical field Bc(T)=Bc(0)(1-(T/Tc)^2); ideal superconducting/normal state rule T<Tc and B<Bc(T). Floating magnet is a visual cue only, not a force-balance or flux-pinning solver.

## Physical assumptions and limitations
- All results are deterministic model outputs, not experimentally acquired measurements.
- Atomic spheres, bonds, electronic bands, and magnet sizes are schematic, not to scale.
- `mass` is the molecular reduced mass in atomic mass units.
- Energies are eV and the `a` Morse parameter is inverse Å.
- Exported CSVs include the displayed sampled plot data only.
- Plots remain functional if the CDN fails; the WebGL 3D requires a capable browser.

## Suggested student laboratory workflow
Change one independent variable at a time, record the computed readout, export CSV, graph the data in a spreadsheet, compare with each module's theoretical equation, and describe where the idealized model differs from a physical apparatus.
