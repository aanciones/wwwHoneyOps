# Policies Page – User Guide

## Overview

The **Policies** page lets you manage alerting and monitoring policies that control how incidents are handled for your honeypots. From this page you can:

- View all existing policies
- Search policies by name
- Create new policies
- Edit or delete existing policies (with restrictions)
- Assign policies to honeypots
- Configure alerting rules, maintenance windows, services, and whitelists

---

## Policies List

Each policy card shows:

- **Policy name**
- **Status badge**
  - **Default**: System policy, locked and not fully editable
  - **Locked**: Cannot be modified or deleted
  - **Active**: Custom, editable policy
- **Incident notification email**
- **Maintenance windows count**
- **Whitelist entries count**
- **Enabled services** (shown as pills, e.g. SSH/22, HTTPS/443)
- **Assigned honeypots count**
- **Alert timing configuration** (rotation, reminders, auto-close)

If no policies match your search, a *No policies found* message is shown.

---

## Searching Policies

Use the **Search policy** field at the top to filter policies by name in real time.

---

## Creating a New Policy

1. Click **New policy**.
2. Fill in the policy details:
   - Policy name
   - Incident notification email
   - Maintenance windows
   - Whitelist entries
   - Alerting timings
   - Enabled services
3. Click **Create** to save.

Default values are pre-filled to help you get started.

---

## Editing a Policy

Click **Edit** on a policy card to modify it.

> ⚠️ Default or locked policies cannot be fully edited. Some fields will be disabled.

When editing, you can update:
- Notification email
- Maintenance windows
- Whitelist
- Alert timings
- Enabled services

Click **Save** to apply changes.

---

## Deleting a Policy

Click **Delete** on a policy card to remove it.

Important rules:
- The **default policy cannot be deleted**
- Policies currently in use by honeypots cannot be deleted

If deletion is not allowed, an informative alert will explain why.

---

## Assigning a Policy to Honeypots

1. Click **Assign** on a policy.
2. A modal opens showing all available honeypots.
3. Select which honeypots should use this policy:
   - Check individual honeypots
   - Use **Select all** or **Clear** for convenience
4. Click **Assign** to apply the policy.

Honeypots already using the policy are preselected.

---

## Maintenance Windows

Policies can define maintenance periods during which alerts are suppressed.

Supported types:
- **Weekly** (by weekday, start time, and duration)
- **One-off** (specific date/time and duration)

Each window includes:
- Timezone
- Duration in minutes

You can add, edit, or remove maintenance windows unless the policy is locked.

---

## Whitelist Management

The whitelist defines IPs or ranges that should be ignored by alerts.

You can add:
- Single IPs
- CIDR ranges
- IP ranges

Entries can be added in bulk using commas or spaces. Existing entries can be removed individually.

---

## Alerting Configuration

Each policy defines alert timing rules:
- **Rotate series**: When alert series rotates
- **Second reminder**: Time before a second alert
- **Next reminders**: Interval between further reminders
- **Auto-close**: When unresolved incidents are closed automatically

All values are expressed in minutes.

---

## Services

Policies specify which services are monitored, such as:
- PING
- SSH (22)
- SMTP (25)
- HTTP (80)
- HTTPS (443)
- RDP (3389)

Only selected services will generate alerts.

---

## Alerts and Confirmations

The system uses consistent dialogs for:
- Deletion confirmations
- Assignment confirmations
- Errors (e.g. policy in use, loading failures)

These dialogs clearly explain what happened and what action is required.

---

## Key Notes

- Default policies are system-controlled and mostly read-only
- Policies must have a valid notification email (except default)
- Changes take effect immediately after saving
- Assignments update all selected honeypots at once

---

The Policies page is the central place to control how incidents are detected, alerted, and managed across your honeypots.
