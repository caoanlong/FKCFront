<template>
	<div class="container">
		<router-view></router-view>
	</div>
</template>
<script>
	export default {
		data () {
			return {
				// 分享
				title: '91疯狂猜',
				// desc: '猜体育、经济、娱乐事件、猜猜更精彩！',
				shareLink: location.href
			}
		},
		computed: {
			desc() {
				if (this.$route.meta.desc) {
					return this.$route.meta.desc
				} else {
					return '猜体育、经济、娱乐事件、猜猜更精彩！'
				}
			}
		},
		watch: {
			$route () {
				this.weixinShare()
			}
		},
		created () {
			if (location.hash.includes('from')) {
				localStorage.setItem('from', location.hash.split('from=')[1])
			}
			if (this.isWeixin()) {
				let openid = localStorage.getItem('openid')
				if (!openid) {
					let code = this.getQueryString('code')
					if (code) {
						this.getWxUserInfo()
					} else {
						window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxe0fd26ab323ce46d&redirect_uri=${window.location.href}&response_type=code&scope=snsapi_base&state=index#wechat_redirect`
					}
				}
			}
		},
		mounted () {
			this.weixinShare()
		},
		methods: {
			getWxUserInfo () {
				let params = {
					code: this.getQueryString('code')
				}
				let URL = this.__WEBSERVERURL__ + '/weixin/getOpenIDNew'
				this.$http.get(URL, {params: params}).then(res => {
					let openid = res.body.data
					if (openid) {
						localStorage.setItem('openid', openid)
					}
				})
			},
			weixinShare () {
				// 微信分享
				this.getWeixinConfig(location.href, () => {
					// 朋友圈分享
					wx.onMenuShareTimeline({
						title: this.title + '，' + this.desc, // 分享标题
						desc: this.desc, // 分享描述
						link: location.href, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
						imgUrl: this.__WEBIMGSERVERURL__ + '/file-1513780566518.jpeg', // 分享图标
						success: function () {
						// 用户确认分享后执行的回调函数
						},
						cancel: function () {
						// 用户取消分享后执行的回调函数
						}
					})
					// 转发给朋友
					wx.onMenuShareAppMessage({
						title: this.title, // 分享标题
						desc: this.desc, // 分享描述
						link: location.href, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
						imgUrl: this.__WEBIMGSERVERURL__ + '/file-1513780566518.jpeg', // 分享图标
						type: '', // 分享类型,music、video或link，不填默认为link
						dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
						success: function () {
						// 用户确认分享后执行的回调函数
						},
						cancel: function () {
						// 用户取消分享后执行的回调函数
						}
					})
					// 分享到QQ
					wx.onMenuShareQQ({
						title: this.title, // 分享标题
						desc: this.desc, // 分享描述
						link: location.origin, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
						imgUrl: this.__WEBIMGSERVERURL__ + '/file-1513780566518.jpeg', // 分享图标
						success: function () {
						// 用户确认分享后执行的回调函数
						},
						cancel: function () {
						// 用户取消分享后执行的回调函数
						}
					})
				}, true)
			}
		}
	}
</script>

<style lang="less">
	@import '~vux/src/styles/reset.less';
	@import '~vux/src/styles/1px.less';
	@import '~vux/src/styles/close';
	.container {
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
	}	
	.header {
		width: 100%;
		position: fixed !important;
		left: 0;
		top: 0;
		z-index: 100;
	}	
</style>
