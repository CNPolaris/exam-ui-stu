<template>
  <div class="app-container">
    <el-row style="margin-top: 10px">
      <el-form :inline="true">
        <el-form-item label="学科">
          <el-select v-model="queryParam.subjectId" placeholder="学科" style="width: 100px">
            <el-option v-for="item in subjects" :key="item.id" :value="item.id" :label="item.name" />
          </el-select>
        </el-form-item>
        <el-form-item label="试卷类型">
          <el-select v-model="queryParam.paperType" placeholder="试卷类型" style="width: 150px">
            <el-option v-for="item in examPaperTypeEnum" :key="item.key" :value="item.key" :label="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="small" @click="getList">查询</el-button>
          <el-button type="success" size="small" @click="handleClear">重置</el-button>
        </el-form-item>
      </el-form>
    </el-row>
    <el-row>
      <div class="index-contain exam-paper-contain" style="margin-top: 10px">
        <el-card v-for="(item,index) in list" :key="index" class="paper-card is-none-shadow">
          <div class="paper-card-content">
            <div class="font-hidden">
              {{ item.name }}
            </div>
            <div class="font-desc" style="margin-top: 10px">
              学科：{{ item.subject }}
            </div>
            <div class="font-desc" style="margin-top: 5px">
              题目数量: {{ item.questionCount }}
            </div>
            <div class="font-desc" style="margin-top: 5px">
              试卷总分：{{ item.score }}分
            </div>
            <div class="font-desc" style="margin-top: 5px">
              建议时长：{{ item.suggestTime }}分钟
            </div>
            <div class="font-desc" style="margin-top: 5px">
              开始时间：{{ item.limitStartTime }}
            </div>
            <div class="font-desc" style="margin-top: 5px">
              结束时间：{{ item.limitEndTime }}
            </div>
            <div style="margin-top: 10px; text-align: center">
              <router-link target="_blank" :to="{path: '/exam/do', query: {id:item.id}}">
                <el-button type="text" size="small">开始答题</el-button>
              </router-link>
            </div>
          </div>
        </el-card>
      </div>
    </el-row>
    <el-row style="text-align: center; margin-top: 10px">
      <pagination v-show="total>0" :total="total" :page.sync="queryParam.page" :limit.sync="queryParam.limit" @pagination="getList" />
    </el-row>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
import { getStudentPaperPage } from '@/api/paper'
const { mapActions, mapGetters, mapState } = require('vuex')
export default {
  name: 'PaperIndex',
  components: { Pagination },
  data() {
    return {
      list: [],
      total: 0,
      queryParam: {
        page: 1,
        limit: 15,
        subjectId: null,
        paperType: null
      }
    }
  },
  computed: {
    ...mapGetters('enumItem', ['enumFormat']),
    ...mapState('enumItem', {
      levelEnum: state => state.user.levelEnum,
      examPaperTypeEnum: state => state.exam.examPaper.paperTypeEnum
    }),
    ...mapGetters('exam', ['subjectEnumFormat']),
    ...mapState('exam', { subjects: state => state.subjects })
  },
  async created() {
    const _this = this
    await _this.initSubject()
    _this.getList()
  },
  methods: {
    getList() {
      const _this = this
      getStudentPaperPage(_this.queryParam).then(re => {
        _this.total = re.data.total
        _this.list = re.data.list
        for (let i = 0; i < _this.list.length; i++) {
          _this.list[i].subject = _this.subjectFormatter(_this.list[i].subjectId)
        }
      })
    },
    subjectFormatter(id) {
      const _this = this
      for (let i = 0; i < _this.subjects.length; i++) {
        if (_this.subjects[i].id === id) {
          return _this.subjects[i].name
        }
      }
      return null
    },
    handleClear() {
      const _this = this
      _this.queryParam.paperType = null
      _this.queryParam.subjectId = null
    },
    ...mapActions('exam', { initSubject: 'initSubject' })
  }
}
</script>

<style scoped>
.index-contain {
  padding-left: 15px;
  min-height: 300px;
}
.exam-paper-contain {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
  -ms-flex-direction: row;
  flex-direction: row;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  -ms-flex-line-pack: start;
  align-content: flex-start;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: start;
  -ms-flex-pack: start;
  justify-content: flex-start;
}
.paper-card {
  height: 270px;
  width: 300px;
  margin: 0 30px 30px 0;
}
.paper-card-content {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
}
.font-hidden {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>
