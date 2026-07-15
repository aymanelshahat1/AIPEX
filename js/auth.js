// --- تهيئة الـ Modal وعناصره ---
const loginBtn = document.getElementById('loginBtn'); // زرار الـ Login في الهيدر
const loginModal = document.getElementById('loginModal'); // النافذة العايمة
const closeModal = document.querySelector('.close-modal'); // زرار (X)
const loginForm = document.getElementById('loginForm'); // الفورم

// 1. فتح الـ Modal عند الضغط على زرار Login في الهيدر
if (loginBtn && loginModal) {
    loginBtn.addEventListener('click', (e) => {
        e.preventDefault(); // منع سلوك اللينك الافتراضي
        loginModal.style.display = 'flex'; // إظهار الـ Modal واستخدام flex للسنترة
    });
}

// 2. إغلاق الـ Modal عند الضغط على (X)
if (closeModal) {
    closeModal.addEventListener('click', () => {
        loginModal.style.display = 'none'; // إخفاء ال\ Modal
    });
}

// 3. إغلاق الـ Modal عند الضغط بره المربع (في المنطقة السوداء الشفافة)
window.addEventListener('click', (e) => {
    if (e.target === loginModal) {
        loginModal.style.display = 'none';
    }
});

// 4. معالجة بيانات الفورم (تسجيل الدخول)
if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // هنا هتحط كود الـ Firebase الحقيقي لما نربطه سوا
        alert("Admin Sign In Logic Coming Soon! (AIPEX-WEB)");
        loginModal.style.display = 'none'; // قفل الـ Modal بعد محاولة الدخول
        loginForm.reset(); // تصفير الفورم
    });
}