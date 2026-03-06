# Common Issues

This page lists common setup and operational problems and how to resolve them.

---

## Enrollment and connectivity

### Enrollment token rejected or expired

- Tokens are shown once and expire; use the latest token.
- Generate a new token from **Honeypots** using **Re-enroll**.
- Copy/paste the token without extra spaces.

### Honeypot stays Pending

- Confirm outbound HTTPS (443) connectivity to the console.
- Verify DNS resolution for the console hostname.
- Check system time (NTP/time sync) on the VM or Windows host.
- Windows path: verify `HoneyOpsAgent` service is installed and running.

### Honeypot shows Disconnected or Last seen not updating

- Ensure the endpoint is running and has stable network access.
- Verify firewall rules allow outbound HTTPS.
- Windows path: check Event Viewer -> Windows Logs -> Application for HoneyOpsAgent errors.
- If it persists, re-enroll the agent.

---

## Policies and data

### Configuration status stuck on Pending

- The agent must fetch the latest policy and acknowledge it.
- Confirm connectivity to the console and wait a few minutes.
- If it remains pending after connectivity is stable, re-enroll.

### Alerts or activity are empty

- Generate test traffic to the honeypot.
- Review policy settings and whitelists that might exclude traffic.
- Confirm the honeypot is licensed and active.

---

## Licenses and subscription

### License toggle disabled or honeypot unlicensed

- Check **Licences** for available seats.
- Purchase or upgrade to add capacity.
- If the trial ended or the subscription expired, renew to reactivate honeypots.

---

## Console and settings

### Dates/times look wrong

- Update the time zone in the top bar.

### Syslog integration not receiving logs

- Verify the Syslog server, port, and protocol.
- Ensure outbound access to the Syslog endpoint is allowed.
- Use **Test send** to validate connectivity.

---

If the issue persists, contact support with the honeypot name, status, and a timestamp.
