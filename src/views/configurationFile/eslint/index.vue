<template>
  <div ref="eslint">
    <v-md-preview :text="text"></v-md-preview>
  </div>
</template>

<!-- 这个script主要是问了增加name属性，需要缓存时使用 -->
<script>
export default {
  name: 'eslint',
};
</script>

<script setup>
import loading from '@/hooks/loading';
import { ref } from 'vue';
import text from './eslint.md?raw';
import { initScroll } from '@/hooks/common';
initScroll();
let eslint = ref('');
let { openLoading, closeLoading } = loading(eslint);
</script>

<style scoped lang="scss">
.text {
  line-height: 32px;
  font-size: 28px;
}
</style>
