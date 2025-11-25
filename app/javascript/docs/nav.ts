// app/javascript/docs/nav.js
// @ts-nocheck

// Complete navigation structure for HoneyOps Documentation
export const nav = [
  {
    id: "overview",
    label: "Overview",
    file: "overview.md",
  },

  // -------------------------------------
  // 1. INTRODUCTION
  // -------------------------------------
  {
    id: "introduction",
    label: "Introduction",
    children: [
      {
        id: "introduction-what-is-honeyops",
        label: "What is HoneyOps",
        file: "introduction/what-is-honeyops.md",
      },
      {
        id: "introduction-system-components",
        label: "System Components",
        file: "introduction/system-components.md",
      },
      {
        id: "introduction-telemetry",
        label: "Telemetry Overview",
        file: "introduction/telemetry.md",
      },
    ],
  },

  // -------------------------------------
  // 2. GETTING STARTED (ONBOARDING)
  // -------------------------------------
  {
    id: "getting-started",
    label: "Getting Started",
    children: [
      {
        id: "getting-started-prerequisites",
        label: "Prerequisites",
        file: "getting-started/prerequisites.md",
      },
      {
        id: "getting-started-console-setup",
        label: "Console Setup",
        file: "getting-started/console-setup.md",
      },
      {
        id: "getting-started-deploy-first-honeypot",
        label: "Deploy Your First Honeypot",
        file: "getting-started/deploy-first-honeypot.md",
      },
    ],
  },

  // -------------------------------------
  // 3. DAILY USE OF THE CONSOLE
  // -------------------------------------
  {
    id: "console",
    label: "Console",
    children: [
      {
        id: "console-navigation",
        label: "General Navigation",
        file: "console/navigation.md",
      },
      {
        id: "console-dashboard",
        label: "Dashboard",
        file: "console/dashboard.md",
      },
      {
        id: "console-honeypots",
        label: "Honeypots",
        file: "console/honeypots.md",
      },
      {
        id: "console-policies",
        label: "Policies",
        file: "console/policies.md",
      },
      {
        id: "console-alerts",
        label: "Alerts",
        file: "console/alerts.md",
      },
      {
        id: "console-activity",
        label: "Activity",
        file: "console/activity.md",
      },
      {
        id: "console-reports",
        label: "Reports",
        file: "console/reports.md",
      },
    ],
  },

  // -------------------------------------
  // 4. HELP & TROUBLESHOOTING
  // -------------------------------------
  {
    id: "troubleshooting",
    label: "Help & Troubleshooting",
    children: [
      {
        id: "troubleshooting-common-issues",
        label: "Common Issues",
        file: "troubleshooting/common-issues.md",
      },
      {
        id: "troubleshooting-network-checklist",
        label: "Network Checklist",
        file: "troubleshooting/network-checklist.md",
      },
      {
        id: "troubleshooting-support",
        label: "Contacting Support",
        file: "troubleshooting/support.md",
      },
      {
        id: "troubleshooting-glossary",
        label: "Glossary",
        file: "troubleshooting/glossary.md",
      },
    ],
  },
];

// -------------------------------------
// Helpers
// -------------------------------------

// Returns the page object by id
export function findPage(id) {
  for (const section of nav) {
    // Section itself has a file
    if (section.id === id && section.file) {
      return {
        id: section.id,
        label: section.label,
        file: section.file,
      };
    }

    // Section with children
    if (section.children) {
      for (const child of section.children) {
        if (child.id === id) return child;
      }
    }
  }
  return null;
}

// Returns the parent section of a page
export function findSectionByChildId(id) {
  for (const section of nav) {
    if (section.id === id) return section;
    if (section.children && section.children.some((c) => c.id === id)) {
      return section;
    }
  }
  return null;
}
