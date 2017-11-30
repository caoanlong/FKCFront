<template>
	<div class="main">
		<Scroll ref="scroll"
              :data="list"
              :scrollbar="true"
              :pullDownRefresh="pullDownRefreshObj"
              :pullUpLoad="pullUpLoadObj"
              :startY="0"
              @pullingDown="onPullingDown"
              @pullingUp="onPullingUp">
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
      	</Scroll>
	</div>
</template>
<script>
	import Scroll from './Common/Scroll'
	import Options from './Common/Option'
	import BettingBox from './Common/BettingBox'
	export default {
	  	data () {
	    	return {
	    		list: [],
	    		pageIndex: 1,
	    		memberInfo: {},
	    		pullDownRefresh: true,
		        pullDownRefreshThreshold: 90,
		        pullDownRefreshStop: 72,
		        pullUpLoad: true,
		        pullUpLoadThreshold: 0,
		        pullUpLoadMoreTxt: '加载更多',
		        pullUpLoadNoMoreTxt: '没有更多数据了',
		        scrollToX: 0,
		        scrollToY: -200,
		        scrollToTime: 700,
		        scrollToEasing: 'bounce',
		        scrollToEasingOptions: ['bounce', 'swipe', 'swipeBounce'],

		        selectedOption: {},
		        selectedNum: '',
	    	}
	  	},
	  	computed: {
	      	pullDownRefreshObj() {
	        	return this.pullDownRefresh ? {
	          		threshold: parseInt(this.pullDownRefreshThreshold),
	          		stop: parseInt(this.pullDownRefreshStop)
	        	} : false
	      	},
	      	pullUpLoadObj() {
	        	return this.pullUpLoad ? {threshold: parseInt(this.pullUpLoadThreshold), txt: {more: this.pullUpLoadMoreTxt, noMore: this.pullUpLoadNoMoreTxt}} : false
	      	},
	    },
	    watch: {
	      	pullDownRefreshObj() {
	        	this.rebuildScroll()
	      	},
	      	pullUpLoadObj() {
	        	this.rebuildScroll()
	      	}
	    },
	  	created() {
	  		this.$store.commit({
	  			type: 'changeTitle',
	  			title: '疯狂猜',
	  			isCome: false,
	  			isAdd: true,
			  })
			this.getMemberInfo();
	  		this.getProjectList();
	  	},
	  	methods: {
	  		getProjectList() {
	  			let URL = this.__WEBSERVERURL__ + '/api/project';
	  			let params = {
	  				pageIndex: this.pageIndex
	  			}
	  			this.$http.get(URL,{params: params}).then((res) => {
	  				console.log(JSON.stringify(res.body));
	  				if (this.pageIndex <= res.body.data.pageIndex) {
	  					this.list = this.list.concat(res.body.data.projectList)
	  				} else {
	  					this.$refs.scroll.forceUpdate()
	  				}
	  			})
	  		},
	  		getMemberInfo() {
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
	  		onPullingDown() {
	  			this.pageIndex = 1
	  			this.list = []
		        setTimeout(() => {
		          	this.getProjectList()
		        }, 1000)
	      	},
	      	onPullingUp() {
	      		this.pageIndex++
		        setTimeout(() => {
		        	this.getProjectList()
		        }, 1000)
	      	},
			rebuildScroll() {
		        this.$nextTick(() => {
		          this.$refs.scroll.destroy()
		          this.$refs.scroll.initScroll()
		        })
	      	},
	      	selectOption(data) {
	      		console.log(JSON.stringify(data));
	      		this.selectedOption = data;
	      	},
	      	selectNum(data) {
	      		console.log(JSON.stringify(data));
	      		this.selectedNum = data.content;
	      	}
		},
	  	components: {
	  		Scroll,
	  		Options,
	  		BettingBox
		}
	}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
	.main
		position absolute
		top 46px
		left 0
		right 0
		bottom 0px
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
