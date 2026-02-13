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

// Stage configurations
const stages = [
    {
        subText: "",
        image: "https://images.wondershare.com/filmora/article-images/chiikawa-stickers-2.gif",
        yesHoverMessage: "You can click No, I won't cry, probably",
        showYesHoverMessage: true
    },
    {
        subText: "Are you sure?",
        image: "https://media.tenor.com/9SsLoaeSjN8AAAAC/chiikawa.gif",
        yesHoverMessage: null,
        showYesHoverMessage: false
    },
    {
        subText: "Really?",
        image: "https://media.tenor.com/8qvZhQC0wW0AAAAC/chikawa.gif",
        yesHoverMessage: "Click No, trust me",
        showYesHoverMessage: true
    },
    {
        subText: "Think again!",
        image: "https://media.tenor.com/PbZbSJbB2VsAAAAC/chiikawa-sleep-together-chiikawa-sleep.gif",
        yesHoverMessage: "Click No, trust me",
        showYesHoverMessage: true
    },
    {
        subText: "Pleeeeaaasseeeeee!?",
        image: "https://media.tenor.com/AwmkSMT7w7IAAAAC/%EC%B9%98%EC%9D%B4%EC%B9%B4%EC%99%80-%EC%9A%B8%EB%B3%B4.gif",
        yesHoverMessage: null,
        showYesHoverMessage: false,
        noBtnRunAway: true
    }
];

// Yes button hover handler
yesBtn.addEventListener('mouseenter', () => {
    if (stage < stages.length && stages[stage].showYesHoverMessage && canShowHoverMessage) {
        showHoverMessageBox(stages[stage].yesHoverMessage);
    }
});

yesBtn.addEventListener('mouseleave', () => {
    hideHoverMessageBox();
});

// Yes button click handler
yesBtn.addEventListener('click', () => {
    // Show final celebration
    subMessage.classList.add('hidden');
    message.textContent = "Yay! I knew you'd say yes! 💕\nThanks for making me the happiest human alive haha";
    message.classList.remove('hidden');
    container.classList.add('celebration');
    
    // Hide buttons
    yesBtn.style.display = 'none';
    noBtn.style.display = 'none';
    
    // Change to celebration image
    characterImg.src = "https://media.tenor.com/2W4jXsiFSusAAAAC/chiikawa-chiikawa-dance.gif";
    
    // Create hearts animation
    createHearts();
    
    // Change background
    setTimeout(() => {
        document.body.style.background = 'linear-gradient(135deg, #ffeef8 0%, #ff6b9d 50%, #ff1493 100%)';
    }, 300);
});

// No button hover handler (untuk stage terakhir - run away)
noBtn.addEventListener('mouseenter', () => {
    if (stage === 4) {
        moveNoButton();
    }
});

// No button click handler
noBtn.addEventListener('click', (e) => {
    e.preventDefault();
    
    if (stage < stages.length) {
        stage++;
        
        if (stage < stages.length) {
            // Update sub message
            subMessage.textContent = stages[stage].subText;
            subMessage.classList.remove('hidden');
            
            // Update image
            characterImg.src = stages[stage].image;
            
            // Make Yes button bigger
            yesBtnSize += 0.3;
            yesBtn.style.transform = `scale(${yesBtnSize})`;
            
            // Make No button smaller
            noBtnSize -= 0.2;
            if (noBtnSize < 0.4) noBtnSize = 0.4;
            
            // Move No button
            moveNoButton();
        }
    }
});

function showHoverMessageBox(text) {
    hoverMessage.textContent = text;
    hoverMessage.classList.remove('hidden');
    canShowHoverMessage = false;
    
    // Hide after 2 seconds
    clearTimeout(hoverTimeout);
    hoverTimeout = setTimeout(() => {
        hideHoverMessageBox();
        // Allow showing again after cooldown
        setTimeout(() => {
            canShowHoverMessage = true;
        }, 1000);
    }, 2000);
}

function hideHoverMessageBox() {
    hoverMessage.classList.add('hidden');
}

function moveNoButton() {
    // First time moving - convert to absolute
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

function createHearts() {
    const heartSymbols = ['💕', '💖', '💗', '💓', '💝', '❤️', '🥰', '😍'];
    
    for (let i = 0; i < 40; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.textContent = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
            heart.style.position = 'fixed';
            heart.style.left = Math.random() * window.innerWidth + 'px';
            heart.style.top = window.innerHeight + 'px';
            heart.style.fontSize = (Math.random() * 30 + 20) + 'px';
            heart.style.opacity = '1';
            heart.style.pointerEvents = 'none';
            heart.style.zIndex = '9999';
            
            let position = window.innerHeight;
            let rotation = 0;
            let opacity = 1;
            let drift = (Math.random() - 0.5) * 3;
            
            const animationInterval = setInterval(() => {
                position -= 5;
                rotation += 5;
                opacity -= 0.008;
                
                heart.style.top = position + 'px';
                heart.style.left = (parseFloat(heart.style.left) + drift) + 'px';
                heart.style.transform = `rotate(${rotation}deg)`;
                heart.style.opacity = opacity;
                
                if (position < -100 || opacity <= 0) {
                    clearInterval(animationInterval);
                    heart.remove();
                }
            }, 20);
            
        }, i * 80);
    }
}

// Background floating hearts (optional ambient effect)
function createFloatingHeart() {
    if (stage >= stages.length) return; // Stop after celebration
    
    const heart = document.createElement('div');
    heart.textContent = '💕';
    heart.style.position = 'fixed';
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.bottom = '-50px';
    heart.style.fontSize = Math.random() * 20 + 15 + 'px';
    heart.style.opacity = Math.random() * 0.3 + 0.2;
    heart.style.pointerEvents = 'none';
    heart.style.zIndex = '0';
    
    document.body.appendChild(heart);
    
    let pos = -50;
    const riseSpeed = Math.random() * 1.5 + 0.5;
    
    const rise = setInterval(() => {
        pos -= riseSpeed;
        heart.style.bottom = Math.abs(pos) + 'px';
        
        if (Math.abs(pos) > window.innerHeight + 50) {
            clearInterval(rise);
            heart.remove();
        }
    }, 50);
}

// Create ambient floating hearts every 3 seconds
setInterval(createFloatingHeart, 3000);
