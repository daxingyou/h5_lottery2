<template>
    <Index v-bind:moduleLotteryID="lotteryID" :moduleName="moduleName" :moduleplay="moduleplay" />

</template>

<script>
    import Index from '@/components/lhc/Index'

    export default {
      name: 'wflhcIndex',
      components: {
        Index
      },
      data: function() {
        return {
            lotteryID:110,
            moduleLotteryID:110,
            moduleName:' 极速六合彩',
            moduleplay:'极速六合彩销售时间为00:00-次日00:00，每5分钟一期，全天共288期',
        }
      }
    }
</script>
