export default (function(designWidth) {
    let doc = document,
        win = window;
    let docEl = doc.documentElement;
    let rootItem, rootStyle;


    function refreshRem() {
        let width = win.screen.width
        let rem = width * 14 / designWidth;
        //兼容UC开始
        rootStyle = "html{font-size:" + rem + 'px !important}';
        rootItem = document.getElementById('rootsize') || document.createElement("style");
        if (!document.getElementById('rootsize')) {
            document.getElementsByTagName("head")[0].appendChild(rootItem);
            rootItem.id = 'rootsize';
        }
        if (rootItem.styleSheet) {
            rootItem.styleSheet.disabled || (rootItem.styleSheet.cssText = rootStyle)
        } else {
            try {
                rootItem.innerHTML = rootStyle;
            } catch (f) {
                rootItem.innerText = rootStyle;
            }
        }
        //兼容UC结束
        docEl.style.fontSize = rem + "px";
    };
    refreshRem();
    let contain = document.querySelector('.contain')
    let docH = document.documentElement.clientHeight
    contain.style.height = docH + 'px'
})