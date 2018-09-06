<template>
  <div class="mui-numbox" data-numbox-min='1' :data-numbox-max='max'>
    <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
    <input id="test" class="mui-input-numbox" type="number" ref="numbox" value="1" @change="sendCount" />
    <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>

    <!-- 点击加减的时候都要把值传递给父组件 -->
    <span v-show="show">测试</span>
  </div>
</template>

<script>
import mui from '../../lib/mui/js/mui.min.js'
export default {
  props: ["max"],  // 设置输入框的最大值为库存量
  data() {
    return {
      show: true
    }
  },

  watch: {
    // 监听最大值的变化 因为父组件的max是通过接口获取的 有可能在渲染绑定的时候 还没得到值过一会才从后台拿到值  所以需要监听变化
    "max": (newVal, oldVal) => {
      // 使用mui jsapi 来设置最大值
      mui(".mui-numbox").numbox.setOption("max", newVal);
    }
  },

  methods: {
    // 每当文本框的数据被修改之后 把数值发送给父组件
    sendCount() {
      if (parseInt(this.$refs.numbox.value) > this.max) {
        this.$refs.numbox.value = this.max;
      }
      this.$emit('getCount', parseInt(this.$refs.numbox.value));
    }
  },

  mounted() {
    // 初始化控件
    mui('.mui-numbox').numbox();
  }
}
</script>
