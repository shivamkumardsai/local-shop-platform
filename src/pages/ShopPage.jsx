import { useParams } from "react-router-dom";
import SeoMeta from "../components/SeoMeta";
import ShopWebsite from "../components/ShopWebsite";
import NotFoundPage from "../components/NotFoundPage";
import { getShopBySlug } from "../data/shops";

export default function ShopPage({ fallbackSlug }) {
  const { slug } = useParams();
  const resolvedSlug = slug || fallbackSlug;
  const shop = getShopBySlug(resolvedSlug);

  if (!shop) {
    return <NotFoundPage message="Shop not found" />;
  }

  return (
    <>
      <SeoMeta shopData={shop} />
      <ShopWebsite shopData={shop} />
    </>
  );
}
