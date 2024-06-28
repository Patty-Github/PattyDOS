// Combining all Window Interactions into one script.
// Need a window's window, frame, close btn, fullscreen btn, minimize btn, taskbarApp, taskbarAppState, windowResizers, 
// for fullscreen btn image, use fullscreen btn.childNodes[0] 
// resizers should be top[0] to left[3], top left[4] to bottom left[7].

export function windowInteractions(appWindow, frame, closeBtn, fullscreenBtn, minimizeBtn, appDesktopIcon, taskbarApp, taskbarAppState, resizers) {
    
    // Variables needed for multiple functions
    const screen = document.getElementById('screen')
    let mouseX;
    let mouseY;
    let windowX;
    let windowY;
    let windowWidth;
    let windowHeight;

    const timeToWait = 200;
    let timeWaited = 1000;

    document.addEventListener('mousemove', (event) => {
        mouseX = event.clientX;
        mouseY = event.clientY;
    })

    // Position Window
    function positionWindow() {
        appWindow.style.left = (parseFloat(getComputedStyle(screen).width) / 2) - (parseFloat(getComputedStyle(appWindow).width) / 2) + 'px';
        appWindow.style.top = parseFloat(getComputedStyle(screen).top) + (parseFloat(getComputedStyle(appWindow).height) / 6) - 24 + 'px';
    }

    // Open Window
    function openWindow() {
        if(appWindow.classList.contains('minimized') && (new Date().getTime() - timeWaited) > timeToWait) {
            timeWaited = new Date().getTime();
            appWindow.style.transition = 'all 0.2s ease';
            appWindow.style.display = 'flex';
            appWindow.classList.remove('minimized');
            //console.log(`window width: ${windowWidth}, windowHeight: ${windowHeight}, windowY: ${windowY}, windowX: ${windowX}`)
            appWindow.style.width = windowWidth + 'px';
            appWindow.style.height = windowHeight + 'px';
            appWindow.style.top = windowY + 'px';
            appWindow.style.left = windowX + 'px';
            appWindow.style.transition = 'all 0s ease';
            taskbarApp.classList.add('windowFocused');
        } else if(taskbarApp.classList.contains('windowFocused') && (new Date().getTime() - timeWaited) > timeToWait) {
            timeWaited = new Date().getTime();
            minimizeWindow(window);
            taskbarApp.classList.remove('windowFocused');
        } else {
            taskbarAppState.style.display = 'block'
            taskbarApp.classList.add('windowFocused')
            appWindow.classList.remove('closed');
            appWindow.style.display = 'flex';
        }
    }
    appDesktopIcon.addEventListener('dblclick', () => {positionWindow(); openWindow()})
    taskbarApp.addEventListener('click', () => {positionWindow(); openWindow()})

    // Drag Window
    function moveableWindow() {

        let savedMouseX;
        let savedMouseY;
        let savedWindowX;
        let savedWindowY;
        let savedWindowWidth;
        let savedWindowHeight;
        let grabbingWindow = false;
        let onFrameBtn = false;
    
        const windowStyleChange = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                savedWindowX = parseFloat(getComputedStyle(appWindow).left);
                savedWindowY = parseFloat(getComputedStyle(appWindow).top);
                windowStyleChange.disconnect();
            })
        })
        document.addEventListener('DOMContentLoaded', () => {
            windowStyleChange.observe(appWindow, { attributes : true, attributeFilter : ['style'] })
        })
    
        frame.addEventListener('mousedown', () => {
            if(onFrameBtn == false) {
                grabbingWindow = true; 
            }
            savedMouseY = mouseY; 
            savedMouseX = mouseX;
            if(!appWindow.classList.contains('fullscreen')) {
                savedWindowX = parseFloat(getComputedStyle(appWindow).left);
                savedWindowY = parseFloat(getComputedStyle(appWindow).top);
            }
        })
        window.addEventListener('mouseup', () => {grabbingWindow = false;})
    
        screen.addEventListener('mousemove', (event) => {
            if(event.target.closest('.frameBtn')) {
                onFrameBtn = true;
            } else {
                onFrameBtn = false;
            }
            if(grabbingWindow === true && onFrameBtn === false) {
                dragWindow()
            }
        })
    
        function dragWindow() {
            const xOffset = savedMouseX - mouseX;
            const yOffset = savedMouseY - mouseY;
            appWindow.style.left = (savedWindowX -  xOffset) + 'px';
            appWindow.style.top = (savedWindowY - yOffset) + 'px';
        }
    
        // fullscreen code 
        fullscreenBtn.addEventListener('click', () => {
            savedWindowWidth = parseFloat(getComputedStyle(appWindow).width);
            savedWindowHeight = parseFloat(getComputedStyle(appWindow).height);
        })
    
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
    
        document.addEventListener('mousemove', () => {
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
        appWindow.style.transition = 'all 0.1s ease'
        appWindow.style.opacity = '0';
        setTimeout(() => {
            appWindow.classList.add('closed');
            appWindow.style.display = 'none';
            taskbarAppState.style.display = 'none';
            appWindow.style.transition = 'all 0s'
            appWindow.style.opacity = '1';
        }, 100)
    }
    closeBtn.addEventListener('click', () => closeWindow());

    // Fullscreen Window
    function fullscreenWindow() {
        const fullscreenBtnImg = fullscreenBtn.childNodes[0];
    
        let savedWindowWidth;
        let savedWindowHeight;
        let savedWindowX;
        let savedWindowY;
    
        let grabbingWindow;
    
        fullscreenBtn.addEventListener('click', () => {
            if(appWindow.classList.contains('fullscreen')) {
                unFullscreenOnClick();
            } else {
                savedWindowWidth = getComputedStyle(appWindow).width;
                savedWindowHeight = getComputedStyle(appWindow).height;
                savedWindowX = parseFloat(getComputedStyle(appWindow).left);
                savedWindowY = parseFloat(getComputedStyle(appWindow).top);
                // change fullscreenBtn img to un-fullscreen img.
                appWindow.style.transition = 'all 0.1s ease';
                appWindow.style.top = '-1px';
                appWindow.style.left = '-1px';
                appWindow.style.borderRadius = '0';
                appWindow.style.width = getComputedStyle(screen).width;
                appWindow.style.height = getComputedStyle(screen).height;
                appWindow.classList.add('fullscreen');
                appWindow.style.transition = 'all 0s';
                fullscreenBtnImg.src = "/PattyDOS/apps/images/fullscreen-exit.png";
            }
        })
    
        function unFullscreenOnClick() {
            appWindow.style.transition = 'all 0.1s ease';
    
            appWindow.style.width = savedWindowWidth;
            appWindow.style.height = savedWindowHeight;
            appWindow.style.left = savedWindowX + 'px';
            appWindow.style.top = savedWindowY + 'px';
    
            appWindow.style.borderRadius = '8px'
    
            appWindow.style.transition = 'all 0s'
            appWindow.classList.remove('fullscreen');
            fullscreenBtnImg.src = "/PattyDOS/apps/images/fullscreen.png";
        }
    
        function unFullscreenOnDrag() {
            appWindow.style.width = savedWindowWidth;
            appWindow.style.height = savedWindowHeight;
    
            appWindow.style.borderRadius = '8px'
            appWindow.classList.remove('fullscreen');
            fullscreenBtnImg.src = "/PattyDOS/apps/images/fullscreen.png";
        }
    
        frame.addEventListener('mousedown', () => grabbingWindow = true)
        document.addEventListener('mouseup', () => grabbingWindow = false)
    
        document.addEventListener('mousemove', (event) => {
            if(grabbingWindow && appWindow.classList.contains('fullscreen')) {
                unFullscreenOnDrag();
            }
        })
    
        window.addEventListener('resize', () => {
            if(appWindow.classList.contains('fullscreen')) {
                appWindow.style.width = getComputedStyle(screen).width;
                appWindow.style.height = getComputedStyle(screen).height;
            }
        })
    
        // when un-fullscreening when browser is unfocused it defaults to top left.
    }
    fullscreenWindow();

    //MinimizeWindow
    function minimizeWindow() {
    
        windowWidth = parseFloat(getComputedStyle(appWindow).width);
        windowHeight = parseFloat(getComputedStyle(appWindow).height);
        windowY = parseFloat(getComputedStyle(appWindow).top);
        windowX = parseFloat(getComputedStyle(appWindow).left);
        appWindow.style.transition = 'all 0.2s ease';
        appWindow.style.overflow = 'hidden';
        //window.style.top = (windowY + (windowHeight / 2)) + 'px';
        //window.style.left = (windowX + (windowWidth / 2)) + 'px';
        appWindow.style.top =  parseFloat(getComputedStyle(screen).height) - 48 + 'px';
        appWindow.style.left = (parseFloat(getComputedStyle(screen).width) / 2) + 'px';
        appWindow.style.width = '0';
        appWindow.style.height = '0';
        appWindow.classList.add('minimized');
        setTimeout(() => {appWindow.style.display = 'none'; appWindow.style.overflow = 'auto';}, 200);

    }
    minimizeBtn.addEventListener('click', () => minimizeWindow());

    setInterval(() => {setTaskbarAppState()}, 10)
    function setTaskbarAppState() {
        if(appWindow.classList.contains('closed') || appWindow.classList.contains('minimized')) {
            taskbarApp.classList.remove('windowFocused');
        }
    }

}