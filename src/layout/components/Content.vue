<!--  -->
<template>
  <div class="content" id="content">
    <section ref="sectionRef">
      <router-view v-slot="{ Component, route }">
        <transition name="fade-transform" mode="out-in">
          <KeepAlive :include="keepAliveComponentNames">
            <component :is="Component" :key="route.name" />
          </KeepAlive>
        </transition>
      </router-view>
    </section>
  </div>
</template>

<script setup>
import { init } from '@/hooks/common.js';
import watermark from '@/utils/watermark.js';
import { ref, watch, onMounted, computed } from 'vue';
import mitt from '@/config/mitt';
let { base, common } = init();
let dom = {};
let sectionRef = ref();

// 绑定事件，当触发是修改滚动条位置
mitt.on('scrollChange', (obj) => {
  sectionRef.value.scrollTop = obj.top;
  sectionRef.value.scrollLeft = obj.left;
});

// 绑定事件, 用来获取当前滚动条的位置
mitt.on('getOffset', (callback) => {
  callback({
    top: sectionRef.value.scrollTop,
    left: sectionRef.value.scrollLeft,
  });
});

let keepAliveComponentNames = computed(() => base.keepAliveComponentNames);
onMounted(() => {
  watch(
    () => common.isWatermark,
    (value) => {
      if (value) {
        dom = watermark({
          watermarl_element: 'content',
          watermark_txt: base.userinfo.username + '   ' + base.userinfo.userId,
          watermark_width: 400,
          watermark_y: 15,
        });
      } else {
        dom.remove && dom.remove();
      }
    },
    {
      immediate: true,
    },
  );
});
</script>
<style lang="scss" scoped>
.content {
  width: calc(100vw - $asideW);
  height: calc(100vh - $headerH - $tagView);
  background-color: var(--el-bg-color);
  padding: 8px;
  position: relative;
  section {
    width: 100%;
    height: 100%;
    overflow: auto;

    :deep(.el-loading-parent--relative) {
      height: max-content;
      width: 100%;
    }
  }
}
.content:not(.isTagView) {
  height: calc(100vh - $headerH);
}
</style>
