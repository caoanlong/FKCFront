<template>
  	<div class="container">
  		<x-header class="header">
  			<span v-text="title"></span>
      		<router-link :to="{name:'my'}" slot="overwrite-left" class="icon-people" v-if="!isCome"></router-link>
      		<router-link to="" slot="right" class="icon-add" v-if="isAdd"></router-link>
  		</x-header>
    	<router-view></router-view>
  	</div>
</template>
<script>
	import {XHeader} from 'vux'
	export default {
		data () {
			return {
			}
		},
		computed: {
			title() {
				return this.$store.state.title
			},
			isCome() {
				return this.$store.state.isCome
			},
			isAdd() {
				return this.$store.state.isAdd
			},
		},
		methods: {
		},
		components: {
			XHeader,
		}
	}
</script>

<style lang="less">
	@import '~vux/src/styles/reset.less';
	@import '~vux/src/styles/1px.less';
	.container {
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
	}	
	.header {
		width: 100%;
		position: fixed;
		left: 0;
		top: 0;
		z-index: 100;
	}	
</style>
