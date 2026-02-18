---
title: "CodeQL Scan"
slug: codeql-scan
excerpt: "Implementation of the CodeQL scan with Piper and Jenkins"
category: security
tags: [Security, SAST, CI/CD]
tech_stack: [Jenkins, Piper, CodeQL]
date: 2023-06-15
project_url: ""
github_url: ""
demo_url: ""
image: /my-portfolio/assets/images/jenkins.svg.png
company: SAP
---

## Overview

Implemented CodeQL security scanning in CI/CD pipelines using Project Piper and Jenkins, enabling automated static application security testing (SAST) for code repositories.

## Key Features

- **Automated Scanning**: Run on every PR and commit
- **Multi-Language Support**: Java, JavaScript, Python, Go
- **Custom Queries**: Organization-specific security rules
- **Quality Gates**: Block builds with critical vulnerabilities
- **Reporting**: Detailed vulnerability reports and trends

## Technical Approach

- Piper pipeline integration
- CodeQL database creation and analysis
- SARIF result parsing and reporting
- Jenkins Pipeline Library customization
