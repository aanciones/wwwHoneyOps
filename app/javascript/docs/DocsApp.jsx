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

  // Cargar markdown cuando cambia la página (excepto overview)
  useEffect(() => {
    if (activeId === "overview") {
      setContent("");
      return;
    }

    const page = findPage(activeId);
    if (!page || !page.file) {
      setContent("# Not found\n\nThis page does not exist yet.");
      return;
    }

    fetch(`/docs-content/${page.file}`)
      .then((res) => (res.ok ? res.text() : Promise.reject("Load error")))
      .then((text) => setContent(text))
      .catch(() => setContent("# Error\n\nCould not load this page."));
  }, [activeId]);

  // Mantener el hash en la URL
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

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-slate-800 bg-slate-950/80 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          {/* Logo + texto, calcado de la landing */}
          <button
            type="button"
            onClick={() => {
              if (typeof window !== "undefined") {
                window.scrollTo({ top: 0, behavior: "smooth" });
              }
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

      {/* Layout principal: mismo ancho que el header */}
      <div id="docs-top" className="mx-auto flex max-w-7xl px-6">
        {/* Sidebar */}
        <aside
          className={`fixed inset-y-0 left-0 z-30 w-72 border-r border-slate-900 bg-slate-950/95 py-6 text-sm transition-transform duration-200 md:static md:translate-x-0 ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
          }`}
        >
          {/* wrapper interior para margen derecho, pero sin mover el borde izquierdo */}
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
          {activeId === "overview" ? (
            <OverviewSection />
          ) : (
            <MarkdownSection activeId={activeId} content={content} />
          )}
        </main>
      </div>
    </div>
  );
}

/* -------------------
   Sección Overview
-------------------- */

function OverviewSection() {
  return (
    <section id="overview" className="mb-12 scroll-mt-24">
      <p className="text-xs font-semibold uppercase tracking-wide text-amber-400">
        Overview
      </p>

      <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-50">
        HoneyOps technical documentation
      </h1>

      <p className="mt-3 max-w-2xl text-sm text-slate-300">
        HoneyOps is a SaaS platform for deploying and operating honeypots. It
        ships as a lightweight <code className="text-amber-300">.ova</code> virtual
        appliance that pairs with your cloud console using a one-time hook key
        and continuously sends health and incident telemetry.
      </p>

      <div className="mt-5 grid gap-4 text-sm sm:grid-cols-3">
        <DocCard
          title="Getting started"
          description="Create your account, deploy your first honeypot and verify end-to-end events."
          hrefId="getting-started-quickstart-console"
        />
        <DocCard
          title="Deployment"
          description="OVA requirements, import procedures and networking recommendations."
          hrefId="getting-started-quickstart-ova"
        />
        <DocCard
          title="API & Integrations"
          description="REST API, webhooks, syslog and SSO integration with your stack."
          hrefId="getting-started-quickstart-console"
        />
      </div>
    </section>
  );
}

/* -------------------
   Sección Markdown
-------------------- */

function MarkdownSection({ activeId, content }) {
  const section = findSectionByChildId(activeId);

  return (
    <article className="prose prose-invert prose-slate max-w-3xl">
      {/* Eyebrow */}
      {section && (
        <p className="text-xs font-semibold uppercase tracking-wide text-amber-400">
          {section.label}
        </p>
      )}

      {/* Contenido Markdown */}
      <ReactMarkdown>{content}</ReactMarkdown>
    </article>
  );
}

/* -------------------
         Cards
-------------------- */

function DocCard({ title, description, hrefId }) {
  const handleClick = () => {
    window.location.hash = hrefId;
  };

  return (
    <button
      onClick={handleClick}
      className="flex h-full flex-col items-start rounded-2xl border border-slate-800 bg-slate-900 p-4 text-left shadow-sm hover:border-amber-500/60 hover:bg-slate-900/80"
    >
      <div className="mb-1 flex items-center gap-2 text-xs font-semibold text-slate-100">
        <LinkIcon className="h-3 w-3 text-amber-400" />
        {title}
      </div>
      <p className="text-xs text-slate-300">{description}</p>
    </button>
  );
}
