<template>
	<div class="my">
		<div class="profile">
			<div class="head">
				<input type="file" class="avatar" ref="avatar" @change="addImg">
				<img :src="__WEBIMGSERVERURL__ + memberInfo.avatar" v-if="memberInfo.avatar">
				<img src="../assets/img/avatar.svg" v-else>
			</div>
			<div class="mobile">
				<p>{{memberInfo.mobile}}</p>
			</div>
		</div>
		<group gutter="0">
			<cell title="我的金豆" :value="memberInfo.goldBean" is-link :link="{name: 'getGoldBean'}"></cell>
		</group>
		<group>
			<cell title="我的竞猜" is-link :link="{name: 'myGuess'}"></cell>
			<cell title="账户明细" is-link :link="{name: 'accountDetail'}"></cell>
		</group>
		<group>
			<cell title="分享给好友" is-link link=""></cell>
		</group>
		<box gap="20px 10px">
			<x-button type="warn" @click.native="signout">退出</x-button>
		</box>
	</div>
</template>
<script>
	import { Group,Cell,XButton,Box } from 'vux'
	export default {
		data () {
			return {
				memberInfo: {}
			}
		},
		created() {
			this.$store.commit({
				type: 'changeTitle',
				title: '我的',
				isCome: true,
				isAdd: false,
			})
			this.getMemberInfo()
		},
		methods: {
			getMemberInfo() {
				let URL = this.__WEBSERVERURL__ + '/api/member/info';
				this.$http.post(URL).then((res) => {
					if (res.body.code == 0) {
						this.memberInfo = res.body.data
						localStorage.setItem('memberInfo',JSON.stringify(res.body.data))
					}
					console.log(JSON.stringify(res.body.data));
				})
			},
			addImg(e) {
				let URL = this.__WEBSERVERURL__ + '/uploadImg';
				let formData = new FormData()
				formData.append("file",e.target.files[0])
				this.$http.post(URL,formData).then((res) => {
					this.uploadAvatar(res.body.data)
				})
			},
			uploadAvatar(imgUrl) {
				let URL = this.__WEBSERVERURL__ + '/api/member/avatar';
				let params = {
					memberId: this.memberInfo._id,
					avatar: imgUrl
				}
				this.$http.post(URL,params).then((res) => {
					if (res.body.code == 0) {
						this.memberInfo = res.body.data
						localStorage.setItem('memberInfo',JSON.stringify(res.body.data))
					}
					console.log(JSON.stringify(res.body.data));
				})
			},
			signout() {
				localStorage.clear();
				this.$router.push({name: 'login'})
			}
		},
		components: {
			Group,
			Cell,
			XButton,
			Box
		}
	}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
	.my
		width 100%
		position absolute
		left 0
		top 46px
		.profile
			width 100%
			height 160px
			padding-top 20px
			background-color #35495e
			.head
				width 80px
				height 80px
				border-radius 40px
				background-color #fff
				border 2px solid #fff
				margin 0 auto
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
</style>