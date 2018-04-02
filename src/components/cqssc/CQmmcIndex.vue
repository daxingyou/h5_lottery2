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
            lotteryID: 116,
            moduleName:'重庆秒秒彩',
            moduleplay: '重庆秒秒彩为采用重庆时时彩玩法的全新彩种，即买即开奖，玩法刺激、快速。',
        }
      }

    }
</script>

