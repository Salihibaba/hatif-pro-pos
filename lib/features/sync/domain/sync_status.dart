enum SyncState { idle, syncing, online, offline, failed }

class SyncStatus {
  const SyncStatus({
    required this.state,
    this.lastSyncedAt,
    this.message,
  });

  final SyncState state;
  final DateTime? lastSyncedAt;
  final String? message;
}
