// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import router from './router'
import App from './App'
import vueResource from 'vue-resource'
import store from './store/store'
import Vuelidate from 'vuelidate'
import common from './assets/js/common'
import  { AlertPlugin,ToastPlugin } from 'vux'
Vue.use(Vuelidate)
Vue.use(AlertPlugin)
Vue.use(ToastPlugin)

Vue.use(vueResource)
Vue.use(common)

FastClick.attach(document.body)

Vue.config.productionTip = false

Vue.http.interceptors.push((request, next) => {
	let token = localStorage.getItem('token')
	request.headers.set('X-Access-Token', token)
	next((resbonse) => {
		if (resbonse.body.code == 1001 || resbonse.body.code == 1002 || resbonse.body.code == 1003) {
			localStorage.removeItem('token')
			window.location.href = '/#/login'
		}
	})
})

Vue.filter('getdatefromtimestamp', function(value, bool) {
	var now = new Date(Number(value))
	var year = now.getFullYear(); 
	var month = now.getMonth()+1<10?'0'+(now.getMonth()+1):now.getMonth()+1; 
	var date = now.getDate()<10?'0'+now.getDate():now.getDate(); 
	var hour = now.getHours()<10?'0'+now.getHours():now.getHours(); 
	var minute = now.getMinutes()<10?'0'+now.getMinutes():now.getMinutes(); 
	var second = now.getSeconds()+'0';
	if (bool) {
		return year+"-"+month+"-"+date+"-";
	}else {
		return year+"-"+month+"-"+date+" "+hour+":"+minute+":"+second;
	}
})

/* eslint-disable no-new */
new Vue({
	router,
	store: store,
	render: h => h(App)
}).$mount('#app-box')
