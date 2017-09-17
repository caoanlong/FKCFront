<template>
  	<div class="account">
      <group title="金豆明细记录（近三月）">
        <cell v-for="(item,i) in 7" :key="i">
          <div slot="title">
            <p>全民踩踩踩</p>
            <p style="font-size: 14px;color: #999">9月13日 21:30</p>
          </div>
          <div slot="default">
            <span>+68</span>
          </div>
        </cell>
      </group>
    </div>
</template>
<script>
import { Group,Cell } from 'vux'
export default {
  	data () {
    	return {
    	}
  	},
  	created() {
  		this.$store.commit({
  			type: 'changeTitle',
  			title: '账户明细',
  			isCome: true,
  			isAdd: false,
  		})
  	},
    components: {
      Group,
      Cell
    }
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
  .account
    width 100%
    position absolute
    top 46px
    left 0
</style>