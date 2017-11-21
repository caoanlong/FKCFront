<template>
	<div class="mygoldbean">
	  <group gutter="0">
		<cell title="我的金豆" :value="memberInfo.goldBean"></cell>
	  </group>
	  <group title="金豆列表">
		<cell :title="item.num+'金豆'" v-for="(item,i) in list" :key="i">
		  <img slot="icon" width="20" style="display:block;margin-right:5px;" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC4AAAAuCAMAAABgZ9sFAAAAVFBMVEXx8fHMzMzr6+vn5+fv7+/t7e3d3d2+vr7W1tbHx8eysrKdnZ3p6enk5OTR0dG7u7u3t7ejo6PY2Njh4eHf39/T09PExMSvr6+goKCqqqqnp6e4uLgcLY/OAAAAnklEQVRIx+3RSRLDIAxE0QYhAbGZPNu5/z0zrXHiqiz5W72FqhqtVuuXAl3iOV7iPV/iSsAqZa9BS7YOmMXnNNX4TWGxRMn3R6SxRNgy0bzXOW8EBO8SAClsPdB3psqlvG+Lw7ONXg/pTld52BjgSSkA3PV2OOemjIDcZQWgVvONw60q7sIpR38EnHPSMDQ4MjDjLPozhAkGrVbr/z0ANjAF4AcbXmYAAAAASUVORK5CYII=">
		  <div slot="default">
			<x-button type="primary" @click.native="buyGoldBean(item.num)">&nbsp;获取&nbsp;</x-button>
		  </div>
		</cell>
	  </group>
	</div>
</template>
<script>
  import { Group,Cell,XButton } from 'vux'
  export default {
	data () {
		return {
			pageIndex: 1,
			list: []
		}
	},
	computed: {
		memberInfo() {
			return JSON.parse(localStorage.getItem('memberInfo'))
		}
	},
	created() {
		this.$store.commit({
			type: 'changeTitle',
			title: '获取金豆',
			isCome: true,
			isAdd: false
		})
		this.getGoldBeanList()
	},
	methods: {
		getGoldBeanList() {
			let URL = this.__WEBSERVERURL__ + '/api/shop/goldBeanType';
			this.$http.get(URL).then(res => {
				console.log(JSON.stringify(res.body))
				this.list = res.body.data.goldBeanTypeList
			})
		},
		buyGoldBean(goldBeanNum) {
			let URL = this.__WEBSERVERURL__ + '/api/shop/buyGoldBean';
			let params = {
				goldBeanNum: goldBeanNum
			}
			this.$http.post(URL, params).then(res => {
				this.$vux.toast.show({
  					text: res.body.msg
  				});
			})
		}
	},
	components: {
	  Group,
	  Cell,
	  XButton
	}
  }
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
	.mygoldbean
		width 100%
		position absolute
		left 0
		top 46px
</style>