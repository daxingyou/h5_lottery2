<template>
    <div class="so-m-t-left">
        <div v-if="lotteryID == 116 || lotteryID == 118">
            上期号码
        </div>
        <div v-else>
            第 <span class="last-date">{{previous_pcode}}</span> 期 <!-- 上期 -->
        </div>
        <div>
            <router-link to="/publicTemplate/pastView">
                <p>
                    查看往期
                </p>
            </router-link>
        </div>
    </div>
</template>

<script>
export default {
    name: 'HistoryTerm',
    props:['previous_pcode','lotteryID']
}
</script>
