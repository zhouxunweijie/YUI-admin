<template>
  <div class="docx_Group">
    <div ref="docxRef"></div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { defaultOptions, renderAsync } from 'docx-preview';
let docxRef = ref();
let props = defineProps({
  url: {
    type: String,
    default: '',
  },
});

let docxOptions = {
  className: 'kaimo-docx-666', // string：默认和文档样式类的类名/前缀
  inWrapper: true, // boolean：启用围绕文档内容的包装器渲染
  ignoreWidth: false, // boolean：禁用页面的渲染宽度
  ignoreHeight: false, // boolean：禁止渲染页面高度
  ignoreFonts: false, // boolean：禁用字体渲染
  breakPages: true, // boolean：在分页符上启用分页
  ignoreLastRenderedPageBreak: true, // boolean：在 lastRenderedPageBreak 元素上禁用分页
  experimental: false, // boolean：启用实验功能（制表符停止计算）
  trimXmlDeclaration: true, // boolean：如果为true，解析前会从​​ xml 文档中移除 xml 声明
  useBase64URL: false, // boolean：如果为true，图片、字体等会转为base 64 URL，否则使用URL.createObjectURL
  useMathMLPolyfill: false, // boolean：包括用于 chrome、edge 等的 MathML polyfill。
  showChanges: false, // boolean：启用文档更改的实验性渲染（插入/删除）
  debug: false, // boolean：启用额外的日志记录
};

// 获取当前文件信息
let getDocxToBuffer = (url) => {
  return new Promise(async (resolve) => {
    const f = await (await fetch(url)).arrayBuffer();
    console.log(f, 'f');
    resolve(f);
  }).catch((err) => {
    ElMessage.warning('文件读取失败！');
  });
};
onMounted(async () => {
  let data = await getDocxToBuffer(props.url);
  renderAsync(
    data, // Blob | ArrayBuffer | Uint8Array, 可以是 JSZip.loadAsync 支持的任何类型
    docxRef.value, // HTMLElement 渲染文档内容的元素,
    null, // HTMLElement, 用于呈现文档样式、数字、字体的元素。如果为 null，则将使用 docxRef.value
    docxOptions, // 配置
  ).then((res) => {
    console.log('res---->', res);
  });
});
</script>
<style scoped lang="scss">
.docx_Group {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  padding-top: 373pt;
  overflow: auto;
}
</style>
