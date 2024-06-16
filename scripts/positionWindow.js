export function positionWindow(window) {
    const screen = document.getElementById('screen');
    window.style.left = (parseFloat(getComputedStyle(screen).width) / 2) - (parseFloat(getComputedStyle(window).width) / 2) + 'px';
    window.style.top = parseFloat(getComputedStyle(screen).top) + (parseFloat(getComputedStyle(window).height) / 6) - 24 + 'px';
}