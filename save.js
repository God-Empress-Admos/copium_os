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

function showMenu() {
    const menuDropdown = document.getElementById('menu-dropdown');
    if (menuDropdown.style.display === 'block') {
        menuDropdown.style.display = 'none';
    } else {
        document.querySelectorAll('.dropdown').forEach(dropdown => {
            if (dropdown !== menuDropdown) {
                dropdown.style.display = 'none';
            }
        });
        menuDropdown.style.display = 'block';
    }
}

function addMenuButton() {
    const header = document.querySelector('header');

    const existingButton = document.getElementById('menu-button');
    if (existingButton) {
        existingButton.remove();
    }
    
    const menuButton = document.createElement('button');
    menuButton.id = 'menu-button';
    menuButton.innerHTML = '⚙';
    menuButton.style.cssText = `
        background: none;
        border: 1px solid var(--border-color);
        color: var(--text-main);
        padding: 0.5rem 0.8rem;
        font-size: 1.2rem;
        cursor: pointer;
        border-radius: 4px;
        margin-left: 1rem;
        position: relative;
        z-index: 20;
        font-family: 'Courier New', Courier, monospace;
        align-self: center;
        height: fit-content;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 0;
        margin-bottom: 0;
        flex-shrink: 0;
        transition: all 0.2s ease;
    `;
    
    menuButton.addEventListener('mouseenter', function() {
        this.style.borderColor = '#ff4d4d';
        this.style.color = '#ff4d4d';
    });
    
    menuButton.addEventListener('mouseleave', function() {
        this.style.borderColor = 'var(--border-color)';
        this.style.color = 'var(--text-main)';
    });
    
    menuButton.addEventListener('mousedown', function() {
        this.style.transform = 'scale(0.95)';
    });
    
    menuButton.addEventListener('mouseup', function() {
        this.style.transform = 'scale(1)';
    });
    
    const menuDropdown = document.createElement('div');
    menuDropdown.id = 'menu-dropdown';
    menuDropdown.className = 'dropdown';
    menuDropdown.style.cssText = `
        position: absolute;
        top: calc(100% + 0.5rem);
        right: 0;
        background-color: var(--panel-color);
        border: 1px solid var(--border-color);
        border-radius: 4px;
        padding: 0.5rem 0;
        min-width: fit-content;
        display: none;
        z-index: 20;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
        width: max-content;
    `;
    
    const exportOption = document.createElement('button');
    exportOption.textContent = 'Export Savefile';
    exportOption.style.cssText = `
        width: 100%;
        padding: 0.5rem 1rem;
        background: none;
        border: none;
        color: var(--text-main);
        text-align: left;
        cursor: pointer;
        transition: all 0.2s;
        font-family: 'Courier New', Courier, monospace;
        text-align: center;
    `;
    exportOption.addEventListener('click', () => {
        exportSave();
        menuDropdown.style.display = 'none';
    });
    
    const importOption = document.createElement('button');
    importOption.textContent = 'Import Savefile';
    importOption.style.cssText = `
        width: 100%;
        padding: 0.5rem 1rem;
        background: none;
        border: none;
        color: var(--text-main);
        text-align: left;
        cursor: pointer;
        transition: all 0.2s;
        font-family: 'Courier New', Courier, monospace;
        text-align: center;
    `;
    importOption.addEventListener('click', () => {
        importSave();
        menuDropdown.style.display = 'none';
    });
    
    const resetOption = document.createElement('button');
    resetOption.textContent = 'Purge All Memories';
    resetOption.style.cssText = `
        width: 100%;
        padding: 0.5rem 1rem;
        background: none;
        border: none;
        color: #ff4d4d;
        text-align: left;
        cursor: pointer;
        transition: all 0.2s;
        font-family: 'Courier New', Courier, monospace;
        text-align: center;
    `;
    resetOption.addEventListener('click', () => {
        showResetDialog();
        menuDropdown.style.display = 'none';
    });
    
    const dropdownButtons = [exportOption, importOption, resetOption];
    dropdownButtons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.backgroundColor = 'rgba(255, 77, 77, 0.1)';
            this.style.transform = 'translateX(5px)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.backgroundColor = 'transparent';
            this.style.transform = 'translateX(0)';
        });
    });
    
    menuDropdown.appendChild(exportOption);
    menuDropdown.appendChild(importOption);
    menuDropdown.appendChild(resetOption);
    
    menuButton.addEventListener('click', (e) => {
        e.stopPropagation();
        showMenu();
    });
    
    const globalStats = document.querySelector('.global-stats');
    if (globalStats) {
        globalStats.parentNode.insertBefore(menuButton, globalStats.nextSibling);
    } else {
        header.appendChild(menuButton);
    }
    
    header.appendChild(menuDropdown);

    document.addEventListener('click', (e) => {
        if (!header.contains(e.target)) {
            menuDropdown.style.display = 'none';
        }
    });
}

function showNotification(message, type = 'info') {
    let notification = document.getElementById('notification');
    
    if (!notification) {
        notification = document.createElement('div');
        notification.id = 'notification';
        notification.className = 'notification';
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background-color: var(--panel-color);
            border: 2px solid var(--accent-color);
            border-radius: 10px;
            padding: 1.5rem;
            width: 300px;
            z-index: 2000;
            display: none;
            font-family: 'Courier New', Courier, monospace;
        `;
        
        const notificationHeader = document.createElement('div');
        notificationHeader.className = 'notification-header';
        notificationHeader.style.cssText = `
            color: var(--accent-color);
            font-size: 1.2rem;
            margin-bottom: 0.5rem;
            text-transform: uppercase;
            letter-spacing: 1px;
            display: flex;
            justify-content: space-between;
            align-items: center;
        `;
        
        const notificationTitle = document.createElement('span');
        notificationTitle.id = 'notification-title';
        
        const closeBtn = document.createElement('button');
        closeBtn.innerHTML = '&times;';
        closeBtn.style.cssText = `
            background: none;
            border: none;
            color: var(--text-main);
            font-size: 1.5rem;
            cursor: pointer;
            width: 30px;
            height: 30px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            transition: all 0.2s;
        `;
        
        closeBtn.addEventListener('mouseenter', function() {
            this.style.backgroundColor = 'rgba(255, 77, 77, 0.1)';
        });
        
        closeBtn.addEventListener('mouseleave', function() {
            this.style.backgroundColor = 'transparent';
        });
        
        closeBtn.addEventListener('click', () => {
            notification.style.display = 'none';
        });
        
        notificationHeader.appendChild(notificationTitle);
        notificationHeader.appendChild(closeBtn);
        
        const notificationContent = document.createElement('div');
        notificationContent.id = 'notification-content';
        notificationContent.style.cssText = `
            color: var(--text-main);
            line-height: 1.5;
        `;
        
        notification.appendChild(notificationHeader);
        notification.appendChild(notificationContent);
        
        document.body.appendChild(notification);
    }
    
    document.getElementById('notification-title').textContent = 
        type === 'success' ? 'Success' : 
        type === 'error' ? 'Error' : 'Notification';
    
    document.getElementById('notification-content').textContent = message;
    
    if (type === 'success') {
        notification.style.borderColor = '#4CAF50';
        document.getElementById('notification-title').style.color = '#4CAF50';
    } else if (type === 'error') {
        notification.style.borderColor = '#f44336';
        document.getElementById('notification-title').style.color = '#f44336';
    } else {
        notification.style.borderColor = 'var(--accent-color)';
        document.getElementById('notification-title').style.color = 'var(--accent-color)';
    }
    
    notification.style.display = 'block';
    
    setTimeout(() => {
        notification.style.display = 'none';
    }, 5000);
}

function confirmReset() {
    localStorage.removeItem('copiumDashSave');
    resetGameState();
    location.reload();
    
    showNotification('All memories have been purged. Starting fresh...', 'success');
}

window.addEventListener('load', addMenuButton);
