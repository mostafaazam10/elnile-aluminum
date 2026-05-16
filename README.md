# ELNILE Aluminum - Professional Company Website

## تطبيق متقدم لشركة النيل للألوميتال

### المميزات:
- ✅ تصميم فاخر وعصري (أسود، ذهبي، أبيض، رمادي)
- ✅ responsive design كامل
- ✅ سرعة عالية جداً
- ✅ animations احترافية
- ✅ admin panel محمي
- ✅ نظام تحميل صور مع Cloudinary
- ✅ SEO محسّن
- ✅ gallery احترافي
- ✅ نظام تقسيط

### التقنيات المستخدمة:
- Next.js 14
- React 18
- Tailwind CSS
- Framer Motion
- Swiper
- MongoDB
- Cloudinary

## التثبيت والتشغيل:

```bash
# تثبيت المكتبات
npm install

# نسخ ملف البيئة
cp .env.local.example .env.local

# تشغيل المشروع
npm run dev
```

يمكنك الآن الوصول إلى الموقع على `http://localhost:3000`

## هيكل المشروع:
```
.
├── app/
│   ├── layout.js
│   ├── page.js
│   ├── admin/
│   │   ├── layout.js
│   │   ├── page.js
│   │   └── [section]/
│   ├── services/
│   ├── portfolio/
│   ├── installments/
│   └── contact/
├── components/
│   ├── Navbar.js
│   ├── Hero.js
│   ├── Services.js
│   ├── Portfolio.js
│   ├── Installments.js
│   ├── WhatsAppButton.js
│   └── ...
├── public/
│   ├── logo.png
│   └── favicon.ico
├── styles/
│   └── globals.css
├── utils/
│   ├── api.js
│   └── auth.js
└── server/
    ├── models/
    ├── routes/
    └── index.js
