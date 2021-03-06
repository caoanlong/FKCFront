<template>
 	<div ref="wrapper" class="list-wrapper">
	    <div class="scroll-content">
	      	<slot>
	        	<ul class="list-content">
	          		<li @click="clickItem($event,item)" class="list-item" v-for="item in data">{{item}}</li>
	        	</ul>
	      	</slot>
	      	<slot name="pullup" :pullUpLoad="pullUpLoad" :isPullUpLoad="isPullUpLoad">
		        <!-- <div class="pullup-wrapper" v-if="pullUpLoad">
		          	<div class="before-trigger" v-if="!isPullUpLoad">
		            	<span>{{pullUpTxt}}</span>
		          	</div>
		          	<div class="after-trigger" v-else>
		            	<inline-loading></inline-loading>
		          	</div>
		        </div> -->
		        <div class="pullup-wrapper" v-if="pullUpLoad">
		            <load-more v-if="!isPullUpLoad" :show-loading="false" :tip="pullUpTxt" background-color="#fbf9fe"></load-more>
		            <load-more v-else :tip="'正在加载'"></load-more>
		        </div>
	      	</slot>
	    </div>
	    <slot name="pulldown" :pullDownRefresh="pullDownRefresh" :pullDownStyle="pullDownStyle" :beforePullDown="beforePullDown" :pulling="pulling" :bubbleY="bubbleY">
	      	<div ref="pulldown" class="pulldown-wrapper" :style="pullDownStyle" v-if="pullDownRefresh">
	        	<div class="before-trigger" v-if="beforePullDown">
	          		<bubble :y="bubbleY"></bubble>
	        	</div>
	        	<div class="after-trigger" v-else>
	          		<div v-if="pulling" class="loading">
	            		<inline-loading></inline-loading>
	          		</div>
	          		<div v-else>
	          			<x-icon type="ios-checkmark-outline" size="20"></x-icon>
	          			<span>{{refreshTxt}}</span>
	          		</div>
	        	</div>
	      	</div>
	    </slot>
  	</div>
</template>
<script>
	import BScroll from 'better-scroll'
  	import {InlineLoading,LoadMore} from 'vux'
  	import Bubble from './bubble.vue'

  	const DIRECTION_H = 'horizontal'
  	const DIRECTION_V = 'vertical'
  	const DEFAULT_LOAD_TXT_MORE = '加载更多'
  	const DEFAULT_LOAD_TXT_NO_MORE = '没有更多数据了'
  	const DEFAULT_REFRESH_TXT = '刷新成功'

  	export default {
    	props: {
      		data: {
        		type: Array,
        		default: function () {
          			return []
        		}
      		},
	      	probeType: {
	        	type: Number,
	        	default: 1
	      	},
	      	click: {
	        	type: Boolean,
	        	default: true
	      	},
	      	listenScroll: {
	        	type: Boolean,
	        	default: false
	      	},
	      	listenBeforeScroll: {
	        	type: Boolean,
	        	default: false
	      	},
	      	direction: {
	        	type: String,
	        	default: DIRECTION_V
	      	},
	      	scrollbar: {
	        	type: null,
	        	default: false
	      	},
	      	pullDownRefresh: {
	        	type: null,
	        	default: false
	      	},
	      	pullUpLoad: {
	        	type: null,
	        	default: false
	      	},
	      	startY: {
	        	type: Number,
	        	default: 0
	      	},
	      	refreshDelay: {
	        	type: Number,
	        	default: 20
	      	},
	      	freeScroll: {
	        	type: Boolean,
	        	default: false
	      	}
    	},
	    data() {
	      	return {
	        	beforePullDown: true,
		        isRebounding: false,
		        isPullingDown: false,
		        pulling: false,
		        isPullUpLoad: false,
		        pullUpDirty: true,
		        pullDownStyle: '',
		        bubbleY: 0
	      	}
	    },
	    computed: {
	      	pullUpTxt() {
	        	const moreTxt = this.pullUpLoad && this.pullUpLoad.txt && this.pullUpLoad.txt.more || DEFAULT_LOAD_TXT_MORE
	        	const noMoreTxt = this.pullUpLoad && this.pullUpLoad.txt && this.pullUpLoad.txt.noMore || DEFAULT_LOAD_TXT_NO_MORE
	        	return this.pullUpDirty ? moreTxt : noMoreTxt
	      	},
	      	refreshTxt() {
	        	return this.pullDownRefresh && this.pullDownRefresh.txt || DEFAULT_REFRESH_TXT
	      	}
	    },
	    created() {
	      	this.pullDownInitTop = -50
	    },
	    mounted() {
	      	setTimeout(() => {
	        	this.initScroll()
	      	}, 20)
	    },
	    methods: {
	      	initScroll() {
	        	if (!this.$refs.wrapper) {
	          		return
	        	}

		        let options = {
		          	probeType: this.probeType,
		          	click: this.click,
		          	scrollY: this.freeScroll || this.direction === DIRECTION_V,
		          	scrollX: this.freeScroll || this.direction === DIRECTION_H,
		          	scrollbar: this.scrollbar,
		          	pullDownRefresh: this.pullDownRefresh,
		          	pullUpLoad: this.pullUpLoad,
		          	startY: this.startY,
		          	freeScroll: this.freeScroll
		        }

	        	this.scroll = new BScroll(this.$refs.wrapper, options)

		        if (this.listenScroll) {
		          	this.scroll.on('scroll', (pos) => {
		            	this.$emit('scroll', pos)
		          	})
		        }

		        if (this.listenBeforeScroll) {
		          	this.scroll.on('beforeScrollStart', () => {
		            	this.$emit('beforeScrollStart')
		          	})
		        }

		        if (this.pullDownRefresh) {
		          	this._initPullDownRefresh()
		        }

		        if (this.pullUpLoad) {
		          	this._initPullUpLoad()
		        }
	      	},
	      	disable() {
	        	this.scroll && this.scroll.disable()
	      	},
	      	enable() {
	        	this.scroll && this.scroll.enable()
	      	},
	      	refresh() {
	        	this.scroll && this.scroll.refresh()
	      	},
	      	scrollTo() {
	        	this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
	      	},
	      	scrollToElement() {
	        	this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
	      	},
	      	destroy() {
	        	this.scroll.destroy()
	      	},
	      	forceUpdate(dirty) {
	        	if (this.pullDownRefresh && this.isPullingDown) {
	          		this.pulling = false
	          		this._reboundPullDown().then(() => {
	            		this._afterPullDown()
	          	})
	        	} else if (this.pullUpLoad && this.isPullUpLoad) {
		          	this.isPullUpLoad = false
		          	this.scroll.finishPullUp()
		          	this.pullUpDirty = dirty
		          	this.refresh()
	        	} else {
	          		this.refresh()
	        	}
	      	},
	      	_initPullDownRefresh() {
	        	this.scroll.on('pullingDown', () => {
		          	this.beforePullDown = false
		          	this.isPullingDown = true
		          	this.pulling = true
		          	this.$emit('pullingDown')
		        })

		        this.scroll.on('scroll', (pos) => {
		          	if (this.beforePullDown) {
			            this.bubbleY = Math.max(0, pos.y + this.pullDownInitTop)
			            this.pullDownStyle = `top:${Math.min(pos.y + this.pullDownInitTop, 10)}px`
		          	} else {
		            	this.bubbleY = 0
		          	}

		          	if (this.isRebounding) {
		            	this.pullDownStyle = `top:${10 - (this.pullDownRefresh.stop - pos.y)}px`
		          	}
		        })
	      	},
	      	_initPullUpLoad() {
	        	this.scroll.on('pullingUp', () => {
	          		this.isPullUpLoad = true
	          		this.$emit('pullingUp')
	        	})
	      	},
	      	_reboundPullDown() {
	        	const {stopTime = 600} = this.pullDownRefresh
	        	return new Promise((resolve) => {
	          		setTimeout(() => {
	            		this.isRebounding = true
			            this.scroll.finishPullDown()
			            this.isPullingDown = false
	            		resolve()
	          		}, stopTime)
	        	})
	      	},
	      	_afterPullDown() {
	        	setTimeout(() => {
	          		this.pullDownStyle = `top:${this.pullDownInitTop}px`
	          		this.beforePullDown = true
	          		this.isRebounding = false
	          		this.refresh()
	        	}, this.scroll.options.bounceTime)
	      	}
	    },
	    watch: {
	      	data() {
	        	setTimeout(() => {
	          		this.forceUpdate(true)
	        	}, this.refreshDelay)
	      	}
	    },
	    components: {
	      	InlineLoading,
	      	LoadMore,
	      	Bubble
	    }
  	}
</script>
<style lang="stylus" scoped>
  	.list-wrapper
	    position absolute
	    left 0
	    top 0
	    right 0
	    bottom 0
	    overflow hidden
	    .list-content
	      	position relative
	      	z-index 10
	      	background #fff
	      	.list-item
	        	height 60px
	        	line-height 60px
	        	font-size 18px
	        	padding-left 20px
	        	border-bottom 1px solid #e5e5e5
	  	.pulldown-wrapper
		    position absolute
		    width 100%
		    left 0
		    display flex
		    justify-content center
		    align-items center
		    transition all
		    color #999
	    	.after-trigger
	      		margin-top 10px
	  	.pullup-wrapper
		    width 100%
		    display flex
		    justify-content center
		    align-items center
		    padding-bottom 16px
		    color #999
	.vux-x-icon
		fill #999
		position relative
		top 4px
</style>