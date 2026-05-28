import ShopWebsite from "./src/components/ShopWebsite";
import { defaultShopSlug, getShopBySlug } from "./src/data/shops";

export default function LocalShopWebsite() {
  const shopData = getShopBySlug(defaultShopSlug);
  return <ShopWebsite shopData={shopData} />;
}
