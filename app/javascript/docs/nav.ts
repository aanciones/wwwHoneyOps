// app/javascript/docs/nav.js
// @ts-nocheck

// Estructura de navegación de la documentación
export const nav = [
  {
    id: "overview",
    label: "Overview",
    file: "overview.md",
  },
  {
    id: "getting-started",
    label: "Getting started",
    children: [
      {
        id: "getting-started-quickstart-console",
        label: "Quickstart: Console",
        file: "getting-started/quickstart-console.md",
      },
      {
        id: "getting-started-quickstart-ova",
        label: "Quickstart: Honeypot OVA",
        file: "getting-started/quickstart-ova.md",
      },
    ],
  },
  {
    id: "deploy",
    label: "Deployment",
    children: [
      {
        id: "deploy",
        label: "Deploy: Console",
        file: "deploy/deploy.md",
      },
    ],
  },
  // Aquí podrás ir añadiendo más secciones:
  // concepts, deployment, api, troubleshooting, etc.
];

// Devuelve el objeto "página" (con .file) a partir de un id
export function findPage(id) {
  for (const section of nav) {
    // Sección de primer nivel con fichero propio
    if (section.id === id && section.file) {
      return {
        id: section.id,
        label: section.label,
        file: section.file,
      };
    }

    // Hijos
    if (section.children) {
      for (const child of section.children) {
        if (child.id === id) {
          return child; // child ya tiene { id, label, file }
        }
      }
    }
  }

  return null;
}

// Devuelve la sección (padre) a la que pertenece un id dado
// Si el id ya es una sección de primer nivel, devuelve esa sección
export function findSectionByChildId(id) {
  for (const section of nav) {
    if (section.id === id) return section;
    if (section.children && section.children.some((c) => c.id === id)) {
      return section;
    }
  }
  return null;
}
