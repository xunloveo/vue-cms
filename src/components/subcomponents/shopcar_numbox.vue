<template>
  <div class="mui-numbox" data-numbox-min='1'>
    <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
    <input id="test" class="mui-input-numbox" type="number" ref="numbox" :value="initCount" @change="sendCount" readonly/>
    <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>

    <!-- 点击加减的时候都要把值传递给父组件 -->
  </div>
</template>

<script>
import mui from '../../lib/mui/js/mui.min.js'
export default {
  props: ["initCount", "goodsId"],
  data() {
    return {

    }
  },

  methods: {
    // 每当文本框的数据被修改之后 把数值发送给父组件
    sendCount() {
      console.log(this.$refs.numbox.value);
      // 每当点击购物车的数量时 覆盖原来的数量
      this.$store.commit("updateGoodsinfo", { id: this.goodsId, count: this.$refs.numbox.value })
    }
  },

  mounted() {
    // 初始化控件
    mui('.mui-numbox').numbox();
  }
}
</script>
