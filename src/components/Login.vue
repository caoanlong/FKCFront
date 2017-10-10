<template>
  	<div class="main">
  		<group>
	      	<x-input title="手机号" name="mobile" placeholder="请输入手机号码" keyboard="number"></x-input>
	      	<x-input title="验证码" class="weui-vcode">
	        	<x-button slot="right" type="primary" mini>发送验证码</x-button>
	      	</x-input>
	    </group>
	    <box gap="15px 15px">
	    	<x-button type="primary" @click.native="login">登录</x-button>
	    </box>
  	</div>
</template>
<script>
	import { Group,XInput,XButton,Box } from 'vux'
	export default {
	  	data () {
	    	return {
	    	}
	  	},
	  	created() {
	  		this.$store.commit({
	  			type: 'changeTitle',
	  			title: '登录',
	  			isCome: true,
	  			isAdd: false,
	  		})
	  	},
	  	methods: {
	  		login() {
	  			this.$router.push({name: 'home'});
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
		top 46px
		left 0
		right 0
		bottom 0px
</style>
