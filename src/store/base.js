import { defineStore } from 'pinia';
import { getUser, getRoutes } from '@/api/login';
import router from '@/router';

// 根据搜索条件筛选左侧菜单
let _mapRoute = (routes, searchValue) => {
  let arr = [];
  routes.forEach((item) => {
    let newItem = Object.assign({}, item);
    if (newItem.children && newItem.children.length > 0) {
      newItem.children = _mapRoute(newItem.children, searchValue);
      if (newItem.children.length > 0) {
        arr.push(newItem);
      }
    } else {
      if (newItem.title.indexOf(searchValue) > -1) {
        arr.push(newItem);
      }
    }
  });
  return arr;
};

export const useBaseStore = defineStore('base', {
  state() {
    return {
      breadcrumbList: [], // 面包屑展示数据
      tagViews: [], // 储存当前点击的菜单
      searchValue: '', // 搜索菜单名称
      routeList: [], // 储存动态路由数据
      mapRouteList: [], // 主要将多层级路由保存为同一级(用于查找方便)
      userinfo: {}, // 当前用户登录信息
      token: '', // 登录验证
    };
  },
  getters: {
    keepAliveComponentNames() {
      return this.tagViews.filter((el) => el.keepAlive).map(el => el.name);
    },
    routes() {
      return _mapRoute(this.routeList, this.searchValue);
    },
  },
  actions: {
    setBreadcrumb(list){
      this.breadcrumbList = list
    },
    // 设置token
    setToken(token) {
      this.token = token;
    },
    // 设置搜索条件
    setSearchValue(value) {
      this.searchValue = value;
    },
    // 设置tagView
    addTagView(route) {
      route = Object.assign({}, route); // 使响应式失
      if (route?.id) {
        if (!this.tagViews.some((el) => el.name === route.name)) {
          this.tagViews.push(route);
        }
      }
    },
    // 设置默认跳转固定路由
    setDefaultTagView() {
      // 当前没有跳转任何路由就跳转最后一个
      if (
        router.currentRoute.value.fullPath === '/' &&
        this.tagViews.length > 0
      ) {
        console.log('设置默认展示页面');
        router.push({ name: this.tagViews[this.tagViews.length - 1].name });
      }
    },

    // 删除当前tagview项
    delTagView(name) {
      this.tagViews = this.tagViews.filter((el) => el.name !== name);
      if (this.tagViews.length > 0) {
        router.push({
          name: this.tagViews[this.tagViews.length - 1].name,
          replace: true,
        });
      }
    },
    async getRoutes() {
      let { data: userInfo } = await getUser();
      this.userinfo = userInfo;
      let { data: routeList } = await getRoutes();
      this.routeList = routeList;
    },
    // 清空数据
    clearBase() {
      this.breadcrumbList = []; // 面包屑展示数据
      this.tagViews = []; // 储存当前点击的菜单
      this.searchValue = ''; // 搜索菜单名称
      this.routeList = []; // 储存动态路由数据
      this.mapRouteList = []; // 主要将多层级路由保存为同一级(用于查找方便)
      this.userinfo = {}; // 当前用户登录信息
      this.token = ''; // 登录验证
    }
  },
  // 使用该插件，开启数据缓存
  persist: {
    //这里存储默认使用的是session
    //key的名称
    key: 'base',
    //更改默认存储，默认存储为localStorage
    storage: window.localStorage,
    // 默认是全部进去存储
  },
});
