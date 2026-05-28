/*
  SHOP ONBOARDING TEMPLATE (copy-paste inside shopsCatalog):

  "new-shop-slug": {
    slug: "new-shop-slug", // URL path: /shop/new-shop-slug (must match key)
    name: "Shop Display Name", // Brand name shown in UI
    tagline: "Short one-line brand message", // Hero/subtitle text
    city: "Patna", // Used in shop cards and contact section
    phone: "919999999999", // Digits only with country code (used for call/WhatsApp)
    address: "Full address, Area, City, State", // Shown to users and maps fallback
    location: { lat: 25.1234, lng: 85.1234 }, // Optional but recommended for precise directions
    logo: "https://.../logo.jpg", // Prefer square image, ~200-400px
    banner: "https://.../banner.jpg", // Hero background, wide image (1200px+)
    festivalBanner: {
      enabled: false, // true to show announcement strip
      text: "Offer text for festival/announcement",
      ctaText: "Order Offer",
    },
    about: "Short paragraph about quality, speciality and ordering.",
    seo: {
      title: "SEO title for browser + search",
      description: "Meta description for search/social preview",
      keywords: "comma, separated, keywords",
      ogImage: "https://.../social-share-image.jpg", // Open Graph image
    },
    menu: [
      {
        id: "unique-item-id", // unique per menu item
        category: "Snacks", // used in filter buttons
        name: "Item Name",
        price: "₹120",
        image: "https://.../item.jpg", // optimized image URL
      },
    ],
  },
*/

// Add or update shops only inside this object.
export const shopsCatalog = {
  "gupta-sweets": {
    slug: "gupta-sweets",
    name: "Gupta Sweets",
    tagline: "Fresh Sweets & Snacks Everyday",
    city: "Mithapur",
    phone: "919876543210",
    address: "Mithapur, Bihar",
    location: { lat: 25.5941, lng: 85.1376 },
    logo: "https://images.unsplash.com/photo-1519864600265-abb23847ef2c?q=80&w=220&auto=format&fit=crop",
    banner:
      "https://images.unsplash.com/photo-1551024601-bec78aea704b?q=80&w=1600&auto=format&fit=crop",
    festivalBanner: {
      enabled: true,
      text: "Summer offer: 10% off on sweets above ₹500.",
      ctaText: "Order Offer",
    },
    about:
      "We serve fresh sweets, snacks, and traditional taste with quality and hygiene. Customers can directly place orders online through WhatsApp.",
    seo: {
      title: "Gupta Sweets | Fresh Sweets & Snacks in Mithapur",
      description:
        "Order fresh sweets and snacks online from Gupta Sweets, Mithapur. Fast WhatsApp ordering for rasgulla, gulab jamun, samosa and more.",
      keywords:
        "Gupta Sweets, Mithapur sweets shop, rasgulla, gulab jamun, samosa, Bihar sweets online order",
      ogImage:
        "https://images.unsplash.com/photo-1551024601-bec78aea704b?q=80&w=1200&auto=format&fit=crop",
    },
    menu: [
      {
        id: "rasgulla",
        category: "Sweets",
        name: "Rasgulla",
        price: "₹220/kg",
        image:
          "https://images.unsplash.com/photo-1605197161470-5b1e64fd6f82?q=80&w=700&auto=format&fit=crop",
      },
      {
        id: "gulab-jamun",
        category: "Sweets",
        name: "Gulab Jamun",
        price: "₹240/kg",
        image:
          "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?q=80&w=700&auto=format&fit=crop",
      },
      {
        id: "samosa",
        category: "Snacks",
        name: "Samosa",
        price: "₹20/piece",
        image:
          "https://images.unsplash.com/photo-1601050690597-df0568f70950?q=80&w=700&auto=format&fit=crop",
      },
      {
        id: "kachori",
        category: "Snacks",
        name: "Kachori",
        price: "₹25/piece",
        image:
          "https://images.unsplash.com/photo-1626132647523-66d4d5fd37c8?q=80&w=700&auto=format&fit=crop",
      },
    ],
  },
};

export const defaultShopSlug = "gupta-sweets";

export function getAllShops() {
  return Object.values(shopsCatalog);
}

export function getShopBySlug(slug) {
  return shopsCatalog[slug] ?? null;
}
