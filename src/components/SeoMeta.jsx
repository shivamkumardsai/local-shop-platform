import { useEffect } from "react";

function upsertMeta(selector, attribute, value, content) {
  let meta = document.head.querySelector(selector);
  if (!meta) {
    meta = document.createElement("meta");
    meta.setAttribute(attribute, value);
    document.head.appendChild(meta);
  }
  meta.setAttribute("content", content);
}

export default function SeoMeta({ shopData }) {
  useEffect(() => {
    if (!shopData?.seo) return;

    document.title = shopData.seo.title;

    upsertMeta('meta[name="description"]', "name", "description", shopData.seo.description);
    upsertMeta('meta[name="keywords"]', "name", "keywords", shopData.seo.keywords);
    upsertMeta('meta[property="og:title"]', "property", "og:title", shopData.seo.title);
    upsertMeta(
      'meta[property="og:description"]',
      "property",
      "og:description",
      shopData.seo.description
    );
    upsertMeta("meta[property=\"og:type\"]", "property", "og:type", "website");
    upsertMeta('meta[property="og:image"]', "property", "og:image", shopData.seo.ogImage);
    upsertMeta('meta[property="og:site_name"]', "property", "og:site_name", shopData.name);
  }, [shopData]);

  return null;
}
