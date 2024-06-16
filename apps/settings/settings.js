console.log('settings.js working');

import { moveableWindow } from "../../scripts/dragWindow.js";
import { minimizeWindow } from "../../scripts/minimizeWindow.js";
import { positionWindow } from "../../scripts/positionWindow.js";

const screen = document.getElementById('screen');
const settingsWindow = document.getElementById('settingsApp');
const settingsFrame = document.getElementById('settingsFrame');
const minimizeSettingsBtn = document.getElementById('minimizeSettings');

//positionWindow(settingsWindow);
moveableWindow(settingsWindow, settingsFrame);
minimizeSettingsBtn.addEventListener('click', () => minimizeWindow(settingsWindow, minimizeSettingsBtn));

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

    menuItems.forEach((menuItem, menuIndex) => {
        menuItem.addEventListener('click', () => {
            menuItems.forEach((menuItemTwo) => {
                menuItemTwo.classList.remove('active');
            })
            menuItem.classList.add('active');

            pages.forEach((page, pageIndex) => {
                if (menuIndex == pageIndex) {
                    page.style.display = 'block';
                } else {
                    page.style.display = 'none';
                }
            })    
        })
    })
}
setSettingsPage();

function systemColor() {
    const inputSystemColor = document.getElementById('inputSystemColor');
    const systemColorOptions = document.querySelectorAll('.systemColorOption');
    const taskbar = document.getElementById('taskbar')
    const startMenu = document.getElementById('startMenu')
    const elementsToChange = [taskbar, startMenu];

    function changeSystemColor(event) {
        elementsToChange.forEach((elementToChange) => {
            let newColor = event.target.value;
            if(newColor == undefined) {
                newColor = getComputedStyle(event.target).backgroundColor;
            }
            elementToChange.style.backgroundColor = newColor;
            newColor = elementToChange.style.backgroundColor;
            newColor = String(newColor).slice(-0, -1);
            newColor += ', 0.5)';
            elementToChange.style.backgroundColor = newColor;
        })
    }

    inputSystemColor.addEventListener('input', (event) => {changeSystemColor(event)})

    systemColorOptions.forEach((systemColorOption) => {
        systemColorOption.addEventListener('click', (event) => {
            const colorRGB = getComputedStyle(systemColorOption).backgroundColor;
            const colorR = colorRGB.slice(colorRGB.indexOf('(') + 1, colorRGB.indexOf(','));
            const colorG = colorRGB.slice(colorRGB.indexOf(',') + 2, colorRGB.indexOf(',', colorRGB.indexOf(',') + 1))
            const colorB = colorRGB.slice(colorRGB.indexOf(',', colorRGB.indexOf(',') + 1) + 2, colorRGB.indexOf(')'))
            // pasted from stackoverflow
            function rgbToHex(r, g, b) {
                return "#" + (1 << 24 | r << 16 | g << 8 | b).toString(16).slice(1);
            }
            const colorHEX = rgbToHex(colorR, colorG, colorB);

            inputSystemColor.value = colorHEX;

            changeSystemColor(event);
        })
    })
}
systemColor();

(() => {
    const settingsIcon = document.getElementById('settingsIcon');
    const settingsApp = document.getElementById('settingsApp');
    const settingsTaskbarApp = document.getElementById('settingsTaskbarApp');
    const settingsAppState = document.getElementById('settingsAppState');
    settingsIcon.addEventListener('dblclick', () => openWindow(settingsApp, settingsTaskbarApp, settingsAppState))
    settingsTaskbarApp.addEventListener('click', () => openWindow(settingsApp, settingsTaskbarApp, settingsAppState))

    let windowWidth;
    let windowHeight;
    let windowY;
    let windowX;
    minimizeSettingsBtn.addEventListener('click', (settingsWindow) => getElementPositionAndScale(settingsWindow));
    function getElementPositionAndScale(element) {
        windowWidth = getComputedStyle(element).width;
        windowHeight = getComputedStyle(element).height;
        windowY = parseFloat(getComputedStyle(element).top);
        windowX = parseFloat(getComputedStyle(element).left);
    }

    function openWindow(window, taskbarApp, taskbarAppState) {
        if(window.classList.contains('minimized')) {
            const erm = minimizeWindow(window);
            console.log(erm);
            // window.style.transition = 'all 0.2s ease';
            // window.style.width = windowWidth;
            // window.style.height = windowHeight;
            // window.style.top = windowY;
            // window.style.left = windowX;
            // window.style.transition = 'all 0s ease';
        } else if(taskbarApp.classList.contains('windowFocused')) {
            minimizeWindow(window);
            taskbarApp.classList.remove('windowFocused');
        }
        taskbarAppState.style.display = 'block'
        taskbarApp.classList.add('windowFocused')
        window.classList.remove('closed');
        window.style.display = 'flex';
        positionWindow(window);
    }

    setInterval(() => taskbarAppState(settingsWindow, settingsTaskbarApp), 10)
    function taskbarAppState(window, taskbarApp) {
        if(window.classList.contains('closed') || window.classList.contains('minimized')) {
            taskbarApp.classList.remove('windowFocused');
        }
    }
})();

// sideMenuBtn.onclick { sideMenuBtns.foreach classlist.remove('active'); if sideMenuBtn doesn't have active class { .classlist.add('active') } }