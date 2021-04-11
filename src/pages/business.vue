<template>
  <div class="cl-cn-content">
    <div class="cl-cn-charts">
      <div flexcontainer>
        <div w-300-300 aspectratio aspect-ratio="300/300">
          <div aspectratio-content>
            <li>
              <h2>企业出口在港时间TOP5</h2>
              <div class="chart-list">
                <ul class="ranking-list-left">
                  <li
                    v-for="(item, index) in companyExList"
                    v-if="index < 5"
                    :key="index"
                  >
                    <div>
                      <i>{{ item.rankNum }}</i>
                      <span class="cname" :title="item.declareCompanyName">{{
                        item.declareCompanyName
                      }}</span>
                      <b v-if="item.avgTimeSpent">{{ item.avgTimeSpent }}h</b>
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
                    v-for="(item, index) in goodsExList"
                    v-if="index < 5"
                    :key="index"
                  >
                    <div>
                      <i>{{ item.rankNum }}</i
                      ><span class="cname" :title="item.goodsType">{{
                        item.goodsType
                      }}</span>
                      <b v-if="item.avgTimeSpent">{{ item.avgTimeSpent }}h</b>
                    </div>
                    <el-progress
                      :percentage="item.percent"
                      :show-text="false"
                    ></el-progress>
                  </li>
                </ul>
              </div>
            </li>
          </div>
        </div>
        <div w-800-900 aspectratio aspect-ratio="800/900">
          <div aspectratio-content>
            <div class="line-chart">
              <div class="line-chart-item">
                <h2>海关进口通关平均时长</h2>
                <v-chart
                  :options="echartLineOpt1"
                  :autoresize="true"
                  :theme="theme"
                />
              </div>
              <div class="line-chart-item">
                <h2>海关出口通关平均时长</h2>
                <v-chart
                  :options="echartLineOpt2"
                  :autoresize="true"
                  :theme="theme"
                />
              </div>
            </div>
            <div class="line-chart">
              <div class="line-chart-item">
                <h2>口岸放行平均时长（进口）</h2>
                <v-chart
                  :options="echartLineOpt3"
                  :autoresize="true"
                  :theme="theme"
                />
              </div>
              <div class="line-chart-item">
                <h2>口岸放行平均时长（出口）</h2>
                <v-chart
                  :options="echartLineOpt4"
                  :autoresize="true"
                  :theme="theme"
                />
              </div>
            </div>
          </div>
        </div>
        <div w-300-300 aspectratio aspect-ratio="300/300">
          <div aspectratio-content>
            <li>
              <h2>企业进口在港时间TOP5</h2>
              <div class="chart-list">
                <ul class="ranking-list-right">
                  <li
                    v-for="(item, index) in companyImList"
                    v-if="index < 5"
                    :key="index"
                  >
                    <div>
                      <i>{{ item.rankNum }}</i
                      ><span class="cname" :title="item.declareCompanyName">{{
                        item.declareCompanyName
                      }}</span>
                      <b v-if="item.avgTimeSpent">{{ item.avgTimeSpent }}h</b>
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
              <h2>货物进口在港时间TOP5</h2>
              <div class="chart-list">
                <ul class="ranking-list-right">
                  <li
                    v-for="(item, index) in goodsImList"
                    v-if="index < 5"
                    :key="index"
                  >
                    <div>
                      <i>{{ item.rankNum }}</i
                      ><span class="cname" :title="item.goodsType">{{
                        item.goodsType
                      }}</span>
                      <b v-if="item.avgTimeSpent">{{ item.avgTimeSpent }}h</b>
                    </div>
                    <el-progress
                      :percentage="item.percent"
                      :show-text="false"
                    ></el-progress>
                  </li>
                </ul>
              </div>
            </li>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import theme from "../plugins/echarts/theme";
import { randomData, textSize, deepClone } from "../plugins/utils";

export default {
  data() {
    return {
      theme: theme,
      echartLineOpt: {
        tooltip: {
          trigger: "axis",
          formatter: function(params) {
            var s =
              '<p style="text-align: center"><b>' +
              (params[0] && params[0].name) +
              "月份</b><p>";
            var sty = [
              "display:inline-block;margin-right:.5vw;border-radius:100%;width:.5vw;height:.5vw;background-color:#fd970f",
              "display:inline-block;margin-right:.5vw;border-radius:100%;width:.5vw;height:.5vw;background-color:#2dcfc0",
              "display:inline-block;margin-right:.5vw;border-radius:100%;width:.5vw;height:.5vw;background-color:#2ea5ff",
              "display:inline-block;margin-right:.5vw;border-radius:100%;width:.5vw;height:.5vw;background-color:#F2433B"
            ];

            if (params instanceof Array) {
              params.forEach(function(item, key) {
                s +=
                  "<span style=" +
                  sty[key] +
                  "></span>" +
                  item.seriesName +
                  ": " +
                  item.data +
                  "小时<br />";
              });
            }

            return s;
          },
          textStyle: {
            align: "left",
            fontSize: "75%"
          },
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: "8%",
          right: "12%",
          top: "20%",
          bottom: "5%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            name: "月份",
            nameTextStyle: {
              fontSize: "75%"
            },
            axisLabel: {
              textStyle: {
                fontSize: "75%"
              }
            },
            data: ['1','2','3','4','5','6','7'],
            axisTick: {
              alignWithLabel: false
            },
            boundaryGap: false
          }
        ],
        yAxis: [
          {
            type: "value",
            scale: true,
            name: "小时",
            min: 0,
            nameTextStyle: {
              fontSize: "75%"
            },
            axisLabel: {
              textStyle: {
                fontSize: "75%"
              }
            },
            boundaryGap: [0.2, 0.2]
          }
        ],
        series: [
          {
            name: "平均时长",
            type: "line",
            symbol: "none",
            itemStyle: {
              normal: {
                color: "#2ea5ff",
                lineStyle: {
                  width: 1,
                  color: "#2ea5ff"
                }
              }
            },
            areaStyle: {
              color: ["rgba(46,165,255,.5)", "rgba(46,165,255,.5)"]
            },
            data: [20, 40, 65, 85, 65, 29, 65]
          }
        ]
      },
      companyExList: [],
      goodsExList: [],
      companyImList: [],
      goodsImList: [],
      echartLineOpt1: {},
      echartLineOpt2: {},
      echartLineOpt3: {},
      echartLineOpt4: {}
    };
  },
  mounted() {
    this.getNationData();

    this.echartLineOpt1 = deepClone(this.echartLineOpt);
    this.echartLineOpt1.series[0].itemStyle.normal.color= '#fe9d10'
    this.echartLineOpt1.series[0].itemStyle.normal.lineStyle.color= '#fe9d10'
    this.echartLineOpt1.series[0].areaStyle.color= ['rgba(254,157,16,.5)', 'rgba(254,157,16,.5)']

    this.echartLineOpt2 = deepClone(this.echartLineOpt);

    this.echartLineOpt3 = deepClone(this.echartLineOpt);
    this.echartLineOpt3.series[0].itemStyle.normal.color= '#fe9d10'
    this.echartLineOpt3.series[0].itemStyle.normal.lineStyle.color= '#fe9d10'
    this.echartLineOpt3.series[0].areaStyle.color= ['rgba(254,157,16,.5)', 'rgba(254,157,16,.5)']

    this.echartLineOpt4 = deepClone(this.echartLineOpt);
  },
  computed: {
    ...mapState({
      isDetail: state => state.Detail.isDetail,
      month: state => state.Head.month,
      status: state => state.Head.status
    })
  },
  watch: {
    month: function(valNew, valOld) {
      if (valNew !== valOld) {
        this.getNationData();
      }
    },
    status: function(valNew, valOld) {
      if (valNew !== valOld) {
        this.getNationData();
      }
    }
  },
  destroyed() {
    this.clearScroll();
  },
  methods: {
    getNationData() {
      // 海关进口通关平均时长
      this.Api.getPolicyStatics({
        searchTime: this.month,
        iEMark: "I",
        groupField: "POLICY"
      }).then(res => {

      });

      this.Api.getTradeStatics({
        searchTime: this.month,
        groupField: "COMPANY",
        iEMark: "E"
      }).then(res => {
        let data = [];
        if (res.data instanceof Array) {
          res.data.forEach((item, index) => {
            let percent =
              ((item.avgTimeSpent || 1) / (res.data[0].avgTimeSpent || 1)) *
              100;
            data.push(
              Object.assign({}, item, {
                percent: percent > 100 ? 100 : percent
              })
            );
          });
        }
        this.companyExList = data;
      });

      this.Api.getTradeStatics({
        searchTime: this.month,
        groupField: "GOODS",
        iEMark: "E"
      }).then(res => {
        let data = [];
        if (res.data.rankDoc instanceof Array) {
          res.data.rankDoc.forEach((item, index) => {
            let percent =
              ((item.goodsQty || 1) / (res.data.rankDoc[0].goodsQty || 1)) *
              100;
            data.push(
              Object.assign({}, item, {
                percent: percent > 100 ? 100 : percent
              })
            );
          });
        }
        this.goodsExList = data;
      });

      this.Api.getTradeStatics({
        searchTime: this.month,
        groupField: "COMPANY",
        iEMark: "I"
      }).then(res => {
        let data = [];
        if (res.data instanceof Array) {
          res.data.forEach((item, index) => {
            let percent =
              ((item.avgTimeSpent || 1) / (res.data[0].avgTimeSpent || 1)) *
              100;
            data.push(
              Object.assign({}, item, {
                percent: percent > 100 ? 100 : percent
              })
            );
          });
        }
        this.companyImList = data;
      });

      this.Api.getTradeStatics({
        searchTime: this.month,
        groupField: "GOODS",
        iEMark: "I"
      }).then(res => {
        let data = [];
        if (res.data.rankDoc instanceof Array) {
          res.data.rankDoc.forEach((item, index) => {
            let percent =
              ((item.goodsQty || 1) / (res.data.rankDoc[0].goodsQty || 1)) *
              100;
            data.push(
              Object.assign({}, item, {
                percent: percent > 100 ? 100 : percent
              })
            );
          });
        }
        this.goodsImList = data;
      });
    },
    ...mapMutations(["changeDetailState"])
  },
  components: {}
};
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
  height: 38vh;
  color: #fff;
  ul {
    margin: 0;
    padding: 0;
    li {
      position: relative;
      height: 7vh;
      line-height: 7vh;
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

  .line-chart {
    width: 800px;
    height: 44vh;

    .line-chart-item {
      width: 390px;
      height: 38vh;
      display: inline-block;
    }
  }
}
[w-800-900] {
  aspect-ratio: "800:900";
}
.echarts {
  width: 100%;
  height: 100%;
}
</style>
