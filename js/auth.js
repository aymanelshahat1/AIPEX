// 1. استيراد مكتبات Firebase من الـ CDN مباشرة
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

// 2. إعدادات الـ Firebase الخاصة بمشروعك (AIPEX)
const firebaseConfig = {
  apiKey: "AIzaSyAwSnEn0cpNkXC4EtMkoB5ZnRhv-QE_Tpo",
  authDomain: "aipex-6588b.firebaseapp.com",
  projectId: "aipex-6588b",
  storageBucket: "aipex-6588b.firebasestorage.app",
  messagingSenderId: "320792692639",
  appId: "1:320792692639:web:4e8e2d6a2b8458ff14dfaa",
  measurementId: "G-QH1F4WHCS3"
};

// تهيئة تطبيق Firebase والـ Auth
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// الإيميل الأساسي للأدمن (أنت) لتفعيل أزرار التعديل
const adminEmail = "aymanelshahat35@gmail.com";

// عناصر واجهة المستخدم (DOM Elements)
const loginBtn = document.getElementById('loginBtn');
const loginModal = document.getElementById('loginModal');
const closeModal = document.querySelector('.close-modal');

const signInArea = document.getElementById('signInArea');
const signUpArea = document.getElementById('signUpArea');
const toSignUp = document.getElementById('toSignUp');
const toSignIn = document.getElementById('toSignIn');

const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
const loginError = document.getElementById('loginError');
const loginSuccess = document.getElementById('loginSuccess');

// 3. التبديل بين واجهة تسجيل الدخول وإنشاء حساب
if (toSignUp && toSignIn && signInArea && signUpArea) {
    toSignUp.addEventListener('click', (e) => {
        e.preventDefault();
        signInArea.style.display = 'none';
        signUpArea.style.display = 'block';
        if (loginError) loginError.style.display = 'none';
    });

    toSignIn.addEventListener('click', (e) => {
        e.preventDefault();
        signUpArea.style.display = 'none';
        signInArea.style.display = 'block';
        if (loginError) loginError.style.display = 'none';
    });
}

// 4. إظهار وإخفاء الـ Modal
if (loginBtn && loginModal) {
    loginBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if (auth.currentUser) {
            signOut(auth).then(() => {
                window.location.reload();
            });
        } else {
            loginModal.style.display = 'flex';
        }
    });

    if (closeModal) {
        closeModal.addEventListener('click', () => {
            loginModal.style.display = 'none';
        });
    }

    window.addEventListener('click', (e) => {
        if (e.target === loginModal) {
            loginModal.style.display = 'none';
        }
    });
}

// 5. عملية تسجيل الدخول (Sign In)
if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                if (loginError) loginError.style.display = 'none';
                loginForm.reset();
                if (loginModal) loginModal.style.display = 'none';
            })
            .catch((error) => {
                if (loginError) {
                    loginError.textContent = "Incorrect email or password.";
                    loginError.style.display = 'block';
                }
            });
    });
}

// 6. عملية إنشاء حساب جديد (Sign Up) للطلبة والمستخدمين الجدد
if (registerForm) {
    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('registerEmail').value;
        const password = document.getElementById('registerPassword').value;

        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                if (loginError) loginError.style.display = 'none';
                if (loginSuccess) {
                    loginSuccess.textContent = "Account created successfully! Logging you in...";
                    loginSuccess.style.display = 'block';
                }
                registerForm.reset();
                
                // نقفل النافذة تلقائياً بعد ثانيتين من النجاح
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

// 7. مراقبة حالة تسجيل الدخول وتوزيع الصلاحيات
onAuthStateChanged(auth, (user) => {
    if (user) {
        const displayName = user.email.split('@')[0];
        
        if (loginBtn) {
            loginBtn.innerHTML = `<i class="fa-solid fa-user" style="color: #dfcda4; margin-right: 5px;"></i> ${displayName.toUpperCase()} (Logout)`;
            loginBtn.style.color = "#ff4a4a";
        }

        // لو المستخدم هو الأدمن، نفتح له أزرار التعديل فوراً
        if (user.email === adminEmail) {
            enableAdminFeatures();
        } else {
            disableAdminFeatures(); // أي مستخدم عادي لا تظهر له أزرار التعديل
        }
    } else {
        if (loginBtn) {
            loginBtn.innerHTML = "Login";
            loginBtn.style.color = "#dfcda4";
        }
        disableAdminFeatures();
    }
});

function enableAdminFeatures() {
    console.log("Admin privileges active!");
    const cards = document.querySelectorAll('.course-card');
    cards.forEach((card) => {
        if (!card.querySelector('.admin-edit-btn')) {
            const editBtn = document.createElement('button');
            editBtn.className = 'admin-edit-btn';
            editBtn.innerHTML = `<i class="fa-regular fa-pen-to-square"></i> Edit Card`;
            editBtn.style = `
                background: #000;
                border: 1px dashed #dfcda4;
                color: #dfcda4;
                padding: 6px 12px;
                font-size: 11px;
                margin-top: 15px;
                cursor: pointer;
                border-radius: 5px;
                width: 100%;
                font-family: 'Montserrat', sans-serif;
                transition: all 0.3s;
            `;
            editBtn.onclick = (e) => {
                e.stopPropagation();
                const newTitle = prompt("Enter new course title:", card.querySelector('.code-text').textContent);
                if (newTitle) {
                    card.querySelector('.code-text').textContent = newTitle;
                    alert("Changes applied locally! Linking to database is next.");
                }
            };
            card.appendChild(editBtn);
        }
    });
}

function disableAdminFeatures() {
    const adminBtns = document.querySelectorAll('.admin-edit-btn');
    adminBtns.forEach(btn => btn.remove());
}