console.log('notepad.js working');

import { windowInteractions } from "../../scripts/windowInteractions.js";

(() => {
    const notepadWindow = document.getElementById('notepadApp');
    const notepadFrame = document.getElementById('notepadFrame');
    const notepadFullscreenBtn = document.getElementById('notepadFullscreenBtn');
    const notepadIcon = document.getElementById('notepadIcon');
    const notepadTaskbarApp = document.getElementById('notepadTaskbarApp');
    const notepadAppState = document.getElementById('notepadAppState');
    const minimizeNotepadBtn = document.getElementById('minimizeNotepad');
    const closeNotepadBtn = document.getElementById('closeNotepadBtn');
    const topResizerNotepad = document.getElementById('topResizerNotepad');
    const leftResizerNotepad = document.getElementById('leftResizerNotepad');
    const rightResizerNotepad = document.getElementById('rightResizerNotepad');
    const bottomResizerNotepad = document.getElementById('bottomResizerNotepad');
    const topLeftResizerNotepad = document.getElementById('notepadTopLeftResizeHandle');
    const topRightResizerNotepad = document.getElementById('notepadTopRightResizeHandle');
    const bottomRightResizerNotepad = document.getElementById('notepadBottomRightResizeHandle');
    const bottomLeftResizerNotepad = document.getElementById('notepadBottomLeftResizeHandle');
    const notepadResizers = [topResizerNotepad, rightResizerNotepad, bottomResizerNotepad, leftResizerNotepad, topLeftResizerNotepad, topRightResizerNotepad, bottomRightResizerNotepad, bottomLeftResizerNotepad];
    windowInteractions(notepadWindow, notepadFrame, closeNotepadBtn, notepadFullscreenBtn, minimizeNotepadBtn, notepadIcon, notepadTaskbarApp, notepadAppState, notepadResizers);
})();

// Load Notepad Text 
(() => {
    const notepad = document.getElementById('notepadText');
    const notepadTextContent = localStorage.getItem('notepadTextContent');
    if(notepadTextContent) {
        notepad.value = notepadTextContent;
    }
})();

function saveNotepadText(text) {
    localStorage.setItem('notepadTextContent', text)
}

// Menu Bar
(function notepadMenuBar() {
    const screen = document.getElementById('screen')
    const notepadWindow = document.getElementById('notepadApp');
    const notepad = document.getElementById('notepadText');
    const menuBar = document.getElementById('notepadMenuBar')
    const menuBarFile = document.getElementById('notepadMenuBarFile')
    const menuBarEdit = document.getElementById('notepadMenuBarEdit')

    window.addEventListener('mousedown', (event) => {

        if(event.target.getAttribute('id') == 'notepadMenuBarFile') {
            if(document.querySelector('.menuBarOptionOptions') != null) {
                document.querySelector('.menuBarOptionOptions').remove();
            }

            const fileOptions = document.createElement('div');
            fileOptions.setAttribute('class', 'menuBarOptionOptions')
    
            const fileOptionSave = document.createElement('p');
            fileOptionSave.textContent = 'Save';
            fileOptionSave.setAttribute('class', 'menuBarOptionOptionsOption') 
    
            fileOptions.appendChild(fileOptionSave);
    
            notepadWindow.appendChild(fileOptions);

            fileOptionSave.addEventListener('mousedown', () => {saveNotepadText(notepad.value)})
        } else if(event.target.getAttribute('id') == 'notepadMenuBarEdit') {
            if(document.querySelector('.menuBarOptionOptions') != null) {
                document.querySelector('.menuBarOptionOptions').remove();
            }

            const notepadText = document.getElementById('notepadText');

            const fileOptions = document.createElement('div');
            fileOptions.setAttribute('class', 'menuBarOptionOptions')
            fileOptions.style.left = menuBarEdit.getBoundingClientRect().left - parseFloat(getComputedStyle(screen).left) + 'px';
            fileOptions.style.top = menuBarEdit.getBoundingClientRect().top + parseFloat(getComputedStyle(menuBar).height) + 'px';
            fileOptions.style.zIndex = getComputedStyle(notepadWindow).zIndex;
    
            const fileOptionFontAdd = document.createElement('p');
            fileOptionFontAdd.textContent = 'Font +';
            fileOptionFontAdd.setAttribute('class', 'menuBarOptionOptionsOption') // Wicked class name
            fileOptionFontAdd.addEventListener('mousedown', () => notepadText.style.fontSize = parseFloat(getComputedStyle(notepadText).fontSize) + 1 + 'px')
    
            const fileOptionFontRem = document.createElement('p');
            fileOptionFontRem.textContent = 'Font -';
            fileOptionFontRem.setAttribute('class', 'menuBarOptionOptionsOption')
            fileOptionFontRem.addEventListener('mousedown', () => notepadText.style.fontSize = parseFloat(getComputedStyle(notepadText).fontSize) - 1 + 'px')
    
            fileOptions.appendChild(fileOptionFontAdd);
            fileOptions.appendChild(fileOptionFontRem);
    
            screen.appendChild(fileOptions);
        } else if(document.querySelector('.menuBarOptionOptions') != null) {
            document.querySelector('.menuBarOptionOptions').remove();
        }

    })

})();