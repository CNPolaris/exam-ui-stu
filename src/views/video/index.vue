<template>
  <div class="app-container">
    <el-row class="paper-index-header">
      <el-col :span="24">
        <div class="item-contain">
          <el-select v-model="queryParam.subjectId" placeholder="选择学科">
            <el-option
              v-for="item in subjects"
              :key="item.id"
              :label="item.name + ' ( ' + item.levelName + ' )'"
              :value="item.id"
            />
          </el-select>
          <el-button type="primary" @click="search">搜索</el-button>
        </div>
      </el-col>
    </el-row>
    <el-row class="app-item-contain">
      <h3>视频课堂</h3>
      <div class="index-contain video-page-contain">
        <el-card v-for="(item, index) in list" :key="index" class="video-card">
          <div class="video-card-content">
            <div style="display: flex; justify-content: center">
              <a :href="'#/video/preview?id=' + item.id">
                <img :src="item.cover" class="video-image" alt="视频封面">
              </a>
            </div>
            <div class="video-name" style="margin-top: 10px;">
              {{ item.name }}
            </div>
            <div class="exam-line" style="margin-top: 10px;" />
            <div class="font-desc">学科：{{ item.subject }}</div>
            <div style="text-align: center">
              <router-link target="_blank" :to="{ path: '/video/preview', query: { id: item.id }}">
                <el-button type="text" size="small">开始观看</el-button>
              </router-link>
            </div>
          </div>
        </el-card>
<!--        <el-col v-for="(item, index) in list" :key="index" :span="4">-->
<!--          <el-card :body-style="{ padding: '0px' }">-->
<!--            <div class="video-card-content">-->
<!--              <div style="display: flex; justify-content: center">-->
<!--                <el-image :src="item.cover" />-->
<!--              </div>-->
<!--              <div style="margin-top: 10px">-->
<!--                {{ item.name }}-->
<!--              </div>-->
<!--              <div class="font-desc" style="margin-top: 10px">-->
<!--                学科：{{ item.subject }}-->
<!--              </div>-->
<!--            </div>-->
<!--          </el-card>-->
<!--        </el-col>-->
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
  components: { Pagination },
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
  computed: {
    ...mapGetters('enumItem', ['enumFormat']),
    ...mapState('enumItem', {
      questionTypeEnum: state => state.exam.question.typeEnum,
      paperTypeEnum: state => state.exam.examPaper.paperTypeEnum,
      levelEnum: state => state.user.levelEnum
    }),
    ...mapState('exam', { subjects: state => state.subjects })
  },
  async created() {
    const _this = this
    _this.initSubject()
    await _this.getList()
  },
  methods: {
    search() {
      const _this = this
      _this.getList()
    },
    getList() {
      const _this = this
      getVideoList(this.queryParam).then(re => {
        _this.total = re.data.total
        _this.list = re.data.list
      })
    },
    ...mapActions('exam', { initSubject: 'initSubject' })
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
.index-contain {
  padding-left: 15px;
  min-height: 300px;
}
.video-card {
  height: 320px;
  width: 245px;
  margin: 0 30px 30px 0;
}
.video-image {
  width: 220px;
  height: 190px;
  cursor: pointer;
}
.video-page-contain .video-card .video-card-content .video-name {
  font-size: 14px;
}
.exam-line {
  border-bottom: 1px solid #ebeef5;
}
.font-desc {
  font-size: 14px;
  color: #9b9b9b;
}
</style>
