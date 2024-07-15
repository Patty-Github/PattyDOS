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