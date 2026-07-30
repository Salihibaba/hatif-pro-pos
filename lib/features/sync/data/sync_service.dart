import 'dart:async';

import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../domain/sync_status.dart';

final syncServiceProvider = Provider<SyncService>((ref) {
  return SyncService(FirebaseFirestore.instance);
});

final syncStatusProvider = StateProvider<SyncStatus>((ref) {
  return const SyncStatus(state: SyncState.idle);
});

class SyncService {
  SyncService(this._firestore);

  final FirebaseFirestore _firestore;

  Future<void> upsert({
    required String collection,
    required String id,
    required Map<String, Object?> payload,
  }) {
    return _firestore.collection(collection).doc(id).set(
      {
        ...payload,
        'updatedAt': FieldValue.serverTimestamp(),
      },
      SetOptions(merge: true),
    );
  }

  Future<void> softDelete({
    required String collection,
    required String id,
  }) {
    return _firestore.collection(collection).doc(id).set(
      {
        'isDeleted': true,
        'updatedAt': FieldValue.serverTimestamp(),
      },
      SetOptions(merge: true),
    );
  }

  Stream<QuerySnapshot<Map<String, dynamic>>> watchCollection(String name) {
    return _firestore.collection(name).snapshots();
  }
}
