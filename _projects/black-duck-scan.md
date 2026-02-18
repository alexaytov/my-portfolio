---
title: "Black Duck Scan"
slug: black-duck-scan
excerpt: "Implementation of the Black Duck scan with Piper and Jenkins"
category: security
tags: [Security, SCA, CI/CD]
tech_stack: [Jenkins, Piper, Black Duck]
date: 2023-02-20
project_url: ""
github_url: ""
demo_url: ""
image: /my-portfolio/assets/images/jenkins.svg.png
company: SAP
---

## Overview

Implemented Black Duck software composition analysis (SCA) in CI/CD pipelines using Project Piper and Jenkins, enabling automated detection of security vulnerabilities and license compliance issues in dependencies.

## Key Features

- **Vulnerability Detection**: Identify CVEs in dependencies
- **License Compliance**: Flag incompatible licenses
- **Policy Enforcement**: Block builds violating security policies
- **SBOM Generation**: Software Bill of Materials for each release
- **Remediation Guidance**: Suggest version upgrades

## Technical Approach

- Piper pipeline integration
- Automated SBOM generation
- Custom policy configuration for license compliance
- Reporting and dashboard creation
