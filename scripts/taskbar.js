console.log('taskbar.js working');

import {setFocus} from './setFocus.js';

const taskbar = document.getElementById('taskbar');
let isStartMenuVisible = false;
const pattyDOSBtn = document.getElementById('pattyDOSTaskbarApp');
const settingsTaskbarApp = document.getElementById('settingsTaskbarApp');
const appStoreTaskbarApp = document.getElementById('appStoreTaskbarApp');

pattyDOSBtn.addEventListener('click', showStartMenu);

function showStartMenu() {
    if(isStartMenuVisible == false) {
        startMenu.classList.add('visible');
        isStartMenuVisible = true;
    } else if(isStartMenuVisible) {
        startMenu.classList.remove('visible');
        isStartMenuVisible = false;
    }
}

(() => {
    const screen = document.getElementById('screen');

    screen.addEventListener('click', (event) => { 
        setFocus(event, '#settingsApp', '#settingsTaskbarApp', settingsTaskbarApp, 'windowFocused');
        setFocus(event, 'temp', '#appStoreTaskbarApp', appStoreTaskbarApp, 'windowFocused');
    })
})();