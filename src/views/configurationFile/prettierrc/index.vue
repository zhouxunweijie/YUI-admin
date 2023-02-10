<template>
  <v-md-preview :text="text"></v-md-preview>
</template>

<script>
export default {
  name: 'prettierrc',
};
</script>

<script setup>
import { ref } from 'vue';
import text from './prettier.md?raw';
import { initScroll } from '@/hooks/common';
initScroll();
</script>
<style scoped lang="scss"></style>
