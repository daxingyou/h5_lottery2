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
                lotteryID:118,
                moduleName:'赛车秒秒彩',
                moduleplay: '赛车秒秒彩为采用北京赛车PK10玩法的全新彩种，即买即开奖，玩法刺激、快速。',
            }
        }

    }
</script>
