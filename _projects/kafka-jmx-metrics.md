---
title: "Expose and Scrape Java JMX Metrics for Kafka Streams"
slug: kafka-jmx-metrics
excerpt: "Exposing and scraping Kafka Streams JMX metrics within K8s"
category: infrastructure
tags: [Kafka Streams, Monitoring, JMX, Kubernetes]
tech_stack: [Java, Kafka Streams, JMX, Prometheus]
date: 2022-10-01
project_url: ""
github_url: ""
demo_url: ""
image: /i533837/my-portfolio/assets/images/java.svg
company: SAP
---

## Overview

Implemented comprehensive JMX metrics exposure and scraping for Kafka Streams applications running in Kubernetes, enabling detailed monitoring of stream processing performance.

## Key Features

- **JMX Exporter**: Deployed as sidecar for metric collection
- **Prometheus Integration**: Service monitor configuration
- **Custom Dashboards**: Stream processing visualization
- **Alert Rules**: Proactive monitoring for critical metrics

## Key Metrics Exposed

- Processing rate and latency
- Consumer lag per partition
- State store metrics
- Thread utilization
- Commit and poll latencies

## Technical Approach

- JMX Exporter sidecar deployment
- Prometheus service discovery
- Grafana dashboard templates
- Alert rules for high lag and failures
