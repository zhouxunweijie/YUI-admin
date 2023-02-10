<template>
  <el-tooltip class="item" effect="dark" content="设置" placement="bottom">
    <Iconfont icon="icon-shezhi1" @click="handleClick"></Iconfont>
  </el-tooltip>

  <div class="draverClass">
    <el-drawer
      v-model="drawerValue"
      :direction="direction"
      :size="480"
      title="设置"
    >
      <template #default>
        <el-form label-width="120px" label-position="left">
          <el-form-item label="logo">
            <el-radio-group v-model="isLogo">
              <el-radio :label="true">是</el-radio>
              <el-radio :label="false">否</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="搜索框">
            <el-radio-group v-model="isSearch">
              <el-radio :label="true">是</el-radio>
              <el-radio :label="false">否</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="tagview">
            <el-radio-group v-model="isTagView">
              <el-radio :label="true">是</el-radio>
              <el-radio :label="false">否</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="水印">
            <el-radio-group v-model="isWatermark">
              <el-radio :label="true">是</el-radio>
              <el-radio :label="false">否</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="主题颜色">
            <el-color-picker v-model="primaryColor" />
          </el-form-item>
        </el-form>
      </template>
    </el-drawer>
  </div>
</template>

<script setup>
import { ref, computed, watch, watchEffect } from 'vue';
import { setCss } from '@/utils/baseCss.js';
import { init } from '@/hooks/common.js';
let { common } = init();
const drawerValue = ref(false);
const direction = ref('rtl');

let isLogo = computed({
  set(value) {
    common.isLogo = value;
  },
  get() {
    return common.isLogo;
  },
});

let isSearch = computed({
  set(value) {
    common.isSearch = value;
  },
  get() {
    return common.isSearch;
  },
});

let isTagView = computed({
  set(value) {
    common.isTagView = value;
  },
  get() {
    return common.isTagView;
  },
});

let isWatermark = computed({
  set(value) {
    common.isWatermark = value;
  },
  get() {
    return common.isWatermark;
  },
});

let primaryColor = computed({
  set(value) {
    common.primaryColor = value;
  },
  get() {
    return common.primaryColor;
  },
});

watchEffect(() => {
  setCss('--z-system-color', common.primaryColor);
});

const handleClick = () => {
  drawerValue.value = true;
};
</script>

<style lang="scss" scoped>
.draverClass {
  font-size: 16px;
  line-height: 16px;
  :deep(.el-drawer__header) {
    margin-bottom: 0px;
    h4 {
      margin: 0;
    }
  }
}
</style>
