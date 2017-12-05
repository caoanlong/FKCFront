<template>
	<div class="podium">
		<div class="block"></div>
		<div class="podiumWrapper">
			<div ref="podiumIn">
				<Goods v-for="goods in goodsList" :key="goods._id" :goods="goods"></Goods>
				<pullUpLoad :loadStatus="loadStatus"></pullUpLoad>
			</div>
		</div>
		<Tabbar></Tabbar>
	</div>
</template>
<script type="text/javascript">
	import Tabbar from './Common/Tabbar'
	import Goods from './Common/Goods'
	import pullUpLoad from './Common/pullUpLoad'
	export default {
		data () {
			return {
				loadStatus: '正在加载...',
				goodsList: [],
				pageIndex: 1,
				pages: 1
			}
		},
		created () {
			document.title = '领奖台'
			this.getPrizeList()
			window.addEventListener('scroll', (e) => {
				this.scrollTop = document.documentElement.scrollTop || document.body.scrollTop
				this.clientHeight = document.documentElement.clientHeight || document.body.clientHeight
				this.pageHeight = this.$refs.podiumIn.offsetHeight
				this.disY = this.pageHeight - this.clientHeight
				console.log(this.scrollTop, this.clientHeight, this.pageHeight, this.disY)
				if (this.scrollTop > this.disY) {
					if (this.pageIndex < this.pages) {
						this.loadStatus = '正在加载...'
						this.pageIndex++
						this.getPrizeList()
					} else {
						this.loadStatus = '~已经到底了~'
					}
				}
			})
		},
		methods: {
			getPrizeList() {
				let URL = this.__WEBSERVERURL__ + '/api/shop/prize'
				let params = {
					pageIndex: this.pageIndex
				}
				this.$http.get(URL,{params:params}).then((res) => {
					this.pages = res.body.data.pages
					this.goodsList = this.goodsList.concat(res.body.data.prizeList)
				})
			}
		},
		components: {
			Tabbar,
			Goods,
			pullUpLoad
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