// app/javascript/docs/DocsApp.jsx

import React, { useEffect, useMemo, useRef, useState } from "react";
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

function stripMarkdown(input) {
  return input
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`[^`]*`/g, " ")
    .replace(/!\[[^\]]*]\([^)]*\)/g, " ")
    .replace(/\[[^\]]*]\([^)]*\)/g, " ")
    .replace(/[#>*_~\-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export default function DocsApp() {
  const initialId =
    typeof window !== "undefined" && window.location.hash
      ? window.location.hash.replace("#", "")
      : "overview";

  const [activeId, setActiveId] = useState(initialId || "overview");
  const [content, setContent] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [pageFile, setPageFile] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [highlightIndex, setHighlightIndex] = useState(-1);
  const [searchIndex, setSearchIndex] = useState([]);
  const [isIndexing, setIsIndexing] = useState(false);
  const searchInputRef = useRef(null);

  const searchPages = useMemo(() => {
    const pages = [];
    nav.forEach((section) => {
      if (section.children && section.children.length > 0) {
        section.children.forEach((child) => {
          pages.push({
            id: child.id,
            label: child.label,
            sectionLabel: section.label,
            file: child.file,
          });
        });
      } else if (section.file) {
        pages.push({
          id: section.id,
          label: section.label,
          sectionLabel: section.label,
          file: section.file,
        });
      }
    });
    return pages;
  }, []);

  useEffect(() => {
    let isMounted = true;

    const buildSearchIndex = async () => {
      setIsIndexing(true);
      const results = await Promise.all(
        searchPages.map(async (page) => {
          if (!page.file) {
            return { ...page, content: "" };
          }

          try {
            const res = await fetch(`/docs-content/${page.file}`);
            if (!res.ok) throw new Error("Load error");
            const text = await res.text();
            const content = stripMarkdown(text).toLowerCase();
            return { ...page, content };
          } catch (error) {
            return { ...page, content: "" };
          }
        })
      );

      if (isMounted) {
        setSearchIndex(results);
        setIsIndexing(false);
      }
    };

    if (searchPages.length > 0) {
      buildSearchIndex();
    }

    return () => {
      isMounted = false;
    };
  }, [searchPages]);

  const searchResults = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return [];

    const sourcePages = searchIndex.length ? searchIndex : searchPages;

    return sourcePages.filter((page) => {
      const haystack = `${page.label} ${page.sectionLabel} ${
        page.content || ""
      }`.toLowerCase();
      return haystack.includes(query);
    });
  }, [searchIndex, searchPages, searchQuery]);

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

  useEffect(() => {
    if (!searchQuery.trim()) {
      setHighlightIndex(-1);
      return;
    }

    if (searchResults.length === 0) {
      setHighlightIndex(-1);
      return;
    }

    setHighlightIndex((prev) =>
      prev < 0 || prev >= searchResults.length ? 0 : prev
    );
  }, [searchQuery, searchResults]);

  useEffect(() => {
    const handler = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearchOpen(true);
        if (searchInputRef.current) {
          searchInputRef.current.focus();
        }
      }
    };

    if (typeof window !== "undefined") {
      window.addEventListener("keydown", handler);
    }
    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("keydown", handler);
      }
    };
  }, []);

  const handleNavClick = (id) => {
    setActiveId(id);
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    setSidebarOpen(false);
  };

  const handleSearchSelect = (id) => {
    handleNavClick(id);
    setSearchQuery("");
    setSearchOpen(false);
    setHighlightIndex(-1);
  };

  const handleSearchKeyDown = (e) => {
    if (!searchOpen) setSearchOpen(true);

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightIndex((prev) => {
        const next = prev + 1;
        if (searchResults.length === 0) return -1;
        return Math.min(next, searchResults.length - 1);
      });
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (searchResults.length === 0) return;
      setHighlightIndex((prev) => Math.max(prev - 1, 0));
    }

    if (e.key === "Enter") {
      if (searchResults.length === 0) return;
      const index = highlightIndex >= 0 ? highlightIndex : 0;
      const result = searchResults[index];
      if (result) handleSearchSelect(result.id);
    }

    if (e.key === "Escape") {
      setSearchOpen(false);
      setSearchQuery("");
      setHighlightIndex(-1);
      if (searchInputRef.current) {
        searchInputRef.current.blur();
      }
    }
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
                ref={searchInputRef}
                value={searchQuery}
                className="w-64 rounded-xl border border-slate-700 bg-slate-900/70 px-8 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500/60"
                placeholder="Search docs (Ctrl+K)"
                onChange={(e) => {
                  const value = e.target.value;
                  setSearchQuery(value);
                  setSearchOpen(true);
                  setHighlightIndex(value.trim() ? 0 : -1);
                }}
                onFocus={() => setSearchOpen(true)}
                onBlur={() => {
                  window.setTimeout(() => setSearchOpen(false), 100);
                }}
                onKeyDown={handleSearchKeyDown}
              />

              {searchOpen && searchQuery.trim() && (
                <div className="absolute left-0 right-0 mt-2 max-h-72 overflow-auto rounded-xl border border-slate-700 bg-slate-900/95 p-1 text-sm shadow-lg">
                  {searchResults.length === 0 ? (
                    <div className="px-3 py-2 text-slate-400">
                      {isIndexing ? "Indexing docs..." : "No matching pages."}
                    </div>
                  ) : (
                    searchResults.map((result, index) => {
                      const isActive = index === highlightIndex;
                      const showSection =
                        result.sectionLabel &&
                        result.sectionLabel !== result.label;

                      return (
                        <button
                          key={result.id}
                          type="button"
                          onMouseDown={(e) => {
                            e.preventDefault();
                            handleSearchSelect(result.id);
                          }}
                          onMouseEnter={() => setHighlightIndex(index)}
                          className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left ${
                            isActive
                              ? "bg-amber-500/15 text-amber-200"
                              : "text-slate-200 hover:bg-slate-800"
                          }`}
                        >
                          <span className="text-sm font-medium">
                            {result.label}
                          </span>
                          {showSection && (
                            <span className="text-xs text-slate-500">
                              {result.sectionLabel}
                            </span>
                          )}
                        </button>
                      );
                    })
                  )}
                </div>
              )}
            </div>

            <a
              href="https://console.honeyops.net"
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
        <div className="mx-auto max-w-7xl px-6 py-6 flex flex-col items-center gap-2 md:flex-row md:items-center md:justify-between">

          {/* Left: copyright */}
          <p className="text-[11px] text-slate-500 text-center md:text-left">
            © 2025 HoneyOps. All rights reserved.
          </p>

          {/* Right: legal links */}
          <div className="flex items-center gap-4 text-[11px] text-slate-500">
            <a
              href="https://honeyops.net/privacy"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-amber-400 transition-colors"
            >
              Privacy Policy
            </a>
            <span className="text-slate-700">•</span>
            <a
              href="https://honeyops.net/cookies"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-amber-400 transition-colors"
            >
              Cookie Policy
            </a>
          </div>

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
