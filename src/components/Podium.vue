<template>
	<div class="podium">
		<div class="header" v-if="!isWX">领奖台</div>
		<div class="block"></div>
		<div class="podiumWrapper" :style="{'top': isWX ? 0 : '44px'}">
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
		computed: {
			isWX () {
				return this.isWeixin()
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
				// console.log(this.scrollTop, this.clientHeight, this.pageHeight, this.disY)
				if (this.scrollTop == this.disY) {
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
					if (res.body.data.prizeList.length < res.body.data.pageSize) {
						this.loadStatus = '~已经到底了~'
					}
					if (this.goodsList.length == 0) {
						this.loadStatus = '~没有结果~'
					}
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
	.header
		position fixed
		left 0
		top 0
		width 100%
		height 44px
		line-height 44px
		text-align center
		color #fff
		background-color #2B2623
		position relative
	.podiumWrapper
		width 100%
		position absolute
		left 0
		top 0
		right 0
		padding 5px
</style>