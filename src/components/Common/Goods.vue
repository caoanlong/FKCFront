<template>
	<div class="goodsWrapper">
		<div class="goods">
			<img ref="goodsImg" class="goodsImg" :style="{'height': goodsImgWidth + 'px'}" :src="goods.prizeImg" v-if="goods.prizeImg">
			<img ref="goodsImg" class="goodsImg" :style="{'height': goodsImgWidth + 'px'}" src="../../../static/images/default.png" v-else>
			<p class="goodsTitle">{{goods.prizeName}}</p>
			<p class="goodsPrice">参考价：{{goods.prizeRefPrice}}元</p>
			<p class="goodsGoldPrice">{{goods.prizeGoldBeanPrice}}金豆</p>
		</div>
	</div>
</template>
<script type="text/javascript">
	export default {
		props: {
			goods: Object
		},
		data () {
			return {
				goodsImgWidth: ''
			}
		},
		mounted () {
			this.goodsImgWidth = this.$refs.goodsImg.offsetWidth
		}
	}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
	.goodsWrapper
		float left
		padding 5px
		width 50%
		.goods
			background-color #fff
			padding 10px
			.goodsImg
				display block
				width 100%
			.goodsTitle
				padding-top 10px
				color #666
				font-size 13px
				height 52px
				display -webkit-box
				-webkit-box-orient vertical
				-webkit-line-clamp 2
				overflow hidden
			.goodsPrice
				color #999
				font-size 12px
			.goodsGoldPrice
				font-weight 400
				color #ff6900
</style>