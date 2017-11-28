<template>
	<div class="main">
		<msg title="交易成功" description="无描述" :buttons="buttons" icon="success"></msg>
	</div>
</template>
<script>
	import { Msg, Divider, XButton } from 'vux'
	export default {
		data () {
			return {
				buttons: [{
					type: 'primary',
					text: '返回',
					link: '/GetGoldBean'
			  	}]
			}
		},
		created() {
			this.$store.commit({
				type: 'changeTitle',
				title: '交易成功',
				isCome: true,
				isAdd: false,
			})
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
