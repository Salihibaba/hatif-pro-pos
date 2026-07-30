import '../domain/phone.dart';

class PhoneMapper {
  static Map<String, Object?> toJson(Phone phone) {
    return {
      'id': phone.id,
      'name': phone.name,
      'category': phone.category.name,
      'salePrice': phone.salePrice,
      'costPrice': phone.costPrice,
      'stock': phone.stock,
      'imei': phone.imei,
      'imageUrl': phone.imageUrl,
      'updatedAt': (phone.updatedAt ?? DateTime.now()).toIso8601String(),
      'isDeleted': phone.isDeleted,
    };
  }

  static Phone fromJson(Map<String, dynamic> json) {
    return Phone(
      id: json['id'] as String,
      name: json['name'] as String,
      category: PhoneCondition.values.byName(json['category'] as String),
      salePrice: json['salePrice'] as int,
      costPrice: json['costPrice'] as int,
      stock: json['stock'] as int,
      imei: json['imei'] as String,
      imageUrl: json['imageUrl'] as String?,
      updatedAt: DateTime.tryParse(json['updatedAt'] as String? ?? ''),
      isDeleted: json['isDeleted'] as bool? ?? false,
    );
  }
}
