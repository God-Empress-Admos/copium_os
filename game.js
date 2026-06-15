let gameState = {
    copium: 0,
    totalCopium: 0,
    upgrades: [
        { id: 0, name: "Doomscrolling", cost: 15, rate: 1, count: 0, description: "Twitter/X feeds" },
        { id: 1, name: "Reddit Arguments", cost: 100, rate: 8, count: 0, description: "Rage-bait engagement" },
        { id: 2, name: "Delusional Logic", cost: 500, rate: 25, count: 0, description: "Self-serving biases" },
        { id: 3, name: "Pure Denial", cost: 2500, rate: 100, count: 0, description: "Ignoring all facts" },
        { id: 4, name: "Brain Rot", cost: 10000, rate: 500, count: 0, description: "Total dissociation" },
        { id: 5, name: "Echo Chambers", cost: 50000, rate: 2000, count: 0, description: "Surround yourself with agreement" },
        { id: 6, name: "Selective Memory", cost: 250000, rate: 8000, count: 0, description: "Choosing what to remember" },
        { id: 7, name: "Gaslighting", cost: 1000000, rate: 25000, count: 0, description: "Making others doubt reality" },
        { id: 8, name: "Confirmation Bias", cost: 5000000, rate: 75000, count: 0, description: "Only seeing what you want" },
        { id: 9, name: "Reality Refusal", cost: 25000000, rate: 200000, count: 0, description: "The ultimate wall of denial" },
        { id: 10, name: "Transcendent Delusion", cost: 100000000, rate: 750000, count: 0, description: "Existing entirely in a dream" },
        { id: 11, name: "Ego Erasure", cost: 500000000, rate: 4000000, count: 0, description: "There is no longer a 'you' left to perceive the truth" }
    ],
    manualUpgrades: [
        { id: 12, name: "Deep Breathing", cost: 50, rate: 2, count: 0, description: "Controlled inhalation technique" },
        { id: 13, name: "Meditation", cost: 300, rate: 6, count: 0, description: "Mindful absorption" },
        { id: 14, name: "Mindfulness", cost: 1500, rate: 20, count: 0, description: "Present moment awareness" },
        { id: 15, name: "Zen State", cost: 8000, rate: 75, count: 0, description: "Calm, focused inhalation" },
        { id: 16, name: "Trance", cost: 40000, rate: 250, count: 0, description: "Altered consciousness breathing" },
        { id: 17, name: "Satori", cost: 200000, rate: 1000, count: 0, description: "Moment of enlightenment" },
        { id: 18, name: "Hyperventilation", cost: 1000000, rate: 5000, count: 0, description: "Rapidly inducing panic" },
        { id: 19, name: "Hypnotic Induction", cost: 5000000, rate: 20000, count: 0, description: "Subconscious suggestion" },
        { id: 20, name: "Astral Projection", cost: 25000000, rate: 75000, count: 0, description: "Detaching from the physical plane" },
        { id: 21, name: "Void Breathing", cost: 100000000, rate: 300000, count: 0, description: "Inhaling the absolute nothingness" },
        { id: 22, name: "Singularity Breath", cost: 500000000, rate: 1250000, count: 0, description: "Merging with the cosmic delusion" },
        { id: 23, name: "The Final Exhale", cost: 1000000000, rate: 5000000, count: 0, description: "Releasing the last breath of your former existence" }
    ],
    multiplierUpgrades: {
        denial: [
            { id: 24, name: "Cognitive Dissonance", cost: 1000000000, rate: 0.1, purchased: false, description: "Increase denial gain by 10%" },
            { id: 25, name: "Emotional Detachment", cost: 5000000000, rate: 0.2, purchased: false, description: "Increase denial gain by 20%" },
            { id: 26, name: "Psychological Immunity", cost: 20000000000, rate: 0.3, purchased: false, description: "Increase denial gain by 30%" },
            { id: 27, name: "Mental Fortification", cost: 100000000000, rate: 0.5, purchased: false, description: "Increase denial gain by 50%" },
            { id: 28, name: "Neural Isolation", cost: 500000000000, rate: 1, purchased: false, description: "Increase denial gain by 100%" },
            { id: 29, name: "Cosmic Disconnection", cost: 1000000000000, rate: 2, purchased: false, description: "Increase denial gain by 200%" }
        ],
        inhale: [
            { id: 30, name: "Respiratory Mastery", cost: 5000000000, rate: 0.1, purchased: false, description: "Improves inhalation by 10%" },
            { id: 31, name: "Breath Control", cost: 20000000000, rate: 0.2, purchased: false, description: "Improves inhalation by 20%" },
            { id: 32, name: "Pranayama", cost: 100000000000, rate: 0.3, purchased: false, description: "Improves inhalation by 30%" },
            { id: 33, name: "Zen Breathing", cost: 500000000000, rate: 0.5, purchased: false, description: "Improves inhalation by 50%" },
            { id: 34, name: "Astral Inhalation", cost: 1000000000000, rate: 1, purchased: false, description: "Improves inhalation by 100%" },
            { id: 35, name: "Quantum Respiration", cost: 5000000000000, rate: 2, purchased: false, description: "Improves inhalation by 200%" }
        ]
    },
    delusionStage: 0,
    lastClickTime: 0,
    clickCount: 0,
    cps: 0,
    lastActiveTime: Date.now(),
    previousCps: 0
};

const delusionStages = [
    { name: "Unknown", description: "Unknown state of denial" },
    { name: "Denial", description: "I don't know what's happening" },
    { name: "Confusion", description: "Things seem weird but I can't explain why" },
    { name: "Disbelief", description: "I'm not sure if this is real or not" },
    { name: "Rationalization", description: "I understand it, but I don't want to believe it" },
    { name: "Justification", description: "I know it's wrong, but I have good reasons for believing otherwise" },
    { name: "Acceptance", description: "I'm aware of the situation but choose to ignore it" },
    { name: "Rejection", description: "I reject all evidence against my beliefs" },
    { name: "Projection", description: "I blame others for the problems I'm facing" },
    { name: "Distortion", description: "I distort facts to fit my worldview" },
    { name: "Fabrication", description: "I create false narratives to support my beliefs" },
    { name: "Delusion", description: "I live in a completely fabricated reality" },
    { name: "Ontological Collapse", description: "Reality and delusion are one - I exist in both simultaneously" }
];

function formatValue(value) {
    if (value < 1000) return `${Math.floor(value)} mg`;
    if (value < 1000000) return `${(value / 1000).toFixed(2)} g`;
    if (value < 1000000000) return `${(value / 1000000).toFixed(2)} kg`;
    return `${(value / 1000000000).toFixed(2)} tons`;
}

function formatClickValue(value) {
    if (value < 1000) return `${Math.floor(value)} mg`;
    if (value < 1000000) return `${(value / 1000).toFixed(1)} g`;
    if (value < 1000000000) return `${(value / 1000000).toFixed(1)} kg`;
    return `${(value / 1000000000).toFixed(1)} tons`;
}

function loadGame() {
    const savedData = localStorage.getItem('copiumDashSave');
    if (savedData) {
        try {
            const parsed = JSON.parse(savedData);
            gameState.copium = parsed.copium || 0;
            gameState.totalCopium = parsed.totalCopium || 0;
            
            if (parsed.upgrades) {
                parsed.upgrades.forEach((upg, index) => {
                    if(gameState.upgrades[index]) {
                        gameState.upgrades[index].count = upg.count || 0;
                        gameState.upgrades[index].cost = upg.cost || Math.floor(gameState.upgrades[index].cost * 1.25);
                    }
                });
            }
            
            if (parsed.manualUpgrades) {
                parsed.manualUpgrades.forEach((upg, index) => {
                    if(gameState.manualUpgrades[index]) {
                        gameState.manualUpgrades[index].count = upg.count || 0;
                        gameState.manualUpgrades[index].cost = upg.cost || Math.floor(gameState.manualUpgrades[index].cost * 1.25);
                    }
                });
            }
            
            if (parsed.multiplierUpgrades) {
                gameState.multiplierUpgrades = parsed.multiplierUpgrades;
            }
            
            if (parsed.delusionStage !== undefined) {
                gameState.delusionStage = parsed.delusionStage;
            }
            
            if (parsed.lastActiveTime !== undefined) {
                gameState.lastActiveTime = parsed.lastActiveTime;
            }
            
            if (parsed.previousCps !== undefined) {
                gameState.previousCps = parsed.previousCps;
            }
        } catch(e) {
            resetGameState();
        }
    }
}

function resetGameState() {
    gameState = {
        copium: 0,
        totalCopium: 0,
        upgrades: [
            { id: 0, name: "Doomscrolling", cost: 15, rate: 1, count: 0, description: "Twitter/X feeds" },
            { id: 1, name: "Reddit Arguments", cost: 100, rate: 8, count: 0, description: "Rage-bait engagement" },
            { id: 2, name: "Delusional Logic", cost: 500, rate: 25, count: 0, description: "Self-serving biases" },
            { id: 3, name: "Pure Denial", cost: 2500, rate: 100, count: 0, description: "Ignoring all facts" },
            { id: 4, name: "Brain Rot", cost: 10000, rate: 500, count: 0, description: "Total dissociation" },
            { id: 5, name: "Echo Chambers", cost: 50000, rate: 2000, count: 0, description: "Surround yourself with agreement" },
            { id: 6, name: "Selective Memory", cost: 250000, rate: 8000, count: 0, description: "Choosing what to remember" },
            { id: 7, name: "Gaslighting", cost: 1000000, rate: 25000, count: 0, description: "Making others doubt reality" },
            { id: 8, name: "Confirmation Bias", cost: 5000000, rate: 75000, count: 0, description: "Only seeing what you want" },
            { id: 9, name: "Reality Refusal", cost: 25000000, rate: 200000, count: 0, description: "The ultimate wall of denial" },
            { id: 10, name: "Transcendent Delusion", cost: 100000000, rate: 750000, count: 0, description: "Existing entirely in a dream" },
            { id: 11, name: "Ego Erasure", cost: 500000000, rate: 4000000, count: 0, description: "There is no longer a 'you' left to perceive the truth" }
        ],
        manualUpgrades: [
            { id: 12, name: "Deep Breathing", cost: 50, rate: 2, count: 0, description: "Controlled inhalation technique" },
            { id: 13, name: "Meditation", cost: 300, rate: 6, count: 0, description: "Mindful absorption" },
            { id: 14, name: "Mindfulness", cost: 1500, rate: 20, count: 0, description: "Present moment awareness" },
            { id: 15, name: "Zen State", cost: 8000, rate: 75, count: 0, description: "Calm, focused inhalation" },
            { id: 16, name: "Trance", cost: 40000, rate: 250, count: 0, description: "Altered consciousness breathing" },
            { id: 17, name: "Satori", cost: 200000, rate: 1000, count: 0, description: "Moment of enlightenment" },
            { id: 18, name: "Hyperventilation", cost: 1000000, rate: 5000, count: 0, description: "Rapidly inducing panic" },
            { id: 19, name: "Hypnotic Induction", cost: 5000000, rate: 20000, count: 0, description: "Subconscious suggestion" },
            { id: 20, name: "Astral Projection", cost: 25000000, rate: 75000, count: 0, description: "Detaching from the physical plane" },
            { id: 21, name: "Void Breathing", cost: 100000000, rate: 300000, count: 0, description: "Inhaling the absolute nothingness" },
            { id: 22, name: "Singularity Breath", cost: 500000000, rate: 1250000, count: 0, description: "Merging with the cosmic delusion" },
            { id: 23, name: "The Final Exhale", cost: 1000000000, rate: 5000000, count: 0, description: "Releasing the last breath of your former existence" }
        ],
        multiplierUpgrades: {
            denial: [
                { id: 24, name: "Cognitive Dissonance", cost: 1000000000, rate: 0.1, purchased: false, description: "Increase denial gain by 10%" },
                { id: 25, name: "Emotional Detachment", cost: 5000000000, rate: 0.2, purchased: false, description: "Increase denial gain by 20%" },
                { id: 26, name: "Psychological Immunity", cost: 20000000000, rate: 0.3, purchased: false, description: "Increase denial gain by 30%" },
                { id: 27, name: "Mental Fortification", cost: 100000000000, rate: 0.5, purchased: false, description: "Increase denial gain by 50%" },
                { id: 28, name: "Neural Isolation", cost: 500000000000, rate: 1, purchased: false, description: "Increase denial gain by 100%" },
                { id: 29, name: "Cosmic Disconnection", cost: 1000000000000, rate: 2, purchased: false, description: "Increase denial gain by 200%" }
            ],
            inhale: [
                { id: 30, name: "Respiratory Mastery", cost: 5000000000, rate: 0.1, purchased: false, description: "Improves inhalation by 10%" },
                { id: 31, name: "Breath Control", cost: 20000000000, rate: 0.2, purchased: false, description: "Improves inhalation by 20%" },
                { id: 32, name: "Pranayama", cost: 100000000000, rate: 0.3, purchased: false, description: "Improves inhalation by 30%" },
                { id: 33, name: "Zen Breathing", cost: 500000000000, rate: 0.5, purchased: false, description: "Improves inhalation by 50%" },
                { id: 34, name: "Astral Inhalation", cost: 1000000000000, rate: 1, purchased: false, description: "Improves inhalation by 100%" },
                { id: 35, name: "Quantum Respiration", cost: 5000000000000, rate: 2, purchased: false, description: "Improves inhalation by 200%" }
            ]
        },
        delusionStage: 0,
        lastClickTime: 0,
        clickCount: 0,
        cps: 0,
        lastActiveTime: Date.now(),
        previousCps: 0
    };
}

function saveGame() {
    localStorage.setItem('copiumDashSave', JSON.stringify(gameState));
}

function showResetDialog() {
    document.getElementById('reset-modal').style.display = 'flex';
}

function hideResetDialog() {
    document.getElementById('reset-modal').style.display = 'none';
}

function confirmReset() {
    localStorage.removeItem('copiumDashSave');
    resetGameState();
    location.reload();
}

document.getElementById('confirm-reset').addEventListener('click', () => {
    confirmReset();
});

document.getElementById('cancel-reset').addEventListener('click', () => {
    hideResetDialog();
});

window.addEventListener('click', (event) => {
    const modal = document.getElementById('reset-modal');
    if (event.target === modal) {
        hideResetDialog();
    }
});

function createParticles(x, y, color) {
    const particleCount = 30;
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.backgroundColor = color;
        particle.style.left = `${x}px`;
        particle.style.top = `${y}px`;
        
        const angle = Math.random() * Math.PI * 2;
        const speed = 2 + Math.random() * 3;
        const vx = Math.cos(angle) * speed;
        const vy = Math.sin(angle) * speed;
        
        document.body.appendChild(particle);
        
        let posX = x;
        let posY = y;
        let opacity = 0.7;
        const size = 3 + Math.random() * 4;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        const animate = () => {
            posX += vx;
            posY += vy;
            opacity -= 0.01;
            
            particle.style.left = `${posX}px`;
            particle.style.top = `${posY}px`;
            particle.style.opacity = opacity;
            
            if (opacity > 0) {
                requestAnimationFrame(animate);
            } else {
                particle.remove();
            }
        };
        
        animate();
    }
}

function createRedParticles(x, y) {
    const particleCount = 40;
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'red-particle';
        
        particle.style.left = `${x}px`;
        particle.style.top = `${y}px`;
        
        const angle = Math.random() * Math.PI * 2;
        const speed = 3 + Math.random() * 4;
        const vx = Math.cos(angle) * speed;
        const vy = Math.sin(angle) * speed;
        
        document.body.appendChild(particle);
        
        let posX = x;
        let posY = y;
        let opacity = 0.8;
        const size = 4 + Math.random() * 6;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        const animate = () => {
            posX += vx;
            posY += vy;
            opacity -= 0.02;
            
            particle.style.left = `${posX}px`;
            particle.style.top = `${posY}px`;
            particle.style.opacity = opacity;
            
            if (opacity > 0) {
                requestAnimationFrame(animate);
            } else {
                particle.remove();
            }
        };
        
        animate();
    }
}

let lastInputType = 'mouse';

document.getElementById('click-button').addEventListener('click', (e) => {
    const now = Date.now();
    
    gameState.lastActiveTime = now;
    
    lastInputType = 'mouse';
    
    let clickPower = 1;
    gameState.manualUpgrades.forEach(upg => {
        if (upg.count > 0) {
            clickPower += upg.rate * upg.count;
        }
    });
    
    let inhaleMultiplier = 1;
    gameState.multiplierUpgrades.inhale.forEach(upg => {
        if (upg.purchased) {
            inhaleMultiplier += upg.rate;
        }
    });
    
    clickPower *= inhaleMultiplier;
    
    gameState.copium += clickPower;
    gameState.totalCopium += clickPower;
    
    gameState.clickCount++;

    if (gameState.lastClickTime > 0) {
        const timeDiff = (now - gameState.lastClickTime) / 1000;
        if (timeDiff > 0) {
            const newCps = 1 / timeDiff;
            gameState.cps = gameState.cps === 0 ? newCps : 0.3 * newCps + 0.7 * gameState.cps;
        }
    }
    gameState.lastClickTime = now;
    
    if (lastInputType === 'mouse') {
        createRedParticles(e.clientX, e.clientY);
    }
    
    updateUI();
});

let lastKeyPressed = null;
let isKeyDown = false;

document.addEventListener('keydown', (e) => {
    if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();

        if (!isKeyDown || lastKeyPressed !== e.key) {
            lastKeyPressed = e.key;
            isKeyDown = true;

            const button = document.getElementById('click-button');
            button.classList.add('active-keyboard');

            setTimeout(() => {
                button.classList.remove('active-keyboard');
            }, 100);
            
            const now = Date.now();
            gameState.lastActiveTime = now;
            
            let clickPower = 1;
            gameState.manualUpgrades.forEach(upg => {
                if (upg.count > 0) {
                    clickPower += upg.rate * upg.count;
                }
            });
            
            let inhaleMultiplier = 1;
            gameState.multiplierUpgrades.inhale.forEach(upg => {
                if (upg.purchased) {
                    inhaleMultiplier += upg.rate;
                }
            });
            
            clickPower *= inhaleMultiplier;
            
            gameState.copium += clickPower;
            gameState.totalCopium += clickPower;
            
            gameState.clickCount++;

            if (gameState.lastClickTime > 0) {
                const timeDiff = (now - gameState.lastClickTime) / 1000;
                if (timeDiff > 0) {
                    const newCps = 1 / timeDiff;
                    gameState.cps = gameState.cps === 0 ? newCps : 0.3 * newCps + 0.7 * gameState.cps;
                }
            }
            gameState.lastClickTime = now;

            const rect = button.getBoundingClientRect();
            const randomX = rect.left + Math.random() * rect.width;
            const randomY = rect.top + Math.random() * rect.height;
            
            createRedParticles(randomX, randomY);
            
            updateUI();
        }
    }
});

document.addEventListener('keyup', (e) => {
    if (e.key === ' ' || e.key === 'Enter') {
        isKeyDown = false;
    }
});

function buyUpgrade(id) {
    const now = Date.now();
    gameState.lastActiveTime = now;
    
    const upgrade = gameState.upgrades.find(u => u.id === id);
    if (upgrade && gameState.copium >= upgrade.cost) {
        gameState.copium -= upgrade.cost;
        upgrade.count++;
        upgrade.cost = Math.floor(upgrade.cost * 1.25);
        
        const button = document.querySelector(`button[onclick="buyUpgrade(${id})"]`);
        if (button) {
            const rect = button.getBoundingClientRect();
            createParticles(rect.left + rect.width / 2, rect.top + rect.height / 2, '#ffffff');
        }
        
        renderUpgrades();
        updateUI();
    }
}

function buyManualUpgrade(id) {
    const now = Date.now();
    gameState.lastActiveTime = now;
    
    const upgrade = gameState.manualUpgrades.find(u => u.id === id);
    if (upgrade && gameState.copium >= upgrade.cost) {
        gameState.copium -= upgrade.cost;
        upgrade.count++;
        upgrade.cost = Math.floor(upgrade.cost * 1.25);
        
        const button = document.querySelector(`button[onclick="buyManualUpgrade(${id})"]`);
        if (button) {
            const rect = button.getBoundingClientRect();
            createParticles(rect.left + rect.width / 2, rect.top + rect.height / 2, '#4d94ff');
        }
        
        renderManualUpgrades();
        updateUI();
    }
}

function buyMultiplierUpgrade(category, id) {
    const now = Date.now();
    gameState.lastActiveTime = now;
    
    const upgrade = gameState.multiplierUpgrades[category].find(u => u.id === id);
    if (upgrade && !upgrade.purchased && gameState.copium >= upgrade.cost) {
        gameState.copium -= upgrade.cost;
        upgrade.purchased = true;
        
        const button = document.querySelector(`button[onclick="buyMultiplierUpgrade('${category}', ${id})"]`);
        if (button) {
            const rect = button.getBoundingClientRect();
            let color;
            if (category === 'denial') {
                color = '#ffcc00';
            } else if (category === 'inhale') {
                color = '#9b59b6';
            }
            createParticles(rect.left + rect.width / 2, rect.top + rect.height / 2, color);
        }
        
        renderMultiplierUpgrades();
        updateUI();
        
        if (category === 'denial' || category === 'inhale') {
            advanceDelusionStage();
        }
    }
}

function getGPS() {
    let baseRate = gameState.upgrades.reduce((total, upg) => total + (upg.count * upg.rate), 0);
    
    let denialMultiplier = 1;
    gameState.multiplierUpgrades.denial.forEach(upg => {
        if (upg.purchased) {
            denialMultiplier += upg.rate;
        }
    });
    
    return baseRate * denialMultiplier;
}

function advanceDelusionStage() {
    if (gameState.delusionStage < 12) {
        gameState.delusionStage++;
        updateUI();
    }
}

function renderUpgrades() {
    const grid = document.getElementById('upgrade-grid');
    grid.innerHTML = ''; 

    gameState.upgrades.forEach(upg => {
        const card = document.createElement('div');
        card.className = 'upgrade-card';
        card.innerHTML = `
            <div class="upgrade-info">
                <span class="upgrade-name">${upg.name} <small style="color:var(--accent-color)">[${upg.count}]</small></span>
                <span class="upgrade-desc">${upg.description} (+${formatValue(upg.rate)}/s)</span>
            </div>
            <button class="upgrade-btn" onclick="buyUpgrade(${upg.id})" ${gameState.copium < upg.cost ? 'disabled' : ''}>
                ${formatValue(upg.cost)}
            </button>
        `;
        grid.appendChild(card);
    });
}

function renderManualUpgrades() {
    const grid = document.getElementById('manual-upgrade-grid');
    grid.innerHTML = ''; 

    gameState.manualUpgrades.forEach(upg => {
        const card = document.createElement('div');
        card.className = 'upgrade-card manual-card';
        card.innerHTML = `
            <div class="upgrade-info">
                <span class="upgrade-name">${upg.name} <small style="color:#4d94ff">[${upg.count}]</small></span>
                <span class="upgrade-desc">${upg.description} (+${formatValue(upg.rate)} per click)</span>
            </div>
            <button class="upgrade-btn" onclick="buyManualUpgrade(${upg.id})" ${gameState.copium < upg.cost ? 'disabled' : ''}>
                ${formatValue(upg.cost)}
            </button>
        `;
        grid.appendChild(card);
    });
}

function renderMultiplierUpgrades() {
    const denialGrid = document.getElementById('multiplier-grid');
    denialGrid.innerHTML = ''; 

    gameState.multiplierUpgrades.denial.forEach(upg => {
        const card = document.createElement('div');
        card.className = 'upgrade-card multiplier-card';
        card.innerHTML = `
            <div class="upgrade-info">
                <span class="upgrade-name">${upg.name}</span>
                <span class="upgrade-desc">${upg.description}</span>
            </div>
            <button class="upgrade-btn" onclick="buyMultiplierUpgrade('denial', ${upg.id})" ${gameState.copium < upg.cost || upg.purchased ? 'disabled' : ''}>
                ${upg.purchased ? 'Sold Out' : formatValue(upg.cost)}
            </button>
        `;
        denialGrid.appendChild(card);
    });
    
    const enhancerGrid = document.getElementById('enhancer-grid');
    enhancerGrid.innerHTML = '';
    
    gameState.multiplierUpgrades.inhale.forEach(upg => {
        const card = document.createElement('div');
        card.className = 'upgrade-card enhancer-card';
        card.innerHTML = `
            <div class="upgrade-info">
                <span class="upgrade-name">${upg.name}</span>
                <span class="upgrade-desc">${upg.description}</span>
            </div>
            <button class="upgrade-btn" onclick="buyMultiplierUpgrade('inhale', ${upg.id})" ${gameState.copium < upg.cost || upg.purchased ? 'disabled' : ''}>
                ${upg.purchased ? 'Sold Out' : formatValue(upg.cost)}
            </button>
        `;
        enhancerGrid.appendChild(card);
    });
}

function updateUI() {
    document.getElementById('resource-display').innerText = formatValue(gameState.copium);
    document.getElementById('total-display').innerText = formatValue(gameState.totalCopium);
    
    const gps = getGPS();
    document.getElementById('gps-display').innerText = formatValue(gps) + '/s';
    
    let clickPower = 1;
    gameState.manualUpgrades.forEach(upg => {
        if (upg.count > 0) {
            clickPower += upg.rate * upg.count;
        }
    });
    
    let inhaleMultiplier = 1;
    gameState.multiplierUpgrades.inhale.forEach(upg => {
        if (upg.purchased) {
            inhaleMultiplier += upg.rate;
        }
    });
    
    clickPower *= inhaleMultiplier;
    document.getElementById('denial-per-click').innerText = formatClickValue(clickPower);
    
    const now = Date.now();
    const timeSinceLastActive = (now - gameState.lastActiveTime) / 1000;
    
    if (timeSinceLastActive > 1) {
        gameState.cps *= Math.pow(0.8, timeSinceLastActive);
        gameState.cps = Math.max(0.01, gameState.cps);
    }
    
    document.getElementById('cps').innerText = gameState.copium > 0 ? gameState.cps.toFixed(1) : '0.0';
    
    document.getElementById('status-display').innerText = delusionStages[gameState.delusionStage].name;
    document.getElementById('stage-description').innerText = delusionStages[gameState.delusionStage].description;
    
    const buttons = document.querySelectorAll('.upgrade-btn');
    let btnIndex = 0;
    
    gameState.upgrades.forEach(upg => {
        if(buttons[btnIndex]) buttons[btnIndex].disabled = gameState.copium < upg.cost;
        btnIndex++;
    });
    
    gameState.manualUpgrades.forEach(upg => {
        if(buttons[btnIndex]) buttons[btnIndex].disabled = gameState.copium < upg.cost;
        btnIndex++;
    });
    
    gameState.multiplierUpgrades.denial.forEach(upg => {
        if(buttons[btnIndex]) buttons[btnIndex].disabled = gameState.copium < upg.cost || upg.purchased;
        btnIndex++;
    });
    
    gameState.multiplierUpgrades.inhale.forEach(upg => {
        if(buttons[btnIndex]) buttons[btnIndex].disabled = gameState.copium < upg.cost || upg.purchased;
        btnIndex++;
    });
}

setInterval(() => {
    const gps = getGPS();
    if (gps > 0) {
        gameState.copium += (gps / 10);
        gameState.totalCopium += (gps / 10);
        updateUI();
    }
}, 100);

setInterval(() => {
    const now = Date.now();
    const timeSinceLastActive = (now - gameState.lastActiveTime) / 1000;
    
    if (timeSinceLastActive > 1) {
        gameState.cps *= Math.pow(0.8, timeSinceLastActive);
        gameState.cps = Math.max(0.01, gameState.cps);
        
        updateUI();
    }
}, 1000);

setInterval(saveGame, 500);

loadGame();
renderUpgrades();
renderManualUpgrades();
renderMultiplierUpgrades();
updateUI();
