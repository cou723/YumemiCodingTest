export function range(end: number): number[];
export function range({ start, end }: { start: number; end: number }): number[];
export function range(param: number | { start: number; end: number }): number[] {
  if (typeof param === "number") {
    const start = 0;
    const end = param;
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  }
  const { start, end } = param;
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
}
