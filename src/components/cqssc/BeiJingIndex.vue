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
            lotteryID:26,
            moduleName:'北京时时彩',
            moduleplay: '开奖时间：9:00-24:00，5分钟一期，开奖号码根据北京快乐8同期开奖号码转换。',
        }
      }

    }
</script>

