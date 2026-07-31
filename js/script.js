// --- Mobile Menu Toggle ---
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('toggle');
    });
}

// --- Scroll Reveal Animation ---
const reveals = document.querySelectorAll('.reveal');

const revealOnScroll = () => {
    reveals.forEach(element => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const revealPoint = 150;

        if (elementTop < windowHeight - revealPoint) {
            element.classList.add('active');
        }
    });
};

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

// --- Web3Forms Submission ---
const consultationForm = document.getElementById('consultationForm');

if (consultationForm) {
    consultationForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const submitBtn = consultationForm.querySelector('.btn');
        const originalText = submitBtn.innerText;
        submitBtn.innerText = 'SENDING...';
        submitBtn.disabled = true;

        const formData = new FormData(consultationForm);
        
        // Inject API Key from config.js
        formData.append('access_key', ENV.WEB3FORMS_ACCESS_KEY);

        try {
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                body: formData
            });

            const result = await response.json();

            if (result.success) {
                alert('Appointment request sent successfully! We will contact you soon.');
                consultationForm.reset();
            } else {
                throw new Error(result.message || 'Something went wrong');
            }
        } catch (error) {
            alert('Error: ' + error.message);
        } finally {
            submitBtn.innerText = originalText;
            submitBtn.disabled = false;
        }
    });
}

// --- Dynamic Contact Links ---
window.addEventListener('DOMContentLoaded', () => {
    const whatsappLink = document.getElementById('whatsapp-link');
    const igLink = document.getElementById('ig-link');
    const fbLink = document.getElementById('fb-link');

    if (whatsappLink && ENV.WHATSAPP_NUMBER) {
        whatsappLink.href = `https://wa.me/${ENV.WHATSAPP_NUMBER}`;
    }
    if (igLink && ENV.INSTAGRAM_URL) {
        igLink.href = ENV.INSTAGRAM_URL;
    }
    if (fbLink && ENV.FACEBOOK_URL) {
        fbLink.href = ENV.FACEBOOK_URL;
    }
});