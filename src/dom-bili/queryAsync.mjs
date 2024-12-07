const errEl = document.createElement('div');
errEl.classList.add('no-found');
errEl.remove = () => {};

// timeout 为-1时 无限查询并等待
export function queryAsync(selector, timeout = 1000, onError = null) {
    // 这里不用reject是担心脚本报错后, 终止运行
    return new Promise((resolve) => {
        const startTime = Date.now();

        function check() {
            const ele = document.querySelector(selector);
            if (ele !== null) {
                resolve(ele); // 找到元素，结束 Promise
                return;
            }
            if (timeout !== -1 && Date.now() - startTime > timeout) {
                if (onError !== null) {
                    onError();
                }
                resolve(errEl);
                console.warn(`$Q_Async: Timeout: Cannot find element for selector "${selector}"`);
                return;
            }

            setTimeout(check, 100);
        }

        check();
    });
}