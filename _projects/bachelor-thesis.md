---
title: "Bachelors Diploma Thesis (Bulgarian)"
slug: bachelor-thesis
excerpt: "Provision of infrastructure for data transmission and processing as an internet service"
category: university
tags: [Apache Kafka, Microservices, Data Streaming]
tech_stack: [Apache Kafka, Java, Spring Boot]
date: 2020-06-15
project_url: ""
github_url: ""
demo_url: ""
image: /my-portfolio/assets/images/move.png
company: Technical University of Sofia
---

## Download Thesis

[Download Bachelor's Thesis (ZIP)]({{ site.baseurl }}/assets/archives/bachelors-thesis.zip)

## Overview

Bachelor thesis developing Move - a distributed, stable, flexible, and highly scalable infrastructure for data transmission and processing as an internet service using Apache Kafka.

## Key Components

### Producers
- HTTP request activation
- Scheduled activation
- Multiple data sources (static, HTTP, activation source)

### Data Streams
- Configurable cleanup policies
- Replication and partitioning settings
- Retention management

### Consumers
- Email notifications
- HTTP request execution
- Producer activation
- Conditional expression support with JSONPath and XPath

## Technical Architecture

Implemented as a multi-module Maven project with microservices:
- HTTP source producer activator
- Scheduled producer activator
- Producer activations executor
- Consumers application
- Topic creator

## Institution

Technical University of Sofia
Faculty of Computer Systems and Technologies
Year: 2020
