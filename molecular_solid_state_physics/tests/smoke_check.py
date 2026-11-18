"""Offline integrity smoke check (no external CDN)."""
from pathlib import Path
root=Path(__file__).resolve().parents[1]
assert all((root/n).exists() for n in ('index.html','styles.css','app.js','README.md'))
html=(root/'index.html').read_text()
js=(root/'app.js').read_text()
for item in ('molecule','crystal','materials','super'):
    assert f'data-id="{item}"' in html
    assert f"{item}:" in js or f"'{item}'" in js
assert 'three@' in js and 'text/csv' in js
print('PASS: project files, four stations, Three.js and CSV source present')
