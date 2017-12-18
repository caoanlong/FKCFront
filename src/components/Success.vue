<template>
	<div class="main">
		<msg title="交易成功" :description="description" :buttons="buttons" icon="success"></msg>
	</div>
</template>
<script>
	import { Msg, Divider, XButton } from 'vux'
	export default {
		data () {
			return {
				description: this.$route.query.subject,
				buttons: [{
					type: 'primary',
					text: '返回',
					link: '/' + this.$route.query.link
			  	}]
			}
		},
		created() {
			document.title = '交易成功'
		},
		methods: {
		},
		components: {
			Msg,
			Divider,
			XButton
		}
	}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
	.main
		position absolute
		top 46px
		left 0
		right 0
		bottom 0px
</style>
