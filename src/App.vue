<template>
  <div id="app">
    <!-- 顶部header区域 -->
    <mt-header fixed title="vueapp开发">
      <span slot="left" @click="goBack" v-show="show">
        <mt-button icon="back">back</mt-button>
      </span>
    </mt-header>

    <!-- 中间路由区域 动画切换-->
    <transition>
      <router-view/>
    </transition>
    

    <!-- 底部tabbar -->
    <nav class="mui-bar mui-bar-tab">
			<router-link class="mui-tab-item-normal" to="/home">
				<span class="mui-icon mui-icon-home"></span>
				<span class="mui-tab-label">首页</span>
			</router-link>
			<router-link class="mui-tab-item-normal" to="/member">
				<span class="mui-icon mui-icon-contact"></span>
				<span class="mui-tab-label">会员</span>
			</router-link>
			<router-link class="mui-tab-item-normal" to="/shopcar">
				<span class="mui-icon mui-icon-extra mui-icon-extra-cart"><span class="mui-badge" id="badge">{{ $store.getters.getAllCount }}</span></span>
				<span class="mui-tab-label">购物车</span>
			</router-link>
			<router-link class="mui-tab-item-normal" to="/search">
				<span class="mui-icon mui-icon-search"></span>
				<span class="mui-tab-label">搜索</span>
			</router-link>
		</nav>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      show: false
    }
  },

  methods: {
    // 点击后退
    goBack() {
      this.$router.go(-1);
    }
  },

  watch: {
    '$route.path': function (newVal, oldVal) {
      if (newVal == '/home') {
        this.show = false;
      } else {
        this.show = true;
      }
    }
  },

  created() {
    this.show = this.$route.path === '/home' ? false : true;
  }
}
</script>

<style>
body {
  background-color: #fff;
}
#app {
  /* font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px; */
  padding-top: 40px;
  padding-bottom: 50px;
  overflow-x: hidden; /*解决路由动画滚动条 */
}

/* 从右侧进左侧出 */
.v-enter {
  opacity: 0;
  transform: translateX(100%);
}
.v-leave-to {
  opacity: 0;
  transform: translateX(-100%);
  position: absolute; /* 解决进入往上飘 */
}

.v-enter-active,
.v-leave-active {
  transition: 0.1s all ease;
}

/* 为了解决tabbar正常工作需要修改类名 mui-tab-item */
.mui-bar-tab .mui-tab-item-normal.mui-active {
  color: #007aff;
}

.mui-bar-tab .mui-tab-item-normal {
  display: table-cell;
  overflow: hidden;
  width: 1%;
  height: 50px;
  text-align: center;
  vertical-align: middle;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: #929292;
}

.mui-bar-tab .mui-tab-item-normal .mui-icon {
  top: 3px;
  width: 24px;
  height: 24px;
  padding-top: 0;
  padding-bottom: 0;
}

.mui-bar-tab .mui-tab-item-normal .mui-icon ~ .mui-tab-label {
  font-size: 11px;
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
