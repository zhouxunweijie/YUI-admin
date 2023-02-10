<template>
  <div>
    <FullScreen ref="fullScreen" :width="'max-content'">
      <img src="/1.jpg" height="240" width="320" class="image"
    /></FullScreen>
    <div>{{ value }}</div>
    <div>
      <button name="放大" @click="open">放大</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FullScreen',
};
</script>

<script setup>
import { ref } from 'vue';
import FullScreen from './index.vue';
import { initScroll } from '@/hooks/common';
initScroll();
let fullScreen = ref();
let value = ref(0);
let open = () => {
  value.value++;
  fullScreen.value.open();
};
</script>
<style scoped lang="scss"></style>
