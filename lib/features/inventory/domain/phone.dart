enum PhoneCondition { newPhone, usedPhone, accessory }

class Phone {
  const Phone({
    required this.id,
    required this.name,
    required this.category,
    required this.salePrice,
    required this.costPrice,
    required this.stock,
    required this.imei,
    this.imageUrl,
    this.updatedAt,
    this.isDeleted = false,
  });

  final String id;
  final String name;
  final PhoneCondition category;
  final int salePrice;
  final int costPrice;
  final int stock;
  final String imei;
  final String? imageUrl;
  final DateTime? updatedAt;
  final bool isDeleted;

  int get profit => salePrice - costPrice;

  Phone copyWith({
    String? id,
    String? name,
    PhoneCondition? category,
    int? salePrice,
    int? costPrice,
    int? stock,
    String? imei,
    String? imageUrl,
    DateTime? updatedAt,
    bool? isDeleted,
  }) {
    return Phone(
      id: id ?? this.id,
      name: name ?? this.name,
      category: category ?? this.category,
      salePrice: salePrice ?? this.salePrice,
      costPrice: costPrice ?? this.costPrice,
      stock: stock ?? this.stock,
      imei: imei ?? this.imei,
      imageUrl: imageUrl ?? this.imageUrl,
      updatedAt: updatedAt ?? this.updatedAt,
      isDeleted: isDeleted ?? this.isDeleted,
    );
  }
}
