/** Format a number with dot as thousands separator (Romanian style), SSR-safe */
export function fmt(n: number): string {
  return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}
