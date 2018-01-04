<template>
	<div class="main">
		<div class="header" v-if="!isWX"><router-link tag="div" class="back" :to="{name: 'home'}"><i></i>返回</router-link>登录</div>
		<group labelWidth="70px" :style="{'margin-top': isWX ? 0 : '44px'}">
			<x-input title="手机号" name="mobile" placeholder="请输入手机号码" keyboard="number" v-model="mobile"></x-input>
			<x-input title="验证码" class="weui-vcode" keyboard="number" v-model="verCode">
				<x-button slot="right" type="primary" mini :disabled="$v.mobile.$invalid||isGetVCode" @click.native="getCode">{{codeBtn}}</x-button>
			</x-input>
		</group>
		<box gap="15px 15px">
			<x-button type="primary" @click.native="login">登录</x-button>
		</box>
	</div>
</template>
<script>
	import { Group,XInput,XButton,Box } from 'vux'
	import { required,minLength,maxLength } from 'vuelidate/lib/validators'
	export default {
		data () {
			return {
				mobile: '',
				verCode: '',
				codeBtn: '发送验证码',
				codeNum: 60,
				isGetVCode: false
			}
		},
		validations: {
			mobile: {
				required,
				minLength: minLength(11),
				maxLength: maxLength(11),
			},
			verCode: {
				required
			},
			validationGroup: ['mobile','verCode']
		},
		computed: {
			isWX () {
				return this.isWeixin()
			}
		},
		created() {
			document.title = '登录'
		},
		methods: {
			getCode() {
				if (this.isGetVCode) return
				this.timeGo()
				
				let URL = this.__WEBSERVERURL__ + '/api/member/verCode'
				let params = {
					mobile: this.mobile
				}
				this.$http.post(URL,params).then((res) => {
					// console.log(res.body)
					if (res.body.code == 0) {
						this.$vux.toast.text('短信已发送','middle')
					}else {
						this.$vux.toast.text(res.body.msg+res.body.code,'middle')
					}
				})
			},
			login() {
				let URL = this.__WEBSERVERURL__ + '/api/member/login'
				let params = {
					mobile: this.mobile,
					verCode: this.verCode
				}
				this.$route.query.from && (params.from = this.$route.query.from)
				localStorage.getItem('from') && (params.from = localStorage.getItem('from'))
				this.$http.post(URL,params).then((res) => {
					console.log(res.body)
					this.$vux.toast.show({
						text: res.body.msg
					})
					localStorage.setItem('token',res.body.token)
					localStorage.setItem('memberInfo',JSON.stringify(res.body.data))
					this.$router.push({name: 'home'})
				})
			},
			timeGo() {
				if (this.codeNum == 0) {
					this.codeBtn = '点击获取'
					this.isGetVCode = false
					this.codeNum = 60
					return
				} else {
					this.isGetVCode = true
					this.codeBtn = this.codeNum + 's'
					this.codeNum--
					setTimeout(() => {
						this.timeGo()
					}, 1000)
				}
			}
		},
		components: {
			Group,
			XInput,
			XButton,
			Box
		}
	}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
	.main
		position absolute
		top 0
		left 0
		right 0
		bottom 0
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
</style>
