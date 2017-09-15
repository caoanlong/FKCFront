// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import router from './router'
import App from './App'
import vueResource from 'vue-resource'
import Vuex from 'vuex'
import  { AlertPlugin } from 'vux'
Vue.use(AlertPlugin)
//配置vuex
Vue.use(Vuex);
Vue.use(vueResource);

FastClick.attach(document.body);

Vue.config.productionTip = false;

const vuexStore = new Vuex.Store({
	state: {
		title: '',
		isCome: false,
		isAdd: true,
	},
	mutations: {
		changeTitle(state,obj) {
			state.title = obj.title;
			state.isCome = obj.isCome;
			state.isAdd = obj.isAdd;
		}
	},
	actions: {
		changeTitleAsync(context,obj) {
			context.commit('changeTitle',obj);
		}
	}
})

/* eslint-disable no-new */
new Vue({
  router,
  store: vuexStore,
  render: h => h(App)
}).$mount('#app-box')
