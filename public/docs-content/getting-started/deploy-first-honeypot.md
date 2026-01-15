# Deploy Your First Honeypot

This guide walks you through deploying the HoneyOps appliance, enrolling it, and confirming it is reporting to the console.

---

## Before you begin

- Make sure you have console access and an active organisation.
- Confirm your environment meets the prerequisites.
- Decide which network segment the honeypot will live in.
- Ensure outbound connectivity from the honeypot network to the HoneyOps console (HTTPS/443) and working DNS.

---

## Deployment steps

### 1) Download the appliance
1. In the HoneyOps console, go to **Honeypots**.
2. Download the HoneyOps appliance `.ova`.

### 2) Import the .ova
1. Import the `.ova` into your hypervisor (VMware, VirtualBox, Hyper-V, etc.).
2. Allocate CPU, RAM, and disk according to your prerequisites.
3. Choose the target network/port group/VLAN for the honeypot.

### 3) Configure networking
1. Choose DHCP or static IP.
2. If using static, set IP, subnet, gateway, and DNS.
3. Confirm the VM has outbound access to the console URL.

### 4) Create the honeypot and get an enrollment token
1. In the console, go to **Honeypots** and click **New Honeypot**.
2. Enter a name and optional location/description.
3. Copy the **Enrollment token** shown in the modal.
   - The token is shown only once.
   - The token expires in minuts.

### 5) Enroll the appliance
1. Boot the VM.
2. When prompted, paste the enrollment token into the appliance setup.
3. Wait for the enrollment to complete.

### 6) Verify in the console
1. The honeypot should appear in **Honeypots** with status **Active**.
2. You should see **Last seen** update within a few minutes.
3. If configuration status shows **Pending**, it will switch to **Synchronized** after the agent applies the policy.

---

## What happens during enrollment (quick view)

- The enrollment token is used once to link the appliance to your account.
- After enrollment, the console issues a device secret that the agent uses for all future communication.
- The honeypot moves from **Pending** to **Active** and starts sending heartbeats.
- A license is assigned automatically if there is available capacity.

---

## Troubleshooting quick checks

- **Token expired or lost**: use **Re-enroll** on the honeypot row to issue a new token (this unlinks the current agent and returns it to **Pending**).
- **No heartbeats**: confirm network/DNS and outbound access to the console.
- **Still Pending**: ensure the token was entered correctly and the VM has correct time and DNS.
- **Unlicensed**: assign a license in the **Honeypots** list or add capacity.

---

## Next steps

- Assign or review the policy for the honeypot.
- Confirm the configuration status is **Synchronized**.
- Generate traffic to validate alerts and activity.