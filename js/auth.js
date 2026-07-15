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
// معالجة إنشاء حساب جديد (Sign Up)
if (registerForm) {
    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // استلام البيانات الجديدة
        const name = document.getElementById('registerName').value;
        const phone = document.getElementById('registerPhone').value;
        const email = document.getElementById('registerEmail').value;
        const password = document.getElementById('registerPassword').value;

        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // هنا نقدر نحفظ الاسم والتليفون في Firebase Firestore أو Database لاحقاً
                console.log("User registered:", name, phone, email);
                
                if (loginError) loginError.style.display = 'none';
                if (loginSuccess) {
                    loginSuccess.textContent = `Welcome ${name}! Account created successfully.`;
                    loginSuccess.style.display = 'block';
                }
                registerForm.reset();
                setTimeout(() => {
                    if (loginSuccess) loginSuccess.style.display = 'none';
                    if (loginModal) loginModal.style.display = 'none';
                }, 2000);
            })
            .catch((error) => {
                if (loginError) {
                    loginError.textContent = error.message.replace("Firebase: ", "");
                    loginError.style.display = 'block';
                }
            });
    });
}