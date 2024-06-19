console.log('startMenu.js working');

import { setFocus } from "./setFocus.js";

function powerBtnFn() {
    const screen = document.getElementById('screen');
    const startMenu = document.getElementById('startMenu');
    const powerBtn = document.getElementById('powerBtn');
    const powerPopUpMenu = document.getElementById('powerPopUpMenu');
    const shutDownBtn = document.getElementById('shutDownBtn');
    const restartBtn = document.getElementById('restartBtn');

    shutDownBtn.addEventListener('click', () => {
        window.close();
    });

    restartBtn.addEventListener('click', () => {
        location.reload();
    });

    screen.addEventListener('mousedown', (event) => {
        const pattyDOSTaskbarApp = document.getElementById('pattyDOSTaskbarApp');
        if(event.target == pattyDOSTaskbarApp || event.target == document.getElementById('powerBtnImg') || event.target.closest('#startMenu') != null) {
            return;
        } else {
            setFocus(event, 'startMenu', 'temp', startMenu, 'visible')
        }
    });

    screen.addEventListener('click', (event) => { 
        if(powerPopUpMenu.classList.contains('active')) {
            powerPopUpMenu.classList.remove('active')
        } else {
            setFocus(event, '#powerBtn', 'temp', powerPopUpMenu, 'active') 
        }
    });
}
powerBtnFn();