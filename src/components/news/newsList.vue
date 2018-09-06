<template>
  <!-- 使用mui 中的 media-list -->
  <div>
    	<ul class="mui-table-view">
				<li class="mui-table-view-cell mui-media" v-for="item in newsList" :key="item.id">
					<router-link :to="'/home/newsinfo/'+ item.id">
						<img class="mui-media-object mui-pull-left" :src="item.img_url">
						<div class="mui-media-body">
							<h1>{{item.title}}</h1>
							<p class='mui-ellipsis'>
                <span>发表时间：{{item.add_time | dateFormat}}</span>
                <span>点击：{{item.click}}次</span>
              </p>
						</div>
					</router-link>
				</li>
			</ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newsList: [{
        id: 1,
        title: "幸福",
        add_time: "2018-09-01 00:11",
        zhaiyao: "能和心爱的人一起睡觉，是件幸福的事情；可是，打呼噜怎么办？",
        click: 1,
        img_url: "https://images.gitee.com/uploads/74/2147774_kissxsx.png?1535620577"
      }, {
        id: 2,
        title: "木屋",
        add_time: "2018-09-01 00:13",
        zhaiyao: "想要这样一间小木屋，夏天挫冰吃瓜，冬天围炉取暖.",
        click: 0,
        img_url: "https://images.gitee.com/uploads/74/2147774_kissxsx.png?1535620577"
      }, {
        id: 3,
        title: "CBD",
        add_time: "2018-09-01 00:18",
        zhaiyao: "烤炉模式的城，到黄昏，如同打翻的调色盘一般.",
        click: 2,
        img_url: "https://images.gitee.com/uploads/74/2147774_kissxsx.png?1535620577"
      }]
    }
  },
  methods: {
    // 获取新闻列表
    getNewsList() {
      this.$http.get("api/getnewslist").then(res => {
        console.log(res);
      })
    }
  },
  created() {
    //this.getNewsList();
  }
}
</script>

<style lang="scss" scoped>
.mui-table-view {
  li {
    h1 {
      font-size: 14px;
    }
    .mui-ellipsis {
      font-size: 12px;
      color: #226aff;
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>

