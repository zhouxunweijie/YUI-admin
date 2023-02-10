<template>
  <!-- 根据窗口变化而变化,控制显示窗口大小，默认同body大小 -->
  <div class="container" ref="container">
    <router-view></router-view>
  </div>
</template>
<script setup>
import { init } from '@/hooks/common.js';
let { router } = init();
</script>
<style scoped>
.container {
  height: 100vh;
  width: 100vw;
  overflow: auto;
  /* position: relative; */
  /* background-color: var(--el-bg-color); */
}
</style>
