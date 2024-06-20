export function moveableWindow(window, frame, fullscreenBtn) {

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
        console.log('changed')
        mutations.forEach((mutation) => {
        savedWindowX = parseFloat(getComputedStyle(window).left);
        savedWindowY = parseFloat(getComputedStyle(window).top);
            console.log('settingsApp ' + mutation.attributeName + ' has been changed');
            windowStyleChange.disconnect();
        })
    })
    document.addEventListener('DOMContentLoaded', () => {
        windowStyleChange.observe(window, { attributes : true, attributeFilter : ['style'] })
    })

    frame.addEventListener('mousedown', (event) => {
        if(event.target.closest('.frameBtn')) {
            onFrameBtn = true;
        }
        if(onFrameBtn == false) {
            grabbingWindow = true; 
        }
        setTimeout(() => {onFrameBtn = false;}, 1)
        savedMouseY = mouseY; 
        savedMouseX = mouseX;
        if(!window.classList.contains('fullscreen')) {
            savedWindowX = parseFloat(getComputedStyle(window).left);
            savedWindowY = parseFloat(getComputedStyle(window).top);
        }
    })
    window.addEventListener('mouseup', () => {grabbingWindow = false; onFrameBtn = false;})

    screen.addEventListener('mousemove', (event) => {
        mouseX = event.clientX;
        mouseY = event.clientY;
        if(grabbingWindow === true && onFrameBtn === false) {
            dragWindow()
        }
    })

    function dragWindow() {
        const xOffset = savedMouseX - mouseX;
        const yOffset = savedMouseY - mouseY;
        window.style.left = (savedWindowX -  xOffset) + 'px';
        window.style.top = (savedWindowY - yOffset) + 'px';
    }

    // fullscreen code 
    fullscreenBtn.addEventListener('click', () => {
        savedWindowWidth = parseFloat(getComputedStyle(window).width);
        savedWindowHeight = parseFloat(getComputedStyle(window).height);
    })

    frame.addEventListener('mousemove', () => {
        if(grabbingWindow && window.classList.contains('fullscreen')) {
            savedWindowX = mouseX - (savedWindowWidth / 2);
            savedWindowY = mouseY - 16;
            //window.style.left = savedWindowX;
        }
    })
}