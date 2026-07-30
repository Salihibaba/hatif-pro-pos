import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';

import '../../features/app_shell/presentation/app_shell_screen.dart';
import '../../features/dashboard/presentation/dashboard_screen.dart';
import '../../features/module_placeholder/presentation/module_screen.dart';

final appRouterProvider = Provider<GoRouter>((ref) {
  return GoRouter(
    initialLocation: '/',
    routes: [
      ShellRoute(
        builder: (context, state, child) => AppShellScreen(child: child),
        routes: [
          GoRoute(
            path: '/',
            name: 'dashboard',
            builder: (context, state) => const DashboardScreen(),
          ),
          for (final module in ModuleScreen.modules)
            GoRoute(
              path: '/${module.path}',
              name: module.path,
              builder: (context, state) => ModuleScreen(module: module),
            ),
        ],
      ),
    ],
  );
});
