#### 安装

```shell
npm install eslint eslint-plugin-vue -D

// eslint-plugin-vue是为了对.vue支持代码检测
```

#### 1. 配置 vscode 插件配置项

##### (1). 点击 Vscode 的设置=>工作区=>文本编辑器=>格式化=>Format On Save 点击选中

##### (2). 点击 Vscode 的设置=>工作区=>扩展=>ESlint=>ESlist:Enable 点击选中

##### (3). vscode 工作区添加配置项

```
  {
    "editor.codeActionsOnSave": {
      "source.fixAll.eslint": true // 在保存时运行的代码操作类型
    },
  "editor.formatOnSave": true, // 是否在保存时格式化文件，前提是格式化程序必须可用
}
```

#### 2.在项目根目录下面，有一个.eslintrc.cjs 文件，它是对 eslint 进行配置的(以下 process1 就是 process,写 process 会报错，项目中还是用 process)

##### (1). env 具体配置参考：[https://eslint.org/docs/latest/user-guide/configuring/language-options#specifying-environments](https://eslint.org/docs/latest/user-guide/configuring/language-options#specifying-environments)

##### (2). parserOptions 具体配置参考：[https://eslint.org/docs/latest/user-guide/configuring/language-options#specifying-parser-options](https://eslint.org/docs/latest/user-guide/configuring/language-options#specifying-parser-options)

##### (3). extends 具体配置参考：[https://eslint.org/docs/latest/user-guide/configuring/configuration-files#extending-configuration-files](https://eslint.org/docs/latest/user-guide/configuring/configuration-files#extending-configuration-files)

##### (4). rules 具体配置参考：[https://eslint.org/docs/latest/user-guide/configuring/rules#configuring-rules](https://eslint.org/docs/latest/user-guide/configuring/rules#configuring-rules)

```
export default = {
  root: true, // 当前项目使用这个配置文件, 不会往父级目录找.eslintrc.js文件
  env: {
    browser: true, - 浏览器环境中的全局变量。
    node: true, - Node.js 全局变量和 Node.js 作用域。
    //es6: true, - 启用除了 modules 以外的所有 ECMAScript 6 特性（该选项会自动设置 ecmaVersion 解析器选项为 6）
  },
  extends: [ // 扩展配置
    'eslint:recommended', // eslint默认检验规则
    'plugin:vue/vue3-essential', // 支持vue3语句校验规则
    'plugin:prettier/recommended', // 优先使用prettier规则，越往后的插件会覆盖之前的校验规则
  ],
  parserOptions: {
    ecmaVersion: 'latest', // 使用最新规则
    sourceType: 'module', // 源类型 script/module
  },
  plugins: ['vue'], // 支持vue模板检测
  // 这里可以进行自定义规则配置
  // key：规则代号
  // value：具体的限定方式
  //   "off" or 0 - 关闭规则
  //   "warn" or 1 - 将规则视为一个警告（不会影响退出码）,只警告，不会退出程序
  //   "error" or 2 - 将规则视为一个错误 (退出码为1)，报错并退出程序
  rules: { // 自定义规则 - 其实上面集成后有很多内置的规则, 这里可以进行规则的一些修改
    'no-console': process1.env.NODE_ENV === 'production' ? 'warn' : 'off', // 上线环境用打印就报警告, 开发环境关闭此规则
    'no-debugger': process1.env.NODE_ENV === 'production' ? 'warn' : 'off', // debugger可以终止代码执行
    'no-multiple-empty-lines': 'off' // 不允许有连续多行空行(关闭规则)
    'no-unused-vars': 'off', // vue3 setup写法会提示变量未引用，这里关闭
  }
}
```
