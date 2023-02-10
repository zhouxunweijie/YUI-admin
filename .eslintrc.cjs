// eslint-disable-next-line no-undef
module.exports = {
  env: {
    browser: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-essential',
    'plugin:prettier/recommended',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['vue'],
  rules: {
    'no-console': process1.env.NODE_ENV === 'production' ? 'warn' : 'off', // 上线环境用打印就报警告, 开发环境关闭此规则
    'no-debugger': process1.env.NODE_ENV === 'production' ? 'warn' : 'off', // debugger可以终止代码执行
    'no-multiple-empty-lines': 'warn', // 不允许有连续多行空行
    'vue/multi-word-component-names': 'off', //关闭eslint检查文件名是否为驼峰命名
    'no-unused-vars': 'off', // vue3 setup写法会提示变量未引用，这里关闭
  },
};
