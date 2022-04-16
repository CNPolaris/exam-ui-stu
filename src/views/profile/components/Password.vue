<template>
  <el-form ref="password" :model="password" :rules="passwordRules">
    <el-form-item label="原密码  " prop="oldPassword">
      <el-input v-model="password.oldPassword" style="width: 182px;" />
    </el-form-item>
    <el-form-item label="新密码  " prop="newPassword">
      <el-input v-model.trim="password.newPassword" style="width: 182px;" />
    </el-form-item>
    <el-form-item label="重复输入" prop="againPassword">
      <el-input v-model.trim="password.againPassword" style="width: 182px;" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" :disabled="isClick" @click="handlePassword">更新密码</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { updatePassword } from '@/api/user'

export default {
  data() {
    const validateOldPassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('密码不能低于6位'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('密码不能低于6位'))
      } else if (this.password.newPassword !== this.password.againPassword) {
        callback(new Error('两次输入密码不一致'))
      } else {
        this.isClick = false
        callback()
      }
    }
    return {
      passwordType: 'password',
      isClick: true,
      password: {
        oldPassword: null,
        newPassword: null,
        againPassword: null
      },
      passwordRules: {
        oldPassword: [{ required: true, trigger: 'blur', validator: validateOldPassword }],
        newPassword: [{ required: true, trigger: 'blur', validator: validateOldPassword }],
        againPassword: [{ required: true, trigger: 'blur', validator: validatePassword }]
      }
    }
  },
  methods: {
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    handlePassword() {
      const _this = this
      updatePassword(this.password).then(re => {
        if (re.code === 2000) {
          this.$notify({
            title: '成功',
            message: re.message,
            type: 'success',
            duration: 2000
          })
          Object.assign({}, this.password)
          _this.$router.push('/profile/index')
        } else {
          this.$notify({
            title: '失败',
            message: re.message,
            type: 'error',
            duration: 1000
          })
        }
      })
    }
  }
}
</script>
