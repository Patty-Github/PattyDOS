export function setFocus(event, appId, taskbarId, taskbarApp, focused) {
    // event, clicked on target's id? (window only), taskbarAppId, taskbarApp, id to apply/remove
    if(event.target instanceof Element) {
        const target = event.target;
        const isApp = target.closest(appId)
        const isTaskbarApp = target.closest(taskbarId)
        if(isApp != null || isTaskbarApp != null) {
            taskbarApp.classList.add(focused)
            //console.log('focusing')
        } else {
            if(taskbarApp.classList.contains(focused)) {
                taskbarApp.classList.remove(focused)
                //console.log('unfocusing')
            }
        }
    }
}