# Reports Page – User Guide

## Overview

The **Reports** page provides aggregated insights into honeypot activity and alerts over a selected time range. It helps you understand trends, attack patterns, and how alerts are generated and resolved.

From this page you can:

- Select a reporting time range
- View activity and alert statistics
- Analyze most targeted ports and services
- Review how alerts were closed
- Export the report data as a CSV file

---

## Time Range Selection

At the top of the page, you can choose the reporting period:

- **Last 24 hours**
- **Last 48 hours**
- **Last 7 days**
- **Last 30 days**

Changing the range automatically reloads all report data.

---

## Exporting Data

Click **Export CSV** to download the current report as a CSV file.

- The exported file matches the selected time range
- Useful for audits, offline analysis, or sharing data

---

## Report Sections

The page is divided into four main sections.

---

## 1. Activity

**Purpose:**  
Shows overall network activity detected by the honeypots.

**Displayed information:**
- Total number of events in the selected range
- Average events per day
- Number of different protocols observed
- Protocol distribution (visual bar)

**Notes:**
- Each protocol is shown as a percentage of total activity
- If there is not enough data, the protocol breakdown is hidden

---

## 2. Generated Alerts

**Purpose:**  
Displays how many alerts were generated per day.

**Displayed information:**
- Total alerts in the selected range
- Daily alert distribution shown as bars
- Days with zero alerts are displayed as dots

**How to read the chart:**
- Each bar represents one day
- Taller bars indicate more alerts
- Dates are shown at regular intervals for clarity

---

## 3. Most Used Ports

**Purpose:**  
Highlights which destination ports were most targeted.

**Displayed information:**
- Port number
- Associated service name
- Total number of events per port

**Notes:**
- Data is based on destination ports (`dest_port`)
- If no data exists for the range, a message is shown instead

---

## 4. Alert Closures

**Purpose:**  
Shows how alerts were resolved during the selected period.

**Closure types:**
- **Auto-close**: Automatically closed by the system
- **False positives**: Marked as non-issues
- **Resolved**: Manually handled and closed

**Displayed information:**
- Total number of closed alerts
- Percentage distribution by closure type
- Visual bar showing proportional breakdown

---

## Error and Loading States

- While data is loading, a *Loading report data…* message is shown
- If data cannot be retrieved, an error message appears with a retry suggestion

---

## Key Notes

- All data updates automatically when the range changes
- Calculations are aggregated per day
- Percentages are rounded for readability
- The CSV export reflects exactly what is shown on screen

---

The Reports page is designed to give you a clear, high-level view of honeypot behavior and alert effectiveness over time.
