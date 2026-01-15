# Honeypots

## Overview

The **Honeypots** page is the main workspace for creating, enrolling, monitoring, and managing honeypots. It combines status, policy assignment, licensing, and lifecycle actions in a single table view.

---

## Search and global controls

### Search
- Filter honeypots by **name or IP**
- Updates as you type

### License summary
- Shows **Licenses: used / total**
- Shows **Available** seats
- License toggles are disabled if the billing period has ended

### Global actions
- **Refresh** reloads the list and license summary
- **New Honeypot** opens the create dialog

---

## Honeypots table

Each honeypot appears as a row with the following columns:

### Name
- User defined name

### IP
- Last reported IP address (if available)

### Status
- **Pending** - waiting for enrollment
- **Active** - agent connected and reporting
- **Disabled** - not operational
- **Archived** - retired and inactive

If a honeypot is **Active** but has not checked in for more than 2 minutes, it is marked as **Disconnected**.

### Policy
- Current policy assigned to the honeypot
- Can be changed via **Edit**

### Config
- **Pending** - policy changes not yet applied
- **Synced** - configuration applied and acknowledged

### License
- Toggle per honeypot
- **Assigned** consumes a license seat
- **Unlicensed** does not consume a seat

Toggles are disabled when there are no available seats or the trial has ended.

### Last seen
- Timestamp of the most recent heartbeat

### Actions
- **View** - open details
- **Re-enroll** - unlink the current agent and issue a new enrollment token
- **Edit** - update name, location, and policy
- **Delete** - permanently remove the honeypot and associated data

---

## Create and enroll a honeypot

1. Click **New Honeypot**.
2. Enter a name (required) and location/description (optional).
3. Copy the **Enrollment token** from the modal.
   - The token is shown only once.
   - The token expires at the time shown in the modal.
4. Paste the token into the appliance during enrollment.

If you lose the token or it expires, use **Re-enroll** to generate a new one.

---

## View details

The **View** action shows operational metadata, including:

- Honeypot ID
- Status and connection state
- IP address
- Last seen and linked timestamps
- Agent version
- Location/description
- Assigned policy

---

## Edit details

The **Edit** action allows you to:

- Change the honeypot name
- Update location/description
- Assign a policy (including "none")
- See which policy is marked as default

---

## Delete a honeypot

Deletion is permanent and removes the honeypot and its stored data. Confirm the action in the dialog before proceeding.
