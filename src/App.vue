<template>
  	<div class="container">
    	<router-view></router-view>
  	</div>
</template>
<script>
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
		}
	}
</script>

<style lang="less">
	@import '~vux/src/styles/reset.less';
	@import '~vux/src/styles/1px.less';
	@import '~vux/src/styles/close';
	.container {
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
	}	
	.header {
		width: 100%;
		position: fixed !important;
		left: 0;
		top: 0;
		z-index: 100;
	}	
</style>
