import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const vuexStore = new Vuex.Store({
	state: {
		title: '',
		isCome: false,
		isAdd: true,
		memberInfo: {}
	},
	mutations: {
		changeTitle(state,obj) {
			state.title = obj.title;
			state.isCome = obj.isCome;
			state.isAdd = obj.isAdd;
		},
		getMemberInfo(state,obj) {
			state.memberInfo = obj.memberInfo
		}
	},
	actions: {
		changeTitleAsync(context,obj) {
			context.commit('changeTitle',obj);
		}
	}
})
export default vuexStore