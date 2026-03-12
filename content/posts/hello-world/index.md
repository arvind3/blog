---
title: "Hello World: Building This Blog"
date: 2026-03-12
draft: false
description: "A look at how this blog was built with Hugo, Tailwind CSS, and GitHub Pages — designed for a 10-year lifespan."
tags: ["hugo", "blogging", "web-development"]
categories: ["meta"]
math: false
mermaid: false
slides: false
disableComments: false
og_image: ""
---

Welcome to my blog! This is the first post, and it's about how this site was built.

## Why Hugo?

Hugo is the fastest static site generator. It compiles thousands of pages in seconds, ships as a single binary, and has zero runtime dependencies. For a blog that I plan to maintain for 5–10 years, stability and simplicity matter.

## The Stack

Here's what powers this blog:

- **Hugo** — Static site generation with blazing-fast builds
- **Tailwind CSS** — Utility-first styling for a clean, responsive design
- **GitHub Pages** — Free, reliable hosting with HTTPS
- **GitHub Actions** — Automated builds on every push to `main`

## A Simple Workflow

The workflow is intentionally minimal:

1. Write a Markdown file
2. Push to GitHub
3. GitHub Actions builds and deploys automatically

No databases. No servers. No CMS. Just Markdown and Git.

## Code Example

Here's the Hugo command to create a new post:

```bash
hugo new posts/my-new-post/index.md
```

And a Python example for good measure:

```python
def hello_world():
    """A simple greeting."""
    print("Hello from AB's Tech Blog!")

if __name__ == "__main__":
    hello_world()
```

## What's Next

I'll be writing about:

- Engineering deep dives
- AI and machine learning
- Product building lessons
- Tools and workflows

Stay tuned, and feel free to subscribe to the newsletter below.

---

*Thanks for reading! If you found this useful, share it with a friend.*
