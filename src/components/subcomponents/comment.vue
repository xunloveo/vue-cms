<template>
  <div class="cmt-container">
    <h3>发表评论</h3>
    <hr>
    <textarea placeholder="请输入要BB的内容（最多吐槽120个字）" maxlength="120" v-model="msg"></textarea>
    <mt-button type="primary" size="large" @click="postComment">发表评论</mt-button>
    <div class="cmt-list">
      <div class="cmt-item" v-for="(item, index) in cmomentList" :key="item.add_time">
        <div class="cmt-title">
          第{{ index + 1 }}楼&nbsp;&nbsp;用户：{{ item.user_name }}&nbsp;&nbsp;发表时间：{{ item.add_time | dateFormat }}
        </div>
        <div class="cmt-body">
          {{ item.content }}
        </div>
      </div>
    </div>
    <mt-button type="danger" size="large" plain @click="getMore">加载更多</mt-button>
  </div>
</template>

<script>
import {
  Toast
} from 'mint-ui';
export default {
  props: ["id"],
  data() {
    return {
      cmomentList: [{
        user_name: "匿名用户1",
        add_time: "2018-09-01 01:13",
        content: "用户评论1"
      }, {
        user_name: "匿名用户2",
        add_time: "2018-09-01 01:16:00",
        content: "用户评论2"
      }, {
        user_name: "匿名用户3",
        add_time: "2018-09-01 01:19:00",
        content: "用户评论3"
      }],
      pageIndex: 1,
      totalPage: 10,
      msg: ""
    }
  },

  methods: {
    // 获取评论的数据
    getCommentsList() {
      this.$http.get("api/getcomments/" + this.id + "/pageindex = " + this.pageIndex).then(res => {
        // 每当获取新数据的时候不把老数据覆盖，要以拼接的方式
        this.cmomentList = this.cmomentList.concat(res.data.data); // 拼接数据
      })
    },

    // 点击加载更多
    getMore() {
      if (this.pageIndex < this.totalPage) {
        this.pageIndex++;
        //this.getCommentsList();
        console.log(this.pageIndex);

        // 模拟
        this.cmomentList = this.cmomentList.concat(this.cmomentList);
      }

    },

    // 发表评论
    /*
      实现思路： 点击发表评论，评论成功后刷新评论列表，但是有可能只请求最后一页的数据，而前几页数据没有，
      所以，要用数组的unshift添加
    */
    postComment() {
      // 校验是否为空格
      if (this.msg.trim().length == 0) {
        return Toast("评论内容不能为空！");
      }

      // this.$http.post("api/postcomment" + this.id, { content: this.msg.trim() }).then(res => {

      // })
      let cmt = {
        user_name: '匿名用户',
        add_time: Date.now(),
        content: this.msg.trim()
      }

      this.cmomentList.unshift(cmt);
      this.msg = "";
    }
  },

  created() {
    //this.getCommentsList();
  }
}
</script>

<style lang="scss" scoped>
.cmt-container {
  h3 {
    font-size: 18px;
  }
  textarea {
    font-size: 14px;
    height: 85px;
    margin: 0;
  }

  .cmt-list {
    margin: 5px 0;
    .cmt-item {
      font-size: 13px;
      .cmt-title {
        line-height: 30px;
        background-color: #ccc;
      }
      .cmt-body {
        line-height: 35px;
        text-indent: 2em;
      }
    }
  }
}
</style>

