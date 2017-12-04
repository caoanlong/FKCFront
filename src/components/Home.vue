<template>
	<div class="main">
		<div class="selectWarpper">
		  	<tab bar-active-color="#668599" :line-width="0">
				<tab-item style="width: 25%" selected @click.native="searchByCondition(null)">全部</tab-item>
				<tab-item style="width: 25%" v-for="type in typeList" :key="type._id" @click.native="searchByCondition(type._id)">{{type.name}}</tab-item>
		  	</tab>
		</div>
		<div class="block"></div>
		<div class="wrapper" ref="projectWrapper">
			<div ref="projectIn">
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
		<Tabbar></Tabbar>
	</div>
</template>
<script>
	import Tabbar from './Common/Tabbar'
	import Options from './Common/Option'
	import BettingBox from './Common/BettingBox'
	import pullUpLoad from './Common/pullUpLoad'
	import {Tab, TabItem} from 'vux'
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
				typeList: [],
				projectType: ''
			}
		},
		created() {
			document.title = '疯狂猜'
			this.getMemberInfo()
			this.getProjectType()
			this.getProjectList()
			window.addEventListener('scroll', (e) => {
				this.scrollTop = document.documentElement.scrollTop || document.body.scrollTop
				this.clientHeight = document.documentElement.clientHeight || document.body.clientHeight
				this.pageHeight = this.$refs.projectIn.offsetHeight
				this.disY = this.pageHeight - this.clientHeight + 44
				console.log(this.scrollTop, this.clientHeight, this.pageHeight, this.disY)
				if (this.scrollTop > this.disY) {
					if (this.pageIndex < this.pages) {
						this.loadStatus = '正在加载...'
						this.pageIndex++
						this.getProjectList()
					} else {
						this.loadStatus = '~已经到底了~'
					}
				}
			})
		},
		methods: {
			getProjectType () {
				let URL = this.__WEBSERVERURL__ + '/api/project/type'
				this.$http.get(URL).then(res => {
					this.typeList = res.body.data
				})
			},
			getProjectList () {
				let URL = this.__WEBSERVERURL__ + '/api/project'
				let params = {
					projectType: this.projectType,
					pageIndex: this.pageIndex

				}
				this.$http.get(URL,{params: params}).then((res) => {
					// console.log(JSON.stringify(res.body.data))
					this.pages = res.body.data.pages
					this.list = this.list.concat(res.body.data.projectList)
				})
			},
			searchByCondition (id) {
				if (id) {
					this.projectType = id
				} else {
					this.projectType = ''
				}
				this.list = []
				this.pageIndex = 1
				this.getProjectList()
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
			Tabbar,
			Options,
			BettingBox,
			pullUpLoad,
			Tab,
			TabItem
		}
	}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
	.main
		overflow hidden
		.selectWarpper
			position fixed
			left 0
			top 0
			z-index 99
			width 100%
			background-color #fff
			overflow scroll
			-webkit-overflow-scrolling touch
		.wrapper
			width 100%
			position absolute
			left 0
			top 44px
			right 0
			bottom 46px
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
