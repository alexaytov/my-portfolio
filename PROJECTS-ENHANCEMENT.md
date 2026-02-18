# Projects Section Enhancement

This document describes the major enhancement made to the projects section of the portfolio.

## What Changed

The projects section was completely redesigned to provide:
1. **Featured Project Carousel** on homepage
2. **Enhanced Projects Grid** with filtering and search
3. **Individual Project Detail Pages** for deep dives

## New Features

### 1. Homepage Carousel
- **Location**: Homepage `/#project` section
- **What it shows**: Last 10 projects (sorted by date, newest first)
- **Priority**: Collection projects first, then YAML as fallback
- **Navigation**: Dots at bottom, left/right arrows, swipe on mobile
- **Responsive**: Stacks vertically on mobile devices
- **Implementation**: Pure CSS (no JavaScript dependencies)

### 2. Projects Grid Page
- **URL**: `/projects/` or `/project/`
- **Features**:
  - Search bar (real-time filtering by title)
  - Category filter (automation, design, infrastructure, security, volunteer, university)
  - Sort options (newest, oldest, A-Z, Z-A)
  - Project count display
  - Enhanced card design with hover effects
- **Responsive**: 3 columns desktop, 2 columns tablet, 1 column mobile

### 3. Individual Project Pages
- **URL Pattern**: `/projects/project-slug/`
- **Sections**:
  - Hero with project title, excerpt, category, date, company
  - Action buttons (GitHub, Demo, Project URL if available)
  - Main project image
  - Full markdown content with custom sections
  - Tech stack display
  - Tags display
  - Related projects links
- **SEO**: Each project gets its own URL, meta tags, and Open Graph data

## File Structure

```
_projects/                          # New collection directory
├── autopi-python-executor.md       # Example project file
├── facesup-visualizer.md           # Example project file
└── autopi-execution-redesign.md    # Example project file

_includes/
├── project-carousel.html           # New carousel component
└── project.html                    # Updated to use carousel

_layouts/
├── project-detail.html             # New layout for individual pages
├── projects-grid.html              # New layout for all projects page
└── project.html                    # Old layout (kept for reference)

_data/
├── projects.yml                    # Legacy data (still used as fallback)
└── university-projects.yml         # Legacy data (still used as fallback)

migrate-projects.rb                 # Migration script (YAML → Markdown)
```

## How to Use

### For Visitors
1. **Homepage**: See featured projects in carousel, click to view details
2. **All Projects**: Click "View All Projects" to see full grid
3. **Search**: Type in search box to filter by name
4. **Filter**: Use category dropdown to see specific types
5. **Sort**: Change sort order with dropdown
6. **Details**: Click any project card to see full information

### For Development

#### Adding a New Project

1. Create a new file in `_projects/` directory:
```bash
touch _projects/my-new-project.md
```

2. Add front matter and content:
```yaml
---
title: "My New Project"
slug: my-new-project
excerpt: "Brief description of the project"
category: automation
tags: [Python, Docker, Kubernetes]
tech_stack: [Python, FastAPI, Docker, K8s]
date: 2024-12-15
project_url: "https://example.com"
github_url: "https://github.com/user/repo"
demo_url: ""
image: /i533837/my-portfolio/assets/images/my-project.png
company: SAP
---

## Overview
Describe what the project is about...

## Problem Statement
What problem did this solve?

## Solution
How did you approach it?

## Results & Impact
What was the outcome?
```

3. Build and preview:
```bash
bundle exec jekyll serve
```

4. Visit:
   - Carousel: http://localhost:4000/i533837/my-portfolio/#project
   - Grid: http://localhost:4000/i533837/my-portfolio/projects/
   - Detail: http://localhost:4000/i533837/my-portfolio/projects/my-new-project/

#### Migrating Existing YAML Projects

Run the migration script to convert all YAML projects to markdown:

```bash
ruby migrate-projects.rb
```

This will:
- Create markdown files for all projects in `_data/projects.yml`
- Create markdown files for all projects in `_data/university-projects.yml`
- Add placeholder content that you can fill in
- Preserve all existing data (name, description, image, link)

After migration:
1. Review generated files in `_projects/`
2. Fill in detailed content for important projects
3. Ensure dates are correct (carousel shows last 10 by date)
4. Add tags and tech_stack arrays
5. Test thoroughly
6. Archive or remove YAML files once satisfied

## Technical Details

### Collections Configuration

Added to `_config.yml`:
```yaml
collections:
  projects:
    output: true
    permalink: /projects/:slug/

defaults:
  - scope:
      type: 'projects'
    values:
      layout: project-detail
```

### Carousel Implementation

- **Type**: Pure CSS (no JavaScript!)
- **Navigation**: Radio buttons control slides
- **Arrows**: Label elements point to previous/next radio buttons
- **Responsive**: Media queries for mobile/tablet/desktop
- **Accessible**: ARIA labels on controls
- **Performance**: Hardware-accelerated CSS transforms

### Filtering/Search

- **Implementation**: Vanilla JavaScript (no dependencies)
- **Performance**: Client-side filtering, instant results
- **Search**: Case-insensitive partial matching on titles
- **Filter**: Category-based filtering
- **Sort**: Multiple sort criteria
- **Count**: Real-time project count display

## Browser Support

- **Modern browsers**: Full feature support
- **IE11**: Graceful degradation (grid without transitions)
- **Mobile**: Touch-friendly, swipe gestures work
- **Accessibility**: Keyboard navigation supported

## Performance

- **No dependencies**: Pure CSS carousel, vanilla JS filtering
- **Lazy loading**: Images load only when visible
- **Optimized CSS**: Minimal selector complexity
- **Fast filtering**: Client-side, no server requests
- **Smooth animations**: Hardware-accelerated transforms

## Future Enhancements

Potential additions for the future:
- [ ] Auto-rotating carousel (currently manual only)
- [ ] Tag-based filtering (in addition to category)
- [ ] Related projects algorithm (based on tags/tech_stack)
- [ ] Project timeline visualization
- [ ] Animated statistics/metrics
- [ ] Image galleries for projects
- [ ] Video/demo embeds
- [ ] Download project assets (if applicable)
- [ ] Share buttons for projects
- [ ] Print-friendly project pages

## Troubleshooting

### Carousel not showing projects
- Verify you have at least 1 project in `_projects/` or `_data/projects.yml`
- Check that project dates are properly formatted (YYYY-MM-DD)
- Ensure project images exist at specified paths
- Rebuild site with `bundle exec jekyll serve`

### Projects not appearing in grid
- Verify `_config.yml` has collections configured
- Check that project files are in `_projects/` directory
- Ensure front matter is valid YAML

### Search/filter not working
- Check browser console for JavaScript errors
- Verify HTML structure matches JavaScript selectors
- Clear browser cache and reload

### Broken project links
- Verify `slug` matches filename (without .md)
- Check `baseurl` configuration in `_config.yml`
- Ensure no spaces or special characters in slugs

## Questions?

Refer to `CLAUDE.md` for architecture details or create an issue if you encounter problems.
