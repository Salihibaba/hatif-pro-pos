# hatif-pro-pos

واجهة عربية تجريبية لنظام إدارة محلات بيع وشراء الهواتف.

## المزايا الحالية

- لوحة تحكم عربية RTL.
- بيع سريع وسلة فاتورة.
- إدارة مخزون هواتف وإكسسوارات.
- دعم IMEI في بيانات المنتجات.
- فواتير وتقارير وإعدادات صلاحيات.
- وضع ليلي ونهاري.

افتح `index.html` مباشرة في المتصفح لتجربة الواجهة.

## الربط مع Supabase

1. أنشئ مشروعًا في Supabase.
2. افتح SQL Editor وشغّل محتوى `supabase-schema.sql` لإنشاء الجداول والبيانات الأولية.
3. افتح `supabase-config.js` وضع رابط المشروع والمفتاح العام `anon key`.
4. افتح `index.html` من جديد. عند توفر الإعدادات سيقرأ التطبيق البيانات من Supabase ويحفظ الفواتير الجديدة هناك.

ملف `supabase-config.js` مضاف إلى `.gitignore` حتى لا تُرفع المفاتيح بالخطأ. يوجد ملف `supabase-config.example.js` كنموذج.

## الحفظ التلقائي على GitHub

لتشغيل المزامنة التلقائية افتح PowerShell داخل مجلد المشروع وشغّل:

```powershell
powershell -ExecutionPolicy Bypass -File .\auto-sync.ps1
```

سيقوم السكربت كل 30 ثانية بفحص التغييرات، ثم تنفيذ `git add -A` و`git commit` و`git push` تلقائيًا إلى `origin/main`.

لتشغيله في الخلفية:

```powershell
powershell -ExecutionPolicy Bypass -File .\start-auto-sync.ps1
```

إذا ظهر تعارض أثناء `git pull --rebase`، سيترك السكربت التزامن إلى أن يتم حل التعارض يدويًا.
