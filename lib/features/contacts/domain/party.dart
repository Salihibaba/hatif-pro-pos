enum PartyType { customer, supplier }

class Party {
  const Party({
    required this.id,
    required this.name,
    required this.type,
    required this.phone,
    this.balance = 0,
    this.updatedAt,
  });

  final String id;
  final String name;
  final PartyType type;
  final String phone;
  final int balance;
  final DateTime? updatedAt;
}
