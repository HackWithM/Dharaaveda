import { useEffect } from "react";

/**
 * Reusable hook to dynamically update document title and description meta tag for SEO.
 */
export function useSeo(title?: string, description?: string) {
  useEffect(() => {
    if (title) {
      document.title = title;
    }
    if (description) {
      let meta = document.querySelector('meta[name="description"]');
      if (!meta) {
        meta = document.createElement("meta");
        meta.setAttribute("name", "description");
        document.head.appendChild(meta);
      }
      meta.setAttribute("content", description);
    }
  }, [title, description]);
}
