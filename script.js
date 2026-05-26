const slider = document.querySelector('.slider');
const dots = document.querySelectorAll('.dot'); // 🔴 सभी डॉट्स को सेलेक्ट किया
let currentSlide = 0;
let touchStarts = 0;
let touchEnds = 0;
let countdown = 40; // 40 * 0.1s = 4 सेकंड का डिले ⏱️

// 🟢 डॉट्स की विड्थ को अपडेट करने का फंक्शन
function updateDots() {
    dots.forEach(dot => {
        dot.style.width = '10px'; // पहले सभी डॉट्स को छोटा करें
        dot.style.backgroundColor = 'rgba(51, 201, 254, 0.3)'; // पहले सभी डॉट्स को छोटा करें
    });
    dots[currentSlide].style.width = '50px'; // सिर्फ करंट डॉट को Pill shape बनाएं
    dots[currentSlide].style.backgroundColor = 'rgba(51, 201, 254, 1)'; // सिर्फ करंट डॉट को Pill shape बनाएं
}

// हर 0.1 सेकंड में चलने वाला मुख्य टाइमर ⚡
setInterval(() => {
    if (countdown > 0) {
        countdown--;
    }

    let swipeDistance = touchEnds - touchStarts;

    // Condition 1: Right to Left स्वाइप (अगली स्लाइड)
    if (countdown > 0 && touchEnds !== 0 && swipeDistance < 0) {
        if (currentSlide < 4) currentSlide++; 
        countdown = 40; 
        resetTouch();
        updateDots(); // डॉट्स अपडेट करें
    } 
    // Condition 2: Left to Right स्वाइप (पिछली स्लाइड)
    else if (countdown > 0 && touchEnds !== 0 && swipeDistance > 0) {
        if (currentSlide > 0) currentSlide--;
        countdown = 40;
        resetTouch();
        updateDots(); // डॉट्स अपडेट करें
    } 
    // Condition 3: काउंटडाउन 0 हो गया (ऑटोमैटिक आगे बढ़ें)
    else if (countdown === 0) {
        currentSlide++;
        if (currentSlide > 4) currentSlide = 0; 
        countdown = 40;
        resetTouch();
        updateDots(); // डॉट्स अपडेट करें
    }

    // 5 स्लाइड्स के हिसाब से 20% से गुणा 📐
    slider.style.transform = `translateX(-${currentSlide * 20}%)`;
}, 100); 

// पहली बार पेज लोड होने पर पहले डॉट को Pill shape दिखाने के लिए
updateDots();

// मोबाइल टच इवेंट्स 📱
slider.addEventListener('touchstart', (e) => {
    touchStarts = e.touches[0].clientX;
    touchEnds = 0;
});

slider.addEventListener('touchend', (e) => {
    touchEnds = e.changedTouches[0].clientX;
});

function resetTouch() {
    touchStarts = 0;
    touchEnds = 0;
}