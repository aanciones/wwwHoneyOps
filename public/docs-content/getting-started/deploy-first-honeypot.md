# Deploy Your First Honeypot

This guide walks you through deploying your first HoneyOps honeypot as a service endpoint and
enrolling it in the console. It is written for teams adopting honeypots as a service and wanting
to move from evaluation to first deployment quickly.

If you are evaluating the product first, review the main
[HoneyOps honeypot as a service platform](https://honeyops.net/) and the public
[deployment overview](https://honeyops.net/how-it-works) before starting the technical setup.

HoneyOps supports two deployment flavors:

- **OVA appliance** (virtual machine)
- **Windows agent** (`HoneyOpsAgent` service)

---

## Before you begin

- Make sure you have console access and an active organization.
- Confirm your environment meets the prerequisites.
- Decide which network segment the honeypot will live in.
- Ensure outbound connectivity to the HoneyOps console (HTTPS/443) and working DNS.

---

## Step 1) Create the honeypot and get an enrollment token

1. In the console, go to **Honeypots** and click **New Honeypot**.
2. Enter a name and optional location/description.
3. Copy the **Enrollment token** shown in the modal.
   - The token is shown only once.
   - The token expires at the time shown in the modal.

---

## Step 2) Deploy the endpoint

Choose one path depending on your environment.

### Path A: OVA appliance

1. In the HoneyOps console, download the HoneyOps appliance `.ova`.
2. Import the `.ova` into your hypervisor (VMware, VirtualBox, Hyper-V, etc.).
3. Allocate CPU, RAM, and disk according to your baseline.
4. Choose the target network/port group/VLAN.
5. Configure networking (DHCP or static IP).
6. Boot the VM and paste the enrollment token when prompted.

### Path B: Windows agent

1. In the HoneyOps console, download the Windows agent package.
2. On the target host, run the installer as Administrator:
   - Option A (recommended): double-click `HoneyOpsAgent.exe` and choose **Install** in the installer screen.
   - Option B: open PowerShell as Administrator and run:

```powershell
.\HoneyOpsAgent.exe --install
```

3. Paste the enrollment token when prompted.
4. Verify the service is running:

```powershell
sc.exe query HoneyOpsAgent
```

Expected state:

- `STATE : 4 RUNNING`

---

## Step 3) Verify in the console

1. The honeypot should appear in **Honeypots** with status **Active**.
2. **Last seen** should update within a few minutes.
3. If configuration status shows **Pending**, it should move to **Synchronized** after policy is applied.

---

## Endpoint behavior (conceptual summary)

After enrollment, HoneyOps endpoints (OVA or Windows) follow the same operational flow:

- They authenticate to the HoneyOps console and keep a secure management channel.
- They send periodic heartbeat so the platform can track health and connectivity.
- They pull and apply policy updates defined in the console.
- They expose decoy services according to assigned policy.
- They report interaction telemetry and security events back to the platform.
- They can receive lifecycle actions from the console (for example configuration changes, re-enrollment, or update workflows).

---

## Troubleshooting quick checks

- **Token expired or lost**: use **Re-enroll** on the honeypot row to issue a new token.
- **No heartbeats (OVA)**: confirm VM network, DNS, and outbound HTTPS.
- **No heartbeats (Windows)**: verify `HoneyOpsAgent` service status and host firewall rules.
- **Still Pending**: verify token entry and system time sync.
- **Unlicensed**: assign a license in **Honeypots** or add subscription capacity.
- **Windows logs**: check Event Viewer -> Windows Logs -> Application.

---

## Next steps

- Review or assign the honeypot policy.
- Confirm configuration state is **Synchronized**.
- Generate controlled test traffic and validate alerts/activity.
