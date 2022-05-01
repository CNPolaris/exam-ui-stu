<template>
  <div style="margin-top: 10px">
    <el-row class="app-item-contain">
      <h3 class="index-title-h3" style="border-left: solid 10px #3651d4;">任务中心</h3>
      <div style="padding-left: 15px">
        <el-collapse v-if="taskList.length!==0" v-loading="taskLoading" accordion>
          <el-collapse-item v-for="taskItem in taskList" :key="taskItem.id" :title="taskItem.title" :name="taskItem.id">
            <table class="index-task-table">
              <tr v-for="paperItem in taskItem.paperItems" :key="paperItem.examPaperId">
                <td class="index-task-table-paper">
                  {{ paperItem.examPaperName }}
                </td>
                <td width="70px">
                  <el-tag v-if="paperItem.status !== null" :type="statusTagFormatter(paperItem.status)" size="mini">
                    {{ statusTextFormatter(paperItem.status) }}
                  </el-tag>
                </td>
                <td width="80px">
                  <router-link v-if="paperItem.status === null" target="_blank" :to="{path:'/exam/do',query:{id:paperItem.examPaperId}}">
                    <el-button type="text" size="small">开始答题</el-button>
                  </router-link>
                  <router-link v-else-if="paperItem.status === 1" target="_blank" :to="{path:'/edit',query:{id:paperItem.examPaperAnswerId}}">
                    <el-button type="text" size="small">批改试卷</el-button>
                  </router-link>
                  <router-link v-else-if="paperItem.status === 2" target="_blank" :to="{path:'/read',query:{id:paperItem.examPaperAnswerId}}">
                    <el-button type="text" size="small">查看试卷</el-button>
                  </router-link>
                </td>
              </tr>
            </table>
          </el-collapse-item>
        </el-collapse>
      </div>
    </el-row>
    <el-row class="app-item-contain">
      <h3 class="index-title-h3">试卷中心</h3>
      <div class="index-contain exam-paper-contain" style="margin-top: 10px">
        <el-card v-for="(item,index) in paper" :key="index" class="paper-card is-none-shadow">
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
    <el-row class="app-item-contain">
      <h3 class="index-title-h3">视频课堂</h3>
      <div class="index-contain video-page-contain">
        <el-card v-for="(item, index) in videos" :key="index" class="video-card">
          <div class="video-card-content" style="padding-top: 10px">
            <div style="display: flex; justify-content: center">
              <a :href="'#/video/preview?id=' + item.id">
                <img :src="item.cover" class="video-image" alt="视频封面">
              </a>
            </div>
            <div class="video-name" style="margin-top: 10px;">
              {{ item.name }}
            </div>
            <div class="exam-line" style="margin-top: 10px;" />
            <div class="font-desc">
              学科：{{ item.subject }}
            </div>
            <div style="text-align: center">
              <router-link target="_blank" :to="{ path: '/video/preview', query: { id: item.id }}">
                <el-button type="text" size="small">开始观看</el-button>
              </router-link>
            </div>
          </div>
        </el-card>
      </div>
    </el-row>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import { getUserPaper, getTaskPaper } from '@/api/paper'
import { getVideoLevel } from '@/api/video'

export default {
  filters: {
    paperTypeFormatter(type) {
      const paperTypeEnum = [{ key: 1, value: '固定试卷' }, { key: 4, value: '时段试卷' }]
      for (const item of paperTypeEnum) {
        if (item.key === type) {
          return item.value
        }
      }
      return type
    }
  },
  data() {
    return {
      fixedPaper: [],
      timeLimitPaper: [],
      pushPaper: [],
      loading: false,
      taskLoading: false,
      paper: [],
      taskList: [],
      videos: [],
      paperTypeEnum: [{ key: 1, value: '固定试卷' }, { key: 4, value: '时段试卷' }],
      paperQuery: {
        subjectId: null,
        paperType: null
      }
    }
  },
  computed: {
    ...mapGetters('enumItem', [
      'enumFormat'
    ]),
    ...mapGetters('exam', ['subjectEnumFormat']),
    ...mapState('exam', { subjects: state => state.subjects }),
    ...mapState('enumItem', {
      statusEnum: state => state.exam.examPaperAnswer.statusEnum,
      statusTag: state => state.exam.examPaperAnswer.statusTag
    })
  },
  created() {
    const _this = this
    this.loading = true
    _this.initSubject()
    getUserPaper().then(re => {
      _this.paper = re.data
      for (let i = 0; i < _this.paper.length; i++) {
        _this.paper[i].subject = _this.subjectFormatter(_this.paper[i].subjectId)
      }
    })
    getVideoLevel().then(re => {
      _this.videos = re.data
    })
    getTaskPaper().then(re => {
      _this.taskList = re.data
    })
  },
  methods: {
    statusTagFormatter(status) {
      return this.enumFormat(this.statusTag, status)
    },
    statusTextFormatter(status) {
      return this.enumFormat(this.statusEnum, status)
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
    ...mapActions('exam', { initSubject: 'initSubject' })
  }
}
</script>

<style lang="scss" scoped>
.index-title-h3 {
  font-size: 22px;
  font-weight: 400;
  color: #1f2f3d;
  border-left: solid 10px #2ce8b4;
  padding-left: 10px;
}

.el-carousel__item h3 {
  color: #475669;
  font-size: 18px;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
  background-color: #d3dce6;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  padding: 0;
  float: right;
}

.image {
  width: 50%;
  height: 80%;
  display: block;
  margin: 20px auto 10px auto;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both
}
.video {
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
