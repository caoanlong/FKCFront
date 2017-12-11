<template>
	<div class="myPrize">
		<div class="block"></div>
		<div class="wrapper">
			<div class="myPrizeList vux-1px-b" v-for="myPrize in myPrizeList">
				<div class="prize vux-1px-b">
					<div class="prizeImg">
						<img :src="myPrize.prize.prizeImg">
					</div>
					<div class="prizeInfo">
						<div class="title">{{myPrize.prize.prizeName}}</div>
						<div class="info">{{myPrize.prize.prizeInfo}}</div>
					</div>
				</div>
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
					font-size 15px
					padding 10px 0
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
</style>