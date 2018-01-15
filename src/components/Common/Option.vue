<template>
  	<div class="item" :class="{'active': selected == data}" @click="changeOption(data)">
		<span class="tag" v-if="index == 0">A</span>
		<span class="tag" v-else-if="index == 1">B</span>
		<span class="tag" v-else-if="index == 2">C</span>
		<span class="tag" v-else-if="index == 3">D</span>
		<span class="tag" v-else-if="index == 4">E</span>
		<span class="tag" v-else-if="index == 5">F</span>
		<span class="tag" v-else-if="index == 6">G</span>
		<span class="tag" v-else-if="index == 7">H</span>
		<span class="tag" v-else-if="index == 8">I</span>
		<span class="tag" v-else-if="index == 9">J</span>
		<span class="tx" v-text="data.content"></span>
		<span class="odds">赔率{{data.odds}}</span>
	</div>
</template>
<script>
export default {
	props: {
		data: {
			type: Object
		},
		index: {
			type: Number
		},
		selected: {
			type: Object
		}
	},
	methods: {
		changeOption(data) {
			this.$emit('selectOption',data);
		}
	}
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
	.item
		width 100%
		height 36px
		line-height 34px
		border-radius 18px
		margin 10px auto
		border 1px solid #1AAD19
		position relative
		padding-left 36px
		padding-right 90px
		color #1AAD19
		background-color #fff
		.tag
			position absolute
			top 5px
			left 5px
			width 24px
			height 24px
			line-height 24px
			text-align center
			color #fff
			border-radius 12px
			background-color #1AAD19
		.odds
			display block
			position absolute
			right 0
			top 0
			width 90px
			height 34px
			text-align right
			padding-right 15px
			font-size 14px
	.active
		background-color #1AAD19
		color #fff
		.tag
			background-color #fff
			color #1AAD19
</style>