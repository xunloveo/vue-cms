<template>
  <div class="goodsdesc-container">
    <h3>{{ goodsDesc.title }}</h3>
    <hr>
    <div class="content" v-html="goodsDesc.content"></div>      
  </div>
</template>

<script>
export default {
  data() {
    return {
      goodsDesc: {}
    }
  },

  methods: {
    // 获取图文介绍
    getGoodsDesc() {
      // this.$http.get("api/goods/getdesc/" + this.$route.params.id).then( res => {

      // })
      this.goodsDesc = {
        title: '图文介绍标题',
        content: "<p>内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容</p>"
      }
    }
  },
  
  created() {
    this.getGoodsDesc();
  },

  mounted() {

  }
}
</script>

<style lang="scss" scoped>
.goodsdesc-container{
  padding: 4px;
  h3{
    font-size: 16px;
    color: #226aff;
    text-align: center;
    margin: 15px 0;
  }

  .content{
    img{
      width: 100%;
    }
  }
}
</style>