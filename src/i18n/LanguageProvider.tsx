import { useEffect, useState, type ReactNode } from "react";
import { km } from "./km";

export type Lang = "en" | "km";

const STORAGE_KEY = "einstein-lang";
const keys = Object.keys(km).sort((a, b) => b.length - a.length);

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export function translateText(raw: string, lang: Lang) {
  if (lang === "en" || !raw.trim()) return raw;
  const trimmed = raw.trim();
  if (km[trimmed]) {
    const start = raw.indexOf(trimmed);
    return raw.slice(0, start) + km[trimmed] + raw.slice(start + trimmed.length);
  }
  if (trimmed.length > 180 || trimmed.includes("@")) return raw;
  let out = raw;
  for (const key of keys) {
    if (key.length < 4 || !out.includes(key)) continue;
    out = out.replace(new RegExp(`(?<![A-Za-z])${escapeRegExp(key)}(?![A-Za-z])`, "g"), km[key]);
  }
  return out;
}

const sources = new Map<string, string>();

function nodeKey(node: Text) {
  const parent = node.parentElement;
  if (!parent) return "";
  const index = [...parent.childNodes].indexOf(node);
  return `${parent.tagName}:${parent.className}:${index}:${(parent.textContent ?? "").slice(0, 24)}`;
}

function applyLanguage(lang: Lang) {
  const root = document.body;
  if (!root) return;

  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  let current = walker.nextNode();
  while (current) {
    const node = current as Text;
    const parent = node.parentElement;
    if (
      parent &&
      !parent.closest("[data-no-translate], script, style, textarea, input, [contenteditable='true']") &&
      parent.tagName !== "SCRIPT"
    ) {
      const key = nodeKey(node);
      const value = node.nodeValue ?? "";
      const stored = sources.get(key);
      const khmer = stored ? translateText(stored, "km") : "";
      if (!stored || (value !== stored && value !== khmer && !/[\u1780-\u17FF]/.test(value))) {
        sources.set(key, value);
      }
      const source = sources.get(key) ?? value;
      const next = translateText(source, lang);
      if (value !== next) node.nodeValue = next;
    }
    current = walker.nextNode();
  }

  root.querySelectorAll<HTMLElement>("input, textarea, select, button, a, [aria-label], [title]").forEach((el) => {
    if (el.closest("[data-no-translate]")) return;
    for (const attr of ["placeholder", "aria-label", "title"] as const) {
      const current = el.getAttribute(attr);
      if (!current) continue;
      if (!el.hasAttribute(`data-en-${attr}`)) el.setAttribute(`data-en-${attr}`, current);
      const source = el.getAttribute(`data-en-${attr}`) ?? current;
      const next = translateText(source, lang);
      if (el.getAttribute(attr) !== next) el.setAttribute(attr, next);
    }
  });

  root.querySelectorAll("option").forEach((opt) => {
    if (!opt.dataset.valueLocked) {
      if (!opt.hasAttribute("value")) opt.setAttribute("value", opt.textContent?.trim() ?? "");
      opt.dataset.enLabel = opt.textContent ?? "";
      opt.dataset.valueLocked = "1";
    }
    const source = opt.dataset.enLabel ?? opt.textContent ?? "";
    const next = translateText(source, lang);
    if (opt.textContent !== next) opt.textContent = next;
  });
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved === "en" ? "en" : "km";
  });

  useEffect(() => {
    document.documentElement.lang = lang;
    localStorage.setItem(STORAGE_KEY, lang);
    document.title =
      lang === "km"
        ? "Salesforce Einstein AI – ស្វ័យប្រវត្តិកម្មការលក់ និងការទស្សន៍ទាយ"
        : "Salesforce Einstein AI – Sales Automation & Forecasting";

    let frame = 0;
    let applying = false;
    const run = () => {
      applying = true;
      applyLanguage(lang);
      applying = false;
    };
    run();
    const observer = new MutationObserver(() => {
      if (applying) return;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(run);
    });
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      characterData: true,
      attributes: true,
      attributeFilter: ["placeholder", "aria-label", "title"],
    });
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [lang]);

  return (
    <>
      {children}
      <div
        data-no-translate
        className="fixed top-[4.7rem] left-3 z-[70] flex rounded-xl border border-slate-200 bg-white p-1 shadow-lg"
      >
        <button
          type="button"
          onClick={() => setLang("km")}
          className={`rounded-lg px-3 py-1.5 text-sm font-bold ${lang === "km" ? "bg-[#0176d3] text-white" : "text-slate-600"}`}
        >
          ខ្មែរ
        </button>
        <button
          type="button"
          onClick={() => setLang("en")}
          className={`rounded-lg px-3 py-1.5 text-sm font-bold ${lang === "en" ? "bg-[#0176d3] text-white" : "text-slate-600"}`}
        >
          EN
        </button>
      </div>
    </>
  );
}
