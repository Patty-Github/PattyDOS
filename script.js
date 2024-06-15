console.log('script.js working')
const screen = document.getElementById('screen');
const homePage = document.getElementById('homePage');
const desktopIcons = document.querySelectorAll('.desktopIcon');
const desktopIconTitles = document.querySelectorAll('.desktopIconTitle');
let desktopIconHTML;

// Context Menu
function createNewContextMenu() {
    let mouseX;
    let mouseY;
    screen.addEventListener('mousemove', (event) => {
        mouseX = event.clientX;
        mouseY = event.clientY;
        //console.log(mouseX + ' ' + mouseY);
    });
    const newContextMenu = document.createElement('div');
    newContextMenu.setAttribute('id', 'newContextMenu');
    homePage.addEventListener('contextmenu', (event) => {
        event.preventDefault();
        newContextMenu.innerHTML = '';

        const newContextMenuOption1 = document.createElement('p')
        newContextMenuOption1.setAttribute('class', 'newContextMenuOption');
        newContextMenuOption1.textContent = 'Show Desktop Icons';

        const newContextMenuOption2 = document.createElement('p')
        newContextMenuOption2.setAttribute('class', 'newContextMenuOption');
        newContextMenuOption2.textContent = 'Personalize';

        newContextMenu.append(newContextMenuOption1, newContextMenuOption2);
        screen.appendChild(newContextMenu);
        const screenWidth = parseFloat(getComputedStyle(screen).width);
        const screenX = parseFloat(getComputedStyle(screen).left);
        const newContextMenuWidth = parseFloat(getComputedStyle(newContextMenu).width);
        const newContextMenuHeight = parseFloat(getComputedStyle(newContextMenu).height);
        if(mouseY <= newContextMenuHeight) {
            newContextMenu.style.top = mouseY + 'px';
        } else {
            newContextMenu.style.top = mouseY - newContextMenuHeight + 'px';
        }
        if((mouseX + newContextMenuWidth) <= screenWidth) {
            newContextMenu.style.left = mouseX - screenX + 'px';
        } else {
            newContextMenu.style.left = mouseX - screenX - newContextMenuWidth + 'px';
            console.log(screenWidth);
        }    
    });
    document.addEventListener('click', () => {newContextMenu.innerHTML = ''});
}
    
createNewContextMenu();

function setScreenSize() {
    let browserWindowWidth = window.innerWidth;
    let browserWindowHeight = window.innerHeight;
    let screenWidth = parseFloat(getComputedStyle(screen).width);
    let screenHeight = parseFloat(getComputedStyle(screen).height);
    //console.log(browserWindowWidth + 'px' + ' | ' + browserWindowHeight  + 'px' + ' | ' + screenWidth + ' | ' + screenHeight)

    if(browserWindowWidth < screenWidth) {
        screen.style.height = 'auto';
        screen.style.width = '100%'
    } else if(browserWindowHeight < screenHeight) {
        screen.style.height = '100%';
        screen.style.width = 'auto'
    }
}
setScreenSize();


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
window.addEventListener('resize', () => {setFontSize(); setScreenSize()})

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