import { Navigate, Route, Routes } from "react-router-dom";
import NotFoundPage from "./components/NotFoundPage";
import RouteAnalytics from "./components/RouteAnalytics";
import ShopPage from "./pages/ShopPage";

function App() {
  return (
    <>
      <RouteAnalytics />
      <Routes>
        <Route path="/" element={<ShopPage fallbackSlug="gupta-sweets" />} />
        <Route path="/shop/:slug" element={<ShopPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default App;
