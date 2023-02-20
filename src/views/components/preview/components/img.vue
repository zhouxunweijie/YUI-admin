<template>
  <div class="img_Group">
    <img :src="url" class="test" />
  </div>
</template>

<script setup>
let { url } = defineProps({
  url: {
    type: String,
    default: '',
  },
});
</script>
<style scoped lang="scss">
.img_Group {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;

  img {
    max-width: 100%;
    max-height: 100%;
    object-fit: cover;
  }
}
</style>
