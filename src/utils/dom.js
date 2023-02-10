// 获取当前dom距离浏览器边缘的偏移量
export const offset = (dom) => {
  let left = dom.offsetLeft, top = dom.offsetTop;

  if(dom.offsetParent) {
    let { left: offsetLeft , top: offsetTop} = offset(dom.offsetParent)
    left += offsetLeft
    top += offsetTop
  }

  return {
    left,
    top
  }
}