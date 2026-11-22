#!/usr/bin/env bash
set -euo pipefail
mkdir -p public/size-guide
cp size-guide-overrides/size-guide.html public/size-guide/index.html
cp printstuff-wordmark-black.png public/size-guide/printstuff-wordmark-black.png
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
