<template>
    <Index v-bind:moduleLotteryID="lotteryID" :moduleName="moduleName" :moduleplay="moduleplay"/>
</template>

<script>
    import Index from '@/components/cqssc/Index'

    export default {
      name: 'xjsscIndex',
      components: {
        Index
      },
      data: function() {
        return {
            lotteryID:32,
            moduleName:'QQ分分彩',
            moduleplay: '开奖时间为：全天24小时，1分钟一期，共1440期。开奖号码取自QQ官网（http://im.qq.com）实时在线人数。\r\n若因异常情况，导致连续两期或以上同时腾讯官方在线人数数字未更新，平台保留撤销重复开奖期数投注的权利。',
        }
      }

    }
</script>

