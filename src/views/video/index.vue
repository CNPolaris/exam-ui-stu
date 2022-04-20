<template>
  <div class="app-container">
    <el-row class="paper-index-header">
      <el-col :span="24">
        <div class="item-contain">
          <el-select v-model="queryParam.subjectId" placeholder="选择学科">
            <el-option
              v-for="item in subjectFilter"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
          <el-button type="primary" @click="search">搜索</el-button>
        </div>
      </el-col>
    </el-row>
    <el-row class="app-item-contain">
      <h3>视频课堂</h3>
      <div class="video-page-contain">
        <el-col v-for="(item, index) in list" :key="index" :span="4">
          <el-card :body-style="{ padding: '0px' }">
            <div class="video-card-content">
              <div style="display: flex; justify-content: center">
                <el-image :src="item.cover" />
              </div>
              <div style="margin-top: 10px">
                {{ item.name }}
              </div>
              <div class="font-desc" style="margin-top: 10px">
                学科：{{ item.subject }}
              </div>
            </div>
          </el-card>
        </el-col>
      </div>
      <pagination
        v-show="total>0"
        :total="total"
        :background="false"
        :page.sync="queryParam.page"
        :limit.sync="queryParam.limit"
        @pagination="search"
      />
    </el-row>
  </div>
</template>

<script>
import { mapGetters, mapState, mapActions } from 'vuex'
import { getVideoList } from '@/api/video'
import Pagination from '@/components/Pagination'
export default {
  name: 'ViewIndex',
  comments: { Pagination },
  data() {
    return {
      list: [],
      total: 0,
      queryParam: {
        page: 1,
        limit: 15,
        subjectId: null
      },
      subjectFilter: null
    }
  },
  async created() {
    const _this = this
    await this.initSubject(function() {
      _this.subjectFilter = _this.subjects
    })
    await this.getList()
  },
  methods: {
    search() {
      const _this = this
      _this.getList()
    },
    getList() {
      getVideoList(this.queryParam).then(re => {
        const _this = this
        for (let i = 0; i < re.data.list.length; i++) {
          re.data.list[i].subject = _this.subjectFormatter(re.data.list[i].subjectId)
        }
        for (let i = 0; i < re.data.list.length; i++) {
          re.data.list[i].subject = _this.subjectFormatter(re.data.list[i].subjectId)
        }
        _this.total = re.data.total
        _this.list = re.data.list
      })
    },
    subjectFormatter(key) {
      const _this = this
      for (let i = 0; i < _this.subjectFilter.length; i++) {
        if (_this.subjectFilter[i].id === key) {
          return _this.subjectFilter[i].name
        }
      }
      return null
    },
    ...mapActions('exam', { initSubject: 'initSubject' })
  },
  computed: {
    ...mapGetters('enumItem', ['enumFormat']),
    ...mapState('enumItem', {
      questionTypeEnum: state => state.exam.question.typeEnum,
      paperTypeEnum: state => state.exam.examPaper.paperTypeEnum,
      levelEnum: state => state.user.levelEnum
    }),
    ...mapState('exam', { subjects: state => state.subjects })
  }
}
</script>

<style scoped>
video {
  width: 100%;
  height: 500px;
}
.paper-index-header {
  border-bottom: 1px dotted #d9d9d9;
}
.item-contain {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
}
</style>
