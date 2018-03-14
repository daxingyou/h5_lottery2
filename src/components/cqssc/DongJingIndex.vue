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
            lotteryID:114,
            moduleName:'东京1.5分彩',
            moduleplay: '开奖时间为：全天24小时，90秒一期，共960期，开奖号码来源权威境外彩开奖接口。',
        }
      }

    }
</script>

