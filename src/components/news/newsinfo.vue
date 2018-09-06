<template>
  <div class="newsinfo-container">
    <h3 class="title">{{ newsInfo.title }}{{ id }}</h3>
    <p class="subtitle">
      <span>发表时间：{{ newsInfo.add_time | dateFormat }}</span>
      <span>点击：{{ newsInfo.click }}次</span>
    </p>
    <div class="content" v-html="newsInfo.content"></div>
    <!-- 评论 -->
    <comment :id="id"></comment>
  </div>
</template>

<script>
import Comment from '../subcomponents/comment'
export default {
  data() {
    return {
      id: this.$route.params.id,
      newsInfo: {}
    }
  },
  methods: {
    // 获取新闻详情
    getNewsInfo() {
      this.$http.get("api/getnew/" + this.id).then(res => {
        console.log(res);
      })
    }
  },
  created() {
    //this.getNewsInfo()
    this.newsInfo = {
      id: this.$route.params.id,
      title: "新闻标题",
      click: 1,
      add_time: "2018-09-01 00:11",
      content: "<p>新闻内容</p>"
    }
  },
  components: {
    Comment
  }
}
</script>

<style lang="scss" scoped>
.newsinfo-container {
  padding: 0 4px;
  .title {
    font-size: 16px;
    text-align: center;
    margin: 15px 0;
    color: red;
  }
  .subtitle {
    font-size: 13px;
    color: blue;
    display: flex;
    justify-content: space-between;
  }
}
</style>

