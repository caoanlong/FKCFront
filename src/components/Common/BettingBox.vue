<template>
	<div class="bettingBox" v-show="isShow">
		<div class="mine">
			<div class="mineBean">
				<p>我的金豆</p>
				<p>16784</p>
			</div>
			<div class="add">
				<img class="icon" src="../../assets/img/add.svg"/>
			</div>
		</div>		    		
		<div class="size">
			<div class="option" :class="{'active': selected == opt}" v-for="opt in option" v-text="opt.value" @click="selectSize(opt)"></div>
		</div>		    		
		<button class="bettingBtn" :class="{'disabled': !selected}" :disabled="!selected" @click="betting()">投注</button>
	</div>
</template>
<script>
	import {Alert} from 'vux'
	export default {
		props: {
			isShow: {
				type: Boolean,
				default: false
			}
		},
		data () {
		    return {
		    	option: [{
		    		key: '100',
		    		value: 100
		    	},{
		    		key: '500',
		    		value: 500
		    	},{
		    		key: '1000',
		    		value: 1000
		    	},],
		    	selected: null,
		    }
		},
		methods: {
			selectSize(option) {
				this.selected = option;
				this.$emit('select',option);
			},
			betting() {
				this.$vux.alert.show({
			        title: '恭喜',
			        content: '投注成功',
			        onShow () {
			          	console.log('Plugin: I\'m showing')
			        },
			        onHide () {
			          	console.log('Plugin: I\'m hiding now')
			        }
		      	})
			}
		},
		components:{
			Alert
		}
	}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
	.bettingBox
		display flex
		width 100%
		height 60px
		.mine
			flex 0 0 92px
			display flex
			.mineBean
				flex 1
				font-size 14px
				color #999
				p
					height 30px
					line-height 30px
			.add
				flex 0 0 28px
				.icon
					display block
					width 22px
					height 22px
					margin-top 5px
		.size
			flex 1
			display flex
			padding 5px
			padding-left 0
			.option
				flex 1
				margin 5px
				line-height 230%
				border-radius 5px
				text-align center
				border 1px solid #ddd
				color #999
			.active
				color #ff9928
				border 1px solid #ff9928
				font-weight bold		
		.bettingBtn
			border none
			font-size 16px
			flex 0 0 80px
			height 40px
			line-height 40px
			margin-top 10px
			margin-left 5px
			background-color #E64340
			border-radius 20px
			color #fff
			text-align center
		.disabled
			background-color #999
</style>