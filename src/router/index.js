import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    { 
      path: '*', 
      redirect: {name: 'home'}
    },
    {
      path: '/',
      name: 'home',
      component: resolve => require(['@/components/Home'], resolve)
    },
    {
      path: '/projectDetail',
      name: 'projectDetail',
      component: resolve => require(['@/components/ProjectDetail'], resolve)
    },
    {
      path: '/login',
      name: 'login',
      component: resolve => require(['@/components/Login'], resolve)
    },
    {
      path: '/register',
      name: 'register',
      component: resolve => require(['@/components/Register'], resolve)
    },
    {
      path: '/mine',
      name: 'mine',
      component: resolve => require(['@/components/Mine'], resolve)
    }
  ]
})
