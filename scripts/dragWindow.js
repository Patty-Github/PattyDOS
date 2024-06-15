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

    frame.addEventListener('mousedown', () => {
        if(onFrameBtn == false) {
            grabbingWindow = true; 
        }
        savedMouseY = mouseY; 
        savedMouseX = mouseX;
        savedWindowX = parseFloat(getComputedStyle(window).left);
        savedWindowY = parseFloat(getComputedStyle(window).top);
    })
    window.addEventListener('mouseup', () => {grabbingWindow = false;})

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


    /*function windowButtonFunctionality() {
        const frameBtns = document.querySelectorAll('.frameBtns')
        const minimizeBtn = document.querySelector('.minimizeBtn')
        const fullscreenBtn = document.querySelector('.fullscreenBtn')
        const closeBtn = document.querySelector('.closeBtn')
    
        frameBtns.forEach((frameBtn) => {
            frameBtn.addEventListener('mouseover', () => {onFrameBtn = true;})  
            frameBtn.addEventListener('mouseleave', () => {onFrameBtn = false;})  
        })
    
        minimizeBtn.addEventListener('click', () => {
            window.style.display = 'none';
        })
        fullscreenBtn.addEventListener('click', () => {
            window.style.top = '0px';
            window.style.left = '-286px'
            window.style.height = '100%';
            window.style.width = '100%';
            window.style.borderRadius = '0';
        })
        closeBtn.addEventListener('click', () => {
            window.style.display = 'none';
        })
    }
    windowButtonFunctionality();*/
}