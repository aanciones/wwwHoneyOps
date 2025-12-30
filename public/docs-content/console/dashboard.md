# Dashboard Page

## Overview

The **Dashboard Page** provides a high-level overview of the system’s current state.  
It is designed to give users a **quick summary of honeypot status, recent activity, and active alerts** in a single view.

This page is intended to be the **starting point** for daily monitoring and situational awareness.

---

## Honeypot Summary

At the top of the dashboard, key honeypot metrics are displayed as summary cards:

- **Honeypots**  
  Total number of honeypots configured in the system.

- **Active**  
  Number of honeypots currently active and operational.

- **Pending**  
  Number of honeypots that are configured but not yet active.

These indicators allow users to quickly verify the health and readiness of the environment.

---

## Recent Activity

The **Recent Activity** section shows the latest events detected across all honeypots.

### Information displayed

Each activity entry includes:

- Honeypot name
- Source IP and port
- Destination IP and port
- Network protocol
- Timestamp of the event
- Visual severity indicator

Only the most recent events are shown to keep the view concise and relevant.

### Purpose

This section helps users:

- Identify recent network interactions
- Spot unusual or suspicious connections
- Confirm that honeypots are actively receiving traffic

---

## Active Alerts

The **Active Alerts** section lists alerts that currently require attention.

### Information displayed

For each active alert, the dashboard shows:

- Honeypot name
- Source IP address
- Alert start time
- Current alert status

A badge indicates the alert state, allowing quick identification of critical issues.

### Purpose

This section enables users to:

- Quickly detect unresolved security alerts
- Prioritize investigation and response
- Navigate to alert management for further action

---

## Loading and Error States

If data is still being retrieved, loading messages are displayed.  
If data cannot be loaded, a warning message appears to inform the user.

This ensures clear feedback about the system’s current availability and status.

---

## Typical Use Cases

- Getting an instant overview of system health
- Checking whether honeypots are active
- Monitoring recent network activity
- Identifying active alerts that need attention

---

## Notes

- The dashboard displays a **summary view** and does not replace detailed analysis pages.
- For deeper investigation, users should navigate to the **Activity** or **Alerts** pages.
- The information is updated dynamically to reflect the current system state.

---
