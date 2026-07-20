// src/utils/misc.ts

// Returns a timestamp string in the format: YYYY-MM-DD_HH-MM
export function timestampNow(): string {
  const d = new Date();
  const pad = (n: number) => String(n).padStart(2, "0");
  const yyyy = d.getFullYear();
  const mm = pad(d.getMonth() + 1);
  const dd = pad(d.getDate());
  const HH = pad(d.getHours());
  const MM = pad(d.getMinutes());
  return `${yyyy}-${mm}-${dd}_${HH}-${MM}`;
}

/** Shorten a mutation id like `mutant-45020db3...` -> `mutant-45020db` (7 chars by default). */
export function toShortMutationId(fullId: string, length = 7): string {
  if (!fullId) return fullId;
  const prefix = "mutant-";
  if (fullId.startsWith(prefix)) return prefix + fullId.slice(prefix.length, prefix.length + length);
  return fullId.slice(0, length);
}