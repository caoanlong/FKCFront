<template>
	<div class="my">
	  	<div class="profile">
	  		<div class="head">
	  			<img src="../assets/img/avatar.svg">
	  		</div>
	  	</div>
	  	<group gutter="0">
	    	<cell title="我的手机" value="13049497395"></cell>
	    	<cell title="我的金豆" value="13987" is-link :link="{name: 'getGoldBean'}"></cell>
	  	</group>
	  	<group>
	    	<cell title="我的竞猜" is-link :link="{name: 'myGuess'}"></cell>
	    	<cell title="账户明细" is-link :link="{name: 'accountDetail'}"></cell>
	  	</group>
	  	<group>
	    	<cell title="分享给好友" is-link link=""></cell>
	  	</group>
  	</div>
</template>
<script>
	import { Group,Cell } from 'vux'
	export default {
		data () {
		    return {}
		},
		created() {
	  		this.$store.commit({
	  			type: 'changeTitle',
	  			title: '我的',
	  			isCome: true,
	  			isAdd: false,
	  		})
	  	},
	  	components: {
	  		Group,
	  		Cell
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