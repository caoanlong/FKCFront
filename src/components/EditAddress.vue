<template>
	<div class="editAddress">
		<div class="header" v-if="!isWX"><div tag="div" class="back" @click="back"><i></i>返回</div>修改地址</div>
		<group :style="{'margin-top': isWX ? 0 : '44px'}">
			<x-input title="收货人" text-align="right" v-model="consignee"></x-input>
			<x-input title="联系电话" text-align="right" keyboard="number" v-model="mobile"></x-input>
			<x-address title="所在地区" :list="addressData" v-model="area"></x-address>
			<x-textarea :max="50" placeholder="请填写详细地址，不少于5个字" v-model="detailedAddress"></x-textarea>
		</group>
		<group>
			<x-switch title="设为默认" v-model="isSetDefault"></x-switch>
		</group>
		<box gap="20px 10px">
			<x-button type="primary" @click.native="editAddress">保存</x-button>
		</box>
	</div>
</template>
<script type="text/javascript">
	import { Group,XInput,XTextarea,XAddress,XSwitch,XButton,Box,ChinaAddressV4Data,Value2nameFilter as value2name } from 'vux'
	export default {
		data () {
			return {
				addressData: ChinaAddressV4Data,
				consignee: '',
				mobile: '',
				area: [],
				detailedAddress: '',
				isSetDefault: false
			}
		},
		computed: {
			isWX () {
				return this.isWeixin()
			}
		},
		created () {
			document.title = '修改地址'
			this.getAddressDetail()
		},
		methods: {
			getAddressDetail () {
				let URL = this.__WEBSERVERURL__ + '/api/member/address/detail'
				let params = {
					addressId: this.$route.query.id,
				}
				this.$http.get(URL, {params: params}).then(res => {
					let addressDetail = res.body.data
					this.consignee = addressDetail.consignee
					this.mobile = addressDetail.mobile
					this.area = addressDetail.area.split(' ')
					this.detailedAddress = addressDetail.detailedAddress
					this.isSetDefault = JSON.parse(localStorage.getItem('memberInfo')).defaultAddress == addressDetail._id
				})
			},
			editAddress () {
				if (this.consignee == '') {
					this.$vux.toast.text('收货人不能为空','middle')
					return
				} else if (this.mobile == '') {
					this.$vux.toast.text('手机号码不能为空','middle')
					return
				} else if (this.area.length == 0) {
					this.$vux.toast.text('所在地区不能为空','middle')
					return
				} else if (this.detailedAddress == '') {
					this.$vux.toast.text('详细地址不能为空','middle')
					return
				}
				let URL = this.__WEBSERVERURL__ + '/api/member/address/update'
				let params = {
					addressId: this.$route.query.id,
					consignee: this.consignee,
					mobile: this.mobile,
					area: value2name(this.area, ChinaAddressV4Data),
					detailedAddress: this.detailedAddress,
					isSetDefault: this.isSetDefault
				}
				console.log(JSON.stringify(params))
				this.$http.post(URL, params).then((res) => {
					if (res.body.code == 0) {
						this.getMemberInfo(() => {
							this.$vux.toast.show({
			  					text: res.body.msg
			  				})
			  				this.$router.push({name: 'myAddress'})
						})
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
		},
		components: {
			Box,
			XInput,
			Group,
			XAddress,
			XTextarea,
			XSwitch,
			XButton
		}
	}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
	.editAddress
		width 100%
		.header
			position fixed
			left 0
			top 0
			width 100%
			height 44px
			line-height 44px
			text-align center
			color #fff
			background-color #35495e
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
</style>