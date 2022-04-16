<template>
  <div class="app-container">
    <div>
      <el-row :gutter="20">

        <el-col :span="6" :xs="24">
          <user-card :user-info="userInfo" />
        </el-col>

        <el-col :span="18" :xs="24">
          <el-card>
            <el-tabs active-name="timeline">
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
    getUser() {
      const _this = this
      getInfo().then(response => {
        _this.userInfo = response.data
      })
    }
  }
}
</script>
