<template>
    <div flexcontainer>
        <div
            w-1000-700
            aspectratio
            aspect-ratio="1000/700"
        >
            <h2>报关单详情页</h2>
            <el-row
                :gutter="0"
                class="intro"
            >
                <el-col :span="7">
                    <div>
                        <i>{{entryHead.ieFlag == 'I' ? '进' : '出'}}</i>
                        <span class="intro-bill">
                            报关单号：<b>{{entryHead.entryId}}</b> <br />
                            提运单号：<b>{{entryHead.billNo}}</b>
                        </span>
                    </div>
                </el-col>
                <el-col :span="5">
                    <div>通关已耗时： <br /><b>无数据</b></div>
                </el-col>
                <el-col :span="5">
                    <div>当前环节已耗时： <br /><b>无数据</b></div>
                </el-col>
                <el-col :span="7">
                    <div>当前状态： <br /><b>无数据</b></div>
                </el-col>
            </el-row>
            <el-row
                :gutter="0"
                class="tab-head"
            >
                <el-col :span="7">
                    <div>船名：无数据<br />航次：{{entryHead.voyageNo}}</div>
                </el-col>
                <el-col :span="5">
                    <div>码头：无数据<br />装运：无数据</div>
                </el-col>
                <el-col :span="5">
                    <!-- {{entryHead.declareName}} -->
                    <div>进出口企业：无数据<br />船代：无数据</div>
                </el-col>
                <el-col :span="7">
                    <div>进出口企业信用级别：无数据<br />是否使用汇总征税：{{entryHead.taxFlag == 1 ? '是' : '否'}}</div>
                </el-col>
            </el-row>
            <el-row
                :gutter="0"
                class="tab-list"
            >
                <el-col :span="7">
                    <div>出口口岸({{entryHead.iePort}})<br /><b>{{entryHead.iePortName}}</b></div>
                </el-col>
                <el-col :span="5">
                    <div>备案号<br /><b>无数据</b></div>
                </el-col>
                <el-col :span="5">
                    <div>出口日期 <br /><b>无数据</b></div>
                </el-col>
                <el-col :span="7">
                    <div>申报日期<br /><b>{{entryHead.declareDate}}</b></div>
                </el-col>
            </el-row>
            <el-row
                :gutter="0"
                class="tab-list"
            >
                <el-col :span="7">
                    <div>经营单位(无数据)<br /><b>无数据</b></div>
                </el-col>
                <el-col :span="5">
                    <div>运输方式<br /><b>{{entryHead.transModeName}}</b></div>
                </el-col>
                <el-col :span="5">
                    <div>运输工具<br /><b>{{entryHead.trafName}}</b></div>
                </el-col>
                <el-col :span="7">
                    <div>提运单号<br /><b>{{entryHead.billNo}}</b></div>
                </el-col>
            </el-row>
            <el-row
                :gutter="0"
                class="tab-list"
            >
                <el-col :span="7">
                    <div>发货单位(无数据)<br /><b>无数据</b></div>
                </el-col>
                <el-col :span="5">
                    <div>贸易方式（{{entryHead.tradeMode}}）<br /><b>{{entryHead.tradeName}}</b></div>
                </el-col>
                <el-col :span="5">
                    <div>征免性质（无数据）<br /><b>无数据</b></div>
                </el-col>
                <el-col :span="7">
                    <div>结汇方式<br /><b>无数据</b></div>
                </el-col>
            </el-row>
            <el-row
                :gutter="0"
                class="tab-list"
            >
                <el-col :span="7">
                    <div>许可证号<br /><b>无数据</b></div>
                </el-col>
                <el-col :span="5">
                    <div>运抵国 (地区)({{entryHead.tradeCountry}})<br /><b>{{entryHead.tradeCountryName}}</b></div>
                </el-col>
                <el-col :span="5">
                    <div>指运港（{{entryHead.tradePort}}）<br /><b>{{entryHead.tradePortName}}</b></div>
                </el-col>
                <el-col :span="7">
                    <div>境内货源地（无数据）<br /><b>无数据</b></div>
                </el-col>
            </el-row>
            <el-row
                :gutter="0"
                class="tab-list"
            >
                <el-col :span="7">
                    <div>批准文号<br /><b>无数据</b></div>
                </el-col>
                <el-col :span="5">
                    <div>成交方式<br /><b>无数据</b></div>
                </el-col>
                <el-col :span="5">
                    <div>运费<br /><b>无数据</b></div>
                </el-col>
                <el-col :span="3">
                    <div>保费<br /><b>无数据</b></div>
                </el-col>
                <el-col :span="4">
                    <div>杂费<br /><b>无数据</b></div>
                </el-col>
            </el-row>
            <el-row
                :gutter="0"
                class="tab-list"
            >
                <el-col :span="7">
                    <div>合同协议号<br /><b>无数据</b></div>
                </el-col>
                <el-col :span="5">
                    <div>件数<br /><b>无数据</b></div>
                </el-col>
                <el-col :span="5">
                    <div>包装种类<br /><b>无数据</b></div>
                </el-col>
                <el-col :span="3">
                    <div>毛重（公斤）<br /><b>无数据</b></div>
                </el-col>
                <el-col :span="4">
                    <div>净重（公斤）<br /><b>无数据</b></div>
                </el-col>
            </el-row>

            <el-row
                :gutter="0"
                class="tab-list"
            >
                <el-col :span="7">
                    <div>集装箱号<br /><b>无数据</b></div>
                </el-col>
                <el-col :span="5">
                    <div>随附单据<br /><b>{{entryHead.docuName}}</b></div>
                </el-col>
                <el-col :span="5">
                    <div>&nbsp;</div>
                </el-col>
                <el-col :span="3">
                    <div>用途<br /><b>无数据</b></div>
                </el-col>
                <el-col :span="4">
                    <div>&nbsp;</div>
                </el-col>
            </el-row>
            <el-row
                :gutter="0"
                class="tab-list"
            >
                <el-col :span="24">
                    <div>
                        标记唛码及备注<br />
                        <b>无数据</b>
                    </div>
                </el-col>
            </el-row>
            <el-row
                :gutter="0"
                class="tab-list-goods-head"
            >
                <el-col :span="2">
                    <div>项号</div>
                </el-col>
                <el-col :span="3">
                    <div>商品编号</div>
                </el-col>
                <el-col :span="4">
                    <div>商品名称、规格型号</div>
                </el-col>
                <el-col :span="3">
                    <div>数量及单位</div>
                </el-col>
                <el-col :span="4">
                    <div>终目的国（地区）</div>
                </el-col>
                <el-col :span="2">
                    <div>单价</div>
                </el-col>
                <el-col :span="2">
                    <div>总价</div>
                </el-col>
                <el-col :span="2">
                    <div>币制</div>
                </el-col>
                <el-col :span="2">
                    <div>征免</div>
                </el-col>
            </el-row>
            <div class="tab-list-goods-detail">
                <div :class="{anim: animate == true}">
                    <el-row
                        :gutter="0"
                        v-for="(item, index) in items"
                        :key="index"
                    >
                        <el-col :span="2">
                            <div>{{item.sn}}{{item.name}}</div>
                        </el-col>
                        <el-col :span="3">
                            <div>{{item.goodsCode}}</div>
                        </el-col>
                        <el-col :span="4">
                            <div>{{item.goodsName}}</div>
                        </el-col>
                        <el-col :span="3">
                            <div>无数据</div>
                        </el-col>
                        <el-col :span="4">
                            <div>无数据</div>
                        </el-col>
                        <el-col :span="2">
                            <div>无数据</div>
                        </el-col>
                        <el-col :span="2">
                            <div>无数据</div>
                        </el-col>
                        <el-col :span="2">
                            <div>无数据</div>
                        </el-col>
                        <el-col :span="2">
                            <div>无数据</div>
                        </el-col>
                    </el-row>
                </div>
            </div>

        </div>
        <div
            w-400-700
            aspectratio
            aspect-ratio="400/700"
        >
            <h2>全程物流时效评估</h2>
            <el-row
                :gutter="0"
                v-for="(item, index) in processList"
                :key="index"
            >
                <el-col :span="2"></el-col>
                <el-col
                    :span="8"
                    class="mid-ico"
                >

                    <i :class="{'active': item.currLinkCostTimeHour}"><img :src="item.ico" /></i>&nbsp;
                </el-col>
                <el-col
                    :span="14"
                    style="text-align:left"
                >
                    {{item.name}}
                    <span v-if="item.currLinkCostTimeHour"> - 耗时:{{item.currLinkCostTimeHour}}小时</span>
                    <br />{{item.currLinkFinishTime}}
                </el-col>
            </el-row>

        </div>
    </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
export default {
    props: {
        detailData: {
            type: Object,
            default: {
                goodsList: [],
                linkDocs: [],
            }
        },
        goodsList: {
            type: Array,
            default: {}
        },
        entryHead: {
            type: Object,
            default: {}
        }
    },
    data() {
        return {
            animate: false,
            scrollDeTag: null,
            processList: [],
            items: []
        }
    },
    watch: {
        entryHead: function (newVal, oldVal) {
            if (JSON.stringify(newVal) != JSON.stringify(oldVal)) {
                this.initProcess()
            }
        },
        goodsList: function (newVal, oldVal) {
            if (JSON.stringify(newVal) != JSON.stringify(oldVal)) {
                this.items = newVal

                this.starScroll()
            }
        }
    },
    destroyed() {
        this.clearScroll()
    },
    methods: {
        initProcess(data) {
            let arr = []
            let procIm = [
                { code: 10030, name: '货物提离', ico: require('../assets/images/ico-m-07.png') },
                { code: 30020, name: '报关放行', ico: require('../assets/images/ico-m-04.png') },
                { code: 30010, name: '报关申报', ico: require('../assets/images/ico-m-09.png') },
                { code: 10020, name: '卸船完成', ico: require('../assets/images/ico-m-03.png') },
                { code: 10040, name: '准许卸货', ico: require('../assets/images/ico-m-02.png') },
                { code: 10010, name: '船舶抵港', ico: require('../assets/images/ico-m-01.png') }
            ]
            let procEx = [
                { code: 20010, name: '货物运抵', ico: require('../assets/images/ico-m-02.png') },
                { code: 30010, name: '报关申报', ico: require('../assets/images/ico-m-09.png') },
                { code: 30020, name: '报关放行', ico: require('../assets/images/ico-m-05.png') },
                { code: 20020, name: '装船完成', ico: require('../assets/images/ico-m-07.png') },
                { code: 20030, name: '准许离港', ico: require('../assets/images/ico-m-04.png') },
                { code: 20040, name: '船舶离港', ico: require('../assets/images/ico-m-01.png') }
            ]

            if (this.entryHead.ieFlag == 'I') {
                let preList = {}
                procIm.forEach((ele, index) => {
                    let obj = this.detailData.linkDocs.find(item => item.currLinkCode == ele.code) || {}
                    arr.push(Object.assign(obj, ele))
                });
                arr.forEach((item, index) => {
                    if(preList.currLinkCostTimeHour && !item.currLinkCostTimeHour){
                        item.currLinkCostTimeHour = '0'
                        arr[index].currLinkCostTimeHour = '0'
                    }
                    preList = item
                })
            } else {
                procEx.forEach((ele, index) => {
                    let obj = this.detailData.linkDocs.find(item => item.currLinkCode == ele.code) || {}
                    arr.push(Object.assign(obj, ele))
                    if (obj.currLinkCode) {
                        for (let i = 0; i < index; i++) {
                            if (!arr[i].currLinkCostTimeHour) {
                                arr[i].currLinkCostTimeHour = '0'
                            }
                        }
                    }
                });
            }
            this.processList = arr
        },
        scroll() {

            this.animate = true;
            setTimeout(() => {
                this.items.push(this.items[0]);
                this.items.shift();
                this.animate = false;
            }, 1000)
        },
        clearScroll() {
            this.scrollDeTag && clearInterval(this.scrollDeTag)
        },
        starScroll() {
            this.clearScroll()
            if (this.items.length > 2) {
                this.scrollDeTag = setInterval(this.scroll, 2000)
            }
        },
    }
}
</script>

<style lang="scss" rel="style/scss" scoped>
h2 {
  font-size: 16px;
  line-height: 3vh;
  margin: 4vh 0 2vh;
  color: #fff;
  text-align: center;
}
[w-1000-700] {
  width: 1060px;
  height: 90vh;
  padding: 0 10px;
  font-size: 12px;
  color: #fff;
  text-align: left;
  float: left;
  .el-col div {
    padding: 5px;
  }
  .intro {
    height: 7vh;
    font-size: 12px;
    line-height: 20px;
    .el-col {
      b {
        font-size: 14px;
        font-weight: normal;
      }
      i {
        float: left;
        height: 20px;
        line-height: 20px;
        width: 30px;
        margin: 10px 10px 0 0;
        text-align: center;
        font-style: normal;
        border-radius: 4px;
        background: linear-gradient(to right, #ffa80f, #fc4b00);
      }
    }
    .intro-bill {
      float: left;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      max-width: 80%;
    }
  }
  .tab-head {
    font-size: 14px;
    font-weight: bold;
    height: 7vh;
    background: #ff9211;
  }
  .tab-list {
    .el-col {
      line-height: 20px;
      height: 6.5vh;
      background: #0a185f;
      border-left: 1px solid #576192;
      border-bottom: 1px solid #576192;
      &:last-child {
        border-right: 1px solid #576192;
      }
    }
  }
  .tab-list-goods-head {
    line-height: 20px;
    height: 5vh;
    background: #0a185f;
    border: 1px solid #576192;
    text-align: center;
    border-top: none;
  }
  .tab-list-goods-detail {
    line-height: 20px;
    height: 8.5vh;
    background: #0a185f;
    border: 1px solid #576192;
    text-align: center;
    border-top: none;
    overflow: hidden;
    .el-col {
      height: 4vh;
    }
  }
}
[w-1000-700] {
  aspect-ratio: "1100:700";
}
[w-400-700] {
  width: 320px;
  margin-top: 1vh;
  font-size: 14px;
  color: #fff;
  text-align: center;
  float: left;
  .el-row {
    position: relative;
    height: 13vh;
    line-height: 3.5vh;
    .el-col {
      position: relative;
      height: 13vh;
      padding-top: 3vh;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      &.mid-ico {
        &::before {
          position: absolute;
          content: "";
          left: 50%;
          top: 0;
          margin-left: -2.5px;
          height: 13.2vh;
          width: 5px;
          background: linear-gradient(to right, #10b1f9, #005de9);
        }
        i {
          position: absolute;
          top: 50%;
          left: 50%;
          margin: -3.5vh 0 0 -3.5vh;
          width: 7vh;
          height: 7vh;
          border: 1px solid #e0e2e2;
          box-sizing: border-box;
          border-radius: 100%;
          text-align: center;
          background: rgba(124, 120, 138, 0.8);
          &::after {
            position: absolute;
            top: 50%;
            left: 50%;
            content: "";
            margin: -4vh 0 0 -4vh;
            width: 8vh;
            height: 8vh;
            box-sizing: border-box;
            border: 1px solid #e0e2e2;
            border-radius: 100%;
          }
          &.active {
            border: 1px solid #6ef2a7;
            background: #37bf75;
            &::after {
              border: 1px solid #6ef2a7;
            }
          }
          img {
            max-width: 90%;
            max-height: 90%;
          }
        }
      }
    }

    &:nth-child(2) {
      .el-col.mid-ico {
        &::before {
          left: 50%;
          top: 50%;
          margin-left: -2.5px;
          height: 6.55vh;
          width: 5px;
        }
      }
    }

    &:last-child {
      .el-col.mid-ico {
        &::before {
          left: 50%;
          bottom: 50%;
          margin-left: -2.5px;
          height: 6.55vh;
          width: 5px;
        }
      }
    }
  }
}
[w-400-700] {
  aspect-ratio: "400:700";
}
.anim {
  transition: all 1s;
  margin-top: -4vh;
}
</style>