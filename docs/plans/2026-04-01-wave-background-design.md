# Wave Background Design

**Goal:** Add a subtle, animated water-wave background to all sub-pages (main, about, experience, projects, contact) using Canvas2D.

**Architecture:** Create a new `WaveBackground` component that renders 3-4 layers of sinusoidal wave lines with blue/cyan/green colors on a dark canvas. The component uses `requestAnimationFrame` for smooth animation. It gets integrated into `PageLayout` (covers about/experience/projects/contact) and replaces `SubtleBackground` in the main page. The intro page keeps its existing `FluidBackground` WebGL shader.

**Color Palette (深海蓝绿青):**
- Deep Sea Blue: `#0d3b66` / rgba(13, 59, 102, ...)
- Dark Cyan/Teal: `#0e4d45` / rgba(14, 77, 69, ...)  
- Emerald Green: `#064e3b` / rgba(6, 78, 59, ...)

**Files:**
- Create: `components/WaveBackground.tsx`
- Modify: `components/PageLayout.tsx` — add WaveBackground
- Modify: `app/main/page.tsx` — replace SubtleBackground with WaveBackground
