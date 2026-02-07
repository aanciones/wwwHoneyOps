# Zabbix Integration: HoneyOps Agent

HoneyOps integrates with Zabbix so you can monitor your honeypots from a single place and be alerted
when something is wrong. The Zabbix template connects to the HoneyOps API and reports:
- **Disconnected honeypots** (warning)
- **Active alerts** (high severity)

## 1. Generate your HoneyOps API credentials

1. Open **Settings -> API** in the HoneyOps console.
2. Click **Generate API secret**.
3. Copy the **Account ID** and the **API secret**. The secret is shown only once.
4. If you regenerate or revoke the secret, any existing Zabbix integration will stop working.

![HoneyOps API settings](zabbix_settings_api.png)

## 2. Download the Zabbix template

Download the template XML file from the docs site:

[Download HoneyOps Template (XML)](/HoneyOps_Zabbix_Template.xml)

## 3. Import the template in Zabbix

1. In Zabbix, go to **Configuration -> Templates**.
2. Click **Import** and select the XML you downloaded.
3. Confirm the preview and finish the import.

![Zabbix template import](zabbix_import_template.png)

4. Open the Template and go to **Macros** tab.
5. Set the following values:

- `{$HONEYOPS_ACCOUNT_ID}` = your HoneyOps **Account ID**
- `{$HONEYOPS_SECRET}` = your HoneyOps **API secret**

![Zabbix Macros import](zabbix_macros_template.png)

## 4. Create or select a host in Zabbix

1. Go to **Configuration -> Hosts**.
2. Create a new host (recommended name: **HoneyOps Agent**) or choose an existing one.
3. Attach the template **HoneyOps Agent** to the host.

![Zabbix host with template](zabbix_host_template.png)

## 5. Verify data is flowing

Within 1-2 minutes you should start seeing data in **Monitoring -> Latest data**. If you do not see
any values, check:
- The Account ID and Secret are correct.
- The host has the **HoneyOps Agent** template attached.
- Your Zabbix server can reach `https://console.honeyops.net`.

## How the alerts work (user-friendly)

**Disconnected honeypot (Warning)**
- Trigger: A honeypot is not reporting or is offline.
- What to do: Check network connectivity and the honeypot agent status.

**Active alerts (High)**
- Trigger: HoneyOps reports one or more active alerts on a honeypot.
- What to do: Open HoneyOps for details and follow your incident response process.

![Zabbix example data](zabbix_example_data.png)
