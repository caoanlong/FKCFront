<template>
	<transition name="slideDown">
		<div class="selectWarpper" v-show="showSelector">
			<ul class="clearfix">
				<li @click.stop="selectAll">
					<div :class="{'active': selectTypeId.length == 0}">全部</div>
				</li>
				<li v-for="type in typeList" :key="type._id" @click.stop="selectType(type._id)">
					<div :class="{'active': selectTypeId.includes(type._id)}">{{type.name}}</div>
				</li>
			</ul>
			<button @click.stop="sureSelect">确定</button>
		</div>
	</transition>
</template>
<script type="text/javascript">
	export default {
		props: {
			showSelector: {
				type: Boolean
			}
		},
		data () {
			return {
				typeList: [],
				selectTypeId: []
			}
		},
		created () {
			this.getProjectType()
		},
		methods: {
			getProjectType () {
				let URL = this.__WEBSERVERURL__ + '/api/project/type'
				this.$http.get(URL).then(res => {
					this.typeList = res.body.data
				})
			},
			selectType (id) {
				if (this.selectTypeId.includes(id)) {
					this.selectTypeId.splice(this.selectTypeId.indexOf(id), 1)
					return
				}
				this.selectTypeId.push(id)
			},
			selectAll () {
				this.selectTypeId = []
			},
			sureSelect () {
				this.showSelector = false
			}
		}
	}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
	.slideDown-enter-active
		 transition all .5s ease
		 top 46px
		 overflow hidden
	.slideDown-leave-active
		 transition all .5s ease
		 top -154px
		 overflow hidden
	.slideDown-enter
	.slideDown-leave
		 top -154px
	.selectWarpper
		position fixed
		left 0
		top 46px
		z-index 99
		width 100%
		background-color #fff
		box-shadow 0 5px 10px rgba(0, 0, 0, .3)
		padding 8px
		ul
			display block
			list-style none
			li
				float left
				width 25%
				div
					text-align center
					height 40px
					line-height 40px
					background-color #eee
					border-radius 5px
					margin 5px
					&.active
						color #fff
						background-color #1aad19
		button
			display block
			border none
			font-size 16px
			width 90%
			height 40px
			line-height 40px
			margin 20px auto 20px auto
			background-color #E64340
			border-radius 20px
			color #fff
			text-align center
</style>