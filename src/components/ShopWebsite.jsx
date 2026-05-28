import { useMemo, useState } from "react";
import InquiryForm from "./InquiryForm";

export default function ShopWebsite({ shopData }) {
  const whatsappLink = `https://wa.me/${shopData.phone}`;
  const callLink = `tel:+${shopData.phone}`;
  const hasCoordinates =
    typeof shopData.location?.lat === "number" &&
    typeof shopData.location?.lng === "number";
  const mapsQuery = hasCoordinates
    ? `${shopData.location.lat},${shopData.location.lng}`
    : shopData.address;
  const directionLink = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
    mapsQuery
  )}`;
  const categories = useMemo(() => {
    const set = new Set(shopData.menu.map((item) => item.category || "Other"));
    return ["All", ...set];
  }, [shopData.menu]);
  const [activeCategory, setActiveCategory] = useState("All");
  const filteredMenu = useMemo(() => {
    if (activeCategory === "All") return shopData.menu;
    return shopData.menu.filter(
      (item) => (item.category || "Other") === activeCategory
    );
  }, [activeCategory, shopData.menu]);

  const orderOnWhatsApp = (itemName) => {
    const message = `Hello ${shopData.name}, I want to order ${itemName}`;
    const whatsappURL = `${whatsappLink}?text=${encodeURIComponent(
      message
    )}`;

    window.open(whatsappURL, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="min-h-screen bg-orange-50 text-gray-800">
      <nav className="sticky top-0 z-50 flex items-center justify-between bg-white px-6 py-4 shadow-md">
        <div className="flex items-center gap-3">
          <img
            src={shopData.logo}
            alt={`${shopData.name} logo`}
            className="h-12 w-12 rounded-full border object-cover"
            loading="eager"
            decoding="async"
          />
          <div>
            <h1 className="text-2xl font-bold text-orange-600">
              {shopData.name}
            </h1>
            <p className="text-sm text-gray-500">{shopData.tagline}</p>
          </div>
        </div>

        <a
          href={whatsappLink}
          target="_blank"
          rel="noreferrer"
          className="rounded-xl bg-green-500 px-5 py-2 font-medium text-white transition hover:bg-green-600"
        >
          WhatsApp Order
        </a>
      </nav>

      <section
        className="relative flex h-[400px] items-center justify-center text-center"
        style={{
          backgroundImage: `url(${shopData.banner})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/50" />

        <div className="relative z-10 max-w-2xl px-4 text-white">
          <h2 className="mb-4 text-5xl font-bold">{shopData.name}</h2>
          <p className="mb-6 text-lg md:text-xl">
            Delicious sweets and snacks delivered fresh every day.
          </p>

          <a
            href="#menu"
            className="rounded-2xl bg-orange-500 px-6 py-3 text-lg font-semibold transition hover:bg-orange-600"
          >
            View Menu
          </a>
        </div>
      </section>

      {shopData.festivalBanner?.enabled && (
        <section className="bg-gradient-to-r from-orange-500 to-amber-500 px-6 py-3 text-white">
          <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 text-center md:flex-row md:text-left">
            <p className="text-sm font-medium md:text-base">
              {shopData.festivalBanner.text}
            </p>
            <a
              href={whatsappLink}
              target="_blank"
              rel="noreferrer"
              className="rounded-lg bg-white px-4 py-2 text-sm font-semibold text-orange-600 transition hover:bg-orange-100"
            >
              {shopData.festivalBanner.ctaText || "Claim Offer"}
            </a>
          </div>
        </section>
      )}

      <section className="mx-auto max-w-6xl px-6 py-16 text-center">
        <h3 className="mb-6 text-4xl font-bold text-orange-600">
          Welcome to {shopData.name}
        </h3>

        <p className="mx-auto max-w-3xl text-lg leading-8 text-gray-600">
          {shopData.about}
        </p>
      </section>

      <section id="menu" className="mx-auto max-w-7xl px-6 py-10">
        <div className="mb-12 text-center">
          <h3 className="text-4xl font-bold text-orange-600">Our Menu</h3>
          <p className="mt-3 text-gray-500">
            Simple online ordering for local customers.
          </p>
        </div>

        <div className="mb-8 flex flex-wrap justify-center gap-3">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                activeCategory === category
                  ? "bg-orange-500 text-white"
                  : "bg-white text-gray-700 hover:bg-orange-100"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {filteredMenu.map((item) => (
            <div
              key={item.id}
              className="overflow-hidden rounded-3xl bg-white shadow-md transition hover:shadow-xl"
            >
              <img
                src={item.image}
                alt={item.name}
                className="h-56 w-full object-cover"
                loading="lazy"
                decoding="async"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              />

              <div className="p-5">
                <h4 className="mb-2 text-2xl font-semibold">{item.name}</h4>
                <p className="mb-2 text-sm text-gray-500">{item.category}</p>
                <p className="mb-4 text-lg font-bold text-orange-600">
                  {item.price}
                </p>

                <button
                  onClick={() => orderOnWhatsApp(item.name)}
                  className="w-full rounded-xl bg-green-500 py-3 font-medium text-white transition hover:bg-green-600"
                >
                  Order on WhatsApp
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-16 bg-white px-6 py-16">
        <div className="mx-auto max-w-4xl text-center">
          <h3 className="mb-6 text-4xl font-bold text-orange-600">
            Contact Us
          </h3>

          <div className="space-y-4 text-lg text-gray-700">
            <p>
              📍 <strong>Address:</strong> {shopData.address}
            </p>
            <p>
              🏙️ <strong>City:</strong> {shopData.city}
            </p>

            <p>
              📞 <strong>Phone:</strong> +{shopData.phone}
            </p>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <a
              href={whatsappLink}
              target="_blank"
              rel="noreferrer"
              className="inline-block rounded-2xl bg-green-500 px-6 py-4 text-lg font-semibold text-white transition hover:bg-green-600"
            >
              Place Order Now
            </a>
            <a
              href={directionLink}
              target="_blank"
              rel="noreferrer"
              className="inline-block rounded-2xl bg-blue-500 px-6 py-4 text-lg font-semibold text-white transition hover:bg-blue-600"
            >
              Get Directions
            </a>
          </div>

          <InquiryForm shopData={shopData} />
        </div>
      </section>

      <footer className="mt-10 bg-orange-600 py-6 text-center text-white">
        <p>© 2026 {shopData.name}. All rights reserved.</p>
      </footer>

      <a
        href={whatsappLink}
        target="_blank"
        rel="noreferrer"
        aria-label={`Order on WhatsApp from ${shopData.name}`}
        className="fixed bottom-4 right-4 z-50 rounded-full bg-green-500 px-4 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-green-600 md:hidden"
      >
        WhatsApp
      </a>
      <a
        href={callLink}
        aria-label={`Call ${shopData.name}`}
        className="fixed bottom-4 right-28 z-50 rounded-full bg-blue-500 px-4 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-blue-600 md:hidden"
      >
        Call Now
      </a>
    </div>
  );
}
