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
        newContextMenuOption1.addEventListener('click', showHideDesktopIcons);

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
    document.addEventListener('click', () => newContextMenu.innerHTML = '');

    function showHideDesktopIcons() {
        const desktopIcons = document.querySelectorAll('.desktopIcon')
        desktopIcons.forEach((desktopIcon) => {
            getComputedStyle(desktopIcon).display == 'flex' ? desktopIcon.style.display = 'none' : desktopIcon.style.display = 'flex';
        })
    }
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
            desktopIconTitles[i].style.fontSize = (desktopIconWidth / 4.5) + 'px';
        } 
        i++;
    })
}
setFontSize();
window.addEventListener('resize', () => {setFontSize(); setScreenSize();});

// HomePage
// when desktopIcon is being moved, when it is dropped, calculate it's position to the dots and make it's position the nearest one.
(function setIconPosition() {
    for(let i = 1; i < desktopIcons.length; i++){
        // if desktop icon position is another desktopIcon's position, move it by desktopIcon's width + 0.5px.
        if(parseFloat(getComputedStyle(desktopIcons[i]).left) == getIconPosition((i - 1))) {
            desktopIcons[i].style.left = parseFloat(getComputedStyle(desktopIcons[i]).left) + parseFloat(getComputedStyle(desktopIcons[i]).width) + 'px';
            setIconPosition();
        }
    }

    function getIconPosition(i) {
        return(parseFloat(getComputedStyle(desktopIcons[i]).left));
    }
})();
function moveDesktopIcons() {
    let mouseX;
    let mouseY;
    document.addEventListener('mousemove', (event) => {
        mouseX = event.clientX;
        mouseY = event.clientY;
    })
    desktopIcons.forEach((desktopIcon, index) => {
        let holdingIcon;
        let savedIconX;
        let savedIconY;

        desktopIcon.addEventListener('mousedown', () => {
            holdingIcon = true;
            savedIconX = getComputedStyle(desktopIcon).left;
            savedIconY = getComputedStyle(desktopIcon).top;
        })

        document.addEventListener('mouseup', () => {
            let dotX;
            let dotY;
            let closestDotX;
            let closestDotY;
            let closestDot;
            const iconRect = desktopIcon.getBoundingClientRect();
            let iconX = iconRect.left;
            let iconY = iconRect.top;
            // go through each dot, add x and y pos up, compare to desktopIcon pos.
            if(holdingIcon) {
                const dots = document.querySelectorAll('.iconDot');
                dots.forEach((dot) => {
                    // get dot position
                    const dotRect = dot.getBoundingClientRect();
                    dotX = dotRect.left;
                    dotY = dotRect.top;
                    // get distance from icon
                    let dotDistanceX = Math.abs(iconX - dotX);
                    let dotDistanceY = Math.abs(iconY - dotY);
                    let dotDistance = dotDistanceX + dotDistanceY;
                    if(closestDot != null) {
                        // if this dot is closer to icon than closest dot, this is closest dot.
                        if(Math.abs(dotDistance) < Math.abs(closestDot)) {
                            closestDotX = dotX;
                            closestDotY = dotY;
                            closestDot = dotDistance;
                        }
                    } else {
                        closestDotX = dotX;
                        closestDotY = dotY;
                        closestDot = dotDistance;
                    }
                })
                let spaceTaken;
                desktopIcons.forEach((desktopIcon2, index2) => {
                    if(index2 != index) {
                        if((parseFloat(getComputedStyle(desktopIcon2).left)) == closestDotX && Math.round((parseFloat(getComputedStyle(desktopIcon2).top))) ==  Math.round(closestDotY)) {
                            spaceTaken = true;
                        } else {
                            spaceTaken = false;
                        }
                    }
                })

                // put icon position to the closest dot if space not taken by another icon.
                if(spaceTaken) {
                    desktopIcon.style.left = savedIconX;
                    desktopIcon.style.top = savedIconY;
                } else {
                    desktopIcon.style.left = closestDotX - parseFloat(getComputedStyle(screen).left) + 'px';
                    desktopIcon.style.top = closestDotY - parseFloat(getComputedStyle(screen).top) + 'px';
                }
            }
            holdingIcon = false; 
        })

        window.addEventListener('mousemove', () => {
            if(holdingIcon) {
                desktopIcon.style.left = mouseX - parseFloat(getComputedStyle(screen).left) - (parseFloat(getComputedStyle(desktopIcon).width) / 2) + 'px';
                desktopIcon.style.top = mouseY - parseFloat(getComputedStyle(screen).top) - (parseFloat(getComputedStyle(desktopIcon).height) / 2) + 'px';
            }
        })
    })
}
moveDesktopIcons();

// add wallpaper customization 