import type { CollectionEntry } from "astro:content";
import downloads from "../data/downloads";

export type PageEntry = CollectionEntry<"pages">;
export type DownloadRecord = (typeof downloads)[number];

export function pagePath(page: PageEntry) {
  return page.id === "home" ? "/" : `/${page.id}/`;
}

export function buildNav(pages: PageEntry[]) {
  return pages
    .filter((page) => page.id !== "home" && typeof page.data.navOrder === "number")
    .sort((left, right) => (left.data.navOrder ?? 999) - (right.data.navOrder ?? 999))
    .map((page) => ({
      title: page.data.navTitle ?? page.data.title,
      slug: page.id,
      path: pagePath(page),
    }));
}

export function trackedDownloadHref(slug: string) {
  return `/api/download/${slug}`;
}

export function downloadCountLabel(count: number | null) {
  if (count == null) return "Download count not available";
  return `${new Intl.NumberFormat("en-US").format(count)} downloads`;
}

export const downloadsBySlug = new Map(downloads.map((item) => [item.slug, item]));
export const listedDownloads = [...downloads].filter((item) => item.listed);
export const featuredDownloads = [...downloads].filter((item) => item.featured);

export function downloadBySlug(slug: string) {
  return downloadsBySlug.get(slug as DownloadRecord["slug"]);
}

listedDownloads.sort((left, right) => Date.parse(right.publishedAt) - Date.parse(left.publishedAt));
featuredDownloads.sort((left, right) => Date.parse(right.publishedAt) - Date.parse(left.publishedAt));

export default downloads;
