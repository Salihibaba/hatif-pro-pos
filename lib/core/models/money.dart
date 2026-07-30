import 'package:intl/intl.dart';

class Money {
  const Money(this.amount);

  final int amount;

  static final NumberFormat _formatter = NumberFormat.decimalPattern('ar_MR');

  String format() => '${_formatter.format(amount)} أوقية';
}
