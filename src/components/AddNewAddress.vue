<template>
	<div class="addAddress">
		<group>
			<x-input title="收货人" text-align="right" v-model="consignee"></x-input>
			<x-input title="联系电话" text-align="right" keyboard="number" v-model="mobile"></x-input>
			<x-address title="所在地区" :list="addressData" v-model="area"></x-address>
			<x-textarea :max="50" placeholder="请填写详细地址，不少于5个字" v-model="detailedAddress"></x-textarea>
		</group>
		<!-- <group>
			<x-switch title="设为默认" v-model="isSetDefault"></x-switch>
		</group> -->
		<box gap="20px 10px">
			<x-button type="primary" @click.native="addAddress">保存</x-button>
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
				// isSetDefault: false
			}
		},
		created () {
			document.title = '添加新地址'
		},
		methods: {
			addAddress () {
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
				let URL = this.__WEBSERVERURL__ + '/api/member/address/add'
				let params = {
					consignee: this.consignee,
					mobile: this.mobile,
					area: value2name(this.area, ChinaAddressV4Data),
					detailedAddress: this.detailedAddress,
					// isSetDefault: this.isSetDefault
				}
				console.log(JSON.stringify(params))
				this.$http.post(URL, params).then((res) => {
					this.$vux.toast.show({
	  					text: res.body.msg
	  				})
					if (res.body.code == 0) {
						this.$router.replace({name: 'myAddress'})
					}
				})
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
	.addAddress
		width 100%
</style>