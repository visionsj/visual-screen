<template>
  <div class="cl-cn-content">
    <div class="cl-cn-charts">
      <div flexcontainer>
        <div
          w-300-300
          aspectratio
          aspect-ratio="300/300"
        >
          <div aspectratio-content>
            <li>
              <h2>企业出口在港时间TOP5</h2>
              <div class="chart-list">
                <ul class="ranking-list-left">
                  <li
                    v-for='(item, index) in companyExList'
                    v-if="index < 5"
                    :key="index"
                  >
                    <div>
                      <i>{{item.rankNum}}</i>
                      <span
                        class="cname"
                        :title="item.declareCompanyName"
                      >{{item.declareCompanyName}}</span> <b v-if="item.avgTimeSpent">{{item.avgTimeSpent}}h</b>
                    </div>

                    <el-progress
                      :percentage="item.percent"
                      :show-text="false"
                    ></el-progress>
                  </li>
                </ul>
              </div>
            </li>
            <li>
              <h2>货物出口在港时间TOP5</h2>
              <div class="chart-list">
                <ul class="ranking-list-left">
                  <li
                    v-for='(item, index) in goodsExList'
                    v-if="index < 5"
                    :key="index"
                  >
                    <div><i>{{item.rankNum}}</i><span
                        class="cname"
                        :title="item.goodsType"
                      >{{item.goodsType}}</span> <b v-if="item.avgTimeSpent">{{item.avgTimeSpent}}h</b></div>
                    <el-progress
                      :percentage="item.percent"
                      :show-text="false"
                    ></el-progress>
                  </li>
                </ul>
              </div>
            </li>
            <li>
              <h2>物流出口全程通关耗时</h2>
              <div
                class="chart-list"
                style="padding:0"
              >
                <v-chart
                  :options="exportRateBarOpt"
                  :autoresize="true"
                  :theme="theme"
                />
              </div>
            </li>
          </div>
        </div>
        <div
          w-800-900
          aspectratio
          aspect-ratio="800/900"
        >
          <div aspectratio-content>
            <h2>通关时效实时分析监测</h2>
            <div
              class="logistics-process"
              flexcontainer
            >

              <el-row
                :gutter="0"
                aspectratio
              >
                <el-col :span="2">
                  <h4>进口<br />环节</h4>
                </el-col>
                <el-col :span="22">
                  <ul>
                    <li :class="{active: curItem.currLinkName == '报关放行-货物提离'&& curItem.entryHeadN.ieFlag == 'I'}">
                      <i class="icon05"></i>
                      <i class="icon-point"></i>
                    </li>
                    <li :class="{active: curItem.currLinkName == '报关申报-报关放行'&& curItem.entryHeadN.ieFlag == 'I'}">
                      <i class="icon04"></i>
                      <i class="icon-point"></i>
                    </li>
                    <li :class="{active: curItem.currLinkName == '卸船完成-报关申报'&& curItem.entryHeadN.ieFlag == 'I'}">
                      <i class="icon03"></i>
                      <i class="icon-point"></i>
                    </li>
                    <li :class="{active: curItem.currLinkName == '准许卸货-卸船完成'&& curItem.entryHeadN.ieFlag == 'I'}">
                      <i class="icon02"></i>
                      <i class="icon-point"></i>
                    </li>
                    <li :class="{active: curItem.currLinkName == '船舶抵港-准许卸货' && curItem.entryHeadN.ieFlag == 'I'}">
                      <i class="icon01"></i>
                      <i class="icon-point"></i>
                    </li>

                  </ul>
                  <ul class="log-left">
                    <li>报关放行>货物提离<span>（环节五）</span></li>
                    <li>报关申报>报关放行<span>（环节四）</span></li>
                    <li>卸船完成>报关申报<span>（环节三）</span></li>
                    <li>准许卸货>卸船完成<span>（环节二）</span></li>
                    <li>船舶抵港>准许卸货<span>（环节一）</span></li>

                  </ul>
                </el-col>
              </el-row>
            </div>
            <div
              class="logistics-process"
              flexcontainer
            >
              <el-row
                :gutter="0"
                aspectratio
              >
                <el-col :span="2">
                  <h4>出口<br />环节</h4>
                </el-col>
                <el-col :span="22">
                  <ul>
                    <li :class="{active: curItem.currLinkName == '货物运抵-报关申报'&& curItem.entryHeadN.ieFlag == 'E'}">
                      <i class="icon06"></i><i class="icon-point"></i>
                    </li>
                    <li :class="{active: curItem.currLinkName == '报关申报-报关放行'&& curItem.entryHeadN.ieFlag == 'E'}">
                      <i class="icon05"></i><i class="icon-point"></i>
                    </li>
                    <li :class="{active: curItem.currLinkName == '报关放行-装船完成'&& curItem.entryHeadN.ieFlag == 'E'}">
                      <i class="icon07"></i><i class="icon-point"></i>
                    </li>
                    <li :class="{active: curItem.currLinkName == '装船完成-准许离港'&& curItem.entryHeadN.ieFlag == 'E'}">
                      <i class="icon02"></i><i class="icon-point"></i>
                    </li>
                    <li :class="{active: curItem.currLinkName == '准许离港-船舶离港'&& curItem.entryHeadN.ieFlag == 'E'}">
                      <i class="icon01"></i><i class="icon-point"></i>
                    </li>
                  </ul>
                  <ul>
                    <li>货物运抵>报关申报<span>（环节一）</span></li>
                    <li>报关申报>报关放行<span>（环节二）</span></li>
                    <li>报关放行>装船完成<span>（环节三）</span></li>
                    <li>装船完成>准许离港<span>（环节四）</span></li>
                    <li>准许离港>船舶离港<span>（环节五）</span></li>
                  </ul>

                </el-col>
              </el-row>
            </div>
            <div class="chart-logistics-list">
              <ul>
                <li class="list-head">
                  <span>申报海关</span>
                  <span>进出口</span>
                  <span style="width: 20%">提运单号</span>
                  <span>装运形式</span>
                  <span style="width: 20%">当前通关环节</span>
                  <span>当前环节耗时</span>
                  <span>操作</span>
                </li>
              </ul>
              <div
                id="logistics-list-content"
                @mousemove="clearScroll()"
                @mouseout="starScroll()"
              >
                <ul
                  :class="{anim: animate == true}"
                  :style="{'margin-top': (items.length > 6 ? '-4.5vh': '0')}"
                >
                  <li
                    v-for='(item, key) in items'
                    @click.prevent="showDetail(item)"
                    :key="key"
                  >
                    <span>{{item.customsDistrict}}</span>
                    <span>{{item.entryHead[0].ieFlag == 'I' ? '进口' : '出口'}}</span>
                    <span style="width: 20%">{{item.entryHead[0].billNo}}</span>
                    <span>{{item.containerFlagName}}</span>
                    <span style="width: 20%">{{item.currLinkName}}</span>
                    <span>{{item.currLinkCostTimeHour}}</span>
                    <span>详情</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div
          w-300-300
          aspectratio
          aspect-ratio="300/300"
        >
          <div aspectratio-content>
            <li>
              <h2>企业进口在港时间TOP5</h2>
              <div class="chart-list">
                <ul class="ranking-list-right">
                  <li
                    v-for='(item, index) in companyImList'
                    v-if="index < 5"
                    :key="index"
                  >
                    <div><i>{{item.rankNum}}</i><span
                        class="cname"
                        :title="item.declareCompanyName"
                      >{{item.declareCompanyName}}</span> <b v-if="item.avgTimeSpent">{{item.avgTimeSpent}}h</b></div>
                    <el-progress
                      :percentage="item.percent"
                      :show-text="false"
                    ></el-progress>
                  </li>
                </ul>
              </div>
            </li>
            <li>
              <h2>货物进口在港时间TOP5</h2>
              <div class="chart-list">
                <ul class="ranking-list-right">
                  <li
                    v-for='(item, index) in goodsImList'
                    v-if="index < 5"
                    :key="index"
                  >
                    <div><i>{{item.rankNum}}</i><span
                        class="cname"
                        :title="item.goodsType"
                      >{{item.goodsType}}</span> <b v-if="item.avgTimeSpent">{{item.avgTimeSpent}}h</b></div>
                    <el-progress
                      :percentage="item.percent"
                      :show-text="false"
                    ></el-progress>
                  </li>
                </ul>
              </div>
            </li>
            <li>
              <h2>物流进口全程通关耗时</h2>
              <div
                class="chart-list"
                style="padding:0"
              >
                <v-chart
                  :options="importRateBarOpt"
                  :autoresize="true"
                  :theme="theme"
                />
              </div>
            </li>
          </div>
        </div>
      </div>
    </div>
    <Detail
      class="log-detail"
      :detailData="detailData"
      :entryHead="entryHead"
      :goodsList="goodsList"
      :class="{'active':isDetail}"
    />
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import theme from '../plugins/echarts/theme'
import Detail from './detail'
import { randomData, textSize, deepClone } from '../plugins/utils'

export default {
  data() {
    return {
      theme: theme,
      animate: false,
      scrollLogTag: null,
      detailData: {},
      curItem: {
        entryHeadN: {}
      },
      entryHead: {},
      items: [],
      goodsList: [],
      companyExList: [],
      goodsExList: [],
      companyImList: [],
      goodsImList: [],
      echartBarOpt: {
        tooltip: {
          trigger: 'axis',
          // formatter: '{b0}<br/><span style="display:inline-block;margin-right:.5vw;border-radius:100%;width:.5vw;height:.5vw;background-color:#fd970f"></span>{a0}:{c0}' + '小时',
          textStyle: {
            fontSize: '75%'
          },
          axisPointer: {            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow'          // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: '8%',
          right: '8%',
          top: '5%',
          bottom: '5%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'value',
            position: 'top',
            scale: true,
            min: 0,
            axisLabel: {
              textStyle: {
                fontSize: '75%'
              }
            },
            boundaryGap: [0.2, 0.2]
          }
        ],
        yAxis: [
          {
            type: 'category',

            axisLabel: {
              textStyle: {
                fontSize: '75%'
              }
            },
            axisTick: {
              alignWithLabel: true
            },
            data: [],
          }
        ],
        series: [
          {
            // name: '通关耗时',
            type: 'bar',
            barWidth: '40%',
            itemStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 1,
                y2: 0,
                colorStops: [{
                  offset: 0, color: '#14ccfe' // 0% 处的颜色
                }, {
                  offset: 1, color: '#015ee9' // 100% 处的颜色

                }],
                global: false // 缺省为 false
              }
            },
            label: {
              normal: {
                show: true,
                position: 'right',
                textStyle: {
                  color: 'white'
                }
              }
            },
            data: []
          }
        ]
      },

      importRateBarOpt: {},
      exportRateBarOpt: {}
    }
  },
  mounted() {

    this.importRateBarOpt = deepClone(this.echartBarOpt)

    this.exportRateBarOpt = deepClone(this.echartBarOpt)
    this.exportRateBarOpt.series[0].itemStyle.color.colorStops = [{
      offset: 0, color: '#ff9c12' // 0% 处的颜色
    }, {
      offset: 1, color: '#df2e02' // 100% 处的颜色
    }]

    this.Api.getEntryList({
      limit: 8,
      dataSource: "maa"
    }).then((res) => {
      this.items = res.data.resultList || []
      this.curItem = res.data.resultList && res.data.resultList[0] || {}
      this.curItem.entryHeadN = res.data.resultList[0].entryHead && res.data.resultList[0].entryHead[0] || {}
      this.starScroll()
    })

    this.getNationData()
  },
  computed: {
    ...mapState({
      isDetail: state => state.Detail.isDetail,
      month: state => state.Head.month,
      status: state => state.Head.status
    })
  },
  watch: {
    month: function (valNew, valOld) {
      if (valNew !== valOld) {
        this.getNationData()
      }
    },
    status: function (valNew, valOld) {
      if (valNew !== valOld) {
        this.getNationData()
      }
    }
  },
  destroyed() {
    this.clearScroll()
  },
  methods: {
    getNationData() {   // 初努化地图
      this.Api.getTradeStatics({
        searchTime: this.month,
        groupField: "COMPANY",
        iEMark: "E"
      }).then((res) => {
        let data = []
        if (res.data instanceof Array) {
          res.data.forEach((item, index) => {
            let percent = (item.avgTimeSpent || 1) / (res.data[0].avgTimeSpent || 1) * 100
            data.push(Object.assign({}, item, {
              percent: percent > 100 ? 100 : percent
            }))
          })
        }
        this.companyExList = data
      })

      this.Api.getTradeStatics({
        searchTime: this.month,
        groupField: "GOODS",
        iEMark: "E"
      }).then((res) => {
        let data = []
        if (res.data.rankDoc instanceof Array) {
          res.data.rankDoc.forEach((item, index) => {
            let percent = (item.goodsQty || 1) / (res.data.rankDoc[0].goodsQty || 1) * 100
            data.push(Object.assign({}, item, {
              percent: percent > 100 ? 100 : percent
            }))
          })
        }
        this.goodsExList = data
      })

      this.Api.getTradeStatics({
        searchTime: this.month,
        groupField: "COMPANY",
        iEMark: "I"
      }).then((res) => {
        let data = []
        if (res.data instanceof Array) {
          res.data.forEach((item, index) => {
            let percent = (item.avgTimeSpent || 1) / (res.data[0].avgTimeSpent || 1) * 100
            data.push(Object.assign({}, item, {
              percent: percent > 100 ? 100 : percent
            }))
          })
        }
        this.companyImList = data
      })

      this.Api.getTradeStatics({
        searchTime: this.month,
        groupField: "GOODS",
        iEMark: "I"
      }).then((res) => {
        let data = []
        if (res.data.rankDoc instanceof Array) {
          res.data.rankDoc.forEach((item, index) => {
            let percent = (item.goodsQty || 1) / (res.data.rankDoc[0].goodsQty || 1) * 100
            data.push(Object.assign({}, item, {
              percent: percent > 100 ? 100 : percent
            }))
          })
        }
        this.goodsImList = data
      })

      this.Api.getTradeStatics({
        searchTime: this.month,
        groupField: "LINK",
        iEMark: "E"
      }).then((res) => {
        let ydata = []
        let sdata = []
        if (res.data instanceof Array) {
          res.data.forEach((item, index) => {
            ydata.push(item.groupValue)
            sdata.push(item.avgTimeSpent)
          })
        }
        this.exportRateBarOpt.series[0].data = sdata
        this.exportRateBarOpt.yAxis[0].data = ydata
      })

      this.Api.getTradeStatics({
        searchTime: this.month,
        groupField: "LINK",
        iEMark: "I"
      }).then((res) => {
        let ydata = []
        let sdata = []
        if (res.data instanceof Array) {
          res.data.forEach((item, index) => {
            ydata.push(item.groupValue)
            sdata.push(item.avgTimeSpent)
          })
        }
        this.importRateBarOpt.series[0].data = sdata
        this.importRateBarOpt.yAxis[0].data = ydata
      })


    },
    showDetail(item) {
      this.detailData = item
      this.entryHead = item.entryHead && item.entryHead[0] || {}
      this.goodsList = item.goodsList || []
      this.changeDetailState(true)
    },
    scroll() {
      this.animate = true;
      this.curItem = this.items[0] || {}
      this.curItem.entryHeadN = this.items[0].entryHead[0] || {}

      setTimeout(() => {
        this.items.unshift(this.items[parseInt(this.items.length) - 1]);
        this.items.pop();
        this.animate = false;
      }, 1000)
    },
    clearScroll() {
      this.scrollLogTag && clearInterval(this.scrollLogTag)
    },
    starScroll() {
      this.clearScroll()
      if (this.items.length > 7) {
        this.scrollLogTag = setInterval(this.scroll, 2000)
      }
    },
    ...mapMutations([
      'changeDetailState'
    ])
  },
  components: {
    Detail
  }
}
</script>

<style lang="scss" rel="style/scss" scoped>
.cl-cn-charts {
  height: 89vh;
  margin-top: 1vh;
  overflow: hidden;
}
.cl-cn-charts h2 {
  font-size: 18px;
  height: 3vh;
  margin: 2vh 0 1vh;
}

.chart-list {
  padding: 0 10%;
  height: 23.8vh;
  color: #fff;
  ul {
    margin: 0;
    padding: 0;
    li {
      position: relative;
      height: 4.7vh;
      line-height: 4.7vh;
      padding-left: 25px;
      font-size: 12px;
      text-align: left;
      div:first-child {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .el-progress {
        position: absolute;
        width: 100%;
        bottom: 0;
        left: 0;
      }
    }
    &.ranking-list-left {
      .cname {
        float: left;
        width: 160px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      b {
        float: right;
        margin-left: 5px;
        
      }
      i {
        position: absolute;
        left: 0;
        top: 50%;
        margin-top: -9px;
        width: 18px;
        height: 18px;
        line-height: 18px;
        font-size: 12px;
        font-style: normal;
        text-align: center;
        border-radius: 18px;
        background: #e44504 linear-gradient(to right, #ffa80f, #fc4b00);
      }
    }
    &.ranking-list-right {
      .cname {
        float: left;
        width: 160px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      b {
        float: right;
        margin-left: 5px;
      }
      i {
        position: absolute;
        left: 0;
        top: 50%;
        margin-top: -9px;
        width: 18px;
        height: 18px;
        line-height: 18px;
        font-size: 12px;
        font-style: normal;
        text-align: center;
        border-radius: 18px;
        background: #0066fb linear-gradient(to right, #14deff, #0066fb);
      }
    }
  }
}

.chart-logistics-list {
  position: absolute;
  bottom: 1vh;
  left: 0;
  width: 800px;
  height: 37.5vh;
  color: #fff;
  background: #0a185f;
  ul li {
    font-size: 14px;
    height: 5vh;
    line-height: 5vh;
    span {
      width: 12%;
      float: left;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
  .list-head {
    font-size: 14px;
    font-weight: bold;
    background: #ff9c1a;
  }
  #logistics-list-content {
    width: 800px;
    height: 31.5vh;
    overflow: hidden;
    ul {
      margin-top: -4.5vh;
      li {
        font-size: 14px;
        height: 4.5vh;
        line-height: 4.5vh;
        &:hover {
          background: rgba(43, 112, 223, 0.3);
        }

        span {
          width: 12%;
          height: 4.5vh;
          float: left;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          cursor: pointer;
        }
      }
    }
  }
}

.logistics-process {
  height: 20vh;
  margin: 2vh 0 0;
  h4 {
    margin-top: 11.5vh;
    text-align: left;
    font-size: 16px;
  }
  ul {
    height: 8.6vh;
    &:first-child {
      padding: 0 0 0 2%;
      li {
        position: relative;
        width: 18.5%;
        text-align: center;
        float: left;
        &.active {
          i.icon01 {
            background: url("../assets/images/ico-01-h.png") no-repeat;
            background-size: contain;
          }
          i.icon02 {
            background: url("../assets/images/ico-02-h.png") no-repeat;
            background-size: contain;
          }
          i.icon03 {
            background: url("../assets/images/ico-03-h.png") no-repeat;
            background-size: contain;
          }
          i.icon04 {
            background: url("../assets/images/ico-04-h.png") no-repeat;
            background-size: contain;
          }
          i.icon05 {
            background: url("../assets/images/ico-05-h.png") no-repeat;
            background-size: contain;
          }
          i.icon06 {
            background: url("../assets/images/ico-06-h.png") no-repeat;
            background-size: contain;
          }
          i.icon07 {
            background: url("../assets/images/ico-07-h.png") no-repeat;
            background-size: contain;
          }

          i.icon-point {
            border: 1px solid #ff9210;
            &::after {
              background: #ff9210;
            }
          }
        }
        i {
          height: 8vh;
          width: 8vh;
          display: inline-block;
          &.icon01 {
            background: url("../assets/images/ico-01.png") no-repeat;
            background-size: contain;
          }
          &.icon02 {
            background: url("../assets/images/ico-02.png") no-repeat;
            background-size: contain;
          }
          &.icon03 {
            background: url("../assets/images/ico-03.png") no-repeat;
            background-size: contain;
          }
          &.icon04 {
            background: url("../assets/images/ico-04.png") no-repeat;
            background-size: contain;
            &.active {
              background: url("../assets/images/ico-04-h.png") no-repeat;
              background-size: contain;
            }
          }
          &.icon05 {
            background: url("../assets/images/ico-05.png") no-repeat;
            background-size: contain;
            &.active {
              background: url("../assets/images/ico-05-h.png") no-repeat;
              background-size: contain;
            }
          }
          &.icon06 {
            background: url("../assets/images/ico-06.png") no-repeat;
            background-size: contain;
            &.active {
              background: url("../assets/images/ico-06-h.png") no-repeat;
              background-size: contain;
            }
          }
          &.icon07 {
            background: url("../assets/images/ico-07.png") no-repeat;
            background-size: contain;
          }
          &.icon-point {
            position: absolute;
            left: 50%;
            bottom: -3vh;
            width: 20px;
            height: 20px;
            margin-left: -10px;
            background: #231816;
            border: 1px solid #00daff;
            border-radius: 100%;
            &::after {
              position: absolute;
              content: "";
              left: 4px;
              top: 4px;
              width: 10px;
              height: 10px;
              background: #00daff;
              border-radius: 100%;
            }
          }
        }
      }
    }
    &:last-child {
      padding: 0 0 0 2%;
      background: url("../assets/images/process-bg.png") no-repeat;
      background-size: 98% auto;
      li {
        position: relative;
        width: 18.5%;
        font-size: 12px;
        line-height: 8vh;
        color: #fff;
        font-weight: bold;
        float: left;

        text-overflow: ellipsis;
        white-space: nowrap;
        span{
          position: absolute;
          left: 50%;
          line-height: 20px;
          bottom: -25px;
          transform: translateX(-50%)
        }
      }
    }
    &.log-left {
      background: url("../assets/images/process-bg-left.png") no-repeat;
      background-size: 98% auto;
      padding: 0 0 0 5%;
      margin-left: -3%;
    }
  }
}

[w-300-300] {
  position: relative;
  width: 295px;
  font-size: 15px;
  color: #52bdff;
  text-align: center;
  z-index: 99;
  float: left;
}
[w-300-300] {
  aspect-ratio: "300:300";
}

[w-800-900] {
  position: relative;
  width: 800px;
  height: 89vh;
  font-size: 16px;
  color: #52bdff;
  text-align: center;
  float: left;
}
[w-800-900] {
  aspect-ratio: "800:900";
}
.log-detail {
  position: absolute;
  top: 10vh;
  left: -100vw;
  width: 100%;
  height: 90vh;
  background: rgba(16, 1, 51, 0.98);
  z-index: 99;
  transition: all 0.5s;

  &.active {
    left: 0;
  }
}
.echarts {
  width: 100%;
  height: 100%;
}

.anim {
  animation: animList 1s;
  li:first-child {
    animation: animFirstList 1s;
  }
}
@keyframes animList {
  0% {
    margin-top: -4.5vh;
  }
  100% {
    margin-top: 0vh;
  }
}
@keyframes animFirstList {
  0% {
    margin-left: -100%;
    color: #ff9c1a;
    background: #161f5b;
  }

  100% {
    margin-left: 0;
    color: #ff9c1a;
    background: #161f5b;
  }
}
</style>
