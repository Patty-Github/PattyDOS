console.log('taskbar.js working');

const taskbar = document.getElementById('taskbar');
let isStartMenuVisible = false;
const pattyDOSBtn = document.getElementById('pattyDOSTaskbarApp');
const settingsTaskbarApp = document.getElementById('settingsTaskbarApp');
const startMenu = document.getElementById('startMenu');

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

screen.addEventListener('click', (event) => {
    if(event.target instanceof Element) {
        const target = event.target;
        const isStartMenu = target.closest('#startMenu');
        if(target != pattyDOSBtn && isStartMenu == null) {
            startMenu.classList.remove('visible');
            isStartMenuVisible = false;
        }   
    }
})

screen.addEventListener('click', (event) => {
    if(event.target instanceof Element) {
        const target = event.target;
        const isSettingsApp = target.closest('#settingsApp')
        if(isSettingsApp != null) {
            settingsTaskbarApp.classList.add('windowFocused')
        } else {
            if(settingsTaskbarApp.classList.contains('windowFocused')) {
                settingsTaskbarApp.classList.remove('windowFocused')
            }
        }
    }
})