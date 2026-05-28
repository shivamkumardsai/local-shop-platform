import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { trackPageView } from "../lib/analytics";

export default function RouteAnalytics() {
  const location = useLocation();
  const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID;

  useEffect(() => {
    const path = `${location.pathname}${location.search}`;
    trackPageView(measurementId, path);
  }, [location, measurementId]);

  return null;
}
