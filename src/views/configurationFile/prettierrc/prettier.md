#### 安装

```shell
npm install prettier eslint-plugin-prettier eslint-config-prettier -D

// eslint-plugin-prettier eslint-config-prettier是为了prettier覆盖eslint配置
```

#### 1. 配置 vscode 插件配置项

##### (1). 点击 Vscode 的设置=>工作区=>扩展=>Prettier=>Prettier: Enable 点击选中

##### (2). vscode 工作区添加配置项

```
  "[vue]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
}
```

#### 2.在项目根目录下面，有一个.prettierrc.json 文件，它是对 prettier 进行配置的

##### (1). 具体配置参考：[https://www.prettier.cn/docs/options.html](https://www.prettier.cn/docs/options.html)

```
{
     /*  prettier的配置 */
    printWidth: 120, // 超过多少换行， 默认 80
    tabWidth: 2, // 指定每个缩进级别的空格数。默认 2
    useTabs: true, // 使用制表符而不是空格缩进。 默认 false
    semi: true, // 句尾添加分号。 默认 true
    singleQuote: true, // 使用单引号而不是双引号。默认false
    /*
        "as-needed"- 仅在需要时在对象属性周围添加引号。
        "consistent"- 如果对象中的至少一个属性需要引号，请引用所有属性。
        "preserve"- 尊重对象属性中引号的输入使用
    */
    quoteProps: "as-needed", // 默认 “as-needed”
    jsxSingleQuote: false, // 在 JSX 中使用单引号而不是双引号。默认false
    /**
        在多行逗号分隔的句法结构中尽可能打印结尾逗号。（例如，单行数组永远不会有尾随逗号。）
        "es5"- 在 ES5 中有效的尾随逗号（对象、数组等）。TypeScript 中的类型参数中没有尾随逗号。
        "none"- 没有尾随逗号。
        "all"- 尽可能使用尾随逗号（包括函数参数和调用）。要运行，以这种方式格式化的 JavaScript 代码需要一个支持 ES2017（Node.js 8+ 或现代浏览器）或下级编译的引擎。这还可以在 TypeScript 中的类型参数中启用尾随逗号（自 2018 年 1 月发布的 TypeScript 2.7 起支持）
    */
    trailingComma: "es5", // 默认“es5”
    bracketSpacing: true, // 在对象，数组括号与文字之间加空格 "{ foo: bar }"。 默认 true
    /*
        将 > 多行 HTML（HTML、JSX、Vue、Angular）元素放在最后一行的末尾，而不是单独放在下一行（不适用于自闭合元素）
        1.true- 例子：

        <button
            className="prettier-class"
            id="prettier-id"
            onClick={this.handleClick}>
            Click Here
        </button>


        2.false-例子

            <button
                className="prettier-class"
                id="prettier-id"
                onClick={this.handleClick}
                >
                Click Here
            </button>


    **/
    bracketSameLine: false, // 默认false
    /*
        "always"- 始终包括括号。例子：(x) => x
        "avoid"- 尽可能省略括号。例子：x => x
    */
    arrowParens: "avoid", //  (x) => {} 箭头函数参数只有一个时是否要有小括号。默认：“always”
    /*
        "always"- 如果超过宽度，则换行。
        "never"- 将每个展开成一行。
        "preserve"- 什么都不做，保持原样。首次在 v1.9.0 中可用
    */
    proseWrap: "preserve", // 默认值 "preserve"。因为使用了一些折行敏感型的渲染器（如GitHub comment）而按照markdown文本样式进行折行
    /*
        指定 HTML、Vue、Angular 和 Handlebars 的全局空格敏感性
        "css"- 尊重 CSSdisplay属性的默认值。
        "strict"- 所有标记周围的空白（或缺少空白）被认为是重要的。
        "ignore"- 所有标签周围的空白（或缺少它）被认为是微不足道的。
    */
    htmlWhitespaceSensitivity: "ignore", // 默认 “css”
    /*
        首次在 v1.19.0 中可用

        是否缩进 Vue 文件中的代码<script>和<style>标签。有些人（比如Vue 的创建者）不会缩进来保存缩进级别，但这可能会破坏编辑器中的代码折叠。

        false- 不要在 Vue 文件中缩进脚本和样式标签。
        true- 在 Vue 文件中缩进脚本和样式标签。
    */
    vueIndentScriptAndStyle: false, // 默认false
    /*
        "lf"– 仅换行 ( \n)，常见于 Linux 和 macOS 以及 git repos 内部
        "crlf"- 回车 + 换行字符 ( \r\n)，常见于 Windows
        "cr"- 仅回车字符 ( \r)，很少使用
        "auto"- 保持现有的行尾（一个文件中的混合值通过查看第一行之后使用的内容进行标准化）
    */
    endOfLine: "auto", // 结尾是 \n \r \n\r auto
    /*
        首次在 v2.1.0 中提供

        控制 Prettier 是否格式化文件中嵌入的引用代码。

        当 Prettier 识别出看起来你已经放置了一些代码的情况时，它知道如何在另一个文件中的字符串中格式化，例如在 JavaScript 中带有标签的标记模板中html或 Markdown 中的代码块中，默认情况下它会尝试格式化该代码。

        有时这种行为是不可取的，特别是在您可能不打算将字符串解释为代码的情况下。此选项允许您在默认行为 ( auto) 和完全禁用此功能 ( off) 之间切换。

        有效选项：

        "auto"- 如果 Prettier 可以自动识别嵌入代码，请格式化它。
        "off"- 永远不要自动格式化嵌入代码。
    */

}

```

#### 3. 对文件进行格式化

```shell
npx prettier --write .

// npx 调用项目内命令
// 比如我在项目内安装了prettier,全局没有安装，那么npm prettier会报错，使用npx prettier调用会找到当前node_modules/.bin下的执行文件
```

#### 4. 忽略格式化文件.prettierignore

```
node_modules
dist

```
