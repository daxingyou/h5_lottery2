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
            moduleplay: '90秒一期，全天24小时开奖，全天960期。',
        }
      }

    }
</script>

