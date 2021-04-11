<template>
  <div class="cl-cn-content">
    <div class="cl-cn-charts">
      <el-row :gutter="20" flexcontainer>
        <el-col :span="8" w-450-580 aspectratio aspect-ratio="450/580">
          <div aspectratio-content>
            <li>
              <h2>进口一体化放行</h2>
              <div class="chart-list">
                <div class="chart-list-content">
                  <div class="clc-chart">
                    <v-chart
                      :options="echartProcessOpt"
                      :autoresize="true"
                      :theme="theme"
                    />
                  </div>
                  <div class="clc-tip">一体化放行占比：{{ iLPercent }}%</div>
                </div>
                <div class="chart-list-content">
                  <v-chart
                    :options="echartBarOpt"
                    :autoresize="true"
                    :theme="theme"
                  />
                </div>
              </div>
            </li>
            <li>
              <h2>出口一体化放行</h2>
              <div class="chart-list">
                <div class="chart-list-content">
                  <div class="clc-chart">
                    <v-chart
                      :options="echartProcessOpt1"
                      :autoresize="true"
                      :theme="theme"
                    />
                  </div>
                  <div class="clc-tip">一体化放行占比：{{ eLPercent }}%</div>
                </div>
                <div class="chart-list-content">
                  <v-chart
                    :options="echartBarOpt1"
                    :autoresize="true"
                    :theme="theme"
                  />
                </div>
              </div>
            </li>
          </div>
        </el-col>
        <el-col :span="8" w-500-580 aspectratio aspect-ratio="500/580">
          <div aspectratio-content>
            <h2>进口通关阶段时长</h2>
            <div class="chart-list-middle">
              <v-chart
                :options="echartStackOpt"
                :autoresize="true"
                :theme="theme"
              />
            </div>
            <h2>出口通关阶段时长</h2>
            <div class="chart-list-middle">
              <v-chart
                :options="echartStackOpt1"
                :autoresize="true"
                :theme="theme"
              />
            </div>
          </div>
        </el-col>
        <el-col :span="8" w-450-580 aspectratio aspect-ratio="450/580">
          <div aspectratio-content>
            <li>
              <h2>进口散杂货</h2>
              <div class="chart-list">
                <div class="chart-list-content">
                  <div class="clc-chart">
                    <v-chart
                      :options="echartPie"
                      :autoresize="true"
                      :theme="theme"
                    />
                  </div>
                  <div class="clc-tip">散杂货占比：{{ iRPercent }}%</div>
                </div>
                <div class="chart-list-content">
                  <v-chart
                    :options="echartBarOpt2"
                    :autoresize="true"
                    :theme="theme"
                  />
                </div>
              </div>
            </li>
            <li>
              <h2>出口散杂货</h2>
              <div class="chart-list">
                <div class="chart-list-content">
                  <div class="clc-chart">
                    <v-chart
                      :options="echartPie1"
                      :autoresize="true"
                      :theme="theme"
                    />
                  </div>
                  <div class="clc-tip">散杂货占比：{{ eRPercent }}%</div>
                </div>
                <div class="chart-list-content">
                  <v-chart
                    :options="echartBarOpt3"
                    :autoresize="true"
                    :theme="theme"
                  />
                </div>
              </div>
            </li>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="cl-cn-charts-bottom">
      <el-row :gutter="0" flexcontainer>
        <el-col :span="12" w-700-300 aspectratio aspect-ratio="700/300">
          <h2>进口运输方式占比及通关时长</h2>
          <div class="cccb-chart">
            <v-chart
              :options="echartBarOpt4"
              :autoresize="true"
              :theme="theme"
            />
          </div>
          <div class="cccb-chart">
            <v-chart
              :options="echartPictorialBar"
              :autoresize="true"
              :theme="theme"
            />
          </div>
          <div class="cccb-chart">
            <v-chart
              :options="echartPieTime"
              :autoresize="true"
              :theme="theme"
            />
          </div>
        </el-col>
        <el-col :span="12" w-700-300 aspectratio aspect-ratio="700/300">
          <h2>出口运输方式占比及通关时长</h2>
          <div class="cccb-chart">
            <v-chart
              :options="echartPieTime1"
              :autoresize="true"
              :theme="theme"
            />
          </div>
          <div class="cccb-chart">
            <v-chart
              :options="echartPictorialBar1"
              :autoresize="true"
              :theme="theme"
            />
          </div>
          <div class="cccb-chart">
            <v-chart
              :options="echartBarOpt5"
              :autoresize="true"
              :theme="theme"
            />
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import theme from '../plugins/echarts/theme'
import { randomData, textSize, tooltipPosition, deepClone, docFontSize } from '../plugins/utils'
var pathSymbols = {
  train: 'path://M0,57v39.4c0,14.4,12.1,26.4,26.9,26.4h3.2l4.6-7.9c0.9-1.9,3.2-3.2,5.6-3.2h40.8c2.3,0,4.2,0.9,5.1,2.8l5.6,7.9H95c14.8,0,26.9-12.1,26.9-26.4V26c0-13.9-12.1-26-26.9-26l0,0H26.9C12.1,0,0,12.1,0,26.4V57 M45.4,11.6c0-2.3,1.9-4.2,4.2-4.2h22.7c2.3,0,4.2,1.9,4.2,4.2v0.5c0,2.3-1.9,4.2-4.2,4.2H49.6c-2.3,0-4.2-1.9-4.2-4.2V11.6z M22.7,96.4c-5.1,0-8.8-3.7-8.8-8.8c0-4.6,3.7-8.8,8.8-8.8c5.1,0,8.8,3.7,8.8,8.8C31.5,92.2,27.3,96.4,22.7,96.4L22.7,96.4z M99.2,96.4c-5.1,0-8.8-3.7-8.8-8.8c0-4.6,3.7-8.8,8.8-8.8c5.1,0,8.8,3.7,8.8,8.8C108,92.2,103.8,96.4,99.2,96.4L99.2,96.4z M108,31.1v29.7c0,4.6-3.7,8.3-8.3,8.3H21.8c-4.6,0-8.3-3.7-8.3-8.3V31.1c0-4.6,3.7-8.3,8.3-8.3h77.9C104.3,22.7,108,26.4,108,31.1L108,31.1zM108,31.1M78.8,118.2H43.6c-0.9,0-2.3,0.5-2.8,1.4L24.6,146h12.5l3.7-6h41.7l3.7,6h12.5l-16.2-26.4C81.1,118.7,79.7,118.2,78.8,118.2L78.8,118.2z M46.3,129.3l3.2-5.6h22.2l3.2,5.6H46.3z M46.3,129.3',
  plane: 'path://M120.5,37.8c-5-9-24,0-44,11l-22-11c2-1,2-2,1-3c-1-1-2-2-3-1l-3,2l-21-11c-3-1-5-1-7,2c-1,2,0,4,2,6l29,32c-12,9-22,16-28,21l-19-6c-2-1-5,1-5,3c0,0,9,8,11,13c3,5,6,16,6,16c3,2,5,0,6-2l3-12c0,0,1,0,2-1c0,0,17-7,36-17l14,40c1,3,2,4,4,4c2,0,4-2,4-4l1-21l2-2c2,1,2,0,1-1c0-1-2-2-3-1v-27C107.5,56.8,125.5,44.8,120.5,37.8L120.5,37.8z M120.5,37.8',
  customs: 'path://M103.9,77.8l-40-16c-2.3-0.9-4.9-0.9-7.3,0l-40,16V43.2c0-4.6,3.6-8.4,8-8.4h71.4c4.4,0,8,3.8,8,8.4V77.8zM103.9,77.8M121.4,85.2c-0.9-2.9-3-5.2-5.7-6.3l-8.6-3.5c0-0.1,0-0.2,0-0.2V41.7c0-5.7-4.4-10.4-9.8-10.4h-12V18c0-5.7-4.4-10.4-9.8-10.4H44.6c-5.4,0-9.8,4.6-9.8,10.4v13.4H23.1c-5.4,0-9.8,4.6-9.8,10.4v33.5c0,0.3,0,0.6,0.1,0.8l-7.2,3c-2.7,1.1-4.8,3.4-5.7,6.3c-0.9,2.9-0.6,6,0.8,8.6l20.8,37.4h-7.9c-1.8,0-3.3,1.5-3.3,3.5c0,1.9,1.5,3.5,3.3,3.5h92.3c1.8,0,3.3-1.5,3.3-3.5c0-1.9-1.5-3.5-3.3-3.5h-6.9l20.8-37.4C122,91.3,122.3,88.1,121.4,85.2L121.4,85.2z M41.4,18c0-1.9,1.5-3.5,3.3-3.5h30.9c1.8,0,3.3,1.6,3.3,3.5v13.4H41.4V18z M19.8,41.7c0-1.9,1.5-3.5,3.3-3.5h74.3c1.8,0,3.3,1.6,3.3,3.5v31L66.9,58.8c-3.8-1.6-8-1.6-11.9,0L19.8,73.4L19.8,41.7L19.8,41.7z M115,90.4l-22.8,40.9H29.8L7,90.4c-0.5-0.9-0.6-1.9-0.3-2.9c0.3-1,1-1.7,1.9-2.1l48.8-20.2c2.3-0.9,4.8-0.9,7.1,0l48.8,20.2c0.9,0.4,1.6,1.1,1.9,2.1C115.6,88.5,115.4,89.5,115,90.4L115,90.4z M115,90.4M93.1,86.4H82c-2.1,0-3.7,1.7-3.7,3.9c0,2.2,1.6,3.9,3.7,3.9h11.1c2.1,0,3.7-1.7,3.7-3.9C96.8,88.1,95.1,86.4,93.1,86.4L93.1,86.4z M93.1,86.4',
  other: 'path://M37.6,13.5H19.7C9.7,13.5,0,20,0,29.9v17.9C0,57.6,9.5,67,19.5,67h18c18.2,0,16.6-0.6,16.6-19.3V29.9C54.1,20,47.5,13.5,37.6,13.5L37.6,13.5z M37.6,79H19.7c-10,0-19.5,6.5-19.5,16.4v17.9c0,9.9,9.5,19.3,19.5,19.3h18c10,0,16.6-9.4,16.6-19.3V95.4C54.1,78.1,55,79,37.6,79L37.6,79z M103.7,13.5h-18c-10,0-19.5,6.5-19.5,16.4v17.9c0,18,1.3,19.3,19.5,19.3h18c10,0,16.6-9.4,16.6-19.3V29.9C120.3,20,113.7,13.5,103.7,13.5L103.7,13.5z M103.7,79h-18c-18.2,0-19.5-1.7-19.5,16.4v17.9c0,9.9,9.5,19.3,19.5,19.3h18c10,0,16.6-9.4,16.6-19.3V95.4C120.3,85.5,113.7,79,103.7,79L103.7,79z M103.7,79',
};
export default {
  data() {
    return {
      theme: theme,
      animate: false,
      scrollTag: null,
      iLPercent: 0,
      eLPercent: 0,
      iRPercent: 0,
      eRPercent: 0,
      echartProcessOpt: {
        tooltip: {
          show: false,
          formatter: "{a} <br/>{c} {b}",
          textStyle: {
            fontSize: '75%'
          },
        },
        series: [
          {
            name: '一体化放行',
            type: 'gauge',
            min: 0,
            max: 100,
            center: ['50%', '55%'],
            splitNumber: 10,
            radius: '80%',
            axisLine: {            // 坐标轴线
              lineStyle: {       // 属性lineStyle控制线条样式
                color: [[1, '#1e90ff']],
                width: 3,
                shadowColor: '#fff', //默认透明
                shadowBlur: 5
              }
            },
            axisLabel: {            // 坐标轴小标记
              textStyle: {       // 属性lineStyle控制线条样式
                fontSize: '70%',
                color: '#fff',
                shadowColor: '#fff', //默认透明
                shadowBlur: 5
              }
            },
            axisTick: {            // 坐标轴小标记
              length: '10%',        // 属性length控制线长
              lineStyle: {       // 属性lineStyle控制线条样式
                color: 'auto',
                shadowColor: '#fff', //默认透明
                shadowBlur: 5
              }
            },
            pointer: {
              show: true,
              length: '80%',
              width: '4vw',
              shadowColor: '#1E90FF', //默认透明
              shadowBlur: 5
            },
            splitLine: {           // 分隔线
              length: '15%',         // 属性length控制线长
              lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
                width: 3,
                color: '#fff',
                shadowColor: '#fff', //默认透明
                shadowBlur: 5
              }
            },
            title: {
              offsetCenter: [0, '60%'],
              textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                color: 'red',
                fontSize: '75%'
              }
            },
            detail: {
              show: false
            },
            data: []
          }
        ]
      },
      echartPie: {
        title: {
          show: true,
          text: '',
          x: 'center',
          y: 'center',
          textStyle: {
            fontSize: '140%',
            color: '#fff'
          }
        },
        series: {
          name: '',
          type: 'pie',
          radius: ['65%', '75%'],
          avoidLabelOverlap: true,
          hoverAnimation: false,
          label: {
            normal: {
              show: true,
              position: 'center'
            },
            emphasis: {
              show: true
            }
          },
          labelLine: {
            normal: {
              show: true
            }
          },
          data: [
          ]
        },
        color: ['#2EA6FF', '#00389B']
      },
      echartBarOpt: {
        tooltip: {
          trigger: 'axis',
          textStyle: {
            fontSize: '75%'
          },
          axisPointer: {            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow'          // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: '5%',
          right: '3%',
          top: '20%',
          bottom: '5%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            // name: '地区',
            // nameTextStyle: {
            //     fontSize: '75%'
            // },
            axisLabel: {
              interval: 0,
              textStyle: {
                fontSize: '75%'
              }
            },
            data: ['一体化放行', '非一体化放行'],
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            scale: true,
            min: 0,
            name: '小时',
            nameGap: 10, // 控制name和坐标轴的距离
            nameTextStyle: {
              fontSize: '75%'
            },
            axisLabel: {
              margin: 5,
              textStyle: {
                fontSize: '75%'
              }
            },
            boundaryGap: [0.2, 0.2]
          }
        ],
        series: [
          {
            name: '',
            type: 'bar',
            barWidth: '20%',
            itemStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
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
      echartStackOpt: {
        tooltip: {
          trigger: 'axis',
          textStyle: {
            fontSize: '75%'
          },
          axisPointer: {            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow'          // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        color: ['#2cd0c0', '#068fff'],
        legend: {
          x: 'center',
          y: '2%',
          icon: "circle",
          // itemWidth: textSize('准许').width * .2,
          // itemHeight: 10,
          // itemGap: textSize('申报-放行').width * .3,
          textStyle: {
            fontSize: docFontSize()
          },
          data: ['抵港-申报', '申报-放行']
        },
        grid: {
          left: '5%',
          right: '10%',
          top: '20%',
          bottom: '5%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'value',
            name: '小时',
            nameTextStyle: {
              fontSize: '75%'
            },
            axisLabel: {
              textStyle: {
                fontSize: '75%'
              }
            },
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            type: 'category',
            scale: true,
            name: '统计口径',
            nameTextStyle: {
              fontSize: '75%'
            },
            axisLabel: {
              textStyle: {
                fontSize: '75%'
              }
            },
            boundaryGap: [0.2, 0.2],
            data: []
          }
        ],
        series: [
          {
            name: '抵港-申报',
            type: 'bar',
            stack: '总量',
            barWidth: '30%',
            data: []
          },
          {
            name: '申报-放行',
            type: 'bar',
            stack: '总量',
            barWidth: '30%',
            data: []
          }
        ]
      },

      echartPieTime: {
        tooltip: {
          trigger: 'item',
          textStyle: {
            fontSize: '75%'
          },
          formatter: "{a} <br/>{b} : {d}%"
        },
        color: ['#fe9d12', '#0690ff', '#2bd0c0', '#8881f5'],
        legend: {
          show: false,
          orient: 'vertical',
          x: 'left',
          data: []
        },
        calculable: false,
        series: [
          {
            name: '运输方式占比',
            type: 'pie',
            radius: ['40%', '60%'],

            // for funnel
            x: '60%',
            width: '35%',
            funnelAlign: 'left',
            max: 1048,
            itemStyle: {
              normal: {
                label: {
                  show: true,
                  position: 'outer',
                  textStyle: {
                    fontSize: '70%'
                  },
                  formatter: function (obj) {
                    return obj.name + '\n' + parseInt(obj.percent) + '%'
                  }
                }
              }
            },

            data: []
          }
        ]
      },

      echartPictorialBar: {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'none'
          },
          formatter: function (params) {
            return params[1].name + ': ' + params[1].value + '单';
          }
        },
        grid: [{
          left: '5%',
          bottom: '15%',
          top: '20%',
          right: '20%',
        }],
        xAxis: {
          name: '单量',
          nameTextStyle: {
            fontSize: '75%'
          },
          data: [],
          axisTick: { show: false },
          axisLine: { show: false },
          axisLabel: {
            textStyle: {
              color: '#fff'
            }
          }
        },
        yAxis: {
          min: 0,
          splitLine: { show: false },
          axisTick: { show: false },
          axisLine: { show: false },
          axisLabel: { show: false }
        },
        color: ['#00a2ff', '#00a2ff'],
        series: [{
          name: 'hill',
          type: 'pictorialBar',
          barCategoryGap: '-130%',
          // symbol: 'path://M0,10 L10,10 L5,0 L0,10 z',
          symbol: 'path://M0,10 L10,10 C5.5,10 5.5,5 5,0 C4.5,5 4.5,10 0,10 z',
          itemStyle: {
            normal: {
              opacity: .7
            },
            emphasis: {
              opacity: 1
            }
          },
          data: [],
          z: 10
        }, {
          name: 'glyph',
          type: 'pictorialBar',
          barGap: '-100%',
          symbolPosition: 'end',
          symbolOffset: [0, '-100%'],
          data: []
        }]
      },

      echartPie1: {},
      echartPieTime1: {},
      echartProcessOpt1: {},
      echartBarOpt1: {},
      echartBarOpt2: {},
      echartBarOpt3: {},
      echartBarOpt4: {},
      echartBarOpt5: {},
      echartStackOpt1: {},
      echartPictorialBar1: {}
    }
  },
  mounted() {
    this.echartPieTime1 = deepClone(this.echartPieTime)
    this.echartPie1 = deepClone(this.echartPie)
    this.echartPie1.color = ['#FF9C1A', '#00389B']

    this.echartProcessOpt1 = deepClone(this.echartProcessOpt)

    this.echartBarOpt1 = deepClone(this.echartBarOpt)
    this.echartBarOpt2 = deepClone(this.echartBarOpt)
    this.echartBarOpt3 = deepClone(this.echartBarOpt)
    this.echartBarOpt4 = deepClone(this.echartBarOpt)
    this.echartBarOpt5 = deepClone(this.echartBarOpt)

    this.echartBarOpt1.series[0].itemStyle.color.colorStops = [{
      offset: 0, color: '#94fdf0' // 0% 处的颜色
    }, {
      offset: 1, color: '#2cd0c0' // 100% 处的颜色
    }]


    this.echartBarOpt2.xAxis[0].data = ['散杂货', '集装箱货']
    this.echartBarOpt2.series[0].itemStyle.color.colorStops = [{
      offset: 0, color: '#ff9c12' // 0% 处的颜色
    }, {
      offset: 1, color: '#df2e02' // 100% 处的颜色
    }]

    this.echartBarOpt3.xAxis[0].data = ['散杂货', '集装箱货']
    this.echartBarOpt3.series[0].itemStyle.color.colorStops = [{
      offset: 0, color: '#ff9c12' // 0% 处的颜色
    }, {
      offset: 1, color: '#df2e02' // 100% 处的颜色
    }]

    this.echartBarOpt4.series[0].barWidth = '30%'
    this.echartBarOpt4.series[0].itemStyle.color.colorStops = [{
      offset: 0, color: '#ff9c12' // 0% 处的颜色
    }, {
      offset: 1, color: '#df2e02' // 100% 处的颜色
    }]


    this.echartBarOpt5.series[0].barWidth = '30%'


    // 出口通关阶段
    this.echartStackOpt1 = deepClone(this.echartStackOpt)
    this.echartStackOpt1.color = ['#fdda65', '#068fff']
    this.echartStackOpt1.legend.data = ['运抵-申报', '申报-放行']
    this.echartStackOpt1.series[0].name = '运抵-申报'

    this.echartPictorialBar1 = deepClone(this.echartPictorialBar)
    this.echartPictorialBar1.color = ['#ffae00', '#ffae00']

    this.getEchartData()

  },
  computed: {
    ...mapState({
      month: state => state.Head.month,
      city: state => state.Head.city
    })
  },
  watch: {
    month: function (valNew, valOld) {
      if (valNew !== valOld) {
        this.getEchartData()
      }
    },
    city: function (valNew, valOld) {
      if (valNew !== valOld) {
        this.getEchartData()
      }
    }
  },

  methods: {
    getEchartData() {
      // 通关阶段时长
      this.Api.getTransStatics({
        "searchTime": this.month,
        "iEMark": "I",
        "city": this.city,
        "groupField": "LINK"
      }).then((res) => {
        this.echartStackOpt.yAxis[0].data = res.data.one || []
        this.echartStackOpt.series[0].data = [res.data.two[0] || 0, res.data.three[0] || 0]
        this.echartStackOpt.series[1].data = [res.data.two[1] || 0, res.data.three[1] || 0]
      })
      this.Api.getTransStatics({
        "searchTime": this.month,
        "iEMark": "E",
        "city": this.city,
        "groupField": "LINK"
      }).then((res) => {
        this.echartStackOpt1.yAxis[0].data = res.data.one || []
        this.echartStackOpt1.series[0].data = [res.data.two[0] || 0, res.data.three[0] || 0]
        this.echartStackOpt1.series[1].data = [res.data.two[1] || 0, res.data.three[1] || 0]
      })

      // 一体化放行
      this.Api.getTransStatics({
        "searchTime": this.month,
        "iEMark": "I",
        "city": this.city,
        "groupField": "IWR"
      }).then((res) => {
        this.iLPercent = res.data.percent
        this.echartProcessOpt.series[0].name = '进口一体化放行'
        this.echartProcessOpt.series[0].data = [res.data.percent]

        this.echartBarOpt.series[0].data = res.data.one || []
      })
      this.Api.getTransStatics({
        "searchTime": this.month,
        "iEMark": "E",
        "city": this.city,
        "groupField": "IWR"
      }).then((res) => {
        this.eLPercent = res.data.percent

        this.echartProcessOpt1.series[0].name = '出口一体化放行'
        this.echartProcessOpt1.series[0].data = [res.data.percent]

        this.echartBarOpt1.series[0].data = res.data.one || []
      })

      // 散杂货
      this.Api.getTransStatics({
        "searchTime": this.month,
        "iEMark": "I",
        "city": this.city,
        "groupField": "CONTAINER"
      }).then((res) => {
        this.echartBarOpt2.series[0].data = res.data.one || []
        this.echartPie.title.text = res.data.percent + '%'
        this.iRPercent = res.data.percent
        this.echartPie.series.data = [
          { name: '', value: res.data.percent },
          { name: '', value: 100 - parseInt(res.data.percent) },
        ]
      })
      this.Api.getTransStatics({
        "searchTime": this.month,
        "iEMark": "E",
        "city": this.city,
        "groupField": "CONTAINER"
      }).then((res) => {
        this.echartBarOpt3.series[0].data = res.data.one || []
        this.echartPie1.title.text = res.data.percent + '%'
        this.eRPercent = res.data.percent
        this.echartPie1.series.data = [
          { name: '', value: res.data.percent },
          { name: '', value: 100 - parseInt(res.data.percent) },
        ]
      })

      // 运输方式占比及通关时长
      this.Api.getTransStatics({
        "searchTime": this.month,
        "iEMark": "I",
        "city": this.city,
        "groupField": "TRANS"
      }).then((res) => {
        this.echartBarOpt4.xAxis[0].data = res.data.one || []
        this.echartBarOpt4.series[0].data = res.data.two || []

        this.echartPictorialBar.series[0].data = res.data.three || []
        this.echartPictorialBar.xAxis.data = res.data.three || []

        this.echartPieTime.legend.data = res.data.one || []
        this.echartPieTime.series[0].data = this.transTimeData(res.data)
        this.transPictorData(res.data, 'echartPictorialBar')
      })
      this.Api.getTransStatics({
        "searchTime": this.month,
        "iEMark": "E",
        "city": this.city,
        "groupField": "TRANS"
      }).then((res) => {
        this.echartBarOpt5.xAxis[0].data = res.data.one || []
        this.echartBarOpt5.series[0].data = res.data.two || []

        this.echartPictorialBar1.series[0].data = res.data.three || []
        this.echartPictorialBar1.xAxis.data = res.data.three || []

        this.echartPieTime1.legend.data = res.data.one || []
        this.echartPieTime1.series[0].data = this.transTimeData(res.data)
        this.transPictorData(res.data, 'echartPictorialBar1')

      })

    },
    transTimeData(data) {
      let timeData = []
      if (data.one instanceof Array) {
        data.one.forEach((item, index) => {
          timeData.push({ name: item, value: data.four[index] })
        })
      }
      return timeData
    },
    transPictorData(data, ele) {
      let symData = []
      if (data.one instanceof Array) {
        data.one.forEach((item, index) => {
          if (item == '海运') {
            symData.push({ value: data.three[index], name: '海运', symbolSize: [25, 30], symbol: pathSymbols.customs })
          } else if (item == '铁路') {
            symData.push({ value: data.three[index], name: '铁路', symbolSize: [25, 30], symbol: pathSymbols.train })
          } else if (item == '空运') {
            symData.push({ value: data.three[index], name: '空运', symbolSize: [30, 30], symbol: pathSymbols.plane })
          } else if (item == '其他') {
            symData.push({ value: data.three[index], name: '其他', symbolSize: [20, 20], symbol: pathSymbols.other })
          }
        })
      }

      this[ele].series[1].data = symData
    }
  }
}
</script>

<style lang="scss" rel="style/scss" scoped>
.cl-cn-charts {
  height: 60vh;
  overflow: hidden;
}
.cl-cn-charts-bottom {
  height: 30vh;
  overflow: hidden;
}
.cl-cn-charts-bottom h2,
.cl-cn-charts h2 {
  font-size: 18px;
  height: 3vh;
  margin: 2.5vh 0 1.5vh;
  color: #52bdff;
  text-align: center;
}

.chart-list {
  width: 450px;
  height: 23vh;
  .chart-list-content {
    position: relative;
    width: 225px;
    height: 23vh;
    float: left;

    .clc-chart {
      width: 225px;
      height: 23vh;
      margin-top: -1vh;
    }
    .clc-tip {
      position: absolute;
      bottom: 5%;
      width: 100%;
      font-size: 75%;
      line-height: 150%;
      color: #fff;
      text-align: center;
      span {
        width: 10px;
        height: 5px;
        vertical-align: middle;
        margin-right: 5px;
        display: inline-block;
      }
      span.noassure {
        background: #1e90ff;
      }
      span.assure {
        background: #f2433b;
      }
    }
  }
  .clcc-pie {
    position: relative;
    width: 130px;
    height: 23vh;
    float: left;
    .chart {
      width: 150px;
      height: 11vh;
      &:first-child {
        margin-bottom: 1vh;
      }
    }
  }
  .clcc-line {
    position: relative;
    width: 320px;
    height: 23vh;
    float: left;
  }
}

[w-450-580] {
  width: 450px;
  font-size: 16px;
  color: #52bdff;
  text-align: center;
}
[w-450-580] {
  aspect-ratio: "450:580";
}

[w-700-300] {
  width: 700px;
  font-size: 16px;
  color: #52bdff;
  text-align: center;
  .cccb-chart {
    width: 223px;
    height: 23vh;
    margin: 0 5px;
    float: left;
  }
}
[w-700-580] {
  aspect-ratio: "700:300";
}

[w-500-580] {
  position: relative;
  width: 500px;
  height: 58vh;
  font-size: 16px;
  color: #52bdff;
  text-align: center;
  .chart-list-middle {
    width: 500px;
    height: 23vh;
  }
}
[w-500-580] {
  aspect-ratio: "500:580";
}
.echarts {
  width: 100%;
  height: 100%;
}
</style>
