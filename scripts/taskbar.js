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

window.addEventListener('click', (event) => {
    const target = event.target
    if(target != pattyDOSBtn) {
        startMenu.classList.remove('visible');
        isStartMenuVisible = false;
    }
})

document.addEventListener('click', (event) => {
    const target = event.target;
    if(target.classList.contains('isSettingsApp')) {
        settingsTaskbarApp.classList.add('windowFocused')
    } else {
        if(settingsTaskbarApp.classList.contains('windowFocused')) {
            settingsTaskbarApp.classList.remove('windowFocused')
        }
    }
})