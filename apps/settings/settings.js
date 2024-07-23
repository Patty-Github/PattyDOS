console.log('settings.js working');

import { windowInteractions } from "../../scripts/windowInteractions.js";

(() => {
    const settingsWindow = document.getElementById('settingsApp');
    const settingsFrame = document.getElementById('settingsFrame');
    const settingsFullscreenBtn = document.getElementById('settingsFullscreenBtn');
    const settingsIcon = document.getElementById('settingsIcon');
    const settingsTaskbarApp = document.getElementById('settingsTaskbarApp');
    const settingsAppState = document.getElementById('settingsAppState');
    const minimizeSettingsBtn = document.getElementById('minimizeSettings');
    const closeSettingsBtn = document.getElementById('closeSettingsBtn');
    const topResizerSettings = document.getElementById('topResizerSettings');
    const leftResizerSettings = document.getElementById('leftResizerSettings');
    const rightResizerSettings = document.getElementById('rightResizerSettings');
    const bottomResizerSettings = document.getElementById('bottomResizerSettings');
    const topLeftResizerSettings = document.getElementById('settingsTopLeftResizeHandle');
    const topRightResizerSettings = document.getElementById('settingsTopRightResizeHandle');
    const bottomRightResizerSettings = document.getElementById('settingsBottomRightResizeHandle');
    const bottomLeftResizerSettings = document.getElementById('settingsBottomLeftResizeHandle');
    const settingsResizers = [topResizerSettings, rightResizerSettings, bottomResizerSettings, leftResizerSettings, topLeftResizerSettings, topRightResizerSettings, bottomRightResizerSettings, bottomLeftResizerSettings];
    windowInteractions(settingsWindow, settingsFrame, closeSettingsBtn, settingsFullscreenBtn, minimizeSettingsBtn, settingsIcon, settingsTaskbarApp, settingsAppState, settingsResizers);
})();

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
                    page.style.display = 'flex';
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
    const screen = document.getElementById('screen');
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
    const closeSettingsBtn = document.getElementById('closeSettingsBtn');

    closeSettingsBtn.addEventListener('click', () => {
        resetSettingsPage();
    })
})();

(function getUserSystemInfo() {
    const clearLocalStorageBtn = document.getElementById('clearLocalStorageBtn');
    const localStorageSettings = document.getElementById('localStorageSettings');
    clearLocalStorageBtn.addEventListener('click', () => {
        localStorage.clear();

        if(localStorageSettings.childElementCount > 1) {
            localStorageSettings.removeChild[1];
        }
        const clearedText = document.createElement('p');
        const clearedTextId = new Date().getTime();
        clearedText.setAttribute('id', clearedTextId);
        clearedText.textContent = 'Cleared!';
        clearedText.style.margin = '0 10px'
        
        localStorageSettings.appendChild(clearedText);

        setTimeout(() => {
            const deleteText = document.getElementById(clearedTextId);
            if(deleteText != null) {
                deleteText.style.transition = 'all 0.5s ease';
                deleteText.style.opacity = 0; 
            }
        }, 3000)
    });

    const osText = document.getElementById('userOperatingSystem');
    const browserText = document.getElementById('userBrowser');
    const screenSizeText = document.getElementById('userScreenSize');

    let userInfo = navigator.userAgentData;
    // if(userInfo != undefined) {
    //     console.log(navigator.userAgentData);
    //     console.log(`OS: ${userInfo.platform}, Browser: ${userInfo.brands[2].brand} v${userInfo.brands[2].version}`)
    //     osText.textContent = `OS: ${userInfo.platform}`
    //     let platform;
    //     userInfo.mobile ? platform = 'Mobile' : platform = 'Desktop';
    //     browserText.textContent = `Browser: ${userInfo.brands[2].brand} v${userInfo.brands[2].version} ${platform}`
    //     screenSizeText.textContent = `Screen Resolution: ${window.screen.width}x${window.screen.height}`
    // } else {
    const userAgentString = navigator.userAgent;
    let slicedOSText;
    if(userAgentString.includes('iPhone')) {
        slicedOSText = userAgentString.slice(userAgentString.indexOf('iPhone OS'), userAgentString.indexOf('like'))
    } else if(userAgentString.includes('Macintosh')) {
        slicedOSText = 'iPadOS';
    } else {
        slicedOSText = userAgentString.slice((userAgentString.indexOf('(') + 1), userAgentString.indexOf(';'));
    }

    let browserName;
    if(userAgentString.includes('Chrome') && userAgentString.includes('Safari')) {
        browserName = userAgentString.slice(userAgentString.indexOf('Chrome'), userAgentString.indexOf('Safari'));
    } else if(userAgentString.includes('CriOS') && userAgentString.includes('Safari')) {
        browserName = userAgentString.slice(userAgentString.indexOf('CriOS'), userAgentString.indexOf('Mobile'));
    } else {
        browserName = userAgentString.slice(userAgentString.lastIndexOf(' ') + 1)
    }
    browserName = browserName.replaceAll('/', ' v');

    let platformText;
    userAgentString.includes('Mobile') ? platformText = 'Mobile' : platformText = 'Desktop';

    osText.textContent = `OS: ${slicedOSText}`
    browserText.textContent = `Browser: ${browserName} ${platformText}`;
    
    screenSizeText.textContent = `Screen Resolution: ${window.screen.width}x${window.screen.height}`;

    // let temp = document.createElement('p')
    // temp.textContent = navigator.userAgent;
    // document.querySelector('.userSystemDetails').appendChild(temp)
    //}
})();

// Aspect Ratio Selection
(() => { 
    const options = document.querySelectorAll('.aspectRatioOption');
    const checkboxes = document.querySelectorAll('.aspectRatioCheckbox');
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
        })
    })
})();

// Lock Screen
(() => {
    const lockScreenCheckBox = document.getElementById('showLockScreenCheckBox');

    const savedBool = localStorage.getItem('showLockScreen');

    function setLockScreenSetting() {
        if(lockScreenCheckBox.checked) {
            localStorage.setItem('showLockScreen', 'true')
        } else {
            localStorage.setItem('showLockScreen', 'false')
        }
    } 
    if(savedBool == 'false') {
        document.getElementById('lockScreen').remove();
        lockScreenCheckBox.checked = false;
    } else {
        lockScreenCheckBox.checked = true;
    }
    lockScreenCheckBox.addEventListener('change', () => {
        setLockScreenSetting();
    })
})();

// Move taskbarApps and startMenu between the left and center
(function taskbarAppsPosition() {
    // takbarAppsOptionCheckbox
    const options = document.querySelectorAll('.takbarAppsOption');
    const checkboxes = document.querySelectorAll('.takbarAppsOptionCheckbox');
    const taskbarApps = document.getElementById('taskbarApps');
    const startMenu = document.getElementById('startMenu');
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
                    taskbarApps.style.transition =  'all 0.75s ease';
                    taskbarApps.style.left = `calc(50% - ${(parseFloat(getComputedStyle(taskbarApps).width) / 2) + 'px'})`

                    startMenu.style.left = 'calc(50% - calc(25% / 2))';
                    startMenu.style.marginLeft = '0';
                    break;
                case 1:
                    taskbarApps.style.transition =  'all 0.75s ease';
                    taskbarApps.style.left = '0';

                    startMenu.style.left = 0;
                    startMenu.style.marginLeft = '11px';
                    break;
            }
        })
    })
    document.addEventListener('DOMContentLoaded', () => {
        taskbarApps.style.left = `calc(50% - ${(parseFloat(getComputedStyle(taskbarApps).width) / 2) + 'px'})`
    });

    // Set taskbar position center
    window.addEventListener('resize', () => {
        if(checkboxes[0].classList.contains('selected')) {
            taskbarApps.style.left = `calc(50% - ${(parseFloat(getComputedStyle(taskbarApps).width) / 2) + 'px'})`
        }
    })
})();