<template>
	<div class="mygoldbean">
		<div class="header"><div tag="div" class="back" @click="back"><i></i>返回</div>金豆列表</div>
		<div class="block"></div>
		<div class="wrapper" :style="{'top': '44px'}">
			<group gutter="0">
				<cell title="我的金豆" :value="memberInfo.goldBean"></cell>
			</group>
			<div class="goldList">
				<p class="litleTitle">金豆列表</p>
				<div class="goldUl vux-1px-t vux-1px-b">
					<div class="goldLi vux-1px-b" v-for="(item,i) in list" :key="i">
						<img class="icon" src="../assets/img/goldbean.svg">
						<p class="num">{{item.num}}金豆<span class="rmb">¥{{item.num/100}}</span></p>
						<div class="btn">
							<x-button type="primary" mini @click.native="showPayToast(item.num)">&nbsp;获取&nbsp;</x-button>
						</div>
					</div>
				</div>
			</div>
			<div v-show="showPay" class="dialog-mask"></div>
			<div v-show="showPay" class="dialog">
				<div class="closeDialog" @click="showPay = false"></div>
				<div class="dialog-title">
					<strong>获取金豆</strong>
				</div>
				<p class="goldNum">{{payNum}}金豆</p>
				<div style="padding:15px;">
					<x-button @click.native="buyGoldBean" type="primary" :disabled="!isAgree">立即支付{{payNum / 100}}元</x-button>
					<p class="tips" @click="isTipsInfoShow = !isTipsInfoShow">您将先充值钻石，充值后自动兑换<i></i></p>
					<div class="tipsInfo" v-show="isTipsInfoShow">
						<p class="tipsInfoDetail">你充值钻石时，将自动兑换鲜花道具增加魅力值，
	同时附赠金豆，魅力值可点击用户头像查看，使用金豆参加游戏。（1元=10钻，自动兑换鲜花道具增加1魅力值，同时附赠100金豆。）</p>
					</div>
					<div class="agreement vux-1px-t">
						<check-icon :value.sync="isAgree"></check-icon>
						<span @click="showAgreement = true">我已经阅读并同意《91疯狂猜服务协议》</span>
					</div>
				</div>
			</div>
			<div v-show="showAgreement" class="agreementDialog">
				<div class="closeAgreementDialog" @click="showAgreement = false"></div>
				<div class="agreementDialog-title vux-1px-b">
					<strong>91疯狂猜服务协议</strong>
				</div>
				<div style="padding:15px;height:90%" v-html="protocol.content"></div>
			</div>
		</div>
		<form  id="form" action="http://trans.palmf.cn/sdk/api/v1.0/cli/order_h5/0" method="post">
			<input type="hidden" id="orderInfo" name="orderInfo" v-model="orderInfo">
		</form>
	</div>
</template>
<script>
  import { Group,Cell,XButton,XDialog,CheckIcon } from 'vux'
  import protocol from '../assets/data/protocol.json'
  import { appid, key } from '../assets/js/config'
  import md5 from 'md5'
  export default {
	data () {
		return {
			pageIndex: 1,
			list: [],
			showPay: false,
			showAgreement: false,
			isTipsInfoShow: false,
			payNum: 0,
			isAgree: true,
			orderInfo: ''
		}
	},
	computed: {
		memberInfo() {
			return JSON.parse(localStorage.getItem('memberInfo'))
		},
		isWX () {
			return this.isWeixin()
		},
		protocol: () => protocol
	},
	created() {
		document.title = '获取金豆'
		this.getGoldBeanList()
	},
	methods: {
		getGoldBeanList () {
			let URL = this.__WEBSERVERURL__ + '/api/shop/goldBeanType'
			this.$http.get(URL).then(res => {
				this.list = res.body.data.goldBeanTypeList
			})
		},
		showPayToast (goldBeanNum) {
			this.showPay = true
			this.payNum = goldBeanNum
			// this.params.pay_amount = goldBeanNum > 10000 ? (goldBeanNum/100 - 0.01) : goldBeanNum/100
			// this.params.pay_productname = goldBeanNum + '金豆'
		},
		buyGoldBean () {
			let params = {
				'appid': appid,
				'key': key,
				'subject': this.payNum + '金豆', // 商品名称,
				'amount': this.payNum, // 支付金额，单位/分,
				'mchntOrderNo': this.getTimeNum() + this.getVerCode(8), // 订单号,
				'body': '金豆',
				'childAppid': '',
				'clientIp': returnCitySN.cip,
				'payChannelId': this.isWeixin() ? '2000000002' : '', // 支付方式,
				'notifyUrl': 'http://39.108.245.177:3000/api/notifyUtl',
				'returnUrl': window.location.origin + '/#/GetGoldBean',
				'type': this.isWeixin() ? 'api' : 'h5',
				'openId': localStorage.getItem('openid')
			}
			let URL = this.__WEBSERVERURL__ + '/api/payOrder'
			this.$http.post(URL, params).then(res => {
				let resData = res.body.data
				if (this.isWeixin()) {
					let extra = resData.extra
					this.$nextTick(() => {
						this.callpay(JSON.parse(extra))
					})
				} else {
					this.orderInfo = resData
					this.$nextTick(() => {
						document.getElementById('form').submit()
					})
				}
			})
		},
		callpay (data) {
			if (typeof WeixinJSBridge == "undefined") {
				if (document.addEventListener) {
					document.addEventListener('WeixinJSBridgeReady', this.jsApiCall, false)
				} else if (document.attachEvent) {
					document.attachEvent('WeixinJSBridgeReady', this.jsApiCall)
					document.attachEvent('onWeixinJSBridgeReady', this.jsApiCall)
				}
			} else {
				this.jsApiCall(data)
			}
		},
		jsApiCall (data) {
			WeixinJSBridge.invoke(
				'getBrandWCPayRequest',
				data,
				function (res) {
					WeixinJSBridge.log(res.err_msg)
					// alert(res.err_code + res.err_desc + res.err_msg)
					if (res.err_msg == "get_brand_wcpay_request:ok") {
						//支付成功后，写自己的逻辑
					}     // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。
				}
			)
		},
		back () {
			// window.history.go(-1)
			this.$router.push({name: 'home'})
		}
	},
	components: {
		Group,
		Cell,
		XButton,
		XDialog,
		CheckIcon
	}
  }
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
	.mygoldbean
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
			.goldList
				width 100%
				.litleTitle
					color #999
					font-size 14px
					margin-top 0.77em
					margin-bottom 0.3em
					padding-left 15px
					padding-right 15px
				.goldUl
					background-color #fff
					padding 0 15px
					.goldLi
						display flex
						height 45px
						line-height 45px
						.icon
							display block
							width 20px
							flex 0 0 20px
						.num
							flex 1
							padding-left 5px
							.rmb
								color #bbb
								font-size 14px
								padding-left 10px
						.btn
							flex 0 0 70px
			.dialog-mask
				position fixed
				top 0
				left 0
				width 100%
				height 100%
				background-color rgba(0, 0, 0, .6)
			.dialog
				position fixed
				top 50%
				left 50%
				z-index 1000
				transform translate(-50% , -50%)
				-webkit-transform translate(-50% , -50%)
				width 80%
				background-color #fff
				text-align center
				border-radius 3px
				.closeDialog
					position absolute
					right 10px
					top 10px
					width 30px
					height 30px
					background-image url('../assets/img/close.svg')
					background-repeat no-repeat
					background-size 18px
					background-position center
				.dialog-title
					padding 1.3em 1.6em 0.5em
					strong
						font-weight 400
						font-size 18px
				.goldNum
					height 40px
					line-height 40px
					color #ff9928
					font-weight 400
				.tips
					margin-top 5px
					color #666
					font-size 12px
					height 30px
					line-height 30px
					i
						display inline-block
						width 16px
						height 16px
						background-image url('../assets/img/question.svg')
						background-repeat no-repeat
						background-size cover
						position relative
						left 5px
						top 3px
				.tipsInfo
					width 100%
					color #999
					font-size 12px
					padding 5px
					text-align left
					background-color #eee
					border-radius 5px
				.agreement
					font-size 12px
					height 40px
					line-height 40px
					position relative
					top 8px
					span
						color #4395FF
			.agreementDialog
				position fixed
				top 0
				left 0
				bottom 0
				z-index 1001
				width 100%
				background-color #fff
				text-align center
				.closeAgreementDialog
					position absolute
					right 10px
					top 10px
					z-index 99
					width 30px
					height 30px
					background-image url('../assets/img/close.svg')
					background-repeat no-repeat
					background-size 18px
					background-position center
				.agreementDialog-title
					padding 0.8em 1.6em 0.8em
					strong
						font-weight 400
						font-size 18px
</style>