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
            desktopIconTitles[i].style.fontSize = (desktopIconWidth / 4) + 'px';
        } 
        i++;
    })
}
setFontSize();
window.addEventListener('resize', () => {setFontSize(); setScreenSize()});

// HomePage
// when desktopIcon is being moved, when it is dropped, calculate it's position to the dots and make it's position the nearest one.
function moveDesktopIcons() {
    let mouseX;
    let mouseY;
    document.addEventListener('mousemove', (event) => {
        mouseX = event.clientX;
        mouseY = event.clientY;
    })
    desktopIcons.forEach((desktopIcon) => {
        let holdingIcon;

        desktopIcon.addEventListener('mousedown', () => {
            holdingIcon = true;
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
                    const dotRect = dot.getBoundingClientRect();
                    dotX = dotRect.top;
                    dotY = dotRect.left;
                    //console.log(`Dot X: ${dotX} Dot Y: ${dotY}`);
                    // 
                    let dotDistanceX = Math.abs(iconX) - Math.abs(dotX);
                    let dotDistanceY = Math.abs(iconY) - Math.abs(dotY);
                    let dotDistance = Math.abs(dotDistanceX) + Math.abs(dotDistanceY);
                    //console.log(dotDistance);
                    if(closestDot != null) {
                        if(dotDistance < closestDot) {
                            closestDotX = dotX;
                            closestDotY = dotY;
                            closestDot = dotDistance;
                        }
                    } else {
                        closestDotX = dotX;
                        closestDotY = dotY;
                        closestDot = dotDistance;
                    }
                    //console.log(dotDistanceX + ' ' + dotDistanceY);
                })
                console.log(`closest dot pos: ${closestDot} cloest dot X: ${closestDotX} closest dot Y: ${closestDotY}`);
                desktopIcon.style.left = closestDotX + 'px';
                desktopIcon.style.top = closestDotY + 'px';

                // put icon position to the closest dot.
            }
            holdingIcon = false; 
        })

        window.addEventListener('mousemove', () => {
            if(holdingIcon) {
                desktopIcon.style.left = mouseX + 'px';
                desktopIcon.style.top = mouseY + 'px';
                //console.log('mouse x pos: ' + mouseX + ' icon left: ' + (parseFloat(getComputedStyle(desktopIcon).left)));
                //console.log('mouse y pos: ' + mouseY + ' icon top: ' + (parseFloat(getComputedStyle(desktopIcon).top)));
            }
        })
    })
}
moveDesktopIcons();

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