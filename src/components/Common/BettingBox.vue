<template>
	<div class="bettingBox" v-if="isShow">
		<router-link :to="{name: 'getGoldBean'}" tag="div" class="mine">
			<div class="mineBean">
				<p>金豆</p>
				<p>{{memberInfo.goldBean || '未登录'}}</p>
			</div>
			<div class="add">
				<img class="icon" src="../../assets/img/add.svg"/>
			</div>
		</router-link>		    		
		<div class="size">
			<div class="option" :class="{'active': selected.value == opt.value}" v-for="opt in option" v-text="opt.value" @click="selectSize(opt)"></div>
		</div>		    		
		<button class="bettingBtn" :class="{'disabled': !selected}" :disabled="!selected" @click="betting()">投注</button>
	</div>
</template>
<script>
	import {Alert} from 'vux'
	export default {
		props: {
			isShow: {
				type: Boolean,
				default: false
			},
			selectOpt: {
				type: Object
			},
			projectId: {
				type: String
			}
		},
		data () {
			return {
				option: [
					{
						key: '100',
						value: 100
					},{
						key: '500',
						value: 500
					},{
						key: '1000',
						value: 1000
					},{
						key: 'All',
						value: 'All in'
					}
				],
				selected: {
					key: '500',
					value: 500
				}
			}
		},
		computed: {
			memberInfo() {
				return JSON.parse(localStorage.getItem('memberInfo'))
			}
		},
		methods: {
			selectSize(option) {
				this.selected = option;
				this.$emit('select',option);
			},
			betting() {
				let URL = this.__WEBSERVERURL__ + '/api/project/betting'
				let goldBeanNum = 0
				if (this.selected.key == 'All') {
					if (Number(this.memberInfo.goldBean) < 10) {
						this.$vux.toast.text('金豆数量小于10','middle')
						return
					}
					goldBeanNum = Number(this.memberInfo.goldBean)
				} else {
					goldBeanNum = this.selected.value
				}
				let params = {
					goldBeanNum: goldBeanNum,
					projectId: this.projectId,
					projectOption: this.selectOpt
				}
				console.log(JSON.stringify(params))
				let that = this;
				this.$http.post(URL,params).then((res) => {
					console.log(JSON.stringify(res.body))
					if (res.body.code == 0) {
						this.$vux.alert.show({
							title: '恭喜',
							content: '投注成功',
							onShow () {
								that.getMemberInfo()
							}
						})
					}else {
						this.$vux.toast.text(res.body.msg,'middle')
					}
				})
			},
			getMemberInfo() {
				let URL = this.__WEBSERVERURL__ + '/api/member/info'
				this.$http.post(URL).then((res) => {
					if (res.body.code == 0) {
						console.log(JSON.stringify(res.body.data))
						localStorage.setItem('memberInfo',JSON.stringify(res.body.data));
						this.$store.commit({
							type: 'getMemberInfo',
							memberInfo: res.body.data
						})
					}
				})
			}
		},
		components:{
			Alert
		}
	}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
	.bettingBox
		display flex
		width 100%
		height 60px
		.mine
			flex 0 0 70px
			display flex
			position relative
			.mineBean
				flex 1
				font-size 14px
				color #999
				p
					height 30px
					line-height 30px
			.add
				position absolute
				right 0
				width 28px
				.icon
					display block
					width 22px
					height 22px
					margin-top 5px
		.size
			flex 1
			display flex
			padding 5px
			padding-left 0
			.option
				flex 1
				margin 5px 3px
				line-height 230%
				border-radius 5px
				text-align center
				border 1px solid #ddd
				color #999
			.active
				color #ff9928
				border 1px solid #ff9928
				font-weight bold		
		.bettingBtn
			border none
			font-size 16px
			flex 0 0 70px
			height 40px
			line-height 40px
			margin-top 10px
			margin-left 5px
			background-color #E64340
			border-radius 20px
			color #fff
			text-align center
		.disabled
			background-color #999
</style>