import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

final themeModeProvider = StateProvider<ThemeMode>((ref) => ThemeMode.system);

class AppTheme {
  static const _seed = Color(0xFF1463FF);
  static const _success = Color(0xFF16A36F);

  static ThemeData light() {
    final scheme = ColorScheme.fromSeed(seedColor: _seed);
    return _base(scheme).copyWith(
      scaffoldBackgroundColor: const Color(0xFFF4F7FB),
    );
  }

  static ThemeData dark() {
    final scheme = ColorScheme.fromSeed(
      seedColor: _seed,
      brightness: Brightness.dark,
    );
    return _base(scheme).copyWith(
      scaffoldBackgroundColor: const Color(0xFF101827),
    );
  }

  static ThemeData _base(ColorScheme scheme) {
    return ThemeData(
      useMaterial3: true,
      colorScheme: scheme,
      fontFamily: 'Roboto',
      cardTheme: CardTheme(
        elevation: 0,
        color: scheme.surface,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(12),
          side: BorderSide(color: scheme.outlineVariant),
        ),
      ),
      inputDecorationTheme: InputDecorationTheme(
        filled: true,
        border: OutlineInputBorder(borderRadius: BorderRadius.circular(12)),
      ),
      floatingActionButtonTheme: const FloatingActionButtonThemeData(
        backgroundColor: _success,
        foregroundColor: Colors.white,
      ),
    );
  }
}
