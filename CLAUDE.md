# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

This is a Jekyll-based portfolio website for Aleksandar Aytov, hosted on SAP's internal GitHub Pages at `https://pages.github.tools.sap/I533837/my-portfolio/`. The site uses the WhatATheme template and showcases professional projects, university work, and blog posts about technology.

## Development Commands

### Local Development
```bash
# Install dependencies
bundle install

# Serve the site locally (default port 4000)
bundle exec jekyll serve

# Build the site (output to _site/)
bundle exec jekyll build

# Access Jekyll admin interface
# After running serve, navigate to http://localhost:4000/admin
```

## Site Configuration

Key configuration is in `_config.yml`:
- `baseurl: /i533837/my-portfolio` - Required for GitHub Pages deployment on SAP's internal instance
- `url: ''` - Empty by default, set for production if needed
- Site uses Kramdown markdown processor
- Plugins: jekyll-admin (for visual editing), jekyll-feed (for RSS), jekyll-sitemap (for SEO)
- Permalink format: `post/:title`

### Security & SEO

- **Content Security Policy**: Defined in `_includes/head.html` to prevent XSS attacks
- **External Links**: All links with `target="_blank"` include `rel="noopener noreferrer"` for security
- **Lazy Loading**: Images use `loading="lazy"` attribute for performance
- **SEO Meta Tags**: Open Graph and Twitter Card tags use proper `property=` attributes
- **Sitemap**: Automatically generated at `/sitemap.xml` by jekyll-sitemap plugin
- **robots.txt**: Located at root, references sitemap location
- **Google Analytics**: Only loads when `google-analytics` is configured in `_config.yml`

## Content Architecture

### Projects System (NEW - Collection-Based)

Projects are now managed as a Jekyll collection for rich content and individual pages:

**Directory Structure:**
- `_projects/` - Collection of project markdown files
- `_data/projects.yml` - Legacy YAML data (fallback, can be migrated)
- `_data/university-projects.yml` - Legacy YAML data (fallback)

**Project File Structure** (`_projects/project-slug.md`):
```yaml
---
title: "Project Name"
slug: project-slug
excerpt: "Short description"
category: automation|design|infrastructure|security|volunteer|university
tags: [Tag1, Tag2, Tag3]
tech_stack: [Tech1, Tech2, Tech3]
date: 2024-01-15
featured: true  # Shows in homepage carousel (select 3-5)
project_url: ""  # External link (optional)
github_url: ""   # GitHub repo (optional)
demo_url: ""     # Live demo (optional)
image: /i533837/my-portfolio/assets/images/project.png
company: SAP
---

## Overview
[Full markdown content with sections]
```

**Three View Modes:**

1. **Homepage Carousel** (`_includes/project-carousel.html`):
   - Shows the last 10 projects (sorted by date, newest first)
   - Prioritizes collection projects, falls back to YAML if needed
   - Pure CSS carousel with dots and arrow navigation
   - Responsive design (stacks on mobile)
   - Links to project detail pages or external URLs

2. **Projects Grid Page** (`/projects/` using `projects-grid.html` layout):
   - All projects displayed in searchable/filterable grid
   - Filter by category dropdown
   - Real-time search by title
   - Sort by: newest, oldest, A-Z, Z-A
   - Enhanced cards with hover effects
   - Links to detail pages

3. **Project Detail Pages** (`/projects/project-slug/` using `project-detail.html` layout):
   - Full project information with markdown content
   - Tech stack and tags display
   - External links (GitHub, demo, project URL)
   - "Back to Projects" navigation
   - Related projects section

**Migration:**
- Run `ruby migrate-projects.rb` to convert YAML to markdown files
- Script creates placeholder content for each project
- Manually enrich featured projects first
- Fallback: Grid view can still read from YAML if no markdown exists

### Blog Posts
Blog posts follow Jekyll conventions:
- Location: `_posts/` directory
- Naming: `YYYY-MM-DD-title-slug.md`
- Front matter requirements:
  - `layout: post` (set automatically by defaults)
  - `title` - Post title
  - `date` - Publication timestamp
  - `post-image` - Hero image URL (can be external)
  - `description` - Meta description (optional)
  - `tags` - Array of tag strings

Post images can reference assets in `assets/posts/[post-slug]/` for organization.

### Layouts Hierarchy
- `compress.html` - Wrapper for HTML minification
- `default.html` - Homepage layout with sections: navbar → showcase → about → projects → university projects → footer
- `post.html` - Blog post layout with hero section, metadata sidebar, and content
- `posts.html` - Blog listing layout
- `page.html` - Generic page layout
- `blog.html`, `project.html` - Specialized listing pages

### Page Sections (Includes)
The homepage (`index.md`) uses `layout: default` which assembles sections from `_includes/`:
- `navbar.html` - Navigation with active state tracking on scroll
- `showcase.html` - Hero section with background image
- `about.html` - About section with author info from config
- `project.html` - Professional projects grid
- `university.html` - Academic projects grid
- `footer.html` - Site footer with social links

## Important Patterns

### Active Navigation
The navbar uses scroll-based active state tracking (see `_layouts/default.html:24-40`). Each section with class `hero` corresponds to a `navbar-item`. The viewport offset is 200px.

### Image Paths
- Author image: `assets/images/me.jpg`
- Project images: `assets/images/[name]` (various formats)
- Post-specific assets: `assets/posts/[post-slug]/` (recommended pattern observed in existing posts)
- Hero background: External URL in `_config.yml` (`heroimage`)

### Social Media Configuration
All social media and contact links are configured in `_config.yml` under individual keys:
- `email`, `facebook_username`, `linkedin_username`, `github_username`, etc.
- Leave blank to hide that social icon

### Deployment Context
This site is deployed on SAP's internal GitHub Pages instance (`github.tools.sap`), not public GitHub Pages. The `baseurl` setting reflects the `/i533837/my-portfolio` path structure required by that environment.

## Content Guidelines

When creating new blog posts:
1. Use the date format `YYYY-MM-DD` in filename
2. Include a compelling `post-image` (high-quality, 16:9 ratio preferred for layout)
3. Write descriptive `tags` for discoverability
4. Keep descriptions concise (used in meta tags and post cards)
5. Store post-specific images in `assets/posts/[post-slug]/` for organization

When adding projects:
1. Add entry to appropriate YAML file (`projects.yml` or `university-projects.yml`)
2. Follow existing structure: name, image, link, description
3. Use images from `assets/images/` directory
4. Links can be external URLs or relative paths to downloadable files (e.g., `assets/archives/`)
