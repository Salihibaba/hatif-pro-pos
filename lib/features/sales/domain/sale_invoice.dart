class SaleInvoice {
  const SaleInvoice({
    required this.id,
    required this.number,
    required this.customerId,
    required this.total,
    required this.paid,
    required this.createdAt,
    this.isReturn = false,
  });

  final String id;
  final String number;
  final String customerId;
  final int total;
  final int paid;
  final DateTime createdAt;
  final bool isReturn;

  int get remaining => total - paid;
}
