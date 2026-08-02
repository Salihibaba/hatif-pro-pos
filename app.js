let products = [
  { id: 1, name: "iPhone 15 Pro Max 256GB", category: "هواتف جديدة", price: 630000, cost: 570000, stock: 6, imei: "353921102938475", icon: "▰" },
  { id: 2, name: "Samsung Galaxy A55 5G", category: "هواتف جديدة", price: 238000, cost: 205000, stock: 12, imei: "358240116543902", icon: "▱" },
  { id: 3, name: "Xiaomi Redmi Note 13", category: "هواتف جديدة", price: 146000, cost: 119000, stock: 4, imei: "869120449218330", icon: "▰" },
  { id: 4, name: "iPhone 12 مستعمل 128GB", category: "هواتف مستعملة", price: 198000, cost: 145000, stock: 2, imei: "356938035643809", icon: "▧" },
  { id: 5, name: "Samsung S22 Ultra مستعمل", category: "هواتف مستعملة", price: 275000, cost: 221000, stock: 1, imei: "351234987650128", icon: "▧" },
  { id: 6, name: "شاحن USB-C سريع 25W", category: "إكسسوارات", price: 12000, cost: 6200, stock: 8, imei: "-", icon: "⚡" },
  { id: 7, name: "سماعة AirPods Pro", category: "إكسسوارات", price: 78000, cost: 52000, stock: 15, imei: "-", icon: "◉" },
  { id: 8, name: "حماية شاشة زجاجية", category: "إكسسوارات", price: 2500, cost: 900, stock: 32, imei: "-", icon: "□" }
];

let customers = [
  { name: "خديجة بنت سالم", type: "عميل ذهبي", total: "2,390,000 أوقية" },
  { name: "شركة الساحل", type: "عميل شركات", total: "8,145,000 أوقية" },
  { name: "محمد الأمين", type: "عميل نقدي", total: "928,000 أوقية" },
  { name: "مورد التقنيات الحديثة", type: "مورد", total: "12,800,000 أوقية" }
];

let warehouses = [
  { code: "WH-NKC", name: "المستودع الرئيسي - نواكشوط", branch: "فرع نواكشوط", manager: "محمد الأمين", capacity: 120, used: 80, status: "نشط" },
  { code: "WH-NDB", name: "مستودع نواذيبو", branch: "فرع نواذيبو", manager: "خديجة بنت سالم", capacity: 75, used: 43, status: "نشط" },
  { code: "WH-ACC", name: "مستودع القطع والإكسسوارات", branch: "فرع نواكشوط", manager: "شركة الساحل", capacity: 220, used: 146, status: "مراجعة" }
];

let warehouseStocks = [
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

let tradeEvents = [
  { when: "اليوم", title: "iPhone 12 مستعمل مقابل Galaxy A55", note: "فرق مدفوع 86,000 أوقية" },
  { when: "أمس", title: "شراء Redmi Note 13", note: "تكلفة 92,000 أوقية" },
  { when: "هذا الأسبوع", title: "استبدال Samsung S22 Ultra", note: "ربح متوقع 48,000 أوقية" }
];

const cart = new Map();
const formatter = new Intl.NumberFormat("ar-MR");
const money = value => `${formatter.format(value)} أوقية`;
const normalize = value => value.toString().trim().toLocaleLowerCase("ar");
const localKeys = {
  products: "phoneProProducts",
  customers: "phoneProCustomers",
  warehouses: "phoneProWarehouses",
  warehouseStocks: "phoneProWarehouseStocks",
  invoices: "phoneProInvoices",
  tradeEvents: "phoneProTradeEvents",
  resetMode: "phoneProResetMode"
};

const defaultAppData = JSON.parse(JSON.stringify({
  products,
  customers,
  warehouses,
  warehouseStocks,
  invoices,
  tradeEvents
}));

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

let appReadyForGithubSync = false;
let applyingGithubData = false;

async function loadSupabaseData() {
  if (localStorage.getItem(localKeys.resetMode) === "local-defaults") return false;

  const database = window.phoneProSupabase;
  if (!database?.isConnected) return false;

  try {
    const remoteData = await database.loadInitialData();
    if (remoteData.products.length) products = remoteData.products;
    if (remoteData.customers.length) customers = remoteData.customers;
    if (remoteData.warehouses.length) warehouses = remoteData.warehouses;
    if (remoteData.warehouseStocks.length) warehouseStocks = remoteData.warehouseStocks;
    if (remoteData.invoices.length) invoices = remoteData.invoices;
    if (remoteData.tradeEvents.length) tradeEvents = remoteData.tradeEvents;
    return true;
  } catch (error) {
    console.error("Supabase sync failed", error);
    showToast("تعذر تحميل بيانات Supabase، سيتم استخدام البيانات المحلية.");
    return false;
  }
}

function loadLocalData() {
  const pairs = [
    ["products", value => { products = value; }],
    ["customers", value => { customers = value; }],
    ["warehouses", value => { warehouses = value; }],
    ["warehouseStocks", value => { warehouseStocks = value; }],
    ["invoices", value => { invoices = value; }],
    ["tradeEvents", value => { tradeEvents = value; }]
  ];

  pairs.forEach(([key, setValue]) => {
    try {
      const raw = localStorage.getItem(localKeys[key]);
      if (raw) setValue(JSON.parse(raw));
    } catch {
      localStorage.removeItem(localKeys[key]);
    }
  });
}

function saveLocalData(key, value) {
  localStorage.setItem(localKeys[key], JSON.stringify(value));
  scheduleGithubAutoSave();
}

function getAppDataSnapshot() {
  return {
    products,
    customers,
    warehouses,
    warehouseStocks,
    invoices,
    tradeEvents
  };
}

function applyAppDataSnapshot(data) {
  if (!data || typeof data !== "object") return false;

  applyingGithubData = true;
  try {
    if (Array.isArray(data.products)) products = data.products;
    if (Array.isArray(data.customers)) customers = data.customers;
    if (Array.isArray(data.warehouses)) warehouses = data.warehouses;
    if (Array.isArray(data.warehouseStocks)) warehouseStocks = data.warehouseStocks;
    if (Array.isArray(data.invoices)) invoices = data.invoices;
    if (Array.isArray(data.tradeEvents)) tradeEvents = data.tradeEvents;

    Object.entries(getAppDataSnapshot()).forEach(([key, value]) => {
      localStorage.setItem(localKeys[key], JSON.stringify(value));
    });
    return true;
  } finally {
    applyingGithubData = false;
  }
}

function updateGithubStatus(message) {
  const status = document.getElementById("githubSyncStatus");
  if (status) status.textContent = message;
}

function scheduleGithubAutoSave() {
  if (!appReadyForGithubSync || applyingGithubData || !window.phoneProGithubSync?.isConfigured()) return;
  window.phoneProGithubSync.scheduleSave(getAppDataSnapshot, updateGithubStatus);
}

function renderAllDataViews() {
  updateCustomerOptions();
  renderSaleProducts();
  renderProductsTable();
  renderInventorySummary();
  renderWarehousesTable();
  renderWarehouseStocksTable();
  renderCustomers();
  renderInvoices();
  renderTradeEvents();
  renderCart();
}

function fillGithubSettingsForm() {
  if (!window.phoneProGithubSync) return;
  const settings = window.phoneProGithubSync.loadSettings();
  const fields = {
    githubOwner: settings.owner,
    githubRepo: settings.repo,
    githubBranch: settings.branch,
    githubDataPath: settings.path,
    githubToken: settings.token
  };

  Object.entries(fields).forEach(([id, value]) => {
    const field = document.getElementById(id);
    if (field) field.value = value || "";
  });

  updateGithubStatus(window.phoneProGithubSync.isConfigured(settings)
    ? "GitHub جاهز للمزامنة التلقائية."
    : "أدخل Token بصلاحية Contents Read/Write ثم احفظ الربط.");
}

function collectGithubSettings() {
  return {
    owner: document.getElementById("githubOwner").value,
    repo: document.getElementById("githubRepo").value,
    branch: document.getElementById("githubBranch").value,
    path: document.getElementById("githubDataPath").value,
    token: document.getElementById("githubToken").value
  };
}

async function pullGithubData({ silent = false } = {}) {
  if (!window.phoneProGithubSync?.isConfigured()) {
    updateGithubStatus("أكمل بيانات GitHub وToken أولاً.");
    return false;
  }

  try {
    updateGithubStatus("جاري تحميل البيانات من GitHub...");
    const data = await window.phoneProGithubSync.loadRemoteData();
    if (data && applyAppDataSnapshot(data)) {
      renderAllDataViews();
      updateGithubStatus("تم تحميل بيانات GitHub وتطبيقها على هذا المتصفح.");
      if (!silent) showToast("تم تحميل البيانات من GitHub.");
      return true;
    }

    updateGithubStatus("لا يوجد ملف بيانات بعد، سيتم إنشاؤه عند أول حفظ.");
    return false;
  } catch (error) {
    console.error("GitHub pull failed", error);
    updateGithubStatus("تعذر تحميل بيانات GitHub. تحقق من Token والمستودع.");
    return false;
  }
}

async function pushGithubData() {
  if (!window.phoneProGithubSync?.isConfigured()) {
    updateGithubStatus("أكمل بيانات GitHub وToken أولاً.");
    return false;
  }

  try {
    updateGithubStatus("جاري حفظ البيانات على GitHub...");
    await window.phoneProGithubSync.saveRemoteData(getAppDataSnapshot());
    updateGithubStatus(`تم الحفظ على GitHub في ${new Date().toLocaleTimeString("ar")}`);
    showToast("تم حفظ البيانات على GitHub.");
    return true;
  } catch (error) {
    console.error("GitHub push failed", error);
    updateGithubStatus("تعذر الحفظ على GitHub. تحقق من صلاحية Contents Read/Write.");
    return false;
  }
}

async function saveGithubSettingsAndConnect() {
  if (!window.phoneProGithubSync) return;
  window.phoneProGithubSync.saveSettings(collectGithubSettings());
  updateGithubStatus("تم حفظ إعدادات GitHub. جاري اختبار الربط...");
  await pullGithubData({ silent: true });
}

async function saveCloud(action, successMessage, fallbackMessage) {
  if (!window.phoneProSupabase?.isConnected || localStorage.getItem(localKeys.resetMode) === "local-defaults") {
    if (fallbackMessage) showToast(fallbackMessage);
    return false;
  }

  try {
    await action(window.phoneProSupabase);
    if (successMessage) showToast(successMessage);
    return true;
  } catch (error) {
    console.error("Cloud sync failed", error);
    if (fallbackMessage) showToast(fallbackMessage);
    return false;
  }
}

async function resetLocalAppData() {
  const confirmed = window.confirm("سيتم تصفير البيانات المحلية والمسودات وإعدادات هذا المتصفح. هل تريد المتابعة؟");
  if (!confirmed) return;

  Object.keys(localStorage)
    .filter(key => key.startsWith("phonePro"))
    .forEach(key => localStorage.removeItem(key));

  localStorage.setItem(localKeys.resetMode, "local-defaults");
  sessionStorage.clear();

  if ("caches" in window) {
    const cacheNames = await caches.keys();
    await Promise.all(cacheNames.map(cacheName => caches.delete(cacheName)));
  }

  if ("serviceWorker" in navigator) {
    const registrations = await navigator.serviceWorker.getRegistrations();
    await Promise.all(registrations.map(registration => registration.unregister()));
  }

  window.location.replace(`${window.location.pathname}?reset=${Date.now()}`);
}

function resetBusinessData() {
  const confirmed = window.confirm("سيتم إعادة ضبط بيانات المنتجات والعملاء والموردين والمخزون والفواتير إلى البيانات الافتراضية. هل تريد المتابعة؟");
  if (!confirmed) return;

  cart.clear();
  localStorage.removeItem("phoneProDraft");
  localStorage.setItem(localKeys.resetMode, "local-defaults");
  applyAppDataSnapshot(JSON.parse(JSON.stringify(defaultAppData)));
  Object.entries(getAppDataSnapshot()).forEach(([key, value]) => saveLocalData(key, value));
  renderAllDataViews();
  showToast("تمت إعادة ضبط البيانات.");
}

function enableCloudData() {
  localStorage.removeItem(localKeys.resetMode);
  window.location.reload();
}

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
        <td><button class="danger-button" data-delete-product="${product.id}" type="button">حذف</button></td>
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
      <div class="customer-actions">
        <strong>${customer.total}</strong>
        <button class="danger-button" data-delete-customer="${encodeURIComponent(customer.name)}" type="button">حذف</button>
      </div>
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

function renderTradeEvents() {
  const timeline = document.getElementById("tradeTimeline");
  if (!timeline) return;

  timeline.innerHTML = tradeEvents.map(event => `
    <div><span>${event.when}</span><strong>${event.title}</strong><small>${event.note}</small></div>
  `).join("");
}

function updateCustomerOptions() {
  const select = document.getElementById("customerSelect");
  const current = select.value;
  const names = ["عميل نقدي", ...customers.map(customer => customer.name)];
  select.innerHTML = [...new Set(names)].map(name => `<option>${name}</option>`).join("");
  if (names.includes(current)) select.value = current;
}

function updateActionStates() {
  const hasItems = cart.size > 0;
  ["payButton", "draftButton", "clearCart", "printButton", "shareButton"].forEach(id => {
    document.getElementById(id).disabled = !hasItems;
  });
}

async function deleteCustomer(customerName) {
  const customer = customers.find(item => item.name === customerName);
  if (!customer) return;

  const confirmed = window.confirm(`هل تريد حذف ${customer.name} من قائمة العملاء والموردين؟`);
  if (!confirmed) return;

  customers = customers.filter(item => item.name !== customer.name);
  saveLocalData("customers", customers);
  await saveCloud(
    database => database.deleteCustomer(customer.name),
    "تم حذف الجهة ومزامنة الحذف مع السحابة.",
    "تم حذف الجهة محلياً، وتعذرت مزامنة الحذف مع السحابة."
  );
  renderCustomers();
  updateCustomerOptions();
  showToast("تم حذف الجهة من قائمة العملاء والموردين.");
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

async function deleteProduct(productId) {
  const product = products.find(item => item.id === productId);
  if (!product) return;

  products = products.filter(item => item.id !== productId);
  warehouseStocks = warehouseStocks.filter(item => item.product !== product.name);
  cart.delete(productId);
  saveLocalData("products", products);
  saveLocalData("warehouseStocks", warehouseStocks);
  await saveCloud(
    database => database.deleteProduct(productId),
    "تم حذف الصنف ومزامنة الحذف مع السحابة.",
    "تم حذف الصنف محليًا، وتعذرت مزامنته مع السحابة."
  );
  renderCart();
  refreshProductViews();
  renderInventorySummary();
  renderWarehouseStocksTable();
  showToast("تم حذف الصنف من المخزون المحلي.");
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

async function completePayment() {
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

  const invoice = [nextNumber, customer, "الآن", money(grandTotal), "مدفوعة"];
  invoices = [invoice, ...invoices];
  saveLocalData("products", products);
  saveLocalData("invoices", invoices);
  cart.clear();
  renderCart();
  refreshProductViews();
  renderInvoices();
  localStorage.removeItem("phoneProDraft");

  try {
    if (window.phoneProSupabase?.isConnected) {
      await window.phoneProSupabase.recordSale({ invoice, items });
      showToast(`تم إصدار الفاتورة ${nextNumber} ومزامنتها مع Supabase.`);
      return;
    }
  } catch (error) {
    console.error("Supabase sale save failed", error);
    showToast(`تم إصدار الفاتورة ${nextNumber} محليًا، لكن فشلت مزامنتها مع Supabase.`);
    return;
  }

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

function getNumberValue(value) {
  return Number(String(value).replace(/[^\d.]/g, "")) || 0;
}

function openEntryModal({ title, fields, onSubmit }) {
  const modal = document.getElementById("entryModal");
  const form = document.getElementById("entryForm");
  const fieldsContainer = document.getElementById("modalFields");
  document.getElementById("modalTitle").textContent = title;
  fieldsContainer.innerHTML = fields.map(field => `
    <label class="field">
      <span>${field.label}</span>
      ${field.type === "select"
        ? `<select name="${field.name}" ${field.required ? "required" : ""}>${field.options.map(option => `<option ${option === field.value ? "selected" : ""}>${option}</option>`).join("")}</select>`
        : `<input name="${field.name}" type="${field.type || "text"}" value="${field.value || ""}" ${field.min !== undefined ? `min="${field.min}"` : ""} ${field.required ? "required" : ""} />`}
    </label>
  `).join("");

  form.onsubmit = async event => {
    event.preventDefault();
    const values = Object.fromEntries(new FormData(form).entries());
    await onSubmit(values);
    modal.close();
  };

  modal.showModal();
}

function addProduct() {
  openEntryModal({
    title: "إضافة صنف جديد",
    fields: [
      { name: "name", label: "اسم الصنف", required: true },
      { name: "category", label: "التصنيف", type: "select", options: ["هواتف جديدة", "هواتف مستعملة", "إكسسوارات"], value: "هواتف جديدة" },
      { name: "imei", label: "IMEI", value: "-" },
      { name: "cost", label: "التكلفة", type: "number", min: 0, required: true },
      { name: "price", label: "سعر البيع", type: "number", min: 0, required: true },
      { name: "stock", label: "الكمية", type: "number", min: 0, required: true }
    ],
    async onSubmit(values) {
      const duplicateImei = values.imei !== "-" && products.some(product => product.imei === values.imei);
      if (duplicateImei) {
        showToast("لا يمكن إضافة صنف بنفس رقم IMEI.");
        return;
      }

      const product = {
        id: Math.max(0, ...products.map(product => Number(product.id))) + 1,
        name: values.name.trim(),
        category: values.category,
        price: getNumberValue(values.price),
        cost: getNumberValue(values.cost),
        stock: getNumberValue(values.stock),
        imei: values.imei.trim() || "-",
        icon: values.category === "إكسسوارات" ? "□" : values.category === "هواتف مستعملة" ? "▧" : "▰"
      };

      products.push(product);
      saveLocalData("products", products);
      await saveCloud(
        database => database.upsertProduct(product),
        "تمت إضافة الصنف ومزامنته مع السحابة.",
        "تمت إضافة الصنف محليًا، وتعذرت مزامنته مع السحابة."
      );
      refreshProductViews();
      renderInventorySummary();
      showToast("تمت إضافة الصنف إلى المخزون.");
    }
  });
}

function addWarehouse() {
  openEntryModal({
    title: "إضافة مستودع",
    fields: [
      { name: "code", label: "الكود", required: true },
      { name: "name", label: "اسم المستودع", required: true },
      { name: "branch", label: "الفرع", value: "فرع نواكشوط", required: true },
      { name: "manager", label: "المسؤول", required: true },
      { name: "capacity", label: "السعة", type: "number", min: 1, required: true },
      { name: "used", label: "المستخدم", type: "number", min: 0, value: "0" },
      { name: "status", label: "الحالة", type: "select", options: ["نشط", "مراجعة"], value: "نشط" }
    ],
    async onSubmit(values) {
      if (warehouses.some(warehouse => warehouse.code === values.code.trim())) {
        showToast("كود المستودع موجود مسبقًا.");
        return;
      }

      const warehouse = {
        code: values.code.trim(),
        name: values.name.trim(),
        branch: values.branch.trim(),
        manager: values.manager.trim(),
        capacity: getNumberValue(values.capacity),
        used: getNumberValue(values.used),
        status: values.status
      };

      warehouses.push(warehouse);
      saveLocalData("warehouses", warehouses);
      await saveCloud(
        database => database.upsertWarehouse(warehouse),
        "تمت إضافة المستودع ومزامنته مع السحابة.",
        "تمت إضافة المستودع محليًا، وتعذرت مزامنته مع السحابة."
      );
      renderInventorySummary();
      renderWarehousesTable();
      showToast("تمت إضافة المستودع.");
    }
  });
}

function addContact() {
  openEntryModal({
    title: "إضافة جهة",
    fields: [
      { name: "name", label: "الاسم", required: true },
      { name: "type", label: "النوع", type: "select", options: ["عميل نقدي", "عميل ذهبي", "عميل شركات", "مورد"], value: "عميل نقدي" },
      { name: "total", label: "إجمالي التعامل", value: "0 أوقية" }
    ],
    async onSubmit(values) {
      if (customers.some(customer => customer.name === values.name.trim())) {
        showToast("هذه الجهة مسجلة مسبقًا.");
        return;
      }

      const customer = { name: values.name.trim(), type: values.type, total: values.total.trim() || "0 أوقية" };
      customers.push(customer);
      saveLocalData("customers", customers);
      await saveCloud(
        database => database.upsertCustomer(customer),
        "تمت إضافة الجهة ومزامنتها مع السحابة.",
        "تمت إضافة الجهة محليًا، وتعذرت مزامنتها مع السحابة."
      );
      renderCustomers();
      updateCustomerOptions();
      showToast("تمت إضافة الجهة.");
    }
  });
}

function transferStock() {
  if (!warehouseStocks.length) {
    showToast("لا توجد كميات موزعة على المستودعات.");
    return;
  }

  openEntryModal({
    title: "تحويل بين المستودعات",
    fields: [
      { name: "product", label: "الصنف", type: "select", options: [...new Set(warehouseStocks.map(item => item.product))] },
      { name: "from", label: "من مستودع", type: "select", options: warehouses.map(warehouse => warehouse.name) },
      { name: "to", label: "إلى مستودع", type: "select", options: warehouses.map(warehouse => warehouse.name) },
      { name: "qty", label: "الكمية", type: "number", min: 1, required: true }
    ],
    async onSubmit(values) {
      const qty = getNumberValue(values.qty);
      const source = warehouseStocks.find(item => item.product === values.product && item.warehouse === values.from);
      if (!source || source.available - source.reserved < qty) {
        showToast("الكمية غير متاحة في المستودع المصدر.");
        return;
      }

      let target = warehouseStocks.find(item => item.product === values.product && item.warehouse === values.to);
      if (!target) {
        target = { warehouse: values.to, product: values.product, category: source.category, available: 0, reserved: 0, minimum: source.minimum };
        warehouseStocks.push(target);
      }
      source.available -= qty;
      target.available += qty;
      saveLocalData("warehouseStocks", warehouseStocks);
      await saveCloud(
        database => database.upsertWarehouseStocks([source, target]),
        "تم تحويل المخزون ومزامنته مع السحابة.",
        "تم تحويل المخزون محليًا، وتعذرت مزامنته مع السحابة."
      );
      renderInventorySummary();
      renderWarehouseStocksTable();
      showToast("تم تسجيل تحويل المخزون.");
    }
  });
}

async function saveTradeEvent(event) {
  event.preventDefault();
  const type = document.getElementById("tradeType").value;
  const party = document.getElementById("tradeParty").value.trim();
  const imei = document.getElementById("tradeImei").value.trim();
  const cost = getNumberValue(document.getElementById("tradeCost").value);

  const tradeEvent = { when: "الآن", title: `${type} - ${party}`, note: `IMEI ${imei} - تكلفة ${money(cost)}` };
  tradeEvents = [tradeEvent, ...tradeEvents];
  saveLocalData("tradeEvents", tradeEvents);
  await saveCloud(
    database => database.addTradeEvent(tradeEvent),
    "تم حفظ العملية ومزامنتها مع السحابة.",
    "تم حفظ العملية محليًا، وتعذرت مزامنتها مع السحابة."
  );
  renderTradeEvents();
  showToast("تم حفظ العملية في سجل الشراء والاستبدال.");
}

function exportInvoices() {
  const header = ["رقم الفاتورة", "العميل", "التاريخ", "المبلغ", "الحالة"];
  const rows = [header, ...invoices];
  const csv = "\ufeff" + rows.map(row => row.map(value => `"${String(value).replaceAll('"', '""')}"`).join(",")).join("\n");
  const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
  const link = document.createElement("a");
  link.href = url;
  link.download = "phone-pro-invoices.csv";
  link.click();
  URL.revokeObjectURL(url);
  showToast("تم تصدير الفواتير بصيغة CSV قابلة للفتح في Excel.");
}

function printReceipt() {
  if (!cart.size) return;
  window.print();
}

async function shareInvoice() {
  if (!cart.size) return;
  const total = document.getElementById("grandTotal").textContent;
  const text = `فاتورة هاتف برو - الإجمالي ${total}`;
  if (navigator.share) {
    await navigator.share({ title: "فاتورة هاتف برو", text });
  } else {
    await navigator.clipboard.writeText(text);
    showToast("تم نسخ ملخص الفاتورة للمشاركة.");
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
  const deleteProductButton = event.target.closest("[data-delete-product]");
  const deleteCustomerButton = event.target.closest("[data-delete-customer]");
  if (addButton) addToCart(Number(addButton.dataset.add));
  if (qtyButton) changeQty(Number(qtyButton.dataset.qty), Number(qtyButton.dataset.delta));
  if (deleteProductButton) deleteProduct(Number(deleteProductButton.dataset.deleteProduct));
  if (deleteCustomerButton) deleteCustomer(decodeURIComponent(deleteCustomerButton.dataset.deleteCustomer));
});

document.getElementById("clearCart").addEventListener("click", () => {
  cart.clear();
  renderCart();
  localStorage.removeItem("phoneProDraft");
  showToast("تم مسح الفاتورة الحالية.");
});

document.getElementById("payButton").addEventListener("click", completePayment);
document.getElementById("draftButton").addEventListener("click", saveDraft);
document.getElementById("printButton").addEventListener("click", printReceipt);
document.getElementById("shareButton").addEventListener("click", shareInvoice);
document.getElementById("globalSearch").addEventListener("input", refreshProductViews);
document.getElementById("addProductButton").addEventListener("click", addProduct);
document.getElementById("addWarehouseButton").addEventListener("click", addWarehouse);
document.getElementById("addContactButton").addEventListener("click", addContact);
document.getElementById("transferStockButton").addEventListener("click", transferStock);
document.getElementById("exportInvoicesButton").addEventListener("click", exportInvoices);
document.getElementById("tradeForm").addEventListener("submit", saveTradeEvent);
document.getElementById("modalCloseButton").addEventListener("click", () => document.getElementById("entryModal").close());
document.getElementById("modalCancelButton").addEventListener("click", () => document.getElementById("entryModal").close());
document.getElementById("resetAppButton").addEventListener("click", resetLocalAppData);
document.getElementById("resetDataButton")?.addEventListener("click", resetBusinessData);
document.getElementById("enableCloudButton").addEventListener("click", enableCloudData);
document.getElementById("githubConnectButton")?.addEventListener("click", saveGithubSettingsAndConnect);
document.getElementById("githubPullButton")?.addEventListener("click", () => pullGithubData());
document.getElementById("githubPushButton")?.addEventListener("click", pushGithubData);
document.getElementById("themeToggle").addEventListener("click", event => {
  document.body.classList.toggle("dark");
  event.currentTarget.textContent = document.body.classList.contains("dark") ? "الوضع النهاري" : "الوضع الليلي";
});

async function initializeApp() {
  fillGithubSettingsForm();
  const loadedCloudData = await loadSupabaseData();
  if (!loadedCloudData) loadLocalData();
  await pullGithubData({ silent: true });
  renderAllDataViews();
  restoreDraft();
  appReadyForGithubSync = true;
}

if ("serviceWorker" in navigator && window.location.protocol.startsWith("http")) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./service-worker.js").catch(error => {
      console.info("Service worker registration skipped", error);
    });
  });
}

initializeApp();
