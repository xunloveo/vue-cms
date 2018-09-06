<template>
  <div>    
    <!-- 顶部的滑动条 借助于 mui tab-top-webview-main.html 记得去掉 mui-fullscreen类 -->
    <!-- 滑动条无法滚动 需要导入 mui.js 调用 官方提供的方式去初始化 
      mui('.mui-scroll-wrapper').scroll({
	      deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
      }); -->
    <div id="slider" class="mui-slider">
				<div id="sliderSegmentedControl" class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
					<div class="mui-scroll">
						<a :class="['mui-control-item', item.id == 0 ? 'mui-active' : '']" v-for="item in categoryList" :key="item.id" @tap="getImgList(item.id)">
							{{ item.title }}
						</a>						
					</div>
				</div>
		</div>
    <!-- 图片列表 -->
    <ul class="photo-list">
      <router-link v-for="item in imgList" :key="item.id" :to="'/home/photoinfo/' + item.id" tag="li">
        <img v-lazy="item.src">
        <div class="info">
          <div class="info-title">标题</div>
          <div class="info-body">内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容
            内容内容内容内容内容内容内容内容内容内容内容内容内容内容
            内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容</div>
        </div>
      </router-link>
    </ul>
  </div>
</template>

<script>
/* 导入mui js 为了滑动 导入的时候会报错  
    Uncaught TypeError: 'caller', 'callee', and 'arguments' properties may not be accessed on strict 
  mode functions or the arguments objects for calls to them 
  因为 webpack 打包 默认是启用严格模式 所以冲突了

  解决方案： 1. 把mui.js 中的非严格模式的代码改掉 （不现实）
            2. 把webpack打包的时候把严格模式给禁用 （是一个插件 babel-plugin-transform-remove-strict-mode）然后在.babelrc配置

*/
import mui from '../../lib/mui/js/mui.min.js'


export default {
  data() {
    return {
      categoryList: [],
      imgList: []
    }
  },

  methods: {
    // 获取所有的图片分类
    getAllCategory() {
      // thi.$http.get("api/getcategory").then(res => {

      // })
      this.categoryList = [{
        id: 1,
        title: '家居生活'
      }, {
        id: 2,
        title: '摄影设计'
      }, {
        id: 3,
        title: '明星美女'
      }, {
        id: 4,
        title: '摄影学习'
      }, {
        id: 5,
        title: '摄影器材'
      }, {
        id: 6,
        title: '明星写真'
      }, {
        id: 7,
        title: '清纯甜美'
      }, {
        id: 8,
        title: '古典美女'
      }];

      this.categoryList.unshift({ id: 0, title: '全部' });
    },

    // 根据分类id获取图片列表
    getImgList(id) {
      // this.$http.get("api/getinages/" + id).then(res => {

      // })

      this.imgList = [];
      let arr = [];
      setTimeout(() => {
        for (let i = 0; i < 6; i++) {
          arr.push({
            id: i,
            src: "http://172.16.86.224:8080/static/menu" + (Math.floor(Math.random() * 6) + 1) + ".png"
          })
        }
      }, 0)

      if (id % 2 !== 0) {
        this.imgList = [];
      } else {
        this.imgList = arr;
      }
    }
  },

  created() {
    this.getAllCategory();
    // 一开始调用 全部图片列表的数据
    this.getImgList(0);
  },

  mounted() {
    //初始化 滑动控制
    mui('.mui-scroll-wrapper').scroll({
      deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });

  }
}
</script>

<style lang="scss" scoped>
* {
  touch-action: pan-y;
}
.photo-list {
  list-style-type: none;
  margin: 0;
  padding: 0;

  li {
    margin-bottom: 10px;
    text-align: center;
    background-color: #ccc;
    box-shadow: 0 0 9px #999;
    position: relative;
  }

  img {
    width: 100%;
    vertical-align: middle;
  }

  image[lazy="loading"] {
    width: 40px;
    height: 300px;
    margin: auto;
  }

  .info {
    max-height: 84px;
    text-align: left;
    color: white;
    position: absolute;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.4);
    .info-title {
      font-size: 14px;
    }
    .info-body {
      font-size: 13px;
    }
  }
}
</style>

