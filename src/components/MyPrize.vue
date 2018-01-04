<template>
	<div class="myPrize">
		<div class="header" v-if="!isWX"><div tag="div" class="back" @click="back"><i></i>返回</div>我的奖品</div>
		<div class="block"></div>
		<div class="wrapper" :style="{'top': isWX ? 0 : '44px'}">
			<div class="myPrizeList vux-1px-b vux-1px-t" v-for="myPrize in myPrizeList">
				<div class="waybill">
					<div class="waybillNo">{{myPrize.waybillNo?'运单号：'+myPrize.waybillNo:''}}</div>
					<div class="isSend" style="color: #1aad19" v-if="myPrize.isSend == '1'">已发货</div>
					<div class="isSend" style="color: #999" v-else-if="myPrize.isSend == '2'">已完成</div>
					<div class="isSend" style="color: #e64340" v-else>未发货</div>
				</div>
				<router-link tag="div" :to="{name: 'prizeDetail', query: {id: myPrize.prize._id}}" class="prize vux-1px-b vux-1px-t">
					<div class="prizeImg">
						<img :src="__WEBIMGSERVERURL__ + myPrize.prize.prizeImg">
					</div>
					<div class="prizeInfo">
						<div class="title">{{myPrize.prize.prizeName}}</div>
						<div class="info">{{myPrize.prize.prizeInfo}}</div>
					</div>
				</router-link>
				<div class="mobile" v-if="myPrize.mobile">
					<div class="title">{{myPrize.consignee}}</div>
					<div class="value">{{myPrize.mobile}}</div>
				</div>
				<div class="address" v-if="myPrize.address">
					<div class="title">收货地址</div>
					<div class="value">{{myPrize.address}}</div>
				</div>
				<div class="address" v-else>
					<router-link tag="div" :to="{name: 'selectAddress', query: {id: myPrize._id}}" class="warn">请设置收货地址</router-link>
				</div>
				<div class="action vux-1px-t" v-if="myPrize.isSend == '1'">
					<button class="sure" @click="sure(myPrize._id)">确认收货</button>
				</div>
			</div>
		</div>
	</div>
</template>
<script type="text/javascript">
	import {Cell,Group} from 'vux'
	export default {
		data () {
			return {
				myPrizeList: []
			}
		},
		computed: {
			isWX () {
				return this.isWeixin()
			}
		},
		created () {
			document.title = '我的奖品'
			this.getMyPrizeList()
		},
		methods: {
			getMyPrizeList () {
				let URL = this.__WEBSERVERURL__ + '/api/member/memberPrize'
				this.$http.get(URL).then((res) => {
					this.myPrizeList = res.body.data
				})
			},
			sure (id) {
				let URL = this.__WEBSERVERURL__ + '/api/member/memberPrize/sure'
				let params = {
					id: id
				}
				this.$http.post(URL, params).then((res) => {
					if (res.body.code == 0) {
						this.$vux.toast.show({
							text: res.body.msg
						})
						this.getMyPrizeList()
					}
				})
			},
			back () {
				window.history.go(-1)
			}
		},
		components: {
			Cell,
			Group
		}
	}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
	.myPrize
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
			.back
				position absolute
				left 0
				top 0
				padding-left 20px
				font-size 14px
				i
					position absolute
					left 10px
					top 16px
					display block
					width 12px
					height 12px
					border-top 2px solid #fff
					border-left 2px solid #fff
					transform rotate(-45deg)
		.wrapper
			width 100%
			position absolute
			left 0
			top 0
			right 0
			.myPrizeList
				width 100%
				padding 0 15px
				margin-bottom 10px
				background-color #fff
				.waybill
					display flex
					height 50px
					line-height 50px
					.waybillNo
						flex 1
						font-size 14px
					.isSend
						flex 0 0 60px
						font-size 14px
						text-align right
				.prize
					display flex
					height 100px
					.prizeImg
						flex 0 0 80px
						padding-top 10px
						img
							display block
							width 80px
							height 80px
					.prizeInfo
						flex 1
						padding 10px 0 0 10px
						.title
							margin-bottom 5px
						.info
							font-size 14px
							color #999
							display -webkit-box
							-webkit-box-orient vertical
							-webkit-line-clamp 2
							overflow hidden
				.address
				.mobile
					font-size 14px
					padding 6px 0
					display flex
					.title
						flex 0 0 100px
					.value
						flex 1
						color #666
						text-align right
					.warn
						flex 1
						color #e64340
						text-align center
				.action
					width 100%
					height 50px
					.sure
						display block
						float right
						margin-top 6px
						border none
						font-size 14px
						height 36px
						line-height 36px
						padding 0 20px
						background-color #E64340
						border-radius 18px
						color #fff
						text-align center
</style>