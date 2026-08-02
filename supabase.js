(function () {
  const config = window.SUPABASE_CONFIG || {};
  const hasCredentials = Boolean(config.url && config.anonKey);
  const hasSdk = Boolean(window.supabase && window.supabase.createClient);

  if (!hasCredentials || !hasSdk) {
    window.phoneProSupabase = {
      isConnected: false,
      reason: !hasCredentials ? "missing-config" : "missing-sdk"
    };
    return;
  }

  const client = window.supabase.createClient(config.url, config.anonKey);

  function normalizeInvoice(row) {
    const total = row.total_label || (typeof row.total_amount === "number" ? `${row.total_amount.toLocaleString("ar-MR")} أوقية` : "");
    const issuedAt = row.label_date || (row.issued_at ? new Date(row.issued_at).toLocaleString("ar-MR") : "");
    return [row.number, row.customer, issuedAt, total, row.status || "مدفوعة"];
  }

  function normalizeTradeEvent(row) {
    return {
      when: row.event_when || "الآن",
      title: row.title,
      note: row.note || ""
    };
  }

  async function readTable(table, orderColumn) {
    let query = client.from(table).select("*");
    if (orderColumn) query = query.order(orderColumn, { ascending: false });
    const { data, error } = await query;
    if (error) throw error;
    return data || [];
  }

  window.phoneProSupabase = {
    isConnected: true,
    client,

    async loadInitialData() {
      const [products, customers, warehouses, warehouseStocks, invoices, tradeEvents] = await Promise.all([
        readTable("products", "id"),
        readTable("customers", "name"),
        readTable("warehouses", "code"),
        readTable("warehouse_stocks", "warehouse"),
        readTable("invoices", "issued_at"),
        readTable("trade_events", "created_at")
      ]);

      return {
        products: products.sort((a, b) => Number(a.id) - Number(b.id)),
        customers,
        warehouses,
        warehouseStocks,
        invoices: invoices.map(normalizeInvoice),
        tradeEvents: tradeEvents.map(normalizeTradeEvent)
      };
    },

    async upsertProduct(product) {
      const { error } = await client.from("products").upsert(product, { onConflict: "id" });
      if (error) throw error;
    },

    async deleteProduct(productId) {
      const { error } = await client.from("products").delete().eq("id", productId);
      if (error) throw error;
    },

    async upsertCustomer(customer) {
      const { error } = await client.from("customers").upsert(customer, { onConflict: "name" });
      if (error) throw error;
    },

    async deleteCustomer(customerName) {
      const { error } = await client.from("customers").delete().eq("name", customerName);
      if (error) throw error;
    },

    async upsertWarehouse(warehouse) {
      const { error } = await client.from("warehouses").upsert(warehouse, { onConflict: "code" });
      if (error) throw error;
    },

    async upsertWarehouseStocks(stocks) {
      const { error } = await client.from("warehouse_stocks").upsert(stocks, { onConflict: "warehouse,product" });
      if (error) throw error;
    },

    async addTradeEvent(event) {
      const { error } = await client.from("trade_events").insert({
        event_when: event.when,
        title: event.title,
        note: event.note
      });
      if (error) throw error;
    },

    async recordSale({ invoice, items }) {
      const [number, customer, labelDate, totalLabel, status] = invoice;
      const totalAmount = items.reduce((sum, item) => sum + item.price * item.qty, 0);
      const taxAmount = Math.round(totalAmount * 0.03);

      const { error: invoiceError } = await client.from("invoices").insert({
        number,
        customer,
        label_date: labelDate,
        total_label: totalLabel,
        total_amount: totalAmount + taxAmount,
        status,
        items: items.map(item => ({
          product_id: item.id,
          name: item.name,
          qty: item.qty,
          price: item.price,
          cost: item.cost
        }))
      });

      if (invoiceError) throw invoiceError;

      const updates = await Promise.all(items.map(item => client
        .from("products")
        .update({ stock: item.stock - item.qty })
        .eq("id", item.id)
      ));

      const failedUpdate = updates.find(result => result.error);
      if (failedUpdate) throw failedUpdate.error;
    }
  };
})();
