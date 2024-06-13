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
    const pages = document.querySelectorAll('.settingsPage'); 
    console.log(menuItems)
    console.log(pages)

    menuItems.forEach((menuItem, menuIndex) => {
        menuItem.addEventListener('click', () => {
            menuItems.forEach((menuItemTwo) => {
                menuItemTwo.classList.remove('active');
            })
            menuItem.classList.add('active');

            pages.forEach((page, pageIndex) => {
                if (menuIndex == pageIndex) {
                    console.log(menuIndex + pageIndex)
                    page.style.display = 'block';
                } else {
                    page.style.display = 'none';
                }
            })    
        })
    })
}
setSettingsPage();

function changeSystemColor() {
    const inputSystemColor = document.getElementById('inputSystemColor');
    const taskbar = document.getElementById('taskbar')
    const startMenu = document.getElementById('startMenu')
    const elementsToChange = [taskbar, startMenu];
    console.log(elementsToChange);
    inputSystemColor.addEventListener('input', (event) => {
        elementsToChange.forEach((elementToChange) => {
            let newColor = event.target.value;
            elementToChange.style.backgroundColor = event.target.value;
            newColor = elementToChange.style.backgroundColor;
            newColor = String(newColor).slice(-0, -2);
            newColor += ', 0.5)';
            elementToChange.style.backgroundColor = newColor;

            console.log(newColor);
        })
    })
}
changeSystemColor();

            /*if(menuItem.classList.contains('active')) {
                pages[i].style.display = 'block';
            } else if (!menuItem.classList.contains('active')) {
                pages[i].style.display = 'none';
            }*/

// have home be active by default.
// sideMenuBtn.onclick { sideMenuBtns.foreach classlist.remove('active'); if sideMenuBtn doesn't have active class { .classlist.add('active') } }
