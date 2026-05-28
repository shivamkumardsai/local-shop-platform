const GA_SCRIPT_SRC = "https://www.googletagmanager.com/gtag/js";
let initialized = false;

function loadGoogleTagScript(measurementId) {
  const existing = document.querySelector(
    `script[src="${GA_SCRIPT_SRC}?id=${measurementId}"]`
  );
  if (existing) return;

  const script = document.createElement("script");
  script.async = true;
  script.src = `${GA_SCRIPT_SRC}?id=${measurementId}`;
  document.head.appendChild(script);
}

export function initGoogleAnalytics(measurementId) {
  if (!measurementId || initialized || typeof window === "undefined") return;

  loadGoogleTagScript(measurementId);
  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function gtag(...args) {
    window.dataLayer.push(args);
  };

  window.gtag("js", new Date());
  window.gtag("config", measurementId, { send_page_view: false });
  initialized = true;
}

export function trackPageView(measurementId, path) {
  if (!measurementId || typeof window === "undefined" || !window.gtag) return;

  window.gtag("config", measurementId, {
    page_path: path,
    page_location: window.location.href,
    page_title: document.title,
  });
}

export function trackEvent(eventName, params = {}) {
  if (typeof window === "undefined" || !window.gtag) return;
  window.gtag("event", eventName, params);
}
