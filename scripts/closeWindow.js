export function closeWindow(window, taskbarAppState) {
    window.style.transition = 'all 0.1s ease'
    window.style.opacity = '0';
    setTimeout(() => {
        window.classList.add('closed');
        window.style.display = 'none';
        taskbarAppState.style.display = 'none';
        window.style.transition = 'all 0s'
        window.style.opacity = '1';
    }, 100)
}