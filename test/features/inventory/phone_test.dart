import 'package:flutter_test/flutter_test.dart';
import 'package:hatif_pro/features/inventory/domain/phone.dart';

void main() {
  test('phone profit is sale price minus cost price', () {
    const phone = Phone(
      id: '1',
      name: 'iPhone',
      category: PhoneCondition.newPhone,
      salePrice: 1000,
      costPrice: 700,
      stock: 2,
      imei: '123',
    );

    expect(phone.profit, 300);
  });
}
