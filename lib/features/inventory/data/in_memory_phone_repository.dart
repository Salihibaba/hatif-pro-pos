import 'dart:async';

import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:uuid/uuid.dart';

import '../domain/phone.dart';
import '../domain/phone_repository.dart';

final phoneRepositoryProvider = Provider<PhoneRepository>((ref) {
  return InMemoryPhoneRepository.seeded();
});

class InMemoryPhoneRepository implements PhoneRepository {
  InMemoryPhoneRepository.seeded()
      : _phones = [
          Phone(
            id: const Uuid().v4(),
            name: 'iPhone 15 Pro Max 256GB',
            category: PhoneCondition.newPhone,
            salePrice: 630000,
            costPrice: 570000,
            stock: 6,
            imei: '353921102938475',
          ),
          Phone(
            id: const Uuid().v4(),
            name: 'Samsung Galaxy A55 5G',
            category: PhoneCondition.newPhone,
            salePrice: 238000,
            costPrice: 205000,
            stock: 12,
            imei: '358240116543902',
          ),
          Phone(
            id: const Uuid().v4(),
            name: 'شاحن USB-C سريع 25W',
            category: PhoneCondition.accessory,
            salePrice: 12000,
            costPrice: 6200,
            stock: 18,
            imei: '-',
          ),
        ] {
    _controller.add(List.unmodifiable(_phones));
  }

  final List<Phone> _phones;
  final _controller = StreamController<List<Phone>>.broadcast();

  @override
  Stream<List<Phone>> watchPhones() => _controller.stream;

  @override
  Future<void> savePhone(Phone phone) async {
    final index = _phones.indexWhere((item) => item.id == phone.id);
    if (index == -1) {
      _phones.add(phone);
    } else {
      _phones[index] = phone;
    }
    _controller.add(List.unmodifiable(_phones));
  }

  @override
  Future<void> deletePhone(String id) async {
    _phones.removeWhere((item) => item.id == id);
    _controller.add(List.unmodifiable(_phones));
  }

  @override
  Future<void> adjustStock(String phoneId, int delta) async {
    final index = _phones.indexWhere((item) => item.id == phoneId);
    if (index == -1) return;
    final phone = _phones[index];
    _phones[index] = phone.copyWith(stock: phone.stock + delta);
    _controller.add(List.unmodifiable(_phones));
  }
}
