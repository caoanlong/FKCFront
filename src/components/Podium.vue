<template>
	<div class="podium">
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
</style>