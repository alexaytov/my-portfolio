---
title: "Deployment of Vali and Plutono"
slug: vali-plutono-deployment
excerpt: "The deployment and configuration of Vali and Pluton on a K8s environment"
category: infrastructure
tags: [Kubernetes, Logging, Monitoring]
tech_stack: [Kubernetes, Vali, Plutono, Helm]
date: 2023-03-15
project_url: ""
github_url: ""
demo_url: ""
image: /i533837/my-portfolio/assets/images/k8s.png
company: SAP
---

## Overview

Deployed Vali (log aggregation) and Plutono (visualization) as an enterprise-grade logging solution for Kubernetes environments, providing centralized log aggregation and analysis.

## Key Features

- **Log Collection**: Aggregate logs from all services
- **Label-Based Indexing**: Efficient log querying without full-text indexing
- **Custom Dashboards**: Visualization for each service
- **Alert Rules**: Pattern-based alerting on log content
- **Long Retention**: Extended log storage with object storage backend

## Architecture

- Fluent Bit agents for log collection
- Vali distributors and ingesters for processing
- Object storage backend for cost-effective retention
- Plutono dashboards for visualization
