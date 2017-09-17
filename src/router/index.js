import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

var router = new Router({
  routes: [
    { 
      path: '*', 
      redirect: {name: 'home'}
    },
    {
      path: '/home',
      name: 'home',
      component: resolve => require(['@/components/Home'], resolve)
    },
    {
      path: '/projectDetail',
      name: 'projectDetail',
      component: resolve => require(['@/components/ProjectDetail'], resolve)
    },
    {
      path: '/',
      name: 'login',
      component: resolve => require(['@/components/Login'], resolve),
      meta: {
        loginout: true
      }
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
});
//刷新页面重新从缓存中获取会员信息
// if (localStorage.getItem('memberInfo')) {
//     store.commit('login',localStorage.getItem('memberInfo'));
// };

// router.beforeEach((to, from, next) => {
//   if (to.meta.loginout) {
//     if (store.state.memberInfo) {
//       next({name: 'Home'});
//     }else {
//       next();
//     }
//   }else {
//     next()
//   }
// });
export default router
