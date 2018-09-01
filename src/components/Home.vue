<template>
	<div class="main">
		<div class="header">
			<div class="loginBtn"></div>
			<div class="title">91疯狂猜</div>
			<div class="freeSign" @click="freeSign"></div>
		</div>
		<div class="block"></div>
		<div class="wrapper">
			<div class="wrapperIn">
				<Swiper class="banner" v-if="bannerList.length > 0">
					<Slide v-for="(banner, key) in bannerList" :key="key">
						<a :href="banner.linkUrl">
							<img :src="__WEBIMGSERVERURL__ + banner.img"/>
						</a>
					</Slide>
				</Swiper>
				<div class="winMsg vux-1px-b">
					<div class="title"></div>
					<div class="content" style="overflow: hidden;position: relative">
						<div id="msgList" style="position:absolute;left: 0;top: 0">
							<div style="padding-left: 8px" v-for="msg in msgList" :key="msg">{{msg}}</div>
						</div>
					</div>
				</div>
				<div class="projectEntrance vux-1px-b">
					<div class="title vux-1px-b">娱乐竞猜</div>
					<div class="options">
						<router-link v-for="item in sortTypeList" :key="item._id" :to="{name: 'project', query: {id: item._id, title: item.name}}" tag="div" class="option">
							<div class="icon">
								<img :src="__WEBIMGSERVERURL__ + item.icon">
							</div>
							<div class="text">
								<div class="text-h">{{item.name}}</div>
								<div class="text-i">{{item.desc}}</div>
							</div>
						</router-link>
					</div>
				</div>
				<div class="hotGuess vux-1px-b" v-if="hotGuess">
					<div class="title vux-1px-b">热门竞猜<router-link :to="{name: 'project', query: {id: typeList[0]&&typeList[0]._id, title: typeList[0]&&typeList[0].name}}" tag="span" class="more">更多</router-link></div>
					<div class="guess vux-1px-b">
						<div class="content">
							<p class="title" v-text="hotGuess.name"></p>
							<div class="options">
								<Options v-for="(option,i) in hotGuess.options" :data="option" :index="i" :selected="selectedOption" :key="option.content" @selectOption="selectOption"></Options>
							</div>
							<div v-show="hotGuess.options&&!hotGuess.options.includes(selectedOption)" class="hot-guess-info">热点事件竞猜，比拼谁是预言家</div>
							<BettingBox :projectId="hotGuess._id&&hotGuess._id.toString()" :selectOpt="selectedOption" :isShow="hotGuess.options&&hotGuess.options.includes(selectedOption)" @select="selectNum"></BettingBox>
						</div>
					</div>
				</div>
				<div class="prizeChange vux-1px-b">
					<div class="title vux-1px-b">奖品兑换<router-link :to="{name: 'podium'}" tag="span" class="more">更多</router-link></div>
					<div class="prizeOptions">
						<router-link :to="{name: 'prizeDetail', query: {id: prize._id}}" tag="div" class="option" v-for="prize in prizeList" :key="prize._id">
							<img :src="__WEBIMGSERVERURL__ + prize.prizeImg" v-if="prize.prizeImg">
							<img src="../../static/images/default.png" v-else>
							<div class="prizeName">{{prize.prizeName}}</div>
							<div class="prizePrice">{{prize.prizeGoldBeanPrice}}金豆</div>
						</router-link>
					</div>
				</div>
				<div class="for-record">
					<a href="http://m.91fkc.com">© 2018 深圳猜个球 版权所有</a> | <a href="http://www.miitbeian.gov.cn">粤ICP备16064493号-1</a>
				</div>
			</div>
		</div>
		<Tabbar></Tabbar>
		<div v-show="showFreeSign" class="dialog-mask"></div>
		<div v-show="showFreeSign" class="dialog">
			<div class="closeDialog" @click="showFreeSign = false"></div>
			<div class="dialog-title">
				<strong>免费领豆</strong>
			</div>
			<div class="goldPrize">
				<div class="up">
					<div class="week" :class="{'today': today == 1, 'isSign': freeReceive.Monday.isSign}">
						<p class="weekDay">周一</p>
						<img class="ico" src="../assets/img/goldrandom.svg" v-if="freeReceive.Monday.isRandom">
						<img class="ico" src="../assets/img/goldbeans.svg" v-else>
						<p class="goldNum" v-if="freeReceive.Monday.isSign">已领取</p>
						<p class="goldNum" v-else>{{freeReceive.Monday.isRandom ? '随机' : freeReceive.Monday.goldNum}}金豆</p>
					</div>
					<div class="week" :class="{'today': today == 2, 'isSign': freeReceive.Tuesday.isSign}">
						<p class="weekDay">周二</p>
						<img class="ico" src="../assets/img/goldrandom.svg" v-if="freeReceive.Tuesday.isRandom">
						<img class="ico" src="../assets/img/goldbeans.svg" v-else>
						<p class="goldNum" v-if="freeReceive.Tuesday.isSign">已领取</p>
						<p class="goldNum" v-else>{{freeReceive.Tuesday.isRandom ? '随机' : freeReceive.Tuesday.goldNum}}金豆</p>
					</div>
					<div class="week" :class="{'today': today == 3, 'isSign': freeReceive.Wednesday.isSign}">
						<p class="weekDay">周三</p>
						<img class="ico" src="../assets/img/goldrandom.svg" v-if="freeReceive.Wednesday.isRandom">
						<img class="ico" src="../assets/img/goldbeans.svg" v-else>
						<p class="goldNum" v-if="freeReceive.Wednesday.isSign">已领取</p>
						<p class="goldNum" v-else>{{freeReceive.Wednesday.isRandom ? '随机' : freeReceive.Wednesday.goldNum}}金豆</p>
					</div>
					<div class="week" :class="{'today': today == 4, 'isSign': freeReceive.Thursday.isSign}">
						<p class="weekDay">周四</p>
						<img class="ico" src="../assets/img/goldrandom.svg" v-if="freeReceive.Thursday.isRandom">
						<img class="ico" src="../assets/img/goldbeans.svg" v-else>
						<p class="goldNum" v-if="freeReceive.Thursday.isSign">已领取</p>
						<p class="goldNum" v-else>{{freeReceive.Thursday.isRandom ? '随机' : freeReceive.Thursday.goldNum}}金豆</p>
					</div>
				</div>
				<div class="down">
					<div class="week" :class="{'today': today == 5, 'isSign': freeReceive.Friday.isSign}">
						<p class="weekDay">周五</p>
						<img class="ico" src="../assets/img/goldrandom.svg" v-if="freeReceive.Friday.isRandom">
						<img class="ico" src="../assets/img/goldbeans.svg" v-else>
						<p class="goldNum" v-if="freeReceive.Friday.isSign">已领取</p>
						<p class="goldNum" v-else>{{freeReceive.Friday.isRandom ? '随机' : freeReceive.Friday.goldNum}}金豆</p>
					</div>
					<div class="week" :class="{'today': today == 6, 'isSign': freeReceive.Saturday.isSign}">
						<p class="weekDay">周六</p>
						<img class="ico" src="../assets/img/goldrandom.svg" v-if="freeReceive.Saturday.isRandom">
						<img class="ico" src="../assets/img/goldbeans.svg" v-else>
						<p class="goldNum" v-if="freeReceive.Saturday.isSign">已领取</p>
						<p class="goldNum" v-else>{{freeReceive.Saturday.isRandom ? '随机' : freeReceive.Saturday.goldNum}}金豆</p>
					</div>
					<div class="week" :class="{'today': today == 0, 'isSign': freeReceive.Sunday.isSign}">
						<p class="weekDay">周日</p>
						<img class="ico" src="../assets/img/goldrandom.svg" v-if="freeReceive.Sunday.isRandom">
						<img class="ico" src="../assets/img/goldbeans.svg" v-else>
						<p class="goldNum" v-if="freeReceive.Sunday.isSign">已领取</p>
						<p class="goldNum" v-else>{{freeReceive.Sunday.isRandom ? '随机' : freeReceive.Sunday.goldNum}}金豆</p>
					</div>
				</div>
			</div>
			<div style="padding:15px;">
				<x-button type="primary" @click.native="getSignGold">领取奖励</x-button>
			</div>
		</div>
	</div>
</template>
<script>
import Tabbar from './Common/Tabbar'
import Options from './Common/Option'
import BettingBox from './Common/BettingBox'
import pullUpLoad from './Common/pullUpLoad'
import { Tab, TabItem, XButton } from 'vux'
import { Swiper, Slide } from 'vue-swiper-component'
const by = (name) => {
	return (o, p) => {
		let a, b
		if (typeof o === "object" && typeof p === "object" && o && p) {
			a = o[name]
			b = p[name]
			if (a === b) return 0
			if (typeof a === typeof b) return a < b ? -1 : 1
			return typeof a < typeof b ? -1 : 1;
		}
		throw ("error")
	}
}
export default {
	data () {
		return {
			memberInfo: {},
			prizeList: [],
			typeList: [],
			bannerList: [],
			hotGuess: {},
			selectedOption: {},
			selectedNum: '',

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
			isSign: false,
			msgList: [
				`恭喜1${parseInt(Math.random()*10)}*****${parseInt(Math.random()*10000)}赢得${parseInt(Math.random()*10000)}金豆！`,
				`恭喜1${parseInt(Math.random()*10)}*****${parseInt(Math.random()*10000)}赢得${parseInt(Math.random()*10000)}金豆！`
			],
			top: 0
		}
	},
	computed: {
		today: () => new Date().getDay(),
		isWX() { return this.isWeixin() },
		sortTypeList() { 
			return this.typeList.sort(by('sort'))
		}
	},
	created() {
		document.title = '91疯狂猜'
		this.getBanner()
		this.getPrizeList()
		this.getProjectType()
	},
	mounted() {
		this.timer = setInterval(() => {
			this.msgList.push(`恭喜1${parseInt(Math.random()*10)}*****${parseInt(Math.random()*10000)}赢得${parseInt(Math.random()*10000)}金豆！`)
			this.startMove(document.getElementById('msgList'), {top: -22})
			this.msgList.shift()
			document.getElementById('msgList').style.top = 0
		}, 4000)
	},
	beforeDestroy() {
		clearInterval(this.timer)
	},
	methods: {
		getBanner () {
			const URL = this.__WEBSERVERURL__ + '/api/project/banner'
			this.$http.get(URL).then(res => {
				this.bannerList = res.body.data
			})
		},
		getProjectType () {
			const URL = this.__WEBSERVERURL__ + '/api/project/type'
			this.$http.get(URL).then(res => {
				this.typeList = res.body.data
				this.$nextTick(() => {
					this.getHotGuess()
				})
			})
		},
		getHotGuess () {
			const URL = this.__WEBSERVERURL__ + '/api/project/hot'
			const params = {
				projectType: this.typeList[0]._id
			}
			this.$http.get(URL, {params: params}).then(res => {
				this.hotGuess = res.body.data
			})
		},
		getPrizeList() {
			const URL = this.__WEBSERVERURL__ + '/api/prize'
			const params = {
				pageSize: 3
			}
			this.$http.get(URL,{params:params}).then((res) => {
				this.prizeList = res.body.data
			})
		},
		getMemberInfo () {
			const URL = this.__WEBSERVERURL__ + '/api/member/info';
			this.$http.post(URL).then((res) => {
				if (res.body.code == 0) {
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
		freeSign () {
			this.showFreeSign = true
			const URL = this.__WEBSERVERURL__ + '/api/member/freeReceive'
			this.$http.get(URL).then((res) => {
				if (res.body.code == 0) {
					this.freeReceive = res.body.data
				}
			})
		},
		getSignGold () {
			if (this.freeReceive[this.weekend[this.today]].isSign || this.isSign) {
				this.$vux.toast.text('今日已领取过了','middle')
				return
			}
			this.isSign = true
			const URL = this.__WEBSERVERURL__ + '/api/member/getSignGold'
			const params = {
				week: this.weekend[this.today],
				goldNum: this.freeReceive[this.weekend[this.today]].goldNum
			}
			this.$http.post(URL, params).then((res) => {
				if (res.body.code == 0) {
					this.$vux.toast.show({ text: '+' + params.goldNum + '金豆' })
					this.freeSign()
					this.getMemberInfo()
				} else {
					this.$vux.toast.text(res.body.msg,'middle')
				}
			})
		},
		selectOption (data) {
			this.selectedOption = data
		},
		selectNum (data) {
			this.selectedNum = data.content
		}
	},
	components: {
		Tabbar,
		Options,
		BettingBox,
		pullUpLoad,
		Tab,
		TabItem,
		XButton,
		Swiper,
		Slide
	}
}
</script>
<style lang="stylus" scoped>
.main
	overflow hidden
	.header
		position fixed
		left 0
		top 0
		display flex
		width 100%
		height 44px
		line-height 44px
		text-align center
		color #fff
		background-color #2B2623
		position relative
		.loginBtn
			flex 0 0 54px
			font-size 14px
		.title
			flex 1
		.freeSign
			flex 0 0 54px
			height 44px
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
		.wrapperIn
			padding-bottom 60px
			.banner
				width 100%
				height 120px
				background-color #ccc
				img
					width 100%
			.winMsg
				width 100%
				height 50px
				background-color #fff
				padding 15px 0
				display flex
				.title
					flex 0 0 90px
					border-right 1px solid #ddd
					background-image url('../assets/img/winMsg.png')
					background-size 64px
					background-repeat no-repeat
					background-position center
				.content
					flex 1
					padding-left 10px
					font-size 14px
					color #999
			.projectEntrance
				width 100%
				margin-top 10px
				background-color #fff
				.title
					width 100%
					height 50px
					line-height 50px
					padding 0 10px
				.options
					width 100%
					&:before
					&:after
						content ''
						display block
						clear both
						width 0
						height 0
					.option
						float left
						display flex
						width 50%
						height 100px
						.icon
							flex 0 0 70px
							img
								display block
								margin 28px auto 0 auto
								width 46px
								height 46px
								border-radius 23px
						.text
							padding 24px 0
							.text-h
								font-weight bold
								font-size 15px
								line-height 2
							.text-i
								font-size 13px
								color #999
			.hotGuess
				width 100%
				margin-top 10px
				background-color #fff
				.title
					width 100%
					// height 50px
					line-height 50px
					padding 0 10px
					.more
						float right
						text-align right
						display block
						width 100px
						font-size 14px
						color #09BB07
				.guess
					position relative
					margin-bottom 10px
					width 100%
					.content
						width 100%
						padding 5px 15px
						background-color #fff
						.title
							font-size 17px
							line-height 160%
				.hot-guess-info
					width 100%
					height 50px
					line-height 50px
					color #999
					font-size 14px
					text-align center
			.prizeChange
				width 100%
				margin-top 10px
				background-color #fff
				.title
					width 100%
					height 50px
					line-height 50px
					padding 0 10px
					.more
						float right
						text-align right
						display block
						width 100px
						font-size 14px
						color #09BB07
				.prizeOptions
					width 100%
					padding-bottom 20px
					&:before
					&:after
						content ''
						display block
						clear both
						width 0
						height 0
					.option
						float left
						width 33.3%
						img
							display block
							height 80px
							margin 20px auto
						.prizeName
							padding-left 15px
							color #666
							font-size 14px
							overflow hidden
							text-overflow ellipsis
							white-space nowrap
						.prizePrice
							padding-left 15px
							color #ff6900
	.for-record
		width 100%
		height 50px
		line-height 50px
		font-size 12px
		text-align center
		a
			color #999
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
