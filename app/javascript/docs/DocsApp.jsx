// app/javascript/docs/DocsApp.jsx

import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import {
  Shield,
  BookOpen,
  Search,
  Menu,
  X,
  Link as LinkIcon,
} from "lucide-react";

import { nav, findPage, findSectionByChildId } from "./nav";


const brandName = "HoneyOps";
const brandTagline = "Honeypots as a Service";

export default function DocsApp() {
  const initialId =
    typeof window !== "undefined" && window.location.hash
      ? window.location.hash.replace("#", "")
      : "overview";

  const [activeId, setActiveId] = useState(initialId || "overview");
  const [content, setContent] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [pageFile, setPageFile] = useState(null);

  // Cargar markdown (incluido overview)
  useEffect(() => {
    const page = findPage(activeId);

    if (!page || !page.file) {
      setContent("# Not found\n\nThis page does not exist yet.");
      setPageFile(null);
      return;
    }

    setPageFile(page.file);

    fetch(`/docs-content/${page.file}`)
      .then((res) => (res.ok ? res.text() : Promise.reject("Load error")))
      .then((text) => setContent(text))
      .catch(() => setContent("# Error\n\nCould not load this page."));
  }, [activeId]);

  // Escuchar clicks en DocCard
  useEffect(() => {
    const handler = (e) => {
      const id = e.detail?.id;
      if (id) {
        setActiveId(id);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    };

    window.addEventListener("honeyops-doc-nav", handler);
    return () => window.removeEventListener("honeyops-doc-nav", handler);
  }, []);

  // Mantener hash en URL
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.history.replaceState(null, "", `#${activeId}`);
    }
  }, [activeId]);

  const handleNavClick = (id) => {
    setActiveId(id);
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    setSidebarOpen(false);
  };

  const baseDir =
    pageFile && pageFile.includes("/")
      ? pageFile.replace(/\/[^/]+$/, "")
      : "";

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-slate-800 bg-slate-950/80 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <button
            type="button"
            onClick={() => {
              if (typeof window !== "undefined") {
                window.scrollTo({ top: 0, behavior: "smooth" });
              }
              setActiveId("overview");
            }}
            className="flex items-center gap-3"
          >
            <div className="flex items-center gap-3">
              <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-2">
                <span className="text-amber-400">
                  <Shield className="h-6 w-6" />
                </span>
              </div>
              <div className="flex flex-col items-start text-left">
                <span className="text-lg font-bold leading-tight text-slate-100">
                  {brandName}
                </span>
                <span className="text-xs leading-tight text-slate-400">
                  Technical documentation
                </span>
              </div>
            </div>
          </button>

          {/* Buscador + back to console */}
          <div className="hidden items-center gap-3 md:flex">
            <div className="relative">
              <Search className="pointer-events-none absolute left-2 top-2.5 h-4 w-4 text-slate-500" />
              <input
                className="w-64 rounded-xl border border-slate-700 bg-slate-900/70 px-8 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500/60"
                placeholder="Search docs (Ctrl+K)"
              />
            </div>

            <a
              href="https://console.honeyops.test"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-700 px-3 py-2 text-xs font-semibold text-slate-200 hover:bg-slate-900"
            >
              <BookOpen className="h-4 w-4" />
              Back to console
            </a>
          </div>

          {/* Botón menú móvil */}
          <button
            className="inline-flex items-center gap-2 rounded-xl border border-slate-700 px-2 py-1 text-xs font-medium text-slate-200 md:hidden"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            Menu
          </button>
        </div>
      </header>

      {/* Contenido principal */}
      <div className="flex-1">
        <div id="docs-top" className="mx-auto flex max-w-7xl px-6">
          {/* Sidebar */}
          <aside
            className={`fixed inset-y-0 left-0 z-30 w-72 border-r border-slate-900 bg-slate-950/95 py-6 text-sm transition-transform duration-200 md:static md:translate-x-0 ${
              sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
            }`}
          >
            <div className="pr-6">
              <nav className="space-y-4">
                {nav.map((section) => (
                  <div key={section.id}>
                    <div className="mb-1 text-xs font-semibold uppercase tracking-wide text-slate-400">
                      {section.label}
                    </div>

                    <ul className="space-y-1">
                      {section.children ? (
                        section.children.map((child) => {
                          const isActive = activeId === child.id;
                          return (
                            <li key={child.id}>
                              <button
                                onClick={() => handleNavClick(child.id)}
                                className={`flex w-full items-center justify-between rounded-lg px-2 py-1.5 text-left ${
                                  isActive
                                    ? "bg-amber-500/15 text-amber-200"
                                    : "text-slate-300 hover:bg-slate-900"
                                }`}
                              >
                                <span className="truncate">{child.label}</span>
                                {isActive && (
                                  <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                                )}
                              </button>
                            </li>
                          );
                        })
                      ) : (
                        <li>
                          <button
                            onClick={() => handleNavClick(section.id)}
                            className={`mt-1 flex w-full items-center rounded-lg px-2 py-1.5 text-left ${
                              activeId === section.id
                                ? "bg-amber-500/15 text-amber-200"
                                : "text-slate-300 hover:bg-slate-900"
                            }`}
                          >
                            {section.label}
                          </button>
                        </li>
                      )}
                    </ul>
                  </div>
                ))}
              </nav>

              <div className="mt-8 border-t border-slate-800 pt-4 text-xs text-slate-500">
                {brandTagline}. Docs v1.0
              </div>
            </div>
          </aside>

          {/* Main content */}
          <main className="flex-1 px-4 py-8 md:px-8">
            <MarkdownSection
              activeId={activeId}
              content={content}
              baseDir={baseDir}
            />
          </main>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-900 bg-slate-950/95">
        <div className="mx-auto max-w-7xl px-6 py-4">
          <p className="text-center text-[11px] text-slate-500">
            © 2025 HoneyOps. All rights reserved. All trademarks and brands are the
            property of their respective owners.
          </p>
        </div>
      </footer>
    </div>
  );
}

/* -------------------
   Sección Markdown genérica
-------------------- */

function MarkdownSection({ activeId, content, baseDir }) {
  const section = findSectionByChildId(activeId);

  return (
    <article className="docs-markdown prose prose-invert prose-slate max-w-5xl">
      {section && (
        <p className="text-sm font-semibold uppercase tracking-wide text-amber-400">
          {section.label}
        </p>
      )}

      <ReactMarkdown components={markdownComponents(baseDir)}>
        {content}
      </ReactMarkdown>
    </article>
  );
}

/* -------------------
   Componentes markdown personalizados
-------------------- */

function markdownComponents(_baseDir) {
  return {
    img: ({ src, alt, ...props }) => {
      let finalSrc = src || "";

      if (
        finalSrc &&
        !finalSrc.startsWith("http://") &&
        !finalSrc.startsWith("https://") &&
        !finalSrc.startsWith("/")
      ) {
        if (finalSrc.startsWith("docs-images/")) {
          finalSrc = "/" + finalSrc;
        } else {
          finalSrc = `/docs-images/${finalSrc}`;
        }
      }

      return (
        <img
          src={finalSrc}
          alt={alt}
          // 👇 Aquí limitamos tamaño y centramos con Tailwind
          className="mt-4 max-w-[820px] w-full mx-auto rounded-xl border border-amber-500/40 bg-slate-950/60 shadow-lg"
          {...props}
        />
      );
    },

    pre: ({ node }) => {
      const codeNode =
        node && node.children && node.children.length > 0
          ? node.children[0]
          : null;

      const className = Array.isArray(codeNode?.properties?.className)
        ? codeNode.properties.className
        : [];

      const isCard = className.includes("language-card");

      if (isCard) {
        const raw =
          (codeNode.children || [])
            .map((c) => (c.value ? c.value : ""))
            .join("") || "";

        const lines = raw
          .split("\n")
          .map((l) => l.trim())
          .filter(Boolean);

        const data = {};
        lines.forEach((line) => {
          const m = line.match(/^(\w+)\s*=\s*"([^"]*)"$/);
          if (m) data[m[1]] = m[2];
        });

        const hrefId = data.href || "";
        const title = data.title || "Card";
        const description =
          data.description ||
          lines.filter((l) => !/^(\w+)\s*=/.test(l)).join("\n");

        return (
          <div className="my-4 inline-block w-full align-top md:w-[31%] md:mr-4 md:mb-4">
            <DocCard
              title={title}
              description={description}
              hrefId={hrefId}
            />
          </div>
        );
      }

      const fallbackText =
        codeNode &&
        codeNode.children &&
        codeNode.children[0] &&
        codeNode.children[0].value
          ? codeNode.children[0].value
          : "";

      return <pre>{fallbackText}</pre>;
    },

    code: ({ children, ...props }) => <code {...props}>{children}</code>,
  };
}

/* -------------------
         Card
-------------------- */

function DocCard({ title, description, hrefId, ...rest }) {
  const handleClick = () => {
    if (hrefId) {
      window.location.hash = hrefId;

      if (typeof window !== "undefined") {
        const event = new CustomEvent("honeyops-doc-nav", {
          detail: { id: hrefId },
        });
        window.dispatchEvent(event);
      }
    }
  };

  return (
    <button
      {...rest}
      onClick={handleClick}
      className="flex h-full w-full flex-col items-start rounded-2xl border border-slate-800 bg-slate-900 p-5 text-left shadow-sm hover:border-amber-500/60 hover:bg-slate-900/80"
    >
      <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-100">
        <LinkIcon className="h-3 w-3 text-amber-400" />
        {title}
      </div>
      <p className="text-sm text-slate-300 whitespace-pre-line">
        {description}
      </p>
    </button>
  );
}
