import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/tabbar/home.vue'
import Member from '@/components/tabbar/member.vue'
import Shopcar from '@/components/tabbar/shopcar.vue'
import Search from '@/components/tabbar/search.vue'
import NewsList from '@/components/news/newsList.vue'
import NewsInfo from '@/components/news/newsinfo.vue'
import PhotoList from '@/components/photos/photoList.vue'
import PhotoInfo from '@/components/photos/photoinfo.vue'
import GoodsList from '@/components/goods/goodsList.vue'
import GoodsInfo from '@/components/goods/goodsInfo.vue'
import GoodsDesc from '@/components/goods/goodsdes.vue'
import GoodsComment from '@/components/goods/goodscomment.vue'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    redirect: '/home'
  }, {
    path: '/home',
    component: Home
  }, {
    path: '/member',
    component: Member
  }, {
    path: '/shopcar',
    component: Shopcar
  }, {
    path: '/search',
    component: Search
  }, {
    path: '/home/newslist',
    component: NewsList
  }, {
    path: '/home/newsinfo/:id',
    component: NewsInfo
  }, {
    path: '/home/photolist',
    component: PhotoList
  }, {
    path: '/home/photoinfo/:id',
    component: PhotoInfo
  }, {
    path: '/home/goodslist',
    component: GoodsList
  }, {
    path: '/home/goodsinfo/:id',
    name: 'goodsinfo',
    component: GoodsInfo
  }, {
    path: '/home/goodsdesc/:id',
    name: 'goodsDesc',
    component: GoodsDesc
  }, {
    path: '/home/goodscomment/:id',
    name: 'goodsComment',
    component: GoodsComment
  }],
  linkActiveClass: 'mui-active' // 覆盖默认的路由高亮的类(router-link-active)
})
