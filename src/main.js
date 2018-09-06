// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import VueResource from 'vue-resource'

import Vuex from 'vuex'

// 导入mui样式
import './lib/mui/css/mui.css'
import './lib/mui/css/icons-extra.css'
// 按需导入mint-ui中的组件
// import {
//   Header
// } from 'mint-ui'
// import {
//   Swipe,
//   SwipeItem
// } from 'mint-ui';
// import {
//   Button
// } from 'mint-ui';
// import {
//   Lazyload
// } from 'mint-ui'; //图片懒加载
import MintUI from 'mint-ui' // 全部加载
import 'mint-ui/lib/style.css' // 导入mint-ui样式

import VuePreview from 'vue-preview' // 安装的图片预览插件
Vue.use(VuePreview)

// Vue.component(Header.name, Header)
// Vue.component(Swipe.name, Swipe);
// Vue.component(SwipeItem.name, SwipeItem);
// Vue.component(Button.name, Button);

Vue.use(MintUI)

Vue.config.productionTip = false
Vue.use(VueResource)
Vue.use(Vuex)

// 把购物车的数据从本地读取出来 若是一开始 则为[]
let car = JSON.parse(localStorage.getItem('car') || '[]');
const store = new Vuex.Store({
  state: { // 想当于 data
    car: car // 将购车中商品的数据保存到一个数组 里面保存商品信息对象 如 
    // { id: 商品id , count: 商品数量, price: 商品的单价, selected: 是否被选中}
  },
  getters: { // 相当于computed filter
    getAllCount(state) {
      let c = 0;
      state.car.forEach(item => {
        c += item.count;
      })
      return c;
    },

    // 获取每个商品的数量 实现思路： 循环遍历出car 保存到一个对象中， 商品的id 作为键， count作为值 ，如 { 0： 1， 1： 3}
    getGoodsCount(state) {
      let tmpObj = {};
      state.car.forEach(item => {
        tmpObj[item.id] = item.count;
      })

      return tmpObj;
    },

    // 判断商品是否被选中
    getGoodsStatus(state) {
      let tmpObj = {};
      state.car.forEach(item => {
        tmpObj[item.id] = item.selected;
      })
      return tmpObj;
    },

    // 获取购物车的总数和总价
    getGoodsCountAndPrice(state) {
      let tmpObj = {
        count: 0, // 勾选的数量
        amount: 0, // 勾选的总价 
      }

      state.car.forEach(item => {
        if (item.selected) {
          tmpObj.count += item.count;
          tmpObj.amount += item.price * item.count;
        }
      })

      return tmpObj;
    }
  },
  mutations: { // 相当于 methods
    addToCar(state, goodsinfo) {
      // 点击加入购物车 把商品信息加到购物车上
      // 分析： 
      // 1. 如果购物车之前有此商品， 所以只需要更新数量就行
      // 2. 如果没有 直接把商品数据 push 到car 中

      var flag = false; // 是否有此商品的标志

      state.car.some(item => {
        if (item.id == goodsinfo.id) {
          item.count += parseInt(goodsinfo.count);
          flag = true;
          return true;
        }

      });

      if (!flag) {
        // 没有该商品
        state.car.push(goodsinfo);
      }

      // 当更新car之后 存储到本地的localStorage中
      localStorage.setItem('car', JSON.stringify(state.car));

    },

    // 修改商品购物信息
    updateGoodsinfo(state, goodsinfo) {
      state.car.some(item => {
        if (item.id == goodsinfo.id) {
          item.count = parseInt(goodsinfo.count);
          return true;
        }
      })

      // 修改数据的时候重新保存到localStorage中
      localStorage.setItem('car', JSON.stringify(state.car));
    },

    //根据id 删除商品
    removeFormCar(state, id) {
      state.car.some((item, i) => {
        if (item.id == id) {
          state.car.splice(i, 1);
          return true;
        }
      })
      // 当删除car之后 存储到本地的localStorage中
      localStorage.setItem('car', JSON.stringify(state.car));

    },

    // 更新状态
    updateSelected(state, info) {
      state.car.some(item => {
        if (item.id == info.id) {
          item.selected = info.selected;
          return true;
        }
      })

      // 把购物车商品的状态重新保存到localStorage中
      localStorage.setItem('car', JSON.stringify(state.car));
    }
  }
})
//Vue.use(Lazyload)

// 全局配置vue-source请求接口
Vue.http.options.root = 'http://vue.studyit.io';

// 全局设置post请求表单数据的格式
Vue.http.options.emulateJSON = true;

// 导入moment
import moment from 'moment'
// 定义格式化时间的全局过滤器 (使用moment格式化时间 pattern 默认为YYYY-MM-DD HH:mm:ss)
Vue.filter('dateFormat', (datestr, pattern = 'YYYY-MM-DD HH:mm:ss') => {
  return moment(datestr).format(pattern);
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  template: '<App/>'
})
