export function moveableWindow(appWindow, frame, fullscreenBtn) {

    const screen = document.getElementById('screen')
    let mouseX;
    let mouseY;
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
        mouseX = event.clientX;
        mouseY = event.clientY;
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