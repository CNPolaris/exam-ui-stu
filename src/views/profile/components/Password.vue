<template>
  <el-form ref="password" :model="password" :rules="passwordRules">
    <el-form-item label="原密码  " prop="old">
      <el-input v-model="password.old" style="width: 182px;" />
    </el-form-item>
    <el-form-item label="新密码  " prop="new">
      <el-input v-model.trim="password.new" style="width: 182px;" />
    </el-form-item>
    <el-form-item label="重复输入" prop="again">
      <el-input v-model.trim="password.again" style="width: 182px;" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submit">更新</el-button>
    </el-form-item>
  </el-form>
</template>

<script>

export default {
  data() {
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('密码不能低于6位'))
      } else if (this.password.new !== this.password.again) {
        callback(new Error('两次输入密码不一致'))
      } else {
        callback()
      }
    }
    return {
      passwordType: 'password',
      password: {
        old: null,
        new: null,
        again: null
      },
      passwordRules: {
        old: [{ required: true, trigger: 'blur', validator: validatePassword }],
        new: [{ required: true, trigger: 'blur', validator: validatePassword }],
        again: [{ required: true, trigger: 'blur', validator: validatePassword }]
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
    }
  }
}
</script>
