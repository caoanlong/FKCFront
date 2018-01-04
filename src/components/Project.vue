<template>
	<div class="main">
		<div class="header">疯狂猜<div class="freeSign" @click="freeSign"></div></div>
		<div class="selectWarpper vux-1px-b" :style="{'top': isWX ? '0px' : '44px'}">
			<div class="tab">
				<tab bar-active-color="#668599" :line-width="0">
					<tab-item style="width: 25%" selected @click.native="searchByCondition(null)">全部</tab-item>
					<tab-item style="width: 25%" v-for="type in typeList" :key="type._id" @click.native="searchByCondition(type._id)">{{type.name}}</tab-item>
			  	</tab>
			  	<div class="shadow"></div>
			</div>
		  	<div class="freeSign" @click="freeSign" v-if="isWX"></div>
		</div>
		<div class="block"></div>
		<div class="wrapper" ref="projectWrapper" :style="{'top': isWX ? '44px' : '88px'}">
			<div ref="projectIn">
				<div class="list vux-1px-b" v-for="item in list" :key="item._id">
					<div class="mask">
						<span class="time">截止时间：{{item.endTime|getdatefromtimestamp}}</span>
					</div>
					<img class="main-img" :src="__WEBIMGSERVERURL__ + item.imgUrl" v-if="item.imgUrl">
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
	</div>
</template>
<script>
	import Options from './Common/Option'
	import BettingBox from './Common/BettingBox'
	import pullUpLoad from './Common/pullUpLoad'
	import {Tab, TabItem, XButton} from 'vux'
	export default {
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
				projectType: '',

				showFreeSign: false,
				freeReceive: {
					'Monday': {},
					'Tuesday': {},
					'Wednesday': {},
					'Thursday': {},
					'Friday': {},
					'Saturday': {},
					'Sunday': {}
				},
				weekend: [
					'Sunday',
					'Monday',
					'Tuesday',
					'Wednesday',
					'Thursday',
					'Friday',
					'Saturday'
				],
				isSign: false
			}
		},
		computed: {
			today () {
				return new Date().getDay()
			},
			isWX () {
				return this.isWeixin()
			}
		},
		created() {
			document.title = '疯狂猜'
			if (this.$route.query.from) {
				localStorage.setItem('from', this.$route.query.from)
			}
			
			if ((new Date().getTime() - Number(localStorage.getItem('typeListLastModify'))) > 3600000 * 72 || localStorage.getItem('typeList') == 'undefined') {
				this.getProjectType()
			} else {
				this.typeList = JSON.parse(localStorage.getItem('typeList'))
			}
			// this.getProjectType()
			this.getProjectList()
			window.addEventListener('scroll', (e) => {
				this.scrollTop = document.documentElement.scrollTop || document.body.scrollTop
				this.clientHeight = document.documentElement.clientHeight || document.body.clientHeight
				this.pageHeight = this.$refs.projectIn.offsetHeight
				this.disY = this.pageHeight - this.clientHeight + (this.isWX ? 44 : 88)
				// console.log(this.scrollTop, this.clientHeight, this.pageHeight, this.disY)
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
					localStorage.setItem('typeList', JSON.stringify(res.body.data))
					localStorage.setItem('typeListLastModify', new Date().getTime())
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
				this.pages = 1
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
			freeSign () {
				this.showFreeSign = true
				let URL = this.__WEBSERVERURL__ + '/api/member/freeReceive'
				this.$http.get(URL).then((res) => {
					if (res.body.code == 0) {
						this.freeReceive = res.body.data
					}
					console.log(JSON.stringify(res.body.data))
				})
			},
			getSignGold () {
				if (this.freeReceive[this.weekend[this.today]].isSign || this.isSign) {
					this.$vux.toast.text('今日已领取过了','middle')
					return
				}
				this.isSign = true
				let URL = this.__WEBSERVERURL__ + '/api/member/getSignGold'
				let params = {
					week: this.weekend[this.today],
					goldNum: this.freeReceive[this.weekend[this.today]].goldNum
				}
				console.log(JSON.stringify(params))
				this.$http.post(URL, params).then((res) => {
					if (res.body.code == 0) {
						this.$vux.toast.show({
							text: '+' + params.goldNum + '金豆'
						})
						this.freeSign()
						this.getMemberInfo()
					} else {
						this.$vux.toast.text(res.body.msg,'middle')
					}
					console.log(JSON.stringify(res.body.data))
				})
			},
		},
		components: {
			Options,
			BettingBox,
			pullUpLoad,
			Tab,
			TabItem,
			XButton
		}
	}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
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
			.freeSign
				position absolute
				right 0
				top 0
				width 44px
				height 44px
				background-image url('../assets/img/gift.svg')
				background-repeat no-repeat
				background-size 26px
				background-position center
		.selectWarpper
			position fixed
			left 0
			top 0
			z-index 99
			width 100%
			background-color #fff
			overflow scroll
			-webkit-overflow-scrolling touch
			display flex
			.tab
				flex 1
				position relative
				.shadow
					position absolute
					right 0px
					top 0px
					width 10px
					height 44px
			.freeSign
				flex 0 0 44px
				width 44px
				height 42px
				background-image url('../assets/img/gift.svg')
				background-repeat no-repeat
				background-size 26px
				background-position center
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
		.dialog-mask
			position fixed
			top 0
			left 0
			z-index 999
			width 100%
			height 100%
			background-color rgba(0, 0, 0, .6)
		.dialog
			position fixed
			top 50%
			left 50%
			z-index 1000
			transform translate(-50% , -50%)
			-webkit-transform translate(-50% , -50%)
			width 80%
			background-color #fff
			text-align center
			border-radius 3px
			.closeDialog
				position absolute
				right 10px
				top 10px
				width 30px
				height 30px
				background-image url('../assets/img/close.svg')
				background-repeat no-repeat
				background-size 18px
				background-position center
			.dialog-title
				padding 1.3em 1.6em 0.5em
				strong
					font-weight 400
					font-size 18px
			.goldPrize
				width 100%
				padding 10px
				.up
					display flex
				.down
					display flex
					margin-top 5px
					padding 0 30px
				.week
					flex 1
					height 84px
					margin 0 2px
					border-radius 3px
					background-color #eee
					&.today
						border 1px solid #ff6900
					&.isSign
						opacity .3
						border none
					.weekDay
						height 26px
						line-height 26px
						font-size 12px
						color #999
					.ico
						display block
						width 100%
						height 32px
					.goldNum
						font-size 12px
						color #666
</style>
