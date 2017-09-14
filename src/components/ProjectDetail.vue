<template>
	<div>
		<img class="main-img" :src="data.url" v-if="data.url">
   		<img class="main-img" src="../../static/images/default.png" v-else>
		<group title="请选择下列投注选项">
		    <radio :options="options" v-model="selected"></radio>
	  	</group>
	</div>
</template>
<script>
	import { Group,Radio } from 'vux'
	export default {
		data () {
		    return {
		    	data: {},
		    	options: [],
		    	selected: null
		    }
		},
		created() {
	  		this.$store.commit({
	  			type: 'changeTitle',
	  			title: '项目详情',
	  			isCome: true,
	  			isAdd: false,
	  		});
	  		this.getProjectDetail();
	  	},
	  	watch: {
	  		selected(newVal) {
	  			console.log(newVal);
	  		}
	  	},
	  	methods: {
	  		getProjectDetail() {
	  			let URL = "../../static/data/json/projectList.json";
	  			this.$http.get(URL).then((res) => {
	  				console.log(JSON.stringify(res.body));
	  				this.data = res.body[1];
	  				this.options = res.body[1].options;
	  			})
	  		},
	  	},
	    components: {
	    	Group,
	      	Radio
	    }
	}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
	.main-img
		width 100%
		height 240px
</style>
