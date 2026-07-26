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
      const [products, customers, warehouses, warehouseStocks, invoices] = await Promise.all([
        readTable("products", "id"),
        readTable("customers", "name"),
        readTable("warehouses", "code"),
        readTable("warehouse_stocks", "warehouse"),
        readTable("invoices", "issued_at")
      ]);

      return {
        products: products.sort((a, b) => Number(a.id) - Number(b.id)),
        customers,
        warehouses,
        warehouseStocks,
        invoices: invoices.map(normalizeInvoice)
      };
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
