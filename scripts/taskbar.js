console.log('taskbar.js working');

const taskbar = document.getElementById('taskbar');
let isStartMenuVisible = false;
const pattyDOSBtn = document.getElementById('pattyDOSTaskbarApp');
const settingsTaskbarApp = document.getElementById('settingsTaskbarApp');
const appStoreTaskbarApp = document.getElementById('appStoreTaskbarApp');
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

function setFocus(event, appId, taskbarId, taskbarApp) {
    if(event.target instanceof Element) {
        const target = event.target;
        const isApp = target.closest(appId)
        const isTaskbarApp = target.closest(taskbarId)
        if(isApp != null || isTaskbarApp != null) {
            taskbarApp.classList.add('windowFocused')
        } else {
            if(taskbarApp.classList.contains('windowFocused')) {
                taskbarApp.classList.remove('windowFocused')
            }
        }
    }
}

screen.addEventListener('click', (event) => { 
    setFocus(event, '#settingsApp', '#settingsTaskbarApp', settingsTaskbarApp);
    setFocus(event, 'temp', '#appStoreTaskbarApp', appStoreTaskbarApp);
})
