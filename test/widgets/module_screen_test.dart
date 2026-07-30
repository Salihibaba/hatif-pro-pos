import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:hatif_pro/features/module_placeholder/presentation/module_screen.dart';

void main() {
  testWidgets('module screen renders Arabic module title', (tester) async {
    final module = ModuleScreen.modules.first;

    await tester.pumpWidget(
      MaterialApp(
        home: Directionality(
          textDirection: TextDirection.rtl,
          child: ModuleScreen(module: module),
        ),
      ),
    );

    expect(find.text('إدارة المخزون'), findsOneWidget);
  });
}
