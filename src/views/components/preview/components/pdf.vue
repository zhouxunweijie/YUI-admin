<template>
  <div class="pdf_Group">
    <iframe
      :src="props.url"
      frameborder="0"
      width="100%"
      height="100%"
    ></iframe>
  </div>
</template>

<script setup>
let props = defineProps({
  url: {
    type: String,
    default: '',
  },
});
</script>
<style scoped lang="scss">
.pdf_Group {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  overflow: auto;
}
</style>
