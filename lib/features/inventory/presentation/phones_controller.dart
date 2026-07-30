import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../data/in_memory_phone_repository.dart';
import '../domain/phone.dart';

final phonesProvider = StreamProvider<List<Phone>>((ref) {
  return ref.watch(phoneRepositoryProvider).watchPhones();
});
