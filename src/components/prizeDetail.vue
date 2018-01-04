<template>
	<div class="prizeDetail">
		<div class="header" v-if="!isWX"><div tag="div" class="back" @click="back"><i></i>返回</div>奖品详情</div>
		<img ref="prizeImg" class="prizeImg" :style="{'height': prizeImgWidth + 'px', 'margin-top': isWX ? 0 : '44px'}" :src="__WEBIMGSERVERURL__ + prizeDetail.prizeImg" v-if="prizeDetail.prizeImg">
		<img ref="prizeImg" class="prizeImg" :style="{'height': prizeImgWidth + 'px', 'margin-top': isWX ? 0 : '44px'}" src="../../static/images/default.png" v-else>
		<div class="prizeContent vux-1px-t">
			<p class="prizeTitle">{{prizeDetail.prizeName}}</p>
			<p class="price">
				<span class="prizeGoldPrice">{{prizeDetail.prizeGoldBeanPrice}}金豆</span>
				<span class="prizePrice">参考价：{{prizeDetail.prizeRefPrice}}元</span>
			</p>
			<div class="info">
				<p class="infoTitle">奖品介绍</p>
				<p class="infoContent">{{prizeDetail.prizeInfo}}</p>
			</div>
			<div class="info">
				<p class="infoTitle">抽奖说明</p>
				<p class="infoContent">1、中奖后，可在订单中填写收件信息，请按格式正确填写收件信息，如因收件信息填写错误导致的损失，平台不予承担；2、该奖品将由京东于3个工作日内安排派奖；3、请尽快填写收获信息，超过30天未填写将取消中奖资格。</p>
			</div>
		</div>
		<div class="prizeDraw vux-1px-t">
			<div class="myGoldBean">我的金豆：{{memberInfo.goldBean}}</div>
			<div class="prizeDrawBtn" @click="prizeDraw">立即抽奖</div>
		</div>
	</div>
</template>
<script type="text/javascript">
	export default {
		data () {
			return {
				prizeImgWidth: '',
				prizeDetail: {},
				memberInfo: {}
			}
		},
		computed: {
			isWX () {
				return this.isWeixin()
			}
		},
		created () {
			document.title = '奖品详情'
			this.getPrizeDetail()
			this.memberInfo = JSON.parse(localStorage.getItem('memberInfo'))
		},
		mounted () {
			this.prizeImgWidth = this.$refs.prizeImg.offsetWidth
		},
		methods: {
			getPrizeDetail () {
				let URL = this.__WEBSERVERURL__ + '/api/shop/prizeDetail'
				let params = {
					prizeId: this.$route.query.id
				}
				this.$http.get(URL, {params: params}).then(res => {
					// console.log(res.body.data)
					this.prizeDetail = res.body.data
				})
			},
			prizeDraw () {
				if (Number(this.memberInfo.goldBean) < Number(this.prizeDetail.prizeGoldBeanPrice)) {
					this.$vux.confirm.show({
						title: '提示',
						content: '金豆不足！',
						confirmText: '去充值',
						cancelText: '放弃',
						onCancel: () => {
							console.log('放弃')
						},
						onConfirm: () => {
							this.$router.push({name: 'getGoldBean'})
						}
					})
					return
				}
				let URL = this.__WEBSERVERURL__ + '/api/shop/prizeDraw'
				let params = {
					prizeId: this.prizeDetail._id,
					prizeGoldBeanPrice: this.prizeDetail.prizeGoldBeanPrice
				}
				this.$http.post(URL, params).then(res => {
					if (res.body.code == 0) {
						this.getMemberInfo(() => {
							this.memberInfo = JSON.parse(localStorage.getItem('memberInfo'))
						})
						this.$vux.alert.show({
							title: '恭喜您，抽中' + this.prizeDetail.prizeName,
							content: '请在我的奖品中填写收获地址，方便发货。',
						})
					} else {
						this.$vux.toast.text(res.body.msg + res.body.code,'middle')
					}
				})
			},
			getMemberInfo(callback) {
				let URL = this.__WEBSERVERURL__ + '/api/member/info'
				this.$http.post(URL).then((res) => {
					if (res.body.code == 0) {
						console.log(JSON.stringify(res.body.data))
						localStorage.setItem('memberInfo',JSON.stringify(res.body.data));
						this.$store.commit({
							type: 'getMemberInfo',
							memberInfo: res.body.data
						})
						if (callback) {
							callback()
						}
					}
				})
			},
			back () {
				window.history.go(-1)
			}
		}
	}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
	.prizeDetail
		width 100%
		background-color #fff
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
		.prizeImg
			display block
			width 100%
			padding 40px
		.prizeDraw
			position fixed
			bottom 0
			left 0
			width 100%
			height 53px
			background-color #fff
			display flex
			.myGoldBean
				padding-left 15px
				height 53px
				line-height 53px
				flex 1
				color #666
			.prizeDrawBtn
				flex 0 0 140px
				height 53px
				line-height 53px
				background-color #E64340
				color #fff
				text-align center
		.prizeContent
			padding 10px 15px 60px 15px
			.prizeTitle
				line-height 2
			.prizeGoldPrice
				color #ff6900
				padding-right 20px
			.prizePrice
				color #999
				font-size 14px
				font-weight 300
			.info
				margin-top 15px
				.infoTitle
					font-size 15px
				.infoContent
					font-size 14px
					color #666
</style>