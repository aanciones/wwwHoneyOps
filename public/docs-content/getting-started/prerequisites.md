# Prerequisites

Before deploying a HoneyOps honeypot, make sure these basics are in place.

---

## Access and permissions

- A HoneyOps console account with permission to create honeypots.
- An active organisation in the console.
- Available license capacity (if licensing is enforced).

---

## Infrastructure

Choose at least one supported deployment flavor:

- **OVA appliance path**
  - A hypervisor that supports importing `.ova` appliances.
  - Ability to create and boot a VM with the resources required by your environment baseline.
- **Windows agent path**
  - A supported Windows host where you can run services.
  - Local administrator permissions to install/uninstall services and manage firewall rules.
  - PowerShell access for installation and troubleshooting commands.

Also required:

- Access to download the OVA image or Windows agent package from the console.

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
