# Honeypots Management Page

## Overview

The **Honeypots Management Page** is the central interface for creating, monitoring, configuring, and managing honeypots.  
It provides full lifecycle control, including **enrollment, licensing, policy assignment, and deletion**, all from a single table-driven view.

This page is intended for **operators and administrators** responsible for honeypot deployment and maintenance.

---

## Search and Global Controls

### Search

- Allows filtering honeypots by **name or IP address**
- Updates results in real time
- Useful for large environments with many honeypots

### License Summary

At the top of the page, license usage is displayed:

- **Used / Total licenses**
- **Available licenses**
- Visual indicators reflect license availability and billing status

If the billing period has ended, license toggles are disabled.

### Global Actions

- **Refresh**: Reloads honeypots and license summary
- **New Honeypot**: Opens the creation dialog

---

## Honeypots Table

Each honeypot is displayed as a row with the following columns:

### Name
- User-defined honeypot name

### IP
- Assigned IP address (if available)

### Status
Shows the operational state:
- **Pending** – Awaiting agent enrollment
- **Active** – Agent connected and running
- **Disabled / Archived** – Not operational

If a honeypot is active but has not checked in for more than 2 minutes, it is marked as **Disconnected**.

---

### Policy
- Displays the currently assigned policy
- Can be changed via the Edit action

---

### Configuration Status
Indicates whether the configuration is:
- **Pending** – Changes not yet applied
- **Synced** – Configuration successfully synchronized

---

### License
Each honeypot can independently toggle license assignment:

- **Assigned** – License in use
- **Unlicensed** – No license consumed

Rules e
