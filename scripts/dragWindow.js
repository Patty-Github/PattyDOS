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

    // save window state is the issue. if it runs, it fucks it up.

    function saveWindowState(event) {
        savedMouseY = mouseY; 
        savedMouseX = mouseX;
        savedWindowX = parseFloat(getComputedStyle(window).left);
        savedWindowY = parseFloat(getComputedStyle(window).top);
    }

    frame.addEventListener('mousedown', (event) => {
        if(window.classList.contains('fullscreen')) {
            const hasMouseMoved = (event) => {
                saveWindowState(event); 
                document.removeEventListener('mousemove');
            }
            document.addEventListener('mousemove', () => hasMouseMoved);
        } else {
            saveWindowState(event);
        }
        if(event.target.classList.contains('frame')) {
            grabbingWindow = true;
        }
    })
    window.addEventListener('mouseup', () => {grabbingWindow = false; /*onFrameBtn = false;*/})

    screen.addEventListener('mousemove', (event) => {
        mouseX = event.clientX;
        mouseY = event.clientY;
        //console.log(event.target);
        //console.log(`${grabbingWindow} + ${onFrameBtn} + ${!window.classList.contains('fullscreen')}`);
        if(event.target.classList.contains('frameBtnImage')) {
            onFrameBtn = true;
        } else {
            onFrameBtn = false;
        }
        if(grabbingWindow === true && onFrameBtn === false) {
            //saveWindowState(event);
            dragWindow();
        }
    })

    function dragWindow() {
        const xOffset = savedMouseX - mouseX;
        const yOffset = savedMouseY - mouseY;
        window.style.left = (savedWindowX -  xOffset) + 'px';
        window.style.top = (savedWindowY - yOffset) + 'px';
    }
}