<template>
	<div class="my">
	  	<div class="profile">
	  		<div class="head">
	  			<img src="../assets/img/avatar.svg">
	  		</div>
	  	</div>
	  	<group gutter="0">
	    	<cell title="我的手机" :value="memberInfo.mobile"></cell>
	    	<cell title="我的金豆" :value="memberInfo.goldBean" is-link :link="{name: 'getGoldBean'}"></cell>
	  	</group>
	  	<group>
	    	<cell title="我的竞猜" is-link :link="{name: 'myGuess'}"></cell>
	    	<cell title="账户明细" is-link :link="{name: 'accountDetail'}"></cell>
	  	</group>
	  	<group>
	    	<cell title="分享给好友" is-link link=""></cell>
	  	</group>
	  	<box gap="20px 10px">
	    	<x-button type="warn" @click.native="signout">退出</x-button>
	  	</box>
  	</div>
</template>
<script>
	import { Group,Cell,XButton,Box } from 'vux'
	export default {
		data () {
		    return {
		    	memberInfo: {}
		    }
		},
		created() {
	  		this.$store.commit({
	  			type: 'changeTitle',
	  			title: '我的',
	  			isCome: true,
	  			isAdd: false,
	  		})
	  		this.getMemberInfo()
	  	},
	  	methods: {
	  		getMemberInfo() {
	  			let URL = this.__WEBSERVERURL__ + '/api/member/info';
	  			this.$http.post(URL).then((res) => {
	  				if (res.body.code == 0) {
	  					this.memberInfo = res.body.data
	  					localStorage.setItem('memberInfo',JSON.stringify(res.body.data))
	  				}
	  				console.log(JSON.stringify(res.body.data));
	  			})
	  		},
	  		signout() {
	  			localStorage.clear();
	  			this.$router.push({name: 'login'})
	  		}
	  	},
	  	components: {
	  		Group,
	  		Cell,
	  		XButton,
	  		Box
	  	}
	}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
	.my
		width 100%
		position absolute
		left 0
		top 46px
		.profile
			width 100%
			height 140px
			padding-top 20px
			background-color #35495e
			.head
				width 80px
				height 80px
				border-radius 40px
				background-color #fff
				padding 1px
				margin 0 auto
				img
					display block
					width 100%
					height 100%
</style>