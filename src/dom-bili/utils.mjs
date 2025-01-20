// 通用dom操作
function getErrEl() {
  let errEl = document.body.errEl;

  if (errEl === undefined) {
    errEl = document.createElement('div');
    errEl.classList.add('no-found');
    errEl.remove = () => {};

    document.body.errEl = errEl;
  }

  return errEl;
}

const errEl = getErrEl();

export function $Q(selector) {
  let ele = document.querySelector(selector);
  if (ele == null) {
    // 边界情况, 当没找到时, 避免使用者操作null对象
    return errEl;
  } else {
    return ele;
  }
}

export function $QALL(query) {
  return document.querySelectorAll(query);
}

// 删除queryArr的元素
export function Remove(queryArr) {
  for (const query of queryArr) {
    $Q(query).remove();
  }
}

// 设置queryArr的元素的 backgroundColor 为 transparent
export function Transparent(queryArr) {
  for (const query of queryArr) {
    $Q(query).style.backgroundColor = "transparent";
  }
}

export function applyTransparentState(queryArr, isTransparent) {
  if (isTransparent) {
    for (const query of queryArr) {
      $Q(query).style.backgroundColor = "";
    }
  }
  else {
    Transparent(queryArr);
  }
}

// 设置queryArr的元素为 display = "none"
export function DisplayNone(queryArr) {
  for (const query of queryArr) {
    $Q(query).style.display = "none";

    // bilibili.css
    $Q(query).classList.add('monkey-hidden');
  }
}

export function applyDisplayState(queryArr, isNone) {
  if (isNone) {
    for (const query of queryArr) {
      $Q(query).style.display = "";
      $Q(query).classList.remove('monkey-hidden');
    }
  }
  else {
    DisplayNone(queryArr);
  }
}

// 设置queryArr的元素为 visibility = "hidden"
export function VisibilityHidden(queryArr) {
  for (const query of queryArr) {
    $Q(query).style.visibility = "hidden";
  }
}

export function applyVisibilityHiddenState(queryArr, isShow) {
  if (isShow) {
    for (const query of queryArr) {
      $Q(query).style.visibility = "";
    }
  }
  else {
    VisibilityHidden(queryArr);
  }
}

// 可以用参数fn这个函数处理childNode的所有父元素, 直到 <body> 标签
export function forEachParent(childNode, fn) {
  // 当前节点
  let currentNode = childNode;

  // 遍历父节点，直到 <body> 标签
  while (currentNode.parentNode && currentNode.parentNode !== document.body) {
    // 移动到父节点
    currentNode = currentNode.parentNode;
    // 调用传入的处理函数
    fn(currentNode);
  }
}

export function openUrl(url) {
  let myHref = document.createElement("a");
  myHref.href = url;
  myHref.target = "_blank";
  myHref.click();
}
