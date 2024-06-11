console.log('startMenu.js working');

import { setFocus } from "./setFocus.js";

const startMenu = document.getElementById('startMenu');

function powerBtnFn() {
    const powerBtn = document.getElementById('powerBtn');
    const powerPopUpMenu = document.getElementById('powerPopUpMenu');
    const shutDownBtn = document.getElementById('shutDownBtn');
    const restartBtn = document.getElementById('restartBtn');

    shutDownBtn.addEventListener('click', () => {
        window.close();
    })

    restartBtn.addEventListener('click', () => {
        location.reload();
    })

    screen.addEventListener('click', (event) => { 
        if(powerPopUpMenu.classList.contains('active')) {
            powerPopUpMenu.classList.remove('active')
        } else {
        setFocus(event, '#powerBtn', 'temp', powerPopUpMenu, 'active') 
        }
    })
}
powerBtnFn();