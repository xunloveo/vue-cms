<template>
  <div class="goods-list">
    <div class="goods-item" v-for="item in goodsList" :key="item.id" @click="goInfo(item.id)">
      <img :src="item.img_url" alt="">
      <h1 class="title">{{ item.title }}</h1>
      <div class="info">
        <p class="price">
          <span class="now">¥{{ item.sell_price }}</span>
          <span class="old">¥{{ item.market_price }}</span>
        </p>
        <p class="sell">
          <span>热卖中</span>
          <span>剩{{ item.stock_quantity }}件</span>
        </p>
      </div>
    </div>

    <mt-button type="danger" size="large" @click="addMore">加载更多</mt-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      goodsList: [],
      pageIndex: 1
    }
  },

  methods: {
    // 获取商品列表数据
    getGoodsList() {
      // this.$http.get("api/getgoods?pageindex="+ this.pageIndex).then( res => {

      // })
      let arr = [];
      for (let i = 0; i < 10; i++) {
        arr.push({
          id: ((this.pageIndex - 1) * 10) + i,
          title: "小米8 全面屏游戏智能手机 6GB+64GB 黑色 全网通4G 双卡双待",
          img_url: "https://img13.360buyimg.com/n7/jfs/t19912/33/927199229/297549/8c269ff0/5b0fca0fN8d5600df.jpg",
          sell_price: 899,
          market_price: 999,
          stock_quantity: 200
        })
      }

      this.goodsList = this.goodsList.concat(arr);
    },

    // 加载耕作
    addMore() {
      this.pageIndex++;
      this.getGoodsList();
    },

    // 点击跳转商品详情页
    goInfo(id) {
      //this.$router.push({ path: '/home/goodsinfo/' + id });

      // 命名路由跳转
      this.$router.push({ name: 'goodsinfo', params: { id: id } });
    }
  },

  created() {
    this.getGoodsList();
  }
}
</script>

<style lang="scss" scoped>
.goods-list {
  display: flex;
  flex-wrap: wrap;
  padding: 7px;
  justify-content: space-between;

  .goods-item {
    width: 49%;
    min-height: 293px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin: 4px 0;
    padding: 2px;
    border: 1px solid #ccc;
    box-shadow: 0 0 8px #ccc;

    img {
      width: 100%;
    }

    .title {
      font-size: 14px;
    }

    .info {
      p {
        margin: 0;
        padding: 5px;
      }
      background-color: #eee;
      .price {
        .now {
          color: red;
          font-weight: bold;
          font-size: 16px;
        }

        .old {
          text-decoration: line-through;
          font-size: 12px;
          margin-left: 10px;
        }
      }

      .sell {
        display: flex;
        justify-content: space-between;
      }
    }
  }
}
</style>

