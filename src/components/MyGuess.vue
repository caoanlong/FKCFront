<template>
	<div class="myguess">
		<tab class="tab">
			<tab-item selected @on-item-click="searchList(0)">全部</tab-item>
			<tab-item @on-item-click="searchList(1)">待开奖</tab-item>
			<tab-item @on-item-click="searchList(2)">已开奖</tab-item>
		</tab>
		<div style="padding: 15px 30px" v-show="isOpen">
			<button-tab>
				<button-tab-item selected>已中奖</button-tab-item>
				<button-tab-item>未中奖</button-tab-item>
			</button-tab>
		</div>
		<div>
			<group gutter="10px" v-for="item in list" :key="item.title">
				<cell :title="item.project.name" :value="(item.project.endTime > new Date().getTime()) ? '待开奖' : '已开奖'"></cell>
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
						label: '投注金额',
						value: item.goldBeanNum
					}
				]"></cell-form-preview>
			</group>
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
			isOpen: false
		}
	},
	created() {
		this.$store.commit({
			type: 'changeTitle',
			title: '我的竞猜',
			isCome: true,
			isAdd: false,
		})
		this.getGuessList()
	},
	methods: {
		searchList(x) {
			if (x == 0) {
				console.log(x)
				this.isOpen = false
			}else if (x == 1) {
				console.log(x)
				this.isOpen = false
			}else {
				this.isOpen = true
			}
		},
		getGuessList() {
			let URL = this.__WEBSERVERURL__ + '/api/project/guess';
			this.$http.get(URL).then((res) => {
				console.log(JSON.stringify(res.body));
				this.list = res.body.data.guessList;
			})
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
		top 90px
		left 0
		.tab
			position fixed
			left 0
			top 46px
			width 100%
			z-index 10
</style>