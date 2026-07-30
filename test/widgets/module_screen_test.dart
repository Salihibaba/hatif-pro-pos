import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:hatif_pro/features/module_placeholder/presentation/module_screen.dart';

void main() {
  testWidgets('module screen renders Arabic module title', (tester) async {
    await tester.pumpWidget(
      const MaterialApp(
        home: Directionality(
          textDirection: TextDirection.rtl,
          child: ModuleScreen(module: ModuleScreen.modules[0]),
        ),
      ),
    );

    expect(find.text('إدارة المخزون'), findsOneWidget);
  });
}
