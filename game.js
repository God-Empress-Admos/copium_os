let gameState = {
    copium: 0,
    totalCopium: 0,
    upgrades: UPGRADES.copium,
    manualUpgrades: UPGRADES.manual,
    multiplierUpgrades: UPGRADES.multiplier,
    delusionStage: 0,
    lastClickTime: 0,
    clickCount: 0,
    cps: 0,
    lastActiveTime: Date.now(),
    previousCps: 0
};

const delusionStages = DELUSION_STAGES;

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
        upgrades: UPGRADES.copium,
        manualUpgrades: UPGRADES.manual,
        multiplierUpgrades: UPGRADES.multiplier,
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
