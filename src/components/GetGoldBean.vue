<template>
	<div class="mygoldbean">
	  <group gutter="0">
		<cell title="我的金豆" :value="memberInfo.goldBean"></cell>
	  </group>
	  <group title="金豆列表">
		<cell :title="item.num+'金豆'" v-for="(item,i) in list" :key="i">
		  <img slot="icon" width="20" style="display:block;margin-right:5px;" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC4AAAAuCAMAAABgZ9sFAAAAVFBMVEXx8fHMzMzr6+vn5+fv7+/t7e3d3d2+vr7W1tbHx8eysrKdnZ3p6enk5OTR0dG7u7u3t7ejo6PY2Njh4eHf39/T09PExMSvr6+goKCqqqqnp6e4uLgcLY/OAAAAnklEQVRIx+3RSRLDIAxE0QYhAbGZPNu5/z0zrXHiqiz5W72FqhqtVuuXAl3iOV7iPV/iSsAqZa9BS7YOmMXnNNX4TWGxRMn3R6SxRNgy0bzXOW8EBO8SAClsPdB3psqlvG+Lw7ONXg/pTld52BjgSSkA3PV2OOemjIDcZQWgVvONw60q7sIpR38EnHPSMDQ4MjDjLPozhAkGrVbr/z0ANjAF4AcbXmYAAAAASUVORK5CYII=">
		  <div slot="default">
			<x-button type="primary" @click.native="buyGoldBean(item.num)">&nbsp;获取&nbsp;</x-button>
		  </div>
		</cell>
	  </group>
	</div>
</template>
<script>
  import { Group,Cell,XButton } from 'vux'
  import md5 from 'md5'
  export default {
	data () {
		return {
			pageIndex: 1,
			list: []
		}
	},
	computed: {
		memberInfo() {
			return JSON.parse(localStorage.getItem('memberInfo'))
		}
	},
	created() {
		this.$store.commit({
			type: 'changeTitle',
			title: '获取金豆',
			isCome: true,
			isAdd: false
		})
		this.getGoldBeanList()
	},
	methods: {
		getGoldBeanList() {
			let URL = this.__WEBSERVERURL__ + '/api/shop/goldBeanType'
			this.$http.get(URL).then(res => {
				console.log(JSON.stringify(res.body))
				this.list = res.body.data.goldBeanTypeList
			})
		},
		buyGoldBean(goldBeanNum) {
			// let params = {
			// 	goldBeanNum: goldBeanNum
			// }
			// 支付对接参数
			let URL = 'http://pay.e-mac.com.cn/pay/v1/order'
			let merNo = '10034'
			let appId = '26'
			let key = 'b9a597302b91b312e86e1efa2b40c6bf'
			let transType = '2' // 支付方式
			let transAmt = goldBeanNum // 支付金额
			let transTime = this.getTimeNum() // 支付时间(yyyyMMddHHmmss)
			let orderNo = this.getTimeNum() + this.getVerCode(8) // 订单号，不可重复
			let returnUrl = encodeURIComponent('http://m.91fkc.com/#/success') // 公众号返回页面，可不填，不参与加密（以http://开头）
			let showQR = 0 // 0:返回链接1:直接显示二维码(扫码接口有效，默认为0，不参与加密)
			let sign = md5(merNo+'|'+appId+'|'+transType+'|'+transAmt+'|'+transTime+'|'+orderNo+'|'+key)
			/* 加密信息，加密规则如下：
			 * MD5(merNo|appId|transType|transAmt|transTime|orderNo|KEY)
			 * KEY在对接时申请发放 
			 */
			window.location.href = `http://pay.e-mac.com.cn/pay/v1/order?merNo=${merNo}&appId=${appId}&key=${key}&transType=${transType}&transAmt=${transAmt}&transTime=${transTime}&orderNo=${orderNo}&sign=${sign}&returnUrl=${returnUrl}`
		}
	},
	components: {
	  Group,
	  Cell,
	  XButton
	}
  }
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
	.mygoldbean
		width 100%
		position absolute
		left 0
		top 46px
</style>