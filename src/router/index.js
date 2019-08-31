import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/login'
import Home from '@/views/home'
import Welcome from '@/views/welcome'
import store from '@/store'
import Error from '@/views/welcome/err'
import Articles from '@/views/article/articles'
import Setting from '@/views/setting/setting'
import Picture from '@/views/image/picture'
import Content from '@/views/content/content'
import Comment from '@/views/comment/comment'
import Fans from '@/views/fans/fans'

import A from '@/text/a'
import B from '@/text/b'
import Parent from '@/text/parent'
import Child from '@/text/child'
import P from '@/text/1'
import C from '@/text/2'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    { path: '/login', component: Login },
    { path: '/',
      component: Home,
      children: [
        { path: '/', component: Welcome },
        { path: '/articles', name: 'articles', component: Articles },
        { path: '/setting', name: 'setting', component: Setting },
        { path: '/picture', name: 'picture', component: Picture },
        { path: '/content', name: 'content', component: Content },
        { path: '/comment', name: 'comment', component: Comment },
        { path: '/fans', name: 'fans', component: Fans }
      ] },
    { path: '/a', component: A },
    { path: '/b', component: B },
    { path: '/parent', component: Parent },
    { path: '/child', component: Child },
    { path: '/p', component: P },
    { path: '/c', component: C },
    { path: '*', name: 'error', component: Error }
  ]
})
router.beforeEach((to, from, next) => {
  if (to.path !== '/login' && !store.getUser().token) {
    next('/login')
  }
  next()
})
export default router
