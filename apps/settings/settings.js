console.log('settings.js working');

import { moveableWindow } from "../../scripts/dragWindow.js";
import { minimizeWindow } from "../../scripts/minimizeWindow.js";
import { positionWindow } from "../../scripts/positionWindow.js";
import { fullscreenWindow } from "../../scripts/fullscreenWindow.js";
import { closeWindow } from "../../scripts/closeWindow.js";
import { resizeWindow } from "../../scripts/resizeWindow.js";

const screen = document.getElementById('screen');
const settingsWindow = document.getElementById('settingsApp');
const settingsFrame = document.getElementById('settingsFrame');
const settingsFullscreenBtn = document.getElementById('settingsFullscreenBtn');
const settingsFullscreenBtnImg = document.getElementById('settingsFullscreenBtnImg');

moveableWindow(settingsWindow, settingsFrame, settingsFullscreenBtn);
fullscreenWindow(settingsWindow, settingsFrame, settingsFullscreenBtn, settingsFullscreenBtnImg);
const topResizerSettings = document.getElementById('topResizerSettings');
const leftResizerSettings = document.getElementById('leftResizerSettings');
const rightResizerSettings = document.getElementById('rightResizerSettings');
const bottomResizerSettings = document.getElementById('bottomResizerSettings');
const settingsResizers = [topResizerSettings, rightResizerSettings, bottomResizerSettings, leftResizerSettings];
resizeWindow(settingsWindow, 'topResizerSettings', 'rightResizerSettings', 'bottomResizerSettings', 'leftResizerSettings', 'settingsTopLeftResizeHandle', 'settingsTopRightResizeHandle', 'settingsBottomRightResizeHandle', 'settingsBottomLeftResizeHandle');

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

function resetSettingsPage() {
    const menuItems = document.querySelectorAll('.sideMenuItem');
    const pages = document.querySelectorAll('.settingsPage'); 
    menuItems.forEach((menuItemTwo) => {
        menuItemTwo.classList.remove('active');
    })
    pages.forEach((page) => {
        page.style.display = 'none';
    })
    menuItems[0].classList.add('active');
    pages[0].style.display = 'flex';
}

// Wallpaper Customization
(() => {
    const currentWallpaper = document.getElementById('currentWallpaper');
    // Get wallpaper from localStorage and set as Wallpaper
    const setWallpaper = localStorage.getItem('setWallpaper');
    if(setWallpaper != null) {
        screen.style.background = setWallpaper;
        screen.style.backgroundSize = '100% 100%';
        screen.style.backgroundRepeat = 'no-repeat';
        screen.style.backgroundPositionX = 'center';
        screen.style.backgroundPositionY = 'center';

        currentWallpaper.style.background = setWallpaper;
        currentWallpaper.style.backgroundSize = 'cover'
        currentWallpaper.style.backgroundRepeat = 'no-repeat';
        currentWallpaper.style.backgroundPositionX = 'center';
        currentWallpaper.style.backgroundPositionY = 'center';
    } 

    // Wallpaper Scaling Options
    let wallpaperRes = 'stretch';
    (function changeWallpaperScale() {
        const options = document.querySelectorAll('.wallpaperScaleOption');
        const checkboxes = document.querySelectorAll('.wallpaperScaleOptionCheckbox');
        options.forEach((option, index) => {
            option.addEventListener('click', () => {
                checkboxes.forEach((checkbox) => {
                    checkbox.classList.remove('selected');
                })
                options.forEach((op) => {
                    op.classList.remove('selected');
                })
    
                checkboxes[index].classList.add('selected');
                option.classList.add('selected');
    
                switch(index) {
                    case 0:
                        // Stretch
                        screen.style.backgroundSize = '100% 100%';
                        wallpaperRes = 'stretch';
                        break;
                    case 1:
                        // Fit
                        screen.style.backgroundSize = 'contain';
                        wallpaperRes = 'fit';
                        break;
                    case 2:
                        // Zoom
                        screen.style.backgroundSize = 'cover';
                        wallpaperRes = 'zoom';
                        break;
                }
            })
        })
    })();

    // Change Wallpaper
    (function changeWallpaperImage() {
        const inputWallpaperBtn = document.getElementById('inputWallpaperBtn');

        // listen for file upload
        inputWallpaperBtn.addEventListener('change', async () => {
            if(inputWallpaperBtn.files.length == 1) {
                const file = inputWallpaperBtn.files[0];
                const base64File = await fileToBase64(file);
                changeWallpaper(base64File);
            } else {
                console.log('too many files selected. choose 1 image only.')
            }
        })

        // set wallpaper to uploaded wallpaper
        function changeWallpaper(wallpaper) {
            screen.style.background = `url(${wallpaper})`;
            screen.style.backgroundRepeat = 'no-repeat';
            screen.style.backgroundPositionX = 'center';
            screen.style.backgroundPositionY = 'center';

            currentWallpaper.style.background = `url(${wallpaper})`;
            currentWallpaper.style.backgroundSize = 'cover'
            currentWallpaper.style.backgroundRepeat = 'no-repeat';
            currentWallpaper.style.backgroundPositionX = 'center';
            currentWallpaper.style.backgroundPositionY = 'center';

            localStorage.setItem('setWallpaper', `url(${wallpaper})`)

            switch(wallpaperRes) {
                case 'stretch':
                    screen.style.backgroundSize = '100% 100%'
                    break;
                case 'fit':
                    screen.style.backgroundSize = 'contain';
                    break;
                case 'zoom':
                    screen.style.backgroundSize = 'cover';
                    break;
            }
        }

        // convert wallpaper to Base64 for local storage
        function fileToBase64(file) {
            return new Promise((resolve) => {
                const reader = new FileReader();
                reader.onloadend = () => resolve(reader.result);
                reader.readAsDataURL(file)
            })
        }
    })();
})();

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
            newColor += ', 0.8)';
            elementToChange.style.backgroundColor = newColor;
        })
    }

    inputSystemColor.addEventListener('input', (event) => {changeSystemColor(event)})

    systemColorOptions.forEach((systemColorOption) => {
        systemColorOption.addEventListener('click', (event) => {
            // onclick, convert this backgroundColor to HEX, then apply color to color picker.
            const colorRGB = getComputedStyle(systemColorOption).backgroundColor;
            const colorR = colorRGB.slice(colorRGB.indexOf('(') + 1, colorRGB.indexOf(','));
            const colorG = colorRGB.slice(colorRGB.indexOf(',') + 2, colorRGB.indexOf(',', colorRGB.indexOf(',') + 1))
            const colorB = colorRGB.slice(colorRGB.indexOf(',', colorRGB.indexOf(',') + 1) + 2, colorRGB.indexOf(')'))
            // pasted from stackoverflow
            function rgbToHex(r, g, b) {
                if(String(r + g + b).length <= 6) {
                        return "#" + (1 << 24 | r << 16 | g << 8 | b).toString(16).slice(1);
                    } else {
                        return '#313131'
                    }
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
    const minimizeSettingsBtn = document.getElementById('minimizeSettings');
    const closeSettingsBtn = document.getElementById('closeSettingsBtn');
    settingsIcon.addEventListener('dblclick', () => openWindow(settingsApp, settingsTaskbarApp, settingsAppState));

    settingsTaskbarApp.addEventListener('click', () => {
        openWindow(settingsApp, settingsTaskbarApp, settingsAppState);
    });
    minimizeSettingsBtn.addEventListener('click', () => {
        getElementPositionAndScale(settingsApp);
        minimizeWindow(settingsApp);
    })
    closeSettingsBtn.addEventListener('click', () => {
        closeWindow(settingsWindow, settingsAppState);
        resetSettingsPage();
    })

    let windowWidth;
    let windowHeight;
    let windowY;
    let windowX;
    function getElementPositionAndScale(element) {
        windowWidth = parseFloat(getComputedStyle(element).width);
        windowHeight = parseFloat(getComputedStyle(element).height);
        windowY = parseFloat(getComputedStyle(element).top);
        windowX = parseFloat(getComputedStyle(element).left);
    }

    // if minimized, position and scale are the ones set in above func. 
    // if focused, minimize
    // else, open.
    const timeToWait = 200;
    let timeWaited = 1000;
    function openWindow(window, taskbarApp, taskbarAppState) {
        if(window.classList.contains('minimized') && (new Date().getTime() - timeWaited) > timeToWait) {
            timeWaited = new Date().getTime();
            window.style.transition = 'all 0.2s ease';
            window.style.display = 'flex';
            window.classList.remove('minimized');
            //console.log(`window width: ${windowWidth}, windowHeight: ${windowHeight}, windowY: ${windowY}, windowX: ${windowX}`)
            window.style.width = windowWidth + 'px';
            window.style.height = windowHeight + 'px';
            window.style.top = windowY + 'px';
            window.style.left = windowX + 'px';
            window.style.transition = 'all 0s ease';
            taskbarApp.classList.add('windowFocused');
        } else if(taskbarApp.classList.contains('windowFocused') && (new Date().getTime() - timeWaited) > timeToWait) {
            timeWaited = new Date().getTime();
            minimizeWindow(window);
            getElementPositionAndScale(window);
            taskbarApp.classList.remove('windowFocused');
        } else {
            taskbarAppState.style.display = 'block'
            taskbarApp.classList.add('windowFocused')
            window.classList.remove('closed');
            window.style.display = 'flex';
            positionWindow(window);
        }
    }

    setInterval(() => taskbarAppState(settingsWindow, settingsTaskbarApp), 10)
    function taskbarAppState(window, taskbarApp) {
        if(window.classList.contains('closed') || window.classList.contains('minimized')) {
            taskbarApp.classList.remove('windowFocused');
        }
    }
})();