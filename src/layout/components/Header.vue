<!--  -->
<template>
  <div class="header_group">
    <div class="left">
      <Iconfont
        @click="setCollapse"
        :icon="isCollapse ? 'icon-zhankai' : 'icon-shouqi'"
      ></Iconfont>

      <el-breadcrumb separator="/" v-if="!isCollapse && winW > 800">
        <el-breadcrumb-item v-for="el in breadcrumbList">{{
          el.title
        }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="right">
      <!-- 控制主题开关 -->
      <Switch></Switch>

      <!-- 分享 -->
      <Share></Share>

      <!-- 控制全屏 -->
      <FullScreen></FullScreen>

      <!-- 设置 -->
      <Setting />

      <!-- 个人信息 -->
      <el-dropdown
        :hide-on-click="true"
        trigger="click"
        @command="onCommand"
        placement="bottom-end"
      >
        <div>
          <el-avatar shape="square" :size="36" fit="fill">
            <img src="/img/touxiang.png" />
          </el-avatar>
          <!-- <span class="el-dropdown-link">
            <el-icon class="el-icon--right"><ArrowDown /></el-icon>
          </span> -->
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="user"
              ><el-icon><User /></el-icon>个人信息</el-dropdown-item
            >
            <el-dropdown-item divided command="switchButton"
              ><el-icon><SwitchButton /></el-icon>退出登录</el-dropdown-item
            >
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { onBeforeRouteUpdate } from 'vue-router';
import Switch from './components/switch.vue';
import FullScreen from './components/FullScreen.vue';
import Share from './components/share.vue';
import Setting from './components/Setting.vue';
import { SwitchButton, User } from '@element-plus/icons-vue';
import { init } from '@/hooks/common.js';
import { getMapRoute } from '@/utils/router';
let { base, common, route, router } = init();

// 控制左侧菜单
let isCollapse = computed(() => common.isCollapse);
let winW = computed(() => common.winW);
const setCollapse = () => common.setCollapse(!isCollapse.value);

// 面包屑数据
let breadcrumbList = computed(() => base.breadcrumbList);

let onCommand = (name, props) => {
  switch (name) {
    case 'user':
      router.push({ name: 'user' });
      break;
    case 'switchButton':
      base.clearBase();
      router.push({ path: '/login' });
      break;
  }
};

onBeforeRouteUpdate(async (to, from) => {
  base.setBreadcrumb(getMapRoute(base.routeList, to.meta.id));
});
</script>
<style lang="scss" scoped>
.header_group {
  user-select: none;
  height: $headerH;
  line-height: $headerH;
  border-bottom: 1px solid var(--el-menu-border-color);
  padding: 0 12px;
  display: flex;
  justify-content: space-between;
  transition: all var(--el-transition-duration);
  font-size: 18px;

  .left {
    flex: 1;
    display: flex;
    align-items: center;
    :deep(.el-breadcrumb) {
      margin-left: 12px;
    }
  }

  .right {
    display: flex;
    align-items: center;
    justify-content: right;
    gap: 12px;

    .el-dropdown-link {
      margin-left: 10px;
      .el-icon {
        vertical-align: -3px;
      }
    }
    ::v-deep(.el-tooltip__trigger) {
      display: flex;
      align-items: center;
    }
  }
}
</style>
