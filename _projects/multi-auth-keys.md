---
title: "Support Rotation of Credentials"
slug: multi-auth-keys
excerpt: "Implementation of multiple credentials for a single technical user account"
category: automation
tags: [Security, Authentication]
tech_stack: [Java, Spring Security, OAuth 2.0]
date: 2022-08-01
project_url: ""
github_url: ""
demo_url: ""
image: /my-portfolio/assets/images/keys.jpg
company: SAP
---

## Overview

Implemented support for multiple authentication keys per service account, enabling credential rotation and improved security practices.

## Key Features

- **Multiple Keys**: Support for multiple active keys per account
- **Independent Lifecycle**: Create, rotate, delete keys independently
- **Metadata**: Name and description for each key
- **Last Used Tracking**: Monitor key usage
- **Zero-Downtime Rotation**: Add new key before removing old

## Use Cases

### Credential Rotation
1. Create new credential
2. Deploy to production systems
3. Validate new credential works
4. Delete old credential

### Team-Based Access
- Different keys for development, QA, and production
- Easy revocation without affecting other systems
