export function moveableWindow(window, frame) {

    const screen = document.getElementById('screen')
    let mouseX;
    let mouseY;
    let savedMouseX;
    let savedMouseY;
    let savedWindowX;
    let savedWindowY;
    let grabbingWindow = false;
    let onFrameBtn = false;

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
        savedWindowX = parseFloat(getComputedStyle(window).left);
        savedWindowY = parseFloat(getComputedStyle(window).top);
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
}