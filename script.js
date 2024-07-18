console.log('script.js working')

// Context Menu
function createNewContextMenu() {
    const screen = document.getElementById('screen');
    const newContextMenu = document.createElement('div');
    newContextMenu.setAttribute('id', 'newContextMenu');

    window.addEventListener('contextmenu', (event) => {
        event.preventDefault();
        newContextMenu.innerHTML = ''

        if(!event.target.classList.contains('desktopIcon') && (event.target.getAttribute('id') != null && event.target.getAttribute('id').includes('homePage'))) {
            const mouseX = event.clientX;
            const mouseY = event.clientY;

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
            if((mouseX + newContextMenuWidth) <= (screenWidth + parseFloat(getComputedStyle(screen).left))) {
                newContextMenu.style.left = mouseX - screenX + 'px';
            } else {
                newContextMenu.style.left = mouseX - screenX - newContextMenuWidth + 'px';
            }    
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

// Set screen size to max while keeping 16/9 ratio
function setScreenSize() {
    const screen = document.getElementById('screen');
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

// DesktopIcon context menu
function desktopIconContextMenu() {
    const screen = document.getElementById('screen');
    const homePage = document.getElementById('homePage');
    const iconContextMenu = document.createElement('div');
    iconContextMenu.setAttribute('id', 'newContextMenu');
    homePage.addEventListener('contextmenu', (event) => {
        event.preventDefault();
        iconContextMenu.innerHTML = '';

        if(event.target.classList.contains('desktopIcon')) {
            const mouseX = event.clientX;
            const mouseY = event.clientY;
    
            const desktopIcon = event.target;
            let appName = String(desktopIcon.getAttribute('id')).slice(0, -4);
            //appName = appName.charAt(0).toUpperCase() + appName.slice(1)
            const iconApp = document.getElementById(`${appName}App`);
            const iconTaskbarApp = document.getElementById(`${appName}TaskbarApp`);
    
            let menuOptionOpen;
            if(iconApp.classList.contains('closed')) {
                menuOptionOpen = document.createElement('p')
                menuOptionOpen.setAttribute('class', `${desktopIcon.getAttribute('id')}Opener newContextMenuOption`);
                menuOptionOpen.textContent = 'Open';
            }
    
            let menuOptionPin;
            if(iconTaskbarApp.style.display == 'none') {
                menuOptionPin = document.createElement('p')
                menuOptionPin.setAttribute('class', 'newContextMenuOption');
                menuOptionPin.textContent = 'Pin To taskbar';
                menuOptionPin.addEventListener('click', () => {
                    iconTaskbarApp.style.display = 'flex'
                    const taskbarAppsDiv = document.getElementById('taskbarApps');
                    taskbarAppsDiv.style.transition =  'all 0.75s ease';
                    taskbarAppsDiv.style.left = `calc(50% - ${(parseFloat(getComputedStyle(taskbarAppsDiv).width) / 2) + 'px'})`
                });
            }

            const menuOptionRename = document.createElement('p')
            menuOptionRename.setAttribute('class', 'newContextMenuOption');
            menuOptionRename.textContent = 'Rename';

            const menuOptionDelete = document.createElement('p')
            menuOptionDelete.setAttribute('class', 'newContextMenuOption');
            menuOptionDelete.textContent = 'Delete';
    
            if(menuOptionOpen != undefined) iconContextMenu.append(menuOptionOpen);
            if(menuOptionPin != undefined) iconContextMenu.append(menuOptionPin);
            iconContextMenu.append(menuOptionRename);
            iconContextMenu.append(menuOptionDelete);
            screen.appendChild(iconContextMenu);
            const screenWidth = parseFloat(getComputedStyle(screen).width);
            const screenX = parseFloat(getComputedStyle(screen).left);
            const newContextMenuWidth = parseFloat(getComputedStyle(iconContextMenu).width);
            const newContextMenuHeight = parseFloat(getComputedStyle(iconContextMenu).height);
            if(mouseY <= newContextMenuHeight) {
                iconContextMenu.style.top = mouseY + 'px';
            } else {
                iconContextMenu.style.top = mouseY - newContextMenuHeight + 'px';
            }
            if((mouseX + newContextMenuWidth) <= screenWidth) {
                iconContextMenu.style.left = mouseX - screenX + 'px';
            } else {
                iconContextMenu.style.left = mouseX - screenX - newContextMenuWidth + 'px';
            } 
        }  
    })
    document.addEventListener('click', () => iconContextMenu.innerHTML = '');
}
desktopIconContextMenu();

// Set desktopIcon font size
function setFontSize() {
    const desktopIcons = document.querySelectorAll('.desktopIcon');
    const desktopIconTitles = document.querySelectorAll('.desktopIconTitle');
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
(function setIconPosition() {
    // if desktop icon position is another desktopIcon's position, move it by desktopIcon's width + 0.5px.
    const desktopIcons = document.querySelectorAll('.desktopIcon');
    desktopIcons.forEach((desktopIcon) => {
        desktopIcon.style.left = parseFloat(getComputedStyle(desktopIcon).left) + 0.5 + 'px';
        const desktopIconX = parseFloat(getComputedStyle(desktopIcon).left);
        if(getIconPosition().indexOf(desktopIconX) != getIconPosition().lastIndexOf(desktopIconX)) {
            desktopIcon.style.left = parseFloat(getComputedStyle(desktopIcon).left) + parseFloat(getComputedStyle(desktopIcon).width) + 0.5 + 'px';
            setIconPosition();
        }
    })

    function getIconPosition() {
        let xPositions = [];
        desktopIcons.forEach((desktopIcon) => {
            xPositions.push(parseFloat(getComputedStyle(desktopIcon).left))
        })
        return xPositions;
    }
})();

function moveDesktopIcons() {
    const screen = document.getElementById('screen');
    const desktopIcons = document.querySelectorAll('.desktopIcon');
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
        const dots = document.querySelectorAll('.iconDot');

        desktopIcon.addEventListener('mousedown', (event) => {
            if(event.button == 0) {
                holdingIcon = true;
                savedIconX = getComputedStyle(desktopIcon).left;
                savedIconY = getComputedStyle(desktopIcon).top;
            }
        })

        document.addEventListener('mouseup', positionIcons)
        function positionIcons() {
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
                        if(Math.round(((parseFloat(getComputedStyle(desktopIcon2).left)) + parseFloat(getComputedStyle(screen).left))) == Math.round(closestDotX) && Math.round((parseFloat(getComputedStyle(desktopIcon2).top))) ==  Math.round(closestDotY)) {
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
            dots.forEach((dot) => {
                dot.style.backgroundColor = 'transparent';
            })
        }
        
        window.addEventListener('mousemove', () => {
            if(holdingIcon) {
                desktopIcon.style.left = mouseX - parseFloat(getComputedStyle(screen).left) - (parseFloat(getComputedStyle(desktopIcon).width) / 2) + 'px';
                desktopIcon.style.top = mouseY - parseFloat(getComputedStyle(screen).top) - (parseFloat(getComputedStyle(desktopIcon).height) / 2) + 'px';
                dots.forEach((dot) => {
                    dot.style.backgroundColor = 'rgb(0, 0, 0, 0.1)';
                })
            }
        })

        window.addEventListener('resize', () => {
            holdingIcon = true;
            positionIcons();
            holdingIcon = false;
            // breaks if window is resized too fast.
        })

        document.addEventListener('DOMContentLoaded', () => {
            holdingIcon = true;
            positionIcons();
            holdingIcon = false;
        });
    })
}
moveDesktopIcons();

function setDateAndTime() {
    const date = new Date();
    const timeText = document.getElementById('taskbarTimeText');
    const dateText = document.getElementById('taskbarDateText');
    let stringAmPm = '';

    let h = date.getHours();
    let m = date.getMinutes();
    let s = date.getSeconds();

    h > 12 ? stringAmPm = 'pm' : stringAmPm = 'am';
    m < 10 ? m = '0' + m : m = m;
    s < 10 ? s = '0' + s : s = s;

    switch(h) {
        case 13: 
            h = 1;
            break;
        case 14: 
            h = 2;
            break;
        case 15: 
            h = 3;
            break;
        case 16:
            h = 4;
            break;
        case 17: 
            h = 5;
            break;
        case 18:
            h = 6;
            break;
        case 19:
            h = 7;
            break;
        case 20:
            h = 8;
            break;
        case 21:
            h = 9;
            break;
        case 22:
            h = 10;
            break;
        case 23:
            h = 11;
            break;
        case 24:
            h = 12;
            break;
    }

    timeText.innerText = `${h}:${m}:${s}${stringAmPm}`;

    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    dateText.innerText = `${day}/${month}/${year}`
}
setDateAndTime();
setInterval(setDateAndTime, 1000);