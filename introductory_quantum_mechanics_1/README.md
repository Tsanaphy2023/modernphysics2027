# Modern Physics 2027 — Introductory Quantum Mechanics I

A Thai-language interactive quantum mechanics teaching lab with real-time 3D line/mesh wave visualizations, scientific 2D graphs, six laboratory stations, CSV export, and teaching tasks.

## Contents

1. Wavefunction, probability density, normalization (Gaussian)
2. Time-dependent Schrödinger equation (exact free Gaussian packet) and stationary states
3. Position/momentum operators, expectation values, uncertainty
4. 1D infinite square well (normalized stationary eigenfunctions)
5. Potential step and finite barrier (analytical reflection/transmission)
6. Quantum harmonic oscillator (Hermite–Gaussian eigenfunctions)

## Run

From this directory:

```bash
python3 -m http.server 8004
```

Open http://localhost:8004 . An internet connection is required for Three.js from the CDN (when offline, the app displays a 2D canvas fallback in the 3D view). No install/build required.

## Files

- `index.html` — Thai UI and page structure
- `styles.css` — responsive presentation
- `app.js` — physics calculators, time animation, plotting, 3D interaction, CSV export

## Units and model validity

Unless specified otherwise, all displayed quantities are **dimensionless natural units ℏ = m = 1**. These are educational mathematical models, **not measured experimental datasets**.

- For a Gaussian wavepacket, `σ` is the position standard deviation at t = 0; the variance grows as σ(t)^2 = σ² [1 + (t/(2σ²))²]. This is the exact free-particle wavepacket solution for this convention.
- Momentum expectation ⟨p⟩ = k₀; the minimum-uncertainty Gaussian has Δp = 1/(2σ) initially.
- In the infinite well, Eₙ = n²π²/(2L²), and ψₙ = √(2/L) sin(nπx/L) exp(−iEₙt).
- Reflection/transmission `R`/`T` are analytical 1D scattering coefficients; for a **step** with E<V₀ the transmitted **probability current** is zero although a decaying evanescent wave can exist. For E>V₀ T=4k₁k₂/(k₁+k₂)². Finite barrier coefficients use exact closed forms both below/above barrier.
- The **barrier 3D wave amplitude** is a pedagogical schematic and is **not** derived by exactly matching scattering eigenfunctions at both edges. This schematic is not intended for precise interference/amplitude interpretation; use the analytic T and R readouts for quantitative work.
- Quantum harmonic oscillator eigenstates use standard Hermite polynomials with normalized amplitudes in ℏ=m=1.
- 3D coordinates map Re ψ, Im ψ, |ψ|² into three *separate parallel tracks* for legibility. Physical spatial probability is the yellow curve/area, not the apparent 3D ribbon volume.
- Plots are sampled arrays for visualization. Use analytical readouts for accurate reported physics values.

## Teacher notes

Ask students to compare expected qualitative trends with equations before export. Each station includes a suggested experiment prompt. CSV contains `x`, `Re_psi`, `Im_psi`, `probability_density`, `potential`.

## Credits

Designed as an educational chapter within Modern Physics 2027.
