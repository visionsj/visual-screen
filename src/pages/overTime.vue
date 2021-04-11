<template>
  <div class="cl-cn-content">
    <div class="cl-cn-charts">
      <div flexcontainer>
        <div
          w-800-900
          aspectratio
          aspect-ratio="800/900"
        >
          <div aspectratio-content>
            <h2>超时报关单监测</h2>
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
                <el-col
                  :span="22"
                  style="padding-left: 22px"
                >
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
                  <ul>
                    <span class="triangle-border-left"></span>
                    <li>报关放行>货物提离</li>
                    <li>报关申报>报关放行</li>
                    <li>卸船完成>报关申报</li>
                    <li>准许卸货>卸船完成</li>
                    <li>船舶抵港>准许卸货</li>
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
                  <ul style="padding-left: 22px;">
                    <span class="triangle-border-right"></span>
                    <li>货物运抵>报关申报</li>
                    <li>报关申报>报关放行</li>
                    <li>报关放行>装船完成</li>
                    <li>装船完成>准许离港 </li>
                    <li>准许离港>船舶离港</li>
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
                  :class="{anim:animate==true}"
                  :style="{'margin-top': (items.length > 7 ? '-4.5vh': '0')}"
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
          w-600-900
          aspectratio
          aspect-ratio="600/900"
        >
          <div aspectratio-content>
            <li>
              <h2>出口企业TOP5</h2>
              <div class="chart-list">
                <ul class="ranking-list-blue w50">
                  <li
                    v-for='(item, index) in compExpList'
                    v-if="index < 5"
                    :key="index"
                  >
                    <div>
                      <el-row :gutter="0">
                        <el-col :span="2"><i>{{item.rankNum}}</i></el-col>
                        <el-col
                          :span="17"
                          :title="item.groupValueName"
                        >{{item.groupValueName}} &nbsp;</el-col>
                        <el-col :span="5"><b>{{item.entryQty}}票</b></el-col>
                      </el-row>
                    </div>
                    <el-progress
                      :percentage="item.percent"
                      :show-text="false"
                    ></el-progress>
                  </li>
                </ul>
                <ul class="w50">
                  <li>
                    <div class="ot-chart">
                      <v-chart
                        :options="echartPieExpTime"
                        :autoresize="true"
                        :theme="theme"
                      />
                    </div>
                    <div class="ot-title">
                      总单量：<b>{{compOverTime.totalExpNum | NumFormat}}</b>
                    </div>
                  </li>
                </ul>
              </div>
            </li>
            <li>
              <h2>进口企业TOP5</h2>
              <div class="chart-list">
                <ul class="ranking-list-red w50">
                  <li
                    v-for='(item, index) in compImpList'
                    v-if="index < 5"
                    :key="index"
                  >
                    <div>
                      <el-row :gutter="0">
                        <el-col :span="2"><i>{{item.rankNum}}</i></el-col>
                        <el-col
                          :span="17"
                          :title="item.groupValueName"
                        >{{item.groupValueName}} &nbsp;</el-col>
                        <el-col :span="5"><b>{{item.entryQty}}票</b></el-col>
                      </el-row>
                    </div>
                    <el-progress
                      :percentage="item.percent"
                      :show-text="false"
                    ></el-progress>
                  </li>
                </ul>
                <ul class="w50">
                  <li>
                    <div class="ot-chart">
                      <v-chart
                        :options="echartPieImpTime"
                        :autoresize="true"
                        :theme="theme"
                      />
                    </div>
                    <div class="ot-title">
                      总单量：<b>{{compOverTime.totalImpNum | NumFormat}}</b>
                    </div>
                  </li>
                </ul>
              </div>
            </li>

          </div>
        </div>
      </div>

      <div class="over-time-rate">
        <el-row
          :gutter="0"
          aspectratio
        >
          <el-col :span="7">
            <ul class="top-goods">
              <h2>进口货物种类TOP5</h2>
              <li>
                <el-row
                  :gutter="0"
                  class="top-goods-wrap"
                >
                  <el-col
                    :span="24"
                    style="min-height: 23vh"
                  >

                    <el-row
                      :gutter="0"
                      class="top-goods-list"
                      v-for="(item, index) in goodsImpList"
                      v-if="index < 5"
                      :key="index"
                    >
                      <el-col :span="3"><i class="icon-red">{{item.rankNum}}</i></el-col>
                      <el-col
                        :span="13"
                        :title="item.goodsType"
                      >{{item.goodsType || '&nbsp;'}} </el-col>
                      <el-col :span="4" style="text-align:right"><b>{{item.goodsQty}}票</b> &nbsp; </el-col>
                      <el-col :span="4"><span :style="`width: ${item.percent}%`"></span></el-col>
                    </el-row>
                  </el-col>
                </el-row>
              </li>
            </ul>
          </el-col>
          <el-col :span="5">
            <ul class="top-city">
              <h2>进口超长报关单城市占比TOP5</h2>
              <li>
                <el-row :gutter="0">
                  <el-col :span="7">&nbsp;</el-col>
                  <el-col :span="5">城市</el-col>
                  <el-col :span="5">总量</el-col>
                  <el-col :span="7">全省占例</el-col>
                </el-row>

                <el-row
                  :gutter="0"
                  class="top-city-list"
                  v-for="(item, index) in imCityOverTime"
                  v-if="index < 5"
                  :key="index"
                >
                  <el-col :span="7"><i :class="{'icon-red':index < 3,'icon-blue' : index >= 3 && index < 5}">{{item.rankNum}}</i></el-col>
                  <el-col :span="5">{{item.groupValue}}</el-col>
                  <el-col :span="5">{{item.entryQty}}</el-col>
                  <el-col :span="7">{{item.percent}}% </el-col>
                </el-row>

              </li>
            </ul>
          </el-col>
          <el-col :span="7">
            <ul class="top-goods">
              <h2>出口货物种类TOP5</h2>
              <li>
                <el-row
                  :gutter="0"
                  class="top-goods-wrap"
                >
                  <el-col
                    :span="24"
                    style="min-height: 23vh"
                  >

                    <el-row
                      :gutter="0"
                      class="top-goods-list"
                      v-for="(item, index) in goodsExpList"
                      v-if="index < 5"
                      :key="index"
                    >
                      <el-col :span="3"><i class="icon-blue">{{item.rankNum}}</i></el-col>
                      <el-col
                        :span="13"
                        :title="item.goodsType"
                      >{{item.goodsType}} </el-col>
                      <el-col :span="4"><b>{{item.goodsQty}}票</b> &nbsp; </el-col>
                      <el-col :span="4"><span class="blue" :style="`width: ${item.percent}%`"></span></el-col>
                    </el-row>
                  </el-col>
                </el-row>
              </li>
            </ul>
          </el-col>
          <el-col
            :span="5"
            style="padding-right: 10px"
          >
            <ul class="top-city">
              <h2>出口超长报关单城市占比TOP5</h2>
              <li>
                <el-row :gutter="0">
                  <el-col :span="7">&nbsp;</el-col>
                  <el-col :span="5">城市</el-col>
                  <el-col :span="5">总量</el-col>
                  <el-col :span="7">全省占例</el-col>
                </el-row>

                <el-row
                  :gutter="0"
                  class="top-city-list blue"
                  v-for="(item, index) in exCityOverTime"
                  v-if="index < 5"
                  :key="index"
                >
                  <el-col :span="7"><i :class="{'icon-red':index < 3,'icon-blue' : index >= 3 && index < 5}">{{item.rankNum}}</i></el-col>
                  <el-col :span="5">{{item.groupValue}}</el-col>
                  <el-col :span="5">{{item.entryQty}}</el-col>
                  <el-col :span="7">{{item.percent}}% </el-col>
                </el-row>

              </li>
            </ul>
          </el-col>
        </el-row>
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
import { randomData, textSize, deepClone, cutstr } from '../plugins/utils'

export default {
  data() {
    return {
      theme: theme,
      animate: false,
      scrollOverTag: null,
      rankingList: {},
      items: [],
      imCityOverTime: [],
      exCityOverTime: [],

      compOverTime: {},
      compImpList: [],
      compExpList: [],

      goodsOverTime: {},
      goodsImpList: [],
      goodsExpList: [],

      detailData: {},
      curItem: {
        entryHeadN: {}
      },
      entryHead: {},
      goodsList: [],

      echartPieTime: {
        tooltip: {
          trigger: 'item',
          textStyle: {
            fontSize: '75%'
          },
          formatter: function (obj) {
            return cutstr(obj.data.goodsType || obj.data.groupValueName) + '<br >占比：' + obj.data.percent + '%'
          }
        },
        color: ['#fe9d12', '#0690ff', '#2bd0c0', '#8881f5', '#fa524f'],
        calculable: false,
        series: [
          {
            name: '',
            type: 'pie',
            radius: ['40%', '55%'],
            x: '60%',
            width: '50%',
            funnelAlign: 'left',
            max: 1048,
            itemStyle: {
              normal: {
                label: {
                  show: true,
                  position: 'outer',
                  textStyle: {
                    fontSize: '75%'
                  },
                  formatter: function (obj) {
                    return cutstr(obj.data.goodsType || obj.data.groupValueName) + '\n' + parseInt(obj.data.percent) + '%'
                  }
                }
              }
            },

            data: []
          }
        ]
      },
      echartPieImpTop: {},
      echartPieExpTop: {},
      echartPieImpTime: {},
      echartPieExpTime: {},
    }
  },
  mounted() {

    this.echartPieImpTime = deepClone(this.echartPieTime)
    this.echartPieImpTime.series[0].name = '进口企业'
    this.echartPieExpTime = deepClone(this.echartPieTime)
    this.echartPieExpTime.series[0].name = '出口企业'

    this.echartPieImpTop = deepClone(this.echartPieTime)
    this.echartPieImpTop.series[0].roseType = 'radius'

    this.echartPieExpTop = deepClone(this.echartPieTime)
    this.echartPieExpTop.series[0].roseType = 'radius'

    this.Api.getEntryList({
      limit: 8,
      dataSource: "maa"
    }).then((res) => {
      // 坑爹数据结构
      this.items = res.data.resultList || []
      this.curItem = res.data.resultList && res.data.resultList[0] || {}
      this.curItem.entryHeadN = res.data.resultList && res.data.resultList[0].entryHead && res.data.resultList[0].entryHead[0] || {}
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
      this.clearScroll()

      this.Api.getOverTimeStatics({
        "searchTime": this.month,
        "groupField": "CITY",
        "iEMark": "I"
      }).then((res) => {
        this.imCityOverTime = res.data || []
      })

      this.Api.getOverTimeStatics({
        "searchTime": this.month,
        "groupField": "CITY",
        "iEMark": "E"
      }).then((res) => {
        this.exCityOverTime = res.data || []
      })


      this.Api.getOverTimeStatics({
        "searchTime": this.month,
        "groupField": "COMPANY"
      }).then((res) => {
        this.transformData(res, 'compImpList', 'compExpList', 'compOverTime', 'echartPieImpTime', 'echartPieExpTime')
      })

      this.Api.getOverTimeStatics({
        "searchTime": this.month,
        "groupField": "GOODS"
      }).then((res) => {
        this.transformData(res, 'goodsImpList', 'goodsExpList', 'goodsOverTime', 'echartPieImpTop', 'echartPieExpTop')
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
      clearInterval(this.scrollOverTag)
    },
    starScroll() {
      this.clearScroll()
      if (this.items.length > 3) {
        this.scrollOverTag = setInterval(this.scroll, 2000)
      }
    },
    transformData(res, type1, type2, type3, cid1, cid2) {
      this[type1] = res.data.compImpList || []
      this[type2] = res.data.compExpList || []
      this[type3] = res.data


      let chartImpData = []
      let chartExpData = []
      this[type1].forEach(item => {
        item.value = item.percent
        item.name = item.groupValueName
        chartImpData.push(item)
      })
      this[type2].forEach(item => {
        item.value = item.percent
        item.name = item.groupValueName
        chartExpData.push(item)
      })


      this[cid1].series[0].data = chartImpData
      this[cid2].series[0].data = chartExpData
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
  padding: 0 0 0 0;
  height: 23.8vh;
  color: #fff;
  ul {
    width: 50%;
    min-height: 23.8vh;
    margin: 0;
    padding: 0;
    float: left;
    &.ranking-list-blue,
    &.ranking-list-red {
      li {
        position: relative;
        height: 4.7vh;
        line-height: 4.7vh;
        font-size: 12px;
        text-align: left;
        b {
          float: right;
        }
        .el-col {
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        .el-progress {
          position: absolute;
          width: 100%;
          bottom: 0;
          left: 0;
        }
      }
    }
    &.ranking-list-red {
      i {
        margin-top: -9px;
        width: 18px;
        height: 18px;
        line-height: 18px;
        font-size: 12px;
        font-style: normal;
        text-align: center;
        border-radius: 18px;
        background: #e44504 linear-gradient(to right, #ffa80f, #fc4b00);
        display: inline-block;
      }
    }
    &.ranking-list-blue {
      i {
        margin-top: -9px;
        width: 18px;
        height: 18px;
        line-height: 18px;
        font-size: 12px;
        font-style: normal;
        text-align: center;
        border-radius: 18px;
        background: #0066fb linear-gradient(to right, #14deff, #0066fb);
        display: inline-block;
      }
    }

    .ot-chart {
      height: 21vh;
      width: 100%;
    }
    .ot-title {
      height: 3vh;
      width: 100%;
      line-height: 3vh;
      color: #fff;
      text-align: center;
    }
  }
}

.chart-logistics-list {
  width: 810px;
  height: 19vh;
  margin: 3vh 0 0 20px;
  color: #fff;
  background: #0a185f;
  overflow: hidden;
  ul li {
    font-size: 14px;
    height: 4.6vh;
    line-height: 4.6vh;
    span {
      width: 12%;
      height: 4.6vh;
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
    width: 810px;
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
  height: 14vh;
  margin: 2vh 20px 0 0;
  h4 {
    margin-top: 8.5vh;
    text-align: center;
    font-size: 16px;
  }
  ul {
    position: relative;
    height: 7vh;
    &:first-child {
      z-index: 99;
      padding: 0;
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
          height: 6.5vh;
          width: 6.5vh;
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
          }
          &.icon05 {
            background: url("../assets/images/ico-05.png") no-repeat;
            background-size: contain;
          }
          &.icon06 {
            background: url("../assets/images/ico-06.png") no-repeat;
            background-size: contain;
          }
          &.icon07 {
            background: url("../assets/images/ico-07.png") no-repeat;
            background-size: contain;
          }
          &.icon-point {
            position: absolute;
            left: 50%;
            bottom: -2vh;
            width: 16px;
            height: 16px;
            margin-left: -8px;
            background: #231816;
            border: 1px solid #00daff;
            border-radius: 100%;
            &::after {
              position: absolute;
              content: "";
              left: 3px;
              top: 3px;
              width: 8px;
              height: 8px;
              background: #00daff;
              border-radius: 100%;
            }
          }
        }
      }
    }
    &:last-child {
      padding: 0;
      z-index: 9;
      &::after {
        position: absolute;
        top: 8px;
        left: 0;
        content: " ";
        width: 97%;
        height: 22px;
        background: linear-gradient(to bottom, #005fea, #12cbfd);
        z-index: -1;
      }
      .triangle-border-right {
        display: block;
        width: 0;
        height: 0;
        border-width: 22px 0 22px 22px;
        border-style: solid;
        border-color: transparent transparent transparent #078bf3;
        position: absolute;
        top: -3px;
        left: 96%;
      }
      .triangle-border-left {
        display: block;
        width: 0;
        height: 0;
        border-width: 22px 22px 22px 0;
        border-style: solid;
        border-color: transparent #078bf3 transparent transparent;
        position: absolute;
        top: -3px;
        left: -22px;
      }
      li {
        width: 18.5%;
        font-size: 13px;
        padding-top: 35px;
        color: #fff;
        font-weight: bold;
        float: left;
        overflow: hidden;
        text-align: center;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
}

.over-time-rate {
  float: left;
  width: 100%;
  text-align: center;
  ul {
    float: left;
    h2 {
      margin: 1vh 0;
    }
    &.top-city {
      width: 100%;
      li {
        font-size: 14px;
        line-height: 3vh;
        margin-left: 20px;
        color: #fff;
        .top-city-list {
          margin: 1vh 0;
          background: linear-gradient(to right, #0f0134, #0a2f8a);
          &.blue{
            background: linear-gradient(to right, #160728, #f16b16);
          }
          .el-col:first-child {
            text-align: left;
          }
        }
      }
    }
    &.top-goods {
      width: 100%;
      .top-goods-wrap {
        height: 23vh;
        margin-left: 20px;
      }
    }
  }
}

.top-goods-wrap {
  font-size: 12px;
  color: #fff;
  .top-goods-list {
    height: 4.5vh;
    line-height: 4.5vh;
    border-bottom: 1px solid #1d133c;
    overflow: hidden;
    .el-col:nth-child(2) {
      text-align: left;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    span {
      margin: 1.5vh 0;
      height: 1.5vh;
      background: #e44504 linear-gradient(to right, #ffa80f, #fc4b00);
      float: left;
      &.blue{
        background: #e44504 linear-gradient(to right, #14c6ee, #0f61e5);
      }
    }
  }
  .top-goods-chart {
    height: 23vh;
    font-size: 14px;
    .ot-chart {
      height: 20vh;
      width: 100%;
    }
    .ot-title {
      height: 3vh;
      width: 100%;
      font-size: 14px;
      line-height: 3vh;
      color: #fff;
      text-align: center;
    }
  }
}
.icon-red {
  width: 18px;
  height: 18px;
  line-height: 18px;
  font-size: 12px;
  font-style: normal;
  text-align: center;
  border-radius: 18px;
  background: #e44504 linear-gradient(to right, #ffa80f, #fc4b00);
  display: inline-block;
}
.icon-blue {
  width: 18px;
  height: 18px;
  line-height: 18px;
  font-size: 12px;
  font-style: normal;
  text-align: center;
  border-radius: 18px;
  background: #0066fb linear-gradient(to right, #14deff, #0066fb);
  display: inline-block;
}

[w-600-900] {
  position: relative;
  width: 550px;
  font-size: 15px;
  color: #52bdff;
  text-align: center;
  z-index: 99;
  float: left;
}
[w-600-900] {
  aspect-ratio: "550:900";
}

[w-800-900] {
  position: relative;
  width: 850px;
  height: 60vh;
  font-size: 16px;
  color: #52bdff;
  text-align: center;
  float: left;
}
[w-800-900] {
  aspect-ratio: "850:900";
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
.w40 {
  width: 40% !important;
}
.w50 {
  width: 50% !important;
}
.w60 {
  width: 60% !important;
}
.anim {
  animation: animList 1s;
  li:first-child {
    animation: animFirstList 1s;
  }
}
@keyframes animList {
  0% {
    margin-top: -4.6vh;
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
