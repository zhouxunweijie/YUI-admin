<template>
  <div class="video_Group">
    <Video ref="VideoRef" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import Video from '@/views/components/video/index.vue';
let VideoRef = ref();
let { url, poster } = defineProps({
  url: {
    type: String,
    default: '',
  },
  poster: {
    type: String,
    default: '',
  },
});

onMounted(() => {
  VideoRef.value.init({
    src: url,
    poster: poster,
  });
});
</script>
<style scoped lang="scss">
.video_Group {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}
</style>
