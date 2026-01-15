# Prerequisites

Before deploying a HoneyOps honeypot, make sure these basics are in place.

---

## Access and permissions

- A HoneyOps console account with permission to create honeypots.
- An active organisation in the console.
- Available license capacity (if licensing is enforced).

---

## Infrastructure

- A hypervisor that supports importing `.ova` appliances.
- Ability to create and boot a VM with the resources required by your environment baseline.
- Access to download the appliance from the console.

---

## Network

- A network segment or VLAN where the honeypot will reside.
- DHCP or a planned static IP configuration.
- Outbound connectivity to the HoneyOps console (HTTPS/443) and working DNS.
- Accurate system time (NTP or host time sync).

---

## Recommended planning

- Decide whether the honeypot should be exposed to a specific subnet or isolated lab.
- Confirm who will own ongoing monitoring and incident triage for alerts.
