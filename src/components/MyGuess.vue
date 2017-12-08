<template>
	<div class="myguess">
		<tab class="tab">
			<tab-item selected @on-item-click="searchList(1)">全部</tab-item>
			<tab-item @on-item-click="searchList(2)">待开奖</tab-item>
			<tab-item @on-item-click="searchList(3)">已开奖</tab-item>
		</tab>
		<div class="block"></div>
		<div class="wrapper">
			<div ref="guessWrapper">
				<div style="padding: 15px 30px" v-show="isOpen">
					<button-tab v-model="isWinNumber">
						<button-tab-item selected @on-item-click="iswinFc">已中奖</button-tab-item>
						<button-tab-item @on-item-click="iswinFc">未中奖</button-tab-item>
					</button-tab>
				</div>
				<div>
					<group gutter="10px" v-for="item in list" :key="item.title">
						<cell :title="item.project.name" :value="item.isLottery?'已开奖':'待开奖'"></cell>
						<cell-form-preview :list="[
							{
								label: '竞猜内容',
								value: item.projectOption.content
							},
							{
								label: '投注时间',
								value: item.addTime.substr(0,10)
							},
							{
								label: '投注赔率',
								value: item.projectOption.odds
							},
							{
								label: '投注金额',
								value: item.goldBeanNum
							},
							{
								label: '奖金',
								value: item.bonus
							}
						]"></cell-form-preview>
					</group>
				</div>
				<pullUpLoad :loadStatus="loadStatus"></pullUpLoad>
			</div>
		</div>
	</div>
</template>
<script>
import { Tab, TabItem, CellFormPreview, Group, Cell, ButtonTab, ButtonTabItem} from 'vux'
import pullUpLoad from './Common/pullUpLoad'
export default {
	data () {
		return {
			loadStatus: '正在加载...',
			list: [],
			pageIndex: 1,
			pages: 1,
			isOpen: false,
			isWinNumber: 0,
			isLottery: 1
		}
	},
	created() {
		document.title = '我的竞猜'
		this.getGuessList()
		window.addEventListener('scroll', (e) => {0
			this.scrollTop = document.documentElement.scrollTop || document.body.scrollTop
			this.clientHeight = document.documentElement.clientHeight || document.body.clientHeight
			this.pageHeight = this.$refs.guessWrapper.offsetHeight
			if (this.isOpen) {
				this.disY = this.pageHeight - this.clientHeight + 54
			} else {
				this.disY = this.pageHeight - this.clientHeight + 64
			}
			console.log(this.scrollTop, this.clientHeight, this.pageHeight, this.disY)
			if (this.scrollTop == this.disY) {
				if (this.pageIndex < this.pages) {
					this.loadStatus = '正在加载...'
					this.pageIndex++
					this.getGuessList()
				} else {
					this.loadStatus = '~已经到底了~'
				}
			}
		})
	},
	methods: {
		searchList(x) {
			if (x == 1) {
				this.isOpen = false
			}else if (x == 2) {
				this.isOpen = false
			}else {
				this.isOpen = true
			}
			this.list = []
			this.pageIndex = 1
			this.pages = 1
			this.isLottery = x
			this.getGuessList()
		},
		getGuessList() {
			let URL = this.__WEBSERVERURL__ + '/api/project/guess'
			let params = {
				pageIndex: this.pageIndex,
				isLottery: this.isLottery,
				isWin: this.isWinNumber == 0 ? true : false
			}
			this.$http.get(URL,{params:params}).then((res) => {
				this.pages = res.body.data.pages
				this.list = this.list.concat(res.body.data.guessList)
				if (res.body.data.guessList.length < res.body.data.pageSize) {
					this.loadStatus = '~已经到底了~'
				}
				if (this.list.length == 0) {
					this.loadStatus = '~没有结果~'
				}
			})
		},
		iswinFc() {
			this.list = []
			this.pageIndex = 1
			this.pages = 1
			this.isLottery = 3
			this.getGuessList()
		}
	},
	components: {
		Tab,
		TabItem,
		CellFormPreview, 
		Group,
		Cell,
		ButtonTab,
		ButtonTabItem,
		pullUpLoad
	}
  }
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
	.myguess
		width 100%
		position absolute
		top 44px
		left 0
		.tab
			position fixed
			left 0
			top 0
			width 100%
			z-index 10
		.wrapper
			width 100%
			position absolute
			left 0
			top 0
			right 0
</style>