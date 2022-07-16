# 概述

Vite + Vue3 + TypeScript + VueRouter + Pinia + NaiveUI + Tailwindcss + Eslint + Stylelint + Prettier + husky + Lint-staged搭建开发环境

> Vite 需要 [Node.js](https://nodejs.org/en/) 版本 >= 12.0.0。

# 基本配置

## 初始化工程

在项目所在的目录下执行`npm init vite@latest`，选择对应的模版，这里是选择Vue-ts模版来创建Vue3 + TypeScript工程

## 配置Eslint

1. 执行`npm install eslint --dev`引入Eslint依赖
2. 执行`npm init @eslint/config`，根据脚本选择对应的选项和配置，完成后会自动生成 .eslintrc.js配置文件
3. 使用airbnb规范时会提示eslint应在依赖中而不是开发依赖中，下面以禁用警告

```JavaScript
rules: {
    // 使用airbnb规范时会提示eslint应在依赖中而不是开发依赖中，下面以禁用警告
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
},
```
1. 补充一些配置

```TypeScript
// eslintrc.js
extends: [
  'plugin:vue/vue3-essential',
  'airbnb-base',
  'plugin:@typescript-eslint/recommended', // 新增
],
parser: 'vue-eslint-parser', // 新增

```
1.  配置运行Eslint指令

    在package.json中添加指令

```JSON
"script": {
    "lint": "eslint src --fix --ext .ts,.tsx,.vue,.js,.jsx",
}
```

    此时执行`npm run lint`就会对项目进行代码检查
1. 配置忽略检查的文件 .eslintignore

```text
# eslint 忽略检查 (根据项目需要自行添加)
node_modules
dist
```
1. 将 ESLint 插入 Vite dev server中
    1. 执行`npm install —save-dev @nabla/vite-plugin-eslint`
    2. 在vite.config.js加入插件配置

```JavaScript
import eslintPlugin from "@nabla/vite-plugin-eslint";

export default defineConfig({
  plugins: [eslintPlugin({
    eslintOptions: {
      cache: false // 禁用缓存
    },
  })],
});
```

> 该脚本会提示自动下载配置后所需要的额外以来，对于vue3 + TypeScript项目一般如下：

- eslint-plugin-vue@latest
- @typescript-eslint/eslint-plugin@latest
- @typescript-eslint/parser@latest
- eslint-config-airbnb-base@latest
- eslint-plugin-import@^2.25.2

## 配置Stylelint

1. 执行`npm install --save-dev stylelint stylelint-config-standard`引入以来以及默认配置
2. 新建 .stylelintrc.js

```JavaScript
module.exports = {
    extends: ['stylelint-config-standard']
}
```
1. 配置运行Stylelint指令

    在package.json中添加指令

```JavaScript
"style": "stylelint \"**/*.{vue,less,postcss,css,scss}\" --fix"
```

    此时执行`npm run style`就会对项目进行css代码检查，但是会有问题提示
    `When Lint ing something other than CSS，you shouLd instaLL an appropriate syntax，e.g. "post css-html"，and use the "custom Syntax" option`
    
1. 安装postcss语法解析

    以上问题是由于没能识别 .vue文件上的css代码，需要此依赖进行解析

    - 执行`npm install postcss-html --save-dev`，注意：使用scss、less等需要安装相应的模块
    - 将指令修改为：`"style": "stylelint \"**/*.{vue,less,postcss,css,scss}\" --fix --custom-syntax postcss-html"`
2. 配置忽略检查的文件 .stylelintignore

```text
# stylint 忽略检查 (根据项目需要自行添加)
node_modules
dist
```

> 当你的项目有使用到scss等预处理器时，还需要安装对应的stylelint模块：

如`stylelint-config-standard-scss`等

> 此外还可以添加关于css各个样式排序规则插件

执行`npm install -D stylelint-order stylelint-config-recess-order`

```JavaScript
// 在 .stylelint.js 进行新增插件
module.exports = {
  extends: [
    'stylelint-config-standard',
    'stylelint-config-prettier',
    'stylelint-config-recess-order', // 引入
  ],
  plugins: ['stylelint-order'], // 引入
};

```

## 配置Prettier

1. 执行`npm install prettier -D`
2.  .eslintrc.js

```JavaScript
module.exports = {
  ...
  plugins: [
    'vue',
    '@typescript-eslint',
    'prettier' // 添加 prettier
  ],
  extends: [
    'plugin:vue/essential',
    'airbnb-base',
    'plugin:@typescript-eslint/recommended',
    'prettier' // 添加 prettier
  ],
  ...
}
```
1. 由于项目也是使用到了eslint和stylelint，需要解决其检验的冲突，需要引入对应的插件进行解决
    1. 执行`npm install eslint-plugin-prettier eslint-config-prettier -D`
        - `eslint-plugin-prettier` 将 Prettier 的规则设置到 ESLint 的规则中。
        - `eslint-config-prettier` 关闭 ESLint 中与 Prettier 中会发生冲突的规则

        最后形成优先级：Prettier 配置规则 > ESLint 配置规则
    1. 在 .eslintrc.js中添加插件

```JavaScript
module.exports = {
  ...
  extends: [
    'plugin:vue/essential',
    'airbnb-base',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended' // 变为这样
  ],
  ...
}
```
    1. 执行`npm install --save-dev stylelint-config-prettier`安装处理与stylelint的冲突的插件
    2. 在 .stylelintrc.js添加插件

```JavaScript
{
  "extends": ["stylelint-config-standard", "stylelint-config-prettier" // 新增]
}
```
1. 新建并配置 .prettierrc.js

```JavaScript
module.exports = {
  // 一行最多 80 字符
  printWidth: 80,
  // 使用 4 个空格缩进
  tabWidth: 2,
  // 不使用 tab 缩进，而使用空格
  useTabs: false,
  // 行尾需要有分号
  semi: true,
  // 使用单引号代替双引号
  singleQuote: true,
  // 对象的 key 仅在必要时用引号
  quoteProps: 'as-needed',
  // jsx 不使用单引号，而使用双引号
  jsxSingleQuote: false,
  // 末尾使用逗号
  trailingComma: 'all',
  // 大括号内的首尾需要空格 { foo: bar }
  bracketSpacing: true,
  // jsx 标签的反尖括号需要换行
  jsxBracketSameLine: false,
  // 箭头函数，只有一个参数的时候，也需要括号
  arrowParens: 'always',
  // 每个文件格式化的范围是文件的全部内容
  rangeStart: 0,
  rangeEnd: Infinity,
  // 不需要写文件开头的 @prettier
  requirePragma: false,
  // 不需要自动在文件开头插入 @prettier
  insertPragma: false,
  // 使用默认的折行标准
  proseWrap: 'preserve',
  // 根据显示样式决定 html 要不要折行
  htmlWhitespaceSensitivity: 'css',
  // 换行符使用 lf
  endOfLine: 'auto',
};
```
1. 新增package.json指令

```JavaScript
"scripts": {
  "prettier": "prettier --write .",
}
```
1. 配置 .prettierignore

```text
# 忽略格式化文件 (根据项目需要自行添加)
node_modules
```

## 配置husky

执行`npx husky-init && npm install`

修改 .husky/pre-commit hook 文件的触发命令： `eslint src --fix --ext .ts,.tsx,.vue,.js,.jsx`

## 配置lint-staged

1. 安装 lint-staged

    执行`npm i lint-staged -D`
1. 在 package.json里增加 lint-staged 配置项

```JSON
"lint-staged": {
  "*.{vue,js,ts}": "eslint --fix"
},
```

    这行命令表示：只对 git 暂存区的 `.vue`、`.js`、`.ts` 文件执行 `eslint --fix`
1. 修改 .husky/pre-commit hook 的触发命令为：`npx lint-staged`

此时基本的husky+lint-staged配置就完成了

但是，我们还需要结合Prettier代码格式化，我们需要配置一下package.json

```JSON
"lint-staged": {
    "*.md": [
      "prettier --write"
    ],
    "*.{js,jsx,ts,tsx}": [
      "eslint --fix",
      "prettier --write"
    ],
    "*.css": [
      "prettier --write",
      "stylelint --fix"
    ],
    "*.vue": [
      "prettier --write",
      "eslint --fix",
      "stylelint --fix"
    ]
  }
```

# 可选插件

## 配置别名

```TypeScript
// vite.config.js
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import eslintPlugin from '@nabla/vite-plugin-eslint';
// 如果编辑器提示 path 模块找不到，则可以安装一下 @types/node -> npm i @types/node -D
import { resolve } from 'path';

export default defineConfig({
  plugins: [vue(), eslintPlugin()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'), // 配置别名
    },
  },
});
```

```TypeScript
// tsconfig.json
"baseUrl": ".",
"paths": {
  "@/*": ["src/*"]
 }

```

## Vue-Router

1. 执行`npm install vue-router@4`
2. 创建路由目录

```text
 └── src/
     ├── router/
         ├── index.ts  // 路由配置文件
```
1. 实现简单的路由

```TypeScript
// src/router/index.ts

import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/pages/home/index.vue'),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;

```
1. 在main.ts中引入router

```TypeScript
// main.ts
import Router from './router';
// 挂载Router
app.use(Router);

```

> 此事可能会有extensions（后缀）和resolver（别名）的报错，需要再对 .eslintrc.js 进行调整

先解决别名问题

执行 `npm install eslint-import-resolver-typescript -D`，补充对 typeScript 文件的别名以及文件后缀校验规则，添加一下配置：

```JavaScript
settings: {
    // 识别别名
    'import/resolver': {
      typescript: {
        directory: './tsconfig.json',
      },
    },
  },
```

这样子 eslint 就可以识别到ts中以及vite中的别名了

然后在解决 typeScript的后缀问题

```TypeScript
// .eslintrc.js
'import/extensions': [
  'error',
  'ignorePackages',
  {
    js: 'never',
    jsx: 'never',
    ts: 'never',
    tsx: 'never',
  },
],

```

## 引入Pinia

1. `npm i pinia --save`
2. 创建src/store/index.ts，引入pinia

```TypeScript
import { createPinia } from 'pinia'

const store = createPinia()

export default store
```
1. 在main.ts 中挂载

```TypeScript
import store from './store'

// 挂载pinia
app.use(store);
```

## 引入NaiveUI

1. `npm i -D naive-ui`
2. 挂载

```TypeScript
import naive from 'naive-ui';
// 挂载naive
app.use(naive);

```

## 引入 TailwindCss

1. 执行`npm install -D tailwindcss@latest postcss@latest autoprefixer@latest`

    由于 Tailwind [不会自动添加浏览器引擎前缀](https://www.tailwindcss.cn/docs/browser-support#vendor-prefixes)到生成的 CSS 中，我们建议您安装 [autoprefixer](https://github.com/postcss/autoprefixer) 去处理这个问题
1. 根目录下新建postcss.config.js

```JavaScript
// postcss.config.js
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  }
}
```
1. 在main.ts中`import "tailwindcss/tailwind.css"`
2. 生成tailwindcss配置文件

    执行`npx tailwindcss init --full`，—full指全部默认

```JavaScript
content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'], // 配置一下
```
1. 此时tailwindcss就生效了，刷新页面发现样式会变化，需要自行调整

# 构建配置以及优化

## 配置环境变量

项目根目录新建:`.env.development` :

```JavaScript
NODE_ENV=development

VITE_APP_BASE_URL='YOUR BASE URL'
```

项目根目录新建:`.env.production` :

```JavaScript
NODE_ENV=production

VITE_APP_BASE_URL='YOUR BASE URL'
```

组件中使用：

```JavaScript
console.log(import.meta.env.VITE_APP_BASE_URL)
```

## vite常用配置

### 启动服务配置

```TypeScript
//启动服务配置
  server: {
    port: 8000,
    open: true,
    https: false,
    proxy: {}
  },
```

### 开启静态资源压缩GZIP

> 开启 `gzip` 可以极大的压缩静态资源，对页面加载的速度起到了显著的作用。

1. 执行 `npm install -D vite-plugin-compression`
2. 在vite.config.js中进行配置plugins

```TypeScript
// gzip压缩 生产环境生成 .gz 文件
    viteCompression({
      verbose: true,
      disable: false,
      threshold: 10240,
      algorithm: 'gzip',
      ext: '.gz',
    }),
```