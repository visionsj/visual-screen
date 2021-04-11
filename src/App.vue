<template>
  <div id="app">
    <div
      class="quick_nav"
      @mouseenter="toggleQuick(true)"
    >
    </div>
    <div
      class="quick_nav_con"
      @mouseleave="toggleQuick(false)"
      v-if="showQuick"
    >
      <span
        v-for="(item, index) in 6"
        :key="index"
        :class="{'active': route == ('/' + item)}"
        @click="changeRouter(`/${item}`)"
      >{{item}}</span>
    </div>
    <Header
      class="layout-header"
      @sentChildScorll="childMsg"
    />
    <router-view class="layout-content" />
    <div
      class="change-screen"
      :class="{'active': changeState}"
    >
      <div
        @click="closeScreen"
        class="mask"
      >
        <i class="el-icon-circle-close-outline"></i>
      </div>
      <div class="change-screen-wrap">
        <el-carousel
          :autoplay="false"
          type="card"
          indicator-position="outside"
          height="300px"
        >
          <el-carousel-item
            v-for="(item, index) in items"
            :key="index"
          >
            <!-- 去掉 @click.native="closeScreen()" -->
            <div
              @click="changeRouter(`/${index+1}`)"
              :class="`carousel-bg${index + 1}`"
            >
              <span>{{item.name}}</span>
            </div>
          </el-carousel-item>
        </el-carousel>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import Header from './components/Header'
export default {
  name: 'app',
  data() {
    return {
      changeState: false,
      changeWheel: false,
      showQuick: false,
      items: [
        { name: '全国整体口岸通关时效概览' },
        { name: '浙江省口岸通关时效概况' },
        { name: '超长报关单分析信息' },
        { name: '浙江省口岸通关政策分析' },
        { name: '影响通关时效因素分析' },
        { name: '全程物流时效评估分析' },
        { name: '作业效率分析' }
      ]
    }
  },
  mounted: function () {
    // window.addEventListener('mousewheel', this.handleScroll, true);
  },
  computed: {
    route: function () {
      return this.$route.path
    }
  },
  methods: {
    handleScroll: function (e) {
      if (!this.changeWheel) {
        this.changeState = true
      }
    },
    childMsg: function (e) {
      this.changeWheel = e
    },
    toggleQuick: function (tag) {
      console.log(tag)
      this.showQuick = tag
    },
    closeScreen: function () {
      this.changeState = false
    },
    changeRouter: function (url) {
      this.changeHeadTitle(null)
      this.$router.push(url)
    },
    ...mapMutations([
      "changeHeadTitle"
    ])
  },
  destroyed: function () {
    window.removeEventListener('scroll', this.handleScroll);
  },
  components: {
    Header
  }
}
</script>

<style lang="scss" rel="style/scss">
.el-carousel__mask {
  opacity: 0.4 !important;
  background-color: #000 !important;
}
.layout-header {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 10vh;
  overflow: hidden;
}

.layout-content {
  padding-top: 10vh;
  height: 90vh;
}
.quick_nav {
  position: absolute;
  top: 0;
  right: 0;
  width: 150px;
  min-height: 25px;
  text-align: center;
  z-index: 999;
}
.quick_nav_con {
  position: absolute;
  top: 0;
  right: 0;
  width: 150px;
  z-index: 9999;
  height: 80px;
  padding: 10px;
  background: rgba(11, 43, 118, 0.8);
  border-bottom-left-radius: 8px;
  display: inline-block;
  span {
    width: 30px;
    height: 20px;
    font-size: 12px;
    line-height: 20px;
    margin: 4px;
    border-radius: 4px;
    background: #088cfc;
    display: inline-block;
    text-align: center;
    &:hover {
      cursor: pointer;
      background: #fda203;
    }
    &.active {
      background: #fda203;
    }
  }
}

.change-screen {
  position: fixed;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  background: rgba(9, 0, 33, 0.8);
  z-index: 99999999;
  opacity: 0;
  transition: all 0.5s;
  &.active {
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 1;
  }
  .mask {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 99;
    i {
      position: absolute;
      right: 30px;
      top: 30px;
      font-size: 50px;
      &:hover {
        cursor: pointer;
      }
    }
  }
  .change-screen-wrap {
    position: absolute;
    top: 50%;
    left: 20%;
    height: 300px;
    margin-top: -150px;
    width: 60%;
    padding: 0;
    text-align: center;
    z-index: 999;
  }
}
.el-carousel__item a {
  width: 100%;
  height: 100%;
  display: inline-block;
  border: 1px solid #2d28ae;
  span {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 40px;
    line-height: 40px;
    background: rgba(9, 0, 33, 0.9);
    color: #fff;
  }
  &.carousel-bg1 {
    background: url("./assets/images/s1.jpg") no-repeat;
    background-size: 100% 100%;
  }
  &.carousel-bg2 {
    background: url("./assets/images/s2.jpg") no-repeat;
    background-size: 100% 100%;
  }
  &.carousel-bg3 {
    background: url("./assets/images/s3.jpg") no-repeat;
    background-size: 100% 100%;
  }
  &.carousel-bg4 {
    background: url("./assets/images/s4.jpg") no-repeat;
    background-size: 100% 100%;
  }
  &.carousel-bg5 {
    background: url("./assets/images/s5.jpg") no-repeat;
    background-size: 100% 100%;
  }
  &.carousel-bg6 {
    background: url("./assets/images/s6.jpg") no-repeat;
    background-size: 100% 100%;
  }
}

.el-carousel__item:nth-child(2n) {
  background-color: #3a98ff;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #8fc8ff;
}
</style>
