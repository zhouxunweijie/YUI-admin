<!--  -->
<template>
  <div class="container_group">
    <!-- 左侧容器 -->
    <div class="container_left">
      <!-- 左侧导航栏 -->
      <Aside></Aside>
    </div>

    <!-- 右侧容器 -->
    <div class="container_right">
      <!-- 头部 -->
      <Header></Header>
      <!-- 动态路由标签栏 -->
      <TagView v-if="isTagView"></TagView>
      <!-- 内容区 -->
      <Content :class="{ isTagView: isTagView }"></Content>
    </div>
  </div>
</template>

<script setup>
import { init } from '@/hooks/common.js';
import { computed } from 'vue';
import Aside from './components/Aside.vue';
import Header from './components/Header.vue';
import Content from './components/Content.vue';
import TagView from './components/tagView.vue';

let { common } = init();
let isTagView = computed(() => common.isTagView);
</script>

<style scoped lang="scss">
.container_group {
  display: flex;
  height: 100%;
  overflow: hidden;
  .container_left {
    width: $asideW;
    height: 100%;
    transition: var(--el-transition-duration);
    box-sizing: content-box;
    border-right: solid 1px var(--el-menu-border-color);
  }

  .container_right {
    width: calc(100% - var(--z-aside-width));
    transition: var(--el-transition-duration);
  }
}
</style>
