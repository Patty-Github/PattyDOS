console.log('settings.js working');

const screen = document.getElementById('screen');
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
let onFrameBtn = false;

settingsFrame.addEventListener('mousedown', () => {
    if(onFrameBtn == false) {
        grabbingWindow = true; 
    }
    savedMouseY = mouseY; 
    savedMouseX = mouseX;
    savedWindowX = parseFloat(getComputedStyle(settingsWindow).left);
    savedWindowY = parseFloat(getComputedStyle(settingsWindow).top);
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
    settingsWindow.style.left = (savedWindowX -  xOffset) + 'px';
    settingsWindow.style.top = (savedWindowY - yOffset) + 'px';
}

function setSettingsPage() {
    const menuItems = document.querySelectorAll('.sideMenuItem');

    menuItems.forEach((menuItem) => {
        menuItem.addEventListener('click', () => {
            menuItems.forEach((menuItemTwo) => {
                if(menuItemTwo.classList.contains('active')) {
                    menuItemTwo.classList.remove('active');
                }
            })
            menuItem.classList.add('active');
        })
    })
}
setSettingsPage();

function windowButtonFunctionality() {
    const frameBtns = document.querySelectorAll('.frameBtns')
    const minimizeBtn = document.querySelector('.minimizeBtn')
    const fullscreenBtn = document.querySelector('.fullscreenBtn')
    const closeBtn = document.querySelector('.closeBtn')

    frameBtns.forEach((frameBtn) => {
        frameBtn.addEventListener('mouseover', () => {console.log(onFrameBtn); onFrameBtn = true;})  
        frameBtn.addEventListener('mouseleave', () => {console.log(onFrameBtn); onFrameBtn = false;})  
    })

    minimizeBtn.addEventListener('click', () => {
        settingsWindow.style.display = 'none';
    })
    fullscreenBtn.addEventListener('click', () => {
        settingsWindow.style.top = '0px';
        settingsWindow.style.left = '-286px'
        settingsWindow.style.height = '100%';
        settingsWindow.style.width = '100%';
        settingsWindow.style.borderRadius = '0';
    })
}
windowButtonFunctionality();

// have home be active by default.
// sideMenuBtn.onclick { sideMenuBtns.foreach classlist.remove('active'); if sideMenuBtn doesn't have active class { .classlist.add('active') } }