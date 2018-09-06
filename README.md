# vue-cms

> 使用vue+mint-ui mui 开发 app 

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

## 用传统方式命令行把修改的代码提交到码云

1. git add .
2. git commit -m '提交信息'
3. git push

## 使用vscode

## mui 添加额外的图标
  1. 先把扩展图标的样式拷到项目中
  2. 拷贝字体 .ttf 拷贝到项目中
  3. 添加样式 如 mui-icon mui-icon-extra mui-icon-extra-cart

## 使用mui tabbar无法正常工作 需要修改类名 mui-tab-item

## 缩略图插件 vue-preview

## 区分vue 的路由 $router $route
  $route 是路由参数对象， params, query 都属于它
  $router 路由导航对象 用它可以使用 js代码 跳到不同的地址