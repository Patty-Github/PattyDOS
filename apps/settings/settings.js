console.log('settings.js working');

const settingsWindow = document.getElementById('settingsApp');
const settingsFrame = document.getElementById('settingsFrame');

let settingsResized = false;
let settingsWindowWidth;
let settingsWindowHeight;
const resizer = new ResizeObserver(() => {
    if(settingsResized == false) {
        settingsWindow.style.margin = 'auto'
        settingsResized = true;
        settingsWindowWidth = parseFloat(getComputedStyle(settingsWindow).width);
        settingsWindowHeight = parseFloat(getComputedStyle(settingsWindow).height);
    }
    const marginLeft = getComputedStyle(settingsWindow).marginLeft;
    const marginRight = getComputedStyle(settingsWindow).marginRight;
    settingsWindow.style.marginLeft = marginLeft;
    settingsWindow.style.marginRight = marginRight;

    settingsWindowWidth = parseFloat(getComputedStyle(settingsWindow).width);
    settingsWindowHeight = parseFloat(getComputedStyle(settingsWindow).height);
}).observe(settingsWindow);

settingsWindow.style.margin = 'auto'


let mouseX;
let mouseY;
let savedMouseX;
let savedMouseY;
let savedWindowX;
let savedWindowY;
let grabbingWindow = false;

settingsFrame.addEventListener('mousedown', () => {grabbingWindow = true; 
    savedMouseY = mouseY; 
    savedMouseX = mouseX;
    savedWindowX = parseFloat(getComputedStyle(settingsWindow).left);
    savedWindowY = parseFloat(getComputedStyle(settingsWindow).top);
    console.log(savedWindowX + ' ' + savedWindowY)
})
window.addEventListener('mouseup', () => {grabbingWindow = false;})

window.addEventListener('mousemove', (event) => {
    mouseX = event.clientX;
    mouseY = event.clientY;
    if(grabbingWindow == true) {
        dragWindow()
    }
})

function dragWindow() {
    const xOffset = savedMouseX - mouseX;
    const yOffset = savedMouseY - mouseY;
    settingsWindow.style.left = (savedWindowX -  xOffset) + 'px';
    settingsWindow.style.top = (savedWindowY - yOffset) + 'px';
}