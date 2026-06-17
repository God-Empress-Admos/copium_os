function encodeSaveData(data) {
    const jsonString = JSON.stringify(data);

    let xorEncrypted = '';
    const key = 0x7B;
    
    for (let i = 0; i < jsonString.length; i++) {
        xorEncrypted += String.fromCharCode(jsonString.charCodeAt(i) ^ key);
    }

    return btoa(unescape(encodeURIComponent(xorEncrypted)));
}

function decodeSaveData(encodedData) {
    try {
        const decodedString = decodeURIComponent(escape(atob(encodedData)));

        let xorDecrypted = '';
        const key = 0x7B;
        
        for (let i = 0; i < decodedString.length; i++) {
            xorDecrypted += String.fromCharCode(decodedString.charCodeAt(i) ^ key);
        }
        
        return JSON.parse(xorDecrypted);
    } catch (e) {
        console.error('Error decoding save data:', e);
        return null;
    }
}

function exportSave() {
    const encodedSave = encodeSaveData(gameState);

    const element = document.createElement('a');
    const file = new Blob([encodedSave], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = 'copium_os_save.txt';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}

function importSave() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.txt';
    
    input.onchange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        
        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                const decodedData = decodeSaveData(event.target.result);
                
                if (decodedData) {
                    gameState.copium = decodedData.copium || 0;
                    gameState.totalCopium = decodedData.totalCopium || 0;
                    
                    if (decodedData.upgrades) {
                        decodedData.upgrades.forEach((upg, index) => {
                            if(gameState.upgrades[index]) {
                                gameState.upgrades[index].count = upg.count || 0;
                                gameState.upgrades[index].cost = upg.cost || Math.floor(gameState.upgrades[index].cost * 1.25);
                            }
                        });
                    }
                    
                    if (decodedData.manualUpgrades) {
                        decodedData.manualUpgrades.forEach((upg, index) => {
                            if(gameState.manualUpgrades[index]) {
                                gameState.manualUpgrades[index].count = upg.count || 0;
                                gameState.manualUpgrades[index].cost = upg.cost || Math.floor(gameState.manualUpgrades[index].cost * 1.25);
                            }
                        });
                    }
                    
                    if (decodedData.multiplierUpgrades) {
                        gameState.multiplierUpgrades = decodedData.multiplierUpgrades;
                    }
                    
                    if (decodedData.delusionStage !== undefined) {
                        gameState.delusionStage = decodedData.delusionStage;
                    }
                    
                    if (decodedData.lastActiveTime !== undefined) {
                        gameState.lastActiveTime = decodedData.lastActiveTime;
                    }
                    
                    if (decodedData.previousCps !== undefined) {
                        gameState.previousCps = decodedData.previousCps;
                    }

                    updateUI();
                    renderUpgrades();
                    renderManualUpgrades();
                    renderMultiplierUpgrades();
                    
                    showNotification('Savefile imported successfully!', 'success');
                } else {
                    showNotification('Invalid save file format', 'error');
                }
            } catch (e) {
                console.error('Error importing save:', e);
                showNotification('Failed to import save file. Please make sure you are using a valid save file.', 'error');
            }
        };
        reader.readAsText(file);
    };
    
    input.click();
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
    
    showNotification('All memories have been purged. Starting fresh...', 'success');
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
