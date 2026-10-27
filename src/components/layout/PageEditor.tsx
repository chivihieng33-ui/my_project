import { useEffect, useState } from "react";
import { monthlySales, type MonthPoint } from "@/data/sales";
import { loadMonths, resetMonths, saveMonths } from "@/lib/liveMonths";
import { Icon } from "../Icon";

const TEXT_KEY = "einstein-page-edits";
const SKIP = "button, a, form, input, textarea, select, svg, nav, [data-no-edit]";
const INLINE = new Set(["SPAN", "STRONG", "EM", "B", "I", "BR", "SMALL", "MARK"]);

function loadText(): Record<string, string> {
  try {
    const raw = localStorage.getItem(TEXT_KEY);
    return raw ? (JSON.parse(raw) as Record<string, string>) : {};
  } catch {
    return {};
  }
}

function pathOf(el: Element, root: Element) {
  const parts: string[] = [];
  let node: Element | null = el;
  while (node && node !== root && node.parentElement) {
    const index = [...node.parentElement.children].indexOf(node);
    parts.unshift(`${node.tagName.toLowerCase()}:${index}`);
    node = node.parentElement;
  }
  return parts.join("/");
}

function findByPath(root: Element, path: string) {
  let node: Element = root;
  for (const part of path.split("/")) {
    if (!part) return null;
    const [tag, indexRaw] = part.split(":");
    const child = node.children[Number(indexRaw)];
    if (!child || child.tagName.toLowerCase() !== tag) return null;
    node = child;
  }
  return node;
}

function isTextBlock(el: HTMLElement) {
  if (el.closest(SKIP)) return false;
  if (el.querySelector("input, textarea, select, button, a, svg, table, canvas")) return false;
  const text = (el.textContent ?? "").trim();
  if (text.length < 1 || text.length > 700) return false;
  const kids = [...el.children];
  if (kids.some((kid) => !INLINE.has(kid.tagName))) return false;
  return true;
}

export function PageEditor() {
  const [editing, setEditing] = useState(false);
  const [charts, setCharts] = useState(false);
  const [months, setMonths] = useState<MonthPoint[]>(() => loadMonths());

  useEffect(() => {
    const root = document.getElementById("root");
    if (!root) return;
    const store = loadText();
    let applying = false;
    let frame = 0;

    const chosen = () => {
      const all = [...root.querySelectorAll("h1,h2,h3,h4,h5,h6,p,li,td,th,dt,dd,blockquote,figcaption,span,label,div")]
        .filter((el): el is HTMLElement => el instanceof HTMLElement && isTextBlock(el));
      return all.filter((el) => !all.some((other) => other !== el && other.contains(el)));
    };

    const mark = () => {
      applying = true;
      root.querySelectorAll("[data-edit-path]").forEach((el) => {
        if (!editing) el.removeAttribute("contenteditable");
      });
      if (editing) {
        document.body.classList.add("is-editing");
        chosen().forEach((el) => {
          el.setAttribute("contenteditable", "true");
          el.setAttribute("data-edit-path", pathOf(el, root));
          el.setAttribute("spellcheck", "true");
        });
      } else {
        document.body.classList.remove("is-editing");
      }
      applying = false;
    };

    const apply = () => {
      applying = true;
      for (const [path, text] of Object.entries(store)) {
        const el = findByPath(root, path);
        if (!(el instanceof HTMLElement) || document.activeElement === el) continue;
        if (el.textContent !== text) el.textContent = text;
      }
      applying = false;
    };

    const refresh = () => {
      mark();
      apply();
    };
    refresh();

    const onInput = (event: Event) => {
      const el = event.target;
      if (!(el instanceof HTMLElement) || !el.dataset.editPath) return;
      store[el.dataset.editPath] = el.textContent ?? "";
      localStorage.setItem(TEXT_KEY, JSON.stringify(store));
    };

    const observer = new MutationObserver(() => {
      if (applying) return;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(refresh);
    });
    observer.observe(root, { childList: true, subtree: true });
    root.addEventListener("input", onInput);

    return () => {
      observer.disconnect();
      root.removeEventListener("input", onInput);
      cancelAnimationFrame(frame);
      document.body.classList.remove("is-editing");
    };
  }, [editing]);

  const changeMonth = (index: number, key: "actual" | "predicted" | "target", raw: string) => {
    const value = Number(raw);
    if (Number.isNaN(value)) return;
    const next = months.map((row, i) => (i === index ? { ...row, [key]: value } : row));
    setMonths(next);
    saveMonths(next);
  };

  const resetAll = () => {
    localStorage.removeItem(TEXT_KEY);
    resetMonths();
    setMonths(monthlySales.map((row) => ({ ...row })));
    window.location.reload();
  };

  return (
    <div data-no-edit className="pointer-events-none fixed inset-x-0 bottom-4 z-50 flex justify-center px-4">
      <div className="pointer-events-auto w-full max-w-3xl">
        {editing && charts && (
          <div className="mb-3 max-h-72 overflow-auto rounded-2xl border border-slate-200 bg-white p-4 shadow-2xl">
            <p className="text-sm font-extrabold text-slate-900">Edit chart numbers</p>
            <p className="mt-1 text-xs text-slate-500">Amounts are in millions. Charts update as you type.</p>
            <div className="mt-3 overflow-x-auto">
              <table className="w-full min-w-[520px] text-left text-xs">
                <thead className="text-slate-400 uppercase">
                  <tr>
                    <th className="py-1">Month</th>
                    <th>Actual</th>
                    <th>Predicted</th>
                    <th>Target</th>
                  </tr>
                </thead>
                <tbody>
                  {months.map((row, index) => (
                    <tr key={row.month} className="border-t border-slate-100">
                      <td className="py-1.5 font-bold text-slate-700">{row.label}</td>
                      {(["actual", "predicted", "target"] as const).map((key) => (
                        <td key={key} className="pr-2">
                          <input
                            type="number"
                            step="0.01"
                            value={row[key]}
                            onChange={(e) => changeMonth(index, key, e.target.value)}
                            className="w-24 rounded-md border border-slate-200 px-2 py-1 font-semibold text-slate-800"
                          />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        <div className="mx-auto flex w-fit flex-wrap items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white/95 px-3 py-2 shadow-2xl backdrop-blur">
          <button
            onClick={() => setEditing((v) => !v)}
            className="inline-flex items-center gap-2 rounded-xl bg-[#0176d3] px-4 py-2 text-sm font-bold text-white hover:bg-[#0b5cab]"
          >
            <Icon name="pencil" className="h-4 w-4" />
            {editing ? "Done editing" : "Edit all"}
          </button>
          {editing && (
            <>
              <button
                onClick={() => setCharts((v) => !v)}
                className="rounded-xl border border-slate-200 px-3 py-2 text-sm font-bold text-slate-700 hover:bg-slate-50"
              >
                {charts ? "Hide chart numbers" : "Edit chart numbers"}
              </button>
              <button
                onClick={resetAll}
                className="rounded-xl border border-rose-200 px-3 py-2 text-sm font-bold text-rose-600 hover:bg-rose-50"
              >
                Reset
              </button>
              <span className="px-1 text-xs text-slate-500">Click any outlined text to change it. It saves automatically.</span>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
