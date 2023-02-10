<template>
  <div class="github-markdown-body">
    <pre><div class="flex"><span>设置localStorage</span><span>setL(key, value)</span></div>
<div class="flex"><span>获取localStorage</span><span>getL(key)</span></div>
<div class="flex"><span>设置sessionStorage</span><span>setS(key, value)</span></div>
<div class="flex"><span>获取sessionStorage</span><span>getS(key)</span></div></pre>
    <pre>
使用方法:
    import { setL } from '@/utils/storage.js';
    </pre>
  </div>
</template>

<script>
export default {
  name: 'storage',
};
</script>

<script setup>
import { ref } from 'vue';
import { initScroll } from '@/hooks/common';
initScroll();
</script>
<style scoped lang="scss">
.flex {
  display: flex;
  justify-content: space-between;
}
</style>
