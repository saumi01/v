const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const message = document.getElementById('message');
const container = document.querySelector('.container');
const buttonsDiv = document.querySelector('.buttons');

let noBtnSize = 1;
let yesBtnSize = 1;

const noMessages = [
    "Are you sure? 🥺",
    "Really? Think again! 💔",
    "Please reconsider... 😢",
    "Don't break my heart! 💔",
    "Last chance! 🥺"
];

let noClickCount = 0;

yesBtn.addEventListener('click', () => {
    message.textContent = "Yay! I knew you'd say yes! 🎉💕";
    message.classList.remove('hidden');
    container.classList.add('celebration');
    
    // Hide buttons
    yesBtn.style.display = 'none';
    noBtn.style.display = 'none';
    
    // Create hearts animation
    createHearts();
});

noBtn.addEventListener('mouseover', () => {
    if (noClickCount >= 0) {
        moveNoButton();
    }
});

noBtn.addEventListener('click', (e) => {
    e.preventDefault();
    noClickCount++;
    
    if (noClickCount < noMessages.length) {
        message.textContent = noMessages[noClickCount - 1];
        message.classList.remove('hidden');
        
        // Make No button smaller
        noBtnSize -= 0.15;
        
        // Make Yes button bigger
        yesBtnSize += 0.25;
        yesBtn.style.transform = `scale(${yesBtnSize})`;
        
        moveNoButton();
    } else {
        // No button disappears after too many clicks
        noBtn.style.display = 'none';
        message.textContent = "The 'No' option has been removed! 😊";
    }
});

function moveNoButton() {
    // Ubah ke position absolute hanya saat akan bergerak
    if (noBtn.style.position !== 'absolute') {
        noBtn.style.position = 'absolute';
    }
    
    const containerRect = buttonsDiv.getBoundingClientRect();
    const btnRect = noBtn.getBoundingClientRect();
    
    // Random position dalam container
    const maxX = containerRect.width - btnRect.width;
    const maxY = 150;
    
    const randomX = Math.random() * maxX;
    const randomY = Math.random() * maxY - 20;
    
    noBtn.style.left = randomX + 'px';
    noBtn.style.top = randomY + 'px';
    noBtn.style.transform = `scale(${noBtnSize})`;
}

function createHearts() {
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.textContent = '💕';
            heart.style.position = 'fixed';
            heart.style.left = Math.random() * window.innerWidth + 'px';
            heart.style.top = window.innerHeight + 'px';
            heart.style.fontSize = (Math.random() * 30 + 20) + 'px';
            heart.style.animation = 'floatUp 3s ease-out';
            heart.style.pointerEvents = 'none';
            heart.style.zIndex = '9999';
            
            document.body.appendChild(heart);
            
            setTimeout(() => heart.remove(), 3000);
        }, i * 100);
    }
}

// Add floating animation
const style = document.createElement('style');
style.textContent = `
    @keyframes floatUp {
        to {
            transform: translateY(-${window.innerHeight + 100}px) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
