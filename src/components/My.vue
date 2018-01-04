<template>
	<div class="my">
		<div class="header">我的</div>
		<div class="block"></div>
		<div class="wrapper">
			<div class="profile">
				<div class="avatarInfo">
					<div class="head">
						<input type="file" class="avatar" ref="avatar" @change="addImg">
						<img :src="__WEBIMGSERVERURL__ + memberInfo.avatar" v-if="memberInfo.avatar">
						<img src="../assets/img/avatar.svg" v-else>
					</div>
				</div>
				<div class="info">
					<div class="mobile">
						<p>手机号：{{memberInfo.mobile}}</p>
					</div>
					<div class="charm">
						<p>魅力值：{{memberInfo.charm}}</p>
					</div>
				</div>
				<div class="freeSign" @click="freeSign">免费领豆</div>
			</div>
			<group gutter="0">
				<cell title="我的金豆" :value="memberInfo.goldBean" is-link :link="{name: 'getGoldBean'}"></cell>
			</group>
			<group>
				<cell title="我的竞猜" is-link :link="{name: 'myGuess'}"></cell>
				<cell title="我的奖品" is-link :link="{name: 'myPrize'}"></cell>
				<cell title="账户明细" is-link :link="{name: 'accountDetail'}"></cell>
			</group>
			<group>
				<cell title="收货地址" is-link :link="{name: 'myAddress'}"></cell>
				<!-- <cell title="意见反馈" is-link link="" @click.native="laterOpen"></cell> -->
			</group>
			<box gap="20px 10px">
				<x-button type="default" @click.native="showExit=true">退出</x-button>
			</box>
		</div>
		<Tabbar></Tabbar>
		<actionsheet v-model="showExit" :menus="signoutMenu" @on-click-menu="showExit=false" @on-click-menu-delete="signout" show-cancel></actionsheet>
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
	import { Group,Cell,XButton,Box,Actionsheet } from 'vux'
	export default {
		data () {
			return {
				memberInfo: {},
				showExit: false,
				signoutMenu: {
					'title.noop': '确定退出吗？',
					delete: '<span style="color:red">退出</span>'
				},
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
		created () {
			document.title = '我的'
			this.getMemberInfo()
			if (this.$route.query.showSign) {
				this.freeSign()
			}
		},
		methods: {
			getMemberInfo () {
				let URL = this.__WEBSERVERURL__ + '/api/member/info'
				this.$http.post(URL).then((res) => {
					if (res.body.code == 0) {
						this.memberInfo = res.body.data
						localStorage.setItem('memberInfo',JSON.stringify(res.body.data))
					} else {
						this.$router.push({name: 'login'})
					}
					console.log(JSON.stringify(res.body.data))
				})
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
			addImg (e) {
				let URL = 'http://39.108.245.177:3001/uploadImg'
				let formData = new FormData()
				formData.append("file",e.target.files[0])
				this.$http.post(URL,formData).then((res) => {
					this.uploadAvatar(res.body.data)
				})
			},
			uploadAvatar (imgUrl) {
				let URL = this.__WEBSERVERURL__ + '/api/member/avatar'
				let params = {
					memberId: this.memberInfo._id,
					avatar: imgUrl
				}
				this.$http.post(URL,params).then((res) => {
					if (res.body.code == 0) {
						this.memberInfo = res.body.data
						localStorage.setItem('memberInfo',JSON.stringify(res.body.data))
					}
					console.log(JSON.stringify(res.body.data))
				})
			},
			signout () {
				this.showExit = false
				localStorage.clear()
				this.$router.replace({name: 'login'})
				// window.location.reload()
			},
			laterOpen () {
				this.$vux.toast.text('稍后开放...','middle')
			}
		},
		components: {
			Tabbar,
			Group,
			Cell,
			XButton,
			Box,
			Actionsheet
		}
	}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
	.my
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
		.wrapper
			width 100%
			position absolute
			left 0
			top 44px
			right 0
			.profile
				display flex
				position relative
				width 100%
				// height 220px
				padding 20px 0
				background-color #2B2623
				.avatarInfo
					flex 0 0 110px
					padding-left 15px
					.head
						width 80px
						height 80px
						border-radius 40px
						background-color #fff
						border 2px solid #fff
						overflow hidden
						position relative
						.avatar
							position absolute
							width 100%
							height 100%
							left 0
							top 0
							opacity 0
						img
							display block
							width 100%
							height 100%
				.info
					flex 1
					.mobile
						width 100%
						height 40px
						line-height 40px
						p
							color #fff
							text-align left
					.charm
						width 100%
						height 40px
						line-height 40px
						p
							color #fff
							text-align left
				.freeSign
					position absolute
					right 15px
					bottom 25px
					z-index 9
					width 80px
					height 30px
					line-height 30px
					text-align center
					font-size 14px
					color #ff6900
					background-color #fff
					border-radius 15px
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