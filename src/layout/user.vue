<template>
  <el-form :model="user" label-width="120px">
    <el-form-item label="用户名">
      <el-input v-model="user.username" readonly />
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: 'user',
};
</script>

<script setup>
import { ref, computed } from 'vue';
import { initScroll, init } from '@/hooks/common';
let { base } = init();
initScroll();

let user = computed(() => base.userinfo);
</script>
<style scoped lang="scss"></style>
