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
      path: '/my',
      name: 'my',
      component: resolve => require(['@/components/My'], resolve)
    },
    {
      path: '/getGoldBean',
      name: 'getGoldBean',
      component: resolve => require(['@/components/GetGoldBean'], resolve)
    },
    {
      path: '/myGuess',
      name: 'myGuess',
      component: resolve => require(['@/components/MyGuess'], resolve)
    },
    {
      path: '/accountDetail',
      name: 'accountDetail',
      component: resolve => require(['@/components/AccountDetail'], resolve)
    }
  ]
})
