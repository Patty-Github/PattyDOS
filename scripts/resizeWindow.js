export function resizeWindow(window, topResizer, rightResizer, bottomResizer, leftResizer) {
    const screen = document.getElementById('screen');

    let resizingTop;
    let resizingRight;
    let resizingBottom;
    let resizingLeft;

    let mouseX;
    let mouseY;
    let savedMouseX;
    let savedMouseY;

    let savedWindowX;
    let savedWindowY;
    let windowWidth;
    let windowHeight;

    let resizingWindow = true; 

    screen.addEventListener('mousedown', (event) => {
        if(event.target.closest(`#${topResizer}`)) {
            resizingTop = true;
        } else if(event.target.closest(`#${rightResizer}`)) {
            resizingRight = true;
        } else if(event.target.closest(`#${bottomResizer}`)) {
            resizingBottom = true;
        }
        else if(event.target.closest(`#${leftResizer}`)) {
            resizingLeft = true;
        }

        savedMouseY = mouseY; 
        savedMouseX = mouseX;
        savedWindowX = parseFloat(getComputedStyle(window).left);
        savedWindowY = parseFloat(getComputedStyle(window).top);
        windowWidth = parseFloat(getComputedStyle(window).width);
        windowHeight = parseFloat(getComputedStyle(window).height);
    })
    document.addEventListener('mouseup', () => {resizingWindow = false; resizingTop = false; resizingRight = false; resizingBottom = false; resizingLeft = false; screen.style.cursor = 'default';})

    document.addEventListener('mousemove', (event) => {
        mouseX = event.clientX;
        mouseY = event.clientY;

        if(resizingTop) {
            screen.style.cursor = 'ns-resize';
            const yOffset = savedMouseY - mouseY;
            window.style.height = windowHeight + yOffset + 'px';
            window.style.top = savedWindowY - yOffset + 'px';
        } else if(resizingRight) {
            screen.style.cursor = 'ew-resize';
            const xOffset = savedMouseX - mouseX;
            window.style.width = windowWidth - xOffset + 'px';
            window.style.left = savedWindowX + 'px';
        } else if(resizingBottom) {
            screen.style.cursor = 'ns-resize';
            const yOffset = savedMouseY - mouseY;
            window.style.height = windowHeight - yOffset + 'px';
            window.style.top = savedWindowY + 'px';
        } else if(resizingLeft) {
            screen.style.cursor = 'ew-resize';
            const xOffset = savedMouseX - mouseX;
            window.style.width = windowWidth + xOffset + 'px';
            window.style.left = savedWindowX - xOffset + 'px';
        }
    })
}