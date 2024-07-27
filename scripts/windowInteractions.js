// Combining all Window Interactions into one script.
// Need a window's window, frame, close btn, fullscreen btn, minimize btn, taskbarApp, taskbarAppState, windowResizers, 

// transition unfullscrenonclick

export function windowInteractions(appWindow, frame, closeBtn, fullscreenBtn, minimizeBtn, appDesktopIcon, taskbarApp, taskbarAppState, resizers) {
    
    // Variables needed for multiple functions
    const screen = document.getElementById('screen')
    let mouseX;
    let mouseY;
    let windowX;
    let windowY;
    let windowWidth;
    let windowHeight;
    let onFrameBtn = false;
    let grabbingWindow = false;

    const timeToWait = 200;
    let timeWaited = 1000;

    document.addEventListener('mousemove', (event) => {
        mouseX = event.clientX;
        mouseY = event.clientY;

        if(event.target.closest('.frameBtn')) {
            onFrameBtn = true;
        } else {
            onFrameBtn = false;
        }
    })
    //

    // Position Window
    function positionWindow() {
        //console.log('positionWindow()')
        appWindow.style.left = (parseFloat(getComputedStyle(screen).width) / 2) - (parseFloat(getComputedStyle(appWindow).width) / 2) + 'px';
        appWindow.style.top = parseFloat(getComputedStyle(screen).top) + ((parseFloat(getComputedStyle(appWindow).height) / 2) - (parseFloat(getComputedStyle(appWindow).height) / 4)) - 26 + 'px';
    }

    // Keep window position when resized
    function keepWindowPosition() {
        let windowX;
        let windowY;
        let windowWidth;
        let windowHeight;
        let screenWidth;
        let screenHeight;
        
        window.addEventListener('mouseup', () => {
            windowX = parseFloat(getComputedStyle(appWindow).left);
            windowY = parseFloat(getComputedStyle(appWindow).top);
            windowWidth = parseFloat(getComputedStyle(appWindow).width);
            windowHeight = parseFloat(getComputedStyle(appWindow).height);
            screenWidth = parseFloat(getComputedStyle(screen).width);
            screenHeight = parseFloat(getComputedStyle(screen).height);
        })

        window.addEventListener('resize', () => {
            if(!appWindow.classList.contains('fullscreen')) {
                const windowPercentageX = windowX / screenWidth * 100;
                appWindow.style.left = `${windowPercentageX}%`

                const windowPercentageY = windowY / screenHeight * 100;
                appWindow.style.top = `${windowPercentageY}%`
            }

            const windowPercentageWidth = windowWidth / screenWidth * 100;
            appWindow.style.width = `${windowPercentageWidth}%`;

            const windowPercentageHeight = windowHeight / screenHeight * 100;
            appWindow.style.height = `${windowPercentageHeight}%`;
        });
    }
    keepWindowPosition()

    // Open Window
    function openWindow() {
        //onsole.log('openWindow()')
        if((new Date().getTime() - timeWaited) > timeToWait) {
            if(appWindow.classList.contains('minimized')) {
                timeWaited = new Date().getTime();
                // transitions don't work. commented them out.
                //appWindow.style.transition = 'all 0.2s ease';
                appWindow.style.display = 'flex';
                appWindow.classList.remove('minimized');
    
                appWindow.style.width = windowWidth + 'px';
                appWindow.style.height = windowHeight + 'px';
    
                appWindow.style.top = windowY + 'px';
                appWindow.style.left = windowX + 'px';
    
                //appWindow.style.transition = 'all 0s ease';
                taskbarApp.classList.add('windowFocused');
            } else if(taskbarApp.classList.contains('windowFocused')) {
                timeWaited = new Date().getTime();
                minimizeWindow(window);
                taskbarApp.classList.remove('windowFocused');
            } else if(appWindow.classList.contains('closed')) {
                taskbarAppState.style.display = 'block'
                taskbarApp.classList.add('windowFocused')
                appWindow.classList.remove('closed');
                appWindow.style.display = 'flex';
                appWindow.style.width = (parseFloat(getComputedStyle(screen).width) / 2) + 'px';
                appWindow.style.height = (parseFloat(getComputedStyle(screen).height) / 1.5) + 'px';
                positionWindow();
            }
        }
    }
    appDesktopIcon.addEventListener('dblclick', () => {openWindow()})
    taskbarApp.addEventListener('click', () => {openWindow()})


    // Drag Window
    function moveableWindow() {
        //console.log('moveableWindow()')

        let savedMouseX;
        let savedMouseY;
        let savedWindowX;
        let savedWindowY;
        let savedWindowWidth;
        let savedWindowHeight;
    
        frame.addEventListener('mousedown', () => {
            if(onFrameBtn == false) {
                grabbingWindow = true; 
                savedMouseY = mouseY; 
                savedMouseX = mouseX;
                if(!appWindow.classList.contains('fullscreen')) {
                    savedWindowX = parseFloat(getComputedStyle(appWindow).left);
                    savedWindowY = parseFloat(getComputedStyle(appWindow).top);
                    savedWindowWidth = parseFloat(getComputedStyle(appWindow).width);
                    savedWindowHeight = parseFloat(getComputedStyle(appWindow).height);
                }
            }
        })
        document.addEventListener('mouseup', () => {grabbingWindow = false;})
    
        screen.addEventListener('mousemove', (event) => {
            if(grabbingWindow === true && onFrameBtn === false) {
                dragWindow()
                appWindow.classList.add('dragging');
            }
        })
    
        function dragWindow() {
            const xOffset = savedMouseX - mouseX;
            const yOffset = savedMouseY - mouseY;
            appWindow.style.left = (savedWindowX -  xOffset) + 'px';
            appWindow.style.top = (savedWindowY - yOffset) + 'px';
        }
    
        // fullscreen code 
    
        frame.addEventListener('mousemove', () => {
            if(grabbingWindow && appWindow.classList.contains('fullscreen')) {
                savedWindowX = mouseX - (savedWindowWidth / 2) - parseFloat(getComputedStyle(screen).left);
                savedWindowY = mouseY - 16;
            }
        })
    }
    moveableWindow();

    // Resize Window 
    function resizeWindow() {
        //console.log('resizeWindow()')

        const topResizer = resizers[0];
        const rightResizer = resizers[1];
        const bottomResizer = resizers[2];
        const leftResizer = resizers[3];
        const topLeftResizer = resizers[4];
        const topRightResizer = resizers[5];
        const bottomRightResizer = resizers[6];
        const bottomLeftResizer = resizers[7];

        let resizing = '';
    
        let savedMouseX;
        let savedMouseY;
    
        let savedWindowX;
        let savedWindowY;
        let windowWidth;
        let windowHeight;
    
        let resizingWindow = true; 
    
        screen.addEventListener('mousedown', (event) => {
            switch(event.target) {
                case topResizer:
                    resizing = 'top';
                    break;
                case rightResizer:
                    resizing = 'right';
                    break;
                case bottomResizer:
                    resizing = 'bottom';
                    break;
                case leftResizer:
                    resizing = 'left';
                    break;
                case topLeftResizer:
                    resizing = 'topLeft';
                    break;
                case topRightResizer:
                    resizing = 'topRight';
                    break;
                case bottomRightResizer:
                    resizing = 'bottomRight';
                    break;
                case bottomLeftResizer:
                    resizing = 'bottomLeft';
                    break;
            }
    
            savedMouseY = mouseY; 
            savedMouseX = mouseX;
            savedWindowX = parseFloat(getComputedStyle(appWindow).left);
            savedWindowY = parseFloat(getComputedStyle(appWindow).top);
            windowWidth = parseFloat(getComputedStyle(appWindow).width);
            windowHeight = parseFloat(getComputedStyle(appWindow).height);
        })
        document.addEventListener('mouseup', () => {resizingWindow = false; resizing = ''; screen.style.cursor = 'default';})
    
        screen.addEventListener('mousemove', () => {
            const yOffset = savedMouseY - mouseY;
            const xOffset = savedMouseX - mouseX;
            if(!appWindow.classList.contains('fullscreen')) {
                switch(resizing) {
                    case 'top':
                        screen.style.cursor = 'ns-resize';
                        appWindow.style.height = windowHeight + yOffset + 'px';
                        appWindow.style.top = savedWindowY - yOffset + 'px';
                        break;
                    case 'right':
                        screen.style.cursor = 'ew-resize';
                        appWindow.style.width = windowWidth - xOffset + 'px';
                        appWindow.style.left = savedWindowX + 'px';
                        break;
                    case 'bottom':
                        screen.style.cursor = 'ns-resize';
                        appWindow.style.height = windowHeight - yOffset + 'px';
                        appWindow.style.top = savedWindowY + 'px';
                        break;
                    case 'left':
                        screen.style.cursor = 'ew-resize';
                        appWindow.style.width = windowWidth + xOffset + 'px';
                        appWindow.style.left = savedWindowX - xOffset + 'px';
                        break;
                    case 'topLeft':
                        screen.style.cursor = 'nwse-resize';
                        appWindow.style.height = windowHeight + yOffset + 'px';
                        appWindow.style.top = savedWindowY - yOffset + 'px';
                        appWindow.style.width = windowWidth + xOffset + 'px';
                        appWindow.style.left = savedWindowX - xOffset + 'px';
                        break;
                    case 'topRight':
                        screen.style.cursor = 'nesw-resize';
                        appWindow.style.height = windowHeight + yOffset + 'px';
                        appWindow.style.top = savedWindowY - yOffset + 'px';
                        appWindow.style.width = windowWidth - xOffset + 'px';
                        appWindow.style.left = savedWindowX + 'px';
                        break;
                    case 'bottomRight':
                        screen.style.cursor = 'nwse-resize';
                        appWindow.style.height = windowHeight - yOffset + 'px';
                        appWindow.style.top = savedWindowY + 'px';
                        appWindow.style.width = windowWidth - xOffset + 'px';
                        appWindow.style.left = savedWindowX + 'px';
                        break;
                    case 'bottomLeft':
                        screen.style.cursor = 'nesw-resize';
                        appWindow.style.height = windowHeight - yOffset + 'px';
                        appWindow.style.top = savedWindowY + 'px';
                        appWindow.style.width = windowWidth + xOffset + 'px';
                        appWindow.style.left = savedWindowX - xOffset + 'px';
                        break;
                }
            }
        })
    }
    resizeWindow();
    
    // Close Window
    function closeWindow() {
        //console.log('closeWindow()')

        appWindow.style.transition = 'all 0.1s ease'
        appWindow.style.opacity = '0';
        setTimeout(() => {
            appWindow.classList.add('closed');
            appWindow.style.display = 'none';
            taskbarAppState.style.display = 'none';
            taskbarApp.classList.remove('windowFocused');
            appWindow.style.transition = 'all 0s'
            appWindow.style.opacity = '1';
        }, 100)
    }
    closeBtn.addEventListener('click', () => closeWindow());
    // listen for element creation, look for element by name of `${taskbarApp.getAttribute('id')}Closer`, if it isn't null addEventListener for click, closeWin on click.
    const observeBodyChildren = new MutationObserver(() => {
        const taskbarAppCloser = document.querySelector(`.${taskbarApp.getAttribute('id')}Closer`)
        if(taskbarAppCloser) {
            taskbarAppCloser.addEventListener('click', () => closeWindow());
        }

        const taskbarAppOpener = document.querySelector(`.${taskbarApp.getAttribute('id')}Opener`)
        if(taskbarAppOpener) {
            taskbarAppOpener.addEventListener('click', () => openWindow());
        }

        const desktopIconOpener = document.querySelector(`.${appDesktopIcon.getAttribute('id')}Opener`)
        if(desktopIconOpener) {
            desktopIconOpener.addEventListener('click', () => openWindow());
        }
    })
    observeBodyChildren.observe(screen, { childList: true });

    // Fullscreen Window
    function fullscreenWindow() {
        //console.log('fullscreenWindow()')
        const fullscreenBtnImg = fullscreenBtn.childNodes[0];
    
        let savedWindowWidth;
        let savedWindowHeight;
        let savedWindowX;
        let savedWindowY;
        
        fullscreenBtn.addEventListener('click', () => {
            if(appWindow.classList.contains('fullscreen')) {
                unFullscreenOnClick();
            } else {
                fullScreen();
            }
        })

        function fullScreenDblClick() {
            // on mouse down, set click1's time to time.
            // listen for another mousedown, if click2's time - click1's time < clickTime then fullscreen
            const clickTime = 500;
            let click1 = null;
            let mouseUp = new MouseEvent('mouseup')
            frame.addEventListener('mousedown', (event) => {
                if(event.target.closest('.appWindow').classList.contains('fullscreen') == false) {
                    if(new Date().getTime() - click1 < clickTime) {
                        dispatchEvent(mouseUp);
                        grabbingWindow = false;
                        setTimeout(() => {fullScreen()}, 1);
                    } else {
                        click1 = new Date().getTime();
                    }
                }
            })
        }
        fullScreenDblClick()
        window.addEventListener('mouseup', () => {console.log('mouseup')})

        function fullScreen() {
            savedWindowWidth = getComputedStyle(appWindow).width;
            savedWindowHeight = getComputedStyle(appWindow).height;
            savedWindowX = parseFloat(getComputedStyle(appWindow).left);
            savedWindowY = parseFloat(getComputedStyle(appWindow).top);
            appWindow.style.transition = 'all 0.1s ease';
            appWindow.style.top = '-1px';
            appWindow.style.left = '-1px';
            appWindow.style.borderRadius = '0';
            appWindow.style.width = getComputedStyle(screen).width;
            appWindow.style.height = parseFloat(getComputedStyle(screen).height) - 48 + 'px';
            appWindow.classList.add('fullscreen');
            appWindow.style.transition = 'all 0s';
            fullscreenBtnImg.src = "/PattyDOS/apps/images/fullscreen-exit.png";
        }
    
        function unFullscreenOnClick() {
            //console.log('unFullscreenOnClick()')

            appWindow.style.transition = 'all 0.1s ease';
    
            appWindow.style.width = savedWindowWidth;
            appWindow.style.height = savedWindowHeight;
            appWindow.style.left = savedWindowX + 'px';
            appWindow.style.top = savedWindowY + 'px';
    
            appWindow.style.borderRadius = '8px'
    
            appWindow.classList.remove('fullscreen');
            appWindow.classList.remove('halfscreenRight');
            appWindow.classList.remove('halfscreenLeft');
            setTimeout(() => appWindow.style.transition = 'all 0s ease', 10);
            fullscreenBtnImg.src = "/PattyDOS/apps/images/fullscreen.png";
        }
    
        function unFullscreenOnDrag() {
            //console.log('unFullscreenOnDrag()')

            appWindow.style.width = savedWindowWidth;
            appWindow.style.height = savedWindowHeight;

            //appWindow.style.left = mouseX - (parseFloat(getComputedStyle(appWindow).width) / 2) + 'px';
    
            appWindow.style.borderRadius = '8px'
            appWindow.classList.remove('fullscreen');
            appWindow.classList.remove('halfscreenRight');
            appWindow.classList.remove('halfscreenLeft');
            fullscreenBtnImg.src = "/PattyDOS/apps/images/fullscreen.png";
        }

        function halfScreen(dir) {
            savedWindowWidth = getComputedStyle(appWindow).width;
            savedWindowHeight = getComputedStyle(appWindow).height;
            savedWindowX = parseFloat(getComputedStyle(appWindow).left);
            savedWindowY = parseFloat(getComputedStyle(appWindow).top);
            appWindow.style.transition = 'all 0.1s ease';
            appWindow.style.top = '-1px';
            if(dir == 'right') {
                appWindow.style.left = `${parseFloat(getComputedStyle(screen).width) / 2}px`;
                appWindow.classList.add('halfscreenRight');
            } else if(dir == 'left') {
                appWindow.style.left = '-1px'; 
                appWindow.classList.add('halfscreenLeft');
            }
            appWindow.style.borderRadius = '0';
            appWindow.style.width = parseFloat(getComputedStyle(screen).width) / 2 + 'px';
            appWindow.style.height = parseFloat(getComputedStyle(screen).height) - 48 + 'px';
            appWindow.classList.add('fullscreen');
            appWindow.style.transition = 'all 0s';
            fullscreenBtnImg.src = "/PattyDOS/apps/images/fullscreen-exit.png";
        }
    
        document.addEventListener('mousemove', (event) => {
            if(grabbingWindow && appWindow.classList.contains('fullscreen')) {
                unFullscreenOnDrag();
            }
        })
    
        window.addEventListener('resize', () => {
            if(appWindow.classList.contains('halfscreenRight')) {
                appWindow.style.width = parseFloat(getComputedStyle(screen).width) / 2 + 'px';
                appWindow.style.height = parseFloat(getComputedStyle(screen).height) - 48 + 'px';
                appWindow.style.left = `${parseFloat(getComputedStyle(screen).width) / 2}px`;
            } else if(appWindow.classList.contains('halfscreenLeft')) {
                appWindow.style.width = parseFloat(getComputedStyle(screen).width) / 2;
                appWindow.style.height = parseFloat(getComputedStyle(screen).height) - 48 + 'px';
                appWindow.style.left = '0';
            } else if(appWindow.classList.contains('fullscreen')) {
                appWindow.style.width = getComputedStyle(screen).width;
                appWindow.style.height = parseFloat(getComputedStyle(screen).height) - 48 + 'px';
            }
        })

        document.addEventListener('mouseup', () => {
            if(appWindow.classList.contains('dragging') && mouseY <= '0') {fullScreen()}
            else if(appWindow.classList.contains('dragging') && mouseY > 0 && mouseX >= screen.getBoundingClientRect().right - 1) {
                halfScreen('right')
            } else if(appWindow.classList.contains('dragging') && mouseY > 0 && mouseX <= screen.getBoundingClientRect().left) {halfScreen('left')}
            appWindow.classList.remove('dragging')
            if(document.getElementById('fullscreenPlaceholder')) screen.removeChild(document.getElementById('fullscreenPlaceholder'));
        })

        document.addEventListener('mousemove', () => {
            if(appWindow.classList.contains('dragging') && (mouseY <= 0 || (mouseY > 0 && mouseX >= screen.getBoundingClientRect().right - 1) || (mouseY > 0 && mouseX <= screen.getBoundingClientRect().left + 1))) {
                if(!document.getElementById('fullscreenPlaceholder')) {
                    const homePage = document.getElementById('homePage');
                    const fullscreenPlaceolder = document.createElement('div')
                    fullscreenPlaceolder.setAttribute('id', 'fullscreenPlaceholder');

                    fullscreenPlaceolder.style.width = '0';
                    fullscreenPlaceolder.style.height = '0';

                    if(mouseY <= 0) {
                        fullscreenPlaceolder.style.left = `${(parseFloat(getComputedStyle(homePage).width) / 2) + 'px'}`;
                        fullscreenPlaceolder.style.top = '0';
                    } else if(mouseY > 0 && mouseX >= screen.getBoundingClientRect().right - 1) {
                        fullscreenPlaceolder.style.right = `0`;
                        fullscreenPlaceolder.style.top = `${(parseFloat(getComputedStyle(homePage).height) / 2) + 'px'}`;
                    } else if(mouseY > 0 && mouseX <= screen.getBoundingClientRect().left + 1) {
                        fullscreenPlaceolder.style.left = `0`;
                        fullscreenPlaceolder.style.top = `${(parseFloat(getComputedStyle(homePage).height) / 2) + 'px'}`;
                    }

                    screen.appendChild(fullscreenPlaceolder);
                    

                    if(mouseY <= 0) {
                        fullscreenPlaceolder.style.width = `${parseFloat(getComputedStyle(homePage).width) - 30 + 'px'}`;
                        fullscreenPlaceolder.style.left = '0';
                    } else if(mouseY > 0 && mouseX >= screen.getBoundingClientRect().right - 1) {
                        fullscreenPlaceolder.style.width = `${(parseFloat(getComputedStyle(homePage).width) / 2) - 15 + 'px'}`;
                        fullscreenPlaceolder.style.right = '0';
                    } else if(mouseY > 0 && mouseX <= screen.getBoundingClientRect().left + 1) {
                        fullscreenPlaceolder.style.width = `${(parseFloat(getComputedStyle(homePage).width) / 2) - 15 + 'px'}`;
                        fullscreenPlaceolder.style.left = '0';
                    }

                    fullscreenPlaceolder.style.height = `${parseFloat(getComputedStyle(homePage).height) - 30 + 'px'}`;
                    fullscreenPlaceolder.style.top = '0';


    
                }
            } else if(document.getElementById('fullscreenPlaceholder') && mouseY > 0 && mouseX < screen.getBoundingClientRect().right - 1 && mouseX > screen.getBoundingClientRect().left + 1) {
                screen.removeChild(document.getElementById('fullscreenPlaceholder'));
            }
        })
    }
    fullscreenWindow();

    // Minimize Window
    function minimizeWindow() {
        //console.log('minimizeWindow()')

        const taskbarAppRect = taskbarApp.getBoundingClientRect();
    
        windowWidth = parseFloat(getComputedStyle(appWindow).width);
        windowHeight = parseFloat(getComputedStyle(appWindow).height);
        windowY = parseFloat(getComputedStyle(appWindow).top);
        windowX = parseFloat(getComputedStyle(appWindow).left);

        appWindow.style.minWidth = '0';
        appWindow.style.minHeight = '0';
        appWindow.style.transition = 'all 0.2s ease';
        appWindow.style.overflow = 'hidden';
        appWindow.style.top =  parseFloat(getComputedStyle(screen).height) - 48 + 'px';
        appWindow.style.left = taskbarAppRect.left -  parseFloat(getComputedStyle(screen).left) + (parseFloat(getComputedStyle(taskbarApp).width) / 2) + 'px';
        appWindow.style.width = '0';
        appWindow.style.height = '0';

        setTimeout(() => {appWindow.style.transition = 'all 0s'; taskbarApp.classList.remove('windowFocused');}, 20);
        appWindow.classList.add('minimized');
        setTimeout(() => {appWindow.style.display = 'none'; appWindow.style.minWidth = '200px'; appWindow.style.minHeight = '32px'}, 200);

    }
    minimizeBtn.addEventListener('click', () => minimizeWindow());

    // Set Window Z-Index
    document.addEventListener('mousedown', (event) => {
        if(event.target.closest(`#${appWindow.getAttribute('id')}`) || event.target.closest(`#${taskbarApp.getAttribute('id')}`)) {
            appWindow.style.zIndex = '2';
        } else if(event.target.closest('*[id*="App"]')) {
            appWindow.style.zIndex = '1';
        }
    })

}