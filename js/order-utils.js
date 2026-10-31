/* Shared WhatsApp order-message builder for The Olive Grove. No backend/API. */
(function () {
  const money = value => "Rs. " + Number(value || 0).toLocaleString("en-PK");
  function createMessage(cart, products, customer) {
    const lookup = new Map(products.map(product => [Number(product.id), product]));
    const lines = cart.map(item => {
      const product = lookup.get(Number(item.id));
      if (!product) return null;
      const qty = Math.max(1, Number(item.qty) || 1);
      const unit = Number(product.price) || 0;
      return `• ${product.name} (${product.size || ""})\n  Quantity: ${qty}\n  Unit price: ${money(unit)}\n  Line total: ${money(unit * qty)}`;
    }).filter(Boolean);
    const subtotal = cart.reduce((sum, item) => {
      const product = lookup.get(Number(item.id));
      return sum + (product ? (Number(product.price) || 0) * Math.max(1, Number(item.qty) || 1) : 0);
    }, 0);
    return [
      "Hello The Olive Grove! I would like to place an order.",
      "",
      "ORDER ITEMS",
      lines.join("\n\n"),
      "",
      `Total amount: ${money(subtotal)}`,
      "",
      "CUSTOMER DETAILS",
      `Name: ${customer.name}`,
      `WhatsApp / Phone: ${customer.phone}`,
      `Delivery address: ${customer.address}`,
      `City: ${customer.city}`,
      `Order notes: ${customer.notes || "None"}`,
      "",
      "Please confirm my order and delivery details. Thank you!"
    ].join("\n");
  }
  function openWhatsApp(message) {
    const rawNumber = window.OG_STORE_CONFIG?.whatsappNumber || "";
    const number = String(rawNumber).replace(/\D/g, "");
    if (!number) throw new Error("Please configure the WhatsApp Business number in js/store-config.js.");
    const url = `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
    const opened = window.open(url, "_blank");
    if (opened) opened.opener = null;
    else window.location.href = url;
    return url;
  }
  window.OGOrder = { money, createMessage, openWhatsApp };
})();
