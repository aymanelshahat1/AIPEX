document.addEventListener("DOMContentLoaded", function() {
    const cursor = document.querySelector(".custom-cursor");
    if (!cursor) return;

    let hasTouch = false;

    // أول ما المستخدم يلمس الشاشة (موبايل أو لابتوب تاتش) نلغي الكورسور تماماً فوراً
    document.addEventListener("touchstart", function() {
        hasTouch = true;
        cursor.style.setProperty("display", "none", "important");
    }, { passive: true });

    // عند حركة الماوس الحقيقية (كمبيوتر) نظهر الكورسور ونبدأ نحركه
    document.addEventListener("mousemove", function(e) {
        if (hasTouch) return; // لو تم اكتشاف لمس للشاشة من قبل، لا تفعل شيء

        // إظهار الكورسور فوراً باستخدام inline style important يتغلب على الـ CSS
        cursor.style.setProperty("display", "block", "important");

        requestAnimationFrame(() => {
            cursor.style.transform = `translate3d(${e.clientX - 10}px, ${e.clientY - 10}px, 0)`;
        });
    });
});
// تأثير الـ Hover
const elements = document.querySelectorAll('a, button');
elements.forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
});
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        }
    });
});

document.querySelectorAll('.service-card').forEach(card => {
    observer.observe(card);
});
// مثال 1: ظهور العنصر أول ما الصفحة تفتح (Fade-in)
document.addEventListener('DOMContentLoaded', () => {
    const element = document.querySelector('.fade-element');
    // بنستنى شوية صغيرة عشان نضمن إن الصفحة حملت تماماً
    setTimeout(() => {
        element.classList.add('show');
    }, 300);
});

// مثال 2: لو عايز تعمل دالة للاختفاء (Fade-out)
function fadeOutElement(selector) {
    const element = document.querySelector(selector);
    element.classList.remove('show'); // بنشيل كلاس show، الـ CSS بيعمل الباقي
}
document.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');

        // لو اللينك بيبدأ بـ # يبقى ده انتقال جوه نفس الصفحة
        if (href.startsWith('#')) {
            // سيبه يشتغل طبيعي، متعملش أنيميشن
            return; 
        }

        // لو اللينك مش بيبدأ بـ # (يعني صفحة تانية)، شغل الأنيميشن
        // لو اللينك مش بيبدأ بـ # (يعني صفحة تانية)، انقل علطول من غير أنيميشن
        window.location.href = href;
    });
});

document.querySelector('a[href="#about-section"]').addEventListener('click', function(e) {
    e.preventDefault(); // بيمنع الـ reload أو الـ jump لأول الصفحة
    document.querySelector('#about-section').scrollIntoView({
        behavior: 'smooth'
    });
});
function handleSend(event) {
    // 1. منع الـ Reload عشان يفضل في نفس الصفحة
    event.preventDefault();

    // 2. تحديد الزرار
    const btn = document.getElementById('submit-btn');
    
    // 3. تغيير النص فوراً
    btn.innerText = "SENDING...";
    btn.style.opacity = "0.7";
    btn.style.cursor = "not-allowed";
    btn.disabled = true;

    // 4. محاكاة عملية الإرسال (هنا هتحط كود الـ API بتاعك بعدين)
    setTimeout(() => {
        btn.innerText = "MESSAGE SENT!";
        btn.style.background = "#4CAF50"; // أخضر للنجاح
        btn.style.color = "#fff";
    }, 2000);
}