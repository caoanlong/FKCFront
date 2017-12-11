<template>
	<div class="my">
		<div class="block"></div>
		<div class="wrapper">
			<div class="profile">
				<div class="head">
					<input type="file" class="avatar" ref="avatar" @change="addImg">
					<img :src="memberInfo.avatar" v-if="memberInfo.avatar">
					<img src="../assets/img/avatar.svg" v-else>
				</div>
				<div class="mobile">
					<p>{{memberInfo.mobile}}</p>
				</div>
				<div class="charm">
					<p>魅力值：{{memberInfo.charm}}</p>
				</div>
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
				<cell title="收获地址" is-link :link="{name: 'myAddress'}"></cell>
				<cell title="意见反馈" is-link link="" @click.native="laterOpen"></cell>
			</group>
			<box gap="20px 10px">
				<x-button type="default" @click.native="showExit=true">退出</x-button>
			</box>
		</div>
		<Tabbar></Tabbar>
		<actionsheet v-model="showExit" :menus="signoutMenu" @on-click-menu="showExit=false" @on-click-menu-delete="signout" show-cancel></actionsheet>
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
			}
		},
		created() {
			document.title = '我的'
			this.getMemberInfo()
		},
		methods: {
			getMemberInfo () {
				let URL = this.__WEBSERVERURL__ + '/api/member/info';
				this.$http.post(URL).then((res) => {
					if (res.body.code == 0) {
						this.memberInfo = res.body.data
						localStorage.setItem('memberInfo',JSON.stringify(res.body.data))
					} else {
						this.$router.push({name: 'login'})
					}
					console.log(JSON.stringify(res.body.data));
				})
			},
			addImg (e) {
				let URL = this.__WEBSERVERURL__ + '/uploadImg';
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
		.wrapper
			width 100%
			position absolute
			left 0
			top 0
			right 0
			.profile
				width 100%
				height 220px
				padding-top 20px
				background-color #35495e
				.head
					width 80px
					height 80px
					border-radius 40px
					background-color #fff
					border 2px solid #fff
					margin 20px auto 0 auto
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
				.mobile
					width 100%
					height 50px
					line-height 50px
					p
						color #fff
						text-align center
				.charm
					width 100%
					height 40px
					line-height 20px
					p
						color #fff
						text-align center
</style>