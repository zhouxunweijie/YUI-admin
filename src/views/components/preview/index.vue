<template>
  <div class="el-overlay is-message-box" ref="previewRef">
    <div class="el-overlay-message-box">
      <div
        class="el-message-box preview"
        :class="[fullscreen ? 'show' : 'hide']"
      >
        <div class="el-message-box__header">
          <div class="el-message-box__title flexCenter">
            <!--v-if--><span>{{ props.title }}</span>
            <div class="header_utils">
              <Iconfont
                :icon="fullscreen ? 'icon-quxiaoquanping_o' : 'icon-quanping_o'"
                @click="handleFullScreen"
                size="24px"
              ></Iconfont>

              <Iconfont
                :icon="'icon-guanbi'"
                @click="close"
                size="24px"
              ></Iconfont>
            </div>
          </div>
        </div>
        <div class="el-message-box__content">
          <div class="el-message-box__container">
            <!-- 内容区域 -->
            <component
              :is="dom[componentName]"
              v-bind="props"
              :fullscreen="fullscreen"
            ></component>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, shallowReactive } from 'vue';
import Iconfont from '@/components/iconfont.vue';
import ImgComponent from './components/img.vue';
import VideoComponent from './components/video.vue';
import XlsxComponent from './components/xlsx.vue';
import DocxComponent from './components/docx.vue';
import PdfComponent from './components/pdf.vue';
import TxtComponent from './components/txt.vue';
const dom = shallowReactive({
  ImgComponent,
  VideoComponent,
  XlsxComponent,
  DocxComponent,
  PdfComponent,
  TxtComponent,
});

let fullscreen = ref(false);
let previewRef = ref();
let componentName = ref('');

let props = defineProps({
  title: {
    // 弹层名称
    type: String,
    default: '附件预览',
  },
  type: {
    // 打开文件类型
    type: String,
    default: '', // img | video | xlsx | doc
  },
  url: {
    // 打开文件路径
    type: String,
    default: '',
  },
  // 视频展示图片
  poster: {
    type: String,
    default: '',
  },
});

switch (props.type) {
  case 'img':
    componentName.value = 'ImgComponent';
    break;
  case 'video':
    componentName.value = 'VideoComponent';
    break;
  case 'xlsx':
    componentName.value = 'XlsxComponent';
    break;
  case 'docx':
    componentName.value = 'DocxComponent';
    break;
  case 'pdf':
    componentName.value = 'PdfComponent';
    break;
  case 'txt':
    componentName.value = 'TxtComponent';
    break;
}

// 点击全屏/缩小
let handleFullScreen = () => {
  fullscreen.value = !fullscreen.value;
};

let close = () => {
  document.body.removeChild(previewRef.value);
};
</script>
<style scoped lang="scss">
.preview {
  position: fixed;
  transition: all 0.6s;
  z-index: 9999;
  max-width: initial;
  padding: 0;

  &.show {
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
  }

  &.hide {
    width: 80vw;
    height: 80vh;
    top: 10vh;
    left: 10vw;
  }
}

.header_utils {
  float: right;
  :deep(.iconfont) {
    margin-left: 10px;
  }
}

.el-message-box__content {
  height: calc(100% - 49px);

  .el-message-box__container {
    height: 100%;
    // overflow: auto;
    position: relative;
  }
}
</style>
