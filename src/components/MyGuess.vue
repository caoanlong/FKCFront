<template>
  	<div class="myguess">
      <tab class="tab">
        <tab-item selected @on-item-click="">全部</tab-item>
        <tab-item @on-item-click="">待开奖</tab-item>
        <tab-item @on-item-click="">已开奖</tab-item>
      </tab>
      <div>
        <group gutter="10px" v-for="item in list" :key="item.title">
          <cell :title="item.title" :value="item.status"></cell>
          <cell-form-preview :list="item.list"></cell-form-preview>
        </group>
      </div>
    </div>
</template>
<script>
  import { Tab, TabItem, CellFormPreview, Group, Cell  } from 'vux'
  export default {
  	data () {
    	return {
        list: [
          {
            title: '德赫亚',
            status: '待开奖',
            list: [
              {
                label: '竞猜内容',
                value: '下赛季转会皇马'
              }, {
                label: '投注时间',
                value: '2017-05-02 12:30:38'
              }, {
                label: '投注金额',
                value: '￥500'
              }
            ]
          },
          {
            title: '王宝强马蓉',
            status: '已开奖',
            list: [
              {
                label: '竞猜内容',
                value: '宋泽插入'
              }, {
                label: '投注时间',
                value: '2017-05-02 12:30:38'
              }, {
                label: '投注金额',
                value: '￥500'
              }
            ]
          },
          {
            title: '德赫亚',
            status: '待开奖',
            list: [
              {
                label: '竞猜内容',
                value: '下赛季转会皇马'
              }, {
                label: '投注时间',
                value: '2017-05-02 12:30:38'
              }, {
                label: '投注金额',
                value: '￥500'
              }
            ]
          },
          {
            title: '德赫亚',
            status: '待开奖',
            list: [
              {
                label: '竞猜内容',
                value: '下赛季转会皇马'
              }, {
                label: '投注时间',
                value: '2017-05-02 12:30:38'
              }, {
                label: '投注金额',
                value: '￥500'
              }
            ]
          }
        ],
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
    components: {
      Tab,
      TabItem,
      CellFormPreview, 
      Group,
      Cell
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
  .myguess
    width 100%
    position absolute
    top 90px
    left 0
    .tab
      position fixed
      left 0
      top 46px
      width 100%
      z-index 10
</style>