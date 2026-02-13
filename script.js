const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const message = document.getElementById('message');
const subMessage = document.getElementById('subMessage');
const hoverMessage = document.getElementById('hoverMessage');
const container = document.querySelector('.container');
const buttonsDiv = document.getElementById('buttonsDiv');
const characterImg = document.getElementById('characterImg');

// State management
let stage = 0;
let yesBtnSize = 1;
let noBtnSize = 1;
let hasMovedToAbsolute = false;
let hoverTimeout;
let canShowHoverMessage = true;

// Stage configurations with fallback URLs
const stages = [
    {
        subText: "",
        image: "https://c.tenor.com/lt2zYKuEiNAAAAAd/tenor.gif",
        fallbackImage: "https://media1.tenor.com/m/lt2zYKuEiNAAAAAd/chiikawa.gif",
        yesHoverMessage: "You can click No, I won't cry, probably",
        showYesHoverMessage: true
    },
    {
        subText: "Are you sure?",
        image: "https://media1.tenor.com/m/lO87UVbq5FoAAAAC/chiikawa.gif",
        fallbackImage: "https://c.tenor.com/lO87UVbq5FoAAAAC/tenor.gif",
        yesHoverMessage: "Try pressing No.. just for fun",
        showYesHoverMessage: true
    },
    {
        subText: "Really?",
        image: "https://media1.tenor.com/m/5CgfDZqRmHsAAAAd/chiikawa.gif",
        fallbackImage: "https://media.tenor.com/5CgfDZqRmHsAAAAi/chiikawa.gif",
        yesHoverMessage: "Click No, trust me",
        showYesHoverMessage: true
    },
    {
        subText: "Think again!",
        image: "https://media1.tenor.com/m/1rGcK4C_QfcAAAAd/chiikawa-sleep.gif",
        fallbackImage: "https://c.tenor.com/1rGcK4C_QfcAAAAd/tenor.gif",
        yesHoverMessage: "Click No, trust me",
        showYesHoverMessage: true
    },
    {
        subText: "Pleeeeaaasseeeeee!?",
        image: "https://media1.tenor.com/m/uDugCXK4vI4AAAAd/chiikawa-cry.gif",
        fallbackImage: "https://c.tenor.com/uDugCXK4vI4AAAAd/tenor.gif",
        yesHoverMessage: null,
        showYesHoverMessage: false,
        noBtnRunAway: true
    }
];

// Image loading with error handling
function loadImage(url, fallbackUrl) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(url);
        img.onerror = () => {
            if (fallbackUrl) {
                const fallbackImg = new Image();
                fallbackImg.onload = () => resolve(fallbackUrl);
                fallbackImg.onerror = () => reject();
                fallbackImg.src = fallbackUrl;
            } else {
                reject();
            }
        };
        img.src = url;
    });
}

// Set image with loading and error handling
function setCharacterImage(imageUrl, fallbackUrl) {
    characterImg.style.opacity = '0.5';
    
    loadImage(imageUrl, fallbackUrl)
        .then(loadedUrl => {
            characterImg.src = loadedUrl;
            characterImg.onload = () => {
                characterImg.style.opacity = '1';
            };
        })
        .catch(() => {
            console.error('Failed to load image');
            characterImg.style.opacity = '1';
        });
}

// Initialize first image
setCharacterImage(stages[0].image, stages[0].fallbackImage);

// Yes button hover handler
yesBtn.addEventListener('mouseenter', () => {
    if (stage < stages.length && stages[stage].showYesHoverMessage && canShowHoverMessage) {
        showHoverMessageBox(stages[stage].yesHoverMessage);
    }
});

yesBtn.addEventListener('mouseleave', () => {
    // Don't hide immediately, let timeout handle it
});

// Yes button click handler
yesBtn.addEventListener('click', () => {
    hideHoverMessageBox();
    
    subMessage.classList.add('hidden');
    message.textContent = "Yay! I knew you'd say yes!\nThanks for making me the happiest human alive haha";
    message.classList.remove('hidden');
    container.classList.add('celebration');
    
    yesBtn.style.display = 'none';
    noBtn.style.display = 'none';
    
    setCharacterImage(
        "https://media1.tenor.com/m/-xy4T2slnJsAAAAd/chiikawa-dance.gif",
        "https://c.tenor.com/-xy4T2slnJsAAAAd/tenor.gif"
    );
    
    createConfetti();
    
    setTimeout(() => {
        document.body.style.background = 'linear-gradient(135deg, #ffeef8 0%, #ff6b9d 50%, #ff1493 100%)';
    }, 300);
});

// No button hover handler
noBtn.addEventListener('mouseenter', () => {
    if (stage === 4) {
        moveNoButton();
    }
});

// No button click handler
noBtn.addEventListener('click', (e) => {
    e.preventDefault();
    
    hideHoverMessageBox();
    
    if (stage < stages.length) {
        stage++;
        
        if (stage < stages.length) {
            subMessage.textContent = stages[stage].subText;
            subMessage.classList.remove('hidden');
            
            setCharacterImage(stages[stage].image, stages[stage].fallbackImage);
            
            yesBtnSize += 0.3;
            yesBtn.style.transform = `scale(${yesBtnSize})`;
            
            noBtnSize -= 0.2;
            if (noBtnSize < 0.4) noBtnSize = 0.4;
            
            moveNoButton();
        }
    }
});

function showHoverMessageBox(text) {
    hoverMessage.textContent = text;
    hoverMessage.classList.remove('hidden');
    canShowHoverMessage = false;
    
    clearTimeout(hoverTimeout);
    hoverTimeout = setTimeout(() => {
        hideHoverMessageBox();
        setTimeout(() => {
            canShowHoverMessage = true;
        }, 1000);
    }, 2000);
}

function hideHoverMessageBox() {
    hoverMessage.classList.add('hidden');
    clearTimeout(hoverTimeout);
}

function moveNoButton() {
    if (!hasMovedToAbsolute) {
        const currentRect = noBtn.getBoundingClientRect();
        const buttonsRect = buttonsDiv.getBoundingClientRect();
        
        const currentLeft = currentRect.left - buttonsRect.left;
        const currentTop = currentRect.top - buttonsRect.top;
        
        noBtn.style.position = 'absolute';
        noBtn.style.left = currentLeft + 'px';
        noBtn.style.top = currentTop + 'px';
        
        hasMovedToAbsolute = true;
        
        setTimeout(() => moveToRandomPosition(), 50);
    } else {
        moveToRandomPosition();
    }
}

function moveToRandomPosition() {
    const containerRect = buttonsDiv.getBoundingClientRect();
    const btnRect = noBtn.getBoundingClientRect();
    
    const maxX = containerRect.width - btnRect.width - 20;
    const maxY = 150;
    
    const randomX = Math.max(0, Math.random() * maxX);
    const randomY = Math.max(-30, Math.random() * maxY - 30);
    
    noBtn.style.left = randomX + 'px';
    noBtn.style.top = randomY + 'px';
    noBtn.style.transform = `scale(${noBtnSize})`;
}

function createConfetti() {
    const celebrationEmojis = ['🎉', '🎊', '🥳', '✨', '🎈', '🎆', '🎇', '⭐', '🌟', '💫'];
    
    for (let i = 0; i < 60; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.className = 'confetti-piece';
            confetti.textContent = celebrationEmojis[Math.floor(Math.random() * celebrationEmojis.length)];
            
            const startLeft = Math.random() * 100;
            const endLeft = startLeft + (Math.random() - 0.5) * 30;
            const duration = Math.random() * 2 + 2;
            const size = Math.random() * 20 + 15;
            
            confetti.style.cssText = `
                position: fixed;
                left: ${startLeft}vw;
                top: -50px;
                font-size: ${size}px;
                pointer-events: none;
                z-index: 10000;
                user-select: none;
                animation: confettiFall ${duration}s ease-in forwards;
            `;
            
            document.body.appendChild(confetti);
            
            setTimeout(() => confetti.remove(), duration * 1000 + 100);
        }, i * 40);
    }
}

// Tambahkan CSS animation untuk konfeti
const style = document.createElement('style');
style.textContent = `
    @keyframes confettiFall {
        0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translateY(${window.innerHeight + 100}px) rotate(720deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
