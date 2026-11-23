#!/usr/bin/env bash
set -euo pipefail
mkdir -p public/size-guide
cp size-guide-overrides/size-guide.html public/size-guide/index.html
cp printstuff-wordmark-black.png public/size-guide/printstuff-wordmark-black.png
cat size-guide-overrides/printstuff-redesign.css >> src/index.css
python3 - <<'PY'
from pathlib import Path
p=Path("src/components/Hero.tsx")
s=p.read_text()
s=s.replace('<section className="relative overflow-hidden bg-[#FFF9ED]', '<section id="hero" className="relative overflow-hidden bg-[#FFF9ED]')
s=s.replace('className="text-sm font-black text-white">PRINT THAT LASTS','className="text-sm font-black text-[#202020]">PRINT THAT LASTS')
s=s.replace('className="text-xs text-neutral-400 mt-1">Colour that stays bold','className="text-xs text-[#5E5850] mt-1">Colour that stays bold')
s=s.replace('className="text-sm font-black text-white">FROM 1 PIECE','className="text-sm font-black text-[#202020]">FROM 1 PIECE')
s=s.replace('className="text-xs text-neutral-400 mt-1">Try one or create a whole drop','className="text-xs text-[#5E5850] mt-1">Try one or create a whole drop')
s=s.replace('className="p-4 rounded-xl bg-neutral-900/70 border border-[#08B9E8]/40"','className="p-4 rounded-xl bg-[#E8FAFF] border-2 border-[#202020] shadow-[5px_5px_0_#08B9E8]"')
s=s.replace('className="text-sm font-black text-white">DELIVERED TO YOU','className="text-sm font-black text-[#202020]">DELIVERED TO YOU')
s=s.replace('className="text-xs text-neutral-400 mt-1">Easy WhatsApp ordering','className="text-xs text-[#5E5850] mt-1">Easy WhatsApp ordering')
p.write_text(s)
PY
python3 - <<'PY'
from pathlib import Path
import re
p=Path("src/components/Header.tsx")
s=p.read_text()
if 'href="/size-guide/"' not in s:
    # Add a desktop navigation link immediately after the Custom Print button.
    pattern=r'(\n\s*</button>\s*\n)(\s*</nav>)'
    # Target the nav's last button (Size Guide is added after the existing Custom Print nav item).
    marker='''            Custom Print
          </button>'''
    if marker in s:
        s=s.replace(marker, marker+'''
          <a href="/size-guide/" className="py-1 border-b-2 border-transparent hover:border-[#E6007E] hover:text-[#111114] transition-colors whitespace-nowrap shrink-0">
            Size Guide
          </a>''',1)
    # Add a compact mobile shortcut before the bag action.
    mobile='''          <button
            type="button"
            onClick={onOpenBag}'''
    if mobile in s:
        s=s.replace(mobile,'''          <a href="/size-guide/" className="md:hidden px-3 py-1.5 rounded-full border border-[#E6007E] text-[11px] font-semibold text-[#111114] whitespace-nowrap">
            Size Guide
          </a>
          <button
            type="button"
            onClick={onOpenBag}''',1)
    p.write_text(s)
PY

# Remove only the obsolete announcement text; preserve the Header component and shipping logic.
python3 - <<'PY'
from pathlib import Path
phrase = "Free Pan-India Shipping Over ₹1,999"
for p in Path("src").rglob("*"):
    if p.suffix not in {".tsx", ".ts", ".jsx", ".js", ".html"}:
        continue
    try:
        s = p.read_text()
    except (UnicodeDecodeError, OSError):
        continue
    if phrase in s:
        p.write_text(s.replace(phrase, ""))
        print(f"Removed obsolete shipping announcement text from {p}")
PY
