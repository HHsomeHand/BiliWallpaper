export function queryAsync(selector, timeout = 1000) {
    return new Promise((resolve, reject) => {
        const startTime = Date.now();

        function check() {
            const ele = document.querySelector(selector);
            if (ele !== null) {
                resolve(ele); // 找到元素，结束 Promise
                return;
            }
            if (Date.now() - startTime > timeout) {
                reject(`$Q_Async: Timeout: Cannot find element for selector "${selector}"`);
                return;
            }

            setTimeout(check, 100);
        }

        check();
    });
}