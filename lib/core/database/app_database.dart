import 'dart:io';

import 'package:drift/drift.dart';
import 'package:drift/native.dart';
import 'package:path/path.dart' as p;
import 'package:path_provider/path_provider.dart';

part 'app_database.g.dart';

class Phones extends Table {
  TextColumn get id => text()();
  TextColumn get name => text()();
  TextColumn get category => text()();
  IntColumn get salePrice => integer()();
  IntColumn get costPrice => integer()();
  IntColumn get stock => integer()();
  TextColumn get imei => text()();
  TextColumn get imageUrl => text().nullable()();
  DateTimeColumn get updatedAt => dateTime()();
  BoolColumn get isDeleted => boolean().withDefault(const Constant(false))();

  @override
  Set<Column<Object>> get primaryKey => {id};
}

class SyncQueue extends Table {
  IntColumn get id => integer().autoIncrement()();
  TextColumn get entity => text()();
  TextColumn get entityId => text()();
  TextColumn get action => text()();
  TextColumn get payload => text()();
  DateTimeColumn get createdAt => dateTime()();
}

@DriftDatabase(tables: [Phones, SyncQueue])
class AppDatabase extends _$AppDatabase {
  AppDatabase() : super(_openConnection());

  @override
  int get schemaVersion => 1;
}

LazyDatabase _openConnection() {
  return LazyDatabase(() async {
    final dir = await getApplicationDocumentsDirectory();
    final file = File(p.join(dir.path, 'hatif_pro.sqlite'));
    return NativeDatabase.createInBackground(file);
  });
}
