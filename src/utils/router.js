import router from '@/router/index';
import { BASE64_E } from '@/utils/crypto';

// 刷新当前路由
export const refresh = (tagName) => {
  let { currentRoute } = router;
  let name = tagName || currentRoute.value.name;
  router.replace({
    path: '/redirect/' + name,
  });
};

/**
 * 将当前路由在新的窗口打开
 * @param {*} route 包含path、name、component的对象
 */
export const openNewWindow = async (route) => {
  let { path, name, component } = route;
  if (path && name && component) {
    let url = router.resolve({
      name: name,
      query: {
        key: BASE64_E({
          path: path,
          name: name,
          component,
        })
      },
    });
    window.open(url.href, '_blank');
  }
};

/**
 * 
 * @param {*} arr 需要遍历的数组
 * @param {*} id 需要遍历出所有父级的子id
 * @param {*} result 默认数组
 * @returns Array 包含子级及父级的数组
 */
export const getMapRoute = (arr, id, result = []) => {
  for(let i = 0, len = arr.length; i < len; i++) {
    let item = arr[i];
    result.push(item);

    if(item.id == id) {
      if(result.length === 1) return result;
      return true
    }

    if(item.children && item.children.length > 0) {
      let flag = getMapRoute(item.children, id, result);
      if(flag) {
        return result
      }
    }

    result.pop()
  }

  return false
}

/**
 * 
 * @param {*} arr 数组
 * @param {*} childName 子级数组名称
 * @returns 返回扁平化后的数组
 */
export const flatten = (arr, childName = 'children', defaultArray = []) => {
  arr.forEach((item) => {
    defaultArray.push(item);
    Array.isArray(item.children) ? flatten(item.children, childName, defaultArray) : null
  })
  return defaultArray
}