<template>
  <div>
    <!-- logo -->
    <div class="headerLogo" v-if="isLogo">
      <img src="/img/t1.gif" class="Fold" />
      <p v-if="!isCollapse" class="Expand">万能工具库</p>
    </div>
    <!-- search -->
    <div class="search" v-if="!isCollapse && isSearch">
      <el-input v-model="searchValue" placeholder="请输入搜索内容"></el-input>
    </div>
    <!-- menu -->
    <div>
      <el-scrollbar class="scrollbar_group">
        <el-menu
          :router="false"
          :class="[
            !isCollapse && isSearch ? 'fold' : 'unfold',
            isLogo ? 'logo' : 'unlogo',
          ]"
          :unique-opened="true"
          :default-active="defaultActive"
          @select="menuSelect"
          :collapse="isCollapse"
          :collapse-transition="false"
        >
          <menu-item
            v-for="item in routes"
            :key="item.id"
            :item="item"
          ></menu-item>
        </el-menu>
      </el-scrollbar>
    </div>
  </div>
</template>

<script setup>
import { init } from '@/hooks/common.js';
import MenuItem from './components/MenuItem.vue';
import { computed, watch, ref, onMounted } from 'vue';
import { isLink } from '@/utils/validate';
import { openNewWindow } from '@/utils/router';
import { debounce } from '@/utils/index.js';
let { base, route, router, common } = init();
let isCollapse = computed(() => common.isCollapse);
let searchValue = computed({
  set(value) {
    base.setSearchValue(value);
  },
  get() {
    return base.searchValue;
  },
});
let isLogo = computed(() => common.isLogo);
let isSearch = computed(() => common.isSearch);
let routes = computed(() => base.routes);
let mapRouteList = computed(() => base.mapRouteList);
let defaultActive = ref('/');
// 打开固定显示标签页
base.setDefaultTagView();

// 页面刷新默认打开菜单
// watchEffect监听方式会在切换路由时相应两次(有时),官网提示要监听到具体路径，而不是整个route
watch(
  () => route.fullPath,
  () => {
    defaultActive.value = '' + route.meta.id;
    base.addTagView(route.meta);
  },
  {
    immediate: true,
  },
);

// 点击左侧菜单进行页面的刷新(这里的index是route的id)
let menuSelect = (index, indexPath, item, routeResult) => {
  // 点击左侧刷新有点影响用户体验
  //refresh(index)
  // 当前菜单没有index属性就跳过
  if (index) {
    let route = mapRouteList.value.find((el) => el.id == index);
    let path = '';
    switch (route.type) {
      // 1 跳转当前项目内的路由
      case '1':
        router.push({ path: route.path });
        base.addTagView(route);
        break;
      // 2 新建窗口打开其他网站
      case '2':
        path = isLink(route.path) ? route.path : 'http://' + route.path;
        window.open(path, '_blank');
        break;
      // 2 新建窗口打开当前路由
      case '3':
        openNewWindow(route);
        break;
    }
  }
};

// 根据缓存默认设置一次
common.setCollapse(isCollapse.value);

onMounted(() => {
  window.addEventListener(
    'resize',
    debounce(() => {
      let winW =
        document.documentElement.clientWidth || document.body.clientWidth;
      let flag = winW < 800 ? true : false;
      if (flag !== isCollapse.value) {
        common.setCollapse(flag);
        common.setWindowWidth(winW);
      }
    }),
  );
});
</script>

<style lang="scss" scoped>
.headerLogo {
  height: $headerH;
  display: flex;
  align-items: center;
  justify-content: space-between;
  overflow: hidden;
  padding: 0 8px;
  .Expand {
    display: inline-block;
    font-weight: 500;
    font-size: 18px;
    white-space: nowrap;
    text-align: center;
    width: 60%;
  }

  .Fold {
    width: calc(var(--z-aside-fold-width) - 10px);
  }
}

.search {
  padding: 3px 8px;
}

:deep(.el-menu) {
  border-right: none;
  .el-tooltip__trigger {
    width: 100%;
  }
}
:deep(.el-menu.el-menu--vertical.unfold.unlogo) {
  height: calc(100vh);
}
:deep(.el-menu.el-menu--vertical.unfold.logo) {
  height: calc(100vh - var(--z-header-height));
}
:deep(.el-menu.el-menu--vertical.fold.unlogo) {
  height: calc(100vh - 38px);
}
:deep(.el-menu.el-menu--vertical.fold.logo) {
  height: calc(100vh - var(--z-header-height) - 38px);
}
:deep(.el-menu-item.is-active) {
  box-shadow: inset 4px 0px 0px var(--el-color-primary);
  transition: all 0.3s;
  background-color: var(--el-menu-hover-bg-color);
}
</style>
