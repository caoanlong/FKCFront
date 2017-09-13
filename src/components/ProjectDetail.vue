<template>
  	<div></div>
</template>
<script>
export default {
  	data () {
    	return {
    	}
  	},
  	created() {
  		this.$store.commit({
  			type: 'changeTitle',
  			title: '项目详情',
  			isCome: true,
  			isAdd: false,
  		})
  	},
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
</style>