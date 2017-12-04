<template>
	<div class="podium">
		<div class="block"></div>
		<div class="podiumWrapper">
			<h1 style="color: #999;margin-top: 200px;text-align: center">稍后开放...</h1>
		</div>
		<Tabbar></Tabbar>
	</div>
</template>
<script type="text/javascript">
	import Tabbar from './Common/Tabbar'
	export default {
		data () {
			return {

			}
		},
		created () {
			console.log(this.$route.name)
			document.title = '领奖台'
		},
		components: {
			Tabbar
		}
	}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
.podium
	overflow hidden
	.podiumWrapper
		width 100%
		position absolute
		left 0
		top 0
		right 0
</style>