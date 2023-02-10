const el = document.documentElement || document.body;

export const setCss = (key, value) => {
  el.style.setProperty(key, value);
};

export const removeCss = (key) => {
  el.style.removeProperty(key);
};

export const addClass = (key) => {
  if (key.trim()) {
    el.classList.add(key);
  }
};

export const removeClass = (key) => {
  el.classList.remove(key);
};

export const setFullScreen = (flag) => {
  if (flag) {
    el.requestFullscreen();
  } else {
    el.exitFullscreen();
  }
};
