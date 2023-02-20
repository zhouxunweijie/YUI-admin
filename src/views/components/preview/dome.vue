<template>
  <div>
    <div class="github-markdown-body">
      <pre>
        引用方式：
        import Preview from '@/views/components/preview/index.js';
      </pre>
    </div>
    <div class="github-markdown-body">
      <pre>
        图片预览调用方式: 
        let flag = Preview({
          type: 'img',
          url: '', // 访问路径
        });
      </pre>
      例子:
      <el-button @click="imgClick">图片</el-button>
    </div>

    <div class="github-markdown-body">
      <pre>
        视频预览调用方式: 
        let flag = Preview({
          type: 'video',
          url: '', // 访问路径
          poster: '', // 默认展示视频封面
        });
      </pre>
      例子:<el-button @click="videoClick">视频</el-button>
    </div>

    <div class="github-markdown-body">
      <pre>
        // 目前只支持文字表格的展示，暂不支持图片显示
        xlsx预览调用方式: 
        let flag = Preview({
          type: 'xlsx', // "xlsx || xls"
          url: '', // 访问路径
        });
      </pre>
      例子:<el-button @click="xlsxClick">xlsx</el-button>
    </div>

    <div class="github-markdown-body">
      <pre>
        // 目前只支持在线文档的默认展示，访问本地路径时插件报错
        docx预览调用方式: 
        let flag = Preview({
          type: 'docx', // "docx || doc"
          url: '', // 访问路径
        });
      </pre>
      例子:<el-button @click="docxClick">docx</el-button>
    </div>

    <div class="github-markdown-body">
      <pre>
        pdf预览调用方式: 
        let flag = Preview({
          type: 'pdf',
          url: '', // 访问路径
        });
      </pre>
      例子: <el-button @click="pdfClick">pdf</el-button>
    </div>

    <div class="github-markdown-body">
      <pre>
        txt预览调用方式: 
        let flag = Preview({
          type: 'txt',
          url: '', // 访问路径
        });
      </pre>
      例子:<el-button @click="txtClick">txt</el-button>
    </div>
  </div>
</template>

<script>
import Preview from './index';

export default {
  name: 'preview',
  methods: {
    videoClick() {
      let flag = Preview({
        type: 'video',
        url: '/123.mp4',
        poster: '/yuan.jpg',
      });
      console.log(flag, 'flag');
    },
    imgClick() {
      let flag = Preview({
        type: 'img',
        url: 'https://img2.baidu.com/it/u=3202947311,1179654885&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=500',
      });
      console.log(flag, 'flag');
    },
    xlsxClick() {
      let flag = Preview({
        type: 'xlsx', // "xlsx || xls"
        url: '/789.xlsx', // 当前只支持文字显示，暂不支持图片显示
      });
      console.log(flag, 'flag');
    },
    docxClick() {
      let flag = Preview({
        type: 'docx',
        url: 'https://501351981.github.io/vue-office/examples/dist/static/test-files/test.docx', // 当前只支持在线文档访问,本地文件访问有问题
      });
      console.log(flag, 'flag');
    },
    pdfClick() {
      let flag = Preview({
        type: 'pdf',
        url: '/789.pdf',
      });
      console.log(flag, 'flag');
    },
    txtClick() {
      let flag = Preview({
        type: 'txt',
        url: '/123456.txt',
      });
      console.log(flag, 'flag');
    },
  },
};
</script>
<style scoped lang="scss"></style>
