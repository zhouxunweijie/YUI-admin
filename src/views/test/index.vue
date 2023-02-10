<template>
  <div class="wrap">
    <div class="shadow"></div>
  </div>
</template>

<script>
export default {
  name: 'test',
};
</script>

<script setup>
import { ref } from 'vue';
import { initScroll } from '@/hooks/common';
initScroll();
</script>
<style scoped lang="scss">
@property --xPoint {
  syntax: '<length>';
  inherits: false;
  initial-value: 400px;
}
@property --yPoint {
  syntax: '<length>';
  inherits: false;
  initial-value: 300px;
}

.wrap {
  position: relative;
  margin: auto;
  width: 1000px;
  height: 600px;
  background: conic-gradient(
      from -45deg at var(--xPoint) var(--yPoint),
      hsla(170deg, 100%, 70%, 0.7),
      transparent 50%,
      hsla(219deg, 90%, 80%, 0.5) 100%
    ),
    linear-gradient(-45deg, #060d5e, #002268);
  animation: pointMove 2.5s infinite alternate linear;
}

.shadow {
  position: absolute;
  top: -300px;
  left: -330px;
  width: 430px;
  height: 300px;
  background: #fff;
  transform-origin: 100% 100%;
  transform: rotate(225deg);
  clip-path: polygon(-100% 100%, 200% 100%, 200% 500%, -100% 500%);
  box-shadow: 0px 0 0.5px hsla(170deg, 95%, 80%, 1),
    0px 0 1px hsla(170deg, 91%, 80%, 0.95),
    0px 0 2px hsla(171deg, 91%, 80%, 0.95),
    0px 0 3px hsla(171deg, 91%, 80%, 0.95),
    0px 0 4px hsla(171deg, 91%, 82%, 0.9), 0px 0 5px hsla(172deg, 91%, 82%, 0.9),
    0px 0 10px hsla(173deg, 91%, 84%, 0.9),
    0px 0 20px hsla(174deg, 91%, 86%, 0.85),
    0px 0 40px hsla(175deg, 91%, 86%, 0.85),
    0px 0 60px hsla(175deg, 91%, 86%, 0.85);
  animation: scale 2.5s infinite alternate linear;
}

@keyframes scale {
  50%,
  100% {
    transform: rotate(225deg) scale(0);
  }
}

@keyframes pointMove {
  100% {
    --xPoint: 100px;
    --yPoint: 0;
  }
}
</style>
