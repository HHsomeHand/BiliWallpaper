/**
 * 类似于querySelector, 但是异步, 并且不会报错, 不会导致脚本停止执行
 * like querySelector, but async, and never throw error to causes the script to stop executing
 * @param selector
 *  选择器, 和querySelector的参数一致
 *  selector, same to the param of querySelector
 * @param timeout
 *  timeout 为-1时 无限查询并等待
 *  If timeout is -1, query indefinitely and wait
 * @param onError
 *  回调函数, 在查找不到时执行
 *  callback function, it will be called when the query fails
 * @param isBlocking
 *  在查询失败时, 是否保持Promise为pending状态, 默认为false
 *  whether to keep the Promise in pending state when a query fails. The default is false
 * @returns {Promise<unknown>}
 */
export function queryAsync(selector, timeout = 1000, onError = null, isBlocking = false) {
    let errEl = document.body.errEl;

    if (errEl === undefined) {
        errEl = document.createElement('div');
        errEl.classList.add('no-found');
        errEl.remove = () => {};

        document.body.errEl = errEl;
    }


    // 这里不用reject是担心脚本报错后, 终止运行
    // We don't use reject because it will throw error and case the script to stop executing
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
                if (!isBlocking) {
                    resolve(errEl);
                }
                console.warn(`$Q_Async: Timeout: Cannot find element for selector "${selector}"`);
                return;
            }

            setTimeout(check, 100);
        }

        check();
    });
}