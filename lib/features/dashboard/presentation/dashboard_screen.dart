import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';

import '../../../core/models/money.dart';
import '../../inventory/presentation/phones_controller.dart';
import '../../module_placeholder/presentation/module_screen.dart';

class DashboardScreen extends ConsumerWidget {
  const DashboardScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final phonesAsync = ref.watch(phonesProvider);

    return CustomScrollView(
      slivers: [
        SliverPadding(
          padding: const EdgeInsets.fromLTRB(24, 24, 24, 8),
          sliver: SliverToBoxAdapter(
            child: _Header(
              title: 'لوحة التحكم',
              subtitle: 'نظرة تشغيلية على المبيعات، المخزون، والأرباح.',
            ),
          ),
        ),
        SliverPadding(
          padding: const EdgeInsets.all(24),
          sliver: phonesAsync.when<Widget>(
            data: (phones) {
              final stockValue = phones.fold<int>(
                0,
                (sum, phone) => sum + phone.costPrice * phone.stock,
              );
              final expectedProfit = phones.fold<int>(
                0,
                (sum, phone) => sum + phone.profit * phone.stock,
              );
              return SliverGrid(
                gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
                  crossAxisCount: MediaQuery.sizeOf(context).width > 900 ? 4 : 2,
                  crossAxisSpacing: 12,
                  mainAxisSpacing: 12,
                  childAspectRatio: 1.35,
                ),
                delegate: SliverChildListDelegate.fixed(
                  [
                    _MetricCard(
                      label: 'قيمة المخزون',
                      value: Money(stockValue).format(),
                      icon: Icons.inventory_2_outlined,
                    ),
                    _MetricCard(
                      label: 'ربح متوقع',
                      value: Money(expectedProfit).format(),
                      icon: Icons.trending_up_outlined,
                    ),
                    _MetricCard(
                      label: 'الأصناف',
                      value: '${phones.length}',
                      icon: Icons.phone_iphone_outlined,
                    ),
                    _MetricCard(
                      label: 'تنبيهات المخزون',
                      value: '${phones.where((phone) => phone.stock <= 3).length}',
                      icon: Icons.warning_amber_outlined,
                    ),
                  ],
                ),
              );
            },
            error: (error, stackTrace) => SliverToBoxAdapter(
              child: Text('تعذر تحميل البيانات: $error'),
            ),
            loading: () => const SliverToBoxAdapter(
              child: Center(child: CircularProgressIndicator()),
            ),
          ),
        ),
        SliverPadding(
          padding: const EdgeInsets.fromLTRB(24, 0, 24, 24),
          sliver: SliverGrid.builder(
            gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
              crossAxisCount: MediaQuery.sizeOf(context).width > 900 ? 4 : 2,
              crossAxisSpacing: 12,
              mainAxisSpacing: 12,
              childAspectRatio: 1.2,
            ),
            itemCount: ModuleScreen.modules.length,
            itemBuilder: (context, index) {
              final module = ModuleScreen.modules[index];
              return Card(
                child: InkWell(
                  borderRadius: BorderRadius.circular(12),
                  onTap: () => context.go('/${module.path}'),
                  child: Padding(
                    padding: const EdgeInsets.all(16),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Icon(module.icon, size: 32),
                        const Spacer(),
                        Text(
                          module.title,
                          style: Theme.of(context).textTheme.titleMedium,
                        ),
                        const SizedBox(height: 6),
                        Text(
                          module.description,
                          maxLines: 2,
                          overflow: TextOverflow.ellipsis,
                        ),
                      ],
                    ),
                  ),
                ),
              );
            },
          ),
        ),
      ],
    );
  }
}

class _Header extends StatelessWidget {
  const _Header({required this.title, required this.subtitle});

  final String title;
  final String subtitle;

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(title, style: Theme.of(context).textTheme.headlineLarge),
        const SizedBox(height: 8),
        Text(subtitle, style: Theme.of(context).textTheme.bodyLarge),
      ],
    );
  }
}

class _MetricCard extends StatelessWidget {
  const _MetricCard({
    required this.label,
    required this.value,
    required this.icon,
  });

  final String label;
  final String value;
  final IconData icon;

  @override
  Widget build(BuildContext context) {
    return Card(
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Icon(icon),
            const Spacer(),
            Text(label),
            const SizedBox(height: 6),
            Text(value, style: Theme.of(context).textTheme.titleLarge),
          ],
        ),
      ),
    );
  }
}
