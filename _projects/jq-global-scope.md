---
title: "JQ Global Scope"
slug: jq-global-scope
excerpt: "Support global scope data in a custom JQ implementation"
category: automation
tags: [JQ, Data Transformation]
tech_stack: [Java, JQ, JSON]
date: 2022-06-01
project_url: ""
github_url: ""
demo_url: ""
image: /my-portfolio/assets/images/jq.png
company: SAP
---

## Overview

Extended JQ implementation to support global scope data, enabling transformations to access workflow-level variables and execution context alongside input data.

## Key Features

- **Access Workflow Variables**: Reference configuration and settings
- **Execution Context**: Access metadata like workflow ID, start time
- **Shared Data**: Share data across workflow steps
- **Dynamic Configuration**: Inject values at runtime

## Example

```jq
{
  user: .user.name,
  workflow: $global.workflowId,
  apiKey: $global.vars.apiKey
}
```

## Use Cases

- Dynamic API calls with configuration from variables
- Conditional logic based on environment
- Audit trail with execution metadata
