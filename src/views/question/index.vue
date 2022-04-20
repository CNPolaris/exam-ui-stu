<template>
  <div style="margin-top: 10px" class="app-contain">
    <el-row :gutter="50">
      <el-col :span="14">
        <el-table v-loading="listLoading" :data="tableData" fit highlight-current-row style="width: 100%" @row-click="itemSelect">
          <el-table-column prop="shortTitle" label="题干" show-overflow-tooltip />
          <el-table-column prop="questionType" label="题型" :formatter="questionTypeFormatter" width="70" />
          <el-table-column prop="subjectName" label="学科" width="50" />
          <el-table-column prop="createTime" label="做题时间" width="170" />
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
      <el-col :span="10">
        <el-card class="record-answer-info">
          <el-form>
            <el-form-item>
              <QuestionAnswerShow :q-type="selectItem.questionType" :q-loading="qAnswerLoading" :question="selectItem.questionItem" :answer="selectItem.answerItem" />
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import Pagination from '@/components/Pagination'
import { getFalseQuestion, questionSelect } from '@/api/paper'
import QuestionAnswerShow from '../exam/components/QuestionAnswerShow'

export default {
  name: 'QuestionIndex',
  components: { Pagination, QuestionAnswerShow },
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
        _this.listLoading = false
        if (re.data.list.length !== 0) {
          _this.qAnswerShow(re.list[0].id)
        }
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
