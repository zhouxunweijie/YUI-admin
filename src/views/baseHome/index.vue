<template>
  <v-md-preview :text="text"></v-md-preview>
</template>

<script>
export default {
  name: 'home',
};
</script>

<script setup>
import { ref } from 'vue';
import text from './baseHome.md?raw';
import { initScroll } from '@/hooks/common';
initScroll();
</script>
<style scoped lang="scss"></style>
