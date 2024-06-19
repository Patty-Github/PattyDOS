export function resizeWindow(window, topResizer, rightResizer, bottomResizer, leftResizer, topLeftResizer, topRightResizer, bottomRightResizer, bottomLeftResizer) {
    const screen = document.getElementById('screen');

    let resizingTop;
    let resizingRight;
    let resizingBottom;
    let resizingLeft;
    let resizingTopLeft;
    let resizingTopRight;
    let resizingBottomRight;
    let resizingBottomLeft;

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
        } else if(event.target.closest(`#${leftResizer}`)) {
            resizingLeft = true;
        } else if(event.target.closest(`#${topLeftResizer}`)) {
            resizingTopLeft = true;
        } else if(event.target.closest(`#${topRightResizer}`)) {
            resizingTopRight = true;
        } else if(event.target.closest(`#${bottomRightResizer}`)) {
            resizingBottomRight = true;
        } else if(event.target.closest(`#${bottomLeftResizer}`)) {
            resizingBottomLeft = true;
        }

        savedMouseY = mouseY; 
        savedMouseX = mouseX;
        savedWindowX = parseFloat(getComputedStyle(window).left);
        savedWindowY = parseFloat(getComputedStyle(window).top);
        windowWidth = parseFloat(getComputedStyle(window).width);
        windowHeight = parseFloat(getComputedStyle(window).height);
    })
    document.addEventListener('mouseup', () => {resizingWindow = false; resizingTop = false; resizingRight = false; resizingBottom = false; resizingLeft = false; resizingTopLeft = false; resizingTopRight = false; resizingBottomRight = false; resizingBottomLeft = false; screen.style.cursor = 'default';})

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
        } else if(resizingTopLeft) {
            screen.style.cursor = 'nwse-resize';
            const yOffset = savedMouseY - mouseY;
            const xOffset = savedMouseX - mouseX;
            window.style.height = windowHeight + yOffset + 'px';
            window.style.top = savedWindowY - yOffset + 'px';
            window.style.width = windowWidth + xOffset + 'px';
            window.style.left = savedWindowX - xOffset + 'px';
        } else if(resizingTopRight) {
            screen.style.cursor = 'nesw-resize';
            const yOffset = savedMouseY - mouseY;
            const xOffset = savedMouseX - mouseX;
            window.style.height = windowHeight + yOffset + 'px';
            window.style.top = savedWindowY - yOffset + 'px';
            window.style.width = windowWidth - xOffset + 'px';
            window.style.left = savedWindowX + 'px';
        } else if(resizingBottomRight) {
            screen.style.cursor = 'nwse-resize';
            const yOffset = savedMouseY - mouseY;
            const xOffset = savedMouseX - mouseX;
            window.style.height = windowHeight - yOffset + 'px';
            window.style.top = savedWindowY + 'px';
            window.style.width = windowWidth - xOffset + 'px';
            window.style.left = savedWindowX + 'px';
        } else if(resizingBottomLeft) {
            screen.style.cursor = 'nesw-resize';
            const yOffset = savedMouseY - mouseY;
            const xOffset = savedMouseX - mouseX;
            window.style.height = windowHeight - yOffset + 'px';
            window.style.top = savedWindowY + 'px';
            window.style.width = windowWidth + xOffset + 'px';
            window.style.left = savedWindowX - xOffset + 'px';
        } 
    })
}