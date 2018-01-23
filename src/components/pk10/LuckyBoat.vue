<template>
    <Index v-bind:moduleLotteryID="lotteryID" :moduleName="moduleName" :moduleplay="moduleplay"/>
</template>

<script>
    import Index from '@/components/pk10/Index'

    export default {
        name: 'secondssc',
        components: {
            Index
        },
        data: function() {
            return {
                lotteryID:24,
                moduleName:'幸运飞艇',
                moduleplay: '每日13:04——次日凌晨4:04，5分钟一期，全天共180期',
            }
        }

    }
</script>
