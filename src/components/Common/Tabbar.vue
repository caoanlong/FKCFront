<template>
	<div class="tabWapper">
		<tabbar>
			<tabbar-item :selected="$route.name.includes('home')" :link="{name: 'home'}">
				<img slot="icon" src="../../assets/img/home-fill.svg" v-if="$route.name.includes('home')">
				<img slot="icon" src="../../assets/img/home.svg" v-else>
				<span slot="label">首页</span>
			</tabbar-item>
			<tabbar-item :selected="$route.name.includes('podium')" :link="{name: 'podium'}">
				<img slot="icon" src="../../assets/img/star-fill.svg" v-if="$route.name.includes('podium')">
				<img slot="icon" src="../../assets/img/star.svg" v-else>
				<span slot="label">领奖台</span>
			</tabbar-item>
			<tabbar-item :selected="$route.name.includes('my')" :link="{name: 'my'}">
				<img slot="icon" src="../../assets/img/my-fill.svg" v-if="$route.name.includes('my')">
				<img slot="icon" src="../../assets/img/my.svg" v-else>
				<span slot="label">我的</span>
			</tabbar-item>
		</tabbar>
	</div>
</template>
<script type="text/javascript">
	import { Tabbar, TabbarItem } from 'vux'
	export default {
		data () {
			return {

			}
		},
		created () {
			console.log(this.$route.name)
		},
		components: {
			Tabbar,
			TabbarItem
		}
	}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
	.tabWapper
		position fixed
		bottom 0
		z-index 99
		width 100%
</style>