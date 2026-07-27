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

## تشغيل تطبيق الويب

لتشغيل التطبيق كسيرفر محلي:

```powershell
powershell -ExecutionPolicy Bypass -File .\run-web-app.ps1
```

ثم افتح:

```text
http://127.0.0.1:4173
```

يدعم التطبيق الآن ملف `manifest.webmanifest` و`service-worker.js`، لذلك يمكن تثبيته من المتصفح كتطبيق ويب عند تشغيله عبر `http://127.0.0.1:4173` أو عبر استضافة HTTPS.

## التثبيت على Android و iPhone و iPad

- Android: افتح رابط التطبيق في Chrome ثم اختر Install app أو Add to Home screen.
- iPhone و iPad: افتح رابط التطبيق في Safari، اضغط Share، ثم Add to Home Screen.
- للحصول على تجربة تثبيت كاملة خارج الجهاز المحلي، انشر التطبيق على استضافة HTTPS مثل GitHub Pages أو Netlify أو Vercel.

ملاحظة: هذه نسخة PWA تعمل كتطبيق مثبت من المتصفح. نشرها كتطبيق أصلي داخل Google Play أو App Store يحتاج خطوة تغليف إضافية مثل Capacitor.

## تصفير البيانات

من شاشة الإعدادات يمكن استخدام زر `تصفير الإعدادات والبيانات المحلية`.

هذا يمسح بيانات المتصفح والكاش ويوقف تحميل بيانات Supabase مؤقتًا حتى لا تعود البيانات القديمة بعد التحديث. للرجوع إلى بيانات السحابة استخدم زر `إعادة تفعيل بيانات السحابة`.

## رابط النشر الخارجي

تم إعداد GitHub Pages لينشر التطبيق تلقائيًا عند كل رفع إلى فرع `main`.

الرابط المتوقع بعد اكتمال أول نشر:

```text
https://salihibaba.github.io/hatif-pro-pos/
```

إذا لم يعمل الرابط مباشرة، افتح إعدادات المستودع في GitHub ثم Pages واجعل Source على GitHub Actions.

## المزامنة بين الأجهزة

- كود التطبيق ينتشر تلقائيًا على GitHub Pages بعد رفعه إلى GitHub.
- بيانات التطبيق مثل المنتجات، العملاء، المستودعات، تحويلات المخزون، الفواتير، وعمليات الشراء تتم مزامنتها عبر Supabase عند ضبط `supabase-config.js`.
- سكربت `auto-sync.ps1` يجلب تغييرات GitHub البعيدة دوريًا، حتى لو لم توجد تغييرات محلية.

لجعل البيانات تعمل من أي جهاز، شغّل آخر نسخة من `supabase-schema.sql` داخل Supabase SQL Editor، ثم ضع رابط Supabase والمفتاح العام في `supabase-config.js` قبل النشر أو في إعدادات الاستضافة.
