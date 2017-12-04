<template>
	<div class="mygoldbean">
		<div class="block"></div>
		<div class="wrapper">
			<group gutter="0">
				<cell title="我的金豆" :value="memberInfo.goldBean"></cell>
			</group>
			<group title="金豆列表">
				<cell :title="item.num+'金豆'" v-for="(item,i) in list" :key="i">
					<img slot="icon" width="20" style="display:block;margin-right:5px;" src="../assets/img/goldbean.svg">
					<div slot="default">
						<x-button type="primary" @click.native="showPayToast(item.num)">&nbsp;获取&nbsp;</x-button>
					</div>
				</cell>
			</group>
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
						<check-icon :value.sync="isAgree">我已经阅读并同意《91疯狂猜服务协议》</check-icon>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
  import { Group,Cell,XButton,XDialog,CheckIcon } from 'vux'
  import MD5 from 'md5'
  export default {
	data () {
		return {
			pageIndex: 1,
			list: [],
			showPay: false,
			isTipsInfoShow: false,
			payNum: 0,
			isAgree: true
		}
	},
	computed: {
		memberInfo() {
			return JSON.parse(localStorage.getItem('memberInfo'))
		}
	},
	created() {
		document.title = '获取金豆'
		this.getGoldBeanList()
	},
	methods: {
		getGoldBeanList () {
			let URL = this.__WEBSERVERURL__ + '/api/shop/goldBeanType'
			this.$http.get(URL).then(res => {
				console.log(JSON.stringify(res.body))
				this.list = res.body.data.goldBeanTypeList
			})
		},
		showPayToast (goldBeanNum) {
			this.showPay = true
			this.payNum = goldBeanNum
		},
		buyGoldBean () {
			// 支付对接参数
			let url = 'http://pay.e-mac.com.cn/pay/v1/order'
			let merNo = '10034'
			let appId = '26'
			let key = 'b9a597302b91b312e86e1efa2b40c6bf'
			let transType = '2' // 支付方式
			let transAmt = this.payNum // 支付金额
			let transTime = this.getTimeNum() // 支付时间(yyyyMMddHHmmss)
			let orderNo = this.getTimeNum() + this.getVerCode(8) // 订单号，不可重复
			let returnUrl = encodeURIComponent('http://m.91fkc.com/#/success') // 公众号返回页面，可不填，不参与加密（以http://开头）
			let showQR = 0 // 0:返回链接1:直接显示二维码(扫码接口有效，默认为0，不参与加密)
			let beforeSign = merNo+'|'+appId+'|'+transType+'|'+transAmt+'|'+transTime+'|'+orderNo+'|'+key
			let sign = MD5(beforeSign)
			/* 加密信息，加密规则如下：
			 * MD5(merNo|appId|transType|transAmt|transTime|orderNo|KEY)
			 * KEY在对接时申请发放 
			 */
			let params = {
				goldBeanNum: this.payNum,
				orderNo: orderNo
			}
			let URL = this.__WEBSERVERURL__ + '/api/shop/buyGoldBean'
			this.$http.post(URL, params).then(res => {
				console.log(res)
				if (res.body.code == 0) {
					window.location.href = `${url}?merNo=${merNo}&appId=${appId}&key=${key}&transType=${transType}&transAmt=${transAmt}&transTime=${transTime}&orderNo=${orderNo}&sign=${sign}&returnUrl=${returnUrl}`
				}
			})
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
		.wrapper
			width 100%
			position absolute
			left 0
			top 0
			right 0
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
</style>