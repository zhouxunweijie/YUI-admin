> YUI-admin 是一个管理端模板解决方案，它是基于 vue3 和 element-plus，项目都是以 composition api 风格编写。

## 简介

项目使用 vue3 + pinia + vue-router@4.x + mock + sass + elementPlus 开发，基于 eslint + prettier 代码格式化风格的管理系统模板
项目目的：主要是提供大部分通用模板及公共方法等常用组件及效果的分享，尽量在项目使用时可以快速查到

在线 demo 演示地址：[https://zhouxunweijie.github.io/YUI-admin.github.io](https://zhouxunweijie.github.io/YUI-admin.github.io)

### 功能

```text
- 用户管理
	- 登录
	- 注销

- 权限验证
  - 动态路由

- 多环境发布 (对应serve,build)
  - dev
  - test
  - prod

- 全局功能
  - iconfont
  - 路由分享
  - 全局主题颜色更改
  - 动态侧边栏（支持多级路由嵌套）
  - 快捷导航(标签页)
  - 本地/后端 mock 数据
  - Screenfull全屏
  - 自适应收缩侧边栏
  - 动态主题切换
  - 可设置水印、tagview、logo、菜单栏搜索框隐藏显示

```

### 目录结构

```
admin-tmpl
├─ .eslintrc.js       # eslint
├─ .prettierrc.json       # prettier
├─ .prettierignore       # prettier忽略文件
├─ README.md
├─ dist               # 打包dist
├─ public             # 静态资源
├─ src                # 源码
│  ├─ api             # 接口请求
│  ├─ assets          # webpack打包的资源
|  ├─ mock            # mock服务
│  ├─ components      # 公共组件
│  ├─ config          # 全部配置
│  ├─ hooks           # 组件内常用方法
│  ├─ layout          # 全局Layout
│  ├─ login           # 登录页面
│  ├─ router          # 路由
│  ├─ store           # 全局store管理
│  ├─ style           # 全局样式
│  ├─ utils           # 全局公共方法
│  └─ views           # 所有业务页面
└─ vue.config.js      # vue-cli 配置

```

### 前端启动

```
  npm run dev
```
