<template>
  <div class="imginfo-container">
    <h3>{{ imgInfo.title }}</h3>
    <div class="subtitle">
      <span>发表时间：{{ imgInfo.add_time | dateFormat}}</span>
      <span>点击：{{ imgInfo.click }}次</span>
    </div>
    <hr>
    <!-- 缩略图 preview固定写法 class不能省-->
    <div class="thumbs">
      <img class="preview-img" v-for="(item, index) in imgList" :src="item.src" height="100" @click="$preview.open(index, list)" :key="item.src"> 
    </div>     

    <!-- 图片内容区 -->
    <div class="content" v-html="imgInfo.content"></div>

    <!-- 评论 -->
    <comment></comment>
  </div>
</template>

<script>
import Comment from '@/components/subcomponents/comment.vue'
export default {
  data() {
    return {
      id: this.$route.params.id,
      imgInfo: {},
      imgList: [] // 缩略图
    }
  },

  methods: {
    // 获取图片详情
    getImgInfo(id) {
      // this.$http.get("api/getimageinfo" + this.id).then( res => {

      // })

      this.imgInfo = {
        title: "标题",
        add_time: "2018-09-02 12:52",
        click: 0,
        content: "<p style='color: inherit; font-size: inherit;'>这是图片的内容区域--这是图片的内容区域--这是图片的内容区域</p>"
      }
    },

    // 获取缩略图
    getImgList(id) {
      // this.$http.get("api/getimage" + this.id).then( res => {

      // })
      let data = [];
      for (let i = 1; i <= 5; i++) {
        data.push({
          src: "http://localhost:8080/static/menu" + i + ".png"
        })
      }

      // 为了模拟
      data.forEach(item => {
        item.w = 600;
        item.h = 400;
      })

      this.imgList = data;
    }
  },

  components: {
    Comment
  },

  created() {
    this.getImgInfo(this.id);
    this.getImgList(this.id);
  }
}
</script>

<style lang="scss" scoped>
.imginfo-container {
  padding: 3px;
  h3 {
    color: #26a2ff;
    font-size: 15px;
    text-align: center;
    margin: 15px 0;
  }
  .subtitle {
    display: flex;
    justify-content: space-between;
    font-size: 13px;
  }

  .thumbs {
    img {
      margin: 10px 0;
      box-shadow: 0 0 8px #999;
    }
  }

  .content {
    font-size: 13px;
  }
}
</style>

