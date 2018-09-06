<template>
  <div class="banner">
      <mt-swipe :auto="4000">
        <mt-swipe-item v-for="item in lunboList" :key="item.src">
          <img :src="item.src" alt="" :class="{'full': isFull}">
        </mt-swipe-item>
      </mt-swipe>
    </div>  
</template>

<script>
/*
  轮播图有的 宽度设置为100% 有的自适应 所以需要判断是否为要设置100% 用isFull来辨别
*/
export default {
  props: ["lunboList", "isFull"],
  data() {
    return {

    }
  }
}
</script>

<style lang="scss" scoped>
.banner {
  height: 200px;
}

.mint-swipe-item {
  text-align: center;

  img {
    height: 100%;
  }

  .full {
    width: 100%;
  }
}
</style>

