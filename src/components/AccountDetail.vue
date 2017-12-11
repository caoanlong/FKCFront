<template>
	<div class="account">
		<div class="block"></div>
		<div class="wrapper">
			<div ref="wrapperIn">
				<group>
					<cell v-for="(item,i) in accountDetails" :key="i">
						<div slot="title">
							<p class="eclipsis" :style="{width: winWidth}">{{item.type}}<span style="color:#666;font-size:16px">({{item.info}})</span></p>
							<p style="font-size: 14px;color: #999">{{item.addTime|getdatefromtimestamp}}</p>
						</div>
						<div slot="default">
							<span>{{item.goldBeanChange}}</span>
						</div>
					</cell>
				</group>
				<pullUpLoad :loadStatus="loadStatus"></pullUpLoad>
			</div>
		</div>
	</div>
</template>
<script>
import { Group,Cell } from 'vux'
import pullUpLoad from './Common/pullUpLoad'
export default {
		data () {
			return {
				loadStatus: '正在加载...',
				accountDetails: [],
				pageIndex: 1,
				pages: 1
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
			window.addEventListener('scroll', (e) => {
				this.scrollTop = document.documentElement.scrollTop || document.body.scrollTop
				this.clientHeight = document.documentElement.clientHeight || document.body.clientHeight
				this.pageHeight = this.$refs.wrapperIn.offsetHeight
				this.disY = this.pageHeight - this.clientHeight + 10
				// console.log(this.scrollTop, this.clientHeight, this.pageHeight, this.disY)
				if (this.scrollTop == this.disY) {
					if (this.pageIndex < this.pages) {
						this.loadStatus = '正在加载...'
						this.pageIndex++
						this.getAccountDetail()
					} else {
						this.loadStatus = '~已经到底了~'
					}
				}
			})
		},
		methods: {
			getAccountDetail() {
				let URL = this.__WEBSERVERURL__ + '/api/member/accountDetails'
				let params = {
					pageIndex: this.pageIndex
				}
				this.$http.get(URL, {params: params}).then((res) => {
					if (res.body.code == 0) {
						this.pages = res.body.data.pages
						this.accountDetails = this.accountDetails.concat(res.body.data.accountDetail)
						if (res.body.data.accountDetail.length < res.body.data.pageSize) {
							this.loadStatus = '~已经到底了~'
						}
						if (this.accountDetails.length == 0) {
							this.loadStatus = '~没有结果~'
						}
					}
				})
			}
		},
		components: {
			Group,
			Cell,
			pullUpLoad
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