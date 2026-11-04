Aleksandar Aytov's portfolio.

Check it out at: https://pages.github.tools.sap/I533837/my-portfolio/#

## Local development

The site uses Ruby 3.4.12, as declared in `.ruby-version`. Install and select that version with your Ruby version manager before running the commands below. GitHub Actions uses the same Ruby version and locked dependencies.

Install the dependencies:

    gem install bundler -v 4.0.23
    bundle install

Start the local development server:

    bundle exec jekyll serve

The site will be available at http://localhost:4000/my-portfolio/ and Jekyll Admin at http://localhost:4000/admin.

## Adding talks and lectures

Talks live in `_talks/`, separately from projects and posts. Add one Markdown file per talk; its filename becomes its address, for example `_talks/my-lecture.md` becomes `/my-portfolio/talks/my-lecture/`.

Start with the following template, replacing the example text before publishing:

```yaml
---
title: "Your talk title"
excerpt: "A short summary of what you presented."
event: "Event or institution"
event_date: "2026-11-04"
format: Lecture
featured: true
---

Write about the talk here. A few paragraphs are enough.
```

- `event_date` controls newest-first ordering. Keep it quoted and use `YYYY-MM-DD`, `YYYY-MM`, or just `YYYY` if that is all you know. The displayed date keeps that precision; `date_label` can optionally describe a range.
- Set `featured: true` to include the talk among the Talks carousel in the homepage My Work section. Omit it or set it to `false` for the Talks page only.
- `format` can be Lecture, Presentation, Workshop, or Talk.
- A write-up needs no image or materials. Omit optional fields entirely and the page adapts.
- For a cover, add `image: /assets/images/talks/your-photo.jpg` and an accurate `image_alt`. An optional `image_caption` appears below the image. Additional photos can go in the Markdown body.
- For materials, add a `resources` list to the front matter. Only supplied links appear. Use root-relative paths for local files (without `/my-portfolio`), percent-encode spaces in resource URLs, or use a complete `https://` URL.

```yaml
resources:
  - label: Slides (PDF)
    url: /assets/talks/my-lecture-slides.pdf
  - label: Materials
    url: https://example.com/course-materials
  - label: Watch recording
    url: https://example.com/recording
  - label: Event page
    url: https://example.com/event
```

The initial two talks reuse the existing public mentorship content and PDFs. Their cover images are rendered from the first PDF page, with the source embedded in each JPEG. Their dates show only the year established by the existing program description.

Restart `jekyll serve` after changing `_config.yml`; edits to talk Markdown and templates are picked up normally by the watcher.


## Homepage work showcase

The homepage groups Projects, University, and Talks in one My Work section. Desktop shows three independent carousels; smaller screens use category tabs. Each carousel has clickable progress pills: the active pill fills over seven seconds, then advances to the next item and loops after the last. Swipe, trackpad scrolling, mouse drag, and keyboard arrows also work. Progress pauses on hover, keyboard focus, touch interaction, hidden browser tabs, hidden categories, and while the carousel is offscreen. Manual selection restarts the timer; category switches preserve it. Reduced-motion preferences disable autoplay and show a static active pill.

Projects shows the five most recent non-university projects. University shows academic projects. Talks shows featured talks, or all talks when none are featured. Content stays in the existing collections; the full archive pages are unchanged. The academic archive link opens `/projects/?category=university` with its filter already selected.
