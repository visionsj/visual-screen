<template>
  <div class="cl-cn-content">
    <div class="cl-cn-statistics">
      <el-row
        :gutter="20"
        flexcontainer
      >
        <el-col
          :span="6"
          w-250-50
          aspectratio
          aspect-ratio="250/50"
        >
          <div aspectratio-content> 全国进口时长：<b>{{statistics.importTime}}小时</b></div>
        </el-col>
        <el-col
          :span="6"
          w-250-50
          aspectratio
          aspect-ratio="250/50"
        >
          <div aspectratio-content>进口压缩比：<b>{{statistics.importPercent}}%</b></div>
        </el-col>
        <el-col
          :span="6"
          w-250-50
          aspectratio
          aspect-ratio="250/50"
        >
          <div aspectratio-content>全国出口时长：<b>{{statistics.exportTime}}小时</b></div>
        </el-col>
        <el-col
          :span="6"
          w-250-50
          aspectratio
          aspect-ratio="250/50"
        >
          <div aspectratio-content>出口压缩比：<b>{{statistics.exportPercent}}%</b></div>
        </el-col>
      </el-row>
    </div>
    <div class="cl-cn-charts">
      <el-row

        flexcontainer
      >
        <el-col
          :span="6"
          w-450-580
          aspectratio
          aspect-ratio="450/580"
        >
          <div aspectratio-content>
            <li>
              <h2>进口通关时长</h2>
              <div class="chart-list">
                <v-chart
                  :options="importTimeBarOpt"
                  :autoresize="true"
                  :theme="theme"
                />
              </div>
            </li>
            <li>
              <h2>进口通关时效压缩比</h2>
              <div class="chart-list">
                <v-chart
                  :options="importRateBarOpt"
                  :autoresize="true"
                  :theme="theme"
                />
              </div>
            </li>
          </div>
        </el-col>
        <el-col
          :span="12"
          w-500-580
          aspectratio
          aspect-ratio="500/580"
        >
          <div aspectratio-content>
            <div class="chart-map">
              <div class="map-tip">
                <p><span></span>进口（小时）</p>
                <p><span></span>出口（小时）</p>
              </div>

              <v-chart
                :options="mapOpt"
                :autoresize="true"
                :theme="theme"
              />
            </div>

            <div class="chart-map-list">
              <ul>
                <li class="list-head">
                  <span>省市</span> <span>出口</span> <span>压缩比</span> <span>进口</span> <span>压缩比</span>
                </li>
              </ul>
              <div
                id="map-list-content"
                @mousemove="clearScroll()"
                @mouseout="starScroll()"
              >
                <ul :class="{anim: animate == true}">
                  <li
                    v-for='(item, key) in items'
                    :key="key"
                  >
                    <span>{{item.name}}</span> <span>{{item.exportTime}}小时</span> <span>{{item.exportPercent}}%</span> <span>{{item.imporTime}}小时</span> <span>{{item.importPercent}}%</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </el-col>
        <el-col
          :span="6"
          w-450-580
          aspectratio
          aspect-ratio="450/580"
        >
          <div aspectratio-content>
            <li>
              <h2>出口通关时长</h2>
              <div class="chart-list">
                <v-chart
                  :options="exportTimeBarOpt"
                  :autoresize="true"
                  :theme="theme"
                />
              </div>
            </li>
            <li>
              <h2>出口通关时效压缩比</h2>
              <div class="chart-list">
                <v-chart
                  :options="exportRateBarOpt"
                  :autoresize="true"
                  :theme="theme"
                />
              </div>
            </li>
          </div>
        </el-col>
      </el-row>
    </div>
    <ClearanceChinaDetail :detailData='detailData' />
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import theme from '../plugins/echarts/theme'
import ClearanceChinaDetail from './ClearanceChinaDetail'
import { randomData, textSize, deepClone } from '../plugins/utils'
import cityPosition from '../plugins/special/cityPosition'

export default {
  data() {
    return {
      theme: theme,
      animate: false,
      scrollChinaTag: null,
      detailData: [],
      cityPosition: cityPosition,
      statistics: {},
      items: [],
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
          left: '3%',
          right: '3%',
          top: '14%',
          bottom: '5%',
          containLabel: true,

        },
        xAxis: [
          {
            type: 'category',
            axisLabel: {
              fontSize: '75%'
            },
            data: [],
            axisTick: {
              alignWithLabel: true
            }

          }
        ],
        yAxis: [
          {
            type: 'value',
            scale: true,
            name: '小时',
            min: 0,
            nameTextStyle: {
              fontSize: '75%'
            },
            axisLabel: {
              fontSize: '75%',
              interval: 0,
              formatter: function (value) {
                if (value < 100) {
                  return "  " + value;
                } else {
                  return value;
                }
              }
            },
            boundaryGap: [0.2, 0.2]
          }
        ],
        series: [
          {
            // name: '通关时长',
            type: 'bar',
            barWidth: '25%',
            itemStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [{
                  offset: 0, color: '#ff9c12' // 0% 处的颜色
                }, {
                  offset: 1, color: '#df2e02' // 100% 处的颜色
                }],
                global: false // 缺省为 false
              },
            },
            label: {
              normal: {
                show: true,
                position: 'top',
                textStyle: {
                  color: 'white'
                }
              }
            },

            data: []
          }
        ]
      },

      mapOpt: {
        tooltip: {
          trigger: 'item',
          backgroundColor: 'rgba(0,56,155,0.7)',
          borderColor: '#3c49ed',
          textStyle: {
            fontSize: '80%'
          },
          padding: 0,
          borderWidth: 0,
          borderRadius: 0,
          formatter: function (param) {
            var s = ''
            if (param.data) {
              s = '<div style="text-align:center; padding: 2% 5%; font-size:120%; background: #ff9c1a">'
                + (param.data.name || '') + '</div><div style="text-align:left;padding: 5%;">进口：'
                + (param.data.imporTime || '0') + '小时<br />出口：'
                + (param.data.exportTime || '0') + '小时<br />进口压缩比：'
                + (param.data.importPercent || '0') + '%<br />出口压缩比：'
                + (param.data.exportPercent || '0') + '%</div>'
            }
            return s
          },
          axisPointer: {            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow'          // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: '0',
          right: '0',
          top: '0',
          bottom: '0',
          containLabel: true
        },
        //配置属性
        series: [{
          type: 'map',
          mapType: 'china',
          zoom: 1.26,
          markPoint: {
            symbol: 'path://M51,37H5c-2.8,0-5-2.3-5-5V5c0-2.8,2.3-5,5-5h46c2.8,0,5,2.3,5,5v27C56,34.8,53.8,37,51,37z', // 'circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow', path://m 0,0 h 48 v 20 h -30 l -6,10 l -6,-10 h -6 z,  path://m 0,0 h 48 v 20 h -34 l -6,10 l -6,-10 h -2 z
            symbolSize: function (val, params) {
              return [textSize('100').width, textSize('100').height * 1.05]
            },
            symbolOffset: ['90%', '0%'],
            symbolKeepAspect: true,// 如果 symbol 是 path:// 的形式，是否在缩放时保持该图形的长宽比。
            itemStyle: {
              normal: {
                borderColor: '#87cefa',
                borderWidth: 0,            // 标注边线线宽，单位px，默认为1
                color: {
                  type: 'linear',
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [{
                    offset: 0, color: '#fe9d12' // 0% 处的颜色
                  }, {
                    offset: .49, color: '#fe9d12' // 0% 处的颜色
                  }, {
                    offset: .5, color: '#2ea5ff' // 0% 处的颜色
                  }, {
                    offset: 1, color: '#2ea5ff' // 100% 处的颜色
                  }],
                  global: false // 缺省为 false
                },
              },
              emphasis: {
                borderColor: '#fff',
                borderWidth: 0
              }
            },
            effect: {
              show: true,
              shadowBlur: 0
            },

            label: {
              // position: "insideTop",
              position: ['85%', '10%'],
              // distance: 3,
              textStyle: {
                fontSize: '80%',
                align: 'right',
                lineHeight: textSize('88').height * .47,
                color: '#fff'
              },
              formatter: function (data) {
                return '{a|' + data.data.imporTime + '}' + '\n' + '{b|' + data.data.exportTime + '}'
              },

              rich: {
                a: {
                  fontSize: '80%',
                  color: '#fff',
                  width: '100%',
                  // lineHeight: textSize('88','80%').height,
                },
                b: {
                  fontSize: '80%',
                  color: '#fff',
                  width: '100%',

                }
              }
            },

            data: []
          },

          itemStyle: {
            normal: {
              areaColor: '#3c49ed',
              borderWidth: 1,
              borderColor: '#0f0134',
            },
            emphasis: {
              areaColor: '#4b58ff',
              borderColor: '#0f0134',
            }
          },
          label: {
            normal: {
              show: false,  //省份名称  
              textStyle: {
                fontSize: '75%',
                color: '#fff'
              }
            },
            emphasis: {
              color: '#fff',
              fontSize: '85%',
              fontWeight: 'bold',
              show: true
            }
          },
          data: []
        }]
      },

      importTimeBarOpt: {},
      importRateBarOpt: {},
      exportTimeBarOpt: {},
      exportRateBarOpt: {}
    }
  },
  mounted() {
    // 进口通关时效压缩比
    this.importTimeBarOpt = deepClone(this.echartBarOpt)

    this.importRateBarOpt = deepClone(this.echartBarOpt)

    // this.importRateBarOpt.series[0].name = "通关时效压缩比"
    this.importRateBarOpt.yAxis[0].name = "百分比"
    this.importRateBarOpt.yAxis[0].max = 100
    // this.importRateBarOpt.tooltip.formatter = '{b0}<br/><span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:#fd970f"></span>{a0}:{c0}' + '%'
    this.importRateBarOpt.yAxis[0].axisLabel.formatter = '{value}'


    this.importRateBarOpt.series[0].itemStyle.color.colorStops = [{
      offset: 0, color: '#14ccfe' // 0% 处的颜色
    }, {
      offset: 1, color: '#015ee9' // 100% 处的颜色
    }]

    // 出口通关时效
    this.exportTimeBarOpt = deepClone(this.echartBarOpt)

    this.exportRateBarOpt = deepClone(this.echartBarOpt)
    // this.exportRateBarOpt.series[0].name = "通关时效压缩比"
    this.exportRateBarOpt.yAxis[0].name = "百分比"
    this.exportRateBarOpt.yAxis[0].max = 100

    // this.exportRateBarOpt.tooltip.formatter = '{b0}<br/><span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:#fd970f"></span>{a0}:{c0}' + '%'
    this.exportRateBarOpt.yAxis[0].axisLabel.formatter = '{value}'
    this.exportRateBarOpt.series[0].itemStyle.color.colorStops = [{
      offset: 0, color: '#14ccfe' // 0% 处的颜色
    }, {
      offset: 1, color: '#015ee9' // 100% 处的颜色
    }]

    this.getNationData()
  },
  computed: {
    ...mapState({
      month: state => state.Head.month,
      status: state => state.Head.cityStatus
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
        if (valNew == '3') {
          this.importTimeBarOpt.xAxis[0].axisLabel.rotate = 45
          this.exportTimeBarOpt.xAxis[0].axisLabel.rotate = 45
          this.importRateBarOpt.xAxis[0].axisLabel.rotate = 45
          this.exportRateBarOpt.xAxis[0].axisLabel.rotate = 45
        } else {
          this.importTimeBarOpt.xAxis[0].axisLabel.rotate = 0
          this.exportTimeBarOpt.xAxis[0].axisLabel.rotate = 0
          this.importRateBarOpt.xAxis[0].axisLabel.rotate = 0
          this.exportRateBarOpt.xAxis[0].axisLabel.rotate = 0
        }
      }
    }
  },
  destroyed() {
    this.clearScroll()
  },
  methods: {
    getNationData() {   // 初努化地图
      this.clearScroll()
      let monthForm = this.month.substr(0, 4) + '-' + this.month.substr(4, 2)
      this.Api.getNationClearanceTime({
        'month': monthForm,
        'areaType': this.status
      }).then((res) => {
        this.statistics = res.data.statistics // 统计数据
        this.items = res.data.items  // 城市滚动

        let mapItems = [].concat(res.data.items)
        this.mapOpt.series[0].markPoint.data = []
        if (mapItems.length > 0) {
          mapItems.forEach((item, index) => {
            this.cityPosition[this.status].forEach((citem, index) => {

              if (citem.name === item.name) {
                item = Object.assign(item, citem)
                this.mapOpt.series[0].markPoint.data.push(item)
              }
            })
          })
          this.mapOpt.series[0].data = mapItems // 地图
        }


        this.importTimeBarOpt.xAxis[0].data = res.data.importTimeBarOpt.xdate  // 柱状图
        this.importTimeBarOpt.series[0].data = res.data.importTimeBarOpt.ydate

        this.importRateBarOpt.xAxis[0].data = res.data.importRateBarOpt.xdate
        this.importRateBarOpt.series[0].data = res.data.importRateBarOpt.ydate

        this.exportTimeBarOpt.xAxis[0].data = res.data.exportTimeBarOpt.xdate
        this.exportTimeBarOpt.series[0].data = res.data.exportTimeBarOpt.ydate

        this.exportRateBarOpt.xAxis[0].data = res.data.exportRateBarOpt.xdate
        this.exportRateBarOpt.series[0].data = res.data.exportRateBarOpt.ydate

        this.starScroll()
      })
    },

    showDetail(e) {
      let data = e.data || e || {}
      this.changeCleanChinaDetailState(true)
      this.changeHeadTitle(data.name + '口岸通关时效概览')

      this.Api.getCityStatics({
        "cityCode": data.cityCode
      }).then(res => {
        this.detailData = (res.data instanceof Array && res.data) || []
      })
    },
    scroll() {
      this.animate = true;
      setTimeout(() => {
        this.items.push(this.items[0]);
        this.items.shift();
        this.animate = false;
      }, 500)
    },
    clearScroll() {
      clearInterval(this.scrollChinaTag)
    },
    starScroll() {
      if (this.items.length > 3) {
        this.scrollChinaTag = setInterval(this.scroll, 2000)
      }
    },
    ...mapMutations([
      "changeCleanChinaDetailState",
      "changeHeadTitle",
    ])
  },
  components: {
    ClearanceChinaDetail
  }
}
</script>

<style lang="scss" rel="style/scss" scoped>
.cl-cn-statistics {
  height: 7vh;
  margin-top: 3vh;
  text-align: center;
  overflow: hidden;
  background: url("../assets/images/header-bot-bg.png") bottom center no-repeat;
  .el-row {
    top: 50%;
    transform: translateY(-50%);
  }
  b {
    font-size: 20px;
    color: #ff9d11;
  }
}

[w-250-50] {
  font-size: 16px;
  font-weight: bold;
  color: #fff;
  text-align: center;
}
[w-250-50] {
  aspect-ratio: "250:50";
}

.cl-cn-charts {
  height: 78vh;
  margin-top: 2vh;
  overflow: hidden;
}
.cl-cn-charts h2 {
  font-size: 18px;
  height: 3vh;
  margin: 1vh 0 0;
}

.chart-list {
  width: 425px;
  height: 35vh;
}

.chart-map {
  position: absolute;
  top: -10px;
  left: 5px;
  width: 550px;
  height: 60vh;
  .map-tip {
    position: absolute;
    left: 60px;
    bottom: 50px;
    font-size: 12px;
    color: #fff;
    p {
      margin-bottom: 2px;
      &:last-child {
        span {
          background: #2ea5ff;
        }
      }
      span {
        width: 20px;
        height: 12px;
        margin: 0 10px 0;
        vertical-align: bottom;
        background: #fe9d12;
        border-radius: 4px;
        display: inline-block;
      }
    }
  }
}

.chart-map-list {
  position: absolute;
  bottom: 1.5vh;
  left: 0;
  width: 550px;
  height: 18vh;
  color: #fff;
  background: #0a185f;
  .list-head {
    font-size: 14px;
    font-weight: bold;
    background: #ff9c1a;
  }
  ul li {
    font-size: 14px;
    height: 4.5vh;
    line-height: 4.5vh;
    span {
      width: 20%;
      float: left;
    }
  }
}
[w-450-580] {
  position: relative;
  width: 425px;
  padding: 0 !important;
  font-size: 15px;
  color: #52bdff;
  text-align: center;
  z-index: 99;
}
[w-450-580] {
  aspect-ratio: "425:580";
}

[w-500-580] {
  position: relative;
  width: 550px;
  height: 78vh;
  padding: 0 !important;
  font-size: 16px;
  color: #52bdff;
  text-align: center;
}
[w-500-580] {
  aspect-ratio: "550:580";
}
.echarts {
  width: 100%;
  height: 100%;
}

#map-list-content {
  width: 550px;
  height: 13.5vh;
  overflow: hidden;
  ul li {
    &:hover {
      // cursor: pointer;
      background: rgba(43, 112, 223, 0.3);
    }
  }
}
.anim {
  transition: all 0.5s;
  margin-top: -4.5vh;
}
</style>
