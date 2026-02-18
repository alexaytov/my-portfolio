---
title: "Complex View of Data"
slug: kafka-complex-view
excerpt: "Implementation of a complex multi-topic data store in Kafka Streams"
category: infrastructure
tags: [Kafka, Stream Processing, Data Engineering]
tech_stack: [Java, Kafka Streams, Apache Kafka]
date: 2023-05-20
project_url: ""
github_url: ""
demo_url: ""
image: /my-portfolio/assets/images/kafka.png
company: SAP
---

## Overview

Built a complex multi-topic data aggregation system using Kafka Streams, creating real-time materialized views that combine data from multiple Kafka topics.

## Key Features

- **Stream-Table Joins**: Join event streams with reference data tables
- **Multi-Way Joins**: Chain multiple joins across topics
- **Stateful Processing**: Maintain local state for aggregations
- **Windowing**: Time-based aggregations for metrics
- **Interactive Queries**: Query local state stores directly

## Technical Approach

- Kafka Streams topology for stream processing
- RocksDB for state store management
- Partitioning for parallel processing
- Optimized for low-latency query access
