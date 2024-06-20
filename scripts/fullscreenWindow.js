export function fullscreenWindow(window, frame, fullscreenBtn, fullscreenBtnImg) {
    // on fullscreen click, top & left = 0, 
    // on frame drag, unminimize
    const screen = document.getElementById('screen');

    let savedWindowWidth;
    let savedWindowHeight;
    let savedWindowX;
    let savedWindowY;

    let savedMouseX; 
    let savedMouseY;
    let mouseX;
    let mouseY;

    let clickedFrame = false;

    fullscreenBtn.addEventListener('click', () => {
        if(window.classList.contains('fullscreen')) {
            unFullscreenOnClick();
        } else {
            savedWindowWidth = getComputedStyle(window).width;
            savedWindowHeight = getComputedStyle(window).height;
            savedWindowX = parseFloat(getComputedStyle(window).left);
            savedWindowY = parseFloat(getComputedStyle(window).top);
            // change fullscreenBtn img to un-fullscreen img.
            window.style.transition = 'all 0.1s ease';
            window.style.top = '-1px';
            window.style.left = '-1px';
            window.style.borderRadius = '0';
            window.style.width = getComputedStyle(screen).width;
            window.style.height = getComputedStyle(screen).height;
            window.classList.add('fullscreen');
            window.style.transition = 'all 0s';
            fullscreenBtnImg.src = "/PattyDOS/apps/images/fullscreen-exit.png";
        }
    })

    function unFullscreenOnClick() {
        console.log('un on click')
        window.style.transition = 'all 0.1s ease';

        window.style.width = savedWindowWidth;
        window.style.height = savedWindowHeight;
        window.style.left = savedWindowX + 'px';
        window.style.top = savedWindowY + 'px';
        console.log(savedWindowX);

        window.style.borderRadius = '8px'

        window.style.transition = 'all 0s'
        window.classList.remove('fullscreen');
        fullscreenBtnImg.src = "/PattyDOS/apps/images/fullscreen.png";
    }

    function unFullscreenOnDrag(event) {
        window.style.width = savedWindowWidth;
        window.style.height = savedWindowHeight;

        const xOffset = savedMouseX - mouseX;
        const yOffset = savedMouseY - mouseY;

        //window.style.left = event.clientX - ((parseFloat(getComputedStyle(window).width)) / 2) + 'px';
        //window.style.top = event.clientY + 16 - 'px';
        //window.style.left = mouseX;
        //window.style.top = mouseY;

        console.log(getComputedStyle(window).left);

        window.style.borderRadius = '8px'
        window.classList.remove('fullscreen');
        fullscreenBtnImg.src = "/PattyDOS/apps/images/fullscreen.png";

        // mouse has to be moving for it to work. what is being run on mousemove?
    }

    frame.addEventListener('mousemove', (event) => {
        mouseX = event.clientX;
        mouseY = event.clientY;
        //console.log(mouseX + ' ' + String(mouseY));
    });

    frame.addEventListener('mousedown', (event) => {
        // if currentMouseX != savedMouseX;
        //console.log(getComputedStyle(window).top + getComputedStyle(window).left);
        if(window.classList.contains('fullscreen')) {
            clickedFrame = true;
            //savedMouseX = event.clientX;
            //savedMouseY = event.clientY;
    
            frame.addEventListener('mousemove', (event) => {
                if(window.classList.contains('fullscreen')) {
                    if((savedMouseX != mouseX || savedMouseY != mouseY) && !event.target.classList.contains('frameBtnImage') && clickedFrame == true) {
                        unFullscreenOnDrag(event);
                    }
                }
            })
            frame.addEventListener('mouseup', () => {clickedFrame = false;});   
        }
    })

    // addeventlistner for resize, undate fullscreen scaling.
}