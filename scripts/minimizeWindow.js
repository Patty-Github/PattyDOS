export function minimizeWindow(window) {
    const screen = document.getElementById('screen');
    let windowWidth;
    let windowHeight;
    let windowY;
    let windowX;

    windowWidth = parseFloat(getComputedStyle(window).width);
    windowHeight = parseFloat(getComputedStyle(window).height);
    windowY = parseFloat(getComputedStyle(window).top);
    windowX = parseFloat(getComputedStyle(window).left);
    window.style.transition = 'all 0.2s ease';
    window.style.overflow = 'hidden';
    //window.style.top = (windowY + (windowHeight / 2)) + 'px';
    //window.style.left = (windowX + (windowWidth / 2)) + 'px';
    window.style.top =  parseFloat(getComputedStyle(screen).height) - 48 + 'px';
    window.style.left = (parseFloat(getComputedStyle(screen).width) / 2) + 'px';
    window.style.width = '0';
    window.style.height = '0';
    window.classList.add('minimized');
    setTimeout(() => {window.style.display = 'none'; window.style.overflow = 'auto';}, 200);
}