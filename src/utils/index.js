
// 生成指定长度的随机字符串
export const uuid = (num) => {
  let library = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let key = "";
  for(let i = 0; i < library.length; i++){
    let index = Math.round(Math.random() * library.length);
    key += library.substring(index, index + 1)
  }
  return key
}

// 防抖
export const debounce = (fn, delay = 300) => {
  let timer = null;
  return function () {
    let arg = arguments;
    let that = this;
    if (timer) window.clearTimeout(timer);
    timer = window.setTimeout(() => {
      fn.apply(that, arg);
    }, delay);
  };
};

// 节流
export const throttle = (fn, delay = 300, only = false) => {
  let timer = null;
  return function () {
    let arg = arguments;
    let that = this;
    if (timer) return;
    only ? fn.apply(that, arg) : null;
    timer = window.setTimeout(() => {
      fn.apply(that, arg);
      timer = null;
    }, delay);
  };
};

// 传入秒返回 m:s格式或h:m:s的时间
export const formatTime = time => {
  let mapNum = num => num > 9 ? num : '0' + num;

  time = Number(time);
  let s = time % 60;
  let m = Math.floor(time / 60);
  if(m > 60) {
    let h = Math.floor(m / 60);
    m = m % 60;
    return `${mapNum(h)}:${mapNum(m)}:${mapNum(s)}`
  }
  return `${mapNum(m)}:${mapNum(s)}`
}

/**
 * 
 * @param {*} url 下载链接 + 参数
 * @param {*} callback 下载完成后触发回调
 */
export const download = (url, callback) => {
  let xhr = new XMLHttpRequest();
  xhr.open('get', url, true);
  xhr.responseType = 'blob';
  xhr.onload = function(){
    if(this.status === 200) {
      let blob = this.response;
      let reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onload = function(e) {
        let headerName = xhr.getResponseHeader('Content-disposition');
        let fileName = decodeURI(headerName).substring(20);
        let a = document.createElement('a');
        a.href = e.target.result;
        a.download = fileName;
        document.appendChild(a);
        a.click();
        document.removeChild(a);
        callback()
      }
    }
  }
}