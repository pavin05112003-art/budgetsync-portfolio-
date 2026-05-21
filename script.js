// Initialize Lucide Icons
lucide.createIcons();

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// PWA Install Logic
let deferredPrompt;
const navInstallBtn = document.getElementById('navInstallBtn');
const heroInstallBtn = document.getElementById('heroInstallBtn');

window.addEventListener('beforeinstallprompt', (e) => {
    // Prevent the mini-infobar from appearing on mobile
    e.preventDefault();
    // Stash the event so it can be triggered later.
    deferredPrompt = e;
});

function handleInstallClick() {
    if (deferredPrompt) {
        // Show the install prompt
        deferredPrompt.prompt();
        deferredPrompt.userChoice.then((choiceResult) => {
            if (choiceResult.outcome === 'accepted') {
                console.log('User accepted the install prompt');
            }
            deferredPrompt = null;
        });
    } else {
        // Fallback instructions if native prompt is blocked or already installed
        alert("To install this app:\n\n📱 On Mobile: Tap the 3 dots menu (top right) and select 'Add to home screen' or 'Install app'.\n\n💻 On PC: Click the small monitor icon in your address bar (top right).");
    }
}

if (navInstallBtn) navInstallBtn.addEventListener('click', handleInstallClick);
if (heroInstallBtn) heroInstallBtn.addEventListener('click', handleInstallClick);

// Service Worker Registration
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js').then(registration => {
            console.log('SW registered: ', registration);
        }).catch(registrationError => {
            console.log('SW registration failed: ', registrationError);
        });
    });
}
