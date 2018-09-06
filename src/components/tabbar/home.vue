<template>
  <div>
    <!-- 轮播图 -->
    <swiper :lunboList="lunboList" :isFull="false"></swiper>

    <!-- 六宫格 -->
    <ul class="mui-table-view mui-grid-view mui-grid-9">
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/home/newslist">
              <img src="../../assets/menu1.png" alt="">
              <div class="mui-media-body">新闻资讯</div></router-link></li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/home/photolist">
              <img src="../../assets/menu2.png" alt="">
              <div class="mui-media-body">图片分享</div></router-link></li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/home/goodslist">
              <img src="../../assets/menu3.png" alt="">
              <div class="mui-media-body">商品购买</div></router-link></li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
              <img src="../../assets/menu4.png" alt="">
              <div class="mui-media-body">留言反馈</div></a></li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
              <img src="../../assets/menu5.png" alt="">
              <div class="mui-media-body">视频专区</div></a></li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
              <img src="../../assets/menu6.png" alt="">
              <div class="mui-media-body">联系我们</div></a></li>
    </ul>
  </div>
</template>

<script>
import Swiper from '@/components/subcomponents/swiper'
export default {
  data() {
    return {
      lunboList: []
    }
  },
  methods: {
    // 获取轮播图数据方法
    getLunbo() {
      // this.$http.get('api/getlunbo').then(res => {
      //   console.log(res);
      // })

      this.lunboList = [{
        src: 'https://img10.360buyimg.com/mobilecms/s140x140_jfs/t19567/29/2374670325/217523/11b419b5/5af2a061Nbf0829f5.jpg!q90.webp'
      }, {
        src: 'https://img12.360buyimg.com/mobilecms/s140x140_jfs/t2680/362/4117856282/85167/c8064fa6/57a9562bN6b86d548.jpg!q90.webp'
      }]
    }
  },

  components: {
    Swiper
  },

  created() {
    this.getLunbo();
  },
  mounted() { }
}
</script>

<style lang="scss" scoped>
.banner {
  height: 200px;
}

.mint-swipe-item {
  &:nth-child(1) {
    background-color: red;
  }
  &:nth-child(2) {
    background-color: blue;
  }
  &:nth-child(3) {
    background-color: green;
  }
}

.mui-grid-view.mui-grid-9 {
  background-color: #fff;

  .mui-table-view-cell {
    border: 0 none;
  }

  img {
    width: 60px;
    height: 60px;
  }

  .mui-media-body {
    font-size: 13px;
  }
}
</style>

