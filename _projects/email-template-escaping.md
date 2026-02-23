---
title: "HTML Rendering in Email Templates"
slug: email-template-escaping
excerpt: "Enabling proper HTML rendering in custom function templating for notification emails"
category: automation
tags: [Email, Bug Fix, Templating]
tech_stack: [Java, HTML, Templating]
date: 2026-02-23
project_url: ""
github_url: ""
demo_url: ""
image: /my-portfolio/assets/images/notifications.jpg
company: SAP
---

## Overview

Fixed an HTML rendering issue in a custom templating engine used for generating notification emails. The system's aggressive escaping prevented users from including formatted HTML content in their email templates.

## The Problem

The notification system used a custom expression language allowing users to embed dynamic values in email templates. However, all output was HTML-escaped by default, which meant:

- **No Rich Formatting**: Users couldn't include bold text, links, or other HTML formatting
- **Literal Display**: HTML tags appeared as plain text in received emails
- **Limited Customization**: Email templates were restricted to plain text appearance despite being HTML emails

## Solution

Introduced custom syntax that allows template authors to explicitly output raw HTML when needed. This gives users control over when HTML should be rendered versus escaped.

## Key Changes

- **Opt-in Raw Output**: Added syntax for outputting unescaped HTML content
- **Safe by Default**: Regular template expressions remain escaped for security
- **Rich Email Support**: Users can now include formatted content, links, and styling
- **Backward Compatibility**: Existing templates continue to work unchanged

## Technical Approach

- Extended the template expression parser to recognize the new syntax
- Implemented selective escaping based on the expression type
- Maintained default escaping behavior to prevent accidental HTML injection
- Added documentation and examples for template authors
