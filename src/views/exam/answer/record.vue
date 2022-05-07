<template>
  <div class="app-contain">
    <el-form :inline="true">
      <el-form-item label="选择学科: ">
        <el-select v-model="queryParam.subjectId" placeholder="学科" style="width: 100px">
          <el-option v-for="item in subjects" :key="item.id" :label="item.name" :value="item.id" />
        </el-select>
      </el-form-item>
      <el-form-item label="状态：">
        <el-select v-model="queryParam.status" placeholder="状态" style="width: 100px">
          <el-option v-for="item in statusEnum" :key="item.key" :value="item.key" :label="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="small" @click="search">查询</el-button>
        <el-button type="success" size="small" @click="handleClear">重置</el-button>
      </el-form-item>
    </el-form>
    <el-table v-loading="listLoading" :data="tableData" fit highlight-current-row style="width: 100%" @row-click="itemSelect">
      <el-table-column prop="id" label="序号" width="70px" align="center" />
      <el-table-column prop="paperName" label="名称" width="350px" align="center" />
      <el-table-column prop="subjectName" label="学科" width="100px" align="center" />
      <el-table-column prop="paperTypeStr" label="试卷类型" width="100px" align="center" />
      <el-table-column prop="questionCount" label="题目数量" width="100px" align="center" />
      <el-table-column prop="paperScore" label="试卷总分" width="100px" align="center" />
      <el-table-column prop="questionCorrect" label="答对题数" width="100px" align="center" />
      <el-table-column prop="systemScore" label="系统判分" width="100px" align="center" />
      <el-table-column prop="userScore" label="用户得分" width="100px" align="center" />
      <el-table-column prop="status" label="状态" width="100px" align="center">
        <template slot-scope="{row}">
          <el-tag :type="statusTagFormatter(row.status)">
            {{ statusTextFormatter(row.status) }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="提交时间" width="250px" align="center">
        <template slot-scope="{row}">
          {{ row.createTime|formatDateTime }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="250px">
        <template slot-scope="{row}">
          <!--          <router-link v-if="row.status === 0 " target="_blank" :to="{path:'/answer/edit',query:{id:row.id}}">-->
          <!--            <el-button type="primary" size="small">批改</el-button>-->
          <!--          </router-link>-->
          <router-link v-if="row.status === 1 " target="_blank" :to="{path:'/answer/read',query:{id:row.id}}">
            <el-button type="text" size="small">查看答卷</el-button>
          </router-link>
        </template>
      </el-table-column>
    </el-table>
    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParam.page"
      :limit.sync="queryParam.limit"
      style="text-align: center"
      @pagination="search"
    />
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import Pagination from '@/components/Pagination'
import { getRecordList } from '@/api/paper'
import { scrollTo } from '@/utils/scroll-to'
import { formatDate } from '@/utils'
export default {
  name: 'Record',
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
        limit: 10,
        subjectId: null,
        paperId: null,
        status: null
      },
      listLoading: false,
      tableData: [],
      subjectFilter: [],
      total: 0,
      selectItem: {
        systemScore: '0',
        userScore: '0',
        doTime: '0',
        paperScore: '0',
        questionCorrect: 0,
        questionCount: 0
      }
    }
  },
  // eslint-disable-next-line vue/order-in-components
  computed: {
    ...mapGetters('enumItem', [
      'enumFormat'
    ]),
    ...mapState('enumItem', {
      statusEnum: state => state.exam.examPaperAnswer.statusEnum,
      statusTag: state => state.exam.examPaperAnswer.statusTag
    }),
    ...mapGetters('exam', ['subjectEnumFormat']),
    ...mapState('exam', { subjects: state => state.subjects })
  },
  created() {
    const _this = this
    _this.initSubject()
    _this.search()
    scrollTo(0, 800)
  },
  methods: {
    search() {
      this.listLoading = true
      const _this = this
      getRecordList(this.queryParam).then(re => {
        _this.tableData = re.data.list
        _this.total = re.data.total
        _this.listLoading = false
      })
    },
    itemSelect(row, column, event) {
      this.selectItem = row
    },
    statusTagFormatter(status) {
      return this.enumFormat(this.statusTag, status)
    },
    statusTextFormatter(status) {
      return this.enumFormat(this.statusEnum, status)
    },
    handleClear() {
      this.queryParam.paperId = null
      this.queryParam.status = null
      this.queryParam.subjectId = null
    },
    ...mapActions('exam', { initSubject: 'initSubject' })
  }
}
</script>

<style lang="scss" scoped>
.title {
  font-size: 15px;
}
.answer-card-contain .answer-card {
  margin-bottom: 20px;
  border: 0;
}
.answer-card-contain {
  margin-top: 20px;
}
.paperTitleInfo {
  width: 300px;
  background-color: #fff;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  padding: 30px 10px 10px 30px;
}
.paperInfo {
  width: 280px;
  background-color: #fff;
  padding: 20px 30px;
}
.answerInfo {
  width: 210px;
  padding: 20px 50px;
  background-color: #fff;
}
.tag {
  -webkit-box-flex: 1;
  -ms-flex: 1;
  flex: 1;
  height: 180px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  background-color: #fff;
}
.tag-top {
  -webkit-box-flex: 1;
  -ms-flex: 1;
  flex: 1;
  padding: 21px 20px;
  max-height: 140px;
  overflow: hidden;
}
</style>
