/**
 * Sanitize a slug string: trim, lowercase, replace Romanian diacritics,
 * replace spaces/special chars with hyphens, collapse multiple hyphens.
 */
export function sanitizeSlug(raw: string): string {
  return raw
    .trim()
    .toLowerCase()
    .normalize("NFD")                       // decompose diacritics
    .replace(/[\u0300-\u036f]/g, "")        // remove combining marks (ă→a, ș→s, ț→t, î→i, â→a)
    .replace(/[^a-z0-9]+/g, "-")            // replace non-alphanumeric with -
    .replace(/^-+|-+$/g, "");               // remove leading/trailing hyphens
}

/**
 * Generate a slug from a title string.
 */
export function slugify(title: string): string {
  return sanitizeSlug(title);
}
