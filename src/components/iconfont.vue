<template>
  <i
    v-if="type === '1'"
    :class="['iconfont', icon]"
    :style="{
      fontSize: size || '1.4em',
      color: color || 'var(--el-text-color-primary)',
    }"
  ></i>
  <i
    v-else
    :class="['icon', icon]"
    :style="{
      fontSize: size || '1.4em',
    }"
  ></i>
</template>

<script setup>
defineProps({
  icon: {
    type: String,
    require: true,
  },
  // 使用原色图标还是彩色图标，默认原色，1 原色 2彩色
  type: {
    type: String,
    require: true,
    default: '1',
  },
  size: String,
  color: String,
});
</script>

<style>
/* 原色图标库（可以根据换肤调整） */
@import '//at.alicdn.com/t/c/font_3740319_btot639y765.css';
/* 彩色图标库 */
@import '//at.alicdn.com/t/c/font_3751882_fuua2of1crk.css';
</style>
