<template>
	<div class="podium">
		<div class="block"></div>
		<div class="podiumWrapper">
			<Goods v-for="goods in goodsList" :key="goods._id" :goods="goods"></Goods>
		</div>
		<Tabbar></Tabbar>
	</div>
</template>
<script type="text/javascript">
	import Tabbar from './Common/Tabbar'
	import Goods from './Common/Goods'
	export default {
		data () {
			return {
				goodsList: []
			}
		},
		created () {
			console.log(this.$route.name)
			document.title = '领奖台'
		},
		methods: {
			getPrizeList() {
				let URL = this.__WEBSERVERURL__ + '/api/shop/prize'
				let params = {
					pageIndex: this.pageIndex
				}
				this.$http.get(URL,{params:params}).then((res) => {
					this.pages = res.body.data.pages
					this.goodsList = this.list.concat(res.body.data.prizeList)
				})
			}
		},
		components: {
			Tabbar,
			Goods
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
		padding 5px
</style>