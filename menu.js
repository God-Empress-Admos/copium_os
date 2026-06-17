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

function showNotification(message, type = 'info') {
    let notification = document.getElementById('notification');
    
    if (!notification) {
        notification = document.createElement('div');
        notification.id = 'notification';
        notification.className = 'notification';
        
        const notificationHeader = document.createElement('div');
        notificationHeader.className = 'notification-header';
        
        const notificationTitle = document.createElement('span');
        notificationTitle.id = 'notification-title';
        notificationTitle.className = 'notification-title';
        
        const closeBtn = document.createElement('button');
        closeBtn.innerHTML = '&times;';
        closeBtn.className = 'close-btn';
        
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
        notificationContent.className = 'notification-content';
        
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

window.addEventListener('load', addMenuButton);