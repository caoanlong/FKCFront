<template>
  	<div class="main">
  		<group labelWidth="70px">
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
	  	created() {
	  		document.title = '登录'
	  	},
	  	methods: {
	  		getCode() {
	  			if (this.isGetVCode) return;
	  			this.timeGo();
	  			
	  			let URL = this.__WEBSERVERURL__ + '/api/member/verCode';
	  			let params = {
	  				mobile: this.mobile
	  			};
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
	  			let URL = this.__WEBSERVERURL__ + '/api/member/login';
	  			let params = {
	  				memberName: this.memberName,
	  				mobile: this.mobile,
	  				verCode: this.verCode,
	  			};
	  			var that = this;
	  			this.$http.post(URL,params).then((res) => {
	  				console.log(res.body);
	  				this.$vux.toast.show({
	  					text: res.body.msg
	  				})
	  				localStorage.setItem('token',res.body.token)
	  				localStorage.setItem('memberInfo',JSON.stringify(res.body.data))
	  				setTimeout(function() {
	  					that.$router.push({name: 'home'});
	  				},500)
	  			});
	  		},
	  		timeGo() {
				if (this.codeNum == 0) {
					this.codeBtn = '点击获取';
					this.isGetVCode = false;
					this.codeNum = 60;
					return;
				} else {
					var that = this;
					this.isGetVCode = true;
					this.codeBtn = this.codeNum + 's';
					this.codeNum--;
					setTimeout(function() {
						that.timeGo();
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
</style>
