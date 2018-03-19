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
            lotteryID:28,
            moduleName:'台湾5分彩',
            moduleplay: '开奖时间：07:05-23:55，5分钟一期，开奖号码来源台湾宾果同期开奖号码转换。',
        }
      }

    }
</script>

