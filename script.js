console.log('script.js working')
const homePage = document.getElementById('homePage');
const desktopIcons = document.querySelectorAll('.desktopIcon');
const desktopIconTitles = document.querySelectorAll('.desktopIconTitle');
let desktopIconHTML;

document.addEventListener('contextmenu', event => event.preventDefault());


function setFontSize() {
    let i = 0;
    desktopIcons.forEach((desktopIcon) => {
        let desktopIconWidth = parseFloat(getComputedStyle(desktopIcon).width)
        if(desktopIconTitles[i]) {
            desktopIconTitles[i].style.fontSize = (desktopIconWidth / 4) + 'px';
        } 
        i++;
    })
}
setFontSize();
window.addEventListener('resize', setFontSize)

const settingsIcon = document.getElementById('settingsIcon');
const settingsApp = document.getElementById('settingsApp');
settingsIcon.addEventListener('dblclick', () => {settingsApp.style.display = 'flex'})

// have every grid slot have a desktopIcon, on drop, that innerHTML is dragged HTML.

// add wallpaper customization 


/* don't work

/*desktopIcons.forEach((desktopIcon) => {
    desktopIcon.addEventListener('contextmenu', () => {
        //show app menu
    })

    if(desktopIcon.innerHTML != '') {
        desktopIcon.addEventListener('dragstart', (event) => {
            desktopIconHTML = desktopIcon.innerHTML;
            desktopIcon.innerHTML = ''
            document.body.style.cursor = 'pointer';
        })

        desktopIcon.addEventListener('dragend', (event) => {
            event.preventDefault();
            document.body.style.cursor = 'default';
            //e.innerHTML = desktopIconHTML;
        })
    }

    desktopIcon.addEventListener('dragover', (event) => {
        event.preventDefault();
    })

    desktopIcon.addEventListener('drop', (event) => {
        event.preventDefault();
        if(desktopIcon.innerHTML == '') {
            desktopIcon.innerHTML = desktopIconHTML;
        }
    })
})*/

/*let i = 0;

desktopIcons.forEach((desktopIcon) => {
    if(desktopIcon.innerHTML != '') {
        desktopIcon.addEventListener('dragstart', (event) => {
            desktopIconHTML = desktopIcon.innerHTML;
        })
    }

    desktopIcon.addEventListener('dragover', (event) => {
        event.preventDefault();
    })

    desktopIcon.addEventListener('drop', (event) => {
        event.preventDefault();
        if(desktopIcon.innerHTML == '') {
            desktopIcon.innerHTML = desktopIconHTML;
        }
    })
})*/

// when desktopIcon is dragged, store that icon's HTML in a variable.
// when that desktop icon gets dropped on another desktop icon, set the desktopIcon's innerHTML to var. 
// delete the first icon's innerHTML