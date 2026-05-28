import { useMemo, useState } from "react";
import { trackEvent } from "../lib/analytics";

const defaultForm = {
  name: "",
  phone: "",
  inquiryType: "General Question",
  message: "",
  callbackRequested: false,
};

export default function InquiryForm({ shopData }) {
  const [form, setForm] = useState(defaultForm);

  const isValid = useMemo(() => {
    const validPhone = /^[0-9]{10,15}$/.test(form.phone.trim());
    return form.name.trim().length > 1 && validPhone && form.message.trim().length > 4;
  }, [form]);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!isValid) return;

    const payload = [
      `Hi ${shopData.name}, I have an inquiry:`,
      `Name: ${form.name.trim()}`,
      `Phone: ${form.phone.trim()}`,
      `Type: ${form.inquiryType}`,
      `Callback requested: ${form.callbackRequested ? "Yes" : "No"}`,
      `Message: ${form.message.trim()}`,
    ].join("\n");

    trackEvent("shop_inquiry_submit", {
      shop_slug: shopData.slug,
      inquiry_type: form.inquiryType,
      callback_requested: form.callbackRequested,
    });

    const url = `https://wa.me/${shopData.phone}?text=${encodeURIComponent(payload)}`;
    window.open(url, "_blank", "noopener,noreferrer");
    setForm(defaultForm);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto mt-10 max-w-2xl rounded-2xl border border-orange-100 bg-orange-50 p-5 text-left md:p-6"
    >
      <h4 className="text-xl font-semibold text-orange-600">Send an inquiry</h4>
      <p className="mt-1 text-sm text-gray-600">
        Ask a question or request a callback. We will respond on WhatsApp or phone.
      </p>

      <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
        <label className="text-sm">
          <span className="mb-1 block font-medium text-gray-700">Your Name</span>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Enter your name"
            className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-orange-400"
            required
          />
        </label>

        <label className="text-sm">
          <span className="mb-1 block font-medium text-gray-700">Phone Number</span>
          <input
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="10-15 digit number"
            inputMode="numeric"
            className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-orange-400"
            required
          />
        </label>
      </div>

      <label className="mt-4 block text-sm">
        <span className="mb-1 block font-medium text-gray-700">Inquiry Type</span>
        <select
          name="inquiryType"
          value={form.inquiryType}
          onChange={handleChange}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-orange-400"
        >
          <option>General Question</option>
          <option>Price Inquiry</option>
          <option>Bulk Order</option>
          <option>Delivery Support</option>
          <option>Callback Request</option>
        </select>
      </label>

      <label className="mt-4 block text-sm">
        <span className="mb-1 block font-medium text-gray-700">Message</span>
        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          rows={4}
          placeholder="Write your question..."
          className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-orange-400"
          required
        />
      </label>

      <label className="mt-4 flex items-center gap-2 text-sm text-gray-700">
        <input
          type="checkbox"
          name="callbackRequested"
          checked={form.callbackRequested}
          onChange={handleChange}
          className="h-4 w-4"
        />
        Request a callback
      </label>

      <button
        type="submit"
        disabled={!isValid}
        className="mt-5 rounded-xl bg-orange-500 px-5 py-2.5 font-semibold text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:bg-orange-300"
      >
        Send Inquiry
      </button>
    </form>
  );
}
