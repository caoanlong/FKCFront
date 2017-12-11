import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
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
			path: '/login',
			name: 'login',
			component: resolve => require(['@/components/Login'], resolve),
			meta: {
				loginout: true
			}
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
		},
		{
			path: '/success',
			name: 'success',
			component: resolve => require(['@/components/Success'], resolve)
		},
		{
			path: '/podium',
			name: 'podium',
			component: resolve => require(['@/components/Podium'], resolve)
		},
		{
			path: '/prizeDetail',
			name: 'prizeDetail',
			component: resolve => require(['@/components/PrizeDetail'], resolve)
		},
		{
			path: '/myAddress',
			name: 'myAddress',
			component: resolve => require(['@/components/MyAddress'], resolve)
		},
		{
			path: '/addNewAddress',
			name: 'addNewAddress',
			component: resolve => require(['@/components/AddNewAddress'], resolve)
		},
		{
			path: '/editAddress',
			name: 'editAddress',
			component: resolve => require(['@/components/EditAddress'], resolve)
		},
		{
			path: '/myPrize',
			name: 'myPrize',
			component: resolve => require(['@/components/MyPrize'], resolve)
		},
		{
			path: '/selectAddress',
			name: 'selectAddress',
			component: resolve => require(['@/components/SelectAddress'], resolve)
		}
	]
})

router.beforeEach((to, from, next) => {
    if (to.meta.loginout) {
        if (localStorage.getItem('token')&&localStorage.getItem('memberInfo')) {
            next({name: 'home'})
        }else {
            next()
        }
    }else {
    	if (!(localStorage.getItem('token')&&localStorage.getItem('memberInfo'))) {
    		next({name: 'login'})
    	}
        next()
    }
})
export default router
