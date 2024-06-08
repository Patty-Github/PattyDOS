console.log('script.js working')
const homePage = document.getElementById('homePage');
const desktopIcons = document.querySelectorAll('.desktopIcon');
const desktopIconTitles = document.querySelectorAll('.desktopIconTitle');
let desktopIconHTML;

document.addEventListener('contextmenu', event => event.preventDefault());

desktopIcons.forEach((desktopIcon) => {
    desktopIcon.addEventListener('contextmenu', () => {
        console.log('click');
    })

    desktopIcon.addEventListener('dragstart', (event) => {
        //console.log('dragging');
        desktopIconHTML = desktopIcon.innerHTML;
        document.body.style.cursor = 'pointer';
    })
    desktopIcon.addEventListener('dragend', (event) => {
        //console.log('end drag');
        event.preventDefault();
        document.body.style.cursor = 'default';
    })
})

homePage.addEventListener('dragend', (e) => {
    e.innerHTML = desktopIconHTML;
    console.log('donezo')
})

homePage.addEventListener('dragover', (event) => {
    event.preventDefault();
})



function setFontSize() {
    for(let i = 0; i < desktopIcons.length; i++) {
        let desktopIconWidth = parseFloat(getComputedStyle(desktopIcons[i]).width);
        desktopIconTitles[i].style.fontSize = (desktopIconWidth / 4) + 'px';
    }
    desktopIcons.forEach((desktopIcon) => {
        //
    })
}
setFontSize();

// have every grid slot have a desktopIcon, on drop, that innerHTML is dragged HTML.

// add wallpaper customization 