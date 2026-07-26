const products = [
  { id: 1, name: "iPhone 15 Pro Max 256GB", category: "هواتف جديدة", price: 630000, cost: 570000, stock: 6, imei: "353921102938475", icon: "▰" },
  { id: 2, name: "Samsung Galaxy A55 5G", category: "هواتف جديدة", price: 238000, cost: 205000, stock: 12, imei: "358240116543902", icon: "▱" },
  { id: 3, name: "Xiaomi Redmi Note 13", category: "هواتف جديدة", price: 146000, cost: 119000, stock: 4, imei: "869120449218330", icon: "▰" },
  { id: 4, name: "iPhone 12 مستعمل 128GB", category: "هواتف مستعملة", price: 198000, cost: 145000, stock: 2, imei: "356938035643809", icon: "▧" },
  { id: 5, name: "Samsung S22 Ultra مستعمل", category: "هواتف مستعملة", price: 275000, cost: 221000, stock: 1, imei: "351234987650128", icon: "▧" },
  { id: 6, name: "شاحن USB-C سريع 25W", category: "إكسسوارات", price: 12000, cost: 6200, stock: 8, imei: "-", icon: "⚡" },
  { id: 7, name: "سماعة AirPods Pro", category: "إكسسوارات", price: 78000, cost: 52000, stock: 15, imei: "-", icon: "◉" },
  { id: 8, name: "حماية شاشة زجاجية", category: "إكسسوارات", price: 2500, cost: 900, stock: 32, imei: "-", icon: "□" }
];

const customers = [
  { name: "خديجة بنت سالم", type: "عميل ذهبي", total: "2,390,000 أوقية" },
  { name: "شركة الساحل", type: "عميل شركات", total: "8,145,000 أوقية" },
  { name: "محمد الأمين", type: "عميل نقدي", total: "928,000 أوقية" },
  { name: "مورد التقنيات الحديثة", type: "مورد", total: "12,800,000 أوقية" }
];

const warehouses = [
  { code: "WH-NKC", name: "المستودع الرئيسي - نواكشوط", branch: "فرع نواكشوط", manager: "محمد الأمين", capacity: 120, used: 80, status: "نشط" },
  { code: "WH-NDB", name: "مستودع نواذيبو", branch: "فرع نواذيبو", manager: "خديجة بنت سالم", capacity: 75, used: 43, status: "نشط" },
  { code: "WH-ACC", name: "مستودع القطع والإكسسوارات", branch: "فرع نواكشوط", manager: "شركة الساحل", capacity: 220, used: 146, status: "مراجعة" }
];

const warehouseStocks = [
  { warehouse: "المستودع الرئيسي - نواكشوط", product: "iPhone 15 Pro Max 256GB", category: "هواتف جديدة", available: 4, reserved: 1, minimum: 2 },
  { warehouse: "المستودع الرئيسي - نواكشوط", product: "Samsung Galaxy A55 5G", category: "هواتف جديدة", available: 7, reserved: 2, minimum: 3 },
  { warehouse: "مستودع نواذيبو", product: "Xiaomi Redmi Note 13", category: "هواتف جديدة", available: 3, reserved: 0, minimum: 4 },
  { warehouse: "مستودع نواذيبو", product: "iPhone 12 مستعمل 128GB", category: "هواتف مستعملة", available: 2, reserved: 0, minimum: 1 },
  { warehouse: "مستودع القطع والإكسسوارات", product: "شاحن USB-C سريع 25W", category: "إكسسوارات", available: 8, reserved: 3, minimum: 10 },
  { warehouse: "مستودع القطع والإكسسوارات", product: "حماية شاشة زجاجية", category: "إكسسوارات", available: 32, reserved: 6, minimum: 20 }
];

let invoices = [
  ["#H1048", "خديجة بنت سالم", "اليوم 11:42", "286,000 أوقية", "مدفوعة"],
  ["#H1047", "عميل نقدي", "اليوم 10:18", "78,000 أوقية", "مدفوعة"],
  ["#H1046", "شركة الساحل", "أمس 16:02", "1,120,000 أوقية", "آجلة"],
  ["#H1045", "محمد الأمين", "أمس 13:31", "198,000 أوقية", "ضمان"],
  ["#H1044", "عميل نقدي", "الخميس 19:20", "12,000 أوقية", "مدفوعة"]
];

const cart = new Map();
const formatter = new Intl.NumberFormat("ar-MR");
const money = value => `${formatter.format(value)} أوقية`;
const normalize = value => value.toString().trim().toLocaleLowerCase("ar");

const titles = {
  dashboard: "لوحة التحكم",
  pos: "بيع سريع",
  inventory: "المخزون",
  trade: "شراء واستبدال",
  contacts: "العملاء والموردون",
  invoices: "الفواتير",
  reports: "التقارير",
  settings: "الإعدادات"
};

let activeCategory = "الكل";

function switchView(viewId) {
  document.querySelectorAll(".view").forEach(view => view.classList.toggle("active", view.id === viewId));
  document.querySelectorAll(".nav-item").forEach(item => item.classList.toggle("active", item.dataset.view === viewId));
  document.getElementById("viewTitle").textContent = titles[viewId];
}

function getVisibleProducts() {
  const query = normalize(document.getElementById("globalSearch").value);
  return products.filter(product => {
    const matchesCategory = activeCategory === "الكل" || product.category === activeCategory;
    const haystack = normalize(`${product.name} ${product.category} ${product.price} ${product.imei}`);
    return matchesCategory && (!query || haystack.includes(query));
  });
}

function renderSaleProducts(items = getVisibleProducts()) {
  const container = document.getElementById("saleProducts");
  container.innerHTML = items.length ? items.map(product => `
    <article class="product-card">
      <div class="product-thumb" aria-hidden="true">${product.icon}</div>
      <div>
        <strong>${product.name}</strong>
        <p class="eyebrow">${product.category} - ${product.stock} متاح - IMEI ${product.imei}</p>
      </div>
      <button class="primary" data-add="${product.id}" ${product.stock === 0 ? "disabled" : ""}>إضافة - ${money(product.price)}</button>
    </article>
  `).join("") : `<div class="empty-state">لا توجد نتائج مطابقة للبحث الحالي.</div>`;
}

function renderProductsTable(items = getVisibleProducts()) {
  document.getElementById("productsTable").innerHTML = items.map(product => {
    const status = product.stock < 5 ? ["منخفض", "warn"] : product.category === "هواتف مستعملة" ? ["فحص مطلوب", "neutral"] : ["متوفر", ""];
    return `
      <tr>
        <td><strong>${product.name}</strong></td>
        <td>${product.category}</td>
        <td>${product.imei}</td>
        <td>${money(product.cost)}</td>
        <td>${money(product.price)}</td>
        <td>${product.stock}</td>
        <td><span class="badge ${status[1]}">${status[0]}</span></td>
      </tr>
    `;
  }).join("");
}

function getWarehouseUsage(warehouse) {
  return Math.round((warehouse.used / warehouse.capacity) * 100);
}

function renderInventorySummary() {
  const activeWarehouses = warehouses.filter(warehouse => warehouse.status === "نشط").length;
  const totalCapacity = warehouses.reduce((sum, warehouse) => sum + warehouse.capacity, 0);
  const totalUsed = warehouses.reduce((sum, warehouse) => sum + warehouse.used, 0);
  const totalReserved = warehouseStocks.reduce((sum, item) => sum + item.reserved, 0);
  const reorderItems = warehouseStocks.filter(item => Math.max(0, item.available - item.reserved) <= item.minimum).length;
  const usage = totalCapacity ? Math.round((totalUsed / totalCapacity) * 100) : 0;

  document.getElementById("activeWarehouseCount").textContent = activeWarehouses;
  document.getElementById("warehouseStatusSummary").textContent = `${warehouses.length} مستودعات مسجلة`;
  document.getElementById("warehouseCapacity").textContent = `${totalUsed} / ${totalCapacity}`;
  document.getElementById("warehouseUsageSummary").textContent = `${usage}% إشغال`;
  document.getElementById("reservedStockCount").textContent = totalReserved;
  document.getElementById("reorderCount").textContent = reorderItems;
}

function renderWarehousesTable() {
  const table = document.getElementById("warehousesTable");
  if (!table) return;

  table.innerHTML = warehouses.map(warehouse => {
    const usage = getWarehouseUsage(warehouse);
    const badge = warehouse.status === "مراجعة" ? "warn" : "";
    return `
      <tr>
        <td><strong>${warehouse.code}</strong></td>
        <td>${warehouse.name}</td>
        <td>${warehouse.branch}</td>
        <td>${warehouse.manager}</td>
        <td>${warehouse.used} / ${warehouse.capacity}</td>
        <td>${usage}%</td>
        <td><span class="badge ${badge}">${warehouse.status}</span></td>
      </tr>
    `;
  }).join("");
}

function renderWarehouseStocksTable() {
  const table = document.getElementById("warehouseStockTable");
  if (!table) return;

  table.innerHTML = warehouseStocks.map(item => {
    const netAvailable = Math.max(0, item.available - item.reserved);
    const needsReorder = netAvailable <= item.minimum;
    return `
      <tr>
        <td><strong>${item.warehouse}</strong></td>
        <td>${item.product}</td>
        <td>${item.category}</td>
        <td>${item.available}</td>
        <td>${item.reserved}</td>
        <td>${netAvailable}</td>
        <td><span class="badge ${needsReorder ? "warn" : ""}">${needsReorder ? "إعادة طلب" : "متوازن"}</span></td>
      </tr>
    `;
  }).join("");
}

function renderCustomers() {
  document.getElementById("customersList").innerHTML = customers.map(customer => `
    <article class="customer-card">
      <div>
        <strong>${customer.name}</strong>
        <span>${customer.type}</span>
      </div>
      <strong>${customer.total}</strong>
    </article>
  `).join("");
}

function renderInvoices() {
  document.getElementById("invoiceTable").innerHTML = invoices.map(invoice => {
    const className = invoice[4] === "آجلة" ? "warn" : invoice[4] === "ضمان" ? "neutral" : "";
    return `
      <tr>
        <td><strong>${invoice[0]}</strong></td>
        <td>${invoice[1]}</td>
        <td>${invoice[2]}</td>
        <td>${invoice[3]}</td>
        <td><span class="badge ${className}">${invoice[4]}</span></td>
      </tr>
    `;
  }).join("");
}

function updateActionStates() {
  const hasItems = cart.size > 0;
  ["payButton", "draftButton", "clearCart", "printButton", "shareButton"].forEach(id => {
    document.getElementById(id).disabled = !hasItems;
  });
}

function addToCart(productId) {
  const product = products.find(item => item.id === productId);
  if (!product) return;

  const current = cart.get(productId) || { ...product, qty: 0 };
  if (current.qty >= product.stock) {
    showToast("الكمية المطلوبة غير متوفرة في المخزون.");
    return;
  }

  current.qty += 1;
  cart.set(productId, current);
  renderCart();
}

function changeQty(productId, delta) {
  const item = cart.get(productId);
  if (!item) return;

  const product = products.find(entry => entry.id === productId);
  if (delta > 0 && item.qty >= product.stock) {
    showToast("وصلت إلى آخر كمية متاحة من هذا الصنف.");
    return;
  }

  item.qty += delta;
  if (item.qty <= 0) cart.delete(productId);
  renderCart();
}

function renderCart() {
  const container = document.getElementById("cartItems");
  const items = [...cart.values()];
  if (!items.length) {
    container.innerHTML = `<div class="cart-empty">اختر هاتفًا أو إكسسوارًا لبدء الفاتورة</div>`;
  } else {
    container.innerHTML = items.map(item => `
      <div class="cart-row">
        <div>
          <strong>${item.name}</strong>
          <small>${money(item.price)} للقطعة - ربح ${money(item.price - item.cost)}</small>
        </div>
        <div class="qty">
          <button aria-label="إنقاص ${item.name}" data-qty="${item.id}" data-delta="-1">−</button>
          <strong>${item.qty}</strong>
          <button aria-label="زيادة ${item.name}" data-qty="${item.id}" data-delta="1">+</button>
        </div>
      </div>
    `).join("");
  }

  const subtotal = items.reduce((sum, item) => sum + item.price * item.qty, 0);
  const tax = Math.round(subtotal * 0.03);
  document.getElementById("subtotal").textContent = money(subtotal);
  document.getElementById("tax").textContent = money(tax);
  document.getElementById("grandTotal").textContent = money(subtotal + tax);
  updateActionStates();
}

function refreshProductViews() {
  const visibleProducts = getVisibleProducts();
  renderSaleProducts(visibleProducts);
  renderProductsTable(visibleProducts);
}

function completePayment() {
  const items = [...cart.values()];
  if (!items.length) {
    showToast("أضف صنفًا واحدًا على الأقل قبل إتمام البيع.");
    return;
  }

  const subtotal = items.reduce((sum, item) => sum + item.price * item.qty, 0);
  const grandTotal = subtotal + Math.round(subtotal * 0.03);
  const customer = document.getElementById("customerSelect").value;
  const nextNumber = `#H${1049 + invoices.length - 5}`;

  items.forEach(item => {
    const product = products.find(productItem => productItem.id === item.id);
    product.stock = Math.max(0, product.stock - item.qty);
  });

  invoices = [[nextNumber, customer, "الآن", money(grandTotal), "مدفوعة"], ...invoices];
  cart.clear();
  renderCart();
  refreshProductViews();
  renderInvoices();
  localStorage.removeItem("phoneProDraft");
  showToast(`تم إصدار الفاتورة ${nextNumber} بقيمة ${money(grandTotal)}.`);
}

function saveDraft() {
  if (!cart.size) {
    showToast("لا توجد عناصر لحفظها كمسودة.");
    return;
  }

  const draft = {
    customer: document.getElementById("customerSelect").value,
    items: [...cart.entries()].map(([id, item]) => [id, item.qty])
  };
  localStorage.setItem("phoneProDraft", JSON.stringify(draft));
  showToast("تم حفظ الفاتورة كمسودة محلية.");
}

function restoreDraft() {
  const rawDraft = localStorage.getItem("phoneProDraft");
  if (!rawDraft) return;

  try {
    const draft = JSON.parse(rawDraft);
    document.getElementById("customerSelect").value = draft.customer;
    draft.items.forEach(([id, qty]) => {
      const product = products.find(item => item.id === Number(id));
      if (product && product.stock > 0) cart.set(product.id, { ...product, qty: Math.min(qty, product.stock) });
    });
    renderCart();
    if (cart.size) showToast("تم استرجاع آخر مسودة محفوظة.");
  } catch {
    localStorage.removeItem("phoneProDraft");
  }
}

function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.add("show");
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => toast.classList.remove("show"), 2400);
}

document.querySelectorAll(".nav-item").forEach(item => {
  item.addEventListener("click", () => switchView(item.dataset.view));
});

document.querySelectorAll("[data-category]").forEach(button => {
  button.addEventListener("click", () => {
    activeCategory = button.dataset.category;
    document.querySelectorAll("[data-category]").forEach(item => item.classList.toggle("active", item === button));
    refreshProductViews();
  });
});

document.addEventListener("click", event => {
  const addButton = event.target.closest("[data-add]");
  const qtyButton = event.target.closest("[data-qty]");
  if (addButton) addToCart(Number(addButton.dataset.add));
  if (qtyButton) changeQty(Number(qtyButton.dataset.qty), Number(qtyButton.dataset.delta));
});

document.getElementById("clearCart").addEventListener("click", () => {
  cart.clear();
  renderCart();
  localStorage.removeItem("phoneProDraft");
  showToast("تم مسح الفاتورة الحالية.");
});

document.getElementById("payButton").addEventListener("click", completePayment);
document.getElementById("draftButton").addEventListener("click", saveDraft);
document.getElementById("printButton").addEventListener("click", () => showToast("تم تجهيز قالب الطباعة الحرارية 80 مم."));
document.getElementById("shareButton").addEventListener("click", () => showToast("تم تجهيز رابط إرسال الفاتورة عبر WhatsApp."));
document.getElementById("globalSearch").addEventListener("input", refreshProductViews);
document.getElementById("themeToggle").addEventListener("click", event => {
  document.body.classList.toggle("dark");
  event.currentTarget.textContent = document.body.classList.contains("dark") ? "الوضع النهاري" : "الوضع الليلي";
});

renderSaleProducts();
renderProductsTable();
renderInventorySummary();
renderWarehousesTable();
renderWarehouseStocksTable();
renderCustomers();
renderInvoices();
renderCart();
restoreDraft();
