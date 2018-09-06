<template>
  <div class="shopcar-container">
    <div class="shoplist">     
      <!-- 商品列表项区域 -->
      <div class="mui-card">
        <div class="mui-card-content">
          <div class="mui-card-content-inner" v-for="(item, i) in shopCarList" :key="item.id">
            <mt-switch v-model="$store.getters.getGoodsStatus[item.id]" 
              @change="selectedChange(item.id, $store.getters.getGoodsStatus[item.id])"></mt-switch>
            <img :src="item.url" alt="">
            <div class="info">
              <h1>{{ item.title }}</h1>
              <p>
                <span class="price">¥{{ item.price }}</span>
                <num-box :initCount="$store.getters.getGoodsCount[item.id]" :goodsId="item.id"></num-box>
                <a @click.prevent="remove(item.id, i)">删除</a>
              </p>
            </div>
          </div>
        </div>
      </div>
     </div>

    <!-- 结算区域 -->
    <div class="mui-card">
      <div class="mui-card-content">
        <div class="mui-card-content-inner jiesuan">
          <div class="left">
            <p>总计（不含运费）</p>
            <p>已勾选商品<span class="red">{{ $store.getters.getGoodsCountAndPrice.count }}</span>件，总价
              <span class="red">¥{{ $store.getters.getGoodsCountAndPrice.amount}}</span>
            </p>
          </div>
          <div class="right">
             <mt-button type="danger" size="small">去结算</mt-button>
          </div>
         
        </div>
      </div>
    </div>     

    <p>{{ $store.getters.getGoodsStatus }}</p>
   
  </div>
</template>

<script>
import NumBox from '@/components/subcomponents/shopcar_numbox'
export default {
  data() {
    return {
      shopCarList: []
    }
  },
  methods: {
    // 获取购车数据
    getShopCarList() {
      // 获取store所有商品id 然后拼接处一个字符串
      let ids = [];
      this.$store.state.car.forEach(item => ids.push(item.id));
      if (ids.length <= 0) {
        return;
      }
      // this.$http.get('api/getshopcarlist/' + ids.join(",")).then(res => {

      // })
      this.shopCarList = [{
        id: 0,
        count: 1,
        url: 'https://img13.360buyimg.com/n7/jfs/t19912/33/927199229/297549/8c269ff0/5b0fca0fN8d5600df.jpg',
        title: '小米8 全面屏游戏智能手机 6GB+64GB 黑色 全网通4G 双卡双待',
        price: 2199
      }]
    },

    // 删除商品 把商品从store中根据传递的id 删除 同时把shopCarList 删除
    remove(id, index) {
      this.shopCarList.splice(index, 1);
      this.$store.commit("removeFormCar", id);
    },

    // 每当点击开关 把最新的开关状态同步到store中
    selectedChange(id, value) {
      console.log(id, value);
      this.$store.commit("updateSelected", { id: id, selected: value });
    }

  },
  components: {
    NumBox
  },
  created() {
    this.getShopCarList();
  },
  mounted() {

  }
}
</script>

<style lang="scss" scoped>
.shopcar-container {
  background-color: #eee;
  overflow: hidden;

  .mui-card-content-inner {
    display: flex;
    align-items: center;
  }
  img {
    width: 60px;
    height: 60px;
  }

  .info {
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    p {
      margin-bottom: 0;
    }
    h1 {
      font-size: 13px;
    }
    .price {
      color: red;
    }
  }

  .jiesuan {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .red {
      color: red;
      font-weight: bold;
      font-size: 16px;
    }
  }
}
</style>