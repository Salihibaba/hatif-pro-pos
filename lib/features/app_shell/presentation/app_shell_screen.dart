import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';

import '../../auth/presentation/auth_controller.dart';
import '../../module_placeholder/presentation/module_screen.dart';

class AppShellScreen extends ConsumerWidget {
  const AppShellScreen({required this.child, super.key});

  final Widget child;

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final width = MediaQuery.sizeOf(context).width;
    final isTablet = width >= 900;

    return Scaffold(
      appBar: AppBar(
        title: const Text('هاتف برو'),
        actions: [
          IconButton(
            tooltip: 'تسجيل الخروج',
            onPressed: () => ref.read(authControllerProvider.notifier).signOut(),
            icon: const Icon(Icons.logout),
          ),
        ],
      ),
      body: Row(
        children: [
          if (isTablet) const _SideNavigation(),
          Expanded(child: SafeArea(child: child)),
        ],
      ),
      bottomNavigationBar: isTablet ? null : const _MobileNavigation(),
    );
  }
}

class _SideNavigation extends StatelessWidget {
  const _SideNavigation();

  @override
  Widget build(BuildContext context) {
    return NavigationRail(
      extended: true,
      minExtendedWidth: 240,
      selectedIndex: _selectedIndex(context),
      onDestinationSelected: (index) => _go(context, index),
      leading: const Padding(
        padding: EdgeInsets.all(16),
        child: Text('هاتف برو', style: TextStyle(fontWeight: FontWeight.bold)),
      ),
      destinations: _destinations,
    );
  }
}

class _MobileNavigation extends StatelessWidget {
  const _MobileNavigation();

  @override
  Widget build(BuildContext context) {
    return NavigationBar(
      selectedIndex: _mobileSelectedIndex(context),
      onDestinationSelected: (index) => _go(context, index),
      destinations: List.generate(5, (index) {
        final item = _destinations[index];
        return NavigationDestination(
          icon: item.icon,
          selectedIcon: item.selectedIcon,
          label: index == 0 ? 'لوحة التحكم' : ModuleScreen.modules[index - 1].title,
        );
      }),
    );
  }
}

final _destinations = [
  const NavigationRailDestination(
    icon: Icon(Icons.dashboard_outlined),
    selectedIcon: Icon(Icons.dashboard),
    label: Text('لوحة التحكم'),
  ),
  ...ModuleScreen.modules.map(
    (module) => NavigationRailDestination(
      icon: Icon(module.icon),
      selectedIcon: Icon(module.icon),
      label: Text(module.title),
    ),
  ),
];

int _selectedIndex(BuildContext context) {
  final location = GoRouterState.of(context).uri.path;
  if (location == '/') return 0;
  final index = ModuleScreen.modules.indexWhere(
    (module) => location == '/${module.path}',
  );
  return index == -1 ? 0 : index + 1;
}

void _go(BuildContext context, int index) {
  if (index == 0) {
    context.go('/');
    return;
  }
  context.go('/${ModuleScreen.modules[index - 1].path}');
}

int _mobileSelectedIndex(BuildContext context) {
  final index = _selectedIndex(context);
  return index > 4 ? 0 : index;
}
