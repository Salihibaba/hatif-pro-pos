import 'phone.dart';

abstract interface class PhoneRepository {
  Stream<List<Phone>> watchPhones();
  Future<void> savePhone(Phone phone);
  Future<void> deletePhone(String id);
  Future<void> adjustStock(String phoneId, int delta);
}
