<template>
	<div class="myguess">
		<tab class="tab">
			<tab-item selected @on-item-click="searchList(1)">全部</tab-item>
			<tab-item @on-item-click="searchList(2)">待开奖</tab-item>
			<tab-item @on-item-click="searchList(3)">已开奖</tab-item>
		</tab>
		<div class="block"></div>
		<div class="wrapper">
			<div style="padding: 15px 30px" v-show="isOpen">
				<button-tab v-model="isWinNumber">
					<button-tab-item selected @on-item-click="iswinFc">已中奖</button-tab-item>
					<button-tab-item @on-item-click="iswinFc">未中奖</button-tab-item>
				</button-tab>
			</div>
			<div>
				<group gutter="10px" v-for="item in list" :key="item.title">
					<cell :title="item.project.name" :value="item.project.resultOdds?'已开奖':'待开奖'"></cell>
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
							value: item.goldBeanNum * item.project.resultOdds
						}
					]"></cell-form-preview>
				</group>
			</div>
		</div>
	</div>
</template>
<script>
import { Tab, TabItem, CellFormPreview, Group, Cell, ButtonTab, ButtonTabItem} from 'vux'
export default {
	data () {
		return {
			list: [{
				project: '',
				projectOption: '',
				addTime: ''
			}],
			pageIndex: 1,
			isOpen: false,
			isWinNumber: 0
		}
	},
	computed: {
		isWin() {
			return this.isWinNumber==0?true:false
		}
	},
	created() {
		document.title = '我的竞猜'
		this.getGuessList(1)
	},
	methods: {
		searchList(x) {
			if (x == 1) {
				console.log(x)
				this.isOpen = false
			}else if (x == 2) {
				console.log(x)
				this.isOpen = false
			}else {
				this.isOpen = true
			}
			this.getGuessList(x)
		},
		getGuessList(n) {
			let URL = this.__WEBSERVERURL__ + '/api/project/guess';
			let params = {
				pageIndex: this.pageIndex,
				isLottery: n,
				isWin: this.isWin
			}
			this.$http.get(URL,{params:params}).then((res) => {
				console.log(JSON.stringify(res.body));
				this.list = res.body.data.guessList;
			})
		},
		iswinFc() {
			console.log(this.isWin)
			this.searchList(3)
		}
	},
	components: {
		Tab,
		TabItem,
		CellFormPreview, 
		Group,
		Cell,
		ButtonTab,
		ButtonTabItem
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