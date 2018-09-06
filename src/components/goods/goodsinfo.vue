<template>
  <div class="goodsinfo-container">
    
    <!-- 加入购物车的小球 -->
    <transition 
      v-on:before-enter="beforeEnter"
      v-on:enter="enter"
      v-on:after-enter="afterEnter"
    >
      <div class="ball" v-show="ballFlag" ref="ball"></div>
    </transition>
    

    <!-- 图片轮播区域  用mui 的卡片形式-->
    <div class="mui-card">
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
         <swiper :lunboList="imgList" :isFull="false"></swiper>
        </div>
      </div>
    </div>

    <!-- 购买区域  用mui 的卡片形式-->
    <div class="mui-card">
      <div class="mui-card-header">{{ goodsInfo.title }}</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <p class="price">
            市场价：<del>¥{{ goodsInfo.market_price }}</del>&nbsp;&nbsp;销售价：<span class="now-price">¥{{ goodsInfo.sell_price }}</span>
          </p>
          <p>购买数量：<num-box @getCount = "getSelectCount" :max="goodsInfo.stock_quantity"></num-box></p>
          <!-- 要获取num_box里面的值 需要通过父子组件进行传值 -->
          <p>
            <mt-button type="primary" size="small">立即购买</mt-button>
            <mt-button type="danger" size="small" @click="addToShopCar">加入购物车</mt-button>
          </p>
        </div>
      </div>
    </div>

    <!-- 参数区域  用mui 的卡片形式-->
    <div class="mui-card">
      <div class="mui-card-header">商品参数</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <p>商品货号：{{ goodsInfo.goods_no }}</p>
          <p>库存情况：{{ goodsInfo.stock_quantity }}件</p>
          <p>上架时间：{{ goodsInfo.add_time | dateFormat }}</p>
        </div>
      </div>
      <div class="mui-card-footer">
        <mt-button type="primary" size="large" plain @click="goDesc">图文介绍</mt-button>
        <mt-button type="danger" size="large" plain @click="goComment">商品评论</mt-button>
      </div>
    </div>
  </div>
</template>

<script>
import Swiper from '@/components/subcomponents/swiper'
import NumBox from '@/components/subcomponents/goodsinfo_numbox'
export default {
  data() {
    return {
      id: this.$route.params.id,
      imgList: [],
      goodsInfo: {},
      ballFlag: false,
      ballX: 0,
      ballY: 0,
      selectedCount: 1 // 保存用户选择的购物数量， 默认为1
    }
  },

  methods: {
    // 获取轮播图的数据
    getImgList() {
      // this.$http.get("api/getimages/" + id).then( res => {

      // })
      this.imgList = [{
        id: 1,
        src: "https://img13.360buyimg.com/n7/jfs/t19912/33/927199229/297549/8c269ff0/5b0fca0fN8d5600df.jpg"
      }, {
        id: 2,
        src: "https://img12.360buyimg.com/n7/jfs/t20248/108/397500554/191681/cb5b9148/5b0c081eNc6501a54.jpg"
      }]
    },

    // 获取商品信息数据
    getGoodsInfo() {
      // this.$http.get("api/goods/getinfo/" + this.id).then( res => {

      // })
      this.goodsInfo = {
        id: this.id,
        title: '小米8 全面屏游戏智能手机 6GB+64GB 黑色 全网通4G 双卡双待',
        add_time: '2018-09-02 20:56',
        goods_no: "SD2932214404",
        market_price: 2699,
        sell_price: 2199,
        stock_quantity: 60
      }
    },

    // 进入图文详情页
    goDesc() {
      this.$router.push({ name: 'goodsDesc', params: { id: this.id } });
    },

    // 进入商品评论
    goComment() {
      this.$router.push({ name: 'goodsComment', params: { id: this.id } });
    },

    // 加入购物车
    addToShopCar() {
      this.ballFlag = !this.ballFlag;

      // 要保存到store 中的商品信息对象
      let goodsinfo = {
        id: this.id, // 商品id
        count: this.selectedCount,  // 数量
        price: this.goodsInfo.sell_price, // 单价
        selected: true // 是否选中
      };

      this.$store.commit('addToCar', goodsinfo); // 调用mutation中的方法 将数据保存到car中
    },

    // 小球半场动画
    beforeEnter(el) {
      el.style.transform = "translate(0, 0)";
    },

    enter(el, done) {
      el.offsetWidth;


      // 让小球实现在不同分辨下
      // 1. 获取小球在页面中的位置
      const ballPos = this.$refs.ball.getBoundingClientRect();
      // 2. 获取购物车数字的位置
      const badgePos = document.getElementById("badge").getBoundingClientRect();
      // 3. 计算偏移的位置
      const xPos = badgePos.left - ballPos.left;
      const yPos = badgePos.top - ballPos.top;

      el.style.transform = `translate(${xPos}px, ${yPos}px)`;
      el.style.transition = "all 0.5s  cubic-bezier(.4,-0.3,1,.68)";

      done();
    },

    afterEnter(el) {
      this.ballFlag = !this.ballFlag;
    },

    // 获取加入购物车的值
    getSelectCount(count) {
      // 子组件传递给父组件
      this.selectedCount = count;
      console.log("父组件拿到的数值：", this.selectedCount);
    }
  },

  components: {
    Swiper,
    NumBox
  },

  created() {
    this.getImgList();
    this.getGoodsInfo();
  },

  mounted() {
    // 获取购买数量输入框的位置
    const munPos = document.getElementById("test").getBoundingClientRect();
    console.log(munPos);
    const x = munPos.left;
    const y = munPos.top;
    const w = munPos.width;
    const h = munPos.height;
    this.ballX = x + (w - 15) / 2;
    this.ballY = y + (h - 15) / 2;
    this.$refs.ball.style.top = this.ballY + 'px';
    this.$refs.ball.style.left = this.ballX + 'px';
  }
}
</script>

<style lang="scss" scoped>
.goodsinfo-container {
  overflow: hidden;
  background-color: #eee;
}

.now-price {
  color: red;
}

.mui-card-footer {
  display: block;

  button {
    margin: 15px 0;
  }
}

.ball {
  width: 15px;
  height: 15px;
  background-color: red;
  border-radius: 50%;
  position: absolute;
  z-index: 99;
}
</style>

