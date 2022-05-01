<template>
  <div class="app-container">
    <el-row style="border-top-width: 10px">
      <el-col :span="2">
        <div class="card-panel-description">
          <img :src="userInfo.avatar" style="height: 100px; width: 100px; border-radius: 40px" alt="头像">
        </div>
      </el-col>
      <el-col :span="2">
        <span>账号：{{ userInfo.userName }}</span><br>
        <span>姓名：{{ userInfo.realName }}</span>
      </el-col>
      <el-col :span="20">
        <el-row class="panel-group">
          <el-col :xs="6" :sm="6" :lg="4" class="card-panel-col">
            <div class="card-panel">
              <div class="card-panel-icon-wrapper">
                <svg-icon icon-class="count" class-name="card-panel-icon" />
              </div>
              <div class="card-panel-description">
                <div class="card-panel-text">
                  考试次数
                </div>
                <count-to :start-val="0" :end-val="attendCount" :duration="2600" />
              </div>
            </div>
          </el-col>
          <el-col :xs="6" :sm="6" :lg="4" class="card-panel-col">
            <div class="card-panel">
              <div class="card-panel-icon-wrapper">
                <svg-icon icon-class="correctRate" class-name="card-panel-icon" />
              </div>
              <div class="card-panel-description">
                <div class="card-panel-text">
                  正确率
                </div>
                <span>{{ correctRate }}</span>
              </div>
            </div>
          </el-col>
          <el-col :xs="6" :sm="6" :lg="4" class="card-panel-col">
            <div class="card-panel">
              <div class="card-panel-icon-wrapper">
                <svg-icon icon-class="passRate" class-name="card-panel-icon" />
              </div>
              <div class="card-panel-description">
                <div class="card-panel-text">
                  及格率
                </div>
                <span>{{ passRate }}</span>
              </div>
            </div>
          </el-col>
          <el-col :xs="6" :sm="6" :lg="4" class="card-panel-col">
            <div class="card-panel">
              <div class="card-panel-icon-wrapper">
                <svg-icon icon-class="maxScore" class-name="card-panel-icon" />
              </div>
              <div class="card-panel-description">
                <div class="card-panel-text">
                  最高分
                </div>
                <count-to :start-val="maxScore" :end-val="maxScore" :duration="2600" />
              </div>
            </div>
          </el-col>
          <el-col :xs="6" :sm="6" :lg="4" class="card-panel-col">
            <div class="card-panel">
              <div class="card-panel-icon-wrapper">
                <svg-icon icon-class="minScore" class-name="card-panel-icon" />
              </div>
              <div class="card-panel-description">
                <div class="card-panel-text">
                  最低分
                </div>
                <count-to :start-val="minScore" :end-val="minScore" :duration="2600" />
              </div>
            </div>
          </el-col>
          <el-col :xs="6" :sm="6" :lg="4" class="card-panel-col">
            <div class="card-panel">
              <div class="card-panel-icon-wrapper">
                <svg-icon icon-class="avgScore" class-name="card-panel-icon" />
              </div>
              <div class="card-panel-description">
                <div class="card-panel-text">
                  平均分
                </div>
                <count-to :start-val="avgScore" :end-val="avgScore" :duration="2600" />
              </div>
            </div>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <el-row style="border-top-width: 10px">
      <el-col :span="12">
        <div class="chart-wrapper">
          <score-line-chart :score-line="scoreLine" />
        </div>
      </el-col>
      <el-col :span="12">
      </el-col>
    </el-row>
  </div>
</template>

<script>
import CountTo from 'vue-count-to'
import { getInfo } from '@/api/user'
import { getStudentAnswerList } from '@/api/analysis'
import { formatDate } from '@/utils'
import ScoreLineChart from '@/views/exam/result/components/ScoreLineChart'
export default {
  components: { CountTo, ScoreLineChart },
  data() {
    return {
      id: null,
      attendCount: 0,
      correctRate: 0,
      passRate: 0,
      maxScore: 0,
      minScore: 0,
      avgScore: 0,
      userInfo: {
        realName: '',
        userName: '',
        role: '',
        avatar: null
      },
      answerList: [],
      scoreLine: {
        paperScore: [],
        userScore: [],
        createTime: []
      },
      echartsScoreLineAction: null
    }
  },
  async created() {
    const _this = this
    await getInfo().then(re => {
      _this.userInfo = re.data
      _this.id = re.data.id
    })
    await _this.getAnswerList()
  },
  methods: {
    formatDateTime(time) {
      if (time == null || time === '') {
        return 'N/A'
      }
      const date = new Date(time)
      return formatDate(date, 'yyyy-MM-dd')
    },
    async getAnswerList() {
      const _this = this
      await getStudentAnswerList(_this.id).then(re => {
        if (re.code === 1000) {
          _this.answerList = null
        } else {
          _this.answerList = re.data
          _this.statisticsData()
        }
      })
    },
    statisticsData() {
      const _this = this
      let questionCount = 0
      let correctCount = 0
      let passCount = 0
      let scoreSum = 0
      for (let i = 0; i < _this.answerList.length; i++) {
        _this.scoreLine.paperScore.push(_this.answerList[i].paperScore)
        _this.scoreLine.userScore.push(_this.answerList[i].userScore)
        _this.scoreLine.createTime.push(this.formatDateTime(_this.answerList[i].createTime))
        questionCount = questionCount + _this.answerList[i].questionCount
        correctCount = correctCount + _this.answerList[i].questionCorrect
        if (_this.answerList[i].userScore > _this.answerList[i].paperScore * 0.6) {
          passCount++
        }
        scoreSum += _this.answerList[i].userScore
      }
      _this.maxScore = Math.max.apply(Math, _this.answerList.map(item => { return item.userScore }))
      _this.minScore = Math.min.apply(Math, _this.answerList?.map(item => { return item.userScore }))
      _this.avgScore = scoreSum / _this.answerList.length
      _this.passRate = Math.round(passCount / _this.answerList.length * 10000) / 100.00 + '%'
      _this.correctRate = Math.round(correctCount / questionCount * 10000) / 100.00 + '%'
      _this.attendCount = _this.answerList.length
    }
  }
}
</script>

<style scoped>

</style>
