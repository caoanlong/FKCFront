<template>
	<div class="main">
		<TypeSelector :showSelector="showSelector" @close="sureSelect"></TypeSelector>
		<div class="block"></div>
		<div class="wrapper" ref="projectWrapper">
			<div class="list vux-1px-b" v-for="item in list" :key="item._id">
				<div class="mask">
					<span class="time">截止时间：{{item.endTime|getdatefromtimestamp}}</span>
				</div>
				<img class="main-img" :src="item.imgUrl" v-if="item.imgUrl">
				<img class="main-img" src="../../static/images/default.png" v-else>
				<div class="content">
					<p class="title" v-text="item.name"></p>
					<div class="options">
						<Options v-for="(option,i) in item.options" :data="option" :index="i" :selected="selectedOption" :key="option.content" @selectOption="selectOption"></Options>
					</div>
					<BettingBox :projectId="item._id.toString()" :selectOpt="selectedOption" :isShow="item.options.indexOf(selectedOption)>-1" @select="selectNum"></BettingBox>
				</div>
			</div>
			<pullUpLoad :loadStatus="loadStatus"></pullUpLoad>
		</div>
	</div>
</template>
<script>
	import Options from './Common/Option'
	import BettingBox from './Common/BettingBox'
	import pullUpLoad from './Common/pullUpLoad'
	import TypeSelector from './Common/TypeSelector'
	export default {
		props: {
			showSelector: {
				type: Boolean
			}
		},
		data () {
			return {
				loadStatus: '正在加载...',
				list: [],
				pageIndex: 1,
				pages: 1,
				memberInfo: {},
				selectedOption: {},
				selectedNum: '',
			}
		},
		created() {
			this.$store.commit({
				type: 'changeTitle',
				title: '疯狂猜',
				isCome: false,
				isAdd: true,
			  })
			this.getMemberInfo()
			this.getProjectList()
			window.addEventListener('scroll', (e) => {
				this.scrollTop = document.documentElement.scrollTop || document.body.scrollTop
				this.clientHeight = document.documentElement.clientHeight || document.body.clientHeight
				this.pageHeight = this.$refs.projectWrapper.offsetHeight
				this.disY = this.pageHeight - this.clientHeight + 46
				// console.log(this.scrollTop, e)
				if (this.scrollTop > this.disY) {
					if (this.pageIndex <= this.pages) {
						this.loadStatus = '正在加载...'
						this.getProjectList()
					} else {
						this.loadStatus = '~已经到底了~'
					}
				}
			})
		},
		methods: {
			getProjectList () {
				let URL = this.__WEBSERVERURL__ + '/api/project'
				let params = {
					pageIndex: this.pageIndex
				}
				this.pageIndex++
				this.$http.get(URL,{params: params}).then((res) => {
					console.log(JSON.stringify(res.body))
					this.pages = res.body.data.pages
					this.list = this.list.concat(res.body.data.projectList)
				})
			},
			getMemberInfo () {
				let URL = this.__WEBSERVERURL__ + '/api/member/info';
				this.$http.post(URL).then((res) => {
					if (res.body.code == 0) {
						console.log(JSON.stringify(res.body.data))
						this.memberInfo = res.body.data;
						this.$store.commit({
							type: 'getMemberInfo',
							memberInfo: res.body.data
						})
					} else {
						  this.$router.push({name: 'login'})
					}
				})
			},
			selectOption (data) {
				console.log(JSON.stringify(data));
				this.selectedOption = data;
			},
			selectNum (data) {
				console.log(JSON.stringify(data));
				this.selectedNum = data.content;
			},
			sureSelect () {
				this.$emit('close')
			}
		},
		components: {
			Options,
			BettingBox,
			pullUpLoad,
			TypeSelector
		}
	}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
	.main
		padding-top 46px
		overflow hidden
		.wrapper
			width 100%
			position absolute
			left 0
			top 46px
			right 0
			.list
				position relative
				margin-bottom 10px
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
						// border 1px solid rgba(255,255,255,.5)
						border-left 0
				.main-img
					display block
					width 100%
					height 180px
				.content
					width 100%
					padding 5px 15px
					background-color #fff
					.title
						font-size 17px
						line-height 160%
</style>
