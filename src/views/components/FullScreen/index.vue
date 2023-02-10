<template>
  <div
    class="container"
    ref="container"
    :style="{
      width: width,
      height: height,
    }"
  >
    <div
      class="slotGroup"
      ref="slotGroup"
      @click="groupClick"
      :class="[groupClass]"
    >
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { offset } from '@/utils/dom';
let container = ref();
let slotGroup = ref();
let groupClass = ref('');
let cloneDom = null; // 存放克隆的元素
let { isClickModel, width } = defineProps({
  isClickModel: {
    default: true,
    type: Boolean,
  },
  width: {
    default: '100%',
    type: String,
  },
  height: {
    default: '100%',
    type: String,
  },
});

let { modelClick } = defineEmits(['modelClick']);

let groupClick = () => {
  if (slotGroup.value.className.indexOf('full') > -1) {
    if (isClickModel) {
      close();
    }
    modelClick && modelClick();
  }
};

let open = () => {
  cloneDom = slotGroup.value.cloneNode(true);
  let group = slotGroup.value;
  let w = group.clientWidth;
  let h = group.clientHeight;

  let { left, top } = offset(group);
  group.style.position = 'fixed';
  group.style.width = w + 'px';
  group.style.height = h + 'px';
  group.style.left = left + 'px';
  group.style.top = top + 'px';
  group.style.zIndex = '9999';
  groupClass.value = 'full';
  document.body.appendChild(group);
  container.value.appendChild(cloneDom);
};

let close = () => {
  groupClass.value = 'nofull';
  window.setTimeout(() => {
    cloneDom && container.value.removeChild(cloneDom);
    slotGroup.value.style = '';
    groupClass.value = '';
    container.value.appendChild(slotGroup.value);
    cloneDom = null;
  }, 600);
};

defineExpose({
  open,
  close,
});
</script>
<style scoped lang="scss">
@keyframes full {
  100% {
    width: 100vw;
    height: 100vh;
    left: 0;
    top: 0;
  }
}

@keyframes nofull {
  0% {
    position: fixed;
    width: 100vw;
    height: 100vh;
    left: 0;
    top: 0;
    background-color: rgba($color: #000000, $alpha: 1);
  }
}
.container {
  width: 100%;
  height: 100%;
}

.slotGroup {
  height: 100%;
  &.nofull {
    animation: nofull 0.6s;
    :deep(.image) {
      width: 100%;
      height: 100%;
      transition: all 0.6s;
    }
  }

  &.full {
    animation: full 0.6s;
    animation-fill-mode: forwards;
    background-color: rgba($color: #000000, $alpha: 1);
    :deep(.image) {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }
}
</style>
