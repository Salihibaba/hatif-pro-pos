import 'package:flutter/material.dart';

class AppModule {
  const AppModule({
    required this.path,
    required this.title,
    required this.icon,
    required this.description,
  });

  final String path;
  final String title;
  final IconData icon;
  final String description;
}

class ModuleScreen extends StatelessWidget {
  const ModuleScreen({required this.module, super.key});

  static const modules = [
    AppModule(
      path: 'inventory',
      title: 'إدارة المخزون',
      icon: Icons.inventory_2_outlined,
      description: 'المستودعات، الحدود الدنيا، وتحويلات المخزون.',
    ),
    AppModule(
      path: 'phones',
      title: 'إدارة الهواتف',
      icon: Icons.phone_iphone_outlined,
      description: 'IMEI، الصور، الأسعار، وحالة الجهاز.',
    ),
    AppModule(
      path: 'customers',
      title: 'العملاء',
      icon: Icons.groups_2_outlined,
      description: 'الأرصدة، الأقساط، الدفعات، وسجل التعامل.',
    ),
    AppModule(
      path: 'suppliers',
      title: 'الموردون',
      icon: Icons.local_shipping_outlined,
      description: 'فواتير الشراء، المستحقات، وتقييم الموردين.',
    ),
    AppModule(
      path: 'sales',
      title: 'عمليات البيع',
      icon: Icons.point_of_sale_outlined,
      description: 'بيع سريع، خصومات، طباعة، ومشاركة الفاتورة.',
    ),
    AppModule(
      path: 'purchases',
      title: 'عمليات الشراء',
      icon: Icons.shopping_bag_outlined,
      description: 'شراء أجهزة جديدة ومستعملة وربطها بالمخزون.',
    ),
    AppModule(
      path: 'returns',
      title: 'المرتجعات',
      icon: Icons.assignment_return_outlined,
      description: 'مرتجعات البيع والشراء وتسوية المخزون.',
    ),
    AppModule(
      path: 'installments',
      title: 'الأقساط والدفعات',
      icon: Icons.payments_outlined,
      description: 'جداول الأقساط، التحصيل، والتنبيهات.',
    ),
    AppModule(
      path: 'expenses',
      title: 'المصروفات',
      icon: Icons.receipt_long_outlined,
      description: 'مصروفات تشغيلية ورواتب وإيجارات.',
    ),
    AppModule(
      path: 'reports',
      title: 'التقارير',
      icon: Icons.analytics_outlined,
      description: 'الأرباح والخسائر، المبيعات، والمخزون.',
    ),
    AppModule(
      path: 'scanner',
      title: 'Barcode و IMEI',
      icon: Icons.qr_code_scanner_outlined,
      description: 'قراءة الباركود وتحقق IMEI بسرعة.',
    ),
    AppModule(
      path: 'backup',
      title: 'النسخ الاحتياطي',
      icon: Icons.cloud_sync_outlined,
      description: 'نسخ احتياطي، استعادة، ومزامنة تلقائية.',
    ),
  ];

  final AppModule module;

  @override
  Widget build(BuildContext context) {
    return ListView(
      padding: const EdgeInsets.all(24),
      children: [
        Text(module.title, style: Theme.of(context).textTheme.headlineMedium),
        const SizedBox(height: 8),
        Text(module.description, style: Theme.of(context).textTheme.bodyLarge),
        const SizedBox(height: 24),
        Card(
          child: Padding(
            padding: const EdgeInsets.all(24),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Icon(module.icon, size: 44),
                const SizedBox(height: 16),
                Text(
                  'هذه الوحدة جاهزة كبنية إنتاجية وسيتم توصيل نماذجها وعملياتها التفصيلية على مراحل.',
                  style: Theme.of(context).textTheme.titleMedium,
                ),
              ],
            ),
          ),
        ),
      ],
    );
  }
}
