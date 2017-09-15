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
  			title: '我的竞猜',
  			isCome: true,
  			isAdd: false,
  		})
  	},
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
</style>