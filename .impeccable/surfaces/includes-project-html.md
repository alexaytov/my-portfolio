---
version: 1
slug: "includes-project-html"
primary_target: "_includes/project.html"
related_targets: ["_includes/work-panel.html","_includes/work-card.html","_layouts/default.html","assets/js/portfolio.js"]
---

# Combined My Work showcase

Scope: public homepage. User approved a compact My Work section merging professional projects, university work, and talks. Keep Hero, About, full archive/detail pages, and factual source content. Inherit Poppins, purple actions, dark navigation, bordered white cards.

## Direction contract

THESIS: one overview shows the three kinds of work together and lets visitors browse deliberately.
OWN-WORLD: existing portfolio fonts, palette, card/media language, and restrained focus/hover states.
STORY: scan the three categories, explore a card through progress pills/swipe/drag, then open a detail page or full category archive.
FIRST VIEWPORT: My Work heading, short description, three labeled columns. Each shows one complete card, small progress pills, and a category archive link.
FORM: user-approved desktop grid with three independent carousels; below 1024px category tabs expose one carousel. Keep each position when switching categories. Native touch scrolling, mouse dragging, keyboard navigation, reduced-motion support. User requested seven-second progress fills that advance and loop. Pause for hover, keyboard focus, gestures, offscreen carousels, hidden categories and documents. Reduced motion disables autoplay. Empty and singleton categories have no progress controls. Normal links and scroll containers remain usable without JavaScript.
FINISH: verify 1440/1024/834/390/320 layouts, cross-category independence, timed progress, pointer and keyboard navigation, filtering links, no old homepage sections, stable layout, and successful build. Preserve incumbent global design; update route notes only.
