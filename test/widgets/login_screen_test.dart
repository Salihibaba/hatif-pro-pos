import 'dart:async';

import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:hatif_pro/features/auth/data/firebase_auth_repository.dart';
import 'package:hatif_pro/features/auth/domain/app_user.dart';
import 'package:hatif_pro/features/auth/domain/auth_repository.dart';
import 'package:hatif_pro/features/auth/presentation/login_screen.dart';

class FakeAuthRepository implements AuthRepository {
  final _controller = StreamController<AppUser?>.broadcast();

  @override
  Stream<AppUser?> watchAuthState() => _controller.stream;

  @override
  Future<void> createUserWithEmailAndPassword(String email, String password) async {}

  @override
  Future<void> signInWithEmailAndPassword(String email, String password) async {}

  @override
  Future<void> signOut() async {}
}

void main() {
  testWidgets('login screen renders Arabic auth form', (tester) async {
    await tester.pumpWidget(
      ProviderScope(
        overrides: [
          authRepositoryProvider.overrideWithValue(FakeAuthRepository()),
        ],
        child: const MaterialApp(
          home: Directionality(
            textDirection: TextDirection.rtl,
            child: LoginScreen(),
          ),
        ),
      ),
    );

    expect(find.text('تسجيل الدخول'), findsOneWidget);
    expect(find.text('إنشاء حساب جديد'), findsOneWidget);
    expect(find.text('البريد الإلكتروني'), findsOneWidget);
  });
}
