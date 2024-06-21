export function fullscreenWindow(appWindow, frame, fullscreenBtn, fullscreenBtnImg) {
    // on fullscreen click, top & left = 0, 
    // on frame drag, unminimize
    const screen = document.getElementById('screen');

    let savedWindowWidth;
    let savedWindowHeight;
    let savedWindowX;
    let savedWindowY;

    let savedMouseX; 
    let savedMouseY;
    let mouseX;
    let mouseY;

    let grabbingWindow;
    let clickedFrame = false;

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
    // you shouldn't be able to resize if fullscreen.
}