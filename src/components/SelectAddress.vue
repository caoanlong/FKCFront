<template>
	<div class="address">
		<div class="header"><div tag="div" class="back" @click="back"><i></i>返回</div>设置收货地址</div>
		<div class="block"></div>
		<div class="wrapper">
			<div class="addressList vux-1px-b" v-for="address in addressList" @click="selectAddress(address.consignee, address.mobile, address.area, address.detailedAddress)">
				<div class="name-mobile">
					<p class="consignee">{{address.consignee}}</p>
					<p class="mobile">{{address.mobile}}</p>
				</div>
				<div class="detailedAddress vux-1px-b">{{address.area|trim}}{{address.detailedAddress}}</div>
			</div>
		</div>
		<router-link tag="div" :to="{name: 'addNewAddress', query: {pos: 'selectAddress'}}" class="addBtn">添加新地址</router-link>
	</div>
</template>
<script>
	import {CheckIcon} from 'vux'
	export default {
		data () {
			return {
				addressList: [],
			}
		},
		computed: {
			isWX () {
				return this.isWeixin()
			}
		},
		created() {
			document.title = '我的收货地址'
			this.getAddressList()
		},
		methods: {
			getAddressList() {
				let URL = this.__WEBSERVERURL__ + '/api/member/address'
				this.$http.get(URL).then((res) => {
					if (res.body.code == 0) {
						this.addressList = res.body.data
					}
				})
			},
			selectAddress (consignee, mobile, area, detailedAddress) {
				let URL = this.__WEBSERVERURL__ + '/api/member/memberPrize/setAddress'
				let params = {
					memberPrizeId: this.$route.query.id,
					consignee: consignee,
					mobile: mobile,
					address: area.split(' ').join('') + detailedAddress
				}
				this.$http.post(URL, params).then((res) => {
					this.$vux.toast.text(res.body.msg,'middle')
					this.$router.replace({name: 'myPrize'})
				})
			},
			back () {
				window.history.go(-1)
			}
		},
		components: {
			CheckIcon
		}
	}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
	.address
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
			.addressList
				width 100%
				padding 0 15px
				margin-bottom 10px
				background-color #fff
				.name-mobile
					display flex
					height 40px
					line-height 40px
					.consignee
						flex 1
					.mobile
						flex 1
						text-align right
				.detailedAddress
					padding-bottom 10px
					color #666
					font-size 14px
				.control
					display flex
					height 46px
					line-height 46px
					font-size 14px
					color #666
					.setDefault
						flex 1
						span
							color #666
							&.activeDefault
								color #09BB07
					.edit-del
						display flex
						flex 0 0 130px
						.edit
							flex 1
							padding-left 26px
							background-image url('../assets/img/edit.svg')
							background-repeat no-repeat
							background-size 20px 28px
							background-position 0 8px
						.del
							flex 1
							margin-left 10px
							padding-left 26px
							background-image url('../assets/img/del.svg')
							background-repeat no-repeat
							background-size 20px 28px
							background-position 0 8px
		.addBtn
			position fixed
			bottom 0
			left 0
			width 100%
			height 50px
			line-height 50px
			text-align center
			color #fff
			background-color #e64340
</style>
