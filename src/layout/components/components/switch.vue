<!--  -->
<template>
  <div class="theme-toggler-content">
    <div class="switch" @click="togglerTheme">
      <div
        class="switch_action"
        :style="{ transform: `translate(${theme ? 0 : 20}px)` }"
      >
        <div class="switch__icon">
          <el-icon :size="13">
            <Moon v-if="theme" />
            <Sunny v-else />
          </el-icon>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { init } from '@/hooks/common';
import { Moon, Sunny } from '@element-plus/icons-vue';

let { common } = init();
let theme = computed(() => !!common.theme);

let togglerTheme = () => {
  if (theme.value) {
    common.setTheme('');
  } else {
    common.setTheme('dark');
  }
};
</script>
<style lang="scss" scoped>
.theme-toggler-content {
  background-color: var(--bg-color);
  color: var(--text-color);
  transition: border-color var(--el-transition-duration),
    background-color var(--el-transition-duration-fast);
  background-color: transparent;
  display: flex;
  align-items: center;
  border-radius: 50%;
  height: 24px;
  .switch {
    margin: 0;
    display: inline-block;
    position: relative;
    width: 40px;
    height: 20px;
    border: 1px solid var(--el-border-color);
    outline: none;
    border-radius: 10px;
    box-sizing: border-box;
    background: var(--el-bg-color-page);
    cursor: pointer;
    transition: border-color var(--el-transition-duration),
      background-color var(--el-transition-duration);

    .switch_action {
      position: absolute;
      top: 1px;
      left: 1px;
      border-radius: 50%;
      background-color: var(--bg-color);
      transform: translate(0);
      color: var(--text-color-light);
      transition: border-color var(--el-transition-duration),
        background-color var(--el-transition-duration),
        transform var(--el-transition-duration);

      .switch__icon {
        height: 16px;
        width: 16px;
        position: relative;
        height: 16px;
        width: 16px;
        .el-icon {
          position: absolute;
          top: 1px;
          left: 1px;
        }
      }
    }
  }
}
</style>
