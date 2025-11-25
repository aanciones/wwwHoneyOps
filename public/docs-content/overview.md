# HoneyOps Technical Documentation

Welcome to the HoneyOps technical documentation.

HoneyOps is a SaaS platform for deploying and operating honeypots. You receive a lightweight
`.ova` appliance that you run inside your own infrastructure, and a cloud console where you
manage honeypots, alerts, policies and licensing.  
The appliance only sends **health checks** and **security incident telemetry** — it never
collects production data.

---

## How this documentation is organised

This guide is structured to follow the full lifecycle of a HoneyOps deployment:

### 1. Introduction
- What HoneyOps is and when to use it  
- Core components:
  - The honeypot appliance (`.ova`)
  - The HoneyOps cloud console  
- Telemetry sent by the platform (health & incident signals only)

### 2. Getting Started
- Prerequisites (console access, hypervisor, network requirements)  
- Creating and validating your console account  
- Deploying your first honeypot and verifying heartbeat + license  

### 3. Daily Use of the Console
- Navigating the UI (sidebar, search, notifications)  
- Dashboard and platform health overview  
- Managing honeypots, policies, alerts and activity  
- Reports & exports (if available in your plan)

### 4. Help & Troubleshooting
- Common issues (no heartbeat, license exhausted, verification email not received…)  
- Network checklist for the appliance  
- Contacting support (what info to include)  
- Glossary of core HoneyOps concepts  

---

## Quick navigation

Use the following shortcuts to jump directly into the most relevant sections:

```card
href="getting-started-prerequisites"
title="Getting Started"
description="Understand the basic requirements, create your HoneyOps account, verify your email and set up your organisation profile."
```
```card
href="getting-started-quickstart-console"
title="Console"
description="Learn how to navigate the HoneyOps console: sidebar, search, dashboards and where to find honeypots, alerts and policies."
```
```card
href="help-troubleshooting-overview"
title="Help & Troubleshooting"
description="Quick access to common issues, network checklist, how to contact support and a short glossary of core HoneyOps concepts."
```