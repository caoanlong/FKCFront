import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const vuexStore = new Vuex.Store({
	state: {
		memberInfo: {}
	},
	mutations: {
		getMemberInfo(state,obj) {
			state.memberInfo = obj.memberInfo
		}
	}
})
export default vuexStore