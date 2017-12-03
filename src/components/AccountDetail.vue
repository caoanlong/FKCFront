<template>
	<div class="account">
		<div class="block"></div>
		<div class="wrapper">
			<group>
				<cell v-for="(item,i) in accountDetails" :key="i">
					<div slot="title">
						<p class="eclipsis" :style="{width: winWidth}">{{item.type}}<span style="color:#666;font-size:16px">({{item.info}})</span></p>
						<p style="font-size: 14px;color: #999">{{item.addTime}}</p>
					</div>
					<div slot="default">
						<span>{{item.goldBeanChange}}</span>
					</div>
				</cell>
			</group>
		</div>
	</div>
</template>
<script>
import { Group,Cell } from 'vux'
export default {
		data () {
			return {
				accountDetails: []
			}
		},
		computed: {
			winWidth() {
				return (window.screen.width-90) + 'px'
			}
		},
		created() {
			document.title = '账户明细'
			this.getAccountDetail()
		},
		methods: {
			getAccountDetail() {
				let URL = this.__WEBSERVERURL__ + '/api/member/accountDetails';
	  			this.$http.post(URL).then((res) => {
	  				if (res.body.code == 0) {
	  					this.accountDetails = res.body.data
	  				}
	  				console.log(JSON.stringify(res.body.data));
	  			})
			}
		},
		components: {
			Group,
			Cell
		}
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
	.account
		overflow hidden
		.wrapper
			width 100%
			position absolute
			left 0
			top -20px
			right 0
</style>