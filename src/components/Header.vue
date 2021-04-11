<template>
  <div>
    <div class="header" w-1400-95 aspectratio aspect-ratio="1400/95">
      <div aspectratio-content>
        <h2>{{ title || route.meta.title }}</h2>
        <div class="sel-opt">
          <el-form
            :inline="true"
            :model="formInHeader"
            class="demo-form-inline"
          >
            <el-form-item label="月份" v-if="!isDetail && !isCleanChinaDetail">
              <el-date-picker
                v-model="formInHeader.month"
                type="month"
                size="small"
                @change="handleChangeMonth"
                :clearable="false"
                value-format="yyyyMM"
                placeholder="选择月"
              ></el-date-picker>
            </el-form-item>
            <el-form-item
              v-if="!isDetail && !isCleanChinaDetail && route.name == 'factors'"
              label="分析城市"
            >
              <el-select
                v-model="formInHeader.city"
                @change="handleChangeCity"
                @visible-change="visibleChange"
                size="small"
                placeholder="请选择"
              >
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item
              v-if="
                !isDetail &&
                !isCleanChinaDetail &&
                route.name == 'clearanceChina'
              "
            >
              <el-button-group>
                <el-button
                  :type="cityStatus == '2' ? 'warning' : 'primary'"
                  size="small"
                  @click="handleChangeCityStatus(2)"
                  >长三角地区</el-button
                >
                <el-button
                  :type="cityStatus == '3' ? 'warning' : 'primary'"
                  size="small"
                  @click="handleChangeCityStatus(3)"
                  >沿海11省市</el-button
                >
              </el-button-group>
            </el-form-item>
            <el-form-item
              v-if="
                !isDetail && !isCleanChinaDetail && route.name == 'clearanceZJ'
              "
            >
              <el-button-group>
                <el-tooltip
                  class="item"
                  effect="light"
                  content="根据海关总署定义，出口时间为：货物运抵>海关放行；进口时间为：船舶抵港>海关放行"
                  placement="bottom-start"
                >
                  <el-button
                    :type="departmentStatus == '1' ? 'warning' : 'primary'"
                    size="small"
                    @click="handleChangeDepartmentStatus(1)"
                    >货物整体通关时间</el-button
                  >
                </el-tooltip>
                <el-tooltip
                  class="item"
                  effect="light"
                  content="根据国家口岸办定义，出口时间为：货物运抵>船舶离港；进口时间为：船舶抵港>货物提离"
                  placement="bottom-end"
                >
                  <el-button
                    :type="departmentStatus == '0' ? 'warning' : 'primary'"
                    size="small"
                    @click="handleChangeDepartmentStatus(0)"
                    >通关物流全程时间</el-button
                  >
                </el-tooltip>
              </el-button-group>
            </el-form-item>

            <el-form-item>
              <div
                class="back-btn"
                :class="{
                  active:
                    (isCleanChinaDetail && route.name == 'clearanceChina') ||
                    (isDetail && route.name == 'logistics') ||
                    (isDetail && route.name == 'overTime'),
                }"
              >
                <el-button-group>
                  <el-button
                    type="primary"
                    @click="changeDetail"
                    icon="el-icon-arrow-left"
                    >返回</el-button
                  >
                </el-button-group>
              </div>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import { getPreMonth } from '../plugins/utils'
export default {
  name: 'Header',
  data() {
    return {
      cityStatus: 2,
      departmentStatus: 1,
      formInHeader: {
        month: getPreMonth(),
        city: ''
      },
      options: [{
        value: '',
        label: '浙江省'
      }, {
        value: 'hangZhou',
        label: '杭州市'
      }, {
        value: 'wenZhou',
        label: '温州市'
      }, {
        value: 'jiaXing',
        label: '嘉兴市'
      }, {
        value: 'huZhou',
        label: '湖州市'
      }, {
        value: 'shaoXing',
        label: '绍兴市'
      }, {
        value: 'jinHua',
        label: '金华市'
      }, {
        value: 'yiWu',
        label: '义乌市'
      }, {
        value: 'quZhou',
        label: '衢州市'
      }, {
        value: 'liShui',
        label: '丽水市'
      }, {
        value: 'taiZhou',
        label: '台州市'
      }, {
        value: 'ningBo',
        label: '宁波市'
      }, {
        value: 'zhouShan',
        label: '舟山市'
      }]
    }
  },
  mounted() {

  },
  computed: {
    route: function () {
      return this.$route
    },
    ...mapState({
      title: state => state.Head.title,
      isDetail: state => state.Detail.isDetail,
      isCleanChinaDetail: state => state.Detail.isCleanChinaDetail,
    })
  },
  methods: {
    visibleChange(e) {
      this.$emit('sentChildScorll', e)
    },
    handleChangeMonth(val) {
      this.updateMonth(val)
    },
    handleChangeCity(val) {
      this.updateCity(val)
    },
    handleChangeCityStatus(val) {
      this.cityStatus = val
      this.updateCityStatus(val)
    },
    handleChangeDepartmentStatus(val) {
      this.departmentStatus = val
      this.updateDepartmentStatus(val)
    },
    changeDetail() {
      if (this.isCleanChinaDetail && this.route.name == 'clearanceChina') {
        this.changeHeadTitle(null)
        this.changeCleanChinaDetailState(false)
      } else {
        this.changeDetailState(false)
      }

    },
    ...mapMutations([
      'updateMonth',
      'updateCityStatus',
      'changeDetailState',
      'changeHeadTitle',
      'changeCleanChinaDetailState',
      'updateDepartmentStatus',
      'updateCity'
    ])
  }
}
</script>

<style lang="scss" rel="style/scss" scoped>
.sel-opt {
  position: absolute;
  bottom: 0;
  right: 10px;
  font-size: 14px;
  line-height: 40px;
  color: #fff;
}
.header h2 {
  position: absolute;
  left: 50%;
  top: 50%;
  font-size: 26px;
  transform: translateX(-50%) translateY(-50%);
}
[w-1400-95] {
  position: relative;
  width: 1400px;
  height: 100%;
  color: #2ea6ff;
  text-align: center;
  background: url("../assets/images/header-bg.png") center top no-repeat;
  background-size: auto 100%;
}
[w-1400-95] {
  aspect-ratio: "1400:95";
}

.el-form-item {
  margin-bottom: 0;
}
.back-btn {
  margin-right: -10vw;
  transition: all 0.3s;
  &.active {
    margin-right: 0vw;
  }
}
.el-button--warning:focus,
.el-button--warning:hover,
.el-button--warning {
  color: #6b6a6a;
  background-color: #e7e6e6;
  border-color: #e7e6e6;
}
</style>
