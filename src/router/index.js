import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/* Router Modules */
// import componentsRouter from './modules/components'
// import chartsRouter from './modules/charts'
// import tableRouter from './modules/table'
// import nestedRouter from './modules/nested'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    title: '登陆',
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/index',
    children: [
      {
        path: 'index',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: '首页', icon: 'dashboard' }
      }
    ]
  },
  {
    path: '/profile',
    component: Layout,
    redirect: '/profile/index',
    hidden: true,
    children: [
      {
        path: 'index',
        component: () => import('@/views/profile/index'),
        name: 'Profile',
        meta: { title: '个人中心', icon: 'user', noCache: false }
      },
      {
        path: '/profile/score/analysis',
        component: () => import('@/views/exam/result/statistics'),
        name: 'Statistics',
        meta: {
          title: '成绩分析'
        }
      },
      {
        path: '/message/index',
        name: 'MessageIndex',
        component: () => import('@/views/message/index'),
        meta: {
          title: '消息中心'
        }
      }
    ]
  },
  {
    path: '/paper',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/exam/paper'),
        name: 'PaperIndex',
        meta: { title: '试卷中心' }
      }
    ]
  },
  {
    path: '/video',
    component: Layout,
    meta: { title: '视频中心' },
    children: [
      {
        path: '/video/index',
        name: 'ViewIndex',
        component: () => import('@/views/video/index'),
        meta: { title: '视频列表' }
      },
      {
        path: '/video/preview',
        name: 'PreviewVideo',
        component: () => import('@/views/video/preview'),
        meta: { title: '视频播放' },
        hidden: true
      }
    ]
  },
  {
    path: '/exam/do',
    name: 'DoExam',
    component: () => import('@/views/exam/paper/do'),
    meta: { title: '考试' },
    hidden: true
  },
  {
    path: '/record',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Record',
        component: () => import('@/views/exam/answer/record'),
        meta: { title: '考试记录' },
        hidden: true
      }
    ]
  },
  {
    path: '/answer/read',
    component: () => import('@/views/exam/answer/read'),
    meta: { title: '查看答卷' },
    hidden: true
  },
  {
    path: '/answer/edit',
    component: () => import('@/views/exam/paper/edit'),
    meta: { title: '阅卷' },
    hidden: true
  },
  {
    path: '/question',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'QuestionIndex',
        component: () => import('@/views/question/index'),
        meta: { title: '错题' },
        hidden: true
      },
      {
        path: '/question/detail',
        name: 'QuestionDetail',
        component: () => import('@/views/question/detail'),
        meta: {
          title: '答题详情'
        },
        hidden: true
      }
    ]
  }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */

const createRouter = () => new Router({
  // mode: 'history', // require service support
  base: '/student',
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
