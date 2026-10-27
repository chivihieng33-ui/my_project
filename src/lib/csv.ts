/** Builds a CSV string from an array of row objects. */
export function toCsv<T extends Record<string, unknown>>(
  rows: T[],
  columns?: { key: keyof T; label: string }[],
) {
  if (!rows.length) return "";

  const cols =
    columns ??
    (Object.keys(rows[0]) as (keyof T)[]).map((key) => ({
      key,
      label: String(key),
    }));

  const escape = (value: unknown) => {
    const str = value === null || value === undefined ? "" : String(value);
    return /[",\n]/.test(str) ? `"${str.replace(/"/g, '""')}"` : str;
  };

  const header = cols.map((c) => escape(c.label)).join(",");
  const body = rows.map((row) => cols.map((c) => escape(row[c.key])).join(",")).join("\n");

  return `${header}\n${body}`;
}

/** Triggers a browser download for the given CSV payload. */
export function downloadCsv(csv: string, filename: string) {
  const blob = new Blob([`\uFEFF${csv}`], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
