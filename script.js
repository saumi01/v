const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const message = document.getElementById('message');
const container = document.querySelector('.container');

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

noBtn.addEventListener('click', () => {
    noClickCount++;
    
    if (noClickCount < noMessages.length) {
        message.textContent = noMessages[noClickCount - 1];
        message.classList.remove('hidden');
        
        // Make No button smaller
        noBtnSize -= 0.2;
        noBtn.style.transform = `scale(${noBtnSize})`;
        
        // Make Yes button bigger
        yesBtnSize += 0.3;
        yesBtn.style.transform = `scale(${yesBtnSize})`;
        
        // Move No button to random position
        moveNoButton();
    } else {
        // No button disappears after too many clicks
        noBtn.style.display = 'none';
        message.textContent = "The 'No' option has been removed! 😊";
    }
});

function moveNoButton() {
    // Tambahkan class moving saat pertama kali bergerak
    noBtn.classList.add('moving');
    
    const container = document.querySelector('.buttons');
    const containerRect = container.getBoundingClientRect();
    
    // Area yang lebih besar untuk tombol bergerak
    const maxX = 200; // Jarak maksimal horizontal dari posisi awal
    const maxY = 100; // Jarak maksimal vertikal dari posisi awal
    
    const randomX = (Math.random() - 0.5) * maxX;
    const randomY = (Math.random() - 0.5) * maxY;
    
    noBtn.style.left = `calc(50% + ${randomX}px)`;
    noBtn.style.top = `${randomY}px`;
    noBtn.style.transform = `translate(-50%, 0) scale(${noBtnSize})`;
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
