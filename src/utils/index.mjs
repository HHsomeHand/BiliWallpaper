// 反复执行fnBool, 直到其返回true
export function UntilDone(fnBool, delay) {
  setTimeout(function () {
    if (!fnBool()) {
      UntilDone(fnBool, delay);
    }
  }, delay);
}

export function isObjEmpty(obj) {
  return Object.keys(obj).length === 0;
}