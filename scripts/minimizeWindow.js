export function minimizeWindow(window, minimizeBtn) {
    //console.log('minimize')
    const screen = document.getElementById('screen');
    const screenWidth = getComputedStyle(screen).width;
    let windowWidth;
    let windowHeight;
    let windowY;
    let windowX;
    if(window.classList.contains('minimized')) {
        window.style.transition = 'all 0.2s ease';
        window.style.height = windowHeight;
        window.style.top = windowY;
        window.style.left = windowX;
        window.style.transition = 'all 0s ease';
    } else {
        // minimize
        windowWidth = getComputedStyle(window).width;
        windowHeight = getComputedStyle(window).height;
        windowY = parseFloat(getComputedStyle(window).top);
        windowX = parseFloat(getComputedStyle(window).left);
        //console.log(windowX + ' ' + windowY)
        window.style.transition = 'all 0.2s ease';
        window.style.top = (windowY * 4) + 'px';
        window.style.left = (windowX * 2) + 'px';
        window.style.width = '0';
        window.style.height = '0';
        window.classList.add('minimized');
        setTimeout(() => window.style.display = 'none', 200);
        // create seperate function for un-minimizing.
    }
}