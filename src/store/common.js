import { defineStore } from 'pinia';
import { foldWidth } from '@/style/variable.module.scss';
import { setCss, removeCss, addClass, removeClass } from '@/utils/baseCss';
export const useCommonStore = defineStore('common', {
  state() {
    return {
      isCollapse: false, // 是否折叠菜单
      isLogo: true, // 是否显示logo
      isSearch: true, // 是否显示菜单搜索功能
      isTagView: true, // 是否显示tagview
      isWatermark: true, // 是否加水印
      theme: '', // 当前主题，默认亮色主题
      primaryColor: '#33cabb', // 系统默认主题颜色
    };
  },
  getters: {},
  actions: {
    // 设置菜单是否折叠
    setCollapse(flag) {
      this.isCollapse = typeof flag === 'boolean' ? flag : !this.isCollapse;
      if (this.isCollapse) {
        setCss('--z-aside-width', foldWidth);
      } else {
        removeCss('--z-aside-width');
      }
    },
    // 设置主题
    setTheme(value) {
      if (value) {
        addClass(value);
      } else {
        this.theme ? removeClass(this.theme) : null;
      }
      this.theme = value;
    },
  },
  // 使用该插件，开启数据缓存
  persist: {
    //这里存储默认使用的是session
    //key的名称
    key: 'common',
    //更改默认存储，默认存储为localStorage
    storage: window.localStorage,
    // 默认是全部进去存储
  },
});
