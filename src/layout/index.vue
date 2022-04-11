<template>
  <el-container>
    <el-header height="61" class="student-header">
      <div class="head-user">
        <el-dropdown trigger="click" placement="bottom">
          <el-badge :is-dot="messageCount!==0" >
            <el-avatar class="el-dropdown-avatar" size="medium" :src="userInfo.imagePath === null ? require('@/assets/avatar.png') : userInfo.imagePath"></el-avatar>
          </el-badge>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="$router.push({path:'/profile/index'})">个人中心</el-dropdown-item>
            <el-dropdown-item @click.native="$router.push({path:'/user/message'})">
              <el-badge v-if="messageCount!==0" :value="messageCount">
                <span>消息中心</span>
              </el-badge>
              <span v-if="messageCount===0">消息中心</span>
            </el-dropdown-item>
            <el-dropdown-item divided @click.native="logout">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <el-menu class="el-menu-title" mode="horizontal" :default-active="defaultUrl" :router="true">
        <el-menu-item index="/">首页</el-menu-item>
        <el-menu-item index="/paper/index">试卷中心</el-menu-item>
        <el-menu-item index="/record/index">考试记录</el-menu-item>
        <el-menu-item index="/question/index">错题本</el-menu-item>
      </el-menu>
    </el-header>
    <el-main class="student-main">
      <router-view />
    </el-main>
  </el-container>
</template>

<script>
import ResizeMixin from './mixin/ResizeHandler'
import { mapActions, mapMutations, mapState } from 'vuex'

export default {
  name: 'Layout',
  mixins: [ResizeMixin],
  data() {
    return {
      defaultUrl: '/',
      userInfo: {
        imagePath: null
      }
    }
  },
  watch: {
    $route(to, from) {
      this.defaultUrl = this.routeSelect(to.path)
    }
  },
  methods: {
    routeSelect(path) {
      const topPath = ['/', '/index', '/paper/index', '/record/index', '/question/index']
      if (topPath.indexOf(path)) {
        return path
      }
      return null
    },
    async logout() {
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    },
    ...mapActions('user', ['getUserMessageInfo']),
    ...mapMutations('user', ['clearLogin'])
  },
  computed: {
    ...mapState('user', {
      messageCount: state => state.messageCount
    })
  }
}
</script>

<style lang="scss" scoped>
  @import "~@/styles/mixin.scss";
  @import "~@/styles/variables.scss";

  .app-wrapper {
    @include clearfix;
    position: relative;
    height: 100%;
    width: 100%;

    &.mobile.openSidebar {
      position: fixed;
      top: 0;
    }
  }

  .drawer-bg {
    background: #000;
    opacity: 0.3;
    width: 100%;
    top: 0;
    height: 100%;
    position: absolute;
    z-index: 999;
  }

  .fixed-header {
    position: fixed;
    top: 0;
    right: 0;
    z-index: 9;
    width: calc(100% - #{$sideBarWidth});
    transition: width 0.28s;
  }

  .hideSidebar .fixed-header {
    width: calc(100% - 54px)
  }

  .mobile .fixed-header {
    width: 100%;
  }
</style>
