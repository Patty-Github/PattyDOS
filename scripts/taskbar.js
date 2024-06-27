console.log('taskbar.js working');

import {setFocus} from './setFocus.js';

const pattyDOSBtn = document.getElementById('pattyDOSTaskbarApp');
const settingsTaskbarApp = document.getElementById('settingsTaskbarApp');
const appStoreTaskbarApp = document.getElementById('appStoreTaskbarApp');

pattyDOSBtn.addEventListener('click', showStartMenu);

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

    screen.addEventListener('click', (event) => { 
        setFocus(event, '#settingsApp', '#settingsTaskbarApp', settingsTaskbarApp, 'windowFocused');
        setFocus(event, 'temp', '#appStoreTaskbarApp', appStoreTaskbarApp, 'windowFocused');
    })
})();