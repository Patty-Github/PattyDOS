console.log('settings.js working');

import {moveableWindow} from "../../scripts/dragWindow.js";

const screen = document.getElementById('screen');
const settingsWindow = document.getElementById('settingsApp');
const settingsFrame = document.getElementById('settingsFrame');

moveableWindow(settingsWindow, settingsFrame);

let settingsResized = false;
let settingsWindowWidth;
let settingsWindowHeight;
const resizer = new ResizeObserver(() => {
    if(settingsResized == false) {
        settingsWindow.style.margin = 'auto'
        settingsResized = true;
        settingsWindowWidth = parseFloat(getComputedStyle(settingsWindow).width);
        settingsWindowHeight = parseFloat(getComputedStyle(settingsWindow).height);
    }
    const marginLeft = getComputedStyle(settingsWindow).marginLeft;
    const marginRight = getComputedStyle(settingsWindow).marginRight;
    settingsWindow.style.marginLeft = marginLeft;
    settingsWindow.style.marginRight = marginRight;

    settingsWindowWidth = parseFloat(getComputedStyle(settingsWindow).width);
    settingsWindowHeight = parseFloat(getComputedStyle(settingsWindow).height);
}).observe(settingsWindow);

settingsWindow.style.margin = 'auto'

function setSettingsPage() {
    const menuItems = document.querySelectorAll('.sideMenuItem');

    menuItems.forEach((menuItem) => {
        menuItem.addEventListener('click', () => {
            menuItems.forEach((menuItemTwo) => {
                if(menuItemTwo.classList.contains('active')) {
                    menuItemTwo.classList.remove('active');
                }
            })
            menuItem.classList.add('active');
        })
    })
}
setSettingsPage();

// have home be active by default.
// sideMenuBtn.onclick { sideMenuBtns.foreach classlist.remove('active'); if sideMenuBtn doesn't have active class { .classlist.add('active') } }
