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
           	<router-link tag="div" class="list" v-for="item in list" :key="item.id" :to="{name: 'projectDetail',query: {id: item.id}}">
           		<div class="mask">
           			<span class="time" v-text="'截止时间：'+item.time"></span>
           		</div>
           		<img class="main-img" :src="item.url" v-if="item.url">
           		<img class="main-img" src="../../static/images/default.png" v-else>
           		<group gutter="-5px">
	      			<cell :title="item.title"></cell>
			    </group>
           	</router-link>
      	</Scroll>
	</div>
</template>
<script>
	import Scroll from './Common/Scroll.vue'
	import {Group,Cell} from 'vux'
	export default {
	  	data () {
	    	return {
	    		list: [],
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
	      	}
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
	  		this.getProjectList();
	  	},
	  	methods: {
	  		getProjectList() {
	  			let URL = "../../static/data/json/projectList.json";
	  			this.$http.get(URL).then((res) => {
	  				// console.log(JSON.stringify(res.body));
	  				this.list = res.body;
	  			})
	  		},
	  		onPullingDown() {
		        setTimeout(() => {
		          	this.getProjectList()
		        }, 1000)
	      	},
	      	onPullingUp() {
		        setTimeout(() => {
		          	if (Math.random() > 0.5) {
		            	// 如果有新数据
		            	this.list = this.list.concat(this.list)
		          	} else {
		            	// 如果没有新数据
		            	this.$refs.scroll.forceUpdate()
		          	}
		        }, 1000)
	      	},
			rebuildScroll() {
		        this.$nextTick(() => {
		          this.$refs.scroll.destroy()
		          this.$refs.scroll.initScroll()
		        })
	      	}
		},
	  	components: {
	  		Scroll,
			Group,
			Cell,
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
				width 100%
				height 180px
</style>
