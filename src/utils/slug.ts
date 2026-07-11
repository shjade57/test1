/**
 * 从 content collection entry 的 id 中提取干净的 slug
 * Astro v5 的 id 可能包含 .mdx/.md 扩展名
 */
export function getSlug(id: string): string {
  return id.replace(/\.(mdx|md)$/, '');
}
