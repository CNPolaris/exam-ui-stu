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
      <div style="padding-left: 15px">
        <el-col v-for="(item, index) in paper" :key="index" :span="4" :offset="index > 0 ? 1 : 0">
          <el-card :body-style="{ padding: '0px' }">
            <div style="padding: 14px;">
              <span>{{ item.name }}</span><br>
              <span>试卷类型：{{ item.paperType|paperTypeFormatter }}</span><br>
              <span>题目数量：{{ item.questionCount }}  总分：{{ item.score }}</span><br>
              <span>时间：{{ item.limitStartTime }}--{{ item.limitEndTime }}</span><br>
              <span>建议时长: {{ item.suggectTime }}</span><br>
              <div class="bottom clearfix">
                <router-link target="_blank" :to="{path:'/exam/do',query:{id:item.id}}">
                  <el-button type="text" class="button">开始做题</el-button>
                </router-link>
              </div>
            </div>
          </el-card>
        </el-col>
      </div>
    </el-row>
    <el-row class="app-item-contain">
      <h3 class="index-title-h3">视频课堂</h3>
      <div style="padding-left: 15px">
        <el-col v-for="(item, index) in videos" :key="index" :span="4" :offset="index > 0 ? 1 : 0">
          <el-card :body-style="{ padding: '0px' }">
            <div style="padding: 14px" @click="$router.push({ path: '/video', query: { id: item.id }})">
              <span>
                {{ item.name }}
              </span>
              <el-image :src="item.cover" />
            </div>
          </el-card>
        </el-col>
      </div>
    </el-row>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
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
  created() {
    const _this = this
    this.loading = true
    getUserPaper().then(re => {
      _this.paper = re.data
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
    }
  },
  // eslint-disable-next-line vue/order-in-components
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
</style>
