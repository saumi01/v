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
        image: "https://c.tenor.com/lO87UVbq5FoAAAAC/tenor.gif",
        yesHoverMessage: "Try pressing No.. just for fun",
        showYesHoverMessage: true
    },
    {
        subText: "Really?",
        image: "https://media.tenor.com/5CgfDZqRmHsAAAAi/chiikawa.gif",
        yesHoverMessage: "Click No, trust me",
        showYesHoverMessage: true
    },
    {
        subText: "Think again!",
        image: "https://c.tenor.com/1rGcK4C_QfcAAAAd/tenor.gif",
        yesHoverMessage: "Click No, trust me",
        showYesHoverMessage: true
    },
    {
        subText: "Pleeeeaaasseeeeee!?",
        image: "https://c.tenor.com/uDugCXK4vI4AAAAd/tenor.gif",
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
    // Don't hide immediately, let timeout handle it
});

// Yes button click handler
yesBtn.addEventListener('click', () => {
    // Hide hover message if showing
    hideHoverMessageBox();
    
    // Show final celebration
    subMessage.classList.add('hidden');
    message.textContent = "Yay! I knew you'd say yes!\nThanks for making me the happiest human alive haha";
    message.classList.remove('hidden');
    container.classList.add('celebration');
    
    // Hide buttons
    yesBtn.style.display = 'none';
    noBtn.style.display = 'none';
    
    // Change to celebration image
    characterImg.src = "https://c.tenor.com/-xy4T2slnJsAAAAd/tenor.gif";
    
    // Create confetti animation
    createConfetti();
    
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
    
    // Hide any showing hover message
    hideHoverMessageBox();
    
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
    clearTimeout(hoverTimeout);
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

function createConfetti() {
    // Party and celebration emojis only
    const celebrationEmojis = ['🎉', '🎊', '🥳', '✨', '🎈', '🎆', '🎇', '⭐', '🌟', '💫'];
    
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.textContent = celebrationEmojis[Math.floor(Math.random() * celebrationEmojis.length)];
            confetti.style.position = 'fixed';
            confetti.style.left = Math.random() * window.innerWidth + 'px';
            confetti.style.top = '-50px';
            confetti.style.fontSize = (Math.random() * 25 + 15) + 'px';
            confetti.style.opacity = '1';
            confetti.style.pointerEvents = 'none';
            confetti.style.zIndex = '9999';
            
            let position = -50;
            let rotation = 0;
            let opacity = 1;
            let drift = (Math.random() - 0.5) * 3;
            
            const animationInterval = setInterval(() => {
                position += 5;
                rotation += 8;
                opacity -= 0.01;
                
                confetti.style.top = position + 'px';
                confetti.style.left = (parseFloat(confetti.style.left) + drift) + 'px';
                confetti.style.transform = `rotate(${rotation}deg)`;
                confetti.style.opacity = opacity;
                
                if (position > window.innerHeight || opacity <= 0) {
                    clearInterval(animationInterval);
                    confetti.remove();
                }
            }, 20);
            
        }, i * 60);
    }
}
