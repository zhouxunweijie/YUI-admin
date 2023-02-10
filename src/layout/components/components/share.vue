<template>
  <el-tooltip class="item" effect="dark" content="分享" placement="bottom">
    <Iconfont icon="icon-weibiaoti-" @click="handleClick"></Iconfont>
  </el-tooltip>
</template>

<script setup>
import { openNewWindow } from '@/utils/router';
import { useRoute } from 'vue-router';
let route = useRoute();

const handleClick = () => {
  openNewWindow(route.meta);
};
</script>

<style></style>
