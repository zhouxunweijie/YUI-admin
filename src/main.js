import { createApp } from 'vue';
import router from '@/router';
import pinia from '@/store';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import 'element-plus/theme-chalk/dark/css-vars.css'; // 暗黑主题样式

// 引入v-md-editor预览组件
import VMdPreview from '@kangc/v-md-editor/lib/preview';
import '@kangc/v-md-editor/lib/style/preview.css';
import githubTheme from '@kangc/v-md-editor/lib/theme/github.js';
import '@kangc/v-md-editor/lib/theme/style/github.css';

// highlightjs 标签高亮
import hljs from 'highlight.js';

VMdPreview.use(githubTheme, {
  Hljs: hljs,
});

// 引入公共样式
import '@/style/index.scss';

import Iconfont from '@/components/iconfont.vue';
import App from './App.vue';
import '@/mock'; // 拦截请求

const app = createApp(App);
app.component('Iconfont', Iconfont);
app.use(router).use(pinia).use(ElementPlus).use(VMdPreview);
app.mount('#app');
