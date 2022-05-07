<template>
  <div class="app-container">
    <div>
      <el-row :gutter="20">
        <el-col :xs="12" :sm="12" :lg="8">
          <user-card :user-info="userInfo" />
        </el-col>
        <el-col :xs="12" :sm="12" :lg="16">
          <el-card>
            <el-tabs active-name="account">
              <el-tab-pane label="账号" name="account">
                <account :user-info="userInfo" />
              </el-tab-pane>
              <el-tab-pane label="密码管理" name="password">
                <password />
              </el-tab-pane>
            </el-tabs>
          </el-card>
        </el-col>

      </el-row>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import UserCard from './components/UserCard'
import Account from './components/Account'
import Password from '@/views/profile/components/Password'
import { getInfo } from '@/api/user'
import { formatDate } from '@/utils'

export default {
  name: 'Profile',
  components: { UserCard, Account, Password },
  data() {
    return {
      userInfo: {
        realName: '',
        phone: '',
        lastActiveTime: '',
        createTime: '',
        role: '1',
        birthDay: '',
        avatar: null
      },
      loginLog: null
    }
  },
  computed: {
    ...mapGetters([
      'name',
      'avatar',
      'roles'
    ])
  },
  created() {
    this.getUser()
  },
  methods: {
    formatDateTime(time) {
      if (time == null || time === '') {
        return 'N/A'
      }
      const date = new Date(time)
      return formatDate(date, 'yyyy-MM-dd')
    },
    getUser() {
      const _this = this
      getInfo().then(response => {
        _this.userInfo = response.data
        _this.userInfo.birthDay = this.formatDateTime(response.data.birthDay)
      })
    }
  }
}
</script>
