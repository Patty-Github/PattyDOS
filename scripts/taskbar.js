console.log('taskbar.js working');

import { setFocus } from './setFocus.js';

(() => {
    const pattyDOSBtn = document.getElementById('pattyDOSTaskbarApp');

    pattyDOSBtn.addEventListener('click', showStartMenu);
})();

// Taskbar Context Menu

function showStartMenu() {
    const startMenu = document.getElementById('startMenu');
    if(!startMenu.classList.contains('visible')) {
        startMenu.classList.add('visible');
    } else if(startMenu.classList.contains('visible')) {
        startMenu.classList.remove('visible');
    }
}

(() => {
    const screen = document.getElementById('screen');
    const taskbarAppsDiv = document.getElementById('taskbarApps');
    const contextMenu = document.createElement('div');
    contextMenu.setAttribute('class', 'taskbarAppContextMenu');

        screen.addEventListener('contextmenu', (event) => {
            event.preventDefault();
            const taskbarApp = document.getElementById(event.target.getAttribute('id'))

            if(event.target.classList.contains('taskbarApp')) {
                if(event.target.getAttribute('id') == 'pattyDOSTaskbarApp') {
                    contextMenu.innerHTML = '';
                    // context menu for pdos logo
                } else {
                    contextMenu.innerHTML = '';
                    let appName = taskbarApp.getAttribute('id').slice(0, taskbarApp.getAttribute('id').indexOf('Taskbar'));
                    appName = appName.charAt(0).toUpperCase() + appName.slice(1);
                    
                    const contextMenuUnpin = document.createElement('p')
                    contextMenuUnpin.setAttribute('class', 'taskbarAppContextMenuOption');
                    contextMenuUnpin.textContent = 'Unpin From Taskbar';
                    contextMenuUnpin.addEventListener('click', () => unpinApp())
        
                    contextMenu.appendChild(contextMenuUnpin);

                    const contextMenuClose = document.createElement('p')
                    if(getComputedStyle(taskbarApp.childNodes[1]).display == 'block') {
                        contextMenuClose.textContent = `Close ${appName}`;
                        contextMenuClose.setAttribute('class', `taskbarAppContextMenuOption ${taskbarApp.getAttribute('id')}Closer`);
                    } else {
                        contextMenuClose.textContent = `Open ${appName}`;
                        contextMenuClose.setAttribute('class', `taskbarAppContextMenuOption ${taskbarApp.getAttribute('id')}Opener`);
                    }

                    contextMenu.appendChild(contextMenuClose);
        
                    screen.appendChild(contextMenu);
                    const contextMenuHeight = parseFloat(getComputedStyle(contextMenu).height);
    
                    contextMenu.style.top = taskbarApp.getBoundingClientRect().top - contextMenuHeight - 10 + 'px';
                    contextMenu.style.left = taskbarApp.getBoundingClientRect().left + (parseFloat(getComputedStyle(taskbarApp).width) / 2) - (parseFloat(getComputedStyle(contextMenu).width) / 2) - screen.getBoundingClientRect().left + 'px';
        
                    function unpinApp() {
                        getComputedStyle(taskbarApp).display != 'none' ? taskbarApp.style.display = 'none' : taskbarApp.style.display = 'flex';
                        taskbarAppsDiv.style.transition =  'all 0.75s ease';
                        taskbarAppsDiv.style.left = `calc(50% - ${(parseFloat(getComputedStyle(taskbarAppsDiv).width) / 2) + 'px'})`
                    }
                }
            } else {
                contextMenu.textContent = '';
            }
        })
        document.addEventListener('click', () => contextMenu.innerHTML = '');
})();

(() => {
    const screen = document.getElementById('screen');
    const settingsTaskbarApp = document.getElementById('settingsTaskbarApp');
    const appStoreTaskbarApp = document.getElementById('appStoreTaskbarApp');

    screen.addEventListener('click', (event) => { 
        setFocus(event, '#settingsApp', '#settingsTaskbarApp', settingsTaskbarApp, 'windowFocused');
        setFocus(event, 'temp', '#appStoreTaskbarApp', appStoreTaskbarApp, 'windowFocused');
    })
})();