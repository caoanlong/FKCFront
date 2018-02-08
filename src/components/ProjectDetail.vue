<template>
	<div class="main">
		<div class="header"><div tag="div" class="back" @click="back"><i></i>返回</div>项目详情</div>
		<div class="block"></div>
		<div class="project vux-1px-b">
			<div class="mask">
				<span class="time">截止时间：{{projectDetail.endTime|getdatefromtimestamp}}</span>
			</div>
			<img class="main-img" :src="__WEBIMGSERVERURL__ + projectDetail.imgUrl" v-if="projectDetail.imgUrl">
			<img class="main-img" src="../../static/images/default.png" v-else>
			<div class="content">
				<p class="title" v-text="projectDetail.name"></p>
				<div class="options">
					<Options 
						v-for="(option,i) in projectDetail.options" 
						:data="option" 
						:index="i" 
						:selected="selectedOption" 
						:key="option.content" 
						@selectOption="selectOption">
					</Options>
				</div>
			</div>
		</div>
		<BettingBox 
			class="betting-box vux-1px-t"
			:projectId="projectDetail._id.toString()" 
			:selectOpt="selectedOption" 
			:isShow="projectDetail.options && projectDetail.options.includes(selectedOption)" @select="selectNum">
		</BettingBox>
	</div>
</template>
<script type="text/javascript">
	import Options from './Common/Option'
	import BettingBox from './Common/BettingBox'
	export default {
		data() {
			return {
				projectDetail: {
					_id: ''
				},
				selectedOption: {},
				selectedNum: ''
			}
		},
		created() {
			this.getProjectDetail()
		},
		methods: {
			getProjectDetail() {
				let URL = this.__WEBSERVERURL__ + '/api/project/detail'
				let params = {
					id: this.$route.query.id
				}
				this.$http.get(URL,{params: params}).then((res) => {
					this.projectDetail = res.body.data
					this.selectedOption = res.body.data.options[0]
					this.$route.meta.desc = this.projectDetail.name
				})
			},
			selectOption (data) {
				console.log(data)
				this.selectedOption = data
			},
			selectNum (data) {
				this.selectedNum = data.content
			},
			back () {
				if (this.$route.query.title) {
					this.$router.push({name: 'project', query: {title: this.$route.query.title}})
				} else {
					this.$router.push({name: 'project'})
				}
			}
		},
		components: {
			Options,
			BettingBox,
		}
	}
</script>
<style lang="stylus">
	.main
		overflow hidden
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
		.project
			position relative
			margin-top 44px
			width 100%
			.mask
				position absolute
				top 0
				left 0
				width 100%
				height 50px
				line-height 50px
				z-index 10
				background linear-gradient( top,rgba(0,0,0,.7),rgba(0,0,0,0))
				.time
					color #fff
					font-size 14px
					padding 5px 20px 5px 10px
					border-top-right-radius 15px
					border-bottom-right-radius 15px
					background-color rgba(255,255,255,.2)
					border-left 0
			.main-img
				display block
				width 100%
				height 180px
			.content
				width auto
				padding 5px 15px
				background-color #fff
				.title
					font-size 17px
					line-height 160%
		.betting-box
			width 100%
			padding 0 15px
			background-color #fff
			position fixed
			left 0
			bottom 0
</style>