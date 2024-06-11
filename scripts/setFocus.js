export function setFocus(event, appId, taskbarId, taskbarApp, focused) {
    if(event.target instanceof Element) {
        const target = event.target;
        const isApp = target.closest(appId)
        const isTaskbarApp = target.closest(taskbarId)
        if(isApp != null || isTaskbarApp != null) {
            taskbarApp.classList.add(focused)
        } else {
            if(taskbarApp.classList.contains(focused)) {
                taskbarApp.classList.remove(focused)
            }
        }
    }
}