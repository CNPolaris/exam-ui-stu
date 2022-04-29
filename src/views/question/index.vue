<template>
  <div style="margin-top: 10px" class="app-contain">
    <el-row class="panel-group">
      <el-col :lg="4" class="card-panel-col">
        <div class="card-panel">
          <div class="card-panel-icon-wrapper">
            <svg-icon icon-class="single" class-name="card-panel-icon" />
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">
              单选题
            </div>
            <span>{{ questionCorrectRate.SingleChoiceRate }}</span>
          </div>
        </div>
      </el-col>
      <el-col :lg="4" class="card-panel-col">
        <div class="card-panel">
          <div class="card-panel-icon-wrapper">
            <svg-icon icon-class="multiple" class-name="card-panel-icon" />
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">
              多选题
            </div>
            <span>{{ questionCorrectRate.MultipleChoice }}</span>
          </div>
        </div>
      </el-col>
      <el-col :lg="4" class="card-panel-col">
        <div class="card-panel">
          <div class="card-panel-icon-wrapper">
            <svg-icon icon-class="truefalse" class-name="card-panel-icon" />
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">
              判断题
            </div>
            <span>{{ questionCorrectRate.TrueFalse }}</span>
          </div>
        </div>
      </el-col>
      <el-col :lg="4" class="card-panel-col">
        <div class="card-panel">
          <div class="card-panel-icon-wrapper">
            <svg-icon icon-class="gap" class-name="card-panel-icon" />
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">
              填空题
            </div>
            <span>{{ questionCorrectRate.GapFilling }}</span>
          </div>
        </div>
      </el-col>
      <el-col :lg="4" class="card-panel-col">
        <div class="card-panel">
          <div class="card-panel-icon-wrapper">
            <svg-icon icon-class="short" class-name="card-panel-icon" />
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">
              简答题
            </div>
            <span>{{ questionCorrectRate.ShortAnswer }}</span>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="50">
      <el-col :span="24">
        <el-table v-loading="listLoading" :data="tableData" fit highlight-current-row style="width: 100%">
          <el-table-column prop="shortTitle" label="题干" show-overflow-tooltip />
          <el-table-column prop="questionType" label="题型" :formatter="questionTypeFormatter" width="120" />
          <el-table-column prop="subjectName" label="学科" width="100" />
          <el-table-column prop="createTime" label="答题时间" width="220">
            <template slot-scope="{row}">
              {{ row.createTime|formatDateTime }}
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="{row}">
              <router-link target="_blank" :to="{path:'/question/detail', query: {id: row.id}}">
                <el-button type="text" size="small">查看详情</el-button>
              </router-link>
            </template>
          </el-table-column>
        </el-table>
        <pagination
          v-show="total>0"
          :total="total"
          :background="false"
          :page.sync="queryParam.page"
          :limit.sync="queryParam.limit"
          style="margin-top: 20px"
          @pagination="search"
        />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import Pagination from '@/components/Pagination'
import { getFalseQuestion, questionSelect } from '@/api/paper'
import { formatDate } from '@/utils'

export default {
  name: 'QuestionIndex',
  components: { Pagination },
  filters: {
    formatDateTime(time) {
      if (time == null || time === '') {
        return 'N/A'
      }
      const date = new Date(time)
      return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
    }
  },
  data() {
    return {
      queryParam: {
        page: 1,
        limit: 10
      },
      listLoading: false,
      tableData: [],
      total: 0,
      qAnswerLoading: false,
      selectItem: {
        questionType: 0,
        questionItem: null,
        answerItem: null
      },
      questionCorrectCount: [
        {
          questionType: 1,
          count: 0
        },
        {
          questionType: 2,
          count: 0
        },
        {
          questionType: 3,
          count: 0
        },
        {
          questionType: 4,
          count: 0
        },
        {
          questionType: 5,
          count: 0
        }
      ],
      questionTypeCount: [
        {
          questionType: 1,
          count: 0
        },
        {
          questionType: 2,
          count: 0
        },
        {
          questionType: 3,
          count: 0
        },
        {
          questionType: 4,
          count: 0
        },
        {
          questionType: 5,
          count: 0
        }
      ],
      questionCorrectRate: {
        SingleChoiceRate: 0,
        MultipleChoice: 0,
        TrueFalse: 0,
        GapFilling: 0,
        ShortAnswer: 0
      }
    }
  },
  created() {
    this.search()
  },
  methods: {
    search() {
      this.listLoading = true
      const _this = this
      getFalseQuestion(this.queryParam).then(re => {
        _this.tableData = re.data.list
        _this.total = re.data.total
        Object.assign(_this.questionCorrectCount, re.data.questionCorrectCount)
        Object.assign(_this.questionTypeCount, re.data.questionTypeCount)
        for (let i = 0; i < _this.questionTypeCount.length; i++) {
          if (_this.questionCorrectCount[i].questionType === 1 && _this.questionCorrectCount[i].questionType === 1) {
            if (_this.questionTypeCount[i].count !== 0) {
              _this.questionCorrectRate.SingleChoiceRate = Math.round(_this.questionCorrectCount[i].count / _this.questionTypeCount[i].count * 10000) / 100.00 + '%'
            }
          } else if (_this.questionCorrectCount[i].questionType === 2 && _this.questionCorrectCount[i].questionType === 2) {
            if (_this.questionTypeCount[i].count !== 0) {
              _this.questionCorrectRate.MultipleChoice = Math.round(_this.questionCorrectCount[i].count / _this.questionTypeCount[i].count * 10000) / 100.00 + '%'
            }
          } else if (_this.questionCorrectCount[i].questionType === 3 && _this.questionCorrectCount[i].questionType === 3) {
            if (_this.questionTypeCount[i].count !== 0) {
              _this.questionCorrectRate.TrueFalse = Math.round(_this.questionCorrectCount[i].count / _this.questionTypeCount[i].count * 10000) / 100.00 + '%'
            }
          } else if (_this.questionCorrectCount[i].questionType === 4 && _this.questionCorrectCount[i].questionType === 4) {
            if (_this.questionTypeCount[i].count !== 0) {
              _this.questionCorrectRate.GapFilling = Math.round(_this.questionCorrectCount[i].count / _this.questionTypeCount[i].count * 10000) / 100.00 + '%'
            }
          } else if (_this.questionCorrectCount[i].questionType === 5 && _this.questionCorrectCount[i].questionType === 5) {
            if (_this.questionTypeCount[i].count !== 0) {
              _this.questionCorrectRate.ShortAnswer = Math.round(_this.questionCorrectCount[i].count / _this.questionTypeCount[i].count * 10000) / 100.00 + '%'
            }
          }
        }
        _this.listLoading = false
        // if (re.data.list.length !== 0) {
        //   _this.qAnswerShow(re.list[0].id)
        // }
      })
    },
    itemSelect(row, column, event) {
      this.qAnswerShow(row.id)
    },
    qAnswerShow(id) {
      const _this = this
      this.qAnswerLoading = true
      questionSelect(id).then(re => {
        const response = re.data
        _this.selectItem.questionType = response.questionVM.questionType
        _this.selectItem.questionItem = response.questionVM
        _this.selectItem.answerItem = response.questionAnswerVM
        _this.qAnswerLoading = false
      })
    },
    questionTypeFormatter(row, column, cellValue, index) {
      return this.enumFormat(this.questionTypeEnum, cellValue)
    }
  },
  // eslint-disable-next-line vue/order-in-components
  computed: {
    ...mapGetters('enumItem', ['enumFormat']),
    ...mapState('enumItem', {
      questionTypeEnum: state => state.exam.question.typeEnum
    })
  }
}
</script>

<style lang="scss" scoped>

</style>
